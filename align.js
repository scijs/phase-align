"use strict"

var ndarray = require("ndarray")
var fft = require("ndarray-fft")
var pool = require("typedarray-pool")
var normalize = require("ndarray-normalize")
var nextPow2 = require("next-pow-2")
var ops = require("ndarray-ops")
var cops = require("ndarray-complex")

module.exports = function align(a, b, options) {
  if(a.shape.length !== b.shape.length) {
    throw new Error("Images must be the same dimensions!")
  }
  
  options = options || {}
  
  var d = a.shape.length
    , nshape = new Array(d)
    , nstride = new Array(d)
    , i, s = 1
    , normalized = "normalize" in options ? options.normalize : true
  
  for(i=0; i<d; ++i) {
    nshape[i] = nextPow2(a.shape[i] + b.shape[i] - 1)
    nstride[i] = s
    s *= nshape[i]
  }
  
  var ax_t = pool.mallocDouble(s)
    , ax = ndarray(ax_t, nshape, nstride, 0)
    , ay_t = pool.mallocDouble(s)
    , ay = ndarray(ay_t, nshape, nstride, 0)
    , bx_t = pool.mallocDouble(s)
    , bx = ndarray(bx_t, nshape, nstride, 0)
    , by_t = pool.mallocDouble(s)
    , by = ndarray(by_t, nshape, nstride, 0)
  
  ops.assigns(ax, 0)
  if(normalized && a.size > 1) {
    normalize(ax.hi.apply(ax, a.shape), a)
  } else {
    ops.assign(ax.hi.apply(ax, a.shape), a)
  }
  ops.assigns(ay, 0)
  fft(1, ax, ay)
  ops.negeq(ay)
  ops.assigns(bx, 0)
  if(normalized && b.size > 1) {
    normalize(bx.hi.apply(bx, b.shape), b)
  } else {
    ops.assign(bx.hi.apply(bx, b.shape), b)
  }
  ops.assigns(by, 0)
  fft(1, bx, by)
  cops.muleq(ax, ay, bx, by)
  fft(-1, ax, ay)
  
  var result = ops.argmax(ax)
  
  pool.freeDouble(ax_t)
  pool.freeDouble(ay_t)
  pool.freeDouble(bx_t)
  pool.freeDouble(by_t)
  
  for(i=0; i<d; ++i) {
    if(2*result[i] > nshape[i]) {
      result[i] -= nshape[i]
    }
  }
  
  return result
}