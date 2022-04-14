import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from 'src/address/address.module';
import { AddressRepository } from 'src/address/address.repository';
import { Address, AddressSchema } from 'src/address/schema/address.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    AddressModule, 
    JwtModule.register({
      secret: 'super-secret-cat',
      signOptions: { expiresIn: '600s' },
      
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AddressRepository],
  exports: [AuthService]
})
export class AuthModule {}
