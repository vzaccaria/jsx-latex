var shelljs = require( 'shelljs' )
var promise = require( 'bluebird' )
var _ = require( 'lodash' )

var _module = () => {

  var foo = () => {

  }

  return {
    foo
  }
}

module.exports = _module()