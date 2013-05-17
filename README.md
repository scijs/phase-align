phase-align
===========
Aligns two [ndarrays](https://github.com/mikolalysenko/ndarray) up to a translation such that the sum of squared differences between them is minimized.  This can be used as a quick preprocess for other more detailed alignment algorithms.

## Example

Here is a simple example showing how to use this code to image alignment.  First, let's start out with an image:

```javascript
var lena = require("luminance")(require("lena"))
```

<img src="https://raw.github.com/mikolalysenko/phase-align/master/example/lena.png">

Next, let's cut out a patch:

```javascript
var patch = lena.lo(222, 215).hi(80, 80)
```

Which looks like this:

<img src="https://raw.github.com/mikolalysenko/phase-align/master/example/patch.png">

Finally, we can use `phase-align` to find the patch in the original image like this:

```javascript
var position = require("phase-align")(patch, lena)
console.log(position)
```

Which prints out the coordinates of the upper left corner fo the patch in the original:

```
[ 222, 215 ]
```

## Install

```
npm install phase-align
```

## `require("phase-align")(patch, image[, options])`
Finds the pixel coordinates of the occurence of `patch` within the larger `image`

* `patch` is an ndarray to match
* `image` is the image to match within
* `options` is an object containing some optional parameters
  + `normalize` Default `true`.  If set, images are normalized for intensity before matching.

**Returns** An array of coordinates representing the occurence of `patch` within image

# Credits
(c) 2013 Mikola Lysenko. MIT License