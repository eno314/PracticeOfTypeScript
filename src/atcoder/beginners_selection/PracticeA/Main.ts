import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { Data } from './Data'
import { InputParser } from './InputParser'

export const inputParser = (input: string): Data => new InputParser().parse(input)
export const outputFactory = (data: Data): string => data.toString()

export function mainFactory (
  inputLoader: () => string = defaultInputLoader,
  outputPrinter: (output: string) => void = defaultOutputPrinter
): SimpleMain<Data> {
  return new SimpleMain<Data>(
    inputParser,
    outputFactory,
    inputLoader,
    outputPrinter
  )
}
