var align = require("../align.js")
var ndarray = require("ndarray")

require("tape")("phase-align", function(t) {
  var p1 = ndarray([0,1,0])
    , p2 = ndarray([0.5,1,0.5])
    , p3 = ndarray([1])
    , im = ndarray([0,0,0,0,0,0,1,0,0,0,0])
    
  t.deepEqual(align(p1, im), [5])
  t.deepEqual(align(p1, im, {normalize: false}), [5])
    
  t.deepEqual(align(p2, im), [5])
  t.deepEqual(align(p2, im, {normalize: false}), [5])
    
  t.deepEqual(align(p3, im), [6])
  t.deepEqual(align(p3, im, {normalize: false}), [6])

  t.end()
})