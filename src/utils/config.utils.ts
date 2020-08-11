import { join } from 'path';

import { AppArguments } from '../types/arguments';

/**
 * Gets application preferences.
 * 
 * Finds application config file in the current project root
 * and parses its content.
 * 
 * @returns {AppArguments} Application preferences
 */
export const getAppArguments = (): AppArguments => {
  try {
    const configPath = join(getProjectDir(), 'racoon.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configJson = require(configPath);
    return new AppArguments(configJson);
  } catch (e) {
    throw new Error('Racoon config file (racoon.json) not found');
  }
};

/**
 * Returns project directory.
 * 
 * It assumes the user is located in the root of the project
 * and returns the current working directory.
 * 
 * @returns {string} Project directory
 */
export const getProjectDir = (): string => {
  return process.cwd();
};
