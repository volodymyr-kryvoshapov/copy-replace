#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const { copyReplace } = require('./index');
const pjson = require('../package.json');
const program = new commander.Command();

program
  .version(pjson.version)
  .description(pjson.description)
  .requiredOption('--src <src>', 'The directory absolute path to copy. If option --dst not specified then move instead of copy will be applied')
  .option('--dst <dst>', 'The directory absolute path that will contain the copied one')
  .requiredOption('--from <from>', 'Word to replace, preferable lowercase separated with spaces')
  .requiredOption('--to <to>', 'Replacement for "from"');

program.parse(process.argv);

const { src, dst, from, to } = program.opts();

if (!dst) {
  inquirer
    .prompt([{ type: 'confirm', name: 'move', message: 'You skip --dsp option, move instead of copy?', default: true }])
    .then((answers) => {
      if (answers.move) {
        copyReplace(src, null, from, to);
      }
    })
} else {
  copyReplace(src, dst, from, to);
}
