import { join } from 'path';

import { AppArguments } from '../types/arguments';

export const getAppArguments = () => {
  const configPath = join(getProjectDir(), 'racoon.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configJson = require(configPath);
  return new AppArguments(configJson);
};

export const getProjectDir = () => {
  return process.cwd();
}