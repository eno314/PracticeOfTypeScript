import { isMatchedTheCondition } from './Main'

describe('システムは入力値が条件に合致するか判定する', () => {
  test.each([
    [''],
    ['d'],
    ['drea'],
    ['e'],
    ['era']
  ])('入力値が1単語目から一致しない(%o)場合、falseを返す', (input: string) => {
    const actual = isMatchedTheCondition(input)
    expect(actual).toBe(false)
  })

  test.each([
    ['dream'],
    ['dreamer'],
    ['erase'],
    ['eraser']
  ])('入力値が1単語で一致する(%o)の場合、trueを返す', (input: string) => {
    const actual = isMatchedTheCondition(input)
    expect(actual).toBe(true)
  })

  test.each([
    ['dreame'],
    ['erasere'],
    ['dreamere'],
    ['erasered']
  ])('入力値が1単語目は一致するが、2単語目が一致しない(%o)の場合、falseを返す', (input: string) => {
    const actual = isMatchedTheCondition(input)
    expect(actual).toBe(false)
  })

  test.each([
    ['dreamdream'],
    ['dreamdreamer'],
    ['dreamerase'],
    ['dreameraser'],
    ['dreamerdreamer'],
    ['eraseerase'],
    ['erasereraser'],
    ['dreamerasereraser']
  ])('入力値が2単語目以降も一致する(%o)の場合、trueを返す', (input: string) => {
    const actual = isMatchedTheCondition(input)
    expect(actual).toBe(true)
  })
})
