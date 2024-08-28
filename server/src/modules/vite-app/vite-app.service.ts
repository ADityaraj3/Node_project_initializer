// src/vite-app/vite-app.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  runCommand,
  updatePackageJson,
  addNewFoldersAndFiles,
  createZipArchive,
  generateStructure,
  Node,
} from '../shared/utils/common.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ViteAppService {
  private readonly tempDir = path.join(__dirname, '..', `temp-${uuidv4()}`);

  async createViteApp(
    structure: Node,
    dependencies: { name: string; version: string }[],
    appName: string,
    framework: string,
    res: any,
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

      await runCommand(
        `npm create vite@latest ${appName} -- --template ${framework}`,
        this.tempDir,
      );

      updatePackageJson(appDir, dependencies);
      if (structure) {
        addNewFoldersAndFiles(structure, appDir);
      }

      await createZipArchive(appDir, this.tempDir, appName, res);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.error('Error creating Vite app:', error);
      res.status(500).send('Error creating Vite app');
    }
  }

  async fetchStructure(appName: string, framework: string, res: any) {
    try {
      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);
      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      await runCommand(
        `npm create vite@latest ${uniqueAppName} -- --template ${framework}`,
        this.tempDir,
      );

      const appPath = path.join(this.tempDir, uniqueAppName);
      while (!fs.existsSync(appPath)) {
        await runCommand(
          `npm create vite@latest ${uniqueAppName} -- --template ${framework}`,
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
