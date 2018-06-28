import { CompletionItem, MarkupContent } from 'vscode-languageserver-protocol'

interface CombinedCompletion {
  basic: CompletionItem,
  details: CompletionDetail
}

interface CompletionDetail {
  detail: string,
  documentation: string | MarkupContent
}

interface CursorInfo {
  type: string,
  word: string
}

interface InfoHover {
  name: string,
  contents: MarkupContent
}

export { CombinedCompletion, CompletionDetail, CursorInfo, InfoHover }
