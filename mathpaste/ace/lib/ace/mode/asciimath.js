define("ace/mode/asciimath", function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextMode = require("ace/mode/text").Mode;
var AsciiMathHighlightRules = require("ace/mode/asciimath_highlight_rules").AsciiMathHighlightRules;

var Mode = function() {
    this.HighlightRules = AsciiMathHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/asciimath_highlight_rules', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var AsciiMathHighlightRules = function() {
    this.$rules = {
        "start": [
            { token: "variable.other", regex: /varepsilon|vartheta|epsilon|upsilon|lambda|Lambda|varphi|alpha|gamma|Gamma|delta|Delta|theta|Theta|kappa|sigma|Sigma|omega|Omega|beta|zeta|iota|eta|rho|tau|phi|Phi|chi|psi|Psi|mu|nu|xi|Xi|pi|Pi/ },
            { token: "keyword.operator", regex: /\\\\|backslashsetminus|twoheadrightarrowtail|twoheadrightarrow|frac\{2\}\{3\}|\/_\\|triangle|rightarrowtail|leftrightarrow|Leftrightarrow|\.\.\.\||rightarrow|Rightarrow|underbrace|root|therefore|ldots|cdots|downarrow|leftarrow|Leftarrow|underline|overbrace|\|\>\<\||bidwedge|emptyset|\|\\\ \||\|quad\||lceiling|rceiling|subseteq|supseteq|\>\-\>\>|overline|underset|partial|because|diamond|implies|uparrow|overset|\*\*\*|\|\>\<|ltimes|\>\<\||rtimes|bowtie|otimes|\^\^\^|bigvee|bigcap|bigcup|square|lfloor|rfloor|\-\<\=|preceq|\>\-\=|succeq|subset|supset|approx|propto|\<\=\>|forall|exists|\|\-\-|\|\=\=|models|langle|rangle|\>\-\>|\-\>\>|\|\-\>|mapsto|ubrace|obrace|cancel|arcsin|arccos|arctan|times|oplus|wedge|nabla|infty|aleph|vdots|ddots|angle|frown|notin|equiv|vdash|floor|color|cdot|\*\*|star|\/\/|\-\:|circ|odot|prod|\^\^|2\/3|2\^3|sqrt|oint|grad|\+\-|\:\.|\:\'|\|__|__\||\|\~|\~\||\!\=|\<\=|\>\=|\-\<|prec|\>\-|succ|\!in|sube|supe|\-\=|\~\=|cong|\~\~|prop|\=\>|_\|_|\(\:|\:\)|\<\<|\>\>|ceil|norm|uarr|darr|rarr|\-\>|larr|harr|rArr|lArr|hArr|ddot|sinh|cosh|tanh|sech|csch|coth|ast|div|o\+|o\.|sum|vee|vvv|cap|nnn|cup|uuu|int|del|O\/|\/_|sub|sup|and|not|neg|iff|bot|top|abs|hat|bar|vec|dot|sin|cos|tan|sec|csc|cot|exp|log|det|dim|mod|gcd|lcm|lub|glb|min|max|\+|\-|\*|xx|\@|ox|vv|nn|uu|pm|oo|CC|NN|QQ|RR|ZZ|\=|ne|\<|lt|\>|gt|le|ge|in|or|if|AA|EE|TT|\(|\)|\[|\]|\{|\}|to|ul|ln|f|g/ },
            { token: "comment.block", regex: /text\(.*?\)/ },
            { token: "comment.block", regex: /".*?"/ },
            { token: "variable.other", regex: /[a-zA-Z]/ },
            { token: "constant.numeric", regex: /[0-9]+(?:\.[0-9]+)?/ },
        ],
    };
};

oop.inherits(AsciiMathHighlightRules, TextHighlightRules);

exports.AsciiMathHighlightRules = AsciiMathHighlightRules;
});

// vim: shiftwidth=4 softtabstop=4 tabstop=4
