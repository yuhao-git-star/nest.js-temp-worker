import { Module } from '@nestjs/common';
import { ServiceModule } from '../services/service.module';
import { CronController } from './cron/cron.controller';
import { MqController } from './mq/mq.controller';

@Module({
    imports: [
        ServiceModule,
    ],
    controllers: [
        CronController,
        MqController,
    ],
})
export class Apiv1Module { }
