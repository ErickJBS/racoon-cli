import { AppArguments } from '../types/arguments';

/**
 * Represents an executable CLI action.
 */
export abstract class AbstractAction {
  public abstract execute(args: AppArguments): void;
}