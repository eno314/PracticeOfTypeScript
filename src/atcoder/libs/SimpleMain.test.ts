import { SimpleMain } from './SimpleMain'

describe('入力値から出力値を生成して出力するシンプルなAtCoderの問題用のMain', () => {
  describe('実行時のワークフロー', () => {
    const resultOfInput = 'result of input'
    const inputParser = jest.fn(_ => resultOfInput)

    const outputString = 'output string'
    const outputFactory = jest.fn(_ => outputString)

    const inputString = 'input string'
    const mockInputLoader = jest.fn(() => inputString)

    const mockOutputPrinter = jest.fn(_ => _)

    const main = new SimpleMain<string>(
      inputParser,
      outputFactory,
      mockInputLoader,
      mockOutputPrinter
    )

    test('入力値を読み込み、入力値を変換し、変換した結果を出力する', () => {
      main.execute()

      verifyInputLoaderCalled()
      verifyInputParserCalled()
      verifyOutputFactoryCalled()
      verifyOutputPrinterCalled()
    })

    function verifyInputLoaderCalled (): void {
      expect(mockInputLoader.mock.calls.length).toBe(1)
    }

    function verifyInputParserCalled (): void {
      expect(inputParser.mock.calls.length).toBe(1)
      expect(inputParser.mock.calls[0][0]).toBe(inputString)
    }

    function verifyOutputFactoryCalled (): void {
      expect(outputFactory.mock.calls.length).toBe(1)
      expect(outputFactory.mock.calls[0][0]).toBe(resultOfInput)
    }

    function verifyOutputPrinterCalled (): void {
      expect(mockOutputPrinter.mock.calls.length).toBe(1)
      expect(mockOutputPrinter.mock.calls[0][0]).toBe(outputString)
    }
  })
})
