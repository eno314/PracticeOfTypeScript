import { Data } from './Data'

describe('PracticeAのデータ', () => {
  describe('文字列で表現する際は、a+b+cとsを空白区切りで1行になる', () => {
    test.each([
      [new Data(1, 2, 3, 'test'), '6 test']
    ])('%oの文字列は%o', (data: Data, expected: string) => {
      const acutal = data.toString()
      expect(acutal).toBe(expected)
    })
  })
})
