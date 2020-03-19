import { Greeter } from '../src/Greeter'

test('greet returns "Hello world"', () => {
  const greeter = new Greeter()
  expect(greeter.greet()).toBe('Hello World')
})
