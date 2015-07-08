var fs = require("fs")
var savePixels = require("save-pixels")
var baboon = require("luminance")(require("baboon-image"))
var patch = baboon.lo(222, 215).hi(80, 80)

savePixels(baboon, "png").pipe(fs.createWriteStream(__dirname + "/baboon.png"))
savePixels(patch, "png").pipe(fs.createWriteStream(__dirname + "/patch.png"))

var position = require("../align.js")(patch, baboon)
console.log(position)
