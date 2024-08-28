import { Module } from '@nestjs/common';
import { NextAppService } from './next-app.service';
import { NextAppController } from './next-app.controller';

@Module({
  providers: [NextAppService],
  controllers: [NextAppController],
})
export class NextAppModule {}
