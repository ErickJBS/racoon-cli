import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

import { AbstractAction } from './abstract.action';
import { AppArguments } from '../types/arguments';
import { getAppArguments, getProjectDir } from '../utils/config.utils';
import { generateFileFromTemplate, findLine, insertLine } from '../utils/template.utils';
import { Component } from '../types/component';
import { Language } from '../types/language';

export class GenerateAction extends AbstractAction {

  templatesDir = join(__dirname, '../templates');
  public execute(args: AppArguments): void {
    const config = getAppArguments();

    switch (args.type) {
      case Component.CONTROLLER:
        this.generateController(args, config.lang);
        break;
      case Component.SERVICE:
        console.log('service');
        break;
      case Component.MIDDLEWARE:
        console.log('middleware');
        break;
    }
  }

  private generateController(args: AppArguments, language: Language): void {
    // If a route isn't specified, use controller's name
    const path = args.path || args.name;
    const projectDir = getProjectDir();
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    mkdirSync(projectDir+ '/src/controllers', { recursive: true });
    mkdirSync(projectDir + '/src/routes', { recursive: true });

    // looking for pre-existing files
    const controllerDest = join(projectDir, `src/controllers/${args.name}.controller.${ext}`);
    const routerDest  = join(projectDir, `src/routes/${args.name}.router.${ext}`);
    if (existsSync(controllerDest) || existsSync(routerDest)) {
      throw new Error(`A controller with the name ${args.name} already exists`);
    }
    
    // Generating controller
    const controllerTemplatePath = join(this.templatesDir, `${ext}/_controller`);
    generateFileFromTemplate(controllerTemplatePath, controllerDest, { name: args.name });

    // Generating router
    const routerTemplatePath = join(this.templatesDir, `${ext}/_router`);
    generateFileFromTemplate(routerTemplatePath, routerDest,  { name: args.name });

    // Generate import statements
    const routerImport = language === Language.JAVASCRIPT ?
      `const ${args.name}Router = require('./routes/${args.name}.router');` :
      `import ${args.name}Router from './routes/${args.name}.router';`;
    const routerArray = `  { path: '/${path}', router: ${args.name}Router },`;
    const routerPath = join(projectDir, `src/app.router.${ext}`);

    // Insert imports in router file
    // Finds the line to insert the router object
    // similar to: const router = [
    const index = findLine(routerPath, /^\s*(const|let|var).+=\s*\[\s*$/);
    insertLine(routerPath, index + 1, routerArray);
    insertLine(routerPath, 0, routerImport);
  }
}