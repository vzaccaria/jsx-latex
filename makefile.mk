BUILDIR = dist
JS_BABEL_SRCDIR = src
JS_MAIN_SRC = index.js

include ~/.make/bplt-module.make

all: $(JS_BABEL_TGT) $(JS_MAIN_TGT) $(JS_DOCS_TGT) $(MD_README_TGT)

.OVERRIDES: test
test: all
	./tests/test.sh
