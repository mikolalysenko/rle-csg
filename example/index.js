var $           = require("jquery-browserify")
  , core        = require("rle-core")
  , mesh        = require("rle-mesh")
  , csg         = require("../../csg.js");

$(document).ready(function() {
  //Create viewer
  var viewer = require("gl-shells").makeViewer();
 
  //Create a box
  var box = core.sample([-10, -10, -10], [10, 10, 10], function(x) {
    if(Math.max.apply(null, x) < 5) {
      return 1;
    }
    return 0;
  });
  
  //Create a sphere
  function sphere_dist(x) {
    return Math.sqrt(x[0]*x[0]+x[1]*x[1]+x[2]*x[2]) - 5.5;
  }
  var sphere = core.sample([-6,-6,-6], [7,7,7], function(x) {
    if(sphere_dist(x) < 0) {
      return 1;
    }
    return 0;
  }, sphere_dist);

  //Subtract shapes
  var shape = csg.subtract(box, sphere);
  
  //Draw initial mesh
  viewer.updateMesh(mesh(shape));
});