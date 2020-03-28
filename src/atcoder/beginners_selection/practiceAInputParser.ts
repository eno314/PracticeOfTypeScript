import { PracticeAInput } from './PracticeAInput'

export function practiceAInputParser (inputString: string): PracticeAInput {
  const parsed = parseInputStringToArray(inputString)
  return new PracticeAInput(parsed[0], parsed[1], parsed[2], parsed[3])
}

function parseInputStringToArray (inputString: string): [number, number, number, string] {
  const inputStrings = inputString.split('\n')
  if (inputStrings.length < 3) {
    throw new Error('input format is invalid.')
  }

  const a = parseInt(inputStrings[0])
  if (Number.isNaN(a)) {
    throw new Error('input format is invalid.')
  }

  const bc = parseBAndCToArray(inputStrings[1])

  return [a, bc[0], bc[1], inputStrings[2]]
}

function parseBAndCToArray (bcString: string): [number, number] {
  const bc = bcString.split(' ')
  if (bc.length < 2) {
    throw new Error('input format is invalid.')
  }

  const b = parseInt(bc[0])
  const c = parseInt(bc[1])
  if (Number.isNaN(b) || Number.isNaN(c)) {
    throw new Error('input format is invalid.')
  }

  return [b, c]
}
