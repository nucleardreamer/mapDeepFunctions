# mapDeepFunctions
A lodash mixin like `defaultsDeep`, but for function transforms

## Install

```
npm i lodash-mapdeepfunctions
```

## Usage

```
const _ = require('lodash')
_.mixin(require('lodash-mapdeepfunctions'))

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
```
