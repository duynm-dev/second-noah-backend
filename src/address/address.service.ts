import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from 'src/auth/dto/interface/jwt-user.interface';
import { LoginDto } from 'src/auth/dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { AddressRepository } from './address.repository';
import { Address } from './schema/address.schema';

@Injectable()
export class AddressService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly addressRepository: AddressRepository,
    ) {
    }


    async loginUser(loginDto: LoginDto) {
        const address = loginDto.accountAddress;
        const signature = loginDto.signature;

        // find random str by address
        var addressPromiss = await this.addressRepository.findOne({ address });
        if (!addressPromiss) {
            throw new HttpException('Address login not correct', 403);
        }

        let randomString = addressPromiss.stringRandom;

        var Web3 = require('Web3');
        var web3 = await new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
        let accountRecover;
        try {
            accountRecover = await web3.eth.accounts.recover(randomString, signature);
        } catch (err) {
            throw new HttpException('Problem with signature verification.', 403);
        }

        if (accountRecover.toLowerCase() === loginDto.accountAddress.toLowerCase()) {
            const addressInput = loginDto.accountAddress;
            const payload: JwtUser = {
                account_address: addressInput,
            };
            return this.jwtService.sign(payload);
        } else {
            throw new HttpException('Signature is not correct.', 400);
        }
    }

    async randomString(address: any): Promise<string> {
        try {
            // Get random string by uuidv4
            const uuidV4 = uuidv4();
            // find random str by address
            const addressObject = await this.getAddressObject(address);

            // if not existing then create new else update string random
            if (addressObject === null || undefined) {
                const addressObject = {
                    id: uuidV4,
                    address: address,
                    stringRandom: uuidV4,
                    createTimestamp: new Date(),
                    updateTimestamp: new Date(),
                };
                this.addressRepository.create(addressObject);
            } else {
                const filter = { address: address };
                const update = { stringRandom: uuidV4, updateTimestamp: new Date() };
                this.addressRepository.findOneAndUpdate(filter, update);

            }
            return uuidV4;
        } catch (error) {
            throw new HttpException('[randomString] error', error);
        }
    }

    async getAddressObject(address: any) {
        const addressPromiss = await this.addressRepository.findOne({ address });
        if (!addressPromiss) {
            return null;
        }
        let resultReturn = new Address();
        resultReturn.address = addressPromiss.address;
        resultReturn.id = addressPromiss.id;
        resultReturn.stringRandom = addressPromiss.stringRandom;
        return resultReturn;
    }

}
