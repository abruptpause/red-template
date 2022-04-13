!(function (e) {
  const t = {}

  function n (o) {
    if (t[o]) return t[o].exports
    const i = (t[o] = {
      i: o,
      l: !1,
      exports: {}
    })
    return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
  }
  ;(n.m = e),
  (n.c = t),
  (n.d = function (e, t, o) {
    n.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: o
        })
  }),
  (n.r = function (e) {
    typeof Symbol !== 'undefined' &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: 'Module'
        }),
    Object.defineProperty(e, '__esModule', {
      value: !0
    })
  }),
  (n.t = function (e, t) {
    if ((1 & t && (e = n(e)), 8 & t)) return e
    if (4 & t && typeof e === 'object' && e && e.__esModule) return e
    const o = Object.create(null)
    if (
      (n.r(o),
      Object.defineProperty(o, 'default', {
        enumerable: !0,
        value: e
      }),
      2 & t && typeof e !== 'string')
    ) {
      for (const i in e) {
        n.d(
          o,
          i,
          function (t) {
            return e[t]
          }.bind(null, i)
        )
      }
    }
    return o
  }),
  (n.n = function (e) {
    const t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
            return e
          }
    return n.d(t, 'a', t), t
  }),
  (n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }),
  (n.p = ''),
  n((n.s = 298))
})({
  298: function (e, t, n) {
    'use strict'
    n.r(t)
    const o = n(8)
    const i = n.n(o)
    const r = n(9)
    const a = n.n(r)
    const s = (function () {
      function e () {
        i()(this, e),
        (this.loaderActive = !1),
        (this.readyToStart = !1),
        (this.loaded = {
          javascript: !1,
          styles: !1
        }),
        (this.cookieName = 'loader_seen'),
        (this.elements = {
          html: !1,
          loaderEl: !1,
          loaderBg: !1,
          logoRed: !1,
          logoC: !1
        }),
        (this.animatingOut = !1),
        (this.startLoader = this.startLoader.bind(this)),
        (this.setJsLoaded = this.setLoaded.bind(this, 'javascript')),
        (this.setStylesLoaded = this.setLoaded.bind(this, 'styles'))
      }
      return (
        a()(e, [
          {
            key: '_animateInLoader',
            value: function () {
              this.elements.logoRed.classList.add('visible'),
              this.elements.logoC.classList.add('visible')
            }
          },
          {
            key: '_checkEverythingLoaded',
            value: function () {
              if (!this.readyToStart || !this.loaded.javascript || !this.loaded.styles) {
                return !1
              }
              this.elements.html &&
                (this.animatingOut ||
                  ((this.animatingOut = !0),
                  this.elements.html.classList.remove('noScroll'),
                  this._animateOutLoader()))
            }
          },
          {
            key: '_animateOutLoader',
            value: function () {
              const e = this
              const t =
                (window.innerWidth > 768 ? 0.02 : 0.04) * window.innerWidth +
                this.elements.logoRed.getBoundingClientRect().width / 2
              const n = {
                y: window.innerHeight / 2 - t,
                x: window.innerWidth / 2 - t
              }
              ;(this.elements.logoRed.style.transform = 'translate3d( -'
                .concat(n.x, 'px, -')
                .concat(n.y, 'px, 0 )')),
              (this.elements.logoC.style.transform = 'translate3d( '
                .concat(n.x, 'px, ')
                .concat(n.y - 8, 'px, 0 )')),
              this.elements.loaderBg.classList.add('animateOut'),
              setTimeout(function () {
                e.elements.loaderEl.remove(),
                window.__BIA_SHOW_LOGO__
                  ? window.__BIA_SHOW_LOGO__()
                  : (window.__BIA_SHOW_LOGO__ = !0)
              }, 1200)
            }
          },
          {
            key: '_getSafariVersion',
            value: function (e) {
              if (e.indexOf('safari') > -1) {
                const t = parseInt(
                  e.substr(e.indexOf('version/') + 'version/'.length).substr(0, 2)
                )
                if (t) return [t]
              }
              if (/iP(hone|od|ad)/.test(navigator.platform)) {
                const n = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                return [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3] || 0, 10)]
              }
              return !1
            }
          },
          {
            key: '_loadAditionalStyling',
            value: function () {
              const e = document.createElement('link')
              ;(e.href = window.BIA_STYLE_URL),
              (e.type = 'text/css'),
              (e.rel = 'stylesheet'),
              (e.media = 'screen,print'),
              e.addEventListener('load', this.setStylesLoaded, !0),
              document.querySelector('head').appendChild(e)
            }
          },
          {
            key: '_initServiceWorker',
            value: function () {
              if (!('serviceWorker' in navigator)) return !1
              let e = '/serviceWorker.js'
              ;(e += '?js='.concat(encodeURIComponent(window.BIA_SRC_FILES.js))),
              (e += '&css='.concat(encodeURIComponent(window.BIA_SRC_FILES.css))),
              navigator.serviceWorker
                .register(e)
                .then(
                  function (e) {
                    console.log('ServiceWorker registration successful with scope: ', e.scope)
                  },
                  function (e) {
                    console.log('ServiceWorker registration failed: ', e)
                  }
                )
                .catch(function (e) {
                  console.log(e)
                })
            }
          },
          {
            key: 'startLoader',
            value: function () {
              const e = this
              if (!this.loaderActive) {
                ;(this.loaderActive = !0), this._initServiceWorker()
                const t = navigator.userAgent.toLowerCase()
                const n = this._getSafariVersion(t)
                ;(t.indexOf('firefox') > -1 ||
                  t.indexOf('msie ') > -1 ||
                  t.indexOf('trident/') > -1 ||
                  t.indexOf('edge') > -1 ||
                  (n && n[0] <= 11)) &&
                  this._loadAditionalStyling(),
                (this.elements = {
                  html: document.querySelector('html'),
                  loaderEl: document.querySelector('.bia_preloader'),
                  loaderBg: document.querySelector('.bia_background'),
                  logoRed: document.querySelector('.bia_logo_red'),
                  logoC: document.querySelector('.bia_logo_c')
                }),
                this.elements.html.classList.add('noScroll'),
                this._animateInLoader(),
                setTimeout(function () {
                  ;(e.readyToStart = !0), e._checkEverythingLoaded()
                }, 1400)
              }
            }
          },
          {
            key: 'setLoaded',
            value: function () {
              const e =
                arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'javascript'
              this.loaded[e] || ((this.loaded[e] = !0), this._checkEverythingLoaded())
            }
          }
        ]),
        e
      )
    })()
    window.BIA_LOADER = new s()
    const d = document.querySelector('.bia_styleLoader')
    d && d.addEventListener('load', window.BIA_LOADER.setStylesLoaded),
    document.addEventListener('DOMContentLoaded', window.BIA_LOADER.startLoader, !0)
  },
  8: function (e, t) {
    ;(e.exports = function (e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
    }),
    (e.exports.default = e.exports),
    (e.exports.__esModule = !0)
  },
  9: function (e, t) {
    function n (e, t) {
      for (let n = 0; n < t.length; n++) {
        const o = t[n]
        ;(o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        'value' in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o)
      }
    }
    ;(e.exports = function (e, t, o) {
      return t && n(e.prototype, t), o && n(e, o), e
    }),
    (e.exports.default = e.exports),
    (e.exports.__esModule = !0)
  }
})

window.__BIA_VERSION__ = 'undefined'
window.__ENV__ = 'production'
window.__title__ = 'REDC'
window.__BAREBONES__ = '0'
window.__CDN__ = '../static.red-company.nl/'
window.BIA_STATIC_ASSET_URL = '../static.red-company.nl/static'
window.BIA_STYLE_URL = '../static.red-company.nl/static/css/style.c428efcd56e5dab901c6.min.css'
// window..DSN = "https://216f279775a84b469edd9b688275f78f@sentry.io/1495121";
window.BIA_SRC_FILES = {
  js: '../static.red-company.nl/static/js/bundle.c428efcd56e5dab901c6.min.js',
  css: '../static.red-company.nl/static/css/style.c428efcd56e5dab901c6.min.css'
}
window.HOT = ''
