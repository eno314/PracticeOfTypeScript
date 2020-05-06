import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { parseInput } from './InputParser'
import { Squares } from './Squares'

export const outputFactory = (squares: Squares): string => String(squares.countSquaresPlacedMarble())

export function mainFactory (
  inputLoader: () => string = defaultInputLoader,
  outputPrinter: (output: string) => void = defaultOutputPrinter
): SimpleMain<Squares> {
  return new SimpleMain<Squares>(
    parseInput,
    outputFactory,
    inputLoader,
    outputPrinter
  )
}
