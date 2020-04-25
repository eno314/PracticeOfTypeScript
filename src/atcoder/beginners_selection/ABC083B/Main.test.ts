import { Abc083bInputs, Abc083bIntegerList, parseInput } from './Main'

describe('システムは入力値をパースして、N, A, B を生成する', () => {
  describe('正常系', () => {
    test.each([
      ['1 1 1', new Abc083bInputs(1, 1, 1)],
      ['10000 36 36', new Abc083bInputs(10000, 36, 36)]
    ])('parseInput(%o) returns %o', (input: string, expected: Abc083bInputs) => {
      const actual = parseInput(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    test.each([
      ['1'],
      ['1 2'],
      ['n 2 3'],
      ['1 a 3'],
      ['1 2 b']
    ])('parseInput(%o) throws exception', (input: string) => {
      expect(() => parseInput(input))
        .toThrowError('input format is invalid.')
    })
  })

  describe('代替コース : 入力値が制約に合致しない', () => {
    test.each([
      ['1.1 2 3'],
      ['1 22.2 3'],
      ['1 2 3.33'],
      ['0 2 3'],
      ['-1 2 3'],
      ['10001 2 3'],
      ['100000 2 3'],
      ['1 0 3'],
      ['1 -2 3'],
      ['1 37 3'],
      ['1 2 0'],
      ['1 2 -3'],
      ['1 2 37']
    ])('parseInput(%o) throws exception', (input: string) => {
      expect(() => parseInput(input))
        .toThrowError('input value is invalid.')
    })
  })
})

describe('システムは1以上N以下の整数のうち、10進法で各桁の和がA以上B以下である整数のリストを作成する', () => {
  test.each([
    [
      new Abc083bInputs(1, 1, 1),
      new Abc083bIntegerList([1])
    ],
    [
      new Abc083bInputs(20, 2, 5),
      new Abc083bIntegerList([2, 3, 4, 5, 11, 12, 13, 14, 20])
    ],
    [
      new Abc083bInputs(1, 2, 3),
      new Abc083bIntegerList([])
    ]
  ])('abc083bInputs.createAbc083bIntegerList(%o) returns %o', (input: Abc083bInputs, expected: Abc083bIntegerList) => {
    const actual = input.createAbc083bIntegerList()
    expect(actual).toEqual(expected)
  })
})

describe('システムは整数リストの総和を求める', () => {
  test.each([
    [new Abc083bIntegerList([1]), 1],
    [new Abc083bIntegerList([1, 2, 3, 4, 5, 6, 7, 8, 9]), 45],
    [new Abc083bIntegerList([]), 0]
  ])('abc083bIntegerList(%o).sum() returns %i', (integerList: Abc083bIntegerList, expected: number) => {
    const actual = integerList.sum()
    expect(actual).toBe(expected)
  })
})
