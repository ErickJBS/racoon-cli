import { command, Argv } from 'yargs';

import { AppArguments } from '../types/arguments';
import { AbstractCommand } from './abstract.command';

export class GenerateCommand extends AbstractCommand {
  public bind(): void {
    command('generate <type> <name>', 'generates a new express component', (yargs: Argv < unknown > ) => {
      yargs.positional('type', {
        describe: 'type of the new component',
        demandOption: true,
        default: 'required',
        choices: ['controller', 'service', 'middleware']
      });
      yargs.positional('name', {
        describe: 'name of the new component',
        demandOption: true,
        default: 'required'
      });
    }, (argv) => {      
      const args = new AppArguments(argv);
      this.action.execute(args);
    })
      .option('path', {
        alias: 'p',
        type: 'string',
        description: 'Controller route'
      })
      .argv;
  }
}
