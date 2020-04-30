import { main } from './Main'

describe('ABC049Cの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['erasedream', 'YES'],
    ['dreameraser', 'YES'],
    ['dreamerer', 'NO']
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
