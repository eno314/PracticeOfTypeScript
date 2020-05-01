import { parseInput, TravelPlan, VisitPoint } from './Main'

describe('訪問地点', () => {
  describe('別の訪問地点を渡して、その訪問地点から自身の訪問地点まで移動できるか判定する', () => {
    test.each([
      // 1移動 : 可能
      [new VisitPoint(0, 0, 0), new VisitPoint(1, 1, 0), true],
      [new VisitPoint(1, 1, 1), new VisitPoint(2, 0, 1), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(1, 0, 1), true],
      [new VisitPoint(2, 2, 2), new VisitPoint(3, 2, 1), true],
      // 1移動 : 不可能
      [new VisitPoint(0, 0, 0), new VisitPoint(1, 1, 1), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(1, -2, 0), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(1, 0, 2), false],
      // 複数移動 : 可能
      [new VisitPoint(0, 0, 0), new VisitPoint(2, 1, 1), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(3, 3, 0), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(4, 0, -4), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(5, 2, 1), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(6, 0, 0), true],
      // 複数移動 : 不可能
      [new VisitPoint(0, 0, 0), new VisitPoint(2, 1, 2), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(3, 4, 0), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(4, 0, -5), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(5, 1, 1), false],
      [new VisitPoint(0, 0, 0), new VisitPoint(6, 0, -1), false],
      // 上限値
      [new VisitPoint(0, 0, 0), new VisitPoint(100000, 100000, 0), true],
      [new VisitPoint(0, 100000, 0), new VisitPoint(100000, 100000, 100000), true]
    ])('%oから%oへ移動可能かどうかの判定結果は%o', (from: VisitPoint, to: VisitPoint, expected: boolean) => {
      const actual = from.canGoTo(to)
      expect(actual).toBe(expected)
    })
  })

  test.each([
    // 1移動 : 可能
    [new VisitPoint(1, 1, 1), new VisitPoint(2, 0, 1), true],
    // 1移動 : 不可能
    [new VisitPoint(0, 0, 0), new VisitPoint(1, 1, 1), false],
    // 複数移動 : 可能
    [new VisitPoint(0, 0, 0), new VisitPoint(5, 2, 1), true],
    // 複数移動 : 不可能
    [new VisitPoint(0, 0, 0), new VisitPoint(5, 1, 1), false],
    // 計算量多め
    [new VisitPoint(0, 0, 0), new VisitPoint(1000, 1000, 0), true],
    [new VisitPoint(0, 0, 0), new VisitPoint(10, 5, 5), true],
    [new VisitPoint(0, 0, 0), new VisitPoint(12, -6, -6), true]
    // 計算量最大 : RangeError: Maximum call stack size exceeded が発生する
    // [new VisitPoint(0, 0, 0), new VisitPoint(100000, 100000, 0), true]
  ])('再帰処理を使って%oから%oへ移動可能かどうかの判定結果は%o', (from: VisitPoint, to: VisitPoint, expected: boolean) => {
    const actual = from.canGoToWithRecursiveCall(to)
    expect(actual).toBe(expected)
  })
})

describe('旅行プラン', () => {
  describe('旅行プランが実現可能か判定する', () => {
    test.each([
      [
        new TravelPlan([
          new VisitPoint(1, 1, 0)
        ]),
        true
      ],
      [
        new TravelPlan([
          new VisitPoint(2, 1, 0)
        ]),
        false
      ],
      [
        new TravelPlan([
          new VisitPoint(1, -1, 0),
          new VisitPoint(2, -1, -1),
          new VisitPoint(4, 0, 0)
        ]),
        true
      ],
      [
        new TravelPlan([
          new VisitPoint(1, -1, 0),
          new VisitPoint(2, -1, -1),
          new VisitPoint(4, 0, -1)
        ]),
        false
      ]
    ])('%oの旅行プランの可否は%o', (travelPlan: TravelPlan, expected: boolean) => {
      const actual = travelPlan.canDo()
      expect(actual).toBe(expected)
    })
  })
})

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
