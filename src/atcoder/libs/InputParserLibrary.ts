export function parseToInteger (strValue: string): number {
  if (strValue.length === 0) {
    throwError()
  }
  const intValue = Number(strValue)
  if (!Number.isInteger(intValue)) {
    throwError()
  }
  return intValue
}

export function validateRange (value: number, min: number, max: number): void {
  if (value < min || value > max) {
    throwError()
  }
}

export function throwError (message: string = 'invalid format input'): void {
  throw new Error(message)
}
