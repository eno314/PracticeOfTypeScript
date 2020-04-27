import { main } from './Main'

describe('ABC085Bの受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)
  const handredCounterString = Array(100).fill(0).map((_, index) => index + 1).join('\n')

  test.each([
    ['1\n1\n', '1'],
    ['2\n1\n1\n', '1'],
    ['2\n1\n2\n', '2'],
    ['3\n15\n15\n15\n', '1'],
    ['4\n10\n8\n8\n6', '3'],
    ['7\n50\n30\n50\n100\n50\n80\n30', '4'],
    [`100\n${handredCounterString}`, '100']
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
