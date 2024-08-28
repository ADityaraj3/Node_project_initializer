import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import {
  generateStructure,
  addNewFoldersAndFiles,
  updatePackageJson,
  createZipArchive,
  runCommand,
} from '../shared/utils/common.utils';

const execPromise = promisify(exec);

@Injectable()
export class AngularAppService {
  private tempDir = path.join(__dirname, 'temp'); // Define your temp directory

  async fetchAngularStructure(appName: string, res: any) {
    try {
      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      await runCommand(`npm install @angular/cli`, this.tempDir);

      await runCommand(
        `npx @angular/cli new ${uniqueAppName} --routing --style=scss --skip-install`,
        this.tempDir,
      );

      const appPath = path.join(this.tempDir, uniqueAppName);
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

  async createAngularApp(
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

      await runCommand(`npm install @angular/cli`, this.tempDir);

      await runCommand(
        `npx @angular/cli new ${uniqueAppName} --routing --style=scss --skip-install`,
        this.tempDir,
      );

      addNewFoldersAndFiles(structure, appDir);

      updatePackageJson(appDir, dependencies);

      await createZipArchive(appDir, this.tempDir, uniqueAppName, res);
    } catch (error) {
      console.error('Error creating Angular app:', error);
      res.status(500).send('Error creating Angular app');
    }
  }
}
