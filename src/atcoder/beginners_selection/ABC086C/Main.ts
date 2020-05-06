import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { parseInput } from './InputParser'
import { TravelPlan } from './TravelPlan'

export const outputFactory = (travelPlan: TravelPlan): string => {
  return travelPlan.canDo() ? 'Yes' : 'No'
}

export function mainFactory (
  inputLoader: () => string = defaultInputLoader,
  outputPrinter: (output: string) => void = defaultOutputPrinter
): SimpleMain<TravelPlan> {
  return new SimpleMain<TravelPlan>(
    parseInput,
    outputFactory,
    inputLoader,
    outputPrinter
  )
}
