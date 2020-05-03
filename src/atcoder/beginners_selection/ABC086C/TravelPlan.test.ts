import { TravelPlan } from './TravelPlan'
import { VisitPoint } from './VisitPoint'

describe('旅行プラン', () => {
  describe('初期地点', () => {
    test('初期地点は時間、x座標,y座標が全て0である', () => {
      expect(TravelPlan.FIRST_POINT).toEqual(new VisitPoint(0, 0, 0))
    })
  })

  describe('旅行プランが実現可能か判定する', () => {
    const testCanDo = (testCases: Array<[TravelPlan, boolean]>): void => {
      test.each(testCases)('%oの旅行プランの可否は%o', (travelPlan: TravelPlan, expected: boolean) => {
        const actual = travelPlan.canDo()
        expect(actual).toBe(expected)
      })
    }

    describe('初期地点から移動可能な地点が1つある場合', () => {
      const testCases: Array<[TravelPlan, boolean]> = [
        [
          new TravelPlan([
            new VisitPoint(1, 1, 0)
          ]),
          true
        ]
      ]
      testCanDo(testCases)
    })

    describe('初期地点から移動不可な地点が1つある場合', () => {
      const testCases: Array<[TravelPlan, boolean]> = [
        [
          new TravelPlan([
            new VisitPoint(2, 1, 0)
          ]),
          false
        ]
      ]
      testCanDo(testCases)
    })

    describe('配列全ての要素で、次の要素の地点へと移動可能な場合', () => {
      const testCases: Array<[TravelPlan, boolean]> = [
        [
          new TravelPlan([
            new VisitPoint(1, -1, 0),
            new VisitPoint(2, -1, -1),
            new VisitPoint(4, 0, 0)
          ]),
          true
        ]
      ]
      testCanDo(testCases)
    })

    describe('配列要素の中で、次の要素の地点へと移動ができないものが1つでもある場合', () => {
      const testCases: Array<[TravelPlan, boolean]> = [
        [
          new TravelPlan([
            new VisitPoint(1, -1, 0),
            new VisitPoint(2, -1, -1),
            new VisitPoint(4, 0, -1)
          ]),
          false
        ]
      ]
      testCanDo(testCases)
    })
  })
})
