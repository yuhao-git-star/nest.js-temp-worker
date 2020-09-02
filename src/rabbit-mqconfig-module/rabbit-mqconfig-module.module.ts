import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';

const client = {
    provide: 'XEMQ_SERVICE',
    useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://
                ${configService.rabbitMqAccount}:
                ${configService.dbPassword}@
                ${configService.rabbitMqUrl}:
                ${configService.rabbitMqPort}`],
                queue: `${configService.rabbitMqQueue}`,
                prefetchCount: 1,
                noAck: false,
                queueOptions: {
                    durable: false
                },
            },
        });
    },
    inject: [ConfigService],
}

@Module({
    providers: [
        client,
    ],
    exports: [
        client,
    ]
})
export class RabbitMqconfigModuleModule { }
