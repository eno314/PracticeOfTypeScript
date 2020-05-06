import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from '../../libs/SimpleMain'
import { Data } from './Data'
import { inputParser, mainFactory, outputFactory } from './Main'

describe('PracticeAのMain', () => {
  test('mainの生成', () => {
    const expected = new SimpleMain<Data>(
      inputParser,
      outputFactory,
      defaultInputLoader,
      defaultOutputPrinter
    )
    const acutal = mainFactory()
    expect(acutal).toEqual(expected)
  })
})
