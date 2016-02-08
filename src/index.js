let Reaxt = require('./dist/lib')
require('./dist/latex');
require('./dist/tikz');

/**
*
* * `Reaxt.createComponent(tagname, body)`: creates a new tag with
* the corresponding rendering function.
*
* * `Reaxt.render(tag)`: renders the tag to stdout.
*
* ## usage
*
* Just put a comment with `@jsx Reaxt.addNode` at the
* beginning of your file and compile it with a react-enabled
* babel preset.
*/

module.exports = Reaxt
