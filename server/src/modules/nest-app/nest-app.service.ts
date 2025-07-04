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
    try {
      const templateBaseDir = path.resolve(
        __dirname,
        '../../../..',
        'nest-templates',
      );

      const templateDir = path.join(templateBaseDir, 'nest-ts-template');

      if (!fs.existsSync(templateDir)) {
        return res.status(500).send(`Template for does not exist.`);
      }

      // Ensure temp directory exists
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }
      // Prepare new app directory
      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      // Copy pre-installed template to appDir
      await fs.promises.cp(templateDir, appDir, { recursive: true });

      // Add custom structure
      addNewFoldersAndFiles(structure, appDir);

      // Update dependencies
      updatePackageJson(appDir, dependencies);

      // Zip and return
      await createZipArchive(appDir, this.tempDir, uniqueAppName, res);
    } catch (error) {
      console.error('Error creating NestJS app:', error);
      res.status(500).send('Error creating NestJS app');
    }
  }

  async fetchStructure(appName: string, res: any) {
    try {
      const templateBaseDir = path.resolve(
        __dirname,
        '../../../..',
        'nest-templates',
      );

      const templateDir = path.join(templateBaseDir, 'nest-ts-template');

      if (!fs.existsSync(templateDir)) {
        return res.status(500).send(`Template for does not exist.`);
      }

      const folderStructure = generateStructure(templateDir);
      res.json(folderStructure);
    } catch (error) {
      console.error('Error fetching structure:', error);
      res.status(500).send('Error fetching structure');
    }
  }

  async fetchChachedStructure() {
    const outputDir = 'src/modules/shared/structures';
    const outputPath = path.join(outputDir, 'folderStructureNest.json');
    const folderStructure = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    return folderStructure;
  }
}
