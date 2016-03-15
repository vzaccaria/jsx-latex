BUILDIR = dist
JS_BABEL_SRCDIR = ./src
JS_MAIN_SRC = index.js

include .make/bplt-module.make

all:
	@make refresh-showcase
	@make default

default: $(JS_BABEL_TGT) $(JS_MAIN_TGT) $(JS_DOCS_TGT) $(MD_README_TGT)

.OVERRIDES: test
test: all
	./tests/test.sh

refresh-showcase: ./docs/test.jsx
	./node_modules/.bin/babel-node ./docs/test.jsx > ./docs/result.md
