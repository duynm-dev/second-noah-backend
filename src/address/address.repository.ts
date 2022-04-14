import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Address, AddressDocument } from "./schema/address.schema";

@Injectable()
export class AddressRepository {
    constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) { }

    async findOne(addressFilterQuery: FilterQuery<Address>): Promise<Address> {
        return this.addressModel.findOne(addressFilterQuery);
    }

    async find(addressFilterQuery: FilterQuery<Address>): Promise<Address[]> {
        return this.addressModel.find(addressFilterQuery)
    }

    async create(adddress: Address): Promise<Address> {
        const newAddress = new this.addressModel(adddress);
        return newAddress.save()
    }

    async findOneAndUpdate(addressFilterQuery: FilterQuery<Address>, address: Partial<Address>): Promise<Address> {
        this.addressModel.findByIdAndDelete();
        return this.addressModel.findOneAndUpdate(addressFilterQuery, address, { new: true });

    }

    // async findOneAndDelete(){
    //     this.addressModel.findByIdAndDelete();
    // }

}