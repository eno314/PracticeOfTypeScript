import { main } from './Main'

describe('ABC085Cの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['1 1000', '0 0 1'],
    ['1 5000', '0 1 0'],
    ['1 10000', '1 0 0'],
    ['2 6000', '0 1 1'],
    ['3 16000', '1 1 1'],
    ['9 45000', '4 0 5'],
    ['20 196000', '-1 -1 -1'],
    ['1000 1234000', '26 0 974'],
    ['2000 20000000', '2000 0 0']
  ])('%oを入力値として渡すと、%sを出力する', (input: string, expected: string) => {
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
