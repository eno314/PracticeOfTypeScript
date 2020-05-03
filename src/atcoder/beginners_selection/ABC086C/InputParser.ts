import { TravelPlan } from './TravelPlan'
import { VisitPoint } from './VisitPoint'

export function parseInput (input: string): TravelPlan {
  const maxNumber = 100000

  const throwError = (): void => { throw new Error('invalid format input') }

  const parseInteger = (strValue: string): number => {
    if (strValue.length === 0) {
      throwError()
    }
    const intValue = Number(strValue)
    if (!Number.isInteger(intValue)) {
      throwError()
    }
    return intValue
  }

  const validateRange = (value: number, min: number, max: number): void => {
    if (value < min || value > max) {
      throwError()
    }
  }

  const parseN = (line: string): number => {
    const n = parseInteger(line)
    validateRange(n, 1, maxNumber)
    return n
  }

  const parseVisitPoint = (line: string): VisitPoint => {
    const [t, x, y] = line.split(' ').map(parseInteger)
    if (x === undefined || y === undefined) {
      throwError()
    }
    validateRange(t, 1, maxNumber)
    validateRange(x, 0, maxNumber)
    validateRange(y, 0, maxNumber)
    return new VisitPoint(t, x, y)
  }

  const lines = input.split('\n')
  const n = parseN(lines[0])
  const visitPoints = lines.splice(1, n).map(parseVisitPoint)
  if (visitPoints.length < n) {
    throwError()
  }
  return new TravelPlan(visitPoints)
}
