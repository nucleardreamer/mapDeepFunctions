const _ = require('lodash')
require(__dirname)

// create a model with functions
const model = {
  foo: _.toString,
  rootMe: i => i * i,
  nested: {
    bar: _.toNumber
  }
}

console.log(
  _.mapDeepFunctions(model, {
    foo: Buffer.from(`Totally not a string name`),
    rootMe: 5,
    nested: {
      bar: '123'
    }
  })
)
