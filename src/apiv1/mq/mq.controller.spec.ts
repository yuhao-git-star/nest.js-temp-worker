import { Test, TestingModule } from '@nestjs/testing';
import { MqController } from './mq.controller';

describe('Mq Controller', () => {
  let controller: MqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqController],
    }).compile();

    controller = module.get<MqController>(MqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
