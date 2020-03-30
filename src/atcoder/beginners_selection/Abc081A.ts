class Square {
  private readonly value: '0' | '1'

  constructor (value: string) {
    if (value !== '0' && value !== '1') {
      throw new Error('input string violates constraint.')
    }
    this.value = value
  }

  canPlaceMarble (): boolean {
    return this.value === '1'
  }
}

export class Squares {
  private readonly squares: Square[]

  constructor (...squareStrings: [string, string, string]) {
    this.squares = squareStrings.map(squareString => new Square(squareString))
  }

  countSquaresPlacedMarble (): number {
    return this.squares.filter(square => square.canPlaceMarble()).length
  }
}

export class InputParser {
  parse (input: string): Squares {
    if (input.length !== 3) {
      throw new Error('input format is invalid.')
    }
    return new Squares(input[0], input[1], input[2])
  }
}
