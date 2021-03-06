var $           = require("jquery-browserify")
  , core        = require("rle-core")
  , mesh        = require("rle-mesh")
  , csg         = require("../../csg.js");

$(document).ready(function() {
  //Create viewer
  var viewer = require("gl-shells").makeViewer({ cullCW: true });
 
 
  //Create a cylinder
  var cylinder = core.sampleSolid([-20, -20, -20], [20, 20, 20], function(x) {
      return Math.max(Math.abs(x[2]) - 15, Math.sqrt(x[0]*x[0] + x[1]*x[1]) - 5.5);
  });
 
  //Create a box
  var box = core.sampleSolid([-10, -10, -10], [10, 10, 10], function(x) {
    return Math.max(Math.abs(x[0]), Math.abs(x[1]), Math.abs(x[2])) - 7.0;
  });
  
  //Create a sphere
  var sphere = core.sampleSolid([-10,-10,-10], [10,10,10], function(x) {
    return Math.sqrt(x[0]*x[0]+x[1]*x[1]+x[2]*x[2]) - 8.0;
  });
  
  //Unite box with cylinder, subtract sphere
  var shape = csg.subtract(csg.unite(box, cylinder), sphere);
  
  
  //Draw initial mesh
  viewer.updateMesh(mesh(shape));
});