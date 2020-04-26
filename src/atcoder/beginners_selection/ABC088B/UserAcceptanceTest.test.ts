import { main } from './Main'

describe('ABC088Bの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['1\n1', '1'],
    ['2\n3 1', '2'],
    ['3\n2 7 4', '5'],
    ['4\n20 18 2 18', '18']
  ])('ABC088Bに"%s"を渡すと"%s"を出力する', (input: string, expected: string) => {
    // setup
    const mockInputLoader = jest.fn(() => input)

    // execute
    main(mockInputLoader, mockOutputPrinter)

    // verify
    expect(mockInputLoader.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expected)
  })
})
