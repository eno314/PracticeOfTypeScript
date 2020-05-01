import { main } from './Main'

describe('ABC0856の受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['2\n3 1 2\n6 1 1\n', 'Yes'],
    ['1\n2 100 100\n', 'No'],
    ['2\n5 1 1\n100 1 1', 'No']
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
