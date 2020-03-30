type Square = '0' | '1'

export class Squares {
  private readonly squares: Square[]

  constructor (...squareStrings: [string, string, string]) {
    this.squares = squareStrings.map(this.validateSquareString)
  }

  private validateSquareString (squareString: string): Square {
    if (squareString === '0' || squareString === '1') {
      return squareString
    }
    throw new Error('input string violates constraint.')
  }

  countSquaresPlacedMarble (): number {
    return this.squares.filter(square => square === '1').length
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
