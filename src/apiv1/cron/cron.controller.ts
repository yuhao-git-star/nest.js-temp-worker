import { Controller, Get, Header, Query, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiForbiddenResponse, ApiCreatedResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiBusinessCode } from '../../enum/api-business-code';
import { string } from 'joi';

@ApiTags('任務調度')
@ApiBearerAuth()
@Controller('cron')
export class CronController {

    constructor(
    ) { }

    @Get('')
    @ApiOperation({
        summary: '任務調度',
        description: `
      Business Code 說明:\r
      ${ApiBusinessCode.normal}-> 正常
      ${ApiBusinessCode.notfind}-> 查無資料
      `
    })
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: string
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Header('content-type', 'application/json')
    async signin(
    ): Promise<string> {
        return 'Ok'
    }
}
