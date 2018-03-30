const test = require('tape')

test('Tape is working', t => {
  t.plan(3)
  t.pass('Tape is working')
  t.notOk('', 'An empty string is falsy')
  t.comment('This is a comment')
  t.same(
    [],
    new Array(0),
    'An empty array literal is the same as a new Array with length = 0')
  t.comment('TESTING toolkit.js')
})
