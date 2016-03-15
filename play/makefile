WATCHOBJECT=test.jsx
WATCHTARGET=all
PROCREGEXP=".*Skim.*|xelatex"

include ~/.make/index.make

all: $(BUILDIR)/x.xelatex.pdf

x.xelatex.tex: test.jsx
	babel-node test.jsx > x.xelatex.tex

.phony: open
edit: $(BUILDIR)/x.xelatex.pdf
	open $< -a "Skim"
	make watch
