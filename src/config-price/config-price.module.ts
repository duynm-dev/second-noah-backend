import { Module } from '@nestjs/common';
import { ConfigPriceController } from './config-price.controller';
import { ConfigPriceService } from './config-price.service';

@Module({
  controllers: [ConfigPriceController],
  providers: [ConfigPriceService]
})
export class ConfigPriceModule {}
