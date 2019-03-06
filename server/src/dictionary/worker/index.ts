import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  MarkupKind
} from 'vscode-languageserver-protocol'

import { CompletionDetail, CombinedCompletion } from '../../common/types'

export default {
  processFunction: (func: any, data: number): CombinedCompletion => {
    let completionItem: CompletionItem
    let completionDetail: CompletionDetail

    const args: string[] = []
    const snippetArgs: string[] = []
    const detailArgs: string[] = []
    const params: string[] = []

    let argsCounter = 0

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

    completionItem = {
      label: `${func.name}(${args.join(', ')})`,
      insertText: `${func.name}(${snippetArgs.join(', ')})`,
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Function,
      data: data
    }

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

    completionDetail = {
      detail: details,
      documentation: {
        kind: MarkupKind.Markdown,
        value: documentation.join('\n\n') + docBlock.join('')
      }
    }

    return {
      basic: completionItem,
      details: completionDetail
    }
  },
  processHeader: (header: any, data: number): CombinedCompletion => {
    let completionItem: CompletionItem
    let completionDetail: CompletionDetail

    let insertText = header.name
    let detail = `(header) ${header.name}`

    if (header.argument !== '') {
      insertText += `[\${1:${header.argument}}]`
      detail += `[${header.argument}]`
    }

    completionItem = {
      label: header.name,
      insertText: insertText,
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Keyword,
      data: data
    }

    completionDetail = {
      detail: detail,
      documentation: {
        kind: MarkupKind.Markdown,
        value: header.description
      }
    }

    return {
      basic: completionItem,
      details: completionDetail
    }
  },
  processRoutine: (routine: any, data: number): CombinedCompletion => {
    let completionItem: CompletionItem
    let completionDetail: CompletionDetail

    completionItem = {
      label: routine.name,
      insertText: `${routine.name} {\n\t$1\n}`,
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Struct,
      data: data
    }

    completionDetail = {
      detail: `(routine) ${routine.name}`,
      documentation: {
        kind: MarkupKind.Markdown,
        value: routine.description
      }
    }

    return {
      basic: completionItem,
      details: completionDetail
    }
  },
  processDataBlock: (dataBlock: any, data: number): CombinedCompletion => {
    let completionItem: CompletionItem
    let completionDetail: CompletionDetail

    completionItem = {
      label: dataBlock.name,
      insertText: `${dataBlock.name} {\n\t$1\n}`,
      insertTextFormat: InsertTextFormat.Snippet,
      kind: CompletionItemKind.Struct,
      data: data
    }

    completionDetail = {
      detail: `(data) ${dataBlock.name}`,
      documentation: {
        kind: MarkupKind.Markdown,
        value: dataBlock.description
      }
    }

    return {
      basic: completionItem,
      details: completionDetail
    }
  }
}
