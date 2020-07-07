import { Module, Logger } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { TypeOrmConfigService } from '../type-orm-config/type-orm-config.service';
import { CronService } from './cron/cron.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmConfigService.getEntities()),
    ],
    providers: [
        Logger,
        UserService,
        CronService,
    ],
    exports: [
        UserService,
        CronService,
    ],
})
export class ServiceModule {}
