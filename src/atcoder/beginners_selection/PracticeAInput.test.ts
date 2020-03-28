import { PracticeAInput } from './PracticeAInput'

describe('整数a,b,c と文字列s を出力値に変換する', () => {
  test.each([
    [new PracticeAInput(1, 2, 3, 'test'), '6 test'],
    [new PracticeAInput(72, 128, 256, 'myonmyon'), '456 myonmyon']
  ])('a+b+cとsを空白区切りで1行にする', (input: PracticeAInput, expected: string) => {
    const actual = input.toOutputString()
    expect(actual).toBe(expected)
  })
})
