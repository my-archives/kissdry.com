ROOT_DIR = .
DOCS = ${ROOT_DIR}/docs
ASSETS = ${ROOT_DIR}/assets
HOME = ${ROOT_DIR}/!

MDS = $(shell find ${DOCS}/*.md)
HTMLS = $(MDS:.md=.html)

JS_ENGINE ?= `which node`
MKD_CL = ${ROOT_DIR}/markdown.js

all: start $(HTMLS)

%.html: %.md
	@${JS_ENGINE} ${MKD_CL} `basename $< .md`

start:
	@echo 'markdown to html'

clean:
	@echo 'rm -rf ${HOME}/*.html'
	@rm -rf ${HOME}/*.html

.PHONY: start clean
