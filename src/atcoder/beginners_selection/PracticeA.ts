import { PracticeAInput } from './PracticeAInput'

export class PracticeA {
  private readonly inputLoader: () => string
  private readonly inputParser: (input: string) => PracticeAInput
  private readonly outputPrinter: (output: string) => void

  constructor (
    inputLoader: () => string,
    inputParser: (input: string) => PracticeAInput,
    outputPrinter: (output: string) => void
  ) {
    this.inputLoader = inputLoader
    this.inputParser = inputParser
    this.outputPrinter = outputPrinter
  }

  execute (): void {
    const inputString = this.inputLoader()
    const input = this.inputParser(inputString)
    this.outputPrinter(input.toOutputString())
  }
}
