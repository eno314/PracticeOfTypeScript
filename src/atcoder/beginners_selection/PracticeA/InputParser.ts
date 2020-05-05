import { parseToInteger, throwError } from '../../libs/InputParserLibrary'
import { Data } from './Data'

export class InputParser {
  parse (input: string): Data {
    return this.parseToData(input)
  }

  private parseToData (input: string): Data {
    const [aString, bcString, s] = input.split('\n')
    if (s === undefined) {
      throwError()
    }
    const a = parseToInteger(aString)
    const [b, c] = this.parseBCString(bcString)
    return new Data(a, b, c, s)
  }

  private parseBCString (bcString: string): [number, number] {
    const [bString, cString] = bcString.split(' ')
    if (cString === undefined) {
      throwError()
    }
    return [parseToInteger(bString), parseToInteger(cString)]
  }
}
