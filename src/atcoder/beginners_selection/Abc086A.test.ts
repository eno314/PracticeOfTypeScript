import { Abc086A, Input, InputParser } from './Abc086A'

describe('Abc086A 結合テスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)
  const parser = new InputParser()

  test('aとbの積が偶数の場合、Evenと出力する', () => {
    const mockInputLoader = jest.fn(() => '3 4')
    const abc086A = new Abc086A(mockInputLoader, parser, mockOutputPrinter)

    abc086A.execute()

    verifyExecute(mockInputLoader, 'Even')
  })

  test('aとbの積が奇数の場合、Oddと出力する', () => {
    const mockInputLoader = jest.fn(() => '1 21')
    const abc086A = new Abc086A(mockInputLoader, parser, mockOutputPrinter)

    abc086A.execute()

    verifyExecute(mockInputLoader, 'Odd')
  })

  function verifyExecute (mockInputLoader: jest.Mock, expectedOutputString: string): void {
    // verify mockInputLoader
    expect(mockInputLoader.mock.calls.length).toBe(1)
    // verify mockOutputPrinter
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expectedOutputString)
  }
})

describe('InputParser ユニットテスト', () => {
  const parser = new InputParser()

  describe('入力値を、整数a,bにパースする', () => {
    describe('正常系', () => {
      test.each([
        ['3 4', new Input(3, 4)],
        ['1 21', new Input(1, 21)]
      ])('a,bを持つInputを返す', (inputString: string, expected: Input) => {
        const actual = parser.parse(inputString)
        expect(actual).toEqual(expected)
      })
    })

    describe('入力値の形式が不正の場合、例外を投げる', () => {
      test.each([
        [''],
        ['3'],
        ['3 '],
        [' 4']
      ])('入力値の文字列を半角スペースで分割して2つ未満', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('input format is invalid.')
      })

      test.each([
        ['a 4'],
        ['3 b']
      ])('分割した2つの要素のどちらかが数字ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('input format is invalid.')
      })
    })

    describe('a,bが制約に合っていない場合、例外を投げる', () => {
      test.each([
        ['0 4'],
        ['-1 4'],
        ['1.1 4'],
        ['10001 4']
      ])('aが1以上10000以下の整数ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('a violates constraint.')
      })

      test.each([
        ['3 0'],
        ['3 -4'],
        ['3 4.4'],
        ['3 10004']
      ])('bが1以上10000以下の整数ではない', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('b violates constraint.')
      })
    })
  })
})

describe('Input ユニットテスト', () => {
  describe('整数a,bを出力値に変換する', () => {
    test('aとbの積が偶数の場合、Evenと出力する', () => {
      const input = new Input(3, 4)

      const actual = input.toOutput()

      expect(actual).toBe('Even')
    })

    test('aとbの積が奇数の場合、Oddと出力する', () => {
      const input = new Input(1, 21)

      const actual = input.toOutput()

      expect(actual).toBe('Odd')
    })
  })
})
