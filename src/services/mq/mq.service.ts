import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MqService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerWinston: LoggerService,
    ) { }

    async nsAppSearchNotFountRestaurant(data: string) {

        this.loggerWinston.log(data);

        throw Error('test error');
    }
}
