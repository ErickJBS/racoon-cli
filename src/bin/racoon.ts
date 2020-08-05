#!/usr/bin/env node
import { NewAction } from '../actions/new.action';
import { NewCommand } from '../commands/new.command';
import { GenerateAction } from '../actions/generate.action';
import { GenerateCommand } from '../commands/generate.command';

const newAction = new NewAction();
new NewCommand(newAction).bind();
const generateAction = new GenerateAction();
new GenerateCommand(generateAction).bind();