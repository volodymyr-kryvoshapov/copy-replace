#!/usr/bin/env node

const commander = require('commander');
const { copyReplace } = require('./index');
const pjson = require('../package.json');
const program = new commander.Command();

program
  .version(pjson.version)
  .description(pjson.description)
  .requiredOption('--src <src>', 'The directory absolute path to copy')
  .requiredOption('--dst <dst>', 'The directory absolute path that will contain the copied one')
  .requiredOption('--from <from>', 'Word to replace, preferable lowercase separated with spaces')
  .requiredOption('--to <to>', 'Replacement for "from"');

program.parse(process.argv);

copyReplace(program.opts());
