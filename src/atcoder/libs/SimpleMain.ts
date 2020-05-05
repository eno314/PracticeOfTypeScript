
export type OutputMaker = () => string
export type InputParser = (input: string) => OutputMaker

type InputLoader = () => string
type OutputPrinter = (output: string) => void

export function defaultInputLoader (): string {
  return require('fs').readFileSync('/dev/stdin', 'utf8')
}
export function defaultOutputPrinter (output: string): void {
  console.log(output)
}

export class SimpleMain {
  private readonly inputParser: InputParser
  private readonly inputLoader: InputLoader
  private readonly outputPrinter: OutputPrinter

  constructor (
    inputParser: InputParser,
    inputLoader: InputLoader = defaultInputLoader,
    outputPrinter: OutputPrinter = defaultOutputPrinter
  ) {
    this.inputParser = inputParser
    this.inputLoader = inputLoader
    this.outputPrinter = outputPrinter
  }

  execute (): void {
    const input = this.inputLoader()
    const outputMaker = this.inputParser(input)
    const output = outputMaker()
    this.outputPrinter(output)
  }
}
