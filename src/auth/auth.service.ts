
import { AuthDto } from './dto';
//import users from '../users.json';
import { Injectable, HttpException, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AddressService } from 'src/address/address.service';
import { AddressRepository } from 'src/address/address.repository';
const jwt_decode = require('jwt-decode');
import { v4 as uuidv4 } from 'uuid';
import { Address } from 'src/address/schema/address.schema';

//const users = require('../users.json');

// eslint-disable-next-line
//const users = require('../users.json');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private addressService: AddressService,
    private readonly addressRepository: AddressRepository,
  ) { }

  signinLocal(dto: AuthDto) {
    // retrieve user
    // const user = users.find((_user) => _user.email === dto.email);
    // if (!user) throw new UnauthorizedException('Credentials incorrect');
    // if (user.password !== dto.password)
    //   throw new UnauthorizedException('Credentials incorrect');

    // return this.signUser();
    return '';
  }

  signUser() {
    return this.jwtService.sign({
      sub: 1,
      mail: 'vlad@gmail.com',
      type: 'user',
    });
  }

    async verifyLogin(addressFromToken: string) {
      // Read address from db
      // find random str by address
      var addressPromiss = await this.addressRepository.findOne({ addressFromToken });
      
      if (!addressPromiss) {
        return false;
      }
      return addressPromiss.address.toLowerCase() === addressFromToken.toLowerCase();
  }

  /*async verifyToken(authorization: string): Promise<any> {
    try {
      let [scheme, token] = authorization.split(' ');
      const decoded = jwt_decode(token);
      const addressFromToken = decoded.account_address;
      if ('Bearer' != scheme) {
        throw new HttpException('Authorization is not correct', 400);
      }

      // Read address from db
      // find random str by address
      var addressPromiss = await this.addressRepository.findOne({ addressFromToken });
      if (!addressPromiss) {
        throw new HttpException('Address login not correct', 403);
      }
      return addressFromToken;
    } catch (err) {
      throw new HttpException('JWT is not correct', 400);
    }
  }*/

  async loginWithCredentials(loginDto: any) {
    return this.addressService.loginUser(loginDto);
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
