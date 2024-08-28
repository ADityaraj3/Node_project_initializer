import { Module } from '@nestjs/common';
import { AngularAppService } from './angular-app.service';
import { AngularAppController } from './angular-app.controller';

@Module({
  providers: [AngularAppService],
  controllers: [AngularAppController],
})
export class AngularAppModule {}
