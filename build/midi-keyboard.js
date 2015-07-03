(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MIDIKeyboard = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _CONTROL_CHANGES, _extends$parseMessage;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _xtend = require("xtend");

var _xtend2 = _interopRequireDefault(_xtend);

var CONTROL_CHANGES = (_CONTROL_CHANGES = {}, _defineProperty(_CONTROL_CHANGES, 0x01, "modulation"), _defineProperty(_CONTROL_CHANGES, 0x07, "volume"), _defineProperty(_CONTROL_CHANGES, 0x0a, "pan"), _defineProperty(_CONTROL_CHANGES, 0x0b, "expression"), _defineProperty(_CONTROL_CHANGES, 0x40, "sustain"), _CONTROL_CHANGES);

function parseMessage(st, d1, d2) {
  var messageType = st & 0xf0;
  var value = Math.max(0, Math.min(d2, 127));
  var channel = Math.max(0, Math.min(st & 0x0f, 15));

  // note off
  if (messageType === 0x80) {
    return { dataType: "noteOff", noteNumber: d1, velocity: value, channel: channel };
  }

  // note on
  if (messageType === 0x90) {
    if (value === 0) {
      return { dataType: "noteOff", noteNumber: d1, velocity: value, channel: channel };
    }
    return { dataType: "noteOn", noteNumber: d1, velocity: value, channel: channel };
  }

  // control change
  if (messageType === 0xb0) {
    if (CONTROL_CHANGES.hasOwnProperty(d1)) {
      return { dataType: CONTROL_CHANGES[d1], value: value, channel: channel };
    }
  }

  // pitch bend
  if (messageType === 0xe0) {
    var pitchBendValue = d2 * 128 + d1 - 8192;

    return { dataType: "pitchbend", value: pitchBendValue, channel: channel };
  }

  return null;
}

function _extends(MIDIDevice) {
  return (function (_MIDIDevice) {
    function LaunchControl() {
      var _this = this;

      var deviceName = arguments[0] === undefined ? "Keystation Mini 32" : arguments[0];

      _classCallCheck(this, LaunchControl);

      _get(Object.getPrototypeOf(LaunchControl.prototype), "constructor", this).call(this, deviceName);

      this._onmidimessage = function (e) {
        var msg = parseMessage(e.data[0], e.data[1], e.data[2]);

        if (msg === null) {
          return;
        }

        _this.emit("message", (0, _xtend2["default"])({ type: "message", deviceName: _this.deviceName }, msg));
      };
    }

    _inherits(LaunchControl, _MIDIDevice);

    return LaunchControl;
  })(MIDIDevice);
}

exports["default"] = (_extends$parseMessage = {}, _defineProperty(_extends$parseMessage, "extends", _extends), _defineProperty(_extends$parseMessage, "parseMessage", parseMessage), _extends$parseMessage);
module.exports = exports["default"];
},{"xtend":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoMidiDeviceWebmidi = require("@mohayonao/midi-device/webmidi");

var _mohayonaoMidiDeviceWebmidi2 = _interopRequireDefault(_mohayonaoMidiDeviceWebmidi);

var _MIDIKeyboard = require("./MIDIKeyboard");

var _MIDIKeyboard2 = _interopRequireDefault(_MIDIKeyboard);

exports["default"] = _MIDIKeyboard2["default"]["extends"](_mohayonaoMidiDeviceWebmidi2["default"]);
module.exports = exports["default"];
},{"./MIDIKeyboard":1,"@mohayonao/midi-device/webmidi":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require("events");

exports["default"] = _events.EventEmitter;
module.exports = exports["default"];
},{"events":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitter2 = require("./EventEmitter");

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var MIDIDevice = (function (_EventEmitter) {
  function MIDIDevice(deviceName) {
    _classCallCheck(this, MIDIDevice);

    _get(Object.getPrototypeOf(MIDIDevice.prototype), "constructor", this).call(this);

    this._input = null;
    this._output = null;
    this._deviceName = deviceName;
  }

  _inherits(MIDIDevice, _EventEmitter);

  _createClass(MIDIDevice, [{
    key: "open",
    value: function open() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }, {
    key: "close",
    value: function close() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }, {
    key: "send",
    value: function send() {
      throw new Error("subclass responsibility");
    }
  }, {
    key: "_onmidimessage",
    value: function _onmidimessage() {}
  }, {
    key: "deviceName",
    get: function get() {
      return this._deviceName;
    }
  }], [{
    key: "requestDeviceNames",
    value: function requestDeviceNames() {
      return Promise.reject(new Error("subclass responsibility"));
    }
  }]);

  return MIDIDevice;
})(_EventEmitter3["default"]);

exports["default"] = MIDIDevice;
module.exports = exports["default"];
},{"./EventEmitter":3}],5:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MIDIDevice2 = require("./MIDIDevice");

var _MIDIDevice3 = _interopRequireDefault(_MIDIDevice2);

function findMIDIPortByName(iter, deviceName) {
  for (var x = iter.next(); !x.done; x = iter.next()) {
    if (x.value.name === deviceName) {
      return x.value;
    }
  }

  return null;
}

function collectDeviceNames(iter) {
  var result = [];

  for (var x = iter.next(); !x.done; x = iter.next()) {
    result.push(x.value.name);
  }

  return result;
}

var WebMIDIDevice = (function (_MIDIDevice) {
  function WebMIDIDevice() {
    _classCallCheck(this, WebMIDIDevice);

    _get(Object.getPrototypeOf(WebMIDIDevice.prototype), "constructor", this).apply(this, arguments);
  }

  _inherits(WebMIDIDevice, _MIDIDevice);

  _createClass(WebMIDIDevice, [{
    key: "open",
    value: function open() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!global.navigator || typeof global.navigator.requestMIDIAccess !== "function") {
          return reject(new TypeError("Web MIDI API is not supported"));
        }

        if (_this._input !== null || _this._output !== null) {
          return reject(new TypeError(_this.deviceName + " has already been opened"));
        }

        var successCallback = function successCallback(access) {
          _this._access = access;

          var input = findMIDIPortByName(access.inputs.values(), _this.deviceName);
          var output = findMIDIPortByName(access.outputs.values(), _this.deviceName);

          if (input === null && output === null) {
            return reject(new TypeError(_this.deviceName + " is not found"));
          }

          if (input !== null) {
            _this._input = input;

            input.onmidimessage = function (e) {
              _this._onmidimessage(e);
            };
          }

          if (output !== null) {
            _this._output = output;
          }

          return Promise.all([_this._input && _this._input.open(), _this._output && _this._output.open()]).then(resolve, reject);
        };

        if (_this._access) {
          return successCallback(_this._access);
        }

        return global.navigator.requestMIDIAccess().then(successCallback, reject);
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2._input === null && _this2._output === null) {
          return reject(new TypeError(_this2.deviceName + " has already been closed"));
        }

        var input = _this2._input;
        var output = _this2._output;

        _this2._input = null;
        _this2._output = null;

        return Promise.all([input && input.close(), output && output.close()]).then(resolve, reject);
      });
    }
  }, {
    key: "send",
    value: function send(data) {
      if (this._output !== null) {
        this._output.send(data);
      }
    }
  }], [{
    key: "requestDeviceNames",
    value: function requestDeviceNames() {
      return new Promise(function (resolve, reject) {
        if (!global.navigator || typeof global.navigator.requestMIDIAccess !== "function") {
          return reject(new TypeError("Web MIDI API is not supported"));
        }

        return global.navigator.requestMIDIAccess().then(function (access) {
          var inputDeviceNames = collectDeviceNames(access.inputs.values());
          var outputDeviceNames = collectDeviceNames(access.outputs.values());

          resolve({
            inputs: inputDeviceNames,
            outputs: outputDeviceNames
          });
        }, reject);
      });
    }
  }]);

  return WebMIDIDevice;
})(_MIDIDevice3["default"]);

exports["default"] = WebMIDIDevice;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./MIDIDevice":4}],6:[function(require,module,exports){
module.exports = require("./lib/WebMIDIDevice");

},{"./lib/WebMIDIDevice":5}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],8:[function(require,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],9:[function(require,module,exports){
module.exports = require("./lib/WebMIDIKeyboard");

},{"./lib/WebMIDIKeyboard":2}]},{},[9])(9)
});