
\documentclass{article}
\usepackage[T1]{fontenc}
\usepackage{fontspec,xunicode,xltxtra}
\usepackage{tikz}
\usepackage{xcolor}
\usepackage{setspace}
\usepackage{enumitem}
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
\newfontfamily\fontnQaN[Scale=1,Color=000000]{LMRoman12 Regular}\noindent\begin{minipage}[t]{4cm}\fontnQaN{}\includegraphics[width=1cm]{avatar-vz.jpg}\newfontfamily\fontpkxK[Scale=1,Color=000000]{LMRoman12 Regular}\noindent\begin{minipage}[c]{2.9cm}\fontpkxK{}
\renewcommand\thesection{\fontwUmO{}\arabic{section}}
\newfontfamily\fontwUmO[Scale=2,Color=888888]{Bebas Neue}
\newfontfamily\fontDhrq[Scale=1,Color=000000]{LMRoman12 Regular}
\section*{\fontwUmO{}Foo}
{\fontDhrq{}
\begin{itemize}[leftmargin=*]{\item{ foo }\item{ bar }}\end{itemize}
}
\end{minipage}\end{minipage}
\end{document}

