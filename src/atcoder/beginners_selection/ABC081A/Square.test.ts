import { Square } from './Square'

describe('ビー玉を置くことができるか判定する', () => {
  test('マスの値が1の場合、マスを置くことができる', () => {
    testCanPlaceMarble(new Square('1'), true)
  })

  test('マスの値が0の場合、マスは置くことができない', () => {
    testCanPlaceMarble(new Square('0'), false)
  })

  function testCanPlaceMarble (square: Square, expected: Boolean): void {
    const actual = square.canPlaceMarble()
    expect(actual).toBe(expected)
  }
})
