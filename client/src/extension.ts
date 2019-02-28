import path from 'path'
import { ExtensionContext } from 'vscode'
import {
  LanguageClient, LanguageClientOptions, ServerOptions, TransportKind
} from 'vscode-languageclient'

let client: LanguageClient

export function activate (context: ExtensionContext): void {
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  )

  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'dnh' },
      { scheme: 'untitled', language: 'dnh' }
    ]
  }

  client = new LanguageClient(
    'dnhServer',
    'dnh server',
    serverOptions,
    clientOptions
  )

  client.start()
}

export function deactivate (): Thenable<void> | undefined {
  if (!client) {
    return undefined
  }

  return client.stop()
}
