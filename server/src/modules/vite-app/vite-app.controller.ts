// src/vite-app/vite-app.controller.ts
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ViteAppService } from './vite-app.service';
import { Node } from '../shared/utils/common.utils';

@Controller('vite-app')
export class ViteAppController {
  constructor(private readonly viteAppService: ViteAppService) {}

  @Post('create')
  createViteApp(
    @Res() res: Response,
    @Body('structure') structure: Node,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('appName') appName: string,
    @Body('framework') framework: string,
  ) {
    return this.viteAppService.createViteApp(
      structure,
      dependencies,
      appName,
      framework,
      res,
    );
  }

  @Post('fetch-structure')
  fetchStructure(
    @Res() res: Response,
    @Body('appName') appName: string,
    @Body('framework') framework: string,
  ) {
    return this.viteAppService.fetchStructure(appName, framework, res);
  }
}
