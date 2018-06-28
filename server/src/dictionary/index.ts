import { CompletionItem, MarkupKind } from 'vscode-languageserver-protocol'

import {
  CombinedCompletion, CompletionDetail, InfoHover
} from '../common/types'

import functions from './files/functions.json'
import headers from './files/headers.json'
import routines from './files/routines.json'

import worker from './worker'

const completions: CompletionItem[] = []
const completionDetails: CompletionDetail[] = []
const infoHovers: InfoHover[] = []

let completionsCounter: number = 0

for (const func of functions) {
  const processedFunction: CombinedCompletion = worker.processFunction(
    func, completionsCounter
  )

  completions.push(processedFunction.basic)
  completionDetails.push(processedFunction.details)

  completionsCounter++
}

for (const header of headers) {
  const processedHeader: CombinedCompletion = worker.processHeader(
    header, completionsCounter
  )

  completions.push(processedHeader.basic)
  completionDetails.push(processedHeader.details)

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
  const processedRoutine = worker.processRoutine(routine, completionsCounter)

  completions.push(processedRoutine.basic)
  completionDetails.push(processedRoutine.details)

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
