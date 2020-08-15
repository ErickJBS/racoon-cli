import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { copyFileSync } from 'fs';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';

import { Language } from '../types/language';
import { AbstractAction } from './abstract.action';
import { AppArguments } from '../types/arguments';
import { generateFileFromTemplate } from '../utils/template.utils';

export class NewAction extends AbstractAction {

  /**
   * Stores the directory containging templates or code generation.
   */
  templatesDir = join(__dirname, '../../templates');

  public execute(args: AppArguments): void {
    const { name, lang, path } = args;

    if (existsSync(name)) {
      throw new Error(`A project with the name '${name}' already exists`);
    }
    console.log(chalk.blue(`Generating new express-${lang} project`));
    mkdirSync(name + '/src/', { recursive: true });
    mkdirSync(name + '/public/', { recursive: true });

    const spinner = ora('Generating project files').start();
    this.generateConfigFile(args);
    this.generateApp(lang, name);
    this.generateIndex(lang, name, path);
    this.generatePublic(name);
    spinner.succeed().stop().start('Installing dependencies');
    this.generatePackage(lang, name);
    spinner.succeed().stop().start('Initializing git repository');
    this.initializeGit();
    spinner.succeed();

    console.log(chalk.blue('\nDone!'));
  }

  /**
   * Generates racoon.json file used for code generation.
   * 
   * @param {AppArguments} args Input arguments
   */
  private generateConfigFile(args: AppArguments): void {
    const content = JSON.stringify(args, null, 4);
    writeFileSync(`${args.name}/racoon.json`, content);
  }

  /**
   * Generates base application files.
   * 
   * @param {Language} language Application language
   * @param {string} appName Application name
   */
  private generateApp(language: Language, appName: string): void {
    const ext = (language === Language.JAVASCRIPT) ? 'js' : 'ts';

    const appPath = join(this.templatesDir, `${ext}/_app`);
    const routerPath = join(this.templatesDir, `${ext}/_app_router`);
    const appDest = `${appName}/src/app.${ext}`;
    const routerDest = `${appName}/src/app.router.${ext}`;
  
    copyFileSync(appPath, appDest);
    copyFileSync(routerPath, routerDest); 

    if (language == Language.TYPESCRIPT) {
      const eslintPath = join(this.templatesDir, `${ext}/_eslint`);
      const tsconfigPath = join(this.templatesDir, `${ext}/_tsconfig`);
      const eslintDest = `${appName}/.eslintrc.yml`;
      const tsconfigDest = `${appName}/tsconfig.json`;
  
      copyFileSync(eslintPath, eslintDest);
      copyFileSync(tsconfigPath, tsconfigDest); 
    }
  }

  /**
   * Generates public folder and index.html file.
   * 
   * @param {string} appName Application name
   */
  private generatePublic(appName: string): void {
    const htmlTemplate = join(this.templatesDir, '_html');
    const htmlDest = `${appName}/public/index.html`;
    generateFileFromTemplate(htmlTemplate, htmlDest, { appName });
  }

  /**
   * Initializes a git repository in the project folder.
   */
  private initializeGit(): void {
    const path = join(this.templatesDir, '_gitignore');
    copyFileSync(path, '.gitignore');
  
    shell.exec('git init', { silent: true });
    shell.exec('git add .', { silent: true });
    shell.exec('git commit -m "Initial Commit"', { silent: true });
  }
  
  /**
   * Generates index file.
   * 
   * @param {Language} language Application language
   * @param {string} appName Application name
   * @param {string} path Application context (base path)
   */
  private generateIndex(language: Language, appName: string, path: string): void {
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    const indexPath = join(this.templatesDir, `${ext}/_index`);
    const indexDest = `${appName}/src/index.${ext}`;

    generateFileFromTemplate(indexPath, indexDest, { path });
  }
  
  /**
   * Generates package.json file.
   * 
   * Initializes a node project and install required dependencies.
   * 
   * @param {string} appName Application name 
   */
  private generatePackage(language: Language, appName: string): void {
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    const path = join(this.templatesDir, `${ext}/_package`);
    const dest = `${appName}/package.json`;

    generateFileFromTemplate(path, dest, { project: appName });
  
    shell.cd(appName);
    shell.exec('npm install', { silent: true });
  }

}