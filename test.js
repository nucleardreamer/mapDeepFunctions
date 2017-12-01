require(__dirname)
const _ = require('lodash')
const test = require('tape')

let model = {
  makeString: _.toString,
  makeNumber: _.toNumber,
  root: num => num * num,
  nested: items => items.map(i => _.mapDeepFunctions(model, i))
}

test('sanity check', function (t) {
  t.plan(3)
  t.doesNotThrow(require(__dirname), 'should export a module correctly')
  let mapDeepFunctions = require(__dirname)
  t.equal(typeof mapDeepFunctions, 'function', 'should be a function')
  _.mixin({ mapDeepFunctions })
  t.equal(typeof _.mapDeepFunctions, 'function', 'should be able to be used as a lodash mixin')
})

test('model functionality', function (t) {
  t.plan(7)
  t.comment('* Strings')
  let testString = _.mapDeepFunctions(model, {
    makeString: 123
  })
  t.equal(testString.makeString, '123', 'should change type from number to string')
  t.equal(typeof testString.makeString, 'string', 'should change value number to string')

  t.comment('* Numbers')
  let testNums = _.mapDeepFunctions(model, {
    makeNumber: 'goingtobeNaN',
    root: 5
  })
  t.equal(testNums.root, 25, 'should parse a number correctly')
  t.equal(isNaN(testNums.makeNumber), true, 'should make NaN from number to string')

  t.comment('* Nested')
  let testNested = _.mapDeepFunctions(model, {
    makeString: 'still a string',
    nested: [
      { makeString: 'nested string' },
      { makeNumber: 'nested string' }
    ]
  })
  t.equal(_.isArray(testNested.nested), true, 'nested key should be an array')
  t.equal(testNested.nested[0].makeString, 'nested string', 'nested string should be string')
  t.equal(isNaN(testNested.nested[1].makeNumber), true, 'nested number as string should be NaN')
})
