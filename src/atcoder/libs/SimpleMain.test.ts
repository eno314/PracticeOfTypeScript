import { defaultInputLoader, defaultOutputPrinter, SimpleMain } from './SimpleMain'

describe('入力値から出力値を生成して出力するシンプルなAtCoderの問題用のMain', () => {
  describe('実行時のワークフロー', () => {
    const inputString = 'input string'
    const mockInputLoader = jest.fn(() => inputString)

    const outputString = 'ouput string'
    const mockOutputMaker = jest.fn(() => outputString)
    const mockInputParser = jest.fn(_ => mockOutputMaker)

    const mockOutputPrinter = jest.fn(_ => _)

    const main = new SimpleMain(mockInputParser, mockInputLoader, mockOutputPrinter)

    test('入力値を読み込み、入力値をパースした結果を使って出力値を生成し、出力する', () => {
      main.execute()

      verifyInputLoaderCalled()
      verifyInputParserCalled()
      verifyOutputMakerCalled()
      verifyOutputPrinterCalled()
    })

    function verifyInputLoaderCalled (): void {
      expect(mockInputLoader.mock.calls.length).toBe(1)
    }

    function verifyInputParserCalled (): void {
      expect(mockInputParser.mock.calls.length).toBe(1)
      expect(mockInputParser.mock.calls[0][0]).toBe(inputString)
    }

    function verifyOutputMakerCalled (): void {
      expect(mockOutputMaker.mock.calls.length).toBe(1)
    }

    function verifyOutputPrinterCalled (): void {
      expect(mockOutputPrinter.mock.calls.length).toBe(1)
      expect(mockOutputPrinter.mock.calls[0][0]).toBe(outputString)
    }
  })
})

describe('inputLoaderとoutputPrinterのデフォルト値', () => {
  test('inputLoaderとoutputPrinterを指定せずにSimpleMainをインスタンス化すると、デフォルト値が設定される', () => {
    const mockInputParser = jest.fn(_ => () => 'test')
    const expected = new SimpleMain(mockInputParser, defaultInputLoader, defaultOutputPrinter)

    const actual = new SimpleMain(mockInputParser)

    expect(actual).toEqual(expected)
  })
})
