import { throwError } from '../../libs/InputParserLibrary'
import { Squares } from './Squares'

export function parseInput (input: string): Squares {
  if (input.length < 3) {
    throwError()
  }
  return new Squares(input[0], input[1], input[2])
}
