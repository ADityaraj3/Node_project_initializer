import { Body, Controller, Post, Res } from '@nestjs/common';
import { AngularAppService } from './angular-app.service';

@Controller('angular-app')
export class AngularAppController {
  constructor(private angularAppService: AngularAppService) {}

  @Post('fetch-structure')
  async fetchAngularStructure(
    @Body('appName') appName: string,
    @Res() res: any,
  ) {
    return this.angularAppService.fetchAngularStructure(appName, res);
  }

  @Post('create')
  async createAngularApp(
    @Body('structure') structure: any,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('appName') appName: string,
    @Res() res: any,
  ) {
    return this.angularAppService.createAngularApp(
      structure,
      dependencies,
      res,
      appName,
    );
  }
}
