export function defaultInputLoader (): string {
  return require('fs').readFileSync('/dev/stdin', 'utf8')
}
export function defaultOutputPrinter (output: string): void {
  console.log(output)
}

export class SimpleMain<T> {
  private readonly inputParser: (input: string) => T
  private readonly outputFactory: (resultOfParse: T) => string
  private readonly inputLoader: () => string
  private readonly outputPrinter: (output: string) => void

  constructor (
    inputParser: (input: string) => T,
    outputFactory: (resultOfParse: T) => string,
    inputLoader: () => string,
    outputPrinter: (output: string) => void
  ) {
    this.inputParser = inputParser
    this.outputFactory = outputFactory
    this.inputLoader = inputLoader
    this.outputPrinter = outputPrinter
  }

  execute (): void {
    const input = this.inputLoader()
    const resultOfParse = this.inputParser(input)
    const output = this.outputFactory(resultOfParse)
    this.outputPrinter(output)
  }
}
