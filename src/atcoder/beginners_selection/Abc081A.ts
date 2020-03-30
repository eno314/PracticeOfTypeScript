type Square = '0' | '1'

export class Squares {
  private readonly s1: Square
  private readonly s2: Square
  private readonly s3: Square

  constructor (s1: string, s2: string, s3: string) {
    this.s1 = s1 as Square
    this.s2 = s2 as Square
    this.s3 = s3 as Square
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
