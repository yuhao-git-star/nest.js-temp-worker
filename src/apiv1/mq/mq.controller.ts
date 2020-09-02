import { Controller, Inject, LoggerService } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { ConfirmChannel, Message } from 'amqplib';
import { MqService } from '../../services/mq/mq.service';
import * as crypto from 'crypto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('mq')
export class MqController {

    messageHistory: Record<string, number> = {};

    constructor(private readonly mqService: MqService,@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerWinston: LoggerService) { }

    @MessagePattern('ns-app-search-not-found-restaurant')
    async nsAppSearchNotFountRestaurant(@Payload() data: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef() as ConfirmChannel;
        const message = context.getMessage() as Message;

        const dataHash = await crypto.createHash('md5').update(data).digest('hex');

        try {
            await this.mqService.nsAppSearchNotFountRestaurant(data);
            channel.ack(message, false);
        } catch(error) {

            if (this.messageHistory[dataHash]) {
                this.messageHistory[dataHash] += 1
            } else {
                this.messageHistory[dataHash] = 1
            }

            const currentCount = this.messageHistory[dataHash]

            channel.nack(message, false, !(currentCount >= 4));

            this.loggerWinston.error(error, dataHash);
        }
    }
}
