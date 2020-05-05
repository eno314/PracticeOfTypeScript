
export type OutputMaker = () => string
export type InputParser = (input: string) => OutputMaker

type InputLoader = () => string
type OutputPrinter = (output: string) => void

export class SimpleMain {
  private readonly inputParser: InputParser
  private readonly inputLoader: InputLoader
  private readonly outputPrinter: OutputPrinter

  constructor (
    inputParser: InputParser,
    inputLoader: InputLoader,
    outputPrinter: OutputPrinter
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
