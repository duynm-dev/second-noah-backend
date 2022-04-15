import { Injectable, Req } from '@nestjs/common';
import { ConfigPriceDto } from './dto/config-price.dto';
var configPrice = require('../config-price/config-price.json');
import { Response, Request } from 'express';
//import configPrice from '../config-price/config-price.json';

@Injectable()
export class ConfigPriceService {

    constructor() { }

    getConfigs(){
        const configPriceDtos: Array<ConfigPriceDto> = JSON.parse(JSON.stringify(configPrice));
        return configPriceDtos;
    }

    getConfigByCondition(@Req() request: Request){
        const id = request.query?.id;
        const type = request.query?.type;
        const typeConfig = request.query?.typeConfig;
        const status = 'ACTIVE';

        const configDtos: Array<ConfigPriceDto> = JSON.parse(JSON.stringify(configPrice));
        
        return configDtos.filter(e => 
            (!id  || e.id === Number(id))
            && 
            (e.status == status)
            && 
            (!type || e.type.toLowerCase() === type)
            && 
            (!typeConfig || e.typeConfig == typeConfig)
        );
    }
}
