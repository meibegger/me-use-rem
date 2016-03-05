;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.meUseRem = factory();
  }
} (this, function() {
  'use strict';

  /**
   * me-use-rem - A utility script to track font-resize and convert values between px and rem
   *
   * @link https://github.com/meibegger/me-use-rem
   * @license MIT
   */

  var

  /*
   ---------------
   settings
   ---------------
   */

  // font-resize poll-interval in ms
    defaultIntervalTime = 200,

  /*
   ---------------
   variables
   ---------------
   */

  // grab the root element of the document
    docElement = document.documentElement,

  // save how many px 1 rem has
    remPx = -1,

  // remember the check-interval
    checkInterval = null
  ;

  /*
   ---------------
   functions
   ---------------
   */

  /**
   * Get the px value for 1rem
   * @returns {number}
   */
  function getRemPx () {
    return parseFloat(window.getComputedStyle(docElement).fontSize);
  }

  /**
   * Save the px value for 1rem
   * @param val
   */
  function setRemPx (val) {
    remPx = val || getRemPx();
  }

  /**
   * Initialize the interval checking for font-resize
   */
  function startCheckInterval (intervalTime) {
    checkInterval = setInterval(checkFontResize, intervalTime);
  }

  /**
   * Stop the interval checking for font-resize
   */
  function stopCheckInterval () {
    clearInterval(checkInterval);
    checkInterval = null;
  }

  /**
   * Check if the font has been resized
   */
  function checkFontResize () {
    var currentRemPx = getRemPx();

    if (currentRemPx !== remPx) { // font-size has changed

      // save the new value
      setRemPx(currentRemPx);

      // trigger a "resize" event
      if (document.createEvent) { // W3C conforming
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      }
      else { // IE
        var element = document.documentElement;
        var event = document.createEventObject();
        element.fireEvent("onresize",event);
      }
    }
  }

  /**
   * Convert px to rem
   * @param px
   * @returns {number}
   */
  function px2Rem (px) {
    if (!checkInterval) { // utility not initialized
      throw new Error('meFont');
    }
    return remPx ? px/remPx : -1;
  }

  /**
   * Convert rem to px
   * @param rem
   * @returns {number}
   */
  function rem2Px (rem) {
    return remPx ? rem*remPx : -1;
  }

  /**
   * Destroy the utility
   */
  function destroy () {
    stopCheckInterval();
  }

  /*
   ---------------
   initialization
   ---------------
   */

  function init(intervalTime) {
    if (!checkInterval) { // utility not initialized
      setRemPx();
      startCheckInterval(intervalTime || defaultIntervalTime);
    }
  }
  init();

  /*
   ---------------
   api
   ---------------
   */

  return {
    px2Rem: px2Rem,
    rem2Px: rem2Px,
    destroy: destroy,
    init: init
  };

}));
