import { calculateAnswer, parseInput } from './Main'

describe('システムは入力値をパースして、N（お札の総枚数）とY（合計金額）を生成する', () => {
  test.each([
    ['1 1000', [1, 1000]],
    ['2000 20000000', [2000, 20000000]]
  ])('%oをパースした結果は%o', (input: string, expected: number[]) => {
    const actual = parseInput(input)
    expect(actual).toStrictEqual(expected)
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    test.each([
      [''],
      [' '],
      ['  ']
    ])('入力値が空(%o)の場合、パースするとエラーを投げる', testWhenInvalidFormat)

    test.each([
      ['1']
    ])('入力値を半角スペースで分割して要素数が2未満(%o)の場合、パースするとエラーを投げる', testWhenInvalidFormat)

    describe('入力値を半角スペースで分割して、1つめの要素が不正', () => {
      test.each([
        ['a 2']
      ])('1つめの要素が数字ではない(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['1.1 2']
      ])('1つめの要素が整数ではない(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['0 2'],
        ['-1 2']
      ])('1つめの要素が1より小さい(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['2001 2']
      ])('1つめの要素が2000より大きい場合、パースするとエラーを投げる', testWhenInvalidFormat)
    })

    describe('入力値を半角スペースで分割して、2つめの要素が不正', () => {
      test.each([
        ['1 b']
      ])('2つめの要素が数字ではない(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['1 22.2']
      ])('2つめの要素が整数ではない(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['1 999'],
        ['1 -999'],
        ['1 0']
      ])('2つめの要素が1000より小さい(%o)場合、パースするとエラーを投げる', testWhenInvalidFormat)

      test.each([
        ['1 20000001'],
        ['1 200000000']
      ])('2つめの要素が20000000より大きい場合、パースするとエラーを投げる', testWhenInvalidFormat)
    })
  })

  function testWhenInvalidFormat (input: string): void {
    expect(() => parseInput(input)).toThrowError('invalid format input')
  }
})

describe('システムはNとYから答えを算出する', () => {
  test.each([
    [1, 1000, '0 0 1'],
    [1, 5000, '0 1 0'],
    [1, 10000, '1 0 0'],
    [2, 2000, '0 0 2'],
    [2, 6000, '0 1 1'],
    [2, 11000, '1 0 1'],
    [2, 15000, '1 1 0'],
    [3, 16000, '1 1 1'],
    [9, 45000, '4 0 5'],
    [1000, 1234000, '26 0 974'],
    [2000, 20000000, '2000 0 0']
  ])('[n : %i], [y : %i]の場合%oになる', (n: number, y: number, expected: string) => {
    const actual = calculateAnswer(n, y)
    expect(actual).toBe(expected)
  })

  describe('代替コース : 答えとなる組み合わせが無い', () => {
    test.each([
      [1, 2000],
      [2, 7000],
      [3, 40000],
      [20, 196000]
    ])('[n : %i], [y : %i]の場合"-1 -1 -1"になる', (n: number, y: number) => {
      const actual = calculateAnswer(n, y)
      expect(actual).toBe('-1 -1 -1')
    })
  })
})
