var lena = require("luminance")(require("lena"))
var patch = lena.lo(222, 215).hi(80, 80)
console.log(require("../align.js")(patch, lena))
