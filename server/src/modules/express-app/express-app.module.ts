import { Module } from '@nestjs/common';
import { ExpressAppService } from './express-app.service';
import { ExpressAppController } from './express-app.controller';

@Module({
  providers: [ExpressAppService],
  controllers: [ExpressAppController],
})
export class ExpressAppModule {}
