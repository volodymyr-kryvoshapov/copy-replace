# copy-replace
A cli tool that copy and paste directory files and replace text occurrences in files content and path in different cases.

## Installation

`npm i -g copy-replace` or `yarn global add copy-replace`

## Use case

`copy-replace --src /absolute/path --dst /absolute/path --from "old project" --to "new success project"`

## Arguments

```sh
copy-replace -h
Usage: copy-replace [options]

A cli tool that copy and paste directory files and replace text occurrences in files content and path in different cases.

Options:
  -V, --version  output the version number
  --src <src>    The directory absolute path to copy
  --dst <dst>    The directory absolute path that will contain the copied one
  --from <from>  Word to replace, preferable lowercase separated with spaces
  --to <to>      Replacement for "from"
  -h, --help     display help for command
```

## If you clone it locally in order to run from everywhere execute from project root:

`npm link`


