"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.widows.test.js
 */

const Wordwraps = require("../src/Wordwraps");

const wrap = function(str) {
  return `
<!DOCTYPE html><html><head></head><body>
${str}
</body></html>
`.trim();
};

describe("Join the last 2 words in a paragraph", () => {

  test(
    `[JoinLastTwo-001]
  Given
    - html string
  When
    - we process
  Then
    - the last 2 words in the paragraph are combined with &nbsp;
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this is my paragraph with last words</p>");
    const expected = wrap("<p>this is my paragraph with last&nbsp;words</p>");

    // When...
    const result = Wordwraps.process(html);

    // Then...
    expect(result).toEqual(expected);
  });

  /*
  test(
    `[JoinLastTwo-002]
  Given
    - html string with <sup> at end of sentence
  When
    - we process
  Then
    - should not join the last 2 words when either of the last 2 have markup
`.trim(), async() => {
    // Given...
    const html1 = wrap(`<p>these are my <span class="something">words</span></p>`);
    const expected1 = html1;
    const html2 = wrap(`<p>these are <span class="something">my </span>words</p>`);
    const expected2 = html2;

    // When...
    const result1 = Wordwraps.process(html1);
    const result2 = Wordwraps.process(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });
  */

  test(
    `[JoinLastTwo-003]
  Given
    - html string with <sup> at end of sentence
  When
    - we process
  Then
    - the last 2 words should be joined even if the last has a <sup> element
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this is my paragraph with last words<sup>1</sup></p>");
    const expected = wrap("<p>this is my paragraph with last&nbsp;words<sup>1</sup></p>");

    // When...
    const result = Wordwraps.process(html);

    // Then...
    expect(result).toEqual(expected);
  });

  test(
    `[JoinLastTwo-004]
  Given
    - html string with a single word
  When
    - we process
  Then
    - we do nothing when there is only 1 word
`.trim(), async() => {
    // Given...
    const html = wrap("<p>thislongword</p>");
    const expected = html;

    // When...
    const result = Wordwraps.process(html);

    // Then...
    expect(result).toEqual(expected);
  });

  test(
    `[JoinLastTwo-005]
  Given
    - html string where the last 2 words are already joined with &nbsp;
  When
    - we process
  Then
    - we should leave the existing &nbsp; alone
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this long sentence with last two&nbsp;joined</p>");
    const expected = html;

    // When...
    const result = Wordwraps.process(html);

    // Then...
    expect(result).toEqual(expected);
  });

});

