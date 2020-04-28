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

export function main (inputLoader: () => string, outputPrinter: (outputString: string) => void): void {
}
