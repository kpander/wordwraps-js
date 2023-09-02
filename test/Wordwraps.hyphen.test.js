"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.hyphen.test.js
 */

const Wordwraps = require("../src/Wordwraps");

const wrap = function(str) {
  return `
<!DOCTYPE html><html><head></head><body>
${str}
</body></html>
`.trim();
};

describe("Should replace non-breaking hyphens with entity", () => {

  test(
    `[Unit:NonBreakHyphen-001]
  Given
    - html string with no hyphen
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this is my string with no hyphen</p>");
    const expected = html;

    // When...
    const result = Wordwraps._nonBreakingHyphen(html);

    // Then...
    expect(result).toEqual(expected);
  });

  test(
    `[Unit:NonBreakHyphen-002]
  Given
    - html string with an entity hyphen
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this is my string with&#8209;hyphen</p>");
    const expected = html;

    // When...
    const result = Wordwraps._nonBreakingHyphen(html);

    // Then...
    expect(result).toEqual(expected);
  });

  test(
    `[Unit:NonBreakHyphen-003]
  Given
    - html string with a hyphen that isn't in the last word
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = wrap("<p>this ibs-d is here</p>");
    const expected1 = html1;
    const html2 = wrap("<p>this ibs-d here</p>");
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._nonBreakingHyphen(html1);
    const result2 = Wordwraps._nonBreakingHyphen(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:NonBreakHyphen-004]
  Given
    - html string with a hyphen in the last word
  When
    - we process
  Then
    - replace the hyphen with a nbsp entity hyphen
`.trim(), async() => {
    // Given...
    const html = wrap("<p>this is my string with ibs-d</p>");
    const expected = wrap("<p>this is my string with ibs&#8209;d</p>");

    // When...
    const result = Wordwraps._nonBreakingHyphen(html);

    // Then...
    expect(result).toEqual(expected);
  });

});

