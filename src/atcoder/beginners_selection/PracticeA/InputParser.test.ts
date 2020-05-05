import { Data } from './Data'
import { InputParser } from './InputParser'

describe('システムは入力値をパースして、データを作成する', () => {
  const parser = new InputParser()

  const maxS = Array(100).fill('a').join('')

  describe('基本コース', () => {
    test.each([
      ['1\n1 1\na', new Data(1, 1, 1, 'a')],
      ['1\n2 3\ntest', new Data(1, 2, 3, 'test')],
      [`1000\n1000 1000\n${maxS}`, new Data(1000, 1000, 1000, maxS)]
    ])('%oの入力値をパースした結果は%o', (input: string, expected: Data) => {
      const actual = parser.parse(input)
      expect(actual).toEqual(expected)
    })
  })

  describe('代替コース : 入力値のフォーマットが不正', () => {
    describe('入力値の行数が3未満', () => {
      testInvalidFormatInput([
        [''],
        ['1\n2 3']
      ])
    })

    describe('1行目の要素が不正', () => {
      describe('数字ではない', () => {
        testInvalidFormatInput([
          ['\n2 3\ntest'],
          ['a\n2 3\ntest']
        ])
      })

      describe('整数ではない', () => {
        testInvalidFormatInput([['1.1\n2 3\ntest']])
      })

      describe('Dataの最小数字の値より1小さい', () => {
        testInvalidFormatInput([[`${Data.MIN_NUMBER - 1}\n2 3\ntest`]])
      })

      describe('Dataの最大数字値より1大きい', () => {
        testInvalidFormatInput([[`${Data.MAX_NUMBER + 1}\n2 3\ntest`]])
      })
    })

    describe('2行目の要素が不正', () => {
      describe('半角スペースで分割して要素の数が2未満', () => {
        testInvalidFormatInput([
          ['1\n2\ntest'],
          ['1\n\ntest']
        ])
      })

      describe('半角スペースで分割した各要素が数字ではない', () => {
        testInvalidFormatInput([
          ['1\nb 3\ntest'],
          ['1\n2 c\ntest']
        ])
      })

      describe('半角スペースで分割した各要素が整数ではない', () => {
        testInvalidFormatInput([
          ['1\n22.2 3\ntest'],
          ['1\n2 3.33\ntest']
        ])
      })

      describe('半角スペースで分割した各要素がDataの最小数字の値より1小さい', () => {
        testInvalidFormatInput([
          [`1\n${Data.MIN_NUMBER - 1} 3\ntest`],
          [`1\n2 ${Data.MIN_NUMBER - 1}\ntest`]
        ])
      })

      describe('Dataの最大数字値より1大きい', () => {
        testInvalidFormatInput([
          [`1\n${Data.MAX_NUMBER + 1} 3\ntest`],
          [`1\n2 ${Data.MAX_NUMBER + 1}\ntest`]
        ])
      })
    })

    describe('3行目の要素が不正', () => {
      describe('空文字', () => {
        testInvalidFormatInput([['1\n2 3\n']])
      })

      describe('最大の文字列長より1長い', () => {
        testInvalidFormatInput([[`1\n2 3\n${maxS}b`]])
      })
    })

    function testInvalidFormatInput (testCases: Array<[string]>): void {
      test.each(testCases)('%oをパースすると例外が発生する', (inputString: string) => {
        expect(() => {
          parser.parse(inputString)
        }).toThrowError('invalid format input')
      })
    }
  })
})
