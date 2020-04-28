class Otoshidama {
  private readonly countOf10000yen: number
  private readonly countOf5000yen: number
  private readonly countOf1000yen: number

  constructor (countOf10000yen: number, countOf5000yen: number, countOf1000yen: number) {
    this.countOf10000yen = countOf10000yen
    this.countOf5000yen = countOf5000yen
    this.countOf1000yen = countOf1000yen
  }

  amount (): number {
    return (this.countOf10000yen * 10000) + (this.countOf5000yen * 5000) + (this.countOf1000yen * 1000)
  }

  equalsAmount (amount: number): boolean {
    return amount === this.amount()
  }

  toString (): string {
    return `${this.countOf10000yen} ${this.countOf5000yen} ${this.countOf1000yen}`
  }
}

export function parseInput (input: string): [number, number] {
  const throwError = (): void => { throw new Error('invalid format input') }

  const validateNumberString = (numberString: string): number => {
    if (numberString.length < 1) {
      throwError()
    }
    const numberValue = Number(numberString)
    if (!Number.isInteger(numberValue)) {
      throwError()
    }
    return numberValue
  }

  const [n, y] = input.split(' ').slice(0, 2).map(validateNumberString)
  if (n < 1 || n > 2000) {
    throwError()
  }
  if (y === undefined || y < 1000 || y > 20000000) {
    throwError()
  }
  return [n, y]
}

export function calculateAnswer (totalCount: number, totalAmount: number): string {
  for (let counter10000 = totalCount; counter10000 >= 0; counter10000--) {
    for (let counter5000 = totalCount - counter10000; counter5000 >= 0; counter5000--) {
      const counter1000 = totalCount - counter10000 - counter5000
      const otoshidama = new Otoshidama(counter10000, counter5000, counter1000)
      if (otoshidama.equalsAmount(totalAmount)) {
        return otoshidama.toString()
      }
    }
  }
  return '-1 -1 -1'
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const [n, y] = parseInput(inputLoader())
  const answer = calculateAnswer(n, y)
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
