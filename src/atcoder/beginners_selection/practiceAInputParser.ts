import { PracticeAInput } from './PracticeAInput'

export function practiceAInputParser (inputString: string): PracticeAInput {
  const inputStrings = inputString.split('\n')
  const bc = inputStrings[1].split(' ')

  const a = parseInt(inputStrings[0])
  const b = parseInt(bc[0])
  const c = parseInt(bc[1])
  const s = inputStrings[2]

  return new PracticeAInput(a, b, c, s)
}
