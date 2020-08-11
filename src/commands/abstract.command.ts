import { AbstractAction } from '../actions/abstract.action';

/**
 * Represents a command parser configuration.
 */
export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}
  public abstract bind(): void;
}