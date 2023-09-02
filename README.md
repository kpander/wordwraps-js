# wordwraps-js

Apply common copy-editing fixes for text, specifically to control how lines wrap. We address widows at the end of a sentence, hyphens in the last word of a sentence, and patterns of word groups that should always remain together.

Assumes we're working with HTML content.

(This has a bias towards patterns seen in medical/health information.)

To control the wraps, we insert a `&nbsp;` entity between words.


# Installation

## With `npm`

If you're installing via `npm`... Ensure your project has an `.npmrc` file in the project root to tell `npm` where to find the package. Ensure the following line exists:

```
@kpander:registry=https://npm.pkg.github.com/
```

Then:

```
$ npm install @kpander/wordwraps-js
```

Then, annoyingly, you'll need to copy the files you need into your project's source folder, depending on where that is. E.g., assuming your source files are in `./src/js`:

```
$ cp "node_modules/@kpander/wordwraps-js/dist/Wordwraps.js" ./src/js
```


# Usage

## Example 1: Basic usage

```js
const input = `<p>Pretend this is a long sentence with a widow.</p>`;
console.log(Wordwraps.process(input));
```

```code
<p>Pretend this is a long sentence with a&nbsp;widow.</p>
```

# Features

  - The last two words in an element will be joined together
  - If the last word in an element has a hyphen, replace it with a non-breaking hyphen
  - Make certain word patterns non-breaking

## Word patterns

| Example      | Pattern       | Output   |
| :-           | :-            | :-       |
| `n = 25`     | "n = {###}"   | `n&nbsp;=&nbsp;25` |
| `5 days`     | "{###} {seconds\|minutes\|hours\|days\|weeks\|months\|years\|times\}" | `5&nbsp;days;` |
| `Phase 5`    | "Phase {###}  | `Phase&nbsp;5` |
| `Phase II`   | "Phase {I\|II\|III\|IV}" | `Phase&nbsp;II` |
| `Target 3`   | "Target {###} | `Target&nbsp;3` |
| `TARGET 3`   | "TARGET {###} | `TARGET&nbsp;3` |
| `P value`    | "P value"     | `P&nbsp;value`  |
| `<em>P</em> value` | `"<em>P</em> value"`     | `<em>P</em>&nbsp;value`  |
| `25% of`     | "{###}% of"   | `25%&nbsp;of` |
| `Day 5`      | "Day {###}"   | `Day&nbsp;5`  |
| `day 5`      | "day {###}"   | `day&nbsp;5`  |




# Developers

## Build distribution files

```bash
$ npm run build
```

This will build the distribution files in the `/dist/` folder. Run this before publishing a new release.


## Publishing a new version

This assumes you have an `.npmrc` file in the folder with a valid Github token for creating packages.

```bash
$ npm run build
$ npm publish
```


## Tests

You'll find Jest test cases in `./test`. To ensure all tests pass:

```bash
$ npm run test
```


# TODO

Note: This is definitely *not* a robust and production-ready library. It's a quick-and-dirty solution to a specific problem.

  - allow options for which elements are processed by each rule
  - allow providing custom word patterns to apply
  - allow defining *how* to make things non-breaking (`&nbsp;` vs wrapping in a `<span>`, etc.)


# Maintainer

  - Kendall Anderson (kpander@invisiblethreads.com)

