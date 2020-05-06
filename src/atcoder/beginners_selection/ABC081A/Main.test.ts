import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { parseInput } from './InputParser'
import { mainFactory, outputFactory } from './Main'
import { Squares } from './Squares'

describe('ABC081AのMain', () => {
  test('mainの生成', () => {
    const expected = new SimpleMain<Squares>(
      parseInput,
      outputFactory,
      defaultInputLoader,
      defaultOutputPrinter
    )
    const acutal = mainFactory()
    expect(acutal).toEqual(expected)
  })
})
