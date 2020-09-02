import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Apiv1Module } from './apiv1/apiv1.module';
import { Apiv2Module } from './apiv2/apiv2.module';
import * as fs from 'fs';
import path = require('path');
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Transport } from '@nestjs/microservices';

const ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${ENV}`);

const RABBIT_MQ_ACC = process.env.RABBIT_MQ_ACC || 'guest';
const RABBIT_MQ_PW = process.env.RABBIT_MQ_PW || 'guest';
const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL || 'localhost';
const RABBIT_MQ_PORT = process.env.RABBIT_MQ_PORT || 5672;
const RABBIT_MQ_QUEUE = process.env.RABBIT_MQ_QUEUE || 'test_queue';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RABBIT_MQ_ACC}:${RABBIT_MQ_PW}@${RABBIT_MQ_URL}:${RABBIT_MQ_PORT}`],
      queue: RABBIT_MQ_QUEUE,
      prefetchCount: 1,
      noAck: false,
      queueOptions: {
        durable: false
      },
    }
  });

  const options = new DocumentBuilder()
    .setTitle('xxxx API Services')
    .setDescription('xxxx API Services')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Develop Local')
    .addServer('https://xxxx.klearthink.com', 'Test Env')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [Apiv1Module],
  });

  const optionsV2 = new DocumentBuilder()
    .setTitle('xxxx API Services')
    .setDescription('xxxx API Services')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const documentV2 = SwaggerModule.createDocument(app, optionsV2, {
    include: [Apiv2Module],
  });

  // 正式環境下不提供 API 文件
  if (process.env.NODE_ENV !== 'production') {
    const apiv1 = path.resolve(__dirname, 'static/api-json', 'swagger-spec-v1.json');

    const dirName = path.resolve(__dirname, 'static');

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }

    const dirNameApiJson = path.resolve(__dirname, 'static/api-json');
    if (!fs.existsSync(dirNameApiJson)) {
      fs.mkdirSync(dirNameApiJson);
    }

    if (!fs.existsSync(apiv1)) {

      fs.writeFileSync(apiv1, JSON.stringify(document));
    }

    SwaggerModule.setup('apidoc/v1', app, document);

    const apiv2 = path.resolve(__dirname, 'static/api-json', 'swagger-spec-v2.json');
    if (!fs.existsSync(apiv2)) {
      fs.writeFileSync(apiv2, JSON.stringify(documentV2));
    }

    SwaggerModule.setup('apidoc/v2', app, documentV2);

    app.useStaticAssets(path.join(path.resolve(__dirname, 'static/api-json')));
  }

  await app.startAllMicroservicesAsync();

  const port = process.env.PORT || 3000;
  await app.listen(port).then(() => {
    console.log('MicroService is starting.');
  }).catch((error) => {
    console.error('Something wrong happened,', error);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
