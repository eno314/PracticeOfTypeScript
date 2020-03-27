import { PracticeAInput } from './PracticeAInput'
import { practiceAInputParser } from './practiceAInputParser'

describe('入力値を、整数a,b,cと文字列sにパースする', () => {
  test.each([
    ['1\n2 3\ntest', new PracticeAInput(1, 2, 3, 'test')],
    ['72\n128 256\nmyonmyon', new PracticeAInput(72, 128, 256, 'myonmyon')]
  ])('正常系', (inputString: string, expected: PracticeAInput) => {
    const actual = practiceAInputParser(inputString)
    expect(actual).toEqual(expected)
  })
})
