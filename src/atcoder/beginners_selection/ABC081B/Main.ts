
export class IntegerList {
  private readonly integers: number[]

  constructor (integers: number[]) {
    this.integers = integers
  }
}

export class InputParser {
  parse (input: string): IntegerList {
    const inputs = input.split('\n')
    // const n = this.parseNumberString(inputs[0])
    const numbers = inputs[1].split(' ').map(this.parseNumberString)
    return new IntegerList(numbers)
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

export function calculateAnswer (integerList: IntegerList): string {
  return ''
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const input = inputLoader()
  const integerList = new InputParser().parse(input)
  const output = calculateAnswer(integerList)
  outputPrinter(output)
}
