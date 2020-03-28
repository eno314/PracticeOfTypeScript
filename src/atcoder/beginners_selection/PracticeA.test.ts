import { PracticeA, PracticeAInput, PracticeAInputParser } from './PracticeA'

describe('PracticeA 結合テスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)
  const parser = new PracticeAInputParser()

  test.each([
    ['1\n2 3\ntest', '6 test'],
    ['72\n128 256\nmyonmyon', '456 myonmyon']
  ])('入力値を読み込み、入力値をパースして、出力値に変換し、出力する', (inputString: string, expectedOutputString: string) => {
    const mockInputLoader = jest.fn(() => inputString)
    const practiceA = new PracticeA(mockInputLoader, parser, mockOutputPrinter)

    practiceA.execute()

    // verify mockInputLoader
    expect(mockInputLoader.mock.calls.length).toBe(1)
    // verify mockOutputPrinter
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expectedOutputString)
  })
})

describe('PracticeAInput ユニットテスト', () => {
  describe('整数a,b,c と文字列s を出力値に変換する', () => {
    test.each([
      [new PracticeAInput(1, 2, 3, 'test'), '6 test'],
      [new PracticeAInput(72, 128, 256, 'myonmyon'), '456 myonmyon']
    ])('a+b+cとsを空白区切りで1行にする', (input: PracticeAInput, expected: string) => {
      const actual = input.toOutputString()
      expect(actual).toBe(expected)
    })
  })
})

describe('practiceAInputParser ユニットテスト', () => {
  const parser = new PracticeAInputParser()

  describe('入力値を、整数a,b,cと文字列sにパースする', () => {
    describe('正常系', () => {
      test.each([
        ['1\n2 3\ntest', new PracticeAInput(1, 2, 3, 'test')],
        ['72\n128 256\nmyonmyon', new PracticeAInput(72, 128, 256, 'myonmyon')]
      ])('a,b,c,sを持つPracticeAInputを返す', (inputString: string, expected: PracticeAInput) => {
        const actual = parser.parse(inputString)
        expect(actual).toEqual(expected)
      })
    })

    describe('入力値の形式が不正の場合、例外を投げる', () => {
      test.each([
        [''],
        ['1\n2 3']
      ])('入力値を改行コードで分割して3つ未満', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('input format is invalid.')
      })

      test.each([
        ['\n2 3\ntest'],
        ['a\n2 3\ntest']
      ])('1行目要素が数字ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('input format is invalid.')
      })

      test.each([
        ['1\n2\ntest'],
        ['1\n\ntest']
      ])('2行目の要素が半角スペースで分割して2つ未満', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('input format is invalid.')
      })

      test.each([
        ['1\nb 3\ntest'],
        ['1\n2 c\ntest']
      ])('2行目の要素を半角スペースで分割して、分割した2つの要素のどちらかが数字ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
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
          parser.parse(inputString)
        }).toThrowError('a violates constraint.')
      })

      test.each([
        ['1\n0 3\ntest'],
        ['1\n-2 3\ntest'],
        ['1\n2.2 3\ntest'],
        ['1\n1002 3\ntest']
      ])('bが1以上1000以下の整数ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('b violates constraint.')
      })

      test.each([
        ['1\n2 0\ntest'],
        ['1\n2 -3\ntest'],
        ['1\n2 3.3\ntest'],
        ['1\n2 1003\ntest']
      ])('cが1以上1000以下の整数ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('c violates constraint.')
      })

      test.each([
        ['1\n2 3\n'],
        ['1\n2 3\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']
      ])('sの文字列の長さが1以上100以下ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('s violates constraint.')
      })
    })
  })
})
