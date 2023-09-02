/**
 * Create ./dist/ versions.
 */

const packager = require("@kpander/packager-js");

packager.setPackageJson(require("./package.json"));
packager.process("src/Wordwraps.js", "dist/Wordwraps.js");

