import { PracticeAInput } from './PracticeAInput'
import { practiceAInputParser } from './practiceAInputParser'

describe('入力値を、整数a,b,cと文字列sにパースする', () => {
  describe('正常系', () => {
    test.each([
      ['1\n2 3\ntest', new PracticeAInput(1, 2, 3, 'test')],
      ['72\n128 256\nmyonmyon', new PracticeAInput(72, 128, 256, 'myonmyon')]
    ])('a,b,c,sを持つPracticeAInputを返す', (inputString: string, expected: PracticeAInput) => {
      const actual = practiceAInputParser(inputString)
      expect(actual).toEqual(expected)
    })
  })

  describe('入力値の形式が不正の場合、例外を投げる', () => {
    test.each([
      [''],
      ['1\n2 3']
    ])('入力値を改行コードで分割して3つ未満', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('input format is invalid.')
    })

    test.each([
      ['\n2 3\ntest'],
      ['a\n2 3\ntest']
    ])('1行目要素が数字ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('input format is invalid.')
    })

    test.each([
      ['1\n2\ntest'],
      ['1\n\ntest']
    ])('2行目の要素が半角スペースで分割して2つ未満', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('input format is invalid.')
    })

    test.each([
      ['1\nb 3\ntest'],
      ['1\n2 c\ntest']
    ])('2行目の要素を半角スペースで分割して、分割した2つの要素のどちらかが数字ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('input format is invalid.')
    })
  })

  describe('a,b,c,sが制約に合っていない場合、例外を投げる', () => {
    test.each([
      ['0\n2 3\ntest'],
      ['-1\n2 3\ntest'],
      ['1.1\n2 3\ntest'],
      ['1001\n2 3\ntest']
    ])('aが1以上1000以下の整数ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('a violates constraint.')
    })

    test.each([
      ['1\n0 3\ntest'],
      ['1\n-2 3\ntest'],
      ['1\n2.2 3\ntest'],
      ['1\n1002 3\ntest']
    ])('bが1以上1000以下の整数ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('b violates constraint.')
    })

    test.each([
      ['1\n2 0\ntest'],
      ['1\n2 -3\ntest'],
      ['1\n2 3.3\ntest'],
      ['1\n2 1003\ntest']
    ])('cが1以上1000以下の整数ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('c violates constraint.')
    })

    test.each([
      ['1\n2 3\n'],
      ['1\n2 3\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']
    ])('sの文字列の長さが1以上100以下ではない', (inputString: string) => {
      expect(() => {
        practiceAInputParser(inputString)
      }).toThrowError('s violates constraint.')
    })
  })
})
