import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Prop()
    id: string;

    @Prop()
    address: string;

    @Prop()
    stringRandom: string;

    @Prop()
    createTimestamp: Date;

    @Prop()
    updateTimestamp: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);