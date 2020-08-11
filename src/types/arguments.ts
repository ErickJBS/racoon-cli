import { Language } from './language';
import { Component } from './component';

/** Class representing application input arguments */
export class AppArguments {
  name: string;
  lang: Language;
  path: string;
  type: Component;

  /**
   * Creates application arguments.
   * 
   * @param {Object} args Input arguments
   */
  constructor(args: any) {
    this.name = args.name;
    this.lang = args.lang;
    this.path = args.path;
    this.type = args.type;
  }
}