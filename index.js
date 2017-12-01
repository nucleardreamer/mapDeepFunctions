const _ = require('lodash')

module.exports = function (schema, orig) {
  let paths = (obj, path) => {
    path = path || ''
    // set the original value as the schema key function output
    if (_.isFunction(obj)) {
      // ignore if object path doesn't exist
      if (_.has(orig, path)) {
        return _.set(
          orig,
          path,
          obj(_.get(orig, path))
        )
      }
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
