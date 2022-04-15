import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
import { JwtModule } from '@nestjs/jwt';
import { AddressModule } from './address/address.module';
import { AddressRepository } from './address/address.repository';
import { Address, AddressSchema } from './address/schema/address.schema';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigPriceModule } from './config-price/config-price.module';


@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:27017/second-noah'),
    
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      //ignoreEnvFile: true,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_LOCALHOST),
    AuthModule,
    ConfigPriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
