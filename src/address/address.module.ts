import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { Address, AddressSchema } from './schema/address.schema';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    JwtModule.register({
      secret: 'super-secret-cat',
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [AddressService, AddressRepository],
  exports: [AddressService, AddressRepository]
})
export class AddressModule { }
