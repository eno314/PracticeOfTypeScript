import { Squares } from './Squares'

describe('ビー玉を置くことができるマスの数を計算する', () => {
  test.each([
    [new Squares('0', '0', '0'), 0],
    [new Squares('1', '0', '0'), 1],
    [new Squares('1', '1', '0'), 2],
    [new Squares('1', '1', '1'), 3]
  ])('%oのビー玉を置くことができるマス数は%i', (squares: Squares, expected: number) => {
    const actual = squares.countSquaresPlacedMarble()
    expect(actual).toBe(expected)
  })
})
