import { command, Argv } from 'yargs';

import { AppArguments } from '../types/arguments';
import { AbstractCommand } from './abstract.command';

export class NewCommand extends AbstractCommand {
  public bind(): void {
    command('new <name>', 'creates a new express application', (yargs: Argv < unknown > ) => {
      yargs.positional('name', {
        describe: 'name of the new project',
        demandOption: true,
        default: 'required'
      });
    }, (argv) => {
      if (argv.lang == 'js')
        argv.lang = 'javascript';
      if (argv.lang == 'ts')
        argv.lang = 'typescript';
      
      const args = new AppArguments(argv);
      this.action.execute(args);
    })
      .option('lang', {
        alias: 'l',
        type: 'string',
        default: 'javascript',
        description: 'Project language',
        choices: ['js', 'javascript', 'ts', 'typescript']
      })
      .option('path', {
        alias: 'p',
        type: 'string',
        default: '',
        description: 'Application base path'
      })
      .argv;
  }
}
