import { Body, Controller, Post, Res } from '@nestjs/common';
import { ExpressAppService } from './express-app.service';
import { Response } from 'express';

@Controller('express-app')
export class ExpressAppController {
  constructor(private expressAppService: ExpressAppService) {}

  @Post('fetch-structure')
  async fetchStructure(@Body('appName') appName: string) {
    return this.expressAppService.fetchStructure(appName);
  }

  @Post('create')
  async createExpressApp(
    @Body('structure') structure: any,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('appName') appName: string,
    @Res() res: any,
  ) {
    return this.expressAppService.createExpressApp(
      structure,
      dependencies,
      res,
      appName,
    );
  }
}
