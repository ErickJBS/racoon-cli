import { AppArguments } from '../types/arguments';

export abstract class AbstractAction {
  public abstract execute(args: AppArguments): void;
}