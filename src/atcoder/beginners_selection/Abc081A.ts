type Square = '0' | '1'

export class Squares {
  private readonly s1: Square
  private readonly s2: Square
  private readonly s3: Square

  constructor (s1: string, s2: string, s3: string) {
    this.s1 = this.validateSquareString(s1)
    this.s2 = this.validateSquareString(s2)
    this.s3 = this.validateSquareString(s3)
  }

  private validateSquareString (squareString: string): Square {
    if (squareString === '0' || squareString === '1') {
      return squareString
    }
    throw new Error('input string violates constraint.')
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
