"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.integration.test.js
 */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const Wordwraps = require("../src/Wordwraps");
const fs = require("fs");
const path = require("path");

const getFileContents = function(filename) {
  const file = path.join(__dirname, "artifacts", filename);
  return fs.readFileSync(file, "utf8").trim();
}

// Construct a js dom object for the given html string.
const dom = function(html) {
  return new JSDOM(html);
};

// Return the inner html for a dom element with the given id.
const innerHTML = function(dom, id) {
  return dom.window.document.getElementById(id).innerHTML;
}

describe("Full integration tests", () => {

  test(
    `[Integration-001]
  Given
    - html string
  When
    - we process
  Then
    - all expected changes are made
`.trim(), async() => {
    // Given...
    const html = getFileContents("full.source.html");
    const expected = getFileContents("full.expected.html");

    // When...
    const result = Wordwraps.process(html);
    const dom_result = dom(result);
    const dom_expected = dom(expected);

    // Then...
    // Go through all the ext[#] ids and make sure they pass.
    for (let i = 1; i < 18; i++) {
      const id = `exp${i}`;
      expect(innerHTML(dom_result, id).length).toBeGreaterThan(0);
      expect(innerHTML(dom_result, id)).toEqual(innerHTML(dom_expected, id));
    }
  });

});

