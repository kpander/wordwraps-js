"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-phase.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: Phase n or Phase III", () => {
  test(
    `[Unit:_joinWordGroups-200]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "this is phase eleven";
    const expected1 = html1;
    const html2 = "transphase 2";
    const expected2 = html2;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  });

  test(
    `[Unit:_joinWordGroups-201]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should mak the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    const html1 = "initial phase 3 studies";
    const expected1 = "initial phase&nbsp;3 studies";
    const html2 = "initial Phase 3 studies";
    const expected2 = "initial Phase&nbsp;3 studies";
    const html3 = "this is phase 25 now";
    const expected3 = "this is phase&nbsp;25 now";
    const html4 = "this is Phase I";
    const expected4 = "this is Phase&nbsp;I";
    const html5 = "this is Phase II";
    const expected5 = "this is Phase&nbsp;II";
    const html6 = "this is Phase III";
    const expected6 = "this is Phase&nbsp;III";
    const html7 = "this is Phase IV";
    const expected7 = "this is Phase&nbsp;IV";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);
    const result3 = Wordwraps._joinWordGroups(html3);
    const result4 = Wordwraps._joinWordGroups(html4);
    const result5 = Wordwraps._joinWordGroups(html5);
    const result6 = Wordwraps._joinWordGroups(html6);
    const result7 = Wordwraps._joinWordGroups(html7);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
    expect(result3).toEqual(expected3);
    expect(result4).toEqual(expected4);
    expect(result5).toEqual(expected5);
    expect(result6).toEqual(expected6);
    expect(result7).toEqual(expected7);
  });

  test(
    `[Unit:_joinWordGroups-202]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should affect all occurrences
`.trim(), async() => {
    // Given...
    const html1 = "with phase 2 and Phase IV, follow phase 14";
    const expected1 = "with phase&nbsp;2 and Phase&nbsp;IV, follow phase&nbsp;14";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);

    // Then...
    expect(result1).toEqual(expected1);
  });

});

