let Reaxt = require('./dist/lib')
require('./dist/latex');

/**
*
* * `Reaxt.createComponent(tagname, body)`: creates a new tag with
* the corresponding rendering function.
*
* * `Reaxt.render(tag)`: renders the tag to stdout.
*
* ## Usage
*
* Just put a comment with `@jsx Reaxt.addNode` at the
* beginning of your file
*/

module.exports = Reaxt
