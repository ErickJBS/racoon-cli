import { compile } from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';

export const generateFileFromTemplate = (templatePath: string, dest: string, args: any): void => {
  const templateContent = readFileSync(templatePath, { encoding: 'utf-8' });
  const template = compile(templateContent);
  const templateOutput = template(args);
  writeFileSync(dest, templateOutput);
};

export const findLine = (source: string, regex: RegExp): number => {
  const content = readFileSync(source, { encoding: 'utf-8' });
  const lines = content.split('\n');
  for (const [i, line] of lines.entries()) {
    if (regex.test(line)) return i;
  }
  // Not matching line
  return -1;
};

export const insertLine = (source: string, index: number, insert: string) => {
  const content = readFileSync(source, { encoding: 'utf-8' });
  const lines = content.split('\n');
  lines.splice(index, 0, insert);
  writeFileSync(source, lines.join('\n'));
};