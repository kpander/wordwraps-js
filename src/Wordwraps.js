"use strict";
/**
 * @file
 * Wordwraps.js
 */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const nobreakspace = '&nbsp;';
const nobreakhyphen = '&#8209;';

class Wordwraps {

  static process(html, options = {}) {
    const defaults = {
      widows: "h1, h2, h3, h4, h5, h6, p, li, th, td, dt, dd, a",
      hyphens: "h1, h2, h3, h4, h5, h6, o, li, th, td, dt, dd, a, span",
      groups: "h1, h2, h3, h4, h5, h6, o, li, th, td, dt, dd, a, span",
    };
    options = { ...defaults, ...options };

    const dom = new JSDOM(html);

    dom.window.document.querySelectorAll(options.widows).forEach(el => {
      el.innerHTML = Wordwraps._joinLastTwoWords(el.innerHTML);
    });

    dom.window.document.querySelectorAll(options.groups).forEach(el => {
      el.innerHTML = Wordwraps._nonBreakingHyphen(el.innerHTML);
    });

    dom.window.document.querySelectorAll(options.groups).forEach(el => {
      el.innerHTML = Wordwraps._joinWordGroups(el.innerHTML);
    });

    return dom.serialize();
  }

  static _joinLastTwoWords(html) {
    //console.log("\n-----------------------\ngiven html:", html);
    var words = html.split(' ');
    if (words.length < 2) {
      // Only 1 word, or an empty tag. Ignore it.
      //console.log("ignoring: < 2 words");
      return html;
    }

    const last1 = words.pop();
    const last2 = words.pop();

    if (last1.match(/&nbsp;/)) {
      // The last word already contains a non-breaking space, which means we
      // can't easily determine if it must be there, or if it's the result of
      // previously having run this filter. Ignore it.
      //console.log("last word already has nbsp:", last1);
      return html;
    }

    // Join the last 2 words in the element with a non-breaking space.
    words.push(last2 + nobreakspace + last1);
    html = words.join(' ');

    return html;
  }


  /**
   * If the last word in an element has a hyphen, replace with a non-breaking
   * hyphen.
   */
  static _nonBreakingHyphen(html) {
    let words = html.split(" ");
    let last = words.pop();

    if (Wordwraps._hasMarkup(last)) {
      // Last word has markup. Assume everything to the left of the first '<'
      // is the word, and everything to the right is markup. Yes, this is brittle.
      let parts = last.split("<");
      if (!parts[0].match(/-/)) return html;

      parts[0] = parts[0].replace(/-/g, nobreakhyphen);
      last = parts.join("<");
    } else if (last.match(/-/)) {
      last = last.replace(/-/g, nobreakhyphen);
    }

    words.push(last);
    html = words.join(' ');
    return html;
  }


  /**
   * Determine if the given string contains html markup.
   */
  static _hasMarkup(html) {
    if (html.match(/<\/?[a-z].*>/i)) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Join all of the defined word groups together with &nbsp;.
   */
  static _joinWordGroups(html) {
    var patterns = Wordwraps._getGroupPatterns();

    for (var i = 0; i < patterns.length; i++) {
      html = Wordwraps._applyRegex(html, patterns[i][1], patterns[i][2]);
    }

    return html;
  }


  static _applyRegex(html, pattern_search, pattern_replace) {
    return html.replace(pattern_search, pattern_replace);
  }


  static _getGroupPatterns() {
    var patterns = [];

    // Replace the spaces with &nbsp; in this pattern:
    //   "n = 25" (any number)
    patterns.push([
      "n = 25",
      /\bn\s+=\s+(\d+)/g,
      "n&nbsp;=&nbsp;$1"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "25 minutes" (any number, and can be 'minutes' or 'minute')
    //   "10 hours"
    //   "3 days"
    //   "2 weeks"
    //   "1 month"
    //   "4 years"
    //   "1 time"
    patterns.push([
      "n minutes, n hours, n weeks",
      /\b(\d+)\s+(seconds?|minutes?|hours?|days?|weeks?|months?|years?|times?)\b/g,
      "$1&nbsp;$2"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "Phase 3" (any number)
    //   "phase 3" (lowercase)
    //   "Phase III" (from I to IV)
    patterns.push([
      "Phase n",
      /\b(Phase|phase)\s+([\d]+|I|II|III|IV)\b/g,
      "$1&nbsp;$2"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "Target 1" (any number)
    //   "TARGET 1" (uppercase)
    patterns.push([
      "Target n",
      /\b(Target|TARGET)\s+(\d+)\b/g,
      "$1&nbsp;$2"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "<em>P</em> value"
    patterns.push([
      "<em>P</em> value",
      /<em>P<\/em> value/g,
      "<em>P</em>&nbsp;value"
    ]);
    patterns.push([
      "P value",
      /\bP value\b/g,
      "P&nbsp;value"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "25% of" (any number)
    patterns.push([
      "25% of",
      /\b([0-9]+%)\sof\b/g,
      "$1&nbsp;of"
    ]);


    // Replace the spaces with &nbsp; in this pattern:
    //   "day 1" (any number)
    patterns.push([
      "day 2",
      /\b(Day|day)\s+([0-9]+)/g,
      "$1&nbsp;$2"
    ]);

    // @todo
    //   "GI tract"
    //   "\d mg" -- measurements?
    //   "2-week" "10-week" = wrap with span
    //   "x ≥ y" - nbsps
    //   "P=num.num" = wrap with span

    return patterns;
  }

}

module.exports = Wordwraps;
