/** @jsx Reaxt.addNode*/

let _ = require('lodash')
let Reaxt = require('./lib')
let {
    uid, defineNewFont, parse
} = Reaxt

function genShape(shape) {
    return function(props, ...rchildren) {
        let name = _.get(props, "name", `nodeName${uid(3)}`);
        let position = _.get(props, "attach", "at (current page.north)");
        let color = ""
        if(!_.isUndefined(props.color)) {
            color = `\\color{${props.color}}`
        }
        props.draw = _.get(props, "draw", "black");

        let {
            FontUID, FontCMD
        } = defineNewFont(props)

        let hd = parse(props, shape)
            .accepts("fill")
            .accepts("draw")
            .accepts("anchor")
            .acceptsAs("fontcolor", "text")
            .acceptsAs("minwidth", "minimum width")
            .acceptsAs("minheight", "minimum height")
            .get();

        return `
${FontCMD}
\\node [${hd}] (${name}) ${position}{
${color}${FontUID}{}${rchildren.join('')}};`
    }
}

function overlay(props, ...rchildren) {
    return `
\\begin{tikzpicture}[remember picture,overlay]
${rchildren.join('\n')}
\\end{tikzpicture}
`;
}

function tikz(props, ...rchildren) {
    return `
\\begin{tikzpicture}
${rchildren.join('\n')}
\\end{tikzpicture}
`;
}



Reaxt.createComponent("overlay", overlay);
Reaxt.createComponent("node", genShape());
Reaxt.createComponent("circle", genShape("circle"));
Reaxt.createComponent("rectangle", genShape("rectangle"));
Reaxt.createComponent("tikz", tikz);

module.exports = Reaxt
