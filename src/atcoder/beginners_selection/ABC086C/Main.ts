import { SimpleMain } from '../../libs/SimpleMain'
import { parseInput } from './InputParser'

export class Main extends SimpleMain {
  translate (input: string): string {
    const travelPlan = parseInput(input)
    if (travelPlan.canDo()) {
      return 'Yes'
    } else {
      return 'No'
    }
  }
}
