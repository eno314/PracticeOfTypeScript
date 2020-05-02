import { VisitPoint } from './VisitPoint'

describe('訪問地点', () => {
  describe('別の訪問地点を渡して、その訪問地点から自身の訪問地点まで移動できるか判定する', () => {
    const testCanGoTo = (testCases: Array<[VisitPoint, VisitPoint, boolean]>): void => {
      test.each(testCases)('%oから%oへの移動可能判定結果は%s', (from: VisitPoint, to: VisitPoint, expected: boolean) => {
        const actual = from.canGoTo(to)
        expect(actual).toBe(expected)
      })
    }

    describe('2地点の差分時間が1で距離が1の場合', () => {
      const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
        [new VisitPoint(0, 0, 0), new VisitPoint(1, 1, 0), true],
        [new VisitPoint(1, 1, 1), new VisitPoint(2, 0, 1), true],
        [new VisitPoint(0, 0, 0), new VisitPoint(1, 0, 1), true],
        [new VisitPoint(2, 2, 2), new VisitPoint(3, 2, 1), true]
      ]
      testCanGoTo(testCases)
    })

    describe('2地点の差分時間が1で距離が1ではない場合', () => {
      const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
        [new VisitPoint(0, 0, 0), new VisitPoint(1, 1, 1), false],
        [new VisitPoint(0, 0, 0), new VisitPoint(1, -2, 0), false],
        [new VisitPoint(0, 0, 0), new VisitPoint(1, 0, 2), false]
      ]
      testCanGoTo(testCases)
    })

    describe('2地点の差分時間と距離が等しい場合', () => {
      const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
        [new VisitPoint(0, 0, 0), new VisitPoint(2, 1, 1), true],
        [new VisitPoint(0, 0, 0), new VisitPoint(3, 3, 0), true],
        [new VisitPoint(0, 0, 0), new VisitPoint(4, 0, -4), true]
      ]
      testCanGoTo(testCases)
    })

    describe('2地点の差分時間が距離よりも小さい場合', () => {
      const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
        [new VisitPoint(0, 0, 0), new VisitPoint(2, 1, 2), false],
        [new VisitPoint(0, 0, 0), new VisitPoint(3, 4, 0), false],
        [new VisitPoint(0, 0, 0), new VisitPoint(4, 0, -5), false]
      ]
      testCanGoTo(testCases)
    })

    describe('2地点の差分時間が距離よりも大きい場合', () => {
      describe('2地点の距離と差分時間の差が偶数の場合', () => {
        const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
          [new VisitPoint(0, 0, 0), new VisitPoint(5, -2, -1), true],
          [new VisitPoint(0, 0, 0), new VisitPoint(6, 0, 0), true],
          [new VisitPoint(0, 0, 0), new VisitPoint(100000, 100000, 0), true],
          [new VisitPoint(0, 100000, 0), new VisitPoint(100000, 100000, 100000), true]
        ]
        testCanGoTo(testCases)
      })

      describe('地点の距離と差分時間の差が奇数の場合', () => {
        const testCases: Array<[VisitPoint, VisitPoint, boolean]> = [
          [new VisitPoint(0, 0, 0), new VisitPoint(5, 1, 1), false],
          [new VisitPoint(0, 0, 0), new VisitPoint(6, 0, -1), false]
        ]
        testCanGoTo(testCases)
      })
    })
  })
})
