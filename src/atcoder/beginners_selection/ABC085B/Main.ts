export class MochiDimeterList {
  private readonly mochiDimeters: number[]

  constructor (mochiDimeters: number[]) {
    this.mochiDimeters = mochiDimeters
  }

  countUniqMochiDimeters (): number {
    return new Set(this.mochiDimeters).size
  }
}

export function parseInput (input: string): MochiDimeterList {
  const throwError = (): void => { throw new Error('input format is invalid.') }

  const validateNumberString = (numberString: string): number => {
    if (numberString.length < 1) {
      throwError()
    }
    const numberValue = Number(numberString)
    if (!Number.isInteger(numberValue)) {
      throwError()
    }
    if (numberValue < 1 || numberValue > 100) {
      throwError()
    }
    return numberValue
  }

  const inputs = input.split('\n')
  const n = validateNumberString(inputs[0])

  const mochiDimeters = inputs.slice(1, n + 1).map(validateNumberString)
  if (mochiDimeters.length < n) {
    throwError()
  }
  return new MochiDimeterList(mochiDimeters)
}

export function countMochiOfMaxSizeOfKagamiMochi (mochiDimeterList: MochiDimeterList): number {
  return mochiDimeterList.countUniqMochiDimeters()
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
  const mochiDimeterList = parseInput(inputLoader())
  const answer = countMochiOfMaxSizeOfKagamiMochi(mochiDimeterList)
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
