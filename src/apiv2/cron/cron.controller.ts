import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('任務調度')
@ApiBearerAuth()
@Controller('cron')
export class UserV2Controller {
    @Get()
    async find(): Promise<string> {
        return 'hello';
      }
}
