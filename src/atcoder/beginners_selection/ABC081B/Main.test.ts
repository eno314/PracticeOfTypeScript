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

  describe('代替コース:入力値のフォーマットが不正', () => {
    test.each([
      [''],
      ['3']
    ])('入力値の行数が2件未満の場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input format is invalid.')
    })

    test.each([
      ['\n8 12 40'],
      ['a\n8 12 40']
    ])('1行目が数字ではない場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input format is invalid.')
    })

    test.each([
      ['1\n'],
      ['2\n8 a']
    ])('2行目をスペースで分割して各要素が数字ではない場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input format is invalid.')
    })
  })

  describe('代替コース:入力値が制約に合致しない', () => {
    test.each([
      ['0\n1'],
      ['-1\n1'],
      ['1.1\n1']
    ])('Nと整数リストのサイズが一致しない場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input value is invalid.')
    })

    test('整数リストのサイズが200より大きい場合、システムは例外を投げて異常終了する', () => {
      const numbers = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20'
      const input = `201\n1 ${numbers} ${numbers} ${numbers} ${numbers} ${numbers} ${numbers} ${numbers} ${numbers} ${numbers} ${numbers}`
      expect(() => inputParser.parse(input))
        .toThrowError('input value is invalid.')
    })

    test.each([
      ['1\n1.1'],
      ['1\n0.1']
    ])('Aiが整数ではない場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input value is invalid.')
    })

    test.each([
      ['1\n0'],
      ['1\n-1']
    ])('Aiが1より小さい場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input value is invalid.')
    })

    test.each([
      ['1\n10000000000'],
      ['1\n1000000001']
    ])('Aiが10の9乗より大きい場合、システムは例外を投げて異常終了する', (input: string) => {
      expect(() => inputParser.parse(input))
        .toThrowError('input value is invalid.')
    })
  })

  describe('システムは整数リストの各要素の2で割り切れる回数を計算し、最小値を答えとする', () => {
    test.each([
      [new IntegerList([8, 12, 40]), 2],
      [new IntegerList([5, 6, 8, 10]), 0],
      [new IntegerList([382253568, 723152896, 37802240, 379425024, 404894720, 471526144]), 8],
      [new IntegerList([536870912]), 29]
    ])('正常系', (integerList: IntegerList, expected: number) => {
      const actual = integerList.calculateMinCountOfDivisibleOfAllValues()
      expect(actual).toBe(expected)
    })
  })
})
