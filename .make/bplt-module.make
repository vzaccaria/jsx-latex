MAKEROOT ?= .

JS_BABEL_SRCDIR ?= src
JS_DOCS_SRCDIR ?= docs

JS_MAIN_TGT ?= main.js
JS_MAIN_SRC ?= index.js

JS_DOCS_TGT ?= $(JS_DOCS_SRCDIR)/api.md
JS_VERB_SRC ?= $(wildcard $(JS_DOCS_SRCDIR)/*.md)

MD_README_TGT ?= readme.md

include .make/index.make

vpath %.js $(JS_BABEL_SRCDIR)
JS_BABEL_SRC = $(wildcard $(JS_BABEL_SRCDIR)/*.js)
JS_BABEL_TGT = $(call collapseinto,$(BUILDIR),$(JS_BABEL_SRC))

$(JS_BABEL_TGT): $(BUILDIR)/%.js: %.js $(BUILDIR)/.f
	./node_modules/.bin/babel $< -o $@

$(JS_DOCS_TGT): $(JS_MAIN_TGT)
	./node_modules/.bin/markdox $< -o $@

.phony: major minor patch
major minor patch: all
	./node_modules/.bin/xyz -i $@

$(JS_MAIN_TGT): $(BUILDIR)/$(JS_MAIN_SRC)
	cp $< $@

$(MD_README_TGT): $(JS_DOCS_TGT) $(JS_VERB_SRC) verbfile.js
	./node_modules/.bin/verb

$(info Babel sources:    $(JS_BABEL_SRC))
$(info Babel source dir: $(JS_BABEL_SRCDIR))
$(info Babel targets:    $(JS_BABEL_TGT))
