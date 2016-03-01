/**
 * Realization of jQuery.ready (v2.2) with pure JavaScript
 * @author: Jerry Zou
 * @email: jerry.zry@outlook.com
 */

var readyList = []
  , isReady = false

function DOMReady(fn) {
  if (isReady) fn()
  else readyList.push(fn)
}

function ready() {
  isReady = true
  readyList.forEach(function(fn) { fn() })
}

function completed() {
  document.removeEventListener('DOMContentLoaded', completed)
  window.removeEventListener('load', completed)
  ready()
}

(function init() {
  if (document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll) ) {
    setTimeout(ready, 0)
  } else {
    document.addEventListener('DOMContentLoaded', completed)
    window.addEventListener('load', completed)
  }
}())