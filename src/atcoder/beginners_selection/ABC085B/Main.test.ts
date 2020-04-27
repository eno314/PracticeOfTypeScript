import { countMochiOfMaxSizeOfKagamiMochi, MochiDimeterList, parseInput } from './Main'

describe('システムは入力値をパースして、餅の直径リストを生成する', () => {
  describe('正常系', () => {
    const handredCounterNumbers = Array(100).fill(0).map((_, index) => index + 1)

    test.each([
      ['1\n1', new MochiDimeterList([1])],
      ['2\n1\n2', new MochiDimeterList([1, 2])],
      ['3\n1\n2\n3\n', new MochiDimeterList([1, 2, 3])],
      [`100\n${handredCounterNumbers.join('\n')}`, new MochiDimeterList(handredCounterNumbers)]
    ])('%oをパースすると%oになる', (input: string, expected: MochiDimeterList) => {
      const actual = parseInput(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    describe('入力値を改行文字で分割して、各要素が数字でない・整数でない・1より小さい・100より大きい', () => {
      test.each([
        [''],
        ['a\n1'],
        ['1.1\n1'],
        ['-1\n1'],
        ['0'],
        ['101\n1'],
        ['1\n'],
        ['2\n1\na'],
        ['3\n1\n2\n3.3'],
        ['4\n1\n2\n3\n-1'],
        ['5\n1\n2\n3\n4\n0'],
        ['6\n1\n2\n3\n4\n5\n101']
      ])('%oをパースすると例外を投げる', (input: string) => {
        expect(() => parseInput(input)).toThrowError('input format is invalid')
      })
    })

    describe('入力値を改行文字で分割して、1つめの要素の数が、2つ目以降の件数よりも小さい', () => {
      test.each([
        ['1'],
        ['2\n1']
      ])('%oをパースすると例外を投げる', (input: string) => {
        expect(() => parseInput(input)).toThrowError('input format is invalid')
      })
    })
  })
})

describe('システムは餅の直径リストを使い、鏡餅を作った場合の最大の段数を算出する', () => {
  test.each([
    [new MochiDimeterList([1]), 1],
    [new MochiDimeterList([1, 2]), 2],
    [new MochiDimeterList([10, 8, 8, 6]), 3],
    [new MochiDimeterList([15, 15, 15, 15, 15]), 1],
    [new MochiDimeterList([50, 30, 50, 100, 50, 80, 30]), 4]
  ])('%oを使って鏡餅を作った場合、最大の段数は%i', (mochiDimeterList: MochiDimeterList, expected: number) => {
    const actual = countMochiOfMaxSizeOfKagamiMochi(mochiDimeterList)
    expect(actual).toBe(expected)
  })
})
