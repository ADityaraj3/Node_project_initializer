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
      const templateBaseDir = path.resolve(
        __dirname,
        '../../../..',
        'angular-templates',
      )

      const templateDir = path.join(templateBaseDir, 'angular-template');

      const folderStructure = generateStructure(templateDir);

      res.json(folderStructure);
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
    language: 'js' | 'ts' = 'ts',
  ) {
    try {
      const templateBaseDir = path.resolve(
        __dirname,
        '../../../..',
        'angular-templates',
      );
      const templateDir = path.join(templateBaseDir, 'angular-template');
      if (!fs.existsSync(templateDir)) {
        return res.status(500).send(`Template for does not exist.`);
      }
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }

      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);
      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }
      fs.cpSync(templateDir, appDir, { recursive: true });
      addNewFoldersAndFiles(structure, appDir);
      updatePackageJson(appDir, dependencies);
      await createZipArchive(appDir, this.tempDir, uniqueAppName, res);
      // Clean up: Remove the temporary directory after zipping
      fs.rmSync(this.tempDir, { recursive: true, force: true });
    } catch (error) {
      console.error('Error creating Angular app:', error);
      res.status(500).send('Error creating Angular app');
    }
  }

  async fetchChachedStructure() {
    const folderStructure = JSON.parse(
      fs.readFileSync(
        'src/modules/shared/structures/folderStructureAngular.json',
        'utf8',
      ),
    );
    return folderStructure;
  }
}
