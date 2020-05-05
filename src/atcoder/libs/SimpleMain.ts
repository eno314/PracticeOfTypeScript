
export function defaultInputLoader (): string {
  return require('fs').readFileSync('/dev/stdin', 'utf8')
}
export function defaultOutputPrinter (output: string): void {
  console.log(output)
}

export abstract class SimpleMain {
  private readonly inputLoader: () => string
  private readonly outputPrinter: (output: string) => void

  constructor (
    inputLoader: () => string = defaultInputLoader,
    outputPrinter: (output: string) => void = defaultOutputPrinter
  ) {
    this.inputLoader = inputLoader
    this.outputPrinter = outputPrinter
  }

  execute (): void {
    const input = this.inputLoader()
    const output = this.translate(input)
    this.outputPrinter(output)
  }

  abstract translate(input: string): string
}
