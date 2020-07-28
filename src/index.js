const replace = require('replace');
const klawSync = require('klaw-sync');
const fs = require('fs-extra');
const pathLib = require('path');
const changeCase = require('change-case');
const upperCaseFirst = require('upper-case-first').upperCaseFirst;
const upperCase = require('upper-case').upperCase;
const noCase = require('no-case').noCase;


/**
 * Copy recursive + rename + replace
 * If originDst parameter skipped move instead of copy will be applied
 *
 * @param {string} src
 * @param {string|null} originDst
 * @param {string} from
 * @param {string} to
 */
function copyReplace(src, originDst, from, to) {
  const replaceArr = getReplaceArr(from, to);
  const files = getFiles(src);

  console.log(replaceArr);

  files.forEach(path => {
    let dst = null;

    if (originDst) {
      dst = path.replace(new RegExp(`^${src}`), originDst);
      dst = replaceByRules(dst, replaceArr);

      fs.ensureDirSync(pathLib.dirname(dst));
      fs.copySync(path, dst);
    } else {
      dst = replaceByRules(path, replaceArr);

      if (path !== dst) {
        fs.moveSync(path, dst, { overwrite: true });
      }
    }

    replaceFilesContent(dst, replaceArr);
  });
}


function getReplaceArr(from, to) {
  const res = [];

  res.push({ "from": noCase(from), "to": noCase(to) });
  res.push({ "from": upperCase(from), "to": upperCase(to) });
  res.push({ "from": upperCaseFirst(from), "to": upperCaseFirst(to) });
  res.push({
    "from": changeCase.camelCase(from, { transform: changeCase.camelCaseTransformMerge }),
    "to": changeCase.camelCase(to, { transform: changeCase.camelCaseTransformMerge }),
  });
  res.push({ "from": changeCase.capitalCase(from), "to": changeCase.capitalCase(to) });
  res.push({ "from": changeCase.constantCase(from), "to": changeCase.constantCase(to) });
  res.push({ "from": changeCase.paramCase(from), "to": changeCase.paramCase(to) });
  res.push({
    "from": changeCase.pascalCase(from, { transform: changeCase.pascalCaseTransformMerge }),
    "to": changeCase.pascalCase(to, { transform: changeCase.pascalCaseTransformMerge }),
  });
  res.push({ "from": changeCase.sentenceCase(from), "to": changeCase.sentenceCase(to) });
  res.push({ "from": changeCase.snakeCase(from), "to": changeCase.snakeCase(to) });

  return res;
}

/**
 * Return array with file or recursive read directory and return array with files
 *
 * @param {string} path - file or directory
 * @returns {string[]}
 */
function getFiles(path) {
  const files = [];

  if (!fs.existsSync(path)) {
    throw new Error(`File or directory not exists: "${path}"`);
  }

  if (fs.lstatSync(path).isFile()) {
    files.push(path);
  } else {
    klawSync(path, {nodir: true}).forEach(entry => files.push(entry.path));
  }

  return files;
}

function replaceByRules(str, rules) {
  rules.forEach(rule => {
    str = str.replace(new RegExp(rule.from, 'g'), rule.to);
  });

  return str;
}

function replaceFilesContent(path, rules) {
  rules.forEach((rule) => {
    replace({
      regex: rule.from,
      replacement: rule.to,
      paths: [path],
      recursive: true,
      silent: true,
    });
  });
}

module.exports = { copyReplace };
