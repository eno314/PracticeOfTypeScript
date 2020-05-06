import { Square } from './Square'

export class Squares {
  private readonly squares: Square[]

  constructor (...squareStrings: [string, string, string]) {
    this.squares = squareStrings.map(squareString => new Square(squareString))
  }

  countSquaresPlacedMarble (): number {
    return this.squares.filter(square => square.canPlaceMarble()).length
  }
}
