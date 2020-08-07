import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { compile } from 'handlebars';
import { copyFileSync } from 'fs';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';

import { Language } from '../types/language';
import { AbstractAction } from './abstract.action';
import { AppArguments } from '../types/arguments';

export class NewAction extends AbstractAction {

  templatesDir = join(__dirname, '../templates');
  public execute(args: AppArguments): void {
    const { name, lang, path } = args;

    if (existsSync(name)) {
      throw new Error(`A project with the name '${name}' already exists`);
    }
    console.log(chalk.blue(`Generating new express-${lang} project`));
    mkdirSync(name + '/src/', { recursive: true });

    const spinner = ora('Generating project files').start();
    this.generateConfigFile(args);
    this.generateApp(lang, name);
    this.generateIndex(lang, name, path);
    spinner.succeed().stop().start('Installing dependencies');
    this.generatePackage(name);
    spinner.succeed().stop().start('Initializing git repository');
    this.initializeGit();
    spinner.succeed();

    console.log(chalk.blue('\nDone!'));
  }

  private generateConfigFile(args: AppArguments): void {
    const content = JSON.stringify(args, null, 4);
    writeFileSync(`${args.name}/racoon.json`, content);
  }

  private generateApp(language: Language, appName: string): void {
    const ext = (language === Language.JAVASCRIPT) ? 'js' : 'ts';

    const appPath = join(this.templatesDir, `${ext}/_app`);
    const routerPath = join(this.templatesDir, `${ext}/_app_router`);
    const appDest = `${appName}/src/app.${ext}`;
    const routerDest = `${appName}/src/app.router.${ext}`;
  
    copyFileSync(appPath, appDest);
    copyFileSync(routerPath, routerDest); 
  }

  private initializeGit(): void {
    const path = join(this.templatesDir, '_gitignore');
    copyFileSync(path, '.gitignore');
  
    shell.exec('git init', { silent: true });
    shell.exec('git add .', { silent: true });
    shell.exec('git commit -m "Initial Commit"', { silent: true });
  }
  
  private generateIndex(language: Language, appName: string, path: string): void {
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    const indexPath = join(this.templatesDir, `${ext}/_index`);
    const indexDest = `${appName}/src/index.${ext}`;
  
    const index = readFileSync(indexPath, { encoding: 'utf-8' });
    const template = compile(index);
    const output = template({ path });
  
    writeFileSync(indexDest, output);
  }
  
  private generatePackage(appName: string): void {
    const path = join(this.templatesDir, '_package');
    const pkg = readFileSync(path, { encoding: 'utf-8' });
  
    const template = compile(pkg);
    const out = template({ project: appName });
  
    writeFileSync(`${appName}/package.json`, out);
  
    shell.cd(appName);
    shell.exec('npm install', { silent: true });
  }

}