#!/bin/bash

cd Resume
latexmk -pdf -file-line-error -halt-on-error -interaction=nonstopmode
mv Resume.pdf ../static/Resume.pdf
cd ..
hugo serve
