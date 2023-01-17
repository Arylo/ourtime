import parseClassNames from "./parseClassNames"

test('parse with simple classname', () => {
  const result = parseClassNames('test')
  expect(result).toBe('test')
})

test('parse with array classname', () => {
  const result = parseClassNames(['test'])
  expect(result).toBe('test')
})

test('parse with much classname', () => {
  const result = parseClassNames(['test1', 'test2'])
  expect(result).toBe('test1 test2')
})

test('parse with simple classname and default value', () => {
  const result = parseClassNames('test', 'default')
  expect(result).toBe('test default')
})

test('parse with array classname and default value', () => {
  const result = parseClassNames(['test'], 'default')
  expect(result).toBe('test default')
})

test('parse with much classname and default value', () => {
  const result = parseClassNames(['test1', 'test2'], 'default')
  expect(result).toBe('test1 test2 default')
})
