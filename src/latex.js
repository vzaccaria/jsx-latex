/** @jsx Reaxt.addNode*/

let _ = require("lodash");
let Reaxt = require("./lib");
let {
  uid,
  defineNewFont,
  addAs,
  getOpts,
  parse
} = Reaxt;

function article(props, ...rchildren) {
  let geometry = _.get(props, "geometry", "");
  let preamble = _.get(props, "preamble", "");
  let colors = _.get(props, "colors", {});
  colors = _
    .map(colors, (v, k) => {
      return `\\definecolor{${k}}{HTML}{${v}}`;
    })
    .join("\n");
  return `
\\documentclass{article}
\\usepackage[T1]{fontenc}
\\usepackage{fontspec,xunicode,xltxtra}
\\usepackage{tikz}
\\usepackage{xcolor}
\\usepackage{setspace}
\\usepackage{enumitem}
\\usepackage{multicol}
\\definecolor{white}{RGB}{255,255,255}
\\definecolor{darkgray}{HTML}{333333}
\\definecolor{gray}{HTML}{4D4D4D}
\\definecolor{lightgray}{HTML}{999999}
\\definecolor{green}{HTML}{C2E15F}
\\definecolor{orange}{HTML}{FDA333}
\\definecolor{purple}{HTML}{D3A4F9}
\\definecolor{red}{HTML}{FB4485}
\\definecolor{blue}{HTML}{6CE0F1}
\\usepackage[${geometry}]{geometry}${preamble}
${colors}
\\begin{document}
${rchildren.join("\n")}
\\end{document}
`;
}

function itemize(tag) {
  return function(props, ...rchildren) {
    let hd = parse(props)
      .accepts("leftmargin")
      .accepts("itemsep")
      .accepts("topsep")
      .accepts("partopsep")
      .get();
    return `\\begin{${tag}}[${hd}]{${rchildren.join("")}}\\end{${tag}}`;
  };
}

function envgen(tag) {
  return function(props, ...rchildren) {
    return `\\begin{${tag}}{${rchildren.join("")}}\\end{${tag}}`;
  };
}

function txtgen(tag) {
  return function(props, ...rchildren) {
    return `\\${tag}{${rchildren.join("")}}`;
  };
}

function vspace(props) {
  let space = _.get(props, "space", "0pt");
  return `\\vspace{${space}}`;
}

function hspace(props) {
  let space = _.get(props, "space", "0pt");
  return `\\hspace{${space}}`;
}

function text(props, ...rchildren) {
  let {
    FontUID,
    FontCMD
  } = defineNewFont(_.get(props, "style", {}));
  if (_.isUndefined(FontCMD)) {
    return `\\noindent${rchildren.join("")}`;
  } else {
    return `${FontCMD}\\noindent{${FontUID}{}${rchildren.join("")}}`;
  }
}

function br() {
  return `\\newline{}`;
}

function columnbreak() {
  return `\\columnbreak`;
}

function multicolumn(props, ...rchildren) {
  let cols = parseInt(_.get(props, "columns", 2));
  let columnsep = _.get(props, "columnsep", "10pt");

  return `\\noindent\\setlength\\columnsep{${columnsep}}\\begin{multicols}{${cols}}${rchildren.join(
    ""
  )}\\end{multicols}`;
}

function minipage(props, ...rchildren) {
  let width = _.get(props, "width", "\\textwidth");
  let align = _.get(props, "align", "c");
  let height = _.get(props, "height", undefined);
  let opts = "";
  if (_.isUndefined(height)) {
    opts = `[${align}]{${width}}`;
  } else {
    opts = `[${align}]{${height}}{${width}}`;
  }
  let {
    FontUID,
    FontCMD
  } = defineNewFont(_.get(props, "style", {}));
  if (_.isUndefined(FontCMD)) {
    return `\\noindent\\begin{minipage}${opts}${rchildren.join(
      ""
    )}\\end{minipage}`;
  } else {
    return `${FontCMD}\\noindent\\begin{minipage}${opts}${FontUID}{}${rchildren.join(
      ""
    )}\\end{minipage}`;
  }
}

function section(props, ...rchildren) {
  let {
    FontUID: titleFontUID,
    FontCMD: titleFontCMD
  } = defineNewFont(_.get(props, "style.title", {}));
  let {
    FontUID: sectionFontUID,
    FontCMD: sectionFontCMD
  } = defineNewFont(_.get(props, "style", {}));

  let noNumbering = _.get(props, "style.title.numbered", true);
  let hrulefill = _.get(props, "style.title.hrulefill", false);
  let secModifier = noNumbering ? "" : "*";

  let hr = "";
  if (hrulefill) {
    hr = "\\hrulefill";
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
  let width = _.get(props, "style.width", "1.0");
  let size = _.get(props, "style.size", ".4pt");
  return `\\rule{${width}\\textwidth}{${size}}`;
}

Reaxt.createComponent("image", props => {
  let hd = parse(props).accepts("width").get();
  let ig = `\\includegraphics[${hd}]{${props.src}}`;
  return ig;
});

Reaxt.createComponent("hrule", hrule);
Reaxt.createComponent("article", article);
Reaxt.createComponent("section", section);
Reaxt.createComponent("minipage", minipage);
Reaxt.createComponent("multicolumn", multicolumn);
Reaxt.createComponent("text", text);
Reaxt.createComponent("br", br);
Reaxt.createComponent("columnbreak", columnbreak);
Reaxt.createComponent("smallcaps", txtgen("textsc"));
Reaxt.createComponent("bold", txtgen("textbf"));
Reaxt.createComponent("italic", txtgen("emph"));
Reaxt.createComponent("vspace", vspace);
Reaxt.createComponent("hspace", hspace);

_.map(["flushright", "flushleft", "center"], it => {
  Reaxt.createComponent(it, envgen(it));
});

_.map(
  [
    "tiny",
    "footnotesize",
    "scriptsize",
    "small",
    "normalsize",
    "large",
    "Large",
    "LARGE",
    "huge",
    "Huge",
    "centering",
    "item",
    "emph"
  ],
  it => {
    Reaxt.createComponent(it, txtgen(it));
  }
);

_.map(["itemize", "enumerate", "description"], it => {
  Reaxt.createComponent(it, itemize(it));
});

module.exports = Reaxt;
