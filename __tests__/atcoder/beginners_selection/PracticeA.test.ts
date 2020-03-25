import { PracticeA } from '../../../src/atcoder/beginners_selection/PracticeA'

test('a,b,c,sを、a+b+cとsを空白区切りで1行の形式に変換する', () => {
  const a = 1
  const b = 2
  const c = 3
  const s = 'test'

  const expected = '6 test'

  const practiceA = new PracticeA()
  expect(practiceA.translate(a, b, c, s)).toBe(expected)
})
