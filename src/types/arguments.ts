import { Language } from './language';

export class AppArguments {
  name: string;
  lang: Language;
  path: string;

  constructor(args: any) {
    this.name = args.name;
    this.lang = args.lang;
    this.path = args.path;
  }
}