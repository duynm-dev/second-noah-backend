import { Test, TestingModule } from '@nestjs/testing';
import { ConfigPriceController } from './config-price.controller';

describe('ConfigPriceController', () => {
  let controller: ConfigPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigPriceController],
    }).compile();

    controller = module.get<ConfigPriceController>(ConfigPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
