export class MochiDimeterList {
  private readonly mochiDiameters: number[]

  constructor (mochiDimeters: number[]) {
    this.mochiDiameters = mochiDimeters
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

  const inputNumbers = input.split('\n').map(validateNumberString)
  const mochiDimeters = inputNumbers.slice(1)
  if (mochiDimeters.length < inputNumbers[0]) {
    throwError()
  }
  return new MochiDimeterList(mochiDimeters)
}

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
}
