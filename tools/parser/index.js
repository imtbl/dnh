/**
 * This is a simple script to parse Sparen's ph3 function reference and
 * transform it into the format this extension needs to work.
 *
 * Usage: extract the JSON from Sparen's JS files into files and put them into
 * `./files` (e.g., `./files/system.json`, `./files/standard.json` and
 * `./files/object.json`).
 *
 * Run this parser via `node ./index.js`. This combines and transforms the
 * files and puts the output into
 * `../../server/src/dictionary/files/functions.json`.
 *
 * DO NOT use this and make the parsed versions available publicly (including
 * paid versions of your own software/projects) without asking for Sparen's
 * permission to do so.
 */

const path = require('path')
const fs = require('fs')

const fileNames = [
  // e.g., 'system', 'standard', 'object'
]

const output = []

for (const fileName of fileNames) {
  const file = require(`./files/${fileName}`)

  for (const cat of file.categories) {
    for (const func of cat.fxns) {
      const args = []

      for (const arg of func.args) {
        const argsArray = arg.split('`a []').join('free []').split(':')

        args.push(
          {
            name: argsArray[0].trim(),
            type: (typeof argsArray[1] !== 'undefined')
              ? argsArray[1].trim()
              : ''
          }
        )
      }

      const returnV = {}

      if (func.returnv.trim() !== '') {
        const returnVArray = func.returnv
          .split('`a []')
          .join('free []')
          .split(':')

        returnV.name = returnVArray[0].trim()
        returnV.type = (typeof returnVArray[1] !== 'undefined')
          ? returnVArray[1].trim()
          : ''
      }

      const description = func.description
        .split('<br>')
        .join('\n\n')
        .split('<code>')
        .join('`')
        .split('</code>')
        .join('`')
        .split('"')
        .join('\'')
        .trim()

      const notes = func.notes
        .split('<br>')
        .join('\n\n')
        .split('<code>')
        .join('`')
        .split('</code>')
        .join('`')
        .split('"')
        .join('\'')
        .trim()

      output.push({
        name: func.fname.trim(),
        arguments: args,
        return: returnV,
        description: description,
        notes: notes
      })
    }
  }
}

fs.writeFileSync(
  path.resolve(
    __dirname,
    `../../server/src/dictionary/files/functions.json`
  ),
  JSON.stringify(output, null, 2) + '\n'
)
