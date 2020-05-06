import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { parseInput } from './InputParser'
import { mainFactory, outputFactory } from './Main'
import { TravelPlan } from './TravelPlan'

describe('ABC086CのMain', () => {
  test('mainの生成', () => {
    const expected = new SimpleMain<TravelPlan>(
      parseInput,
      outputFactory,
      defaultInputLoader,
      defaultOutputPrinter
    )
    const acutal = mainFactory()
    expect(acutal).toEqual(expected)
  })
})
