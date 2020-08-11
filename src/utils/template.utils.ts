import { compile } from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Generates a new file using a template file.
 * 
 * Takes an input template file, generates an output file and 
 * stores it into a destination file.
 * 
 * @param {string} templatePath Path of the template file
 * @param {string} dest Path of the destination file
 * @param {Object} args Template arguments
 */
export const generateFileFromTemplate = (templatePath: string, dest: string, args: any): void => {
  const templateContent = readFileSync(templatePath, { encoding: 'utf-8' });
  const template = compile(templateContent);
  const templateOutput = template(args);
  writeFileSync(dest, templateOutput);
};

/**
 * Finds a line that matches a regular expression in a text file.
 * 
 * @param {string} source Input file path
 * @param {RegExp} regex Regular expression that matches line
 * @returns {number} The first line that matches, -1 if none
 */
export const findLine = (source: string, regex: RegExp): number => {
  const content = readFileSync(source, { encoding: 'utf-8' });
  const lines = content.split('\n');
  for (const [i, line] of lines.entries()) {
    if (regex.test(line)) return i;
  }
  // Not matching line
  return -1;
};

/**
 * Inserts a new line in a text file
 * 
 * @param {string} source Input file path
 * @param {string} index Index of the new line to insert
 * @param {string} insert Text line to insert in file
 */
export const insertLine = (source: string, index: number, insert: string): void => {
  const content = readFileSync(source, { encoding: 'utf-8' });
  const lines = content.split('\n');
  lines.splice(index, 0, insert);
  writeFileSync(source, lines.join('\n'));
};