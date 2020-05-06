import { mainFactory } from './Main'

describe('ABC081Aの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['000', '0'],
    ['100', '1'],
    ['110', '2'],
    ['111', '3']
  ])('入力値が%oの場合、出力値は%oになる', (input: string, expected: string) => {
    // setup
    const mockInputLoader = jest.fn(() => input)

    // execute
    const main = mainFactory(mockInputLoader, mockOutputPrinter)
    main.execute()

    // verify
    expect(mockInputLoader.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expected)
  })
})
