import { compile } from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';

export const generateFileFromTemplate = (templatePath: string, dest: string, args: any): void => {
  const templateContent = readFileSync(templatePath, { encoding: 'utf-8' });
  const template = compile(templateContent);
  const templateOutput = template(args);
  writeFileSync(dest, templateOutput);
};

export const insertText = (filePath: string, regex: string, insert: string): void => {
  const content = readFileSync(filePath, { encoding: 'utf-8' });
  const parts = content.split(regex);
  const out = `${parts[0]}${regex}${insert}${parts[1]}`;
  writeFileSync(filePath, out);
};

export const insertTextStart = (filePath: string, insert: string): void => {
  const content = readFileSync(filePath, { encoding: 'utf-8' });
  const out = `${insert}${content}`;
  writeFileSync(filePath, out);
};