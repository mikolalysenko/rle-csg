var $           = require("jquery-browserify")
  , core        = require("rle-core")
  , mesh        = require("rle-mesh")
  , csg         = require("../../csg.js");

$(document).ready(function() {
  //Create viewer
  var viewer = require("gl-shells").makeViewer();
 
  //Create a box
  var box = core.sampleSolid([-10, -10, -10], [10, 10, 10], function(x) {
    return Math.max(Math.abs(x[0]), Math.abs(x[1]), Math.abs(x[2])) - 7.0;
  });
  
  //Create a sphere
  var sphere = core.sampleSolid([-10,-10,-10], [10,10,10], function(x) {
    return Math.sqrt(x[0]*x[0]+x[1]*x[1]+x[2]*x[2]) - 7.5;
  });
  
  var bigsphere = core.sampleSolid([-20,-20,-20], [20,20,20], function(x) {
    return Math.sqrt(x[0]*x[0]+x[1]*x[1]+x[2]*x[2]) - 10.0;
  });

  //Subtract shapes
  var shape = csg.intersect(box, bigsphere);
  
  //Draw initial mesh
  viewer.updateMesh(mesh(shape));
});