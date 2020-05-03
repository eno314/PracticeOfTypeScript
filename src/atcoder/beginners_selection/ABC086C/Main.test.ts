import { parseInput } from './Main'
import { TravelPlan } from './TravelPlan'
import { VisitPoint } from './VisitPoint'

describe('システムは入力値をパースして、旅行プランを作成する', () => {
  describe('基本コース', () => {
    test.each([
      [
        '1\n1 0 0',
        new TravelPlan([
          new VisitPoint(1, 0, 0)
        ])
      ],
      [
        '2\n1 100000 100000\n100000 100000 100000',
        new TravelPlan([
          new VisitPoint(1, 100000, 100000),
          new VisitPoint(100000, 100000, 100000)
        ])
      ]
    ])('%oをパースすると%oが生成させる', (input: string, expected: TravelPlan) => {
      const actual = parseInput(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    describe('1行目のフォーマットが不正', () => {
      test.each([
        '',
        'a\n1 1 1',
        '1.1\n1 1 1',
        '0\n1 1 1',
        '-1\n1 1 1',
        '100001\n1 1 1'
      ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
    })

    describe('行数が1行目の数字+1未満', () => {
      test.each([
        '1',
        '2\n1 1 1'
      ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
    })

    describe('2行目以降のフォーマットが不正', () => {
      test.each([
        '1\n1',
        '1\n1 1',
        '1\n1 1 ',
        '2\n1 1 1\na 2 2',
        '2\n1 1 1\n2.2 2 2',
        '2\n1 1 1\n0 2 2',
        '2\n1 1 1\n100001 2 2',
        '2\n1 1 1\n2 b 2',
        '2\n1 1 1\n2 22.2 2',
        '2\n1 1 1\n2 -1 2',
        '2\n1 1 1\n2 100001 2',
        '2\n1 1 1\n2 2 c',
        '2\n1 1 1\n2 2 0.2',
        '2\n1 1 1\n2 2 -2',
        '2\n1 1 1\n2 2 100001'
      ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
    })

    function testWhenInvalidFormat (input: string): void {
      expect(() => parseInput(input)).toThrowError('invalid format input')
    }
  })
})
