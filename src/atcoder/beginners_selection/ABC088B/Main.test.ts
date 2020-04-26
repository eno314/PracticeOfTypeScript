import { calculateAnswer, CardList, executeGame, parseInput } from './Main'

describe('システムは入力値をパースして、カードリストを作る', () => {
  describe('正常系', () => {
    const handredNumbers: number[] = Array(100).fill(100)
    const handerdNumbersString = handredNumbers.join(' ')

    test.each([
      ['1\n1', new CardList([1])],
      [`100\n${handerdNumbersString}`, new CardList(handredNumbers)]
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

describe('システムはゲームを開始して、AliceのカードリストとBobのカードリストを作る', () => {
  test.each([
    [new CardList([1]), new CardList([1]), new CardList([])],
    [new CardList([1, 2]), new CardList([2]), new CardList([1])],
    [new CardList([2, 7, 4]), new CardList([7, 2]), new CardList([4])],
    [new CardList([20, 18, 2, 18]), new CardList([20, 18]), new CardList([18, 2])]
  ])('%oの場合、Aliceは%o、Bobは%o', (cardList: CardList, aliceCardList: CardList, bobCardList: CardList) => {
    const expected = [aliceCardList, bobCardList]
    const actual = executeGame(cardList)
    expect(actual).toEqual(expected)
  })
})

describe('システムはAliceのカードリストの合計得点と、Bobのカードリストの合計得点の差を求めて、答えとする', () => {
  test.each([
    [new CardList([1]), new CardList([]), 1],
    [new CardList([1]), new CardList([1]), 0],
    [new CardList([7, 2]), new CardList([4]), 5],
    [new CardList([20, 18]), new CardList([18, 2]), 18]
  ])('Alice(%o)とBob(%o)の差は%i', (aliceCardList: CardList, bobCardList: CardList, expected: number) => {
    const actual = calculateAnswer(aliceCardList, bobCardList)
    expect(actual).toBe(expected)
  })
})
