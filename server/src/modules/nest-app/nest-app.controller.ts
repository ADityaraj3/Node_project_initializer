import { Body, Controller, Post, Res } from '@nestjs/common';
import { NestAppService } from './nest-app.service';

@Controller('nest-app')
export class NestAppController {
  constructor(private readonly nestAppService: NestAppService) {}

  @Post('create')
  createNestjsApp(
    @Res() res: Response,
    @Body('structure') structure: any,
    @Body('packageJson') dependencies: { name: string; version: string }[],
    @Body('appName') appName: string,
  ) {
    return this.nestAppService.createNestjsApp(
      structure,
      dependencies,
      appName,
      res,
    );
  }

  @Post('fetch-structure')
  fetchStructure(@Res() res: Response, @Body('appName') appName: string) {
    return this.nestAppService.fetchStructure(appName, res);
  }
}
