"use strict";
/*global describe, test, expect*/
/**
 * @file
 * Wordwraps.pattern-day.test.js
 */

const Wordwraps = require("../src/Wordwraps");

describe("pattern: day 5", () => {
  test(
    `[Unit:_joinWordGroups-600]
  Given
    - a string without the pattern
  When
    - we process
  Then
    - should do nothing
`.trim(), async() => {
  // Given...
  const html1 = "a weekday 25 elements later";
  const expected1 = html1;

  // When...
  const result1 = Wordwraps._joinWordGroups(html1);

  // Then...
  expect(result1).toEqual(expected1);
});

test(
  `[Unit:_joinWordGroups-601]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should make the entire pattern non-breakable
`.trim(), async() => {
  // Given...
  const html1 = "on day 5 you should";
  const expected1 = "on day&nbsp;5 you should";

  // When...
  const result1 = Wordwraps._joinWordGroups(html1);

  // Then...
  expect(result1).toEqual(expected1);
});

test(
  `[Unit:_joinWordGroups-602]
  Given
    - a string with the pattern
  When
    - we process
  Then
    - should affect all occurrences
`.trim(), async() => {
  // Given...
  const html1 = "on day 5 and day 6 you should";
  const expected1 = "on day&nbsp;5 and day&nbsp;6 you should";

  // When...
  const result1 = Wordwraps._joinWordGroups(html1);

  // Then...
  expect(result1).toEqual(expected1);
});

});

