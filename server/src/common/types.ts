import { CompletionItem, MarkupContent } from 'vscode-languageserver-protocol'

export interface CombinedCompletion {
  basic: CompletionItem;
  details: CompletionDetail;
}

export interface CompletionDetail {
  detail: string;
  documentation: string | MarkupContent;
}

export interface CursorInfo {
  type: string;
  word: string;
}

export interface InfoHover {
  name: string;
  contents: MarkupContent;
}
