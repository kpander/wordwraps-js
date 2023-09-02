"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-percent.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: 25% of", () => {
  test(
    `[Unit:_joinWordGroups-500]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "this is a % of this invalid";
    const expected1 = html1;
    const html2 = "this is 25% offering invalid";
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-501]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    const html1 = "found that 75% of people have it";
    const expected1 = "found that 75%&nbsp;of people have it";
    const html2 = "found that 75.5% of people have it";
    const expected2 = "found that 75.5%&nbsp;of people have it";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-502]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should affect all occurrences
`.trim(), async() => {
    // Given...
    const html1 = "found that 75% of people have it but 13.5% don't";
    const expected1 = "found that 75%&nbsp;of people have it but 13.5% don't";
    const html2 = "found that 75% of people have it but 13.5% of them don't";
    const expected2 = "found that 75%&nbsp;of people have it but 13.5%&nbsp;of them don't";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

});

