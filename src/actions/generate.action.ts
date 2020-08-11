import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

import { AbstractAction } from './abstract.action';
import { AppArguments } from '../types/arguments';
import { getAppArguments, getProjectDir } from '../utils/config.utils';
import { generateFileFromTemplate, findLine, insertLine } from '../utils/template.utils';
import { toPascalCase, pluralize } from '../utils/string.utils';
import { Component } from '../types/component';
import { Language } from '../types/language';

export class GenerateAction extends AbstractAction {

  /**
   * Stores the directory containging templates or code generation.
   */
  templatesDir = join(__dirname, '../../templates');

  public execute(args: AppArguments): void {
    const config = getAppArguments();

    switch (args.type) {
      case Component.CONTROLLER:
        return this.generateController(args, config.lang);
      case Component.SERVICE:
        return this.generateService(args, config.lang);
      case Component.MIDDLEWARE:
        return this.generateMiddleware(args, config.lang);
    }
  }

  /**
   * Generates a new service template for express application.
   *  
   * @param args Input arguments
   * @param language Application language
   */
  private generateService(args: AppArguments, language: Language): void {
    const projectDir = getProjectDir();
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    mkdirSync(projectDir+ '/src/services', { recursive: true });

    // looking for pre-existing files
    const serviceDest = join(projectDir, `src/services/${args.name}.service.${ext}`);
    if (existsSync(serviceDest)) {
      throw new Error(`A service with the name '${args.name}' already exists in this project`);
    }

    // Generating middleware
    const serviceTemplatePath = join(this.templatesDir, `${ext}/_service`);
    const className = toPascalCase(args.name);
    const pluralName = pluralize(className);

    generateFileFromTemplate(serviceTemplatePath, serviceDest, { className, pluralName });
  }

  /**
   * Generates a new middleware template for express application.
   * 
   * @param args Input arguments
   * @param language Application language
   */
  private generateMiddleware(args: AppArguments, language: Language): void {
    const projectDir = getProjectDir();
    const ext = language == Language.JAVASCRIPT ? 'js' : 'ts';
    mkdirSync(projectDir+ '/src/middlewares', { recursive: true });

    // looking for pre-existing files
    const middlewareDest = join(projectDir, `src/middlewares/${args.name}.middleware.${ext}`);
    if (existsSync(middlewareDest)) {
      throw new Error(`A middleware with the name '${args.name}' already exists in this project`);
    }

    // Generating middleware
    const middlewareTemplatePath = join(this.templatesDir, `${ext}/_middleware`);
    generateFileFromTemplate(middlewareTemplatePath, middlewareDest, { name: args.name });
  }

  /**
   * Generates a new controller and router.
   * 
   * Generates a new controller, router and add then into application router.
   * 
   * @param args Input arguments
   * @param language Application language
   */
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
      throw new Error(`A controller or router with the name '${args.name}' already exists in this project`);
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