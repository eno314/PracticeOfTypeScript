
export class Abc087b {
  private readonly a: number
  private readonly b: number
  private readonly c: number
  private readonly x: number

  constructor (a: number, b: number, c: number, x: number) {
    this.validIntegersValue(a, 0, 50)
    this.validIntegersValue(b, 0, 50)
    this.validIntegersValue(c, 0, 50)
    this.validIntegersValue(x, 50, 20000)
    this.a = a
    this.b = b
    this.c = c
    this.x = x
  }

  private validIntegersValue (num: number, min: number, max: number): void {
    if (!Number.isInteger(num) || num < min || num > max) {
      throw new Error('input value is invalid.')
    }
  }

  calculateAnswer (): number {
    var answer = 0
    for (let i = 0; i <= this.a; i++) {
      if (this.calculateAmount(i, 0, 0) > this.x) {
        break
      }
      for (let j = 0; j <= this.b; j++) {
        if (this.calculateAmount(i, j, 0) > this.x) {
          break
        }
        for (let k = 0; k <= this.c; k++) {
          const amount = this.calculateAmount(i, j, k)
          if (amount === this.x) {
            answer++
            break
          }
          if (amount > this.x) {
            break
          }
        }
      }
    }
    return answer
  }

  calculateAmount (fiveHundred: number, hundred: number, fifty: number): number {
    return (fiveHundred * 500) + (hundred * 100) + (fifty * 50)
  }
}

export function parseInput (input: string): Abc087b {
  const numbers: number[] = input.split('\n')
    .slice(0, 4)
    .map(numberString => {
      if (numberString.length === 0 || numberString.match(/\S/g) === null) {
        throw new Error('input format is invalid.')
      }
      const num = Number(numberString)
      if (Number.isNaN(num)) {
        throw new Error('input format is invalid.')
      }
      return num
    })

  if (numbers.length < 4) {
    throw new Error('input format is invalid.')
  }

  return new Abc087b(numbers[0], numbers[1], numbers[2], numbers[3])
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const input = inputLoader()
  const abc087b = parseInput(input)
  const answer = abc087b.calculateAnswer()
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
