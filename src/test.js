var chai = require( 'chai' )
chai.use( require( 'chai-as-promised' ) )
var should = chai.should()

/*global describe, it, before, beforeEach, after, afterEach */

describe( '#module', () => {
  "use strict"
  it( 'should load the module', () => {

    var mod = require( '..' )
    should.exist( mod )

  } )
} )