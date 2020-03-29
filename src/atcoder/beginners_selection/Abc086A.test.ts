import { Abc086A, InputParser } from './Abc086A'

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
