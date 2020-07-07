import { Module } from '@nestjs/common';
import { ServiceModule } from '../services/service.module';
import { CronController } from './cron/cron.controller';

@Module({
    imports: [
        ServiceModule,
    ],
    controllers: [
        CronController
    ],
})
export class Apiv1Module { }
