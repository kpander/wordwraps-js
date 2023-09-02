"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-n-times.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: n minutes, n hours, n times", () => {
  test(
    `[Unit:_joinWordGroups-100]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
    // Given...
    const html1 = "25 timely";
    const expected1 = html1;
    const html2 = "25 minutesing";
    const expected2 = html2;
    const html3 = "abc123 minutes";
    const expected3 = html3;

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);
    const result2 = Wordwraps._joinWordGroups(html2);
    const result3 = Wordwraps._joinWordGroups(html3);

    // Then...
    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
    expect(result3).toEqual(expected3);
  });

  test(
    `[Unit:_joinWordGroups-101]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
    // Given...
    var words = [ "minute", "hour", "day", "week", "month", "year", "time" ];

    for (var i = 0; i < words.length; i++) {
      var input = "for 1 " + words[i];
      var expected = "for 1&nbsp;" + words[i];

      var result = Wordwraps._joinWordGroups(input);
      var resultPeriod = Wordwraps._joinWordGroups(input + ".");
      var resultComma = Wordwraps._joinWordGroups(input + ",");
      var resultPlural = Wordwraps._joinWordGroups(input + "s");
      var resultPluralPeriod = Wordwraps._joinWordGroups(input + "s.");
      var resultPluralComma = Wordwraps._joinWordGroups(input + "s,");

      expect(result).toEqual(expected);
      expect(resultPeriod).toEqual(expected + ".");
      expect(resultComma).toEqual(expected + ",");
      expect(resultPlural).toEqual(expected + "s");
      expect(resultPluralPeriod).toEqual(expected + "s.");
      expect(resultPluralComma).toEqual(expected + "s,");
    }
  });

  test(
    `[Unit:_joinWordGroups-102]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should affect all occurrences
`.trim(), async() => {
    // Given...
    const html1 = "in 1 minute, and 25 seconds, 3 months in 5 times";
    const expected1 = "in 1&nbsp;minute, and 25&nbsp;seconds, 3&nbsp;months in 5&nbsp;times";

    // When...
    const result1 = Wordwraps._joinWordGroups(html1);

    // Then...
    expect(result1).toEqual(expected1);
  });

});

