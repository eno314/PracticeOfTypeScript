import { main } from './Main'

describe('ABC083Bの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['20 2 5', '84'],
    ['10 1 2', '13'],
    ['1 2 3', '0'],
    ['1 1 1', '1'],
    ['100 4 16', '4554'],
    ['10000 1 36', '50005000']
  ])('正常系', (input: string, expected: string) => {
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
