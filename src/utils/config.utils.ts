import { join } from 'path';

import { AppArguments } from '../types/arguments';

export const getAppArguments = () => {
  try {
    const configPath = join(getProjectDir(), 'racoon.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const configJson = require(configPath);
    return new AppArguments(configJson);
  } catch (e) {
    throw new Error('Racoon config file (racoon.json) not found');
  }
};

export const getProjectDir = () => {
  return process.cwd();
};