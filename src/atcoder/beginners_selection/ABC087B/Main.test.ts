import { Abc087b, main, parseInput } from './Main'

describe('受け入れテスト', () => {
  const mockOutputPrinter = jest.fn(_ => _)

  test.each([
    ['2\n2\n2\n100', '2'],
    ['5\n1\n0\n150', '0'],
    ['30\n40\n50\n6000', '213']
  ])('正常系', (input: string, expected: string) => {
    // setup
    const mockInputLoader = jest.fn(() => input)

    // execute
    main(mockInputLoader, mockOutputPrinter)

    // verify
    expect(mockInputLoader.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls.length).toBe(1)
    expect(mockOutputPrinter.mock.calls[0][0]).toBe(expected)
  })
})

describe('システムは入力値をパースして、A,B,C,Xを取得する', () => {
  test.each([
    ['0\n0\n0\n50', new Abc087b(0, 0, 0, 50)],
    ['50\n50\n50\n20000', new Abc087b(50, 50, 50, 20000)]
  ])('正常系', (input: string, expected: Abc087b) => {
    const actual = parseInput(input)
    expect(actual).toEqual(expected)
  })

  test.each([
    // aの値がnumberではない
    ['\n0\n0\n50'],
    [' \n0\n0\n50'],
    ['a\n0\n0\n50'],
    // bの値がnumberではない
    ['1\n\n0\n50'],
    ['1\n \n0\n50'],
    ['1\nb\n0\n50'],
    // cの値がnumberではない
    ['1\n2\n\n50'],
    ['1\n2\n \n50'],
    ['1\n2\nc\n50'],
    // xの値がnumberではない
    ['1\n2\n3\n'],
    ['1\n2\n3\n '],
    ['1\n2\n3\nx'],
    // 行数が4未満
    ['1'],
    ['1\n2'],
    ['1\n2\n3']
  ])('入力値のフォーマットが不正の場合、システムは例外を投げて異常終了する', (input: string) => {
    expect(() => parseInput(input))
      .toThrowError('input format is invalid.')
  })

  test.each([
    // A, B, C, X が整数ではない
    ['0.1\n2\n3\n50'],
    ['1\n2.2\n3\n50'],
    ['1\n2\n33.3\n50'],
    ['1\n2\n3\n555.5'],
    // A, B, C が0より小さい
    ['-1\n2\n3\n50'],
    ['1\n-2\n3\n50'],
    ['1\n2\n-3\n50'],
    // X が50より小さい
    ['1\n2\n3\n49'],
    // A, B, C が50より大きい
    ['51\n2\n3\n50'],
    ['1\n52\n3\n50'],
    ['1\n2\n53\n50'],
    // X が20000より大きい
    ['1\n2\n3\n20001']
  ])('入力値が制約に合致しない、システムは例外を投げて異常終了する', (input: string) => {
    expect(() => parseInput(input))
      .toThrowError('input value is invalid.')
  })

  test.each([
    [30, 40, 50, 21500]
  ])('calculateAmountのテスト', (a: number, b: number, c: number, expected: number) => {
    const actual = new Abc087b(1, 1, 1, 50).calculateAmount(a, b, c)
    expect(actual).toBe(expected)
  })
})
