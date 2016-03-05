# meUseRem #

meUseRem is a small utility script to to track font-resize and convert values between px and rem.

A `resize` event is triggered when the user resizes the font-size of the browser.

## Usage ##

### 1. Include the JavaScript ###
#### Minified version ####
Include `me-use-rem.min.js` included in the `dist` folder in your HTML page.

#### Source version ####
You can find the original JavaScript file in the `src` folder of this package.

#### AMD ####
meUseRem has AMD support. This allows it to be lazy-loaded with an AMD loader, such as RequireJS.

### 2. Use meUseRem ###
Convert px to rem:

```javascript
meUseRem.px2rem(PX-VALUE);
```

Convert rem to px:

```javascript
meUseRem.rem2px(REM-VALUE);
```

Remove the utility

```javascript
meUseRem.destroy();
```

Re-initialize the utility

```javascript
meUseRem.init(POLL_INTERVAL); // POLL_INTERVAL int optional; time between font-size-change polls in ms; default is 200
```

## Package managers ##
You can install meUseRem using npm or Bower.

```
$ npm install me-use-rem
```

or

```
$ bower install me-use-rem
```

## License ##
meUseRem is licenses under the [MIT licence](https://opensource.org/licenses/MIT).