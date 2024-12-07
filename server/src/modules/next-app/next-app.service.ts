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

  async fetchStructure(appName: string, res: any) {
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
        `npx create-next-app@latest ${uniqueAppName} --ts --use-npm --skip-install --eslint --app --src-dir --no-tailwind --import-alias "@/src/*" --turbo --yes`,
        this.tempDir,
      );

      const appPath = path.join(this.tempDir, uniqueAppName);
      const folderStructure = generateStructure(appPath);
      const outputDir = 'src/modules/shared/structures';
      const outputPath = path.join(outputDir, 'folderStructureNext.json');

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, JSON.stringify(folderStructure, null, 2));
      res.json(folderStructure);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }
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
  ) {
    try {
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir);
      }

      const uniqueAppName = `${appName}-${uuidv4()}`;
      const appDir = path.join(this.tempDir, uniqueAppName);

      if (fs.existsSync(appDir)) {
        fs.rmSync(appDir, { recursive: true, force: true });
      }

      await runCommand(
        `npx create-next-app@latest ${uniqueAppName} --ts --use-npm --skip-install --eslint --app --src-dir --no-tailwind --import-alias "@/src/*" --turbo --yes`,
        this.tempDir,
      );

      addNewFoldersAndFiles(structure, appDir);

      updatePackageJson(appDir, dependencies);

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
