Overview
========

`jsx-latex` is a small library that can generate latex files from a
`jsx` markup. It is just an experiment to see how far one can go in
producing high-quality latex by means of reusable components written in
jsx.

Example
=======

This jsx:

``` jsx
{%= partial("test.md") %}
```

will produce

``` latex
{%= partial("result.md") %}
```
