/* jshint browser: true, esnext: true */

(function() {
    "use strict";

    const RENDERED_LINES_ID = "renderedLines";
    const LINE_CLASS = "line";

    const LINE_DELIMITER = "\n\n";

    require.config({
        paths: {
            ace: "./ace/lib/ace",
        }
    });

    // NB: MathJax doesn't really.. do anything with RequireJS. You can run it
    // under RequireJs, but it still just defines its stuff under
    // `window.MathJax`, not with a `requirejs.define`.  ¯\_(ツ)_/¯
    const MATHJAX_URL = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=AM_HTMLorMML&delayStartupUntil=configured";
    require([MATHJAX_URL, "./js/lz-string.min.js", "ace/ace"], function(_, LZString, ace) {
        const $renderedLines = document.getElementById(RENDERED_LINES_ID);
        let lineElements = [];

        const loadMath = () => {
            const key = window.location.hash.substr(1);

            editor.session.setValue("Loading math from URL...");
            editor.setReadOnly(true);

            // FIXME
            editor.session.setValue("");
            editor.setReadOnly(false);

            renderLines();
        };

        // https://stackoverflow.com/a/7616484
        String.prototype.hashCode = function() {
          var hash = 0, i, chr;
          if (this.length === 0) return hash;
          for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }
          return hash;
        };

        const saveMath = () => {
          const body = editor.getValue();
          const key = body.hashCode();
          // FIXME
          return "TODO";
        };

        let oldLines = [];
        const renderLines = () => {
            const lines = editor.getValue().split(LINE_DELIMITER);

            for (let i = 0; i < lines.length; ++i) {
                if (oldLines[i] === lines[i]) {
                    continue;
                }

                if (lineElements.length <= i) {
                    const $line = document.createElement("div");
                    $line.classList.add(LINE_CLASS);
                    lineElements.push($line);
                    $renderedLines.append($line);
                }

                lineElements[i].textContent = "`" + lines[i] + "`";
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, lineElements[i]]);
            }

            const extraLines = lineElements.length - lines.length;
            for (let i = lineElements.length - extraLines; i < lineElements.length; ++i) {
                lineElements[i].textContent = "";
            }

            oldLines = lines;
        };

        let editor = ace.edit("editor", {
            mode: "ace/mode/asciimath",
            theme: "ace/theme/tomorrow_night_eighties",
            selectionStyle: "text",
            showLineNumbers: false,
            showGutter: false,
            wrap: true,
        });
        editor.setAutoScrollEditorIntoView(true);

        editor.session.on("change", () => {
            renderLines();
        });

        const $infoButton = document.getElementById("info-button");
        const $infoBox = document.getElementById("info-box");
        const $shareButton = document.getElementById("share-button");
        const $shareBox = document.getElementById("share-box");
        const $settingsButton = document.getElementById("settings-button");
        const $settingsBox = document.getElementById("settings-box");
        const boxes = [$infoBox, $shareBox, $settingsBox];
        const shouldNotCloseBoxes = [$infoBox, $shareBox, $settingsBox, $infoButton, $shareButton, $settingsButton];

        $infoButton.addEventListener("click", function() {
          boxes.forEach(box => box.classList.remove("shown"));
          $infoBox.classList.add("shown");
        });

        $shareButton.addEventListener("click", function() {
          const $shareUrl = document.getElementById("share-url");
          boxes.forEach(box => box.classList.remove("shown"));
          $shareBox.classList.add("shown");
          saveMath().then(url => $shareUrl.value = url);
        });

        $settingsButton.addEventListener("click", function() {
          boxes.forEach(box => box.classList.remove("shown"));
          $settingsBox.classList.add("shown");
        });

        document.addEventListener("click", function(e) {
          let element = e.target;
          let reachesABox = false;

          while (element) {
            if (!shouldNotCloseBoxes.every(el => el != element) ) { reachesABox = true; break; }
            element = element.parentElement;
          }

          if (!reachesABox) boxes.forEach(box => box.classList.remove("shown"));
        });

        MathJax.Hub.Register.StartupHook("End", function() {
            MathJax.Hub.processSectionDelay = 0;

            loadMath();
        });
        MathJax.Hub.Configured();
    });
}());
