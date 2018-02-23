/* jshint browser: true, esnext: true */

/* TODO: Figure out how this stuff actually works.
 *       I just modified a bit of code my friend gave me. */
(function() {
  "use strict";

  const SOURCE_ID = "source";
  const RENDERED_LINES_ID = "renderedLines";
  const LINE_CLASS = "line";

  const LINE_DELIMITER = "\n\n";

  const $source = document.getElementById(SOURCE_ID);
  const $renderedLines = document.getElementById(RENDERED_LINES_ID);

  const lineElements = [];

  const loadMath = () => {
    $source.value = "Loading math from URL...";
    $source.enabled = false;

    console.time("loadMath");
    $source.value = LZString.decompressFromEncodedURIComponent(window.location.hash.substr(1));
    $source.enabled = true;
    console.timeEnd("loadMath");

    renderLines();
  };

  const saveMath = () => {
    window.location.hash = LZString.compressToEncodedURIComponent($source.value);
  };

  let oldLines = [];
  const renderLines = () => {
    const lines = $source.value.split(LINE_DELIMITER);

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

  window.MathJax = {
    AuthorInit() {
      MathJax.Hub.Register.StartupHook("End", function() {
        MathJax.Hub.processSectionDelay = 0;

        loadMath();

        $source.addEventListener("input", () => {
          saveMath();
          renderLines();
        });
      });
    }
  };
}());
