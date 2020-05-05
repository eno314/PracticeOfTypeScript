import { SimpleMain } from '../../libs/SimpleMain'
import { InputParser } from './InputParser'

const inputParser = new InputParser()

export class Main extends SimpleMain {
  translate (input: string): string {
    const data = inputParser.parse(input)
    return data.toString()
  }
}
