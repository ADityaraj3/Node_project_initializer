import { Module } from '@nestjs/common';
import { ViteAppService } from './vite-app.service';
import { ViteAppController } from './vite-app.controller';

@Module({
  providers: [ViteAppService],
  controllers: [ViteAppController],
})
export class ViteAppModule {}
