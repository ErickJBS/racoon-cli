#!/usr/bin/env node
import chalk from 'chalk';
import { NewAction } from '../actions/new.action';
import { NewCommand } from '../commands/new.command';
import { GenerateAction } from '../actions/generate.action';
import { GenerateCommand } from '../commands/generate.command';

process.on('uncaughtException', function(err) {
  console.error(chalk.red(err));
});

const newAction = new NewAction();
new NewCommand(newAction).bind();
const generateAction = new GenerateAction();
new GenerateCommand(generateAction).bind();