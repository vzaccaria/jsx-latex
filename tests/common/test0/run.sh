#!/usr/bin/env sh
set -e

# Source directory
#
srcdir=$(dirname "$0")
srcdir=$(cd "$srcdir"; pwd)

bindir=$srcdir/../../..
npm=$bindir/node_modules/.bin

rm -f $srcdir/output

$npm/babel-node $srcdir/test.jsx > "$srcdir/output"
"$npm/diff-files" -m "Test grade generation       :" "$srcdir/output" "$srcdir/reference"
