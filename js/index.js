/* jshint browser: true, esnext: true */

// TODO: Use RequireJS to load LZString and MathJax.
(function() {
    "use strict";

    const RENDERED_LINES_ID = "renderedLines";
    const LINE_CLASS = "line";

    const LINE_DELIMITER = "\n\n";

    require.config({
        paths: {
            ace: "./ace/lib/ace"
        }
    });

    let editor;

    const $renderedLines = document.getElementById(RENDERED_LINES_ID);

    const lineElements = [];

    const loadMath = () => {
        const savedMath = window.location.hash.substr(1);

        editor.session.setValue("Loading math from URL...");
        editor.setReadOnly(true);

        console.time("loadMath");
        const loadedMath = LZString.decompressFromEncodedURIComponent(savedMath);
        editor.session.setValue(loadedMath || "");
        editor.setReadOnly(false);
        console.timeEnd("loadMath");

        renderLines();
    };

    const saveMath = () => {
        window.location.hash = LZString.compressToEncodedURIComponent(editor.getValue());
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

    require(["ace/ace"], function(ace) {
        editor = ace.edit("editor", {
            mode: "ace/mode/asciimath",
            theme: "ace/theme/tomorrow_night_eighties",
            selectionStyle: "text",
            showLineNumbers: false,
            showGutter: false,
            wrap: true,
        });
        editor.setAutoScrollEditorIntoView(true);

        editor.session.on("change", () => {
            saveMath();
            renderLines();
        });

        MathJax.Hub.Register.StartupHook("End", function() {
            MathJax.Hub.processSectionDelay = 0;

            loadMath();
        });
        MathJax.Hub.Configured();
    });
}());
