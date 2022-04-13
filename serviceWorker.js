/******/
;(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/
  const installedModules = {}
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__ (moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    const module = (installedModules[moduleId] = {
      /******/
      i: moduleId,
      /******/
      l: false,
      /******/
      exports: {}
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    /******/
    /******/ // Flag the module as loaded
    /******/
    module.l = true
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/
  __webpack_require__.m = modules
  /******/
  /******/ // expose the module cache
  /******/
  __webpack_require__.c = installedModules
  /******/
  /******/ // define getter function for harmony exports
  /******/
  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  }
  /******/
  /******/ // define __esModule on exports
  /******/
  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/
    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    /******/
  }
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/
  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value)
    /******/
    if (mode & 8) return value
    /******/
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value
    /******/
    const ns = Object.create(null)
    /******/
    __webpack_require__.r(ns)
    /******/
    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/
    if (mode & 2 && typeof value !== 'string') {
      for (const key in value) {
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key]
          }.bind(null, key)
        )
      }
    }
    /******/
    return ns
    /******/
  }
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/
  __webpack_require__.n = function (module) {
    /******/
    const getter =
      module && module.__esModule
        ? /******/
        function getDefault () {
          return module.default
        }
        : /******/
        function getModuleExports () {
          return module
        }
    /******/
    __webpack_require__.d(getter, 'a', getter)
    /******/
    return getter
    /******/
  }
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }
  /******/
  /******/ // __webpack_public_path__
  /******/
  __webpack_require__.p = ''
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/
  return __webpack_require__((__webpack_require__.s = './src/service-worker.js'))
  /******/
})(
  /************************************************************************/
  /******/
  {
    /***/
    './src/service-worker.js':
      /*! *******************************!*\
          !*** ./src/service-worker.js ***!
          \*******************************/
      /*! no static exports found */
      /***/
      function (module, exports) {
        eval(
          '/*\n * Root file for the service worker\n * Runs in a different thread as the client.js\n */\nvar doCache = true;\nvar CACHE_NAME = "bia-cache-v1"; // TODO: Show promt later\n// let deferredPrompt = false\n\n/* @todo Investigatethe use of globals: `self` and `location` */\n\nself.addEventListener("activate", function (event) {\n  var cacheWhitelist = [CACHE_NAME];\n  event.waitUntil(caches.keys().then(function (keyList) {\n    return Promise.all(keyList.map(function (key) {\n      if (!cacheWhitelist.includes(key)) {\n        /* eslint-disable no-console */\n        console.log("Deleting cache: ".concat(key));\n        /* eslint-enable no-console */\n\n        return caches["delete"](key);\n      }\n\n      return false;\n    }));\n  }));\n});\nself.addEventListener("install", function (event) {\n  var pathToJs = new URL(location).searchParams.get("js");\n  var pathToCss = new URL(location).searchParams.get("css");\n  if (!doCache) return;\n  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {\n    fetch("/manifest.json").then(function (response) {\n      return response.json();\n    }).then(function () {\n      var urlsToCache = ["/html", pathToJs, pathToCss];\n      cache.addAll(urlsToCache);\n    });\n  }));\n});\nself.addEventListener("fetch", function (event) {\n  if (!doCache) return;\n  event.respondWith(caches.match(event.request).then(function (response) {\n    if (response) return response;\n    return fetch(event.request).then(function (response) {\n      if (response.status === 404) {\n        return caches.match("/html");\n      }\n\n      return response;\n    });\n  })["catch"](function () {\n    return (// If both fail, show a generic fallback:\n      caches.match("/html")\n    );\n  }));\n});\nself.addEventListener("beforeinstallprompt", function (e) {\n  // Prevent Chrome 67 and earlier from automatically showing the prompt\n  e.preventDefault(); // Stash the event so it can be triggered later.\n  // deferredPrompt = e\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZS13b3JrZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS13b3JrZXIuanM/NDMxNCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogUm9vdCBmaWxlIGZvciB0aGUgc2VydmljZSB3b3JrZXJcbiAqIFJ1bnMgaW4gYSBkaWZmZXJlbnQgdGhyZWFkIGFzIHRoZSBjbGllbnQuanNcbiAqL1xuY29uc3QgZG9DYWNoZSA9IHRydWVcbmNvbnN0IENBQ0hFX05BTUUgPSBgYmlhLWNhY2hlLXYxYFxuLy8gVE9ETzogU2hvdyBwcm9tdCBsYXRlclxuLy8gbGV0IGRlZmVycmVkUHJvbXB0ID0gZmFsc2VcblxuLyogQHRvZG8gSW52ZXN0aWdhdGV0aGUgdXNlIG9mIGdsb2JhbHM6IGBzZWxmYCBhbmQgYGxvY2F0aW9uYCAqL1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoYGFjdGl2YXRlYCwgZXZlbnQgPT4ge1xuICAgIGNvbnN0IGNhY2hlV2hpdGVsaXN0ID0gW0NBQ0hFX05BTUUsXVxuICAgIGV2ZW50LndhaXRVbnRpbChcbiAgICAgICAgY2FjaGVzLmtleXMoKS50aGVuKGtleUxpc3QgPT5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIGtleUxpc3QubWFwKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FjaGVXaGl0ZWxpc3QuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERlbGV0aW5nIGNhY2hlOiAke2tleX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZShrZXkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIClcbn0pXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihgaW5zdGFsbGAsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBwYXRoVG9KcyA9IG5ldyBVUkwobG9jYXRpb24pLnNlYXJjaFBhcmFtcy5nZXQoYGpzYClcbiAgICBjb25zdCBwYXRoVG9Dc3MgPSBuZXcgVVJMKGxvY2F0aW9uKS5zZWFyY2hQYXJhbXMuZ2V0KGBjc3NgKVxuXG4gICAgaWYgKCFkb0NhY2hlKSByZXR1cm5cblxuICAgIGV2ZW50LndhaXRVbnRpbChcbiAgICAgICAgY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihjYWNoZSA9PiB7XG4gICAgICAgICAgICBmZXRjaChgL21hbmlmZXN0Lmpzb25gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybHNUb0NhY2hlID0gW2AvaHRtbGAsIHBhdGhUb0pzLCBwYXRoVG9Dc3MsXVxuXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmFkZEFsbCh1cmxzVG9DYWNoZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIClcbn0pXG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihgZmV0Y2hgLCBldmVudCA9PiB7XG4gICAgaWYgKCFkb0NhY2hlKSByZXR1cm5cblxuICAgIGV2ZW50LnJlc3BvbmRXaXRoKFxuICAgICAgICBjYWNoZXNcbiAgICAgICAgICAgIC5tYXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXMubWF0Y2goYC9odG1sYClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PlxuICAgICAgICAgICAgICAgIC8vIElmIGJvdGggZmFpbCwgc2hvdyBhIGdlbmVyaWMgZmFsbGJhY2s6XG4gICAgICAgICAgICAgICAgY2FjaGVzLm1hdGNoKGAvaHRtbGApXG4gICAgICAgICAgICApXG4gICAgKVxufSlcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKGBiZWZvcmVpbnN0YWxscHJvbXB0YCwgZSA9PiB7XG4gICAgLy8gUHJldmVudCBDaHJvbWUgNjcgYW5kIGVhcmxpZXIgZnJvbSBhdXRvbWF0aWNhbGx5IHNob3dpbmcgdGhlIHByb21wdFxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIFN0YXNoIHRoZSBldmVudCBzbyBpdCBjYW4gYmUgdHJpZ2dlcmVkIGxhdGVyLlxuICAgIC8vIGRlZmVycmVkUHJvbXB0ID0gZVxufSlcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBVkE7QUFjQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUZBO0FBQUE7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/service-worker.js\n'
        )

        /***/
      }

    /******/
  }
)
