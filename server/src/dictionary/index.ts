import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  MarkupContent,
  MarkupKind
} from 'vscode-languageserver-protocol'

import functions from './files/functions.json'
import headers from './files/headers.json'
import routines from './files/routines.json'

interface CompletionDetail {
  detail: string,
  documentation: string | MarkupContent
}

interface InfoHover {
  name: string,
  contents: MarkupContent
}

const completions: CompletionItem[] = []
const completionDetails: CompletionDetail[] = []
const infoHovers: InfoHover[] = []

let completionsCounter: number = 0

for (const func of functions) {
  const args: any[] = []
  const snippetArgs: any[] = []
  const detailArgs: any[] = []
  const params: any[] = []

  let argsCounter: number = 0

  for (const arg of func.arguments) {
    argsCounter++

    args.push(arg.name)
    snippetArgs.push(`\${${argsCounter}:${arg.name}}`)

    if (arg.type !== '') {
      detailArgs.push(`${arg.name}: ${arg.type}`)
      params.push(`_@param_ \`${arg.type}\` \`${arg.name}\``)

      continue
    }

    detailArgs.push(`${arg.name}`)
    params.push(`_@param_ \`${arg.name}\``)
  }

  completions.push({
    label: `${func.name}(${args.join(', ')})`,
    insertText: `${func.name}(${snippetArgs.join(', ')})`,
    insertTextFormat: InsertTextFormat.Snippet,
    kind: CompletionItemKind.Function,
    data: completionsCounter
  })

  const hasParams: boolean = (params.length > 0)
  const hasReturn: boolean = (typeof func.return.name !== 'undefined')
  const hasReturnType: boolean = (typeof func.return.type !== 'undefined')
  const hasDescription: boolean = (func.description !== '')
  const hasNotes: boolean = (func.notes !== '')

  let details: string = `(function) ${func.name}(${detailArgs.join(', ')})`

  if (hasReturnType) {
    details = details + `: ${func.return.type}`
  } else if (hasReturn) {
    details = details + ': free'
  }

  const documentation: any[] = []

  if (hasDescription) {
    documentation.push(func.description)
  }

  if (hasNotes) {
    documentation.push(func.notes)
  }

  const docBlock: any[] = []

  if (hasParams) {
    docBlock.push('\n\n')

    for (let i = 0; i < params.length; i++) {
      docBlock.push(params[i])

      if (i !== (params.length - 1)) {
        docBlock.push('  \n')
      }
    }
  }

  if (hasReturn) {
    docBlock.push('\n\n')

    if (hasReturnType) {
      docBlock.push(
        `_@return_ \`${func.return.type}\` \`${func.return.name}\``
      )
    } else {
      docBlock.push(`_@return_ \`${func.return.name}\``)
    }
  }

  completionDetails.push({
    detail: details,
    documentation: {
      kind: MarkupKind.Markdown,
      value: documentation.join('\n\n') + docBlock.join('')
    }
  })

  completionsCounter++
}

for (const header of headers) {
  completions.push({
    label: header.name,
    insertText: `${header.name}[\${1:${header.argument}}]`,
    insertTextFormat: InsertTextFormat.Snippet,
    kind: CompletionItemKind.Keyword,
    data: completionsCounter
  })

  completionDetails.push({
    detail: `(header) ${header.name}[${header.argument}]`,
    documentation: {
      kind: MarkupKind.Markdown,
      value: header.description
    }
  })

  completionsCounter++

  infoHovers.push({
    name: header.name,
    contents: {
      kind: MarkupKind.Markdown,
      value: header.description
    }
  })
}

for (const routine of routines) {
  completions.push({
    label: routine.name,
    insertText: `${routine.name} {\n\t$0\n}`,
    insertTextFormat: InsertTextFormat.Snippet,
    kind: CompletionItemKind.Struct,
    data: completionsCounter
  })

  completionDetails.push({
    detail: `(routine) ${routine.name}`,
    documentation: {
      kind: MarkupKind.Markdown,
      value: routine.description
    }
  })

  completionsCounter++

  infoHovers.push({
    name: routine.name,
    contents: {
      kind: MarkupKind.Markdown,
      value: routine.description
    }
  })
}

export { completions, completionDetails, infoHovers }
