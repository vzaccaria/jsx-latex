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



function article(props, ...rchildren) {
    let geometry = _.get(props, "geometry", "");
    return `
    \\documentclass{article}
    \\usepackage[T1]{fontenc}
    \\usepackage{fontspec,xunicode,xltxtra}
    \\usepackage{tikz}
    \\usepackage{xcolor}
    \\definecolor{white}{RGB}{255,255,255}
    \\definecolor{darkgray}{HTML}{333333}
    \\definecolor{gray}{HTML}{4D4D4D}
    \\definecolor{lightgray}{HTML}{999999}
    \\definecolor{green}{HTML}{C2E15F}
    \\definecolor{orange}{HTML}{FDA333}
    \\definecolor{purple}{HTML}{D3A4F9}
    \\definecolor{red}{HTML}{FB4485}
    \\definecolor{blue}{HTML}{6CE0F1}
    \\usepackage[${geometry}]{geometry}
    \\begin{document}
    ${rchildren.join("\n")}
    \\end{document}
    `;
}

function minipage(props, ...rchildren) {
    let width = _.get(props, "width", '\\textwidth');
    let align = _.get(props, "align", 'c');

    return `\\noindent\\begin{minipage}[${align}]{${width}}${rchildren.join("")}\\end{minipage}`
}

function section(props, ...rchildren) {
    let {
        FontUID: titleFontUID,
        FontCMD: titleFontCMD
    } = defineNewFont(_.get(props, "style.title", {}))
    let {
        FontUID: sectionFontUID,
        FontCMD: sectionFontCMD
    } = defineNewFont(_.get(props, "style", {}))

    let noNumbering = _.get(props, "style.title.numbered", true);
    let hrulefill = _.get(props, "style.title.hrulefill", false);
    let secModifier = (noNumbering) ? '' : '*'

    let hr = ""
    if (hrulefill) {
        hr = '\\hrulefill'
    }
    return `
\\renewcommand\\thesection{${titleFontUID}{}\\arabic{section}}
${titleFontCMD}
${sectionFontCMD}
\\section${secModifier}{${titleFontUID}{}${props.title}${hr}}
{${sectionFontUID}{}
${rchildren.join("\n")}
}
`;
}

function hrule(props) {
    let width = _.get(props, "style.width", '1.0');
    let size = _.get(props, "style.size", '.4pt');
    return `\\rule{${width}\\textwidth}{${size}}`
}


Reaxt.createComponent('image', (props) => {
    let hd = []
    hd = addAs(hd, "width", _.get(props, "width"));
    hd = getOpts(hd).join(",")
    let ig = `\\includegraphics[${hd}]{${props.src}}`
    return (ig);
})

Reaxt.createComponent("hrule", hrule);
Reaxt.createComponent("article", article);
Reaxt.createComponent("section", section);
Reaxt.createComponent("overlay", overlay);
Reaxt.createComponent("node", node);
Reaxt.createComponent("minipage", minipage);

module.exports = Reaxt
