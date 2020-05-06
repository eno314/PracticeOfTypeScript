import { parseInput } from './ABC081A/InputParser'

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
