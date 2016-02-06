(TeX-add-style-hook
 "x.xelatex"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("fontenc" "T1")))
   (TeX-run-style-hooks
    "latex2e"
    "article"
    "art10"
    "fontenc"
    "fontspec"
    "xunicode"
    "xltxtra"
    "tikz"
    "xcolor")))

