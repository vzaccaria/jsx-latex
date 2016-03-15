include .make/index.make

all:
	@make cclean
	@make $(BUILDIR)/cover.xelatex.pdf

cover.xelatex.tex: ../test.jsx
				../../node_modules/.bin/babel-node $< > $@

cclean:
				@rm -f cover.xelatex.tex
