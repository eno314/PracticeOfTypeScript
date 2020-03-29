export class Input {
  toOutputString (): string {
    return ''
  }
}

export class InputParser {
  parse (inputString: string): Input {
    return new Input()
  }
}

export class Abc086A {
  private readonly inputLoader: () => string
  private readonly inputParser: InputParser
  private readonly outputPrinter: (output: string) => void

  constructor (
    inputLoader: () => string,
    inputParser: InputParser,
    outputPrinter: (output: string) => void
  ) {
    this.inputLoader = inputLoader
    this.inputParser = inputParser
    this.outputPrinter = outputPrinter
  }

  execute (): void {
    const inputString = this.inputLoader()
    const input = this.inputParser.parse(inputString)
    this.outputPrinter(input.toOutputString())
  }
}
