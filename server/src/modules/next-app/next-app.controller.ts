import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { NextAppService } from './next-app.service';

@Controller('next-app')
export class NextAppController {
  constructor(private readonly nextAppService: NextAppService) {}

  @Post('fetch-structure')
  async fetchStructure(@Res() res: Response, @Body('appName') appName: string) {
    return this.nextAppService.fetchStructure(appName, res);
  }

  @Post('create')
  async createNextApp(
    @Res() res: Response,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('structure') structure: any,
    @Body('appName') appName: string,
  ) {
    return this.nextAppService.createNextApp(
      structure,
      dependencies,
      res,
      appName,
    );
  }

  @Get('fetch-cached-structure')
  async fetchChachedStructure() {
    return this.nextAppService.fetchChachedStructure();
  }
}
