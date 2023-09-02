"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-target.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: Target n or TARGET n", () => {
  test(
    `[Unit:_joinWordGroups-300]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "this is not Target one";
    const expected1 = html1;
    const html2 = "bigTarget 25";
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-301]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    const html1 = "find Target 25.";
    const expected1 = "find Target&nbsp;25.";
    const html2 = "find TARGET 25.";
    const expected2 = "find TARGET&nbsp;25.";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-302]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should find all occurrences
`.trim(), async() => {
    // Given...
    const html1 = "find Target 25. Also find TARGET 14. And Target 4.";
    const expected1 = "find Target&nbsp;25. Also find TARGET&nbsp;14. And Target&nbsp;4.";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);

    // Then...
    expect(result1).toEqual(expected1);
  });

});

