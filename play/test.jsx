/** @jsx Reaxt*/

let _ = require('lodash');

let uid = (n) => {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return _.sampleSize(possible, n).join('');
}

function article(props, ...rchildren) {
    return `
\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{fontspec,xunicode,xltxtra}
\\begin{document}
${rchildren.join("\n")}
\\end{document}
`;
}

function section(props, ...rchildren) {
    let titleFont      = _.get(props, "style.title.font", 'Minion Pro');
    let sectionFont    = _.get(props, "style.font", 'Minion Pro');
    let noNumbering    = _.get(props, "style.title.numbered", true);
    let secModifier    = (noNumbering) ? '' : '*'
    let titleFontUID   = `titleFont${uid(4)}`
    let sectionFontUID = `font${uid(4)}`
    return `
\\renewcommand\\thesection{\\${titleFontUID}{}\\arabic{section}}
\\newfontfamily\\${titleFontUID}[]{${titleFont}}
\\newfontfamily\\${sectionFontUID}[]{${sectionFont}}
\\section${secModifier}{\\${titleFontUID}{}${props.title}}
{\\${sectionFontUID}{}
    ${rchildren.join("\n")}
}
`;
}

function Reaxt(tag, props, ...rchildren) {
    if(_.isUndefined(tag)) {
        return "";
    } else {
        if(tag === "article") {
            return article(props, ...rchildren)
        }
        if(tag === "section") {
            return section(props, ...rchildren)
        }

    }
}


function render(dom) {
    console.log(dom)
}

let title = { numbered: false, font: 'Bebas Neue' }

render(
    <article>
        <section title="Prova" style={{title}}>
            This is a prova $x+y$

        </section>
        <section title="Prova" >
            This is a prova

        </section>
    </article>
);
