import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  runCommand,
  updatePackageJson,
  addNewFoldersAndFiles,
  createZipArchive,
  generateStructure,
} from '../shared/utils/common.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NextAppService {
  private readonly appDir: string;
  private readonly tempDir: string;
  private readonly appName: string;

  constructor() {
    this.appName = 'my-nextjs-app';
    this.tempDir = path.join(__dirname, '..', `temp-${uuidv4()}`);
  }

  async fetchStructure(appName: string, res: any, language: string) {
    try {
      const templateBaseDir = path.resolve(
        __dirname,
        '../../../..',
        'next-templates',
      )

      const templateDir = path.join(
        templateBaseDir,
        language === 'ts' ? 'next-ts-template' : 'next-js-template',
      );

      const folderStructure = generateStructure(templateDir);
      res.json(folderStructure);
    } catch (error) {
      console.error('Error fetching structure:', error);
      res.status(500).send('Error fetching structure');
    }
  }

  async createNextApp(
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
        'next-templates',
      );
      const templateDir = path.join(
        templateBaseDir,
        language === 'ts' ? 'next-ts-template' : 'next-js-template',
      );

      if (!fs.existsSync(templateDir)) {
        return res
          .status(500)
          .send(`Template for ${language.toUpperCase()} does not exist.`);
      }

      // Ensure temp directory exists
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }

      // Prepare new app directory
      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      // Remove existing app dir if it exists
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
      console.error('Error creating Next.js app:', error);
      res.status(500).send('Error creating Next.js app');
    }
  }

  async fetchChachedStructure() {
    const outputDir = 'src/modules/shared/structures';
    const outputPath = path.join(outputDir, 'folderStructureNext.json');
    const folderStructure = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    return folderStructure;
  }
}
