import { MAX_NUMBER, MIN_N, MIN_T, MIN_X, MIN_Y, parseInput } from './InputParser'
import { TravelPlan } from './TravelPlan'
import { VisitPoint } from './VisitPoint'

describe('入力値文字列をパースして旅行プランを作成する', () => {
  describe('基本コース', () => {
    describe('各項目が制約内の最小値', () => {
      test.each([
        [
          `${MIN_N}\n${MIN_T} ${MIN_X} ${MIN_Y}`,
          new TravelPlan([
            new VisitPoint(1, 0, 0)
          ])
        ]
      ])('%oをパースすると%oが生成させる', testParse)
    })

    describe('各項目が制約内の最大値', () => {
      const inputTravelPlans = Array(MAX_NUMBER).fill(0).map((_, index) => {
        return `${index + 1} ${index + 1} ${index + 1}`
      })

      const visitPoints = Array(MAX_NUMBER).fill(0).map((_, index) => {
        return new VisitPoint(index + 1, index + 1, index + 1)
      })

      test.each([
        [
          `${MAX_NUMBER}\n${inputTravelPlans.join('\n')}`,
          new TravelPlan(visitPoints)
        ]
      ])('最大の入力値でもパースできる', testParse)
    })

    function testParse (input: string, expected: TravelPlan): void {
      const actual = parseInput(input)
      expect(actual).toEqual(expected)
    }
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    describe('1行目のフォーマットが不正', () => {
      describe('数字ではない', () => {
        test.each([
          '',
          'a\n1 1 1'
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('整数ではない', () => {
        test.each([
          '1.1\n1 1 1'
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('最小値より1小さい', () => {
        test.each([
          `${MIN_N - 1}\n1 1 1`
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('最大値より1大きい', () => {
        test.each([
          `${MAX_NUMBER + 1}\n1 1 1`
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })
    })

    describe('行数が1行目の数字+1未満', () => {
      test.each([
        '1',
        '2\n1 1 1'
      ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
    })

    describe('2行目以降のフォーマットが不正', () => {
      describe('半角スペースで分割して要素が3未満', () => {
        test.each([
          '1\n1',
          '1\n1 1',
          '1\n1 1 '
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('半角スペースで分割した各要素が数字ではない', () => {
        test.each([
          '2\n1 1 1\na 2 2',
          '2\n1 1 1\n2 b 2',
          '2\n1 1 1\n2 2 c'
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('半角スペースで分割した各要素が整数ではない', () => {
        test.each([
          '2\n1 1 1\n2.2 2 2',
          '2\n1 1 1\n2 22.2 2',
          '2\n1 1 1\n2 2 0.2'
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('半角スペースで分割した各要素が最小値より1小さい', () => {
        test.each([
          `2\n1 1 1\n${MIN_T - 1} 2 2`,
          `2\n1 1 1\n2 ${MIN_X - 1} 2`,
          `2\n1 1 1\n2 2 ${MIN_Y - 1}`
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })

      describe('半角スペースで分割した各要素が最大値より1大きい', () => {
        test.each([
          `2\n1 1 1\n${MAX_NUMBER + 1} 2 2`,
          `2\n1 1 1\n2 ${MAX_NUMBER + 1} 2`,
          `2\n1 1 1\n2 2 ${MAX_NUMBER + 1}`
        ])('%oをパースすると例外が発生する', testWhenInvalidFormat)
      })
    })

    function testWhenInvalidFormat (input: string): void {
      expect(() => parseInput(input)).toThrowError('invalid format input')
    }
  })
})
