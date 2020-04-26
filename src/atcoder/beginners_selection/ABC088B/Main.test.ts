import { Card, CardList, parseInput } from './Main'

describe('システムは入力値をパースして、カードリストを作る', () => {
  describe('正常系', () => {
    const handredNumbers: number[] = Array(100).fill(100)
    const handerdNumbersString = handredNumbers.join(' ')
    const handredCards = handredNumbers.map(value => new Card(value))

    test.each([
      ['1\n1', new CardList([new Card(1)])],
      [`100\n${handerdNumbersString}`, new CardList(handredCards)]
    ])('%o をパースすると %o を生成する', (input: string, expected: CardList) => {
      const actual = parseInput(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    test('入力値の行数が2未満の場合、例外を投げる', () => {
      const input = '1'
      expect(() => parseInput(input)).toThrowError('input format is invalid.')
    })

    test.each([
      ['\n1'],
      ['a\n1'],
      ['-1\n1'],
      ['0\n1'],
      ['1.1\n1'],
      ['101\n1']
    ])('Nが不正な値(%o)の場合、例外を投げる', (input: string) => {
      expect(() => parseInput(input)).toThrowError('input format is invalid.')
    })

    test.each([
      ['0\n'],
      ['1\na'],
      ['2\n1 a'],
      ['3\n1 2 -1'],
      ['4\n1 2 3 0'],
      ['5\n1 2 3 4 5.5'],
      ['6\n1 2 3 4 5 101']
    ])('aiが不正な値(%o)の場合、例外を投げる', (input: string) => {
      expect(() => parseInput(input)).toThrowError('input format is invalid.')
    })
  })
})
