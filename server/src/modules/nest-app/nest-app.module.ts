import { Module } from '@nestjs/common';
import { NestAppService } from './nest-app.service';
import { NestAppController } from './nest-app.controller';

@Module({
  providers: [NestAppService],
  controllers: [NestAppController],
})
export class NestAppModule {}
