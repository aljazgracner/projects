// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9o7RF":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "0d141ee55cd97ae2";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"kVoUz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _navViewJs = require("./view/navView.js");
var _navViewJsDefault = parcelHelpers.interopDefault(_navViewJs);
var _ticTacToeViewJs = require("./view/ticTacToeView.js");
var _ticTacToeViewJsDefault = parcelHelpers.interopDefault(_ticTacToeViewJs);
var _ticTacModuleJs = require("./modules/ticTacModule.js");
var _ticTacModuleJsDefault = parcelHelpers.interopDefault(_ticTacModuleJs);
class Controller {
    playTicTac = this.playTicTacToe.bind(this);
    replayTicTac = this.replayTicTacToe.bind(this);
    playAgainTicTac = this.playAgainTicTacToe.bind(this);
    _loadTicTacStateWithWinner = this._loadTicTacToeStateWithWinner.bind(this);
    constructor(){
        _navViewJsDefault.default.addHoverEventHandlers(_navViewJsDefault.default.hoverFunction);
        _navViewJsDefault.default.addClickHandler(this.showContent.bind(this));
    }
    showContent() {
        _ticTacToeViewJsDefault.default.renderContent(_navViewJsDefault.default.clickedContent);
        _ticTacToeViewJsDefault.default.loadSave(_ticTacModuleJsDefault.default);
        if (_ticTacModuleJsDefault.default.winner) this._loadTicTacStateWithWinner();
        if (!_ticTacModuleJsDefault.default.winner) {
            _ticTacToeViewJsDefault.default.highlightActivePlayer(_ticTacModuleJsDefault.default.activePlayer);
            _ticTacToeViewJsDefault.default.addClickEventHandler(this.playTicTac);
        }
        _ticTacToeViewJsDefault.default.addHoverHandler(_ticTacToeViewJsDefault.default.hoverFunction);
    }
    playTicTacToe(clickedBox) {
        if (_ticTacToeViewJsDefault.default.checkIfBoxEmpty(clickedBox)) {
            _ticTacToeViewJsDefault.default.createMark(clickedBox, _ticTacModuleJsDefault.default.activePlayer);
            _ticTacModuleJsDefault.default.updateBoardState(clickedBox);
            _ticTacModuleJsDefault.default.changeActivePlayer();
            _ticTacModuleJsDefault.default.checkForWinner();
            if (_ticTacModuleJsDefault.default.winner) this._loadTicTacStateWithWinner();
            if (!_ticTacModuleJsDefault.default.winner) _ticTacToeViewJsDefault.default.highlightActivePlayer(_ticTacModuleJsDefault.default.activePlayer);
        }
    }
    _loadTicTacToeStateWithWinner() {
        _ticTacToeViewJsDefault.default.renderWinner(_ticTacModuleJsDefault.default.winner, _ticTacModuleJsDefault.default.winningNumbers);
        _ticTacToeViewJsDefault.default.removeClickEventHandler(this.playTicTac);
        _ticTacToeViewJsDefault.default.addReplayButtonHoverEvent(_ticTacToeViewJsDefault.default.replayButtonHoverFunction);
        _ticTacToeViewJsDefault.default.addReplayButtonClickEvent(this.replayTicTacToe);
        _ticTacToeViewJsDefault.default.addPlayAgainHoverEvent(_ticTacToeViewJsDefault.default.playAgainHoverFunction);
        _ticTacToeViewJsDefault.default.addPlayAgainClickEvent(this.playAgainTicTac);
    }
    replayTicTacToe() {
        _ticTacToeViewJsDefault.default.removeMarks(_ticTacModuleJsDefault.default.boardState[2]);
        _ticTacToeViewJsDefault.default.createMark(null, null, _ticTacModuleJsDefault.default.boardState[2], _ticTacModuleJsDefault.default.winningNumbers);
    }
    playAgainTicTacToe() {
        _ticTacToeViewJsDefault.default.removeMarks(_ticTacModuleJsDefault.default.boardState[2]);
        _ticTacToeViewJsDefault.default.highlightTicTacBoxOnOff(_ticTacModuleJsDefault.default.winningNumbers);
        _ticTacModuleJsDefault.default.resetGameState();
        _ticTacToeViewJsDefault.default.highlightActivePlayer(_ticTacModuleJsDefault.default.activePlayer);
        _ticTacToeViewJsDefault.default.addClickEventHandler(this.playTicTac);
        _ticTacToeViewJsDefault.default.removeButtons();
    }
}
const initialize = new Controller();

},{"./view/navView.js":"fmjHo","./view/ticTacToeView.js":"1pGiH","./modules/ticTacModule.js":"4MaQF","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fmjHo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class NavigationView {
    _navigation = document.querySelector(".menu");
    _allOptions = document.querySelectorAll(".nav-option");
    addHoverEventHandlers(fn) {
        [
            "mouseover",
            "mouseout"
        ].forEach((condition)=>{
            this._navigation.addEventListener(condition, function(e) {
                fn(e);
            });
        });
    }
    hoverFunction(e) {
        if (e.target.closest("div").classList.contains("menu-option")) {
            const navLink = e.target.closest("div");
            navLink.classList.toggle("mousehover");
            navLink.querySelector("i").classList.toggle("bx-tada");
        }
    }
    addClickHandler(fn1) {
        this._navigation.addEventListener("click", function(click) {
            fn1(click.target);
        });
    }
    checkClickedContent(clickEvent) {
        if (clickEvent.closest("menu-option") == "undefined") return;
        return clickEvent.closest(".menu-option").querySelector("span").textContent;
    }
}
exports.default = new NavigationView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1pGiH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _helpersJs = require("../helpers.js");
class TicTacToeView extends _viewJsDefault.default {
    _renderHTML() {
        const markup = `<div class="tic-tac-toe">
    <div class="tic-tac-box" id="1"></div>
    <div class="tic-tac-box" id="2"></div>
    <div class="tic-tac-box" id="3"></div>
    <div class="tic-tac-box" id="4"></div>
    <div class="tic-tac-box" id="5"></div>
    <div class="tic-tac-box" id="6"></div>
    <div class="tic-tac-box" id="7"></div>
    <div class="tic-tac-box" id="8"></div>
    <div class="tic-tac-box" id="9"></div>
</div>
<div class="tic-tac-player">
            <div class="tic-tac-player-box">
                <span class="player-1 player active-player">Player 1</span>
                <span class="player-2 player">Player 2</span>
                <span class="turn">Active turn</span>
            </div>
            <div class="tic-tac-player-box win-msg"></div>
            <div class="tic-tac-player-box play"></div>
           </div>
        `;
        this._contentContainer.insertAdjacentHTML("afterbegin", markup);
    }
    addClickEventHandler(fn) {
        const ticTacContainer = document.querySelector(".tic-tac-toe");
        ticTacContainer.addEventListener("click", fn, true);
    }
    removeClickEventHandler(fn1) {
        const ticTacContainer = document.querySelector(".tic-tac-toe");
        ticTacContainer.removeEventListener("click", fn1, true);
    }
    addHoverHandler(fn2) {
        [
            "mouseover",
            "mouseout"
        ].forEach((e1)=>document.querySelector(".tic-tac-toe").addEventListener(e1, function(e) {
                fn2(e);
            })
        );
    }
    hoverFunction(hover) {
        if (hover.target.closest("div").classList.contains("tic-tac-toe")) return;
        hover.target.closest("div").classList.toggle("mousehover");
    }
    checkIfBoxEmpty(clickedBox) {
        if (clickedBox.target.closest("div").classList.contains("tic-tac-toe")) return false;
        if (!clickedBox.target.closest("div").textContent == "") return false;
        return true;
    }
    removeMarks(replayArray) {
        [
            ...replayArray
        ].forEach((e)=>{
            document.getElementById(e).innerHTML = "";
        });
    }
    loadSave(save) {
        this.createMark(null, null, save.boardState[2], save.boxNumbers, false);
    }
    createMark(clickedBox1, activePlayer, replayArray1, boxNumbers, replay = true) {
        if (!replayArray1 && clickedBox1) clickedBox1.target.closest("div").insertAdjacentHTML("afterbegin", activePlayer);
        if (replayArray1) (async ()=>{
            boxNumbers && this.highlightTicTacBoxOnOff(boxNumbers);
            let crossCircle = "X";
            for (const x of replayArray1){
                replay && await _helpersJs.timeout(0.5);
                const box = document.getElementById(x);
                if (box.innerHTML == "") box.insertAdjacentHTML("afterbegin", crossCircle);
                crossCircle == "X" ? crossCircle = "O" : crossCircle = "X";
            }
            boxNumbers && this.highlightTicTacBoxOnOff(boxNumbers);
        })();
    }
    highlightActivePlayer(player) {
        const player1 = document.querySelector(".player-1");
        const player2 = document.querySelector(".player-2");
        if (player == "X") {
            player1.classList.add("active-player");
            player2.classList.remove("active-player");
        } else {
            player1.classList.remove("active-player");
            player2.classList.add("active-player");
        }
    }
    highlightTicTacBoxOnOff(boxNumbers1) {
        [
            ...boxNumbers1
        ].forEach((number)=>{
            document.getElementById(number).classList.toggle("win-color");
        });
    }
    renderWinner(player1, boxNumbers2) {
        const markup = `<span class="win-message">${player1} wins!</span>
    <a href=#>
                        <div class="watch-replay">
                            Watch replay here
                        </div>
                    </a>`;
        document.querySelector(".win-msg").insertAdjacentHTML("afterbegin", markup);
        const playAgainmarkup = ` <a href=#>
    <div class="play-again">
        Play again?
    </div>
</a>`;
        document.querySelector(".play").insertAdjacentHTML("afterbegin", playAgainmarkup);
        this.highlightTicTacBoxOnOff(boxNumbers2);
    }
    addReplayButtonHoverEvent(fn3) {
        const button = document.querySelector(".watch-replay");
        [
            "mouseout",
            "mouseover"
        ].forEach((e)=>{
            button.addEventListener(e, fn3);
        });
    }
    removeReplayButtonHoverEvent(fn4) {
        const button = document.querySelector(".watch-replay");
        [
            "mouseout",
            "mouseover"
        ].forEach((e)=>{
            button.removeEventListener(e, fn4);
        });
    }
    replayButtonHoverFunction(event) {
        event.target.closest(".watch-replay").classList.toggle("replay-hover");
    }
    addReplayButtonClickEvent(fn5) {
        const button = document.querySelector(".watch-replay");
        button.addEventListener("click", fn5);
    }
    addPlayAgainHoverEvent(fn6) {
        const button = document.querySelector(".play-again");
        [
            "mouseout",
            "mouseover"
        ].forEach((e)=>{
            button.addEventListener(e, fn6);
        });
    }
    removePlayAgainHoverEvent(fn7) {
        const button = document.querySelector(".play-again");
        [
            "mouseout",
            "mouseover"
        ].forEach((e)=>{
            button.removeEventListener(e, fn7);
        });
    }
    playAgainHoverFunction(event1) {
        event1.target.closest(".play-again").classList.toggle("replay-hover");
    }
    addPlayAgainClickEvent(fn8) {
        const button = document.querySelector(".play-again");
        button.addEventListener("click", fn8);
    }
    removeButtons() {
        const replayButton = document.querySelector(".win-msg");
        const playAgainButton = document.querySelector(".play");
        [
            replayButton,
            playAgainButton
        ].forEach((e)=>{
            e.innerHTML = "";
        });
    }
}
exports.default = new TicTacToeView();

},{"../helpers.js":"l5Gvl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./view.js":"6RF1J"}],"l5Gvl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeout", ()=>timeout
);
const timeout = async function(seconds) {
    await new Promise((resolve)=>setTimeout(resolve, seconds * 1000)
    );
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6RF1J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class View {
    _contentContainer = document.querySelector(".content-container");
    renderContent(clickedOption) {
        this._clearContentView();
        this._renderHTML();
    }
    _clearContentView() {
        this._contentContainer.innerHTML = "";
    }
}
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4MaQF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Module {
    activePlayer = "X";
    winner;
    winningNumbers = "";
    boardState = [
        [],
        [],
        []
    ];
    resetGameState() {
        this.winner = "";
        this.boardState = [
            [],
            [],
            []
        ];
        this.activePlayer = "X";
        this.winningNumbers = "";
    }
    checkForWinner() {
        const winningCombos = [
            [
                1,
                2,
                3
            ],
            [
                4,
                5,
                6
            ],
            [
                7,
                8,
                9
            ],
            [
                1,
                4,
                7
            ],
            [
                2,
                5,
                8
            ],
            [
                3,
                6,
                9
            ],
            [
                1,
                5,
                9
            ],
            [
                3,
                5,
                7
            ], 
        ];
        winningCombos.forEach((winningNumbers)=>{
            if (winningNumbers.every((number)=>this.boardState[0].includes(number)
            )) {
                this.winningNumbers = new Set([
                    ...this.winningNumbers,
                    ...winningNumbers, 
                ]);
                this.winner = "Player 1";
            }
            if (winningNumbers.every((number)=>this.boardState[1].includes(number)
            )) {
                this.winningNumbers = new Set([
                    ...this.winningNumbers,
                    ...winningNumbers, 
                ]);
                this.winner = "Player 2";
            }
            if (this.boardState[2].length == 9 && !this.winner) this.winner = "Nobody";
        });
    }
    changeActivePlayer() {
        this.activePlayer == "X" ? this.activePlayer = "O" : this.activePlayer = "X";
    }
    updateBoardState(clickedBox) {
        const boxNumber = clickedBox.target.closest("div").getAttribute("id");
        this.activePlayer == "X" ? this.boardState[0].push(Number(boxNumber)) : this.boardState[1].push(Number(boxNumber));
        this.boardState[2].push(Number(boxNumber));
    }
}
const ticTacModule = new Module();
exports.default = ticTacModule;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["9o7RF","kVoUz"], "kVoUz", "parcelRequire4d78")

//# sourceMappingURL=index.5cd97ae2.js.map
