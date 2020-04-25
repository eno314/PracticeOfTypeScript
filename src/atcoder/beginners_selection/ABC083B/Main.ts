export class Abc083bIntegerList {
  private readonly integers: number[]

  constructor (integers: number[]) {
    this.integers = integers
  }

  sum (): number {
    if (this.integers.length === 0) {
      return 0
    }
    return this.integers.reduce((previous: number, current: number) => previous + current)
  }
}

export class Abc083bInputs {
  private readonly n: number
  private readonly a: number
  private readonly b: number

  constructor (n: number, a: number, b: number) {
    this.validIntegersValue(n, 1, 10000)
    this.validIntegersValue(a, 1, 36)
    this.validIntegersValue(b, 1, 36)
    this.n = n
    this.a = a
    this.b = b
  }

  private validIntegersValue (num: number, min: number, max: number): void {
    if (!Number.isInteger(num) || num < min || num > max) {
      throw new Error('input value is invalid.')
    }
  }

  createAbc083bIntegerList (): Abc083bIntegerList {
    const integers = Array(this.n).fill(0).map((_, index) => index + 1)
      .filter(value => {
        const sumOfEachDigit = this.calculateSumOfEachDigit(value)
        return sumOfEachDigit >= this.a && sumOfEachDigit <= this.b
      })
    return new Abc083bIntegerList(integers)
  }

  private calculateSumOfEachDigit (integerValue: number): number {
    let sum = 0
    let currentIntegerValue = integerValue
    while (true) {
      sum += currentIntegerValue % 10

      if (currentIntegerValue < 10) {
        break
      }
      currentIntegerValue = Math.floor(currentIntegerValue / 10)
    }
    return sum
  }
}

export function parseInput (inputString: string): Abc083bInputs {
  const inputNumbers = inputString.split(' ')
    .map(numberString => {
      if (numberString.length === 0) {
        throw new Error('input format is invalid.')
      }
      const num = Number(numberString)
      if (Number.isNaN(num)) {
        throw new Error('input format is invalid.')
      }
      return num
    })
  if (inputNumbers.length < 3) {
    throw new Error('input format is invalid.')
  }
  return new Abc083bInputs(inputNumbers[0], inputNumbers[1], inputNumbers[2])
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const input = parseInput(inputLoader())
  const integerList = input.createAbc083bIntegerList()
  const answer = integerList.sum()
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
