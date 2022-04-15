
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';
import { ConfigPriceService } from './config-price.service';
import { Response, Request } from 'express';

@Controller('config-price')
export class ConfigPriceController {
    constructor(private configPriceService: ConfigPriceService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getConfigs(){
        return this.configPriceService.getConfigs();
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-config-by-condition')
    getConfigByCondition(@Req() request: Request){
        return this.configPriceService.getConfigByCondition(request);
    }
}
