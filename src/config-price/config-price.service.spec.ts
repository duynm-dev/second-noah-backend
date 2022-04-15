import { Test, TestingModule } from '@nestjs/testing';
import { ConfigPriceService } from './config-price.service';

describe('ConfigPriceService', () => {
  let service: ConfigPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigPriceService],
    }).compile();

    service = module.get<ConfigPriceService>(ConfigPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
