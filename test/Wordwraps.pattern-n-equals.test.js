"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-n-equals.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: n = 25", () => {
  test(
    `[Unit:_joinWordGroups-001]
  Given
    - a string without a 'n = 25' pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "something = 25";
    const expected1 = html1;
    const html2 = "then = 25 invalid";
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-002]
  Given
    - a string with a 'n = 25' pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    const html1 = "when n = 15 then";
    const expected1 = "when n&nbsp;=&nbsp;15 then";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);

    // Then...
    expect(result1).toEqual(expected1);
  });

  test(
    `[Unit:_joinWordGroups-003]
  Given
    - a string with multiple 'n = 25' patterns
  When
    - we process
  Then
    - should affect all occurrences
`.trim(), async() => {
    // Given...
    const html1 = "when n = 15, n = 22 and n = 3 then";
    const expected1 = "when n&nbsp;=&nbsp;15, n&nbsp;=&nbsp;22 and n&nbsp;=&nbsp;3 then";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);

    // Then...
    expect(result1).toEqual(expected1);
  });

});

