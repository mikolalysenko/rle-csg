var merge = require("rle-funcs").merge;

var SUBTRACT_FUNC = new Function("phases", "distances", "retval", [
  "if(phases[0]) {",
    "if(phases[1]) {",
      "retval[0] = 0;",
      "retval[1] = distances[1];",
    "} else {",
      "retval[0] = 1;",
      "retval[1] = distances[0];",
    "}",
  "} else {",
    "if(phases[1]) {",
      "retval[0] = 0;",
      "retval[1] = Math.min(distances[0], distances[1]);",
    "} else {",
      "retval[0] = 0;",
      "retval[1] = Math.max(distances[0], distances[1]);",
    "}",
  "}"
].join(""));

var POINT_STENCIL = new Int32Array(3);

//CSG
exports.subtract   = function(a, b) { return merge([a,b], POINT_STENCIL, SUBTRACT_FUNC); }


