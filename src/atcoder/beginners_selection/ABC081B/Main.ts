
export class IntegerList {
  private readonly integers: number[]

  constructor (integers: number[]) {
    this.validateIntegers(integers)
    this.integers = integers
  }

  private validateIntegers (integers: number[]): void {
    if (integers.length > 200) {
      throw new Error('input value is invalid.')
    }

    integers.forEach(intergersValue => {
      if (!this.isValidIntegersValue(intergersValue)) {
        throw new Error('input value is invalid.')
      }
    })
  }

  private isValidIntegersValue (num: number): boolean {
    return Number.isInteger(num) && num >= 1 && num <= 1000000000
  }

  calculateMinCountOfDivisibleOfAllValues (): number {
    return this.integers.map(this.countOfDivisible)
      .reduce((a, b) => Math.min(a, b))
  }

  private countOfDivisible (integerValue: number): number {
    let currentValue = integerValue
    let count = 0
    while (currentValue % 2 === 0) {
      currentValue = currentValue / 2
      count++
    }
    return count
  }
}

export class InputParser {
  parse (input: string): IntegerList {
    const inputs = input.split('\n')
    if (inputs.length < 2) {
      throw new Error('input format is invalid.')
    }

    const n = this.parseNumberString(inputs[0])
    const numbers = inputs[1].split(' ').map(this.parseNumberString)
    if (numbers.length !== n) {
      throw new Error('input value is invalid.')
    }
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

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const input = inputLoader()
  const integerList = new InputParser().parse(input)
  const answer = integerList.calculateMinCountOfDivisibleOfAllValues()
  outputPrinter(String(answer))
}

// 以下、AtCoder提出用のコード
// const inputLoader = (): string => {
//   return require('fs').readFileSync('/dev/stdin', 'utf8')
// }
// const outputPrinter = (output: string): void => {
//   console.log(output)
// }
// main(inputLoader, outputPrinter)
