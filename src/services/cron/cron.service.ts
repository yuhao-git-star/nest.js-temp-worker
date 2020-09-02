import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CronService {

    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerWinston: LoggerService) { }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Timeout(1000)
    handleCron() {
        this.loggerWinston.log('Called when the current second is 10');
    }
}
