# MathPaste

MathPaste is a simple math-sharing service. Unlike most other math pastebins,
like [mathb.in](http://mathb.in/), it uses asciimath instead of LaTeX. We think
that asciimath syntax is much nicer to work with than LaTeX syntax; for example,
if you want to write fraction like this...

![(a+b)/(c+d)](http://latex.codecogs.com/gif.latex?%5Cfrac%7Ba&plus;b%7D%7Bc&plus;d%7D)

...you need `\frac{a+b}{c+d}` in LaTeX, but that's simply `(a+b) / (c+d)` in
asciimath. Awesome!

```
[22:46]              xqb | :)
[22:47]              xqb | I love mathpaste
[22:47]              xqb | :D
[22:47]            Akuli | :)
[22:47]              xqb | not only it eliminated the need to buy another
                           desk
[22:47]              xqb | but it also eliminated the need for notebooks
                           and pens and papers
```


## Getting Started

Go to [purplemyst.github.io/mathpaste](https://purplemyst.github.io/mathpaste/)
and write some asciimath to the left half of the page. It'll render immediately
on the right side. You can also share the math to a friend by copy/pasting the
URL from the address bar and giving the link to the friend.

If you are wondering how you can write something in asciimath, go to
[asciimath.org](http://asciimath.org/) and scroll down to "Syntax". Everything
from basic stuff like `sqrt x` to tricks like `color(blue) y` and `cancel z` is
listed there. Parentheses are optional, so `sqrt(x)` does the same thing as
`sqrt x` (but you *do* need the parentheses for `sqrt(x+y)`). Spaces are also
optional, so if you want to work fast, you can even do `sqrtx`, `color(blue)y`
or `cancelz`.

Sometimes the asciimath is very long. The whole math is encoded in the URL, so
the URLs can also get huge. If you don't want to send really long URLs to your
friends, you can put them through an URL shortener like this:

1. Open an URL shortener to a new browser tab. I usually use
   [bit.do](https://bit.do/), but there are many others and you can use any URL
   shortener you want.
2. Go back to the mathpaste in another tab and copy the big URL.
3. Go to the URL shortener tab, paste the big URL in and click the shortening
   button.
4. Share the short URL to your friend.


## More Links

- If you have any trouble with mathpaste, please
  [open a new issue on GitHub](https://github.com/PurpleMyst/mathpaste/issues/new).
- MathPaste renders the asciimath with [MathJax](https://mathjax.org/).
- [PurpleMyst](https://github.com/PurpleMyst/) and [Akuli](https://github.com/Akuli/)
  created MathPaste.
- The text entry area is implemented with [ace](https://ace.c9.io/).
- MathPaste is based on the "Try it out in the interactive renderer:" thing on
  [asciimath.org](http://asciimath.org/).
