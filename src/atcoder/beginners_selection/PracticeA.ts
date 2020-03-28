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

export class PracticeAInput {
  private readonly a: number
  private readonly b: number
  private readonly c: number
  private readonly s: string

  constructor (a: number, b: number, c: number, s: string) {
    if (!this.isValidNumberProperty(a)) {
      throw new Error('a violates constraint.')
    }
    if (!this.isValidNumberProperty(b)) {
      throw new Error('b violates constraint.')
    }
    if (!this.isValidNumberProperty(c)) {
      throw new Error('c violates constraint.')
    }
    if (!this.isValidStringProperty(s)) {
      throw new Error('s violates constraint.')
    }

    this.a = a
    this.b = b
    this.c = c
    this.s = s
  }

  private isValidNumberProperty (num: number): boolean {
    if (!Number.isInteger(num)) {
      return false
    }

    return num >= 1 && num <= 1000
  }

  private isValidStringProperty (str: string): boolean {
    return str.length >= 1 && str.length <= 100
  }

  toOutputString (): string {
    return `${this.a + this.b + this.c} ${this.s}`
  }
}

export function practiceAInputParser (inputString: string): PracticeAInput {
  const parsed = parseInputStringToArray(inputString)
  return new PracticeAInput(parsed[0], parsed[1], parsed[2], parsed[3])
}

function parseInputStringToArray (inputString: string): [number, number, number, string] {
  const inputStrings = inputString.split('\n')
  if (inputStrings.length < 3) {
    throw new Error('input format is invalid.')
  }

  const a = parseNumberString(inputStrings[0])
  const bc = parseBAndCToArray(inputStrings[1])

  return [a, bc[0], bc[1], inputStrings[2]]
}

function parseBAndCToArray (bcString: string): [number, number] {
  const bc = bcString.split(' ')
  if (bc.length < 2) {
    throw new Error('input format is invalid.')
  }

  const b = parseNumberString(bc[0])
  const c = parseNumberString(bc[1])
  return [b, c]
}

function parseNumberString (numberString: string): number {
  if (numberString.length === 0) {
    throw new Error('input format is invalid.')
  }
  const num = Number(numberString)
  if (Number.isNaN(num)) {
    throw new Error('input format is invalid.')
  }
  return num
}
