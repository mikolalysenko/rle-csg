var funcs = require("rle-funcs");

//Subtract
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
exports.subtract   = function(a, b) {
  return funcs.mergePoint([a,b], SUBTRACT_FUNC);
}

//Unite
var UNITE_FUNC = new Function("phases", "distances", "retval", [
  "if(phases[0]) {",
    "retval[0] = 1;",
    "if(phases[1]) {",
      "retval[1] = Math.max(distances[0], distances[1]);",
    "} else {",
      "retval[1] = distances[0];",
    "}",
  "} else {",
    "if(phases[1]) {",
      "retval[0] = 1;",
      "retval[1] = distances[1];",
    "} else {",
      "retval[0] = 0;",
      "retval[1] = Math.min(distances[0], distances[1]);",
    "}",
  "}"
].join(""));
exports.unite   = function(a, b) {
  return funcs.mergePoint([a,b], UNITE_FUNC);
}

//Intersect
var INTERSECT_FUNC = new Function("phases", "distances", "retval", [
  "if(phases[0]) {",
    "if(phases[1]) {",
      "retval[0] = 1;",
      "retval[1] = Math.min(distances[0], distances[1]);",
    "} else {",
      "retval[0] = 0;",
      "retval[1] = distances[1];",
    "}",
  "} else {",
    "retval[0] = 0;",
    "if(phases[1]) {",
      "retval[1] = distances[0];",
    "} else {",
      "retval[1] = Math.max(distances[0], distances[1]);",
    "}",
  "}"
].join(""));
exports.intersect  = function(a, b) {
  return funcs.mergePoint([a,b], INTERSECT_FUNC);
}

//Complement
var COMPLEMENT_FUNC = new Function("p", "d", "retval", "retval[0] = p^1; retval[1] = d;");
exports.complement = function(a) {
  return funcs.applyPoint(a, COMPLEMENT_FUNC);
}
