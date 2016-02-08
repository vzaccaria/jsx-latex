/** @jsx Reaxt.addNode*/

let _ = require('lodash')
let Reaxt = require('./lib')
let { uid, defineNewFont, addAs, getOpts } = Reaxt

function node(props, ...rchildren) {
    let name = _.get(props, "name", `nodeName${uid(3)}`);
    let position = _.get(props, "to", "current page.north");
    let shape = _.get(props, "shape", "rectangle");
    let color = _.get(props, "color", "black");

    let {
        FontUID, FontCMD
    } = defineNewFont(props)

    let hd = []

    hd = addAs(hd, "fill", _.get(props, "fill"));
    hd = addAs(hd, "anchor", _.get(props, "anchor", "north"));
    hd = addAs(hd, "minimum width", _.get(props, "minwidth"));
    hd = addAs(hd, "minimum height", _.get(props, "minheight"));
    hd = getOpts(hd)
    hd = ([shape].concat(hd)).join(", ")

    return `
${FontCMD}
\\node [${hd}] (${name}) at
(${position}){
\\color{${color}}${FontUID}{}${rchildren.join('')}};`
}

function overlay(props, ...rchildren) {
    return `
\\begin{tikzpicture}[remember picture,overlay]
${rchildren.join('\n')}
\\end{tikzpicture}
`;
}



Reaxt.createComponent("overlay", overlay);
Reaxt.createComponent("node", node);

module.exports = Reaxt
