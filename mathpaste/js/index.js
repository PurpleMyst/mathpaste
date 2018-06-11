/* jshint browser: true, esversion: 6 */

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

        const loadMath = async () => {
            const pasteId = window.location.hash.substr(1);
            window.location.hash = "";
            if (pasteId === "") return;

            editor.session.setValue("Loading math from URL...");
            editor.setReadOnly(true);

            let resp = await fetch(`/mathpaste/api/${pasteId}`);
            let json_resp = await resp.json();

            if (!json_resp.ok) {
                editor.setReadOnly(false);
                editor.session.setValue("");
                alert(json_resp.error);
                return;
            } else {
                editor.setReadOnly(false);
                editor.session.setValue(json_resp.contents);
            }


            renderLines();
        };

        const saveMath = async () => {
            const body = editor.getValue();
            const resp = await fetch("/mathpaste/api", {
                method: "POST",
                body
            })
            const json_resp = await resp.json();
            if (!json_resp.ok) {
                alert(json_resp.error);
                return null;
            } else {
                return window.location.href + json_resp.id;
            }
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

        $shareButton.addEventListener("click", async function() {
            const $shareUrl = document.getElementById("share-url");
            boxes.forEach(box => box.classList.remove("shown"));
            $shareBox.classList.add("shown");
            let url = await saveMath();
            $shareUrl.value = url;
        });

        $settingsButton.addEventListener("click", function() {
            boxes.forEach(box => box.classList.remove("shown"));
            $settingsBox.classList.add("shown");
        });

        document.addEventListener("click", function(e) {
            let element = e.target;
            let reachesABox = false;

            while (element) {
                if (!shouldNotCloseBoxes.every(el => el != element)) {
                    reachesABox = true;
                    break;
                }
                element = element.parentElement;
            }

            if (!reachesABox) boxes.forEach(box => box.classList.remove("shown"));
        });

        MathJax.Hub.Register.StartupHook("End", async function() {
            MathJax.Hub.processSectionDelay = 0;

            await loadMath();
        });
        MathJax.Hub.Configured();
    });
}());
