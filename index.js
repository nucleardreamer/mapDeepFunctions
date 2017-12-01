const _ = require('lodash')

_.mixin({
  mapDeepFunctions: function (schema, orig) {
    let paths = (obj, path) => {
      path = path || ''
      if (_.isFunction(obj)) {
        // set the original value as the schemas function output
        return _.set(
          orig,
          path,
          obj(_.get(orig, path))
        )
      }
      for (let n in obj) {
        if (obj.hasOwnProperty(n)) {
          if ((_.isObject(obj[n]) || _.isArray(obj[n])) && (!_.isBuffer(obj[n]) && !_.isDate(obj[n]) && !_.isRegExp(obj[n]))) {
            paths(obj[n], _.compact([path, n]).join('.'))
          }
        }
      }
    }
    paths(schema)
    return orig
  }
})
