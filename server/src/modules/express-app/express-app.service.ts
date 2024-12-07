import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {
  runCommand,
  generateStructure,
  updatePackageJson,
  addNewFoldersAndFiles,
  createZipArchive,
} from '../shared/utils/common.utils';
import { Response } from 'express';

@Injectable()
export class ExpressAppService {
  private readonly appDir: string;
  private readonly tempDir: string;
  private readonly appName: string;

  constructor() {
    this.appName = 'my-nextjs-app';
    this.tempDir = path.join(__dirname, '..', `temp-${uuidv4()}`);
  }

  async fetchStructure(appName: string) {
    try {
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      await runCommand(`npx express-generator ${uniqueAppName}`, this.tempDir);

      const appPath = path.join(this.tempDir, uniqueAppName);
      const folderStructure = generateStructure(appPath);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      const outputDir = 'src/modules/shared/structures';
      const outputPath = path.join(outputDir, 'folderStructureExpress.json');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, JSON.stringify(folderStructure, null, 2));

      return folderStructure;
    } catch (error) {
      console.error('Error fetching structure:', error);
      throw new Error('Error fetching structure');
    }
  }

  async createExpressApp(
    structure: any,
    dependencies: { name: string; version: string }[],
    res: any,
    appName: string,
  ) {
    try {
      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      await runCommand(`npx express-generator ${uniqueAppName}`, this.tempDir);

      addNewFoldersAndFiles(structure, appDir);

      updatePackageJson(appDir, dependencies);

      await createZipArchive(appDir, this.tempDir, uniqueAppName, res);
    } catch (error) {
      console.error('Error creating Express.js app:', error);
      res.status(500).send('Error creating Express.js app');
    }
  }

  async fetchChachedStructure() {
    const outputDir = 'src/modules/shared/structures';
    const outputPath = path.join(outputDir, 'folderStructureExpress.json');
    const folderStructure = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    return folderStructure;
  }
}
