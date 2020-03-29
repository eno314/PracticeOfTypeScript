export class Input {
  private readonly a: number
  private readonly b: number

  constructor (a: number, b: number) {
    if (!this.isValidNumberProperty(a)) {
      throw new Error('a violates constraint.')
    }
    if (!this.isValidNumberProperty(b)) {
      throw new Error('b violates constraint.')
    }
    this.a = a
    this.b = b
  }

  private isValidNumberProperty (num: number): boolean {
    if (!Number.isInteger(num)) {
      return false
    }

    return num >= 1 && num <= 10000
  }

  toOutputString (): string {
    return ''
  }
}

export class InputParser {
  parse (inputString: string): Input {
    const ab = inputString.split(' ')
    if (ab.length < 2) {
      throw new Error('input format is invalid.')
    }

    const a = this.parseNumberString(ab[0])
    const b = this.parseNumberString(ab[1])
    return new Input(a, b)
  }

  private parseNumberString (numberString: string): number {
    if (numberString.length === 0) {
      throw new Error('input format is invalid.')
    }
    const num = Number(numberString)
    if (Number.isNaN(num)) {
      throw new Error('input format is invalid.')
    }
    return num
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
