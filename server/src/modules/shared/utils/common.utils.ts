// src/common.utils.ts
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as archiver from 'archiver';
import { Response } from 'express';

export interface Node {
  name: string;
  type: 'directory' | 'file';
  children?: Node[];
  id?: string;
}

export const runCommand = (command: string, cwd: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd }, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

export const updatePackageJson = (
  appDir: string,
  dependencies: { name: string; version: string }[],
) => {
  const packageJsonPath = path.join(appDir, 'package.json');

  try {
    const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonData);

    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }

    dependencies.forEach((pkg) => {
      if (pkg.name !== '') {
        packageJson.dependencies[pkg.name] = `^${pkg.version}`;
      }
    });

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
};

export const addNewFoldersAndFiles = (structure: any, parentDir: string) => {
  structure.children?.forEach((node: Node) => {
    const nodePath = path.join(parentDir, node.name);
    if (node.type === 'directory') {
      if (!fs.existsSync(nodePath)) {
        fs.mkdirSync(nodePath);
      }
      if (node.children) {
        addNewFoldersAndFiles(node, nodePath);
      }
    } else if (node.type === 'file') {
      if (!fs.existsSync(nodePath)) {
        fs.writeFileSync(nodePath, '');
      }
    }
  });
};

export const createZipArchive = (
  appDir: string,
  tempDir: string,
  appName: string,
  res: any,
) => {
  return new Promise<void>((resolve, reject) => {
    const zipFilePath = path.join(tempDir, `${appName}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
      console.error('Error during archive creation:', err);
      reject(err);
    });

    output.on('close', () => {
      res.download(zipFilePath, `${appName}.zip`, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error sending file');
        }
        fs.rmSync(appDir, { recursive: true, force: true });
        fs.unlinkSync(zipFilePath);
        resolve();
      });
    });

    archive.pipe(output);
    archive.directory(appDir, false);
    archive.finalize();
  });
};

export const generateStructure = (dirPath: string): Node => {
  const structure: Node = {
    name: path.basename(dirPath),
    type: 'directory',
    children: [],
    id: path.basename(dirPath) + Date.now().toString(),
  };

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    if (item === 'node_modules') continue;
    if (stats.isDirectory()) {
      structure.children?.push(generateStructure(itemPath));
    } else {
      structure.children?.push({ name: item, type: 'file' });
    }
  }

  return structure;
};
