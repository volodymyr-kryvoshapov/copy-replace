#!/usr/bin/env node

const commander = require('commander');
const { copyReplace } = require('./index');
const pjson = require('../package.json');
const program = new commander.Command();

program
  .version(pjson.version)
  .description('A cli tool that copy and paste directory files and replace text occurrences in files content and path in different cases.')
  .requiredOption('--src <src>', 'The directory absolute path to copy')
  .requiredOption('--dst <dst>', 'The directory absolute path that will contain the copied one')
  .requiredOption('--from <from>', 'Word to replace, preferable lowercase separated with spaces')
  .requiredOption('--to <to>', 'Replacement for "from"');

program.parse(process.argv);

copyReplace(program.opts());
