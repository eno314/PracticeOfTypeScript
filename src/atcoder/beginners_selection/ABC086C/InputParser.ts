import { parseToInteger, throwError, validateRange } from '../../libs/InputParserLibrary'
import { TravelPlan } from './TravelPlan'
import { VisitPoint } from './VisitPoint'

export const MAX_NUMBER = 100000
export const MIN_N = 1
export const MIN_T = 1
export const MIN_X = 0
export const MIN_Y = 0

export function parseInput (input: string): TravelPlan {
  return parseToTravelPlan(input)
}

function parseToTravelPlan (input: string): TravelPlan {
  const [n, visitPoints] = parseNAndVisitPoints(input)
  if (visitPoints.length < n) {
    throwError()
  }
  return new TravelPlan(visitPoints)
}

function parseNAndVisitPoints (input: string): [number, VisitPoint[]] {
  const lines = input.split('\n')
  const n = parseN(lines[0])
  const visitPoints = parseVisitPoints(lines.splice(1, n))
  return [n, visitPoints]
}

function parseN (line: string): number {
  const n = parseToInteger(line)
  validateRange(n, MIN_N, MAX_NUMBER)
  return n
}

function parseVisitPoints (visitPointInputs: string[]): VisitPoint[] {
  return visitPointInputs.map(parseVisitPoint)
}

function parseVisitPoint (line: string): VisitPoint {
  const [t, x, y] = line.split(' ').map(parseToInteger)
  if (x === undefined || y === undefined) {
    throwError()
  }
  validateRange(t, MIN_T, MAX_NUMBER)
  validateRange(x, MIN_X, MAX_NUMBER)
  validateRange(y, MIN_Y, MAX_NUMBER)
  return new VisitPoint(t, x, y)
}
