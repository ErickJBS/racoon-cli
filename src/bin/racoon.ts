#!/usr/bin/env node
import { NewAction } from '../actions/new.action';
import { NewCommand } from '../commands/new.command';

const action = new NewAction();
new NewCommand(action).bind();