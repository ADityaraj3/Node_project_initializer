import { Controller, Post, Body, Res } from '@nestjs/common';
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
    @Body('structure') structure: any,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('appName') appName: string,
  ) {
    return this.nextAppService.createNextApp(
      res,
      structure,
      dependencies,
      appName,
    );
  }
}
