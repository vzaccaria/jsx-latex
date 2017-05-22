# jsx-latex [![NPM version](https://badge.fury.io/js/jsx-latex.svg)](http://badge.fury.io/js/jsx-latex)

Install globally with [npm](https://www.npmjs.com/)

```sh
$ npm i -g jsx-latex
```

Overview
========

`jsx-latex` is a small library that can generate latex files from a
`jsx` markup. It is just an experiment to see how far one can go in
producing high-quality latex by means of reusable components written in
jsx.

Example
=======

This jsx:

``` jsx
/** @jsx Reaxt.addNode*/

let Reaxt = require('../main');


let geometry = [ "margin={2cm, 2cm}", "paper=a4paper" ].join(", ");

let title ={
    numbered: false,
    fontname: 'Bebas Neue',
    fontcolor: '888888',
    fontsize: 2
};

Reaxt.render(
    <article geometry={geometry} >
        <minipage width="4cm" align="t">
            <image src="avatar-vz.jpg" width="1cm" />
            <minipage width="2.9cm">
            <section title="Foo" style={{title}}>
                <itemize leftmargin="*" >
                    <item> foo </item>
                    <item> bar </item>
                </itemize>
            </section>
            </minipage>
        </minipage>
    </article>
);
```

will produce

``` latex
\documentclass{article}
\usepackage[T1]{fontenc}
\usepackage{fontspec,xunicode,xltxtra}
\usepackage{tikz}
\usepackage{xcolor}
\usepackage{setspace}
\usepackage{enumitem}
\usepackage{multicol}
\definecolor{white}{RGB}{255,255,255}
\definecolor{darkgray}{HTML}{333333}
\definecolor{gray}{HTML}{4D4D4D}
\definecolor{lightgray}{HTML}{999999}
\definecolor{green}{HTML}{C2E15F}
\definecolor{orange}{HTML}{FDA333}
\definecolor{purple}{HTML}{D3A4F9}
\definecolor{red}{HTML}{FB4485}
\definecolor{blue}{HTML}{6CE0F1}
\usepackage[margin={2cm, 2cm}, paper=a4paper]{geometry}

\begin{document}
\newfontfamily\fontnQaN[Scale=1,Color=000000]{Minion Pro}\noindent\begin{minipage}[t]{4cm}\fontnQaN{}\includegraphics[width=1cm]{avatar-vz.jpg}\newfontfamily\fontpkxK[Scale=1,Color=000000]{Minion Pro}\noindent\begin{minipage}[c]{2.9cm}\fontpkxK{}
\renewcommand\thesection{\fontwUmO{}\arabic{section}}
\newfontfamily\fontwUmO[Scale=2,Color=888888]{Bebas Neue}
\newfontfamily\fontDhrq[Scale=1,Color=000000]{Minion Pro}
\section*{\fontwUmO{}Foo}
{\fontDhrq{}
\begin{itemize}[leftmargin=*]{\item{ foo }\item{ bar }}\end{itemize}
}
\end{minipage}\end{minipage}
\end{document}
```

# API

<!-- Start main.js -->

## exports

* `Reaxt.createComponent(tagname, body)`: creates a new tag with
the corresponding rendering function.

* `Reaxt.render(tag)`: renders the tag to stdout.

## usage

Just put a comment with `@jsx Reaxt.addNode` at the
beginning of your file and compile it with a react-enabled
babel preset.

<!-- End main.js -->

# Author

* Vittorio Zaccaria

# License
Copyright © 2017 Vittorio Zaccaria
Released under the BSD license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 22, 2017._
