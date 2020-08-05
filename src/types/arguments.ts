import { Language } from './language';
import { Component } from './component';

export class AppArguments {
  name: string;
  lang: Language;
  path: string;
  type: Component;

  constructor(args: any) {
    this.name = args.name;
    this.lang = args.lang;
    this.path = args.path;
    this.type = args.type;
  }
}