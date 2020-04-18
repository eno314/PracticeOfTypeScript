import { InputParser, IntegerList } from './Main'

/*
describe('受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['3\n8 12 40', '2'],
    ['4\n5 6 8 10', '0'],
    ['6\n382253568 723152896 37802240 379425024 404894720 471526144', '8']
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
*/

describe('システムは入力値をパースして、Nと整数リストを作成する', () => {
  const inputParser = new InputParser()

  test.each([
    ['3\n8 12 40', new IntegerList([8, 12, 40])]
  ])('正常系', (input: string, expected: IntegerList) => {
    const actual = inputParser.parse(input)
    expect(actual).toEqual(expected)
  })
})
