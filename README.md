phase-align
===========
Aligns two [ndarrays](https://github.com/mikolalysenko/ndarray) up to a translation such that the sum of squared differences between them is minimized.  This can be used as a quick preprocess for other more detailed alignment algorithms.

[![build status](https://secure.travis-ci.org/scijs/phase-align.png)](http://tra
vis-ci.org/scijs/phase-align)

## Example

Here is a simple example showing how to use this code to image alignment.  First, let's start out with an image:

```javascript
var baboon = require("luminance")(require("baboon-image"))
```

<img src="https://raw.github.com/mikolalysenko/phase-align/master/example/baboon.png">

Next, let's cut out a patch:

```javascript
var patch = baboon.lo(222, 215).hi(80, 80)
```

Which looks like this:

<img src="https://raw.github.com/mikolalysenko/phase-align/master/example/patch.png">

Finally, we can use `phase-align` to find the patch in the original image like this:

```javascript
var position = require("phase-align")(patch, baboon)
console.log(position)
```

#### Output
The above prints out the coordinates of the upper left corner of the patch in the original:

```
[ 222, 215 ]
```

## Install
Install using [npm](https://www.npmjs.com/):

    npm install phase-align

## API
#### `require("phase-align")(patch, image[, options])`
Finds the pixel coordinates of the occurence of `patch` within the larger `image`

* `patch` is an ndarray to match
* `image` is the image to match within
* `options` is an object containing some optional parameters
  + `normalize` Default `true`.  If set, images are normalized for intensity before matching (except for images whose size is one).

**Returns** An array of coordinates representing the occurence of `patch` within image

## License
(c) 2013 Mikola Lysenko. MIT License