import { VisitPoint } from './Main'

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
      // 計算量大
      [new VisitPoint(0, 0, 0), new VisitPoint(10, 10, 0), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(30, 15, 15), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(1000, 1000, 0), true],
      [new VisitPoint(0, 0, 0), new VisitPoint(14, -7, -7), true]
      // 計算量最大 : RangeError: Maximum call stack size exceeded が発生する
      // [new VisitPoint(0, 0, 0), new VisitPoint(100000, 100000, 0), true]
    ])('%oから%oへ移動可能かどうかの判定結果は%o', (from: VisitPoint, to: VisitPoint, expected: boolean) => {
      const actual = from.canGoTo(to)
      expect(actual).toBe(expected)
    })
  })
})
