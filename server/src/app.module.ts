import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViteAppModule } from './modules/vite-app/vite-app.module';
import { NestAppModule } from './modules/nest-app/nest-app.module';
import { NextAppModule } from './modules/next-app/next-app.module';
import { ExpressAppModule } from './modules/express-app/express-app.module';
import { AngularAppModule } from './modules/angular-app/angular-app.module';

@Module({
  imports: [
    ViteAppModule,
    NestAppModule,
    NextAppModule,
    ExpressAppModule,
    AngularAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
