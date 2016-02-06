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

function defineNewFont(props) {
    let Font     = _.get(props, "fontname", defaultfont);
    let Color    = _.get(props, "fontcolor", "000000");
    let Size = _.get(props, "fontsize", 1);
    let FontUID  = `\\font${uid(4)}`
    let FontCMD  = `\\newfontfamily${FontUID}[Scale=${Size},Color=${Color}]{${Font}}`
    return { FontUID, FontCMD }
}

function getOpts(hd) {
    return _.map(hd, (it) => it.key + "=" + it.value);
}

function node(props, ...rchildren) {
    let name     = _.get(props, "name", `nodeName${uid(3)}`);
    let position = _.get(props, "to", "current page.north");
    let shape    = _.get(props, "shape", "rectangle");
    let color    = _.get(props, "color", "black");

    let { FontUID, FontCMD }  = defineNewFont(props)

    let hd = []

    hd = addAs(hd, "fill", _.get(props, "fill"));
    hd = addAs(hd, "anchor", _.get(props, "anchor", "north"));
    hd = addAs(hd, "minimum width", _.get(props, "minwidth"));
    hd = addAs(hd, "minimum height", _.get(props, "minheight"));
    hd = getOpts(hd)
    hd = ([ shape ].concat(hd)).join(", ")

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

function minipage(props, ...rchildren) {
    let width = _.get(props, "width", '\\textwidth');
    let align = _.get(props, "align", 'c');

    return `\\noindent\\begin{minipage}[${align}]{${width}}${rchildren.join("")}\\end{minipage}`
}

function section(props, ...rchildren) {
    let { FontUID: titleFontUID, FontCMD: titleFontCMD } = defineNewFont(_.get(props, "style.title", {}))
    let { FontUID: sectionFontUID, FontCMD: sectionFontCMD } = defineNewFont(_.get(props, "style", {}))

    let noNumbering    = _.get(props, "style.title.numbered", true);
    let hrulefill =    _.get(props, "style.title.hrulefill", false);
    let secModifier    = (noNumbering) ? '' : '*'

    let hr = ""
    if(hrulefill) {
        hr='\\hrulefill'
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
    createComponent("minipage", minipage);
    return {
        createComponent, render, addNode
    }
})();


let title = { numbered: false, fontname: 'Bebas Neue', fontcolor: 'red', fontsize: 2, hrulefill: true }

Reaxt.createComponent('picture', (props) => {
    let hd = []
    hd = addAs(hd, "width", _.get(props, "width"));
    hd = getOpts(hd).join(",")
    let ig = `\\includegraphics[${hd}]{${props.src}}`
    return (<node {...props} > {ig} </node>);
})

Reaxt.createComponent('header', (props) => {
    return (
        <overlay>
            <node anchor="north" to="current page.north" name="bgd" minwidth="\paperwidth" minheight="3cm" fill="gray"> </node>
            <node anchor="north" to="current page.south" minwidth="\paperwidth" minheight="3cm" fill="gray"> </node>

            <picture anchor="south" to="bgd.south"  src="avatar-vz.jpg" width="1cm" />
            <node    anchor="north" to="bgd.center"  name="ex1" color="white" >


            </node>
            <node    anchor="south" to="ex1.north"  name="ex2" color="white" > example2 </node>

        </overlay>);
})

Reaxt.render(
    <article>
        <header />
        <minipage width="4cm" align="t">
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <minipage width="10cm" align="t">
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <minipage width="2cm">
        <section title="Prova" style={{title}}>
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
            This is a prova $x+y$
        </section>
        </minipage>
        <section title="Prova" >
            This is a prova

        </section>
    </article>
);
