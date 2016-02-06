/** @jsx Reaxt.addNode*/

let _ = require('lodash');

let defaultfont = "Minion Pro"

let uid = (n) => {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return _.sampleSize(possible, n).join('');
}

function addAs(a, key, value) {
    if(!_.isUndefined(value)) {
        return a.concat([{key, value}]);
    } else {
        return a
    }
}

function node(props, ...rchildren) {
    let name     = _.get(props, "name", `nodeName${uid(3)}`);
    let position = _.get(props, "relativeto", "current page.north");
    let shape    = _.get(props, "shape", "rectangle");
    let color    = _.get(props, "color", "black");

    let Font     = _.get(props, "font", defaultfont);
    let FontUID  = `font${uid(4)}`
    let FontCMD  = `\\newfontfamily\\${FontUID}[]{${Font}}`

    let hd = []

    hd = addAs(hd, "fill", _.get(props, "fill"));
    hd = addAs(hd, "anchor", _.get(props, "anchor", "north"));
    hd = addAs(hd, "minimum width", _.get(props, "minwidth"));
    hd = addAs(hd, "minimum height", _.get(props, "minheight"));
    hd = _.map(hd, (it) => it.key + "=" + it.value);
    hd = ([ shape ].concat(hd)).join(", ")

        return `
${FontCMD}
\\node [${hd}] (${name}) at
(${position}){
\\color{${color}}\\${FontUID}{}${rchildren.join('')}};`
}

function overlay(props, ...rchildren) {
    return `
\\begin{tikzpicture}[remember picture,overlay]
${rchildren.join('\n')}
\\end{tikzpicture}
`;
}



function article(props, ...rchildren) {
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

    \\begin{document}
    ${rchildren.join("\n")}
    \\end{document}
    `;
}

function section(props, ...rchildren) {
    let titleFont      = _.get(props, "style.title.font", defaultfont);
    let noNumbering    = _.get(props, "style.title.numbered", true);
    let hrulefill =    _.get(props, "style.title.hrulefill", false);
    let secModifier    = (noNumbering) ? '' : '*'
    let titleFontUID   = `titleFont${uid(4)}`

    let sectionFont    = _.get(props, "style.font", defaultfont);
    let sectionFontUID = `font${uid(4)}`
    let hr = ""
    if(hrulefill) {
        hr='\\hrulefill'
    }
    return `
    \\renewcommand\\thesection{\\${titleFontUID}{}\\arabic{section}}
    \\newfontfamily\\${titleFontUID}[]{${titleFont}}
    \\newfontfamily\\${sectionFontUID}[]{${sectionFont}}
    \\section${secModifier}{\\${titleFontUID}{}${props.title}${hr}}
    {\\${sectionFontUID}{}
        ${rchildren.join("\n")}
    }
    `;
}

function hrule(props) {
    let width = _.get(props, "style.width", '1.0');
    let size = _.get(props, "style.size", '.4pt');
    return `\\rule{${width}\\textwidth}{${size}}`
}


let Reaxt = (function(){
    let state = { tags: [] }

    let createComponent = (function(tag, body) {
        this.tags = _.concat(this.tags, [{tag, body}]);
    }).bind(state)

    let addNode = (function(tag, props, ...rchildren) {
        if(_.isUndefined(tag)) {
            return "";
        } else {
            let tg = (_.find(this.tags, (it) => it.tag === tag ))
            if(!_.isUndefined(tg)) {
                return tg.body(props, ...rchildren)
            } else {
                throw `Undefined tag '${tag}'`;
                }
        }
    }).bind(state)
    let render = function(dom) {
        console.log(dom);
    }
    createComponent("article", article);
    createComponent("section", section);
    createComponent("hrule", hrule);
    createComponent("overlay", overlay);
    createComponent("node", node);
    return {
        createComponent, render, addNode
    }
})();


let title = { numbered: false, font: 'Bebas Neue', hrulefill: true }

Reaxt.createComponent('header', (...props) => {
    return (
        <overlay>
            <node name="bgd" minwidth="10cm" minheight="3cm" fill="gray"> </node>
            <node name="ex1" relativeto="bgd.south" color="white" anchor="south"> example </node>
            <node relativeto="ex1.north" color="white" anchor="south"> example2 </node>
            <node name="bgd2" relativeto="current page.south" minwidth="\paperwidth" minheight="3cm" fill="gray"> </node>
        </overlay>);
})

Reaxt.render(
    <article>
        <header />
        <section title="Prova" style={{title}}>
            This is a prova $x+y$

        </section>
        <section title="Prova" >
            This is a prova

        </section>
    </article>
);
