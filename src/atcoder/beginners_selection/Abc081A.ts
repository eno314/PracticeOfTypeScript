import { Square } from './ABC081A/Square'

export class Squares {
  private readonly squares: Square[]

  constructor (...squareStrings: [string, string, string]) {
    this.squares = squareStrings.map(squareString => new Square(squareString))
  }

  countSquaresPlacedMarble (): number {
    return this.squares.filter(square => square.canPlaceMarble()).length
  }
}

export function parseInput (input: string): Squares {
  if (input.length < 3) {
    throw new Error('input format is invalid.')
  }
  return new Squares(input[0], input[1], input[2])
}

export function loadInput (inputLoader: () => string): string {
  return inputLoader()
}

export function printOutput (output: string, outputPrinter: (output: string) => void): void {
  outputPrinter(output)
}

export function abc081A (input: string): string {
  const squares = parseInput(input)
  return String(squares.countSquaresPlacedMarble())
}

export function main (): void {
  const inputLoader = (): string => require('fs').readFileSync('/dev/stdin', 'utf8')
  const outputPrinter = (output: string): void => console.log(output)

  const input = loadInput(inputLoader)
  const output = abc081A(input)
  printOutput(output, outputPrinter)
}
