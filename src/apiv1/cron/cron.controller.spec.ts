import { Test, TestingModule } from '@nestjs/testing';
import { CronController } from './cron.controller';
import { MockTestModule } from '../../../test/mock-test.module';

describe('User Controller', () => {
  let controller: CronController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockTestModule,
      ],
      controllers: [CronController],
    }).compile();

    controller = module.get<CronController>(CronController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
