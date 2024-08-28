import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {
  addNewFoldersAndFiles,
  createZipArchive,
  generateStructure,
  runCommand,
  updatePackageJson,
} from '../shared/utils/common.utils';

@Injectable()
export class NestAppService {
  private readonly tempDir = path.join(__dirname, '..', `temp-${uuidv4()}`);

  async createNestjsApp(
    structure: Node,
    dependencies: { name: string; version: string }[],
    appName: string,
    res: any,
  ) {
    const uniqueAppName = `${appName}-${uuidv4()}`;
    const appDir = path.join(this.tempDir, uniqueAppName);

    try {
      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      await runCommand(`npm install -g @nestjs/cli`, this.tempDir);

      await runCommand(
        `nest new ${uniqueAppName} --skip-git --package-manager=npm`,
        this.tempDir,
      );

      updatePackageJson(appDir, dependencies);

      if (structure) {
        addNewFoldersAndFiles(structure, appDir);
      }

      await createZipArchive(appDir, this.tempDir, uniqueAppName, res);
    } catch (error) {
      console.error('Error creating NestJS app:', error);
      res.status(500).send('Error creating NestJS app');
    }
  }

  async fetchStructure(appName: string, res: any) {
    const uniqueAppName = `${appName}-${uuidv4()}`;
    const appDir = path.join(this.tempDir, uniqueAppName);

    try {
      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      await runCommand(
        `nest new ${uniqueAppName} --skip-git --package-manager=npm`,
        this.tempDir,
      );

      const appPath = path.join(this.tempDir, uniqueAppName);

      while (!fs.existsSync(appPath)) {
        await runCommand(
          `nest new ${uniqueAppName} --skip-git --package-manager=npm`,
          this.tempDir,
        );
      }
      const folderStructure = generateStructure(appPath);
      res.json(folderStructure);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.error('Error fetching structure:', error);
      res.status(500).send('Error fetching structure');
    }
  }
}
