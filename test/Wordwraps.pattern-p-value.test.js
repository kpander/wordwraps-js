"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-p-value.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: P value", () => {
  test(
    `[Unit:_joinWordGroups-400]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "this is not a value with p.";
    const expected1 = html1;
    const html2 = "the TOP value is invalid";
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-401]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    const html1 = "this is my P value of 25";
    const expected1 = "this is my P&nbsp;value of 25";
    const html2 = "this is my <em>P</em> value of 25";
    const expected2 = "this is my <em>P</em>&nbsp;value of 25";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

});

