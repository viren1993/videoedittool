var Tl = Object.defineProperty;
var xl = (i, t, e) => t in i ? Tl(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var x = (i, t, e) => xl(i, typeof t != "symbol" ? t + "" : t, e);
import { dispatch as Qt } from "@designcombo/events";
function y(i, t, e) {
  return (t = function(s) {
    var r = function(n, o) {
      if (typeof n != "object" || !n) return n;
      var a = n[Symbol.toPrimitive];
      if (a !== void 0) {
        var c = a.call(n, o);
        if (typeof c != "object") return c;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (o === "string" ? String : Number)(n);
    }(s, "string");
    return typeof r == "symbol" ? r : r + "";
  }(t)) in i ? Object.defineProperty(i, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : i[t] = e, i;
}
function Qn(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(r) {
      return Object.getOwnPropertyDescriptor(i, r).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function v(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qn(Object(e), !0).forEach(function(s) {
      y(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Qn(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
function H(i, t) {
  if (i == null) return {};
  var e, s, r = function(o, a) {
    if (o == null) return {};
    var c = {};
    for (var h in o) if ({}.hasOwnProperty.call(o, h)) {
      if (a.indexOf(h) >= 0) continue;
      c[h] = o[h];
    }
    return c;
  }(i, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(i);
    for (s = 0; s < n.length; s++) e = n[s], t.indexOf(e) >= 0 || {}.propertyIsEnumerable.call(i, e) && (r[e] = i[e]);
  }
  return r;
}
function Se(i, t) {
  return t || (t = i.slice(0)), Object.freeze(Object.defineProperties(i, { raw: { value: Object.freeze(t) } }));
}
class to {
  constructor() {
    y(this, "browserShadowBlurConstant", 1), y(this, "DPI", 96), y(this, "devicePixelRatio", typeof window < "u" ? window.devicePixelRatio : 1), y(this, "perfLimitSizeTotal", 2097152), y(this, "maxCacheSideLimit", 4096), y(this, "minCacheSideLimit", 256), y(this, "disableStyleCopyPaste", !1), y(this, "enableGLFiltering", !0), y(this, "textureSize", 4096), y(this, "forceGLPutImageData", !1), y(this, "cachesBoundsOfCurve", !1), y(this, "fontPaths", {}), y(this, "NUM_FRACTION_DIGITS", 4);
  }
}
const E = new class extends to {
  constructor(i) {
    super(), this.configure(i);
  }
  configure() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.assign(this, i);
  }
  addFonts() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fontPaths = v(v({}, this.fontPaths), i);
  }
  removeFonts() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((i) => {
      delete this.fontPaths[i];
    });
  }
  clearFonts() {
    this.fontPaths = {};
  }
  restoreDefaults(i) {
    const t = new to(), e = (i == null ? void 0 : i.reduce((s, r) => (s[r] = t[r], s), {})) || t;
    this.configure(e);
  }
}(), ve = function(i) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return console[i]("fabric", ...e);
};
class Wt extends Error {
  constructor(t, e) {
    super("fabric: ".concat(t), e);
  }
}
class Ta extends Wt {
  constructor(t) {
    super("".concat(t, " 'options.signal' is in 'aborted' state"));
  }
}
class wl {
}
class Sl extends wl {
  testPrecision(t, e) {
    const s = "precision ".concat(e, ` float;
void main(){}`), r = t.createShader(t.FRAGMENT_SHADER);
    return !!r && (t.shaderSource(r, s), t.compileShader(r), !!t.getShaderParameter(r, t.COMPILE_STATUS));
  }
  queryWebGL(t) {
    const e = t.getContext("webgl");
    e && (this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE), this.GLPrecision = ["highp", "mediump", "lowp"].find((s) => this.testPrecision(e, s)), e.getExtension("WEBGL_lose_context").loseContext(), ve("log", "WebGL: max texture size ".concat(this.maxTextureSize)));
  }
  isSupported(t) {
    return !!this.maxTextureSize && this.maxTextureSize >= t;
  }
}
const Cl = {};
let eo;
const Ht = () => eo || (eo = { document, window, isTouchSupported: "ontouchstart" in window || "ontouchstart" in document || window && window.navigator && window.navigator.maxTouchPoints > 0, WebGLProbe: new Sl(), dispose() {
}, copyPasteData: Cl }), gs = () => Ht().document, Qr = () => Ht().window, xa = () => {
  var i;
  return Math.max((i = E.devicePixelRatio) !== null && i !== void 0 ? i : Qr().devicePixelRatio, 1);
}, Ms = new class {
  constructor() {
    y(this, "charWidthsCache", {}), y(this, "boundsOfCurveCache", {});
  }
  getFontCache(i) {
    let { fontFamily: t, fontStyle: e, fontWeight: s } = i;
    t = t.toLowerCase(), this.charWidthsCache[t] || (this.charWidthsCache[t] = {});
    const r = this.charWidthsCache[t], n = "".concat(e.toLowerCase(), "_").concat((s + "").toLowerCase());
    return r[n] || (r[n] = {}), r[n];
  }
  clearFontCache(i) {
    (i = (i || "").toLowerCase()) ? this.charWidthsCache[i] && delete this.charWidthsCache[i] : this.charWidthsCache = {};
  }
  limitDimsByArea(i) {
    const { perfLimitSizeTotal: t } = E, e = Math.sqrt(t * i);
    return [Math.floor(e), Math.floor(t / e)];
  }
}(), Hi = "6.6.1";
function Ae() {
}
const ye = Math.PI / 2, oe = 2 * Math.PI, yn = Math.PI / 180, lt = Object.freeze([1, 0, 0, 1, 0, 0]), bn = 16, ge = 0.4477152502, j = "center", A = "left", gt = "top", Yi = "bottom", K = "right", ft = "none", _n = /\r?\n/, wa = "moving", ti = "scaling", Sa = "rotating", Tn = "rotate", Ca = "skewing", Ls = "resizing", Oa = "modifyPoly", Ol = "modifyPath", Fr = "changed", ei = "scale", ut = "scaleX", bt = "scaleY", fs = "skewX", ps = "skewY", st = "fill", pt = "stroke", Lr = "modified", $e = "json", xi = "svg", O = new class {
  constructor() {
    this[$e] = /* @__PURE__ */ new Map(), this[xi] = /* @__PURE__ */ new Map();
  }
  has(i) {
    return this[$e].has(i);
  }
  getClass(i) {
    const t = this[$e].get(i);
    if (!t) throw new Wt("No class registered for ".concat(i));
    return t;
  }
  setClass(i, t) {
    t ? this[$e].set(t, i) : (this[$e].set(i.type, i), this[$e].set(i.type.toLowerCase(), i));
  }
  getSVGClass(i) {
    return this[xi].get(i);
  }
  setSVGClass(i, t) {
    this[xi].set(t ?? i.type.toLowerCase(), i);
  }
}(), Br = new class extends Array {
  remove(i) {
    const t = this.indexOf(i);
    t > -1 && this.splice(t, 1);
  }
  cancelAll() {
    const i = this.splice(0);
    return i.forEach((t) => t.abort()), i;
  }
  cancelByCanvas(i) {
    if (!i) return [];
    const t = this.filter((e) => {
      var s;
      return e.target === i || typeof e.target == "object" && ((s = e.target) === null || s === void 0 ? void 0 : s.canvas) === i;
    });
    return t.forEach((e) => e.abort()), t;
  }
  cancelByTarget(i) {
    if (!i) return [];
    const t = this.filter((e) => e.target === i);
    return t.forEach((e) => e.abort()), t;
  }
}();
class kl {
  constructor() {
    y(this, "__eventListeners", {});
  }
  on(t, e) {
    if (this.__eventListeners || (this.__eventListeners = {}), typeof t == "object") return Object.entries(t).forEach((s) => {
      let [r, n] = s;
      this.on(r, n);
    }), () => this.off(t);
    if (e) {
      const s = t;
      return this.__eventListeners[s] || (this.__eventListeners[s] = []), this.__eventListeners[s].push(e), () => this.off(s, e);
    }
    return () => !1;
  }
  once(t, e) {
    if (typeof t == "object") {
      const s = [];
      return Object.entries(t).forEach((r) => {
        let [n, o] = r;
        s.push(this.once(n, o));
      }), () => s.forEach((r) => r());
    }
    if (e) {
      const s = this.on(t, function() {
        for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
        e.call(this, ...n), s();
      });
      return s;
    }
    return () => !1;
  }
  _removeEventListener(t, e) {
    if (this.__eventListeners[t]) if (e) {
      const s = this.__eventListeners[t], r = s.indexOf(e);
      r > -1 && s.splice(r, 1);
    } else this.__eventListeners[t] = [];
  }
  off(t, e) {
    if (this.__eventListeners) if (t === void 0) for (const s in this.__eventListeners) this._removeEventListener(s);
    else typeof t == "object" ? Object.entries(t).forEach((s) => {
      let [r, n] = s;
      this._removeEventListener(r, n);
    }) : this._removeEventListener(t, e);
  }
  fire(t, e) {
    var s;
    if (!this.__eventListeners) return;
    const r = (s = this.__eventListeners[t]) === null || s === void 0 ? void 0 : s.concat();
    if (r) for (let n = 0; n < r.length; n++) r[n].call(this, e || {});
  }
}
const Me = (i, t) => {
  const e = i.indexOf(t);
  return e !== -1 && i.splice(e, 1), i;
}, Pt = (i) => {
  if (i === 0) return 1;
  switch (Math.abs(i) / ye) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(i);
}, At = (i) => {
  if (i === 0) return 0;
  const t = i / ye, e = Math.sign(i);
  switch (t) {
    case 1:
      return e;
    case 2:
      return 0;
    case 3:
      return -e;
  }
  return Math.sin(i);
};
class _ {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    typeof t == "object" ? (this.x = t.x, this.y = t.y) : (this.x = t, this.y = e);
  }
  add(t) {
    return new _(this.x + t.x, this.y + t.y);
  }
  addEquals(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  scalarAdd(t) {
    return new _(this.x + t, this.y + t);
  }
  scalarAddEquals(t) {
    return this.x += t, this.y += t, this;
  }
  subtract(t) {
    return new _(this.x - t.x, this.y - t.y);
  }
  subtractEquals(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  scalarSubtract(t) {
    return new _(this.x - t, this.y - t);
  }
  scalarSubtractEquals(t) {
    return this.x -= t, this.y -= t, this;
  }
  multiply(t) {
    return new _(this.x * t.x, this.y * t.y);
  }
  scalarMultiply(t) {
    return new _(this.x * t, this.y * t);
  }
  scalarMultiplyEquals(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return new _(this.x / t.x, this.y / t.y);
  }
  scalarDivide(t) {
    return new _(this.x / t, this.y / t);
  }
  scalarDivideEquals(t) {
    return this.x /= t, this.y /= t, this;
  }
  eq(t) {
    return this.x === t.x && this.y === t.y;
  }
  lt(t) {
    return this.x < t.x && this.y < t.y;
  }
  lte(t) {
    return this.x <= t.x && this.y <= t.y;
  }
  gt(t) {
    return this.x > t.x && this.y > t.y;
  }
  gte(t) {
    return this.x >= t.x && this.y >= t.y;
  }
  lerp(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
    return e = Math.max(Math.min(1, e), 0), new _(this.x + (t.x - this.x) * e, this.y + (t.y - this.y) * e);
  }
  distanceFrom(t) {
    const e = this.x - t.x, s = this.y - t.y;
    return Math.sqrt(e * e + s * s);
  }
  midPointFrom(t) {
    return this.lerp(t);
  }
  min(t) {
    return new _(Math.min(this.x, t.x), Math.min(this.y, t.y));
  }
  max(t) {
    return new _(Math.max(this.x, t.x), Math.max(this.y, t.y));
  }
  toString() {
    return "".concat(this.x, ",").concat(this.y);
  }
  setXY(t, e) {
    return this.x = t, this.y = e, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setFromPoint(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  swap(t) {
    const e = this.x, s = this.y;
    this.x = t.x, this.y = t.y, t.x = e, t.y = s;
  }
  clone() {
    return new _(this.x, this.y);
  }
  rotate(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : xn;
    const s = At(t), r = Pt(t), n = this.subtract(e);
    return new _(n.x * r - n.y * s, n.x * s + n.y * r).add(e);
  }
  transform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    return new _(t[0] * this.x + t[2] * this.y + (e ? 0 : t[4]), t[1] * this.x + t[3] * this.y + (e ? 0 : t[5]));
  }
}
const xn = new _(0, 0), Er = (i) => !!i && Array.isArray(i._objects);
function ka(i) {
  class t extends i {
    constructor() {
      super(...arguments), y(this, "_objects", []);
    }
    _onObjectAdded(s) {
    }
    _onObjectRemoved(s) {
    }
    _onStackOrderChanged(s) {
    }
    add() {
      for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
      const o = this._objects.push(...r);
      return r.forEach((a) => this._onObjectAdded(a)), o;
    }
    insertAt(s) {
      for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
      return this._objects.splice(s, 0, ...n), n.forEach((a) => this._onObjectAdded(a)), this._objects.length;
    }
    remove() {
      const s = this._objects, r = [];
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) o[a] = arguments[a];
      return o.forEach((c) => {
        const h = s.indexOf(c);
        h !== -1 && (s.splice(h, 1), r.push(c), this._onObjectRemoved(c));
      }), r;
    }
    forEachObject(s) {
      this.getObjects().forEach((r, n, o) => s(r, n, o));
    }
    getObjects() {
      for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
      return r.length === 0 ? [...this._objects] : this._objects.filter((o) => o.isType(...r));
    }
    item(s) {
      return this._objects[s];
    }
    isEmpty() {
      return this._objects.length === 0;
    }
    size() {
      return this._objects.length;
    }
    contains(s, r) {
      return !!this._objects.includes(s) || !!r && this._objects.some((n) => n instanceof t && n.contains(s, !0));
    }
    complexity() {
      return this._objects.reduce((s, r) => s += r.complexity ? r.complexity() : 0, 0);
    }
    sendObjectToBack(s) {
      return !(!s || s === this._objects[0]) && (Me(this._objects, s), this._objects.unshift(s), this._onStackOrderChanged(s), !0);
    }
    bringObjectToFront(s) {
      return !(!s || s === this._objects[this._objects.length - 1]) && (Me(this._objects, s), this._objects.push(s), this._onStackOrderChanged(s), !0);
    }
    sendObjectBackwards(s, r) {
      if (!s) return !1;
      const n = this._objects.indexOf(s);
      if (n !== 0) {
        const o = this.findNewLowerIndex(s, n, r);
        return Me(this._objects, s), this._objects.splice(o, 0, s), this._onStackOrderChanged(s), !0;
      }
      return !1;
    }
    bringObjectForward(s, r) {
      if (!s) return !1;
      const n = this._objects.indexOf(s);
      if (n !== this._objects.length - 1) {
        const o = this.findNewUpperIndex(s, n, r);
        return Me(this._objects, s), this._objects.splice(o, 0, s), this._onStackOrderChanged(s), !0;
      }
      return !1;
    }
    moveObjectTo(s, r) {
      return s !== this._objects[r] && (Me(this._objects, s), this._objects.splice(r, 0, s), this._onStackOrderChanged(s), !0);
    }
    findNewLowerIndex(s, r, n) {
      let o;
      if (n) {
        o = r;
        for (let a = r - 1; a >= 0; --a) if (s.isOverlapping(this._objects[a])) {
          o = a;
          break;
        }
      } else o = r - 1;
      return o;
    }
    findNewUpperIndex(s, r, n) {
      let o;
      if (n) {
        o = r;
        for (let a = r + 1; a < this._objects.length; ++a) if (s.isOverlapping(this._objects[a])) {
          o = a;
          break;
        }
      } else o = r + 1;
      return o;
    }
    collectObjects(s) {
      let { left: r, top: n, width: o, height: a } = s, { includeIntersecting: c = !0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const h = [], l = new _(r, n), u = l.add(new _(o, a));
      for (let d = this._objects.length - 1; d >= 0; d--) {
        const g = this._objects[d];
        g.selectable && g.visible && (c && g.intersectsWithRect(l, u) || g.isContainedWithinRect(l, u) || c && g.containsPoint(l) || c && g.containsPoint(u)) && h.push(g);
      }
      return h;
    }
  }
  return t;
}
class Ma extends kl {
  _setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for (const e in t) this.set(e, t[e]);
  }
  _setObject(t) {
    for (const e in t) this._set(e, t[e]);
  }
  set(t, e) {
    return typeof t == "object" ? this._setObject(t) : this._set(t, e), this;
  }
  _set(t, e) {
    this[t] = e;
  }
  toggle(t) {
    const e = this.get(t);
    return typeof e == "boolean" && this.set(t, !e), this;
  }
  get(t) {
    return this[t];
  }
}
function Ds(i) {
  return Qr().requestAnimationFrame(i);
}
function Da(i) {
  return Qr().cancelAnimationFrame(i);
}
let Ml = 0;
const be = () => Ml++, St = () => {
  const i = gs().createElement("canvas");
  if (!i || i.getContext === void 0) throw new Wt("Failed to create `canvas` element");
  return i;
}, ja = () => gs().createElement("img"), Rt = (i) => {
  const t = St();
  return t.width = i.width, t.height = i.height, t;
}, wn = (i, t, e) => i.toDataURL("image/".concat(t), e), Sn = (i, t, e) => new Promise((s, r) => {
  i.toBlob(s, "image/".concat(t), e);
}), U = (i) => i * yn, _e = (i) => i / yn, Ia = (i) => i.every((t, e) => t === lt[e]), at = (i, t, e) => new _(i).transform(t, e), yt = (i) => {
  const t = 1 / (i[0] * i[3] - i[1] * i[2]), e = [t * i[3], -t * i[1], -t * i[2], t * i[0], 0, 0], { x: s, y: r } = new _(i[4], i[5]).transform(e, !0);
  return e[4] = -s, e[5] = -r, e;
}, $ = (i, t, e) => [i[0] * t[0] + i[2] * t[1], i[1] * t[0] + i[3] * t[1], i[0] * t[2] + i[2] * t[3], i[1] * t[2] + i[3] * t[3], e ? 0 : i[0] * t[4] + i[2] * t[5] + i[4], e ? 0 : i[1] * t[4] + i[3] * t[5] + i[5]], si = (i, t) => i.reduceRight((e, s) => s && e ? $(s, e, t) : s || e, void 0) || lt.concat(), Ea = (i) => {
  let [t, e] = i;
  return Math.atan2(e, t);
}, hs = (i) => {
  const t = Ea(i), e = Math.pow(i[0], 2) + Math.pow(i[1], 2), s = Math.sqrt(e), r = (i[0] * i[3] - i[2] * i[1]) / s, n = Math.atan2(i[0] * i[2] + i[1] * i[3], e);
  return { angle: _e(t), scaleX: s, scaleY: r, skewX: _e(n), skewY: 0, translateX: i[4] || 0, translateY: i[5] || 0 };
}, ms = function(i) {
  return [1, 0, 0, 1, i, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0];
};
function vs() {
  let { angle: i = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, { x: t = 0, y: e = 0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const s = U(i), r = Pt(s), n = At(s);
  return [r, n, -n, r, t ? t - (r * t - n * e) : 0, e ? e - (n * t + r * e) : 0];
}
const ri = function(i) {
  return [i, 0, 0, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : i, 0, 0];
}, Pa = (i) => Math.tan(U(i)), Cn = (i) => [1, 0, Pa(i), 1, 0, 0], On = (i) => [1, Pa(i), 0, 1, 0, 0], $s = (i) => {
  let { scaleX: t = 1, scaleY: e = 1, flipX: s = !1, flipY: r = !1, skewX: n = 0, skewY: o = 0 } = i, a = ri(s ? -t : t, r ? -e : e);
  return n && (a = $(a, Cn(n), !0)), o && (a = $(a, On(o), !0)), a;
}, Aa = (i) => {
  const { translateX: t = 0, translateY: e = 0, angle: s = 0 } = i;
  let r = ms(t, e);
  s && (r = $(r, vs({ angle: s })));
  const n = $s(i);
  return Ia(n) || (r = $(r, n)), r;
}, js = function(i) {
  let { signal: t, crossOrigin: e = null } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise(function(s, r) {
    if (t && t.aborted) return r(new Ta("loadImage"));
    const n = ja();
    let o;
    t && (o = function(c) {
      n.src = "", r(c);
    }, t.addEventListener("abort", o, { once: !0 }));
    const a = function() {
      n.onload = n.onerror = null, o && (t == null || t.removeEventListener("abort", o)), s(n);
    };
    i ? (n.onload = a, n.onerror = function() {
      o && (t == null || t.removeEventListener("abort", o)), r(new Wt("Error loading ".concat(n.src)));
    }, e && (n.crossOrigin = e), n.src = i) : a();
  });
}, ls = function(i) {
  let { signal: t, reviver: e = Ae } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((s, r) => {
    const n = [];
    t && t.addEventListener("abort", r, { once: !0 }), Promise.all(i.map((o) => O.getClass(o.type).fromObject(o, { signal: t }).then((a) => (e(o, a), n.push(a), a)))).then(s).catch((o) => {
      n.forEach((a) => {
        a.dispose && a.dispose();
      }), r(o);
    }).finally(() => {
      t && t.removeEventListener("abort", r);
    });
  });
}, qs = function(i) {
  let { signal: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new Promise((e, s) => {
    const r = [];
    t && t.addEventListener("abort", s, { once: !0 });
    const n = Object.values(i).map((a) => a && a.type && O.has(a.type) ? ls([a], { signal: t }).then((c) => {
      let [h] = c;
      return r.push(h), h;
    }) : a), o = Object.keys(i);
    Promise.all(n).then((a) => a.reduce((c, h, l) => (c[o[l]] = h, c), {})).then(e).catch((a) => {
      r.forEach((c) => {
        c.dispose && c.dispose();
      }), s(a);
    }).finally(() => {
      t && t.removeEventListener("abort", s);
    });
  });
}, He = function(i) {
  return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []).reduce((t, e) => (e in i && (t[e] = i[e]), t), {});
}, kn = (i, t) => Object.keys(i).reduce((e, s) => (t(i[s], s, i) && (e[s] = i[s]), e), {}), so = { aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#0FF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000", blanchedalmond: "#FFEBCD", blue: "#00F", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#0FF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgrey: "#A9A9A9", darkgreen: "#006400", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#F0F", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#ADFF2F", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgrey: "#D3D3D3", lightgreen: "#90EE90", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#789", lightslategrey: "#789", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#0F0", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#F0F", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#639", red: "#F00", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFF", whitesmoke: "#F5F5F5", yellow: "#FF0", yellowgreen: "#9ACD32" }, wi = (i, t, e) => (e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + 6 * (t - i) * e : e < 0.5 ? t : e < 2 / 3 ? i + (t - i) * (2 / 3 - e) * 6 : i), ro = (i, t, e, s) => {
  i /= 255, t /= 255, e /= 255;
  const r = Math.max(i, t, e), n = Math.min(i, t, e);
  let o, a;
  const c = (r + n) / 2;
  if (r === n) o = a = 0;
  else {
    const h = r - n;
    switch (a = c > 0.5 ? h / (2 - r - n) : h / (r + n), r) {
      case i:
        o = (t - e) / h + (t < e ? 6 : 0);
        break;
      case t:
        o = (e - i) / h + 2;
        break;
      case e:
        o = (i - t) / h + 4;
    }
    o /= 6;
  }
  return [Math.round(360 * o), Math.round(100 * a), Math.round(100 * c), s];
}, io = function() {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "1";
  return parseFloat(i) / (i.endsWith("%") ? 100 : 1);
}, nr = (i) => Math.min(Math.round(i), 255).toString(16).toUpperCase().padStart(2, "0"), no = (i) => {
  let [t, e, s, r = 1] = i;
  const n = Math.round(0.3 * t + 0.59 * e + 0.11 * s);
  return [n, n, n, r];
};
class F {
  constructor(t) {
    if (y(this, "isUnrecognised", !1), t) if (t instanceof F) this.setSource([...t._source]);
    else if (Array.isArray(t)) {
      const [e, s, r, n = 1] = t;
      this.setSource([e, s, r, n]);
    } else this.setSource(this._tryParsingColor(t));
    else this.setSource([0, 0, 0, 1]);
  }
  _tryParsingColor(t) {
    return (t = t.toLowerCase()) in so && (t = so[t]), t === "transparent" ? [255, 255, 255, 0] : F.sourceFromHex(t) || F.sourceFromRgb(t) || F.sourceFromHsl(t) || (this.isUnrecognised = !0) && [0, 0, 0, 1];
  }
  getSource() {
    return this._source;
  }
  setSource(t) {
    this._source = t;
  }
  toRgb() {
    const [t, e, s] = this.getSource();
    return "rgb(".concat(t, ",").concat(e, ",").concat(s, ")");
  }
  toRgba() {
    return "rgba(".concat(this.getSource().join(","), ")");
  }
  toHsl() {
    const [t, e, s] = ro(...this.getSource());
    return "hsl(".concat(t, ",").concat(e, "%,").concat(s, "%)");
  }
  toHsla() {
    const [t, e, s, r] = ro(...this.getSource());
    return "hsla(".concat(t, ",").concat(e, "%,").concat(s, "%,").concat(r, ")");
  }
  toHex() {
    return this.toHexa().slice(0, 6);
  }
  toHexa() {
    const [t, e, s, r] = this.getSource();
    return "".concat(nr(t)).concat(nr(e)).concat(nr(s)).concat(nr(Math.round(255 * r)));
  }
  getAlpha() {
    return this.getSource()[3];
  }
  setAlpha(t) {
    return this._source[3] = t, this;
  }
  toGrayscale() {
    return this.setSource(no(this.getSource())), this;
  }
  toBlackWhite(t) {
    const [e, , , s] = no(this.getSource()), r = e < (t || 127) ? 0 : 255;
    return this.setSource([r, r, r, s]), this;
  }
  overlayWith(t) {
    t instanceof F || (t = new F(t));
    const e = this.getSource(), s = t.getSource(), [r, n, o] = e.map((a, c) => Math.round(0.5 * a + 0.5 * s[c]));
    return this.setSource([r, n, o, e[3]]), this;
  }
  static fromRgb(t) {
    return F.fromRgba(t);
  }
  static fromRgba(t) {
    return new F(F.sourceFromRgb(t));
  }
  static sourceFromRgb(t) {
    const e = t.match(/^rgba?\(\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d{0,3}(?:\.\d+)?%?)\s*)?\)$/i);
    if (e) {
      const [s, r, n] = e.slice(1, 4).map((o) => {
        const a = parseFloat(o);
        return o.endsWith("%") ? Math.round(2.55 * a) : a;
      });
      return [s, r, n, io(e[4])];
    }
  }
  static fromHsl(t) {
    return F.fromHsla(t);
  }
  static fromHsla(t) {
    return new F(F.sourceFromHsl(t));
  }
  static sourceFromHsl(t) {
    const e = t.match(/^hsla?\(\s*([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d*(?:\.\d+)?%?)\s*)?\)$/i);
    if (!e) return;
    const s = (F.parseAngletoDegrees(e[1]) % 360 + 360) % 360 / 360, r = parseFloat(e[2]) / 100, n = parseFloat(e[3]) / 100;
    let o, a, c;
    if (r === 0) o = a = c = n;
    else {
      const h = n <= 0.5 ? n * (r + 1) : n + r - n * r, l = 2 * n - h;
      o = wi(l, h, s + 1 / 3), a = wi(l, h, s), c = wi(l, h, s - 1 / 3);
    }
    return [Math.round(255 * o), Math.round(255 * a), Math.round(255 * c), io(e[4])];
  }
  static fromHex(t) {
    return new F(F.sourceFromHex(t));
  }
  static sourceFromHex(t) {
    if (t.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e = t.slice(t.indexOf("#") + 1);
      let s;
      s = e.length <= 4 ? e.split("").map((c) => c + c) : e.match(/.{2}/g);
      const [r, n, o, a = 255] = s.map((c) => parseInt(c, 16));
      return [r, n, o, a / 255];
    }
  }
  static parseAngletoDegrees(t) {
    const e = t.toLowerCase(), s = parseFloat(e);
    return e.includes("rad") ? _e(s) : e.includes("turn") ? 360 * s : s;
  }
}
const z = (i, t) => parseFloat(Number(i).toFixed(t)), Re = function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bn;
  const e = /\D{0,2}$/.exec(i), s = parseFloat(i), r = E.DPI;
  switch (e == null ? void 0 : e[0]) {
    case "mm":
      return s * r / 25.4;
    case "cm":
      return s * r / 2.54;
    case "in":
      return s * r;
    case "pt":
      return s * r / 72;
    case "pc":
      return s * r / 72 * 12;
    case "em":
      return s * t;
    default:
      return s;
  }
}, Ra = (i) => {
  const [t, e] = i.trim().split(" "), [s, r] = (n = t) && n !== ft ? [n.slice(1, 4), n.slice(5, 8)] : n === ft ? [n, n] : ["Mid", "Mid"];
  var n;
  return { meetOrSlice: e || "meet", alignX: s, alignY: r };
}, Bs = (i) => "matrix(" + i.map((t) => z(t, E.NUM_FRACTION_DIGITS)).join(" ") + ")", Ws = function(i, t) {
  let e, s, r = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
  if (t) if (t.toLive) e = "url(#SVGID_".concat(t.id, ")");
  else {
    const n = new F(t), o = n.getAlpha();
    e = n.toRgb(), o !== 1 && (s = o.toString());
  }
  else e = "none";
  return r ? "".concat(i, ": ").concat(e, "; ").concat(s ? "".concat(i, "-opacity: ").concat(s, "; ") : "") : "".concat(i, '="').concat(e, '" ').concat(s ? "".concat(i, '-opacity="').concat(s, '" ') : "");
}, xt = (i) => !!i && i.toLive !== void 0, oo = (i) => !!i && typeof i.toObject == "function", ao = (i) => !!i && i.offsetX !== void 0 && "source" in i, De = (i) => !!i && "multiSelectionStacking" in i;
function Fa(i) {
  const t = i && jt(i);
  let e = 0, s = 0;
  if (!i || !t) return { left: e, top: s };
  let r = i;
  const n = t.documentElement, o = t.body || { scrollLeft: 0, scrollTop: 0 };
  for (; r && (r.parentNode || r.host) && (r = r.parentNode || r.host, r === t ? (e = o.scrollLeft || n.scrollLeft || 0, s = o.scrollTop || n.scrollTop || 0) : (e += r.scrollLeft || 0, s += r.scrollTop || 0), r.nodeType !== 1 || r.style.position !== "fixed"); ) ;
  return { left: e, top: s };
}
const jt = (i) => i.ownerDocument || null, La = (i) => {
  var t;
  return ((t = i.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView) || null;
}, Ba = function(i, t, e) {
  let { width: s, height: r } = e, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  i.width = s, i.height = r, n > 1 && (i.setAttribute("width", (s * n).toString()), i.setAttribute("height", (r * n).toString()), t.scale(n, n));
}, Vi = (i, t) => {
  let { width: e, height: s } = t;
  e && (i.style.width = typeof e == "number" ? "".concat(e, "px") : e), s && (i.style.height = typeof s == "number" ? "".concat(s, "px") : s);
};
function co(i) {
  return i.onselectstart !== void 0 && (i.onselectstart = () => !1), i.style.userSelect = ft, i;
}
class Wa {
  constructor(t) {
    y(this, "_originalCanvasStyle", void 0), y(this, "lower", void 0);
    const e = this.createLowerCanvas(t);
    this.lower = { el: e, ctx: e.getContext("2d") };
  }
  createLowerCanvas(t) {
    const e = (s = t) && s.getContext !== void 0 ? t : t && gs().getElementById(t) || St();
    var s;
    if (e.hasAttribute("data-fabric")) throw new Wt("Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?");
    return this._originalCanvasStyle = e.style.cssText, e.setAttribute("data-fabric", "main"), e.classList.add("lower-canvas"), e;
  }
  cleanupDOM(t) {
    let { width: e, height: s } = t;
    const { el: r } = this.lower;
    r.classList.remove("lower-canvas"), r.removeAttribute("data-fabric"), r.setAttribute("width", "".concat(e)), r.setAttribute("height", "".concat(s)), r.style.cssText = this._originalCanvasStyle || "", this._originalCanvasStyle = void 0;
  }
  setDimensions(t, e) {
    const { el: s, ctx: r } = this.lower;
    Ba(s, r, t, e);
  }
  setCSSDimensions(t) {
    Vi(this.lower.el, t);
  }
  calcOffset() {
    return function(t) {
      var e;
      const s = t && jt(t), r = { left: 0, top: 0 };
      if (!s) return r;
      const n = ((e = La(t)) === null || e === void 0 ? void 0 : e.getComputedStyle(t, null)) || {};
      r.left += parseInt(n.borderLeftWidth, 10) || 0, r.top += parseInt(n.borderTopWidth, 10) || 0, r.left += parseInt(n.paddingLeft, 10) || 0, r.top += parseInt(n.paddingTop, 10) || 0;
      let o = { left: 0, top: 0 };
      const a = s.documentElement;
      t.getBoundingClientRect !== void 0 && (o = t.getBoundingClientRect());
      const c = Fa(t);
      return { left: o.left + c.left - (a.clientLeft || 0) + r.left, top: o.top + c.top - (a.clientTop || 0) + r.top };
    }(this.lower.el);
  }
  dispose() {
    Ht().dispose(this.lower.el), delete this.lower;
  }
}
const Dl = { backgroundVpt: !0, backgroundColor: "", overlayVpt: !0, overlayColor: "", includeDefaultValues: !0, svgViewportTransformation: !0, renderOnAddRemove: !0, skipOffscreen: !0, enableRetinaScaling: !0, imageSmoothingEnabled: !0, controlsAboveOverlay: !1, allowTouchScrolling: !1, viewportTransform: [...lt] };
class Ks extends ka(Ma) {
  get lowerCanvasEl() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.el;
  }
  get contextContainer() {
    var t;
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.ctx;
  }
  static getDefaults() {
    return Ks.ownDefaults;
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, this.constructor.getDefaults()), this.set(e), this.initElements(t), this._setDimensionsImpl({ width: this.width || this.elements.lower.el.width || 0, height: this.height || this.elements.lower.el.height || 0 }), this.skipControlsDrawing = !1, this.viewportTransform = [...this.viewportTransform], this.calcViewportBoundaries();
  }
  initElements(t) {
    this.elements = new Wa(t);
  }
  add() {
    const t = super.add(...arguments);
    return arguments.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) s[r - 1] = arguments[r];
    const n = super.insertAt(t, ...s);
    return s.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), n;
  }
  remove() {
    const t = super.remove(...arguments);
    return t.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t;
  }
  _onObjectAdded(t) {
    t.canvas && t.canvas !== this && (ve("warn", `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`), t.canvas.remove(t)), t._set("canvas", this), t.setCoords(), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t) {
    t._set("canvas", void 0), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll();
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? xa() : 1;
  }
  calcOffset() {
    return this._offset = this.elements.calcOffset();
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setWidth(t, e) {
    return this.setDimensions({ width: t }, e);
  }
  setHeight(t, e) {
    return this.setDimensions({ height: t }, e);
  }
  _setDimensionsImpl(t) {
    let { cssOnly: e = !1, backstoreOnly: s = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!e) {
      const r = v({ width: this.width, height: this.height }, t);
      this.elements.setDimensions(r, this.getRetinaScaling()), this.hasLostContext = !0, this.width = r.width, this.height = r.height;
    }
    s || this.elements.setCSSDimensions(t), this.calcOffset();
  }
  setDimensions(t, e) {
    this._setDimensionsImpl(t, e), e && e.cssOnly || this.requestRenderAll();
  }
  getZoom() {
    return this.viewportTransform[0];
  }
  setViewportTransform(t) {
    this.viewportTransform = t, this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll();
  }
  zoomToPoint(t, e) {
    const s = t, r = [...this.viewportTransform], n = at(t, yt(r));
    r[0] = e, r[3] = e;
    const o = at(n, r);
    r[4] += s.x - o.x, r[5] += s.y - o.y, this.setViewportTransform(r);
  }
  setZoom(t) {
    this.zoomToPoint(new _(0, 0), t);
  }
  absolutePan(t) {
    const e = [...this.viewportTransform];
    return e[4] = -t.x, e[5] = -t.y, this.setViewportTransform(e);
  }
  relativePan(t) {
    return this.absolutePan(new _(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]));
  }
  getElement() {
    return this.elements.lower.el;
  }
  clearContext(t) {
    t.clearRect(0, 0, this.width, this.height);
  }
  getContext() {
    return this.elements.lower.ctx;
  }
  clear() {
    this.remove(...this.getObjects()), this.backgroundImage = void 0, this.overlayImage = void 0, this.backgroundColor = "", this.overlayColor = "", this.clearContext(this.getContext()), this.fire("canvas:cleared"), this.renderOnAddRemove && this.requestRenderAll();
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || this.renderCanvas(this.getContext(), this._objects);
  }
  renderAndReset() {
    this.nextRenderHandle = 0, this.renderAll();
  }
  requestRenderAll() {
    this.nextRenderHandle || this.disposed || this.destroyed || (this.nextRenderHandle = Ds(() => this.renderAndReset()));
  }
  calcViewportBoundaries() {
    const t = this.width, e = this.height, s = yt(this.viewportTransform), r = at({ x: 0, y: 0 }, s), n = at({ x: t, y: e }, s), o = r.min(n), a = r.max(n);
    return this.vptCoords = { tl: o, tr: new _(a.x, o.y), bl: new _(o.x, a.y), br: a };
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (Da(this.nextRenderHandle), this.nextRenderHandle = 0);
  }
  drawControls(t) {
  }
  renderCanvas(t, e) {
    if (this.destroyed) return;
    const s = this.viewportTransform, r = this.clipPath;
    this.calcViewportBoundaries(), this.clearContext(t), t.imageSmoothingEnabled = this.imageSmoothingEnabled, t.patternQuality = "best", this.fire("before:render", { ctx: t }), this._renderBackground(t), t.save(), t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this._renderObjects(t, e), t.restore(), this.controlsAboveOverlay || this.skipControlsDrawing || this.drawControls(t), r && (r._set("canvas", this), r.shouldCache(), r._transformDone = !0, r.renderCache({ forClipping: !0 }), this.drawClipPathOnCanvas(t, r)), this._renderOverlay(t), this.controlsAboveOverlay && !this.skipControlsDrawing && this.drawControls(t), this.fire("after:render", { ctx: t }), this.__cleanupTask && (this.__cleanupTask(), this.__cleanupTask = void 0);
  }
  drawClipPathOnCanvas(t, e) {
    const s = this.viewportTransform;
    t.save(), t.transform(...s), t.globalCompositeOperation = "destination-in", e.transform(t), t.scale(1 / e.zoomX, 1 / e.zoomY), t.drawImage(e._cacheCanvas, -e.cacheTranslationX, -e.cacheTranslationY), t.restore();
  }
  _renderObjects(t, e) {
    for (let s = 0, r = e.length; s < r; ++s) e[s] && e[s].render(t);
  }
  _renderBackgroundOrOverlay(t, e) {
    const s = this["".concat(e, "Color")], r = this["".concat(e, "Image")], n = this.viewportTransform, o = this["".concat(e, "Vpt")];
    if (!s && !r) return;
    const a = xt(s);
    if (s) {
      if (t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(this.width, 0), t.lineTo(this.width, this.height), t.lineTo(0, this.height), t.closePath(), t.fillStyle = a ? s.toLive(t) : s, o && t.transform(...n), a) {
        t.transform(1, 0, 0, 1, s.offsetX || 0, s.offsetY || 0);
        const c = s.gradientTransform || s.patternTransform;
        c && t.transform(...c);
      }
      t.fill(), t.restore();
    }
    if (r) {
      t.save();
      const { skipOffscreen: c } = this;
      this.skipOffscreen = o, o && t.transform(...n), r.render(t), this.skipOffscreen = c, t.restore();
    }
  }
  _renderBackground(t) {
    this._renderBackgroundOrOverlay(t, "background");
  }
  _renderOverlay(t) {
    this._renderBackgroundOrOverlay(t, "overlay");
  }
  getCenter() {
    return { top: this.height / 2, left: this.width / 2 };
  }
  getCenterPoint() {
    return new _(this.width / 2, this.height / 2);
  }
  centerObjectH(t) {
    return this._centerObject(t, new _(this.getCenterPoint().x, t.getCenterPoint().y));
  }
  centerObjectV(t) {
    return this._centerObject(t, new _(t.getCenterPoint().x, this.getCenterPoint().y));
  }
  centerObject(t) {
    return this._centerObject(t, this.getCenterPoint());
  }
  viewportCenterObject(t) {
    return this._centerObject(t, this.getVpCenter());
  }
  viewportCenterObjectH(t) {
    return this._centerObject(t, new _(this.getVpCenter().x, t.getCenterPoint().y));
  }
  viewportCenterObjectV(t) {
    return this._centerObject(t, new _(t.getCenterPoint().x, this.getVpCenter().y));
  }
  getVpCenter() {
    return at(this.getCenterPoint(), yt(this.viewportTransform));
  }
  _centerObject(t, e) {
    t.setXY(e, j, j), t.setCoords(), this.renderOnAddRemove && this.requestRenderAll();
  }
  toDatalessJSON(t) {
    return this.toDatalessObject(t);
  }
  toObject(t) {
    return this._toObjectMethod("toObject", t);
  }
  toJSON() {
    return this.toObject();
  }
  toDatalessObject(t) {
    return this._toObjectMethod("toDatalessObject", t);
  }
  _toObjectMethod(t, e) {
    const s = this.clipPath, r = s && !s.excludeFromExport ? this._toObject(s, t, e) : null;
    return v(v(v({ version: Hi }, He(this, e)), {}, { objects: this._objects.filter((n) => !n.excludeFromExport).map((n) => this._toObject(n, t, e)) }, this.__serializeBgOverlay(t, e)), r ? { clipPath: r } : null);
  }
  _toObject(t, e, s) {
    let r;
    this.includeDefaultValues || (r = t.includeDefaultValues, t.includeDefaultValues = !1);
    const n = t[e](s);
    return this.includeDefaultValues || (t.includeDefaultValues = !!r), n;
  }
  __serializeBgOverlay(t, e) {
    const s = {}, r = this.backgroundImage, n = this.overlayImage, o = this.backgroundColor, a = this.overlayColor;
    return xt(o) ? o.excludeFromExport || (s.background = o.toObject(e)) : o && (s.background = o), xt(a) ? a.excludeFromExport || (s.overlay = a.toObject(e)) : a && (s.overlay = a), r && !r.excludeFromExport && (s.backgroundImage = this._toObject(r, t, e)), n && !n.excludeFromExport && (s.overlayImage = this._toObject(n, t, e)), s;
  }
  toSVG() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 ? arguments[1] : void 0;
    t.reviver = e;
    const s = [];
    return this._setSVGPreamble(s, t), this._setSVGHeader(s, t), this.clipPath && s.push('<g clip-path="url(#'.concat(this.clipPath.clipPathId, `)" >
`)), this._setSVGBgOverlayColor(s, "background"), this._setSVGBgOverlayImage(s, "backgroundImage", e), this._setSVGObjects(s, e), this.clipPath && s.push(`</g>
`), this._setSVGBgOverlayColor(s, "overlay"), this._setSVGBgOverlayImage(s, "overlayImage", e), s.push("</svg>"), s.join("");
  }
  _setSVGPreamble(t, e) {
    e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || "UTF-8", `" standalone="no" ?>
`, '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', `"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`);
  }
  _setSVGHeader(t, e) {
    const s = e.width || "".concat(this.width), r = e.height || "".concat(this.height), n = E.NUM_FRACTION_DIGITS, o = e.viewBox;
    let a;
    if (o) a = 'viewBox="'.concat(o.x, " ").concat(o.y, " ").concat(o.width, " ").concat(o.height, '" ');
    else if (this.svgViewportTransformation) {
      const c = this.viewportTransform;
      a = 'viewBox="'.concat(z(-c[4] / c[0], n), " ").concat(z(-c[5] / c[3], n), " ").concat(z(this.width / c[0], n), " ").concat(z(this.height / c[3], n), '" ');
    } else a = 'viewBox="0 0 '.concat(this.width, " ").concat(this.height, '" ');
    t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', s, '" ', 'height="', r, '" ', a, `xml:space="preserve">
`, "<desc>Created with Fabric.js ", Hi, `</desc>
`, `<defs>
`, this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), this.createSVGClipPathMarkup(e), `</defs>
`);
  }
  createSVGClipPathMarkup(t) {
    const e = this.clipPath;
    return e ? (e.clipPathId = "CLIPPATH_".concat(be()), '<clipPath id="'.concat(e.clipPathId, `" >
`).concat(e.toClipPathSVG(t.reviver), `</clipPath>
`)) : "";
  }
  createSVGRefElementsMarkup() {
    return ["background", "overlay"].map((t) => {
      const e = this["".concat(t, "Color")];
      if (xt(e)) {
        const s = this["".concat(t, "Vpt")], r = this.viewportTransform, n = { isType: () => !1, width: this.width / (s ? r[0] : 1), height: this.height / (s ? r[3] : 1) };
        return e.toSVG(n, { additionalTransform: s ? Bs(r) : "" });
      }
    }).join("");
  }
  createSVGFontFacesMarkup() {
    const t = [], e = {}, s = E.fontPaths;
    this._objects.forEach(function n(o) {
      t.push(o), Er(o) && o._objects.forEach(n);
    }), t.forEach((n) => {
      if (!(o = n) || typeof o._renderText != "function") return;
      var o;
      const { styles: a, fontFamily: c } = n;
      !e[c] && s[c] && (e[c] = !0, a && Object.values(a).forEach((h) => {
        Object.values(h).forEach((l) => {
          let { fontFamily: u = "" } = l;
          !e[u] && s[u] && (e[u] = !0);
        });
      }));
    });
    const r = Object.keys(e).map((n) => `		@font-face {
			font-family: '`.concat(n, `';
			src: url('`).concat(s[n], `');
		}
`)).join("");
    return r ? `	<style type="text/css"><![CDATA[
`.concat(r, `]]></style>
`) : "";
  }
  _setSVGObjects(t, e) {
    this.forEachObject((s) => {
      s.excludeFromExport || this._setSVGObject(t, s, e);
    });
  }
  _setSVGObject(t, e, s) {
    t.push(e.toSVG(s));
  }
  _setSVGBgOverlayImage(t, e, s) {
    const r = this[e];
    r && !r.excludeFromExport && r.toSVG && t.push(r.toSVG(s));
  }
  _setSVGBgOverlayColor(t, e) {
    const s = this["".concat(e, "Color")];
    if (s) if (xt(s)) {
      const r = s.repeat || "", n = this.width, o = this.height, a = this["".concat(e, "Vpt")] ? Bs(yt(this.viewportTransform)) : "";
      t.push('<rect transform="'.concat(a, " translate(").concat(n / 2, ",").concat(o / 2, ')" x="').concat(s.offsetX - n / 2, '" y="').concat(s.offsetY - o / 2, '" width="').concat(r !== "repeat-y" && r !== "no-repeat" || !ao(s) ? n : s.source.width, '" height="').concat(r !== "repeat-x" && r !== "no-repeat" || !ao(s) ? o : s.source.height, '" fill="url(#SVGID_').concat(s.id, `)"></rect>
`));
    } else t.push('<rect x="0" y="0" width="100%" height="100%" ', 'fill="', s, '"', `></rect>
`);
  }
  loadFromJSON(t, e) {
    let { signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t) return Promise.reject(new Wt("`json` is undefined"));
    const r = typeof t == "string" ? JSON.parse(t) : t, { objects: n = [], backgroundImage: o, background: a, overlayImage: c, overlay: h, clipPath: l } = r, u = this.renderOnAddRemove;
    return this.renderOnAddRemove = !1, Promise.all([ls(n, { reviver: e, signal: s }), qs({ backgroundImage: o, backgroundColor: a, overlayImage: c, overlayColor: h, clipPath: l }, { signal: s })]).then((d) => {
      let [g, f] = d;
      return this.clear(), this.add(...g), this.set(r), this.set(f), this.renderOnAddRemove = u, this;
    });
  }
  clone(t) {
    const e = this.toObject(t);
    return this.cloneWithoutData().loadFromJSON(e);
  }
  cloneWithoutData() {
    const t = Rt(this);
    return new this.constructor(t);
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: n = !1 } = t, o = r * (n ? this.getRetinaScaling() : 1);
    return wn(this.toCanvasElement(o, t), e, s);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { format: e = "png", quality: s = 1, multiplier: r = 1, enableRetinaScaling: n = !1 } = t, o = r * (n ? this.getRetinaScaling() : 1);
    return Sn(this.toCanvasElement(o, t), e, s);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, { width: e, height: s, left: r, top: n, filter: o } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const a = (e || this.width) * t, c = (s || this.height) * t, h = this.getZoom(), l = this.width, u = this.height, d = this.skipControlsDrawing, g = h * t, f = this.viewportTransform, p = [g, 0, 0, g, (f[4] - (r || 0)) * t, (f[5] - (n || 0)) * t], m = this.enableRetinaScaling, b = Rt({ width: a, height: c }), T = o ? this._objects.filter((w) => o(w)) : this._objects;
    return this.enableRetinaScaling = !1, this.viewportTransform = p, this.width = a, this.height = c, this.skipControlsDrawing = !0, this.calcViewportBoundaries(), this.renderCanvas(b.getContext("2d"), T), this.viewportTransform = f, this.width = l, this.height = u, this.calcViewportBoundaries(), this.enableRetinaScaling = m, this.skipControlsDrawing = d, b;
  }
  dispose() {
    return !this.disposed && this.elements.cleanupDOM({ width: this.width, height: this.height }), Br.cancelByCanvas(this), this.disposed = !0, new Promise((t, e) => {
      const s = () => {
        this.destroy(), t(!0);
      };
      s.kill = e, this.__cleanupTask && this.__cleanupTask.kill("aborted"), this.destroyed ? t(!1) : this.nextRenderHandle ? this.__cleanupTask = s : s();
    });
  }
  destroy() {
    this.destroyed = !0, this.cancelRequestedRender(), this.forEachObject((t) => t.dispose()), this._objects = [], this.backgroundImage && this.backgroundImage.dispose(), this.backgroundImage = void 0, this.overlayImage && this.overlayImage.dispose(), this.overlayImage = void 0, this.elements.dispose();
  }
  toString() {
    return "#<Canvas (".concat(this.complexity(), "): { objects: ").concat(this._objects.length, " }>");
  }
}
y(Ks, "ownDefaults", Dl);
const jl = ["touchstart", "touchmove", "touchend"], Xa = (i) => {
  const t = Fa(i.target), e = function(s) {
    const r = s.changedTouches;
    return r && r[0] ? r[0] : s;
  }(i);
  return new _(e.clientX + t.left, e.clientY + t.top);
}, Wr = (i) => jl.includes(i.type) || i.pointerType === "touch", Gi = (i) => {
  i.preventDefault(), i.stopPropagation();
}, Xt = (i) => {
  let t = 0, e = 0, s = 0, r = 0;
  for (let n = 0, o = i.length; n < o; n++) {
    const { x: a, y: c } = i[n];
    (a > s || !n) && (s = a), (a < t || !n) && (t = a), (c > r || !n) && (r = c), (c < e || !n) && (e = c);
  }
  return { left: t, top: e, width: s - t, height: r - e };
}, Il = ["translateX", "translateY", "scaleX", "scaleY"], za = (i, t) => us(i, $(t, i.calcOwnMatrix())), us = (i, t) => {
  const e = hs(t), { translateX: s, translateY: r, scaleX: n, scaleY: o } = e, a = H(e, Il), c = new _(s, r);
  i.flipX = !1, i.flipY = !1, Object.assign(i, a), i.set({ scaleX: n, scaleY: o }), i.setPositionByOrigin(c, j, j);
}, Ha = (i) => {
  i.scaleX = 1, i.scaleY = 1, i.skewX = 0, i.skewY = 0, i.flipX = !1, i.flipY = !1, i.rotate(0);
}, Mn = (i) => ({ scaleX: i.scaleX, scaleY: i.scaleY, skewX: i.skewX, skewY: i.skewY, angle: i.angle, left: i.left, flipX: i.flipX, flipY: i.flipY, top: i.top }), ii = (i, t, e) => {
  const s = i / 2, r = t / 2, n = [new _(-s, -r), new _(s, -r), new _(-s, r), new _(s, r)].map((a) => a.transform(e)), o = Xt(n);
  return new _(o.width, o.height);
}, Js = function() {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : lt;
  return $(yt(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : lt), i);
}, re = function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : lt, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : lt;
  return i.transform(Js(t, e));
}, Ya = function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : lt, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : lt;
  return i.transform(Js(t, e), !0);
}, Ni = (i, t, e) => {
  const s = Js(t, e);
  return us(i, $(s, i.calcOwnMatrix())), s;
}, Dn = (i, t) => {
  var e;
  const { transform: { target: s } } = t;
  (e = s.canvas) === null || e === void 0 || e.fire("object:".concat(i), v(v({}, t), {}, { target: s })), s.fire(i, t);
}, El = { left: -0.5, top: -0.5, center: 0, bottom: 0.5, right: 0.5 }, Q = (i) => typeof i == "string" ? El[i] : i - 0.5, Xr = "not-allowed";
function Va(i) {
  return Q(i.originX) === Q(j) && Q(i.originY) === Q(j);
}
function ho(i) {
  return 0.5 - Q(i);
}
const Et = (i, t) => i[t], jn = (i, t, e, s) => ({ e: i, transform: t, pointer: new _(e, s) });
function Ga(i, t) {
  const e = i.getTotalAngle() + _e(Math.atan2(t.y, t.x)) + 360;
  return Math.round(e % 360 / 45);
}
function ni(i, t, e, s, r) {
  var n;
  let { target: o, corner: a } = i;
  const c = o.controls[a], h = ((n = o.canvas) === null || n === void 0 ? void 0 : n.getZoom()) || 1, l = o.padding / h, u = function(d, g, f, p) {
    const m = d.getRelativeCenterPoint(), b = f !== void 0 && p !== void 0 ? d.translateToGivenOrigin(m, j, j, f, p) : new _(d.left, d.top);
    return (d.angle ? g.rotate(-U(d.angle), m) : g).subtract(b);
  }(o, new _(s, r), t, e);
  return u.x >= l && (u.x -= l), u.x <= -l && (u.x += l), u.y >= l && (u.y -= l), u.y <= l && (u.y += l), u.x -= c.offsetX, u.y -= c.offsetY, u;
}
const Na = (i, t, e, s) => {
  const { target: r, offsetX: n, offsetY: o } = t, a = e - n, c = s - o, h = !Et(r, "lockMovementX") && r.left !== a, l = !Et(r, "lockMovementY") && r.top !== c;
  return h && r.set(A, a), l && r.set(gt, c), (h || l) && Dn(wa, jn(i, t, e, s)), h || l;
};
class Ua {
  getSvgStyles(t) {
    const e = this.fillRule ? this.fillRule : "nonzero", s = this.strokeWidth ? this.strokeWidth : "0", r = this.strokeDashArray ? this.strokeDashArray.join(" ") : ft, n = this.strokeDashOffset ? this.strokeDashOffset : "0", o = this.strokeLineCap ? this.strokeLineCap : "butt", a = this.strokeLineJoin ? this.strokeLineJoin : "miter", c = this.strokeMiterLimit ? this.strokeMiterLimit : "4", h = this.opacity !== void 0 ? this.opacity : "1", l = this.visible ? "" : " visibility: hidden;", u = t ? "" : this.getSvgFilter(), d = Ws(st, this.fill);
    return [Ws(pt, this.stroke), "stroke-width: ", s, "; ", "stroke-dasharray: ", r, "; ", "stroke-linecap: ", o, "; ", "stroke-dashoffset: ", n, "; ", "stroke-linejoin: ", a, "; ", "stroke-miterlimit: ", c, "; ", d, "fill-rule: ", e, "; ", "opacity: ", h, ";", u, l].join("");
  }
  getSvgFilter() {
    return this.shadow ? "filter: url(#SVGID_".concat(this.shadow.id, ");") : "";
  }
  getSvgCommons() {
    return [this.id ? 'id="'.concat(this.id, '" ') : "", this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ""].join("");
  }
  getSvgTransform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const s = t ? this.calcTransformMatrix() : this.calcOwnMatrix(), r = 'transform="'.concat(Bs(s));
    return "".concat(r).concat(e, '" ');
  }
  _toSVG(t) {
    return [""];
  }
  toSVG(t) {
    return this._createBaseSVGMarkup(this._toSVG(t), { reviver: t });
  }
  toClipPathSVG(t) {
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(t), { reviver: t });
  }
  _createBaseClipPathSVGMarkup(t) {
    let { reviver: e, additionalTransform: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = [this.getSvgTransform(!0, s), this.getSvgCommons()].join(""), n = t.indexOf("COMMON_PARTS");
    return t[n] = r, e ? e(t.join("")) : t.join("");
  }
  _createBaseSVGMarkup(t) {
    let { noStyle: e, reviver: s, withShadow: r, additionalTransform: n } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = e ? "" : 'style="'.concat(this.getSvgStyles(), '" '), a = r ? 'style="'.concat(this.getSvgFilter(), '" ') : "", c = this.clipPath, h = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", l = c && c.absolutePositioned, u = this.stroke, d = this.fill, g = this.shadow, f = [], p = t.indexOf("COMMON_PARTS");
    let m;
    c && (c.clipPathId = "CLIPPATH_".concat(be()), m = '<clipPath id="'.concat(c.clipPathId, `" >
`).concat(c.toClipPathSVG(s), `</clipPath>
`)), l && f.push("<g ", a, this.getSvgCommons(), ` >
`), f.push("<g ", this.getSvgTransform(!1), l ? "" : a + this.getSvgCommons(), ` >
`);
    const b = [o, h, e ? "" : this.addPaintOrder(), " ", n ? 'transform="'.concat(n, '" ') : ""].join("");
    return t[p] = b, xt(d) && f.push(d.toSVG(this)), xt(u) && f.push(u.toSVG(this)), g && f.push(g.toSVG(this)), c && f.push(m), f.push(t.join("")), f.push(`</g>
`), l && f.push(`</g>
`), s ? s(f.join("")) : f.join("");
  }
  addPaintOrder() {
    return this.paintFirst !== st ? ' paint-order="'.concat(this.paintFirst, '" ') : "";
  }
}
function oi(i) {
  return new RegExp("^(" + i.join("|") + ")\\b", "i");
}
var lo;
const Be = String.raw(lo || (lo = Se(["(?:[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?)"], ["(?:[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?)"]))), Pl = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + Be + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + Be + "))?\\s+(.*)"), Al = { cx: A, x: A, r: "radius", cy: gt, y: gt, display: "visible", visibility: "visible", transform: "transformMatrix", "fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "letter-spacing": "charSpacing", "paint-order": "paintFirst", "stroke-dasharray": "strokeDashArray", "stroke-dashoffset": "strokeDashOffset", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", "text-anchor": "textAnchor", opacity: "opacity", "clip-path": "clipPath", "clip-rule": "clipRule", "vector-effect": "strokeUniform", "image-rendering": "imageSmoothing" }, Si = "font-size", Ci = "clip-path";
oi(["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text"]);
oi(["symbol", "image", "marker", "pattern", "view", "svg"]);
const uo = oi(["symbol", "g", "a", "svg", "clipPath", "defs"]), Rl = new _(1, 0), $a = new _(), In = (i, t) => i.rotate(t), zr = (i, t) => new _(t).subtract(i), Hr = (i) => i.distanceFrom($a), Yr = (i, t) => Math.atan2(os(i, t), Ka(i, t)), qa = (i) => Yr(Rl, i), ai = (i) => i.eq($a) ? i : i.scalarDivide(Hr(i)), En = function(i) {
  let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
  return ai(new _(-i.y, i.x).scalarMultiply(t ? 1 : -1));
}, os = (i, t) => i.x * t.y - i.y * t.x, Ka = (i, t) => i.x * t.x + i.y * t.y, Ui = (i, t, e) => {
  if (i.eq(t) || i.eq(e)) return !0;
  const s = os(t, e), r = os(t, i), n = os(e, i);
  return s >= 0 ? r >= 0 && n <= 0 : !(r <= 0 && n >= 0);
}, go = "(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?", fo = new RegExp("(?:\\s|^)" + go + go + "(" + Be + "?(?:px)?)?(?:\\s?|$)(?:$|\\s)");
class ie {
  constructor(t) {
    const e = typeof t == "string" ? ie.parseShadow(t) : t;
    Object.assign(this, ie.ownDefaults, e), this.id = be();
  }
  static parseShadow(t) {
    const e = t.trim(), [, s = 0, r = 0, n = 0] = (fo.exec(e) || []).map((o) => parseFloat(o) || 0);
    return { color: (e.replace(fo, "") || "rgb(0,0,0)").trim(), offsetX: s, offsetY: r, blur: n };
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
  }
  toSVG(t) {
    const e = In(new _(this.offsetX, this.offsetY), U(-t.angle)), s = new F(this.color);
    let r = 40, n = 40;
    return t.width && t.height && (r = 100 * z((Math.abs(e.x) + this.blur) / t.width, E.NUM_FRACTION_DIGITS) + 20, n = 100 * z((Math.abs(e.y) + this.blur) / t.height, E.NUM_FRACTION_DIGITS) + 20), t.flipX && (e.x *= -1), t.flipY && (e.y *= -1), '<filter id="SVGID_'.concat(this.id, '" y="-').concat(n, '%" height="').concat(100 + 2 * n, '%" x="-').concat(r, '%" width="').concat(100 + 2 * r, `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`).concat(z(this.blur ? this.blur / 2 : 0, E.NUM_FRACTION_DIGITS), `"></feGaussianBlur>
	<feOffset dx="`).concat(z(e.x, E.NUM_FRACTION_DIGITS), '" dy="').concat(z(e.y, E.NUM_FRACTION_DIGITS), `" result="oBlur" ></feOffset>
	<feFlood flood-color="`).concat(s.toRgb(), '" flood-opacity="').concat(s.getAlpha(), `"/>
	<feComposite in2="oBlur" operator="in" />
	<feMerge>
		<feMergeNode></feMergeNode>
		<feMergeNode in="SourceGraphic"></feMergeNode>
	</feMerge>
</filter>
`);
  }
  toObject() {
    const t = { color: this.color, blur: this.blur, offsetX: this.offsetX, offsetY: this.offsetY, affectStroke: this.affectStroke, nonScaling: this.nonScaling, type: this.constructor.type }, e = ie.ownDefaults;
    return this.includeDefaultValues ? t : kn(t, (s, r) => s !== e[r]);
  }
  static async fromObject(t) {
    return new this(t);
  }
}
y(ie, "ownDefaults", { color: "rgb(0,0,0)", blur: 0, offsetX: 0, offsetY: 0, affectStroke: !1, includeDefaultValues: !0, nonScaling: !1 }), y(ie, "type", "shadow"), O.setClass(ie, "shadow");
const We = (i, t, e) => Math.max(i, Math.min(t, e)), Fl = [gt, A, ut, bt, "flipX", "flipY", "originX", "originY", "angle", "opacity", "globalCompositeOperation", "shadow", "visible", fs, ps], ae = [st, pt, "strokeWidth", "strokeDashArray", "width", "height", "paintFirst", "strokeUniform", "strokeLineCap", "strokeDashOffset", "strokeLineJoin", "strokeMiterLimit", "backgroundColor", "clipPath"], Ll = { top: 0, left: 0, width: 0, height: 0, angle: 0, flipX: !1, flipY: !1, scaleX: 1, scaleY: 1, minScaleLimit: 0, skewX: 0, skewY: 0, originX: A, originY: gt, strokeWidth: 1, strokeUniform: !1, padding: 0, opacity: 1, paintFirst: st, fill: "rgb(0,0,0)", fillRule: "nonzero", stroke: null, strokeDashArray: null, strokeDashOffset: 0, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 4, globalCompositeOperation: "source-over", backgroundColor: "", shadow: null, visible: !0, includeDefaultValues: !0, excludeFromExport: !1, objectCaching: !0, clipPath: void 0, inverted: !1, absolutePositioned: !1, centeredRotation: !0, centeredScaling: !1, dirty: !0 }, Oi = (i, t, e, s) => (i < Math.abs(t) ? (i = t, s = e / 4) : s = t === 0 && i === 0 ? e / oe * Math.asin(1) : e / oe * Math.asin(t / i), { a: i, c: t, p: e, s }), po = (i, t, e, s, r) => i * Math.pow(2, 10 * (s -= 1)) * Math.sin((s * r - t) * oe / e), Ja = (i, t, e, s) => -e * Math.cos(i / s * ye) + e + t, $i = (i, t, e, s) => (i /= s) < 1 / 2.75 ? e * (7.5625 * i * i) + t : i < 2 / 2.75 ? e * (7.5625 * (i -= 1.5 / 2.75) * i + 0.75) + t : i < 2.5 / 2.75 ? e * (7.5625 * (i -= 2.25 / 2.75) * i + 0.9375) + t : e * (7.5625 * (i -= 2.625 / 2.75) * i + 0.984375) + t, mo = (i, t, e, s) => e - $i(s - i, 0, e, s) + t;
var Bl = Object.freeze({ __proto__: null, defaultEasing: Ja, easeInBack: function(i, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158;
  return e * (i /= s) * i * ((r + 1) * i - r) + t;
}, easeInBounce: mo, easeInCirc: (i, t, e, s) => -e * (Math.sqrt(1 - (i /= s) * i) - 1) + t, easeInCubic: (i, t, e, s) => e * (i / s) ** 3 + t, easeInElastic: (i, t, e, s) => {
  const r = e;
  let n = 0;
  if (i === 0) return t;
  if ((i /= s) === 1) return t + e;
  n || (n = 0.3 * s);
  const { a: o, s: a, p: c } = Oi(r, e, n, 1.70158);
  return -po(o, a, c, i, s) + t;
}, easeInExpo: (i, t, e, s) => i === 0 ? t : e * 2 ** (10 * (i / s - 1)) + t, easeInOutBack: function(i, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158;
  return (i /= s / 2) < 1 ? e / 2 * (i * i * ((1 + (r *= 1.525)) * i - r)) + t : e / 2 * ((i -= 2) * i * ((1 + (r *= 1.525)) * i + r) + 2) + t;
}, easeInOutBounce: (i, t, e, s) => i < s / 2 ? 0.5 * mo(2 * i, 0, e, s) + t : 0.5 * $i(2 * i - s, 0, e, s) + 0.5 * e + t, easeInOutCirc: (i, t, e, s) => (i /= s / 2) < 1 ? -e / 2 * (Math.sqrt(1 - i ** 2) - 1) + t : e / 2 * (Math.sqrt(1 - (i -= 2) * i) + 1) + t, easeInOutCubic: (i, t, e, s) => (i /= s / 2) < 1 ? e / 2 * i ** 3 + t : e / 2 * ((i - 2) ** 3 + 2) + t, easeInOutElastic: (i, t, e, s) => {
  const r = e;
  let n = 0;
  if (i === 0) return t;
  if ((i /= s / 2) === 2) return t + e;
  n || (n = s * (0.3 * 1.5));
  const { a: o, s: a, p: c, c: h } = Oi(r, e, n, 1.70158);
  return i < 1 ? -0.5 * po(o, a, c, i, s) + t : o * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * s - a) * oe / c) * 0.5 + h + t;
}, easeInOutExpo: (i, t, e, s) => i === 0 ? t : i === s ? t + e : (i /= s / 2) < 1 ? e / 2 * 2 ** (10 * (i - 1)) + t : e / 2 * -(2 ** (-10 * --i) + 2) + t, easeInOutQuad: (i, t, e, s) => (i /= s / 2) < 1 ? e / 2 * i ** 2 + t : -e / 2 * (--i * (i - 2) - 1) + t, easeInOutQuart: (i, t, e, s) => (i /= s / 2) < 1 ? e / 2 * i ** 4 + t : -e / 2 * ((i -= 2) * i ** 3 - 2) + t, easeInOutQuint: (i, t, e, s) => (i /= s / 2) < 1 ? e / 2 * i ** 5 + t : e / 2 * ((i - 2) ** 5 + 2) + t, easeInOutSine: (i, t, e, s) => -e / 2 * (Math.cos(Math.PI * i / s) - 1) + t, easeInQuad: (i, t, e, s) => e * (i /= s) * i + t, easeInQuart: (i, t, e, s) => e * (i /= s) * i ** 3 + t, easeInQuint: (i, t, e, s) => e * (i / s) ** 5 + t, easeInSine: (i, t, e, s) => -e * Math.cos(i / s * ye) + e + t, easeOutBack: function(i, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158;
  return e * ((i = i / s - 1) * i * ((r + 1) * i + r) + 1) + t;
}, easeOutBounce: $i, easeOutCirc: (i, t, e, s) => e * Math.sqrt(1 - (i = i / s - 1) * i) + t, easeOutCubic: (i, t, e, s) => e * ((i / s - 1) ** 3 + 1) + t, easeOutElastic: (i, t, e, s) => {
  const r = e;
  let n = 0;
  if (i === 0) return t;
  if ((i /= s) === 1) return t + e;
  n || (n = 0.3 * s);
  const { a: o, s: a, p: c, c: h } = Oi(r, e, n, 1.70158);
  return o * 2 ** (-10 * i) * Math.sin((i * s - a) * oe / c) + h + t;
}, easeOutExpo: (i, t, e, s) => i === s ? t + e : e * -(2 ** (-10 * i / s) + 1) + t, easeOutQuad: (i, t, e, s) => -e * (i /= s) * (i - 2) + t, easeOutQuart: (i, t, e, s) => -e * ((i = i / s - 1) * i ** 3 - 1) + t, easeOutQuint: (i, t, e, s) => e * ((i / s - 1) ** 5 + 1) + t, easeOutSine: (i, t, e, s) => e * Math.sin(i / s * ye) + t });
const Wl = () => !1;
class Pn {
  constructor(t) {
    let { startValue: e, byValue: s, duration: r = 500, delay: n = 0, easing: o = Ja, onStart: a = Ae, onChange: c = Ae, onComplete: h = Ae, abort: l = Wl, target: u } = t;
    y(this, "_state", "pending"), y(this, "durationProgress", 0), y(this, "valueProgress", 0), this.tick = this.tick.bind(this), this.duration = r, this.delay = n, this.easing = o, this._onStart = a, this._onChange = c, this._onComplete = h, this._abort = l, this.target = u, this.startValue = e, this.byValue = s, this.value = this.startValue, this.endValue = Object.freeze(this.calculate(this.duration).value);
  }
  get state() {
    return this._state;
  }
  isDone() {
    return this._state === "aborted" || this._state === "completed";
  }
  start() {
    const t = (e) => {
      this._state === "pending" && (this.startTime = e || +/* @__PURE__ */ new Date(), this._state = "running", this._onStart(), this.tick(this.startTime));
    };
    this.register(), this.delay > 0 ? setTimeout(() => Ds(t), this.delay) : Ds(t);
  }
  tick(t) {
    const e = (t || +/* @__PURE__ */ new Date()) - this.startTime, s = Math.min(e, this.duration);
    this.durationProgress = s / this.duration;
    const { value: r, valueProgress: n } = this.calculate(s);
    this.value = Object.freeze(r), this.valueProgress = n, this._state !== "aborted" && (this._abort(this.value, this.valueProgress, this.durationProgress) ? (this._state = "aborted", this.unregister()) : e >= this.duration ? (this.durationProgress = this.valueProgress = 1, this._onChange(this.endValue, this.valueProgress, this.durationProgress), this._state = "completed", this._onComplete(this.endValue, this.valueProgress, this.durationProgress), this.unregister()) : (this._onChange(this.value, this.valueProgress, this.durationProgress), Ds(this.tick)));
  }
  register() {
    Br.push(this);
  }
  unregister() {
    Br.remove(this);
  }
  abort() {
    this._state = "aborted", this.unregister();
  }
}
const Xl = ["startValue", "endValue"];
class zl extends Pn {
  constructor(t) {
    let { startValue: e = 0, endValue: s = 100 } = t;
    super(v(v({}, H(t, Xl)), {}, { startValue: e, byValue: s - e }));
  }
  calculate(t) {
    const e = this.easing(t, this.startValue, this.byValue, this.duration);
    return { value: e, valueProgress: Math.abs((e - this.startValue) / this.byValue) };
  }
}
const Hl = ["startValue", "endValue"];
class Yl extends Pn {
  constructor(t) {
    let { startValue: e = [0], endValue: s = [100] } = t;
    super(v(v({}, H(t, Hl)), {}, { startValue: e, byValue: s.map((r, n) => r - e[n]) }));
  }
  calculate(t) {
    const e = this.startValue.map((s, r) => this.easing(t, s, this.byValue[r], this.duration, r));
    return { value: e, valueProgress: Math.abs((e[0] - this.startValue[0]) / this.byValue[0]) };
  }
}
const Vl = ["startValue", "endValue", "easing", "onChange", "onComplete", "abort"], Gl = (i, t, e, s) => t + e * (1 - Math.cos(i / s * ye)), ki = (i) => i && ((t, e, s) => i(new F(t).toRgba(), e, s));
class Nl extends Pn {
  constructor(t) {
    let { startValue: e, endValue: s, easing: r = Gl, onChange: n, onComplete: o, abort: a } = t, c = H(t, Vl);
    const h = new F(e).getSource(), l = new F(s).getSource();
    super(v(v({}, c), {}, { startValue: h, byValue: l.map((u, d) => u - h[d]), easing: r, onChange: ki(n), onComplete: ki(o), abort: ki(a) }));
  }
  calculate(t) {
    const [e, s, r, n] = this.startValue.map((a, c) => this.easing(t, a, this.byValue[c], this.duration, c)), o = [...[e, s, r].map(Math.round), We(0, n, 1)];
    return { value: o, valueProgress: o.map((a, c) => this.byValue[c] !== 0 ? Math.abs((a - this.startValue[c]) / this.byValue[c]) : 0).find((a) => a !== 0) || 0 };
  }
}
function An(i) {
  const t = ((e) => Array.isArray(e.startValue) || Array.isArray(e.endValue))(i) ? new Yl(i) : new zl(i);
  return t.start(), t;
}
function Za(i) {
  const t = new Nl(i);
  return t.start(), t;
}
class Y {
  constructor(t) {
    this.status = t, this.points = [];
  }
  includes(t) {
    return this.points.some((e) => e.eq(t));
  }
  append() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return this.points = this.points.concat(e.filter((r) => !this.includes(r))), this;
  }
  static isPointContained(t, e, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
    if (e.eq(s)) return t.eq(e);
    if (e.x === s.x) return t.x === e.x && (r || t.y >= Math.min(e.y, s.y) && t.y <= Math.max(e.y, s.y));
    if (e.y === s.y) return t.y === e.y && (r || t.x >= Math.min(e.x, s.x) && t.x <= Math.max(e.x, s.x));
    {
      const n = zr(e, s), o = zr(e, t).divide(n);
      return r ? Math.abs(o.x) === Math.abs(o.y) : o.x === o.y && o.x >= 0 && o.x <= 1;
    }
  }
  static isPointInPolygon(t, e) {
    const s = new _(t).setX(Math.min(t.x - 1, ...e.map((n) => n.x)));
    let r = 0;
    for (let n = 0; n < e.length; n++) {
      const o = this.intersectSegmentSegment(e[n], e[(n + 1) % e.length], t, s);
      if (o.includes(t)) return !0;
      r += +(o.status === "Intersection");
    }
    return r % 2 == 1;
  }
  static intersectLineLine(t, e, s, r) {
    let n = !(arguments.length > 4 && arguments[4] !== void 0) || arguments[4], o = !(arguments.length > 5 && arguments[5] !== void 0) || arguments[5];
    const a = e.x - t.x, c = e.y - t.y, h = r.x - s.x, l = r.y - s.y, u = t.x - s.x, d = t.y - s.y, g = h * d - l * u, f = a * d - c * u, p = l * a - h * c;
    if (p !== 0) {
      const m = g / p, b = f / p;
      return (n || 0 <= m && m <= 1) && (o || 0 <= b && b <= 1) ? new Y("Intersection").append(new _(t.x + m * a, t.y + m * c)) : new Y();
    }
    if (g === 0 || f === 0) {
      const m = n || o || Y.isPointContained(t, s, r) || Y.isPointContained(e, s, r) || Y.isPointContained(s, t, e) || Y.isPointContained(r, t, e);
      return new Y(m ? "Coincident" : void 0);
    }
    return new Y("Parallel");
  }
  static intersectSegmentLine(t, e, s, r) {
    return Y.intersectLineLine(t, e, s, r, !1, !0);
  }
  static intersectSegmentSegment(t, e, s, r) {
    return Y.intersectLineLine(t, e, s, r, !1, !1);
  }
  static intersectLinePolygon(t, e, s) {
    let r = !(arguments.length > 3 && arguments[3] !== void 0) || arguments[3];
    const n = new Y(), o = s.length;
    for (let a, c, h, l = 0; l < o; l++) {
      if (a = s[l], c = s[(l + 1) % o], h = Y.intersectLineLine(t, e, a, c, r, !1), h.status === "Coincident") return h;
      n.append(...h.points);
    }
    return n.points.length > 0 && (n.status = "Intersection"), n;
  }
  static intersectSegmentPolygon(t, e, s) {
    return Y.intersectLinePolygon(t, e, s, !1);
  }
  static intersectPolygonPolygon(t, e) {
    const s = new Y(), r = t.length, n = [];
    for (let o = 0; o < r; o++) {
      const a = t[o], c = t[(o + 1) % r], h = Y.intersectSegmentPolygon(a, c, e);
      h.status === "Coincident" ? (n.push(h), s.append(a, c)) : s.append(...h.points);
    }
    return n.length > 0 && n.length === t.length ? new Y("Coincident") : (s.points.length > 0 && (s.status = "Intersection"), s);
  }
  static intersectPolygonRectangle(t, e, s) {
    const r = e.min(s), n = e.max(s), o = new _(n.x, r.y), a = new _(r.x, n.y);
    return Y.intersectPolygonPolygon(t, [r, o, n, a]);
  }
}
class Ul extends Ma {
  getX() {
    return this.getXY().x;
  }
  setX(t) {
    this.setXY(this.getXY().setX(t));
  }
  getY() {
    return this.getXY().y;
  }
  setY(t) {
    this.setXY(this.getXY().setY(t));
  }
  getRelativeX() {
    return this.left;
  }
  setRelativeX(t) {
    this.left = t;
  }
  getRelativeY() {
    return this.top;
  }
  setRelativeY(t) {
    this.top = t;
  }
  getXY() {
    const t = this.getRelativeXY();
    return this.group ? at(t, this.group.calcTransformMatrix()) : t;
  }
  setXY(t, e, s) {
    this.group && (t = at(t, yt(this.group.calcTransformMatrix()))), this.setRelativeXY(t, e, s);
  }
  getRelativeXY() {
    return new _(this.left, this.top);
  }
  setRelativeXY(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.originX, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.originY;
    this.setPositionByOrigin(t, e, s);
  }
  isStrokeAccountedForInDimensions() {
    return !1;
  }
  getCoords() {
    const { tl: t, tr: e, br: s, bl: r } = this.aCoords || (this.aCoords = this.calcACoords()), n = [t, e, s, r];
    if (this.group) {
      const o = this.group.calcTransformMatrix();
      return n.map((a) => at(a, o));
    }
    return n;
  }
  intersectsWithRect(t, e) {
    return Y.intersectPolygonRectangle(this.getCoords(), t, e).status === "Intersection";
  }
  intersectsWithObject(t) {
    const e = Y.intersectPolygonPolygon(this.getCoords(), t.getCoords());
    return e.status === "Intersection" || e.status === "Coincident" || t.isContainedWithinObject(this) || this.isContainedWithinObject(t);
  }
  isContainedWithinObject(t) {
    return this.getCoords().every((e) => t.containsPoint(e));
  }
  isContainedWithinRect(t, e) {
    const { left: s, top: r, width: n, height: o } = this.getBoundingRect();
    return s >= t.x && s + n <= e.x && r >= t.y && r + o <= e.y;
  }
  isOverlapping(t) {
    return this.intersectsWithObject(t) || this.isContainedWithinObject(t) || t.isContainedWithinObject(this);
  }
  containsPoint(t) {
    return Y.isPointInPolygon(t, this.getCoords());
  }
  isOnScreen() {
    if (!this.canvas) return !1;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return !!this.getCoords().some((s) => s.x <= e.x && s.x >= t.x && s.y <= e.y && s.y >= t.y) || !!this.intersectsWithRect(t, e) || this.containsPoint(t.midPointFrom(e));
  }
  isPartiallyOnScreen() {
    if (!this.canvas) return !1;
    const { tl: t, br: e } = this.canvas.vptCoords;
    return this.intersectsWithRect(t, e) ? !0 : this.getCoords().every((s) => (s.x >= e.x || s.x <= t.x) && (s.y >= e.y || s.y <= t.y)) && this.containsPoint(t.midPointFrom(e));
  }
  getBoundingRect() {
    return Xt(this.getCoords());
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x;
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y;
  }
  scale(t) {
    this._set(ut, t), this._set(bt, t), this.setCoords();
  }
  scaleToWidth(t) {
    const e = this.getBoundingRect().width / this.getScaledWidth();
    return this.scale(t / this.width / e);
  }
  scaleToHeight(t) {
    const e = this.getBoundingRect().height / this.getScaledHeight();
    return this.scale(t / this.height / e);
  }
  getCanvasRetinaScaling() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.getRetinaScaling()) || 1;
  }
  getTotalAngle() {
    return this.group ? _e(Ea(this.calcTransformMatrix())) : this.angle;
  }
  getViewportTransform() {
    var t;
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.viewportTransform) || lt.concat();
  }
  calcACoords() {
    const t = vs({ angle: this.angle }), { x: e, y: s } = this.getRelativeCenterPoint(), r = ms(e, s), n = $(r, t), o = this._getTransformedDimensions(), a = o.x / 2, c = o.y / 2;
    return { tl: at({ x: -a, y: -c }, n), tr: at({ x: a, y: -c }, n), bl: at({ x: -a, y: c }, n), br: at({ x: a, y: c }, n) };
  }
  setCoords() {
    this.aCoords = this.calcACoords();
  }
  transformMatrixKey() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = [];
    return !t && this.group && (e = this.group.transformMatrixKey(t)), e.push(this.top, this.left, this.width, this.height, this.scaleX, this.scaleY, this.angle, this.strokeWidth, this.skewX, this.skewY, +this.flipX, +this.flipY, Q(this.originX), Q(this.originY)), e;
  }
  calcTransformMatrix() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], e = this.calcOwnMatrix();
    if (t || !this.group) return e;
    const s = this.transformMatrixKey(t), r = this.matrixCache;
    return r && r.key.every((n, o) => n === s[o]) ? r.value : (this.group && (e = $(this.group.calcTransformMatrix(!1), e)), this.matrixCache = { key: s, value: e }, e);
  }
  calcOwnMatrix() {
    const t = this.transformMatrixKey(!0), e = this.ownMatrixCache;
    if (e && e.key === t) return e.value;
    const s = this.getRelativeCenterPoint(), r = { angle: this.angle, translateX: s.x, translateY: s.y, scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, flipX: this.flipX, flipY: this.flipY }, n = Aa(r);
    return this.ownMatrixCache = { key: t, value: n }, n;
  }
  _getNonTransformedDimensions() {
    return new _(this.width, this.height).scalarAdd(this.strokeWidth);
  }
  _calculateCurrentDimensions(t) {
    return this._getTransformedDimensions(t).transform(this.getViewportTransform(), !0).scalarAdd(2 * this.padding);
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = v({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, width: this.width, height: this.height, strokeWidth: this.strokeWidth }, t), s = e.strokeWidth;
    let r = s, n = 0;
    this.strokeUniform && (r = 0, n = s);
    const o = e.width + r, a = e.height + r;
    let c;
    return c = e.skewX === 0 && e.skewY === 0 ? new _(o * e.scaleX, a * e.scaleY) : ii(o, a, $s(e)), c.scalarAdd(n);
  }
  translateToGivenOrigin(t, e, s, r, n) {
    let o = t.x, a = t.y;
    const c = Q(r) - Q(e), h = Q(n) - Q(s);
    if (c || h) {
      const l = this._getTransformedDimensions();
      o += c * l.x, a += h * l.y;
    }
    return new _(o, a);
  }
  translateToCenterPoint(t, e, s) {
    if (e === j && s === j) return t;
    const r = this.translateToGivenOrigin(t, e, s, j, j);
    return this.angle ? r.rotate(U(this.angle), t) : r;
  }
  translateToOriginPoint(t, e, s) {
    const r = this.translateToGivenOrigin(t, j, j, e, s);
    return this.angle ? r.rotate(U(this.angle), t) : r;
  }
  getCenterPoint() {
    const t = this.getRelativeCenterPoint();
    return this.group ? at(t, this.group.calcTransformMatrix()) : t;
  }
  getRelativeCenterPoint() {
    return this.translateToCenterPoint(new _(this.left, this.top), this.originX, this.originY);
  }
  getPointByOrigin(t, e) {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), t, e);
  }
  setPositionByOrigin(t, e, s) {
    const r = this.translateToCenterPoint(t, e, s), n = this.translateToOriginPoint(r, this.originX, this.originY);
    this.set({ left: n.x, top: n.y });
  }
  _getLeftTopCoords() {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), A, gt);
  }
}
const $l = ["type"], ql = ["extraParam"];
let Kt = class Pr extends Ul {
  static getDefaults() {
    return Pr.ownDefaults;
  }
  get type() {
    const t = this.constructor.type;
    return t === "FabricObject" ? "object" : t.toLowerCase();
  }
  set type(t) {
    ve("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    super(), y(this, "_cacheContext", null), Object.assign(this, Pr.ownDefaults), this.setOptions(t);
  }
  _createCacheCanvas() {
    this._cacheCanvas = St(), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas(), this.dirty = !0;
  }
  _limitCacheSize(t) {
    const e = t.width, s = t.height, r = E.maxCacheSideLimit, n = E.minCacheSideLimit;
    if (e <= r && s <= r && e * s <= E.perfLimitSizeTotal) return e < n && (t.width = n), s < n && (t.height = n), t;
    const o = e / s, [a, c] = Ms.limitDimsByArea(o), h = We(n, a, r), l = We(n, c, r);
    return e > h && (t.zoomX /= e / h, t.width = h, t.capped = !0), s > l && (t.zoomY /= s / l, t.height = l, t.capped = !0), t;
  }
  _getCacheCanvasDimensions() {
    const t = this.getTotalObjectScaling(), e = this._getTransformedDimensions({ skewX: 0, skewY: 0 }), s = e.x * t.x / this.scaleX, r = e.y * t.y / this.scaleY;
    return { width: Math.ceil(s + 2), height: Math.ceil(r + 2), zoomX: t.x, zoomY: t.y, x: s, y: r };
  }
  _updateCacheCanvas() {
    const t = this._cacheCanvas, e = this._cacheContext, { width: s, height: r, zoomX: n, zoomY: o, x: a, y: c } = this._limitCacheSize(this._getCacheCanvasDimensions()), h = s !== t.width || r !== t.height, l = this.zoomX !== n || this.zoomY !== o;
    if (!t || !e) return !1;
    if (h || l) {
      s !== t.width || r !== t.height ? (t.width = s, t.height = r) : (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height));
      const u = a / 2, d = c / 2;
      return this.cacheTranslationX = Math.round(t.width / 2 - u) + u, this.cacheTranslationY = Math.round(t.height / 2 - d) + d, e.translate(this.cacheTranslationX, this.cacheTranslationY), e.scale(n, o), this.zoomX = n, this.zoomY = o, !0;
    }
    return !1;
  }
  setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this._setOptions(t);
  }
  transform(t) {
    const e = this.group && !this.group._transformDone || this.group && this.canvas && t === this.canvas.contextTop, s = this.calcTransformMatrix(!e);
    t.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
  }
  getObjectScaling() {
    if (!this.group) return new _(Math.abs(this.scaleX), Math.abs(this.scaleY));
    const t = hs(this.calcTransformMatrix());
    return new _(Math.abs(t.scaleX), Math.abs(t.scaleY));
  }
  getTotalObjectScaling() {
    const t = this.getObjectScaling();
    if (this.canvas) {
      const e = this.canvas.getZoom(), s = this.getCanvasRetinaScaling();
      return t.scalarMultiply(e * s);
    }
    return t;
  }
  getObjectOpacity() {
    let t = this.opacity;
    return this.group && (t *= this.group.getObjectOpacity()), t;
  }
  _constrainScale(t) {
    return Math.abs(t) < this.minScaleLimit ? t < 0 ? -this.minScaleLimit : this.minScaleLimit : t === 0 ? 1e-4 : t;
  }
  _set(t, e) {
    t !== ut && t !== bt || (e = this._constrainScale(e)), t === ut && e < 0 ? (this.flipX = !this.flipX, e *= -1) : t === "scaleY" && e < 0 ? (this.flipY = !this.flipY, e *= -1) : t !== "shadow" || !e || e instanceof ie || (e = new ie(e));
    const s = this[t] !== e;
    return this[t] = e, s && this.constructor.cacheProperties.includes(t) && (this.dirty = !0), this.parent && (this.dirty || s && this.constructor.stateProperties.includes(t)) && this.parent._set("dirty", !0), this;
  }
  isNotVisible() {
    return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
  }
  render(t) {
    this.isNotVisible() || this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (t.save(), this._setupCompositeOperation(t), this.drawSelectionBackground(t), this.transform(t), this._setOpacity(t), this._setShadow(t), this.shouldCache() ? (this.renderCache(), this.drawCacheOnCanvas(t)) : (this._removeCacheCanvas(), this.drawObject(t, !1, {}), this.dirty = !1), t.restore());
  }
  drawSelectionBackground(t) {
  }
  renderCache(t) {
    if (t = t || {}, this._cacheCanvas && this._cacheContext || this._createCacheCanvas(), this.isCacheDirty() && this._cacheContext) {
      const { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: n } = this, { width: o, height: a } = this._cacheCanvas;
      this.drawObject(this._cacheContext, t.forClipping, { zoomX: e, zoomY: s, cacheTranslationX: r, cacheTranslationY: n, width: o, height: a, parentClipPaths: [] }), this.dirty = !1;
    }
  }
  _removeCacheCanvas() {
    this._cacheCanvas = void 0, this._cacheContext = null;
  }
  hasStroke() {
    return this.stroke && this.stroke !== "transparent" && this.strokeWidth !== 0;
  }
  hasFill() {
    return this.fill && this.fill !== "transparent";
  }
  needsItsOwnCache() {
    return !!(this.paintFirst === pt && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath;
  }
  shouldCache() {
    return this.ownCaching = this.objectCaching && (!this.parent || !this.parent.isOnACache()) || this.needsItsOwnCache(), this.ownCaching;
  }
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
  }
  drawClipPathOnCache(t, e, s) {
    t.save(), e.inverted ? t.globalCompositeOperation = "destination-out" : t.globalCompositeOperation = "destination-in", t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(s, 0, 0), t.restore();
  }
  drawObject(t, e, s) {
    const r = this.fill, n = this.stroke;
    e ? (this.fill = "black", this.stroke = "", this._setClippingProperties(t)) : this._renderBackground(t), this._render(t), this._drawClipPath(t, this.clipPath, s), this.fill = r, this.stroke = n;
  }
  createClipPathLayer(t, e) {
    const s = Rt(e), r = s.getContext("2d");
    if (r.translate(e.cacheTranslationX, e.cacheTranslationY), r.scale(e.zoomX, e.zoomY), t._cacheCanvas = s, e.parentClipPaths.forEach((n) => {
      n.transform(r);
    }), e.parentClipPaths.push(t), t.absolutePositioned) {
      const n = yt(this.calcTransformMatrix());
      r.transform(n[0], n[1], n[2], n[3], n[4], n[5]);
    }
    return t.transform(r), t.drawObject(r, !0, e), s;
  }
  _drawClipPath(t, e, s) {
    if (!e) return;
    e._transformDone = !0;
    const r = this.createClipPathLayer(e, s);
    this.drawClipPathOnCache(t, e, r);
  }
  drawCacheOnCanvas(t) {
    t.scale(1 / this.zoomX, 1 / this.zoomY), t.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
  }
  isCacheDirty() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
    if (this.isNotVisible()) return !1;
    const e = this._cacheCanvas, s = this._cacheContext;
    return !(!e || !s || t || !this._updateCacheCanvas()) || !!(this.dirty || this.clipPath && this.clipPath.absolutePositioned) && (e && s && !t && (s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, e.width, e.height), s.restore()), !0);
  }
  _renderBackground(t) {
    if (!this.backgroundColor) return;
    const e = this._getNonTransformedDimensions();
    t.fillStyle = this.backgroundColor, t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y), this._removeShadow(t);
  }
  _setOpacity(t) {
    this.group && !this.group._transformDone ? t.globalAlpha = this.getObjectOpacity() : t.globalAlpha *= this.opacity;
  }
  _setStrokeStyles(t, e) {
    const s = e.stroke;
    s && (t.lineWidth = e.strokeWidth, t.lineCap = e.strokeLineCap, t.lineDashOffset = e.strokeDashOffset, t.lineJoin = e.strokeLineJoin, t.miterLimit = e.strokeMiterLimit, xt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? this._applyPatternForTransformedGradient(t, s) : (t.strokeStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.strokeStyle = e.stroke);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    s && (xt(s) ? (t.fillStyle = s.toLive(t), this._applyPatternGradientTransform(t, s)) : t.fillStyle = s);
  }
  _setClippingProperties(t) {
    t.globalAlpha = 1, t.strokeStyle = "transparent", t.fillStyle = "#000000";
  }
  _setLineDash(t, e) {
    e && e.length !== 0 && t.setLineDash(e);
  }
  _setShadow(t) {
    if (!this.shadow) return;
    const e = this.shadow, s = this.canvas, r = this.getCanvasRetinaScaling(), [n, , , o] = (s == null ? void 0 : s.viewportTransform) || lt, a = n * r, c = o * r, h = e.nonScaling ? new _(1, 1) : this.getObjectScaling();
    t.shadowColor = e.color, t.shadowBlur = e.blur * E.browserShadowBlurConstant * (a + c) * (h.x + h.y) / 4, t.shadowOffsetX = e.offsetX * a * h.x, t.shadowOffsetY = e.offsetY * c * h.y;
  }
  _removeShadow(t) {
    this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0);
  }
  _applyPatternGradientTransform(t, e) {
    if (!xt(e)) return { offsetX: 0, offsetY: 0 };
    const s = e.gradientTransform || e.patternTransform, r = -this.width / 2 + e.offsetX || 0, n = -this.height / 2 + e.offsetY || 0;
    return e.gradientUnits === "percentage" ? t.transform(this.width, 0, 0, this.height, r, n) : t.transform(1, 0, 0, 1, r, n), s && t.transform(s[0], s[1], s[2], s[3], s[4], s[5]), { offsetX: r, offsetY: n };
  }
  _renderPaintInOrder(t) {
    this.paintFirst === pt ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t));
  }
  _render(t) {
  }
  _renderFill(t) {
    this.fill && (t.save(), this._setFillStyles(t, this), this.fillRule === "evenodd" ? t.fill("evenodd") : t.fill(), t.restore());
  }
  _renderStroke(t) {
    if (this.stroke && this.strokeWidth !== 0) {
      if (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeUniform) {
        const e = this.getObjectScaling();
        t.scale(1 / e.x, 1 / e.y);
      }
      this._setLineDash(t, this.strokeDashArray), this._setStrokeStyles(t, this), t.stroke(), t.restore();
    }
  }
  _applyPatternForTransformedGradient(t, e) {
    var s;
    const r = this._limitCacheSize(this._getCacheCanvasDimensions()), n = this.getCanvasRetinaScaling(), o = r.x / this.scaleX / n, a = r.y / this.scaleY / n, c = Rt({ width: Math.ceil(o), height: Math.ceil(a) }), h = c.getContext("2d");
    h && (h.beginPath(), h.moveTo(0, 0), h.lineTo(o, 0), h.lineTo(o, a), h.lineTo(0, a), h.closePath(), h.translate(o / 2, a / 2), h.scale(r.zoomX / this.scaleX / n, r.zoomY / this.scaleY / n), this._applyPatternGradientTransform(h, e), h.fillStyle = e.toLive(t), h.fill(), t.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2), t.scale(n * this.scaleX / r.zoomX, n * this.scaleY / r.zoomY), t.strokeStyle = (s = h.createPattern(c, "no-repeat")) !== null && s !== void 0 ? s : "");
  }
  _findCenterFromElement() {
    return new _(this.left + this.width / 2, this.top + this.height / 2);
  }
  clone(t) {
    const e = this.toObject(t);
    return this.constructor.fromObject(e);
  }
  cloneAsImage(t) {
    const e = this.toCanvasElement(t);
    return new (O.getClass("image"))(e);
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const e = Mn(this), s = this.group, r = this.shadow, n = Math.abs, o = t.enableRetinaScaling ? xa() : 1, a = (t.multiplier || 1) * o, c = t.canvasProvider || ((T) => new Ks(T, { enableRetinaScaling: !1, renderOnAddRemove: !1, skipOffscreen: !1 }));
    delete this.group, t.withoutTransform && Ha(this), t.withoutShadow && (this.shadow = null), t.viewportTransform && Ni(this, this.getViewportTransform()), this.setCoords();
    const h = St(), l = this.getBoundingRect(), u = this.shadow, d = new _();
    if (u) {
      const T = u.blur, w = u.nonScaling ? new _(1, 1) : this.getObjectScaling();
      d.x = 2 * Math.round(n(u.offsetX) + T) * n(w.x), d.y = 2 * Math.round(n(u.offsetY) + T) * n(w.y);
    }
    const g = l.width + d.x, f = l.height + d.y;
    h.width = Math.ceil(g), h.height = Math.ceil(f);
    const p = c(h);
    t.format === "jpeg" && (p.backgroundColor = "#fff"), this.setPositionByOrigin(new _(p.width / 2, p.height / 2), j, j);
    const m = this.canvas;
    p._objects = [this], this.set("canvas", p), this.setCoords();
    const b = p.toCanvasElement(a || 1, t);
    return this.set("canvas", m), this.shadow = r, s && (this.group = s), this.set(e), this.setCoords(), p._objects = [], p.destroy(), b;
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return wn(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  toBlob() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Sn(this.toCanvasElement(t), t.format || "png", t.quality || 1);
  }
  isType() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    return e.includes(this.constructor.type) || e.includes(this.type);
  }
  complexity() {
    return 1;
  }
  toJSON() {
    return this.toObject();
  }
  rotate(t) {
    const { centeredRotation: e, originX: s, originY: r } = this;
    if (e) {
      const { x: n, y: o } = this.getRelativeCenterPoint();
      this.originX = j, this.originY = j, this.left = n, this.top = o;
    }
    if (this.set("angle", t), e) {
      const { x: n, y: o } = this.translateToOriginPoint(this.getRelativeCenterPoint(), s, r);
      this.left = n, this.top = o, this.originX = s, this.originY = r;
    }
  }
  setOnGroup() {
  }
  _setupCompositeOperation(t) {
    this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation);
  }
  dispose() {
    Br.cancelByTarget(this), this.off(), this._set("canvas", void 0), this._cacheCanvas && Ht().dispose(this._cacheCanvas), this._cacheCanvas = void 0, this._cacheContext = null;
  }
  animate(t, e) {
    return Object.entries(t).reduce((s, r) => {
      let [n, o] = r;
      return s[n] = this._animate(n, o, e), s;
    }, {});
  }
  _animate(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = t.split("."), n = this.constructor.colorProperties.includes(r[r.length - 1]), { abort: o, startValue: a, onChange: c, onComplete: h } = s, l = v(v({}, s), {}, { target: this, startValue: a ?? r.reduce((u, d) => u[d], this), endValue: e, abort: o == null ? void 0 : o.bind(this), onChange: (u, d, g) => {
      r.reduce((f, p, m) => (m === r.length - 1 && (f[p] = u), f[p]), this), c && c(u, d, g);
    }, onComplete: (u, d, g) => {
      this.setCoords(), h && h(u, d, g);
    } });
    return n ? Za(l) : An(l);
  }
  isDescendantOf(t) {
    const { parent: e, group: s } = this;
    return e === t || s === t || !!e && e.isDescendantOf(t) || !!s && s !== e && s.isDescendantOf(t);
  }
  getAncestors() {
    const t = [];
    let e = this;
    do
      e = e.parent, e && t.push(e);
    while (e);
    return t;
  }
  findCommonAncestors(t) {
    if (this === t) return { fork: [], otherFork: [], common: [this, ...this.getAncestors()] };
    const e = this.getAncestors(), s = t.getAncestors();
    if (e.length === 0 && s.length > 0 && this === s[s.length - 1]) return { fork: [], otherFork: [t, ...s.slice(0, s.length - 1)], common: [this] };
    for (let r, n = 0; n < e.length; n++) {
      if (r = e[n], r === t) return { fork: [this, ...e.slice(0, n)], otherFork: [], common: e.slice(n) };
      for (let o = 0; o < s.length; o++) {
        if (this === s[o]) return { fork: [], otherFork: [t, ...s.slice(0, o)], common: [this, ...e] };
        if (r === s[o]) return { fork: [this, ...e.slice(0, n)], otherFork: [t, ...s.slice(0, o)], common: e.slice(n) };
      }
    }
    return { fork: [this, ...e], otherFork: [t, ...s], common: [] };
  }
  hasCommonAncestors(t) {
    const e = this.findCommonAncestors(t);
    return e && !!e.common.length;
  }
  isInFrontOf(t) {
    if (this === t) return;
    const e = this.findCommonAncestors(t);
    if (e.fork.includes(t)) return !0;
    if (e.otherFork.includes(this)) return !1;
    const s = e.common[0] || this.canvas;
    if (!s) return;
    const r = e.fork.pop(), n = e.otherFork.pop(), o = s._objects.indexOf(r), a = s._objects.indexOf(n);
    return o > -1 && o > a;
  }
  toObject() {
    const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).concat(Pr.customProperties, this.constructor.customProperties || []);
    let e;
    const s = E.NUM_FRACTION_DIGITS, { clipPath: r, fill: n, stroke: o, shadow: a, strokeDashArray: c, left: h, top: l, originX: u, originY: d, width: g, height: f, strokeWidth: p, strokeLineCap: m, strokeDashOffset: b, strokeLineJoin: T, strokeUniform: w, strokeMiterLimit: S, scaleX: C, scaleY: k, angle: D, flipX: M, flipY: P, opacity: X, visible: et, backgroundColor: q, fillRule: R, paintFirst: G, globalCompositeOperation: mt, skewX: dt, skewY: Ot } = this;
    r && !r.excludeFromExport && (e = r.toObject(t.concat("inverted", "absolutePositioned")));
    const N = (qt) => z(qt, s), Lt = v(v({}, He(this, t)), {}, { type: this.constructor.type, version: Hi, originX: u, originY: d, left: N(h), top: N(l), width: N(g), height: N(f), fill: oo(n) ? n.toObject() : n, stroke: oo(o) ? o.toObject() : o, strokeWidth: N(p), strokeDashArray: c && c.concat(), strokeLineCap: m, strokeDashOffset: b, strokeLineJoin: T, strokeUniform: w, strokeMiterLimit: N(S), scaleX: N(C), scaleY: N(k), angle: N(D), flipX: M, flipY: P, opacity: N(X), shadow: a && a.toObject(), visible: et, backgroundColor: q, fillRule: R, paintFirst: G, globalCompositeOperation: mt, skewX: N(dt), skewY: N(Ot) }, e ? { clipPath: e } : null);
    return this.includeDefaultValues ? Lt : this._removeDefaultValues(Lt);
  }
  toDatalessObject(t) {
    return this.toObject(t);
  }
  _removeDefaultValues(t) {
    const e = this.constructor.getDefaults(), s = Object.keys(e).length > 0 ? e : Object.getPrototypeOf(this);
    return kn(t, (r, n) => {
      if (n === A || n === gt || n === "type") return !0;
      const o = s[n];
      return r !== o && !(Array.isArray(r) && Array.isArray(o) && r.length === 0 && o.length === 0);
    });
  }
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }
  static _fromObject(t) {
    let e = H(t, $l), s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { extraParam: r } = s, n = H(s, ql);
    return qs(e, n).then((o) => r ? (delete o[r], new this(e[r], o)) : new this(o));
  }
  static fromObject(t, e) {
    return this._fromObject(t, e);
  }
};
y(Kt, "stateProperties", Fl), y(Kt, "cacheProperties", ae), y(Kt, "ownDefaults", Ll), y(Kt, "type", "FabricObject"), y(Kt, "colorProperties", [st, pt, "backgroundColor"]), y(Kt, "customProperties", []), O.setClass(Kt), O.setClass(Kt, "object");
const Ce = (i, t, e) => (s, r, n, o) => {
  const a = t(s, r, n, o);
  return a && Dn(i, v(v({}, jn(s, r, n, o)), e)), a;
};
function Ye(i) {
  return (t, e, s, r) => {
    const { target: n, originX: o, originY: a } = e, c = n.getRelativeCenterPoint(), h = n.translateToOriginPoint(c, o, a), l = i(t, e, s, r);
    return n.setPositionByOrigin(h, e.originX, e.originY), l;
  };
}
const qi = Ce(Ls, Ye((i, t, e, s) => {
  const r = ni(t, t.originX, t.originY, e, s);
  if (Q(t.originX) === Q(j) || Q(t.originX) === Q(K) && r.x < 0 || Q(t.originX) === Q(A) && r.x > 0) {
    const { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = Va(t) ? 2 : 1, c = n.width, h = Math.abs(r.x * a / n.scaleX) - o;
    return n.set("width", Math.max(h, 1)), c !== n.width;
  }
  return !1;
}));
function Qa(i, t, e, s, r) {
  s = s || {};
  const n = this.sizeX || s.cornerSize || r.cornerSize, o = this.sizeY || s.cornerSize || r.cornerSize, a = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, c = a ? pt : st, h = !a && (s.cornerStrokeColor || r.cornerStrokeColor);
  let l, u = t, d = e;
  i.save(), i.fillStyle = s.cornerColor || r.cornerColor || "", i.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", n > o ? (l = n, i.scale(1, o / n), d = e * n / o) : o > n ? (l = o, i.scale(n / o, 1), u = t * o / n) : l = n, i.beginPath(), i.arc(u, d, l / 2, 0, oe, !1), i[c](), h && i.stroke(), i.restore();
}
function tc(i, t, e, s, r) {
  s = s || {};
  const n = this.sizeX || s.cornerSize || r.cornerSize, o = this.sizeY || s.cornerSize || r.cornerSize, a = s.transparentCorners !== void 0 ? s.transparentCorners : r.transparentCorners, c = a ? pt : st, h = !a && (s.cornerStrokeColor || r.cornerStrokeColor), l = n / 2, u = o / 2;
  i.save(), i.fillStyle = s.cornerColor || r.cornerColor || "", i.strokeStyle = s.cornerStrokeColor || r.cornerStrokeColor || "", i.translate(t, e);
  const d = r.getTotalAngle();
  i.rotate(U(d)), i["".concat(c, "Rect")](-l, -u, n, o), h && i.strokeRect(-l, -u, n, o), i.restore();
}
class V {
  constructor(t) {
    y(this, "visible", !0), y(this, "actionName", ei), y(this, "angle", 0), y(this, "x", 0), y(this, "y", 0), y(this, "offsetX", 0), y(this, "offsetY", 0), y(this, "sizeX", 0), y(this, "sizeY", 0), y(this, "touchSizeX", 0), y(this, "touchSizeY", 0), y(this, "cursorStyle", "crosshair"), y(this, "withConnection", !1), Object.assign(this, t);
  }
  shouldActivate(t, e, s, r) {
    var n;
    let { tl: o, tr: a, br: c, bl: h } = r;
    return ((n = e.canvas) === null || n === void 0 ? void 0 : n.getActiveObject()) === e && e.isControlVisible(t) && Y.isPointInPolygon(s, [o, a, c, h]);
  }
  getActionHandler(t, e, s) {
    return this.actionHandler;
  }
  getMouseDownHandler(t, e, s) {
    return this.mouseDownHandler;
  }
  getMouseUpHandler(t, e, s) {
    return this.mouseUpHandler;
  }
  cursorStyleHandler(t, e, s) {
    return e.cursorStyle;
  }
  getActionName(t, e, s) {
    return e.actionName;
  }
  getVisibility(t, e) {
    var s, r;
    return (s = (r = t._controlsVisibility) === null || r === void 0 ? void 0 : r[e]) !== null && s !== void 0 ? s : this.visible;
  }
  setVisibility(t, e, s) {
    this.visible = t;
  }
  positionHandler(t, e, s, r) {
    return new _(this.x * t.x + this.offsetX, this.y * t.y + this.offsetY).transform(e);
  }
  calcCornerCoords(t, e, s, r, n, o) {
    const a = si([ms(s, r), vs({ angle: t }), ri((n ? this.touchSizeX : this.sizeX) || e, (n ? this.touchSizeY : this.sizeY) || e)]);
    return { tl: new _(-0.5, -0.5).transform(a), tr: new _(0.5, -0.5).transform(a), br: new _(0.5, 0.5).transform(a), bl: new _(-0.5, 0.5).transform(a) };
  }
  render(t, e, s, r, n) {
    ((r = r || {}).cornerStyle || n.cornerStyle) === "circle" ? Qa.call(this, t, e, s, r, n) : tc.call(this, t, e, s, r, n);
  }
}
const ec = (i, t, e) => e.lockRotation ? Xr : t.cursorStyle, sc = Ce(Sa, Ye((i, t, e, s) => {
  let { target: r, ex: n, ey: o, theta: a, originX: c, originY: h } = t;
  const l = r.translateToOriginPoint(r.getRelativeCenterPoint(), c, h);
  if (Et(r, "lockRotation")) return !1;
  const u = Math.atan2(o - l.y, n - l.x), d = Math.atan2(s - l.y, e - l.x);
  let g = _e(d - u + a);
  if (r.snapAngle && r.snapAngle > 0) {
    const p = r.snapAngle, m = r.snapThreshold || p, b = Math.ceil(g / p) * p, T = Math.floor(g / p) * p;
    Math.abs(g - T) < m ? g = T : Math.abs(g - b) < m && (g = b);
  }
  g < 0 && (g = 360 + g), g %= 360;
  const f = r.angle !== g;
  return r.angle = g, f;
}));
function rc(i, t) {
  const e = t.canvas, s = i[e.uniScaleKey];
  return e.uniformScaling && !s || !e.uniformScaling && s;
}
function ic(i, t, e) {
  const s = Et(i, "lockScalingX"), r = Et(i, "lockScalingY");
  if (s && r || !t && (s || r) && e || s && t === "x" || r && t === "y") return !0;
  const { width: n, height: o, strokeWidth: a } = i;
  return n === 0 && a === 0 && t !== "y" || o === 0 && a === 0 && t !== "x";
}
const Kl = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"], Ke = (i, t, e) => {
  const s = rc(i, e);
  if (ic(e, t.x !== 0 && t.y === 0 ? "x" : t.x === 0 && t.y !== 0 ? "y" : "", s)) return Xr;
  const r = Ga(e, t);
  return "".concat(Kl[r], "-resize");
};
function Rn(i, t, e, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
  const n = t.target, o = r.by, a = rc(i, n);
  let c, h, l, u, d, g;
  if (ic(n, o, a)) return !1;
  if (t.gestureScale) h = t.scaleX * t.gestureScale, l = t.scaleY * t.gestureScale;
  else {
    if (c = ni(t, t.originX, t.originY, e, s), d = o !== "y" ? Math.sign(c.x || t.signX || 1) : 1, g = o !== "x" ? Math.sign(c.y || t.signY || 1) : 1, t.signX || (t.signX = d), t.signY || (t.signY = g), Et(n, "lockScalingFlip") && (t.signX !== d || t.signY !== g)) return !1;
    if (u = n._getTransformedDimensions(), a && !o) {
      const m = Math.abs(c.x) + Math.abs(c.y), { original: b } = t, T = m / (Math.abs(u.x * b.scaleX / n.scaleX) + Math.abs(u.y * b.scaleY / n.scaleY));
      h = b.scaleX * T, l = b.scaleY * T;
    } else h = Math.abs(c.x * n.scaleX / u.x), l = Math.abs(c.y * n.scaleY / u.y);
    Va(t) && (h *= 2, l *= 2), t.signX !== d && o !== "y" && (t.originX = ho(t.originX), h *= -1, t.signX = d), t.signY !== g && o !== "x" && (t.originY = ho(t.originY), l *= -1, t.signY = g);
  }
  const f = n.scaleX, p = n.scaleY;
  return o ? (o === "x" && n.set(ut, h), o === "y" && n.set(bt, l)) : (!Et(n, "lockScalingX") && n.set(ut, h), !Et(n, "lockScalingY") && n.set(bt, l)), f !== n.scaleX || p !== n.scaleY;
}
const Ss = Ce(ti, Ye((i, t, e, s) => Rn(i, t, e, s))), nc = Ce(ti, Ye((i, t, e, s) => Rn(i, t, e, s, { by: "x" }))), oc = Ce(ti, Ye((i, t, e, s) => Rn(i, t, e, s, { by: "y" }))), Jl = ["target", "ex", "ey", "skewingSide"], Mi = { x: { counterAxis: "y", scale: ut, skew: fs, lockSkewing: "lockSkewingX", origin: "originX", flip: "flipX" }, y: { counterAxis: "x", scale: bt, skew: ps, lockSkewing: "lockSkewingY", origin: "originY", flip: "flipY" } }, Zl = ["ns", "nesw", "ew", "nwse"], ac = (i, t, e) => {
  if (t.x !== 0 && Et(e, "lockSkewingY") || t.y !== 0 && Et(e, "lockSkewingX")) return Xr;
  const s = Ga(e, t) % 4;
  return "".concat(Zl[s], "-resize");
};
function cc(i, t, e, s, r) {
  const { target: n } = e, { counterAxis: o, origin: a, lockSkewing: c, skew: h, flip: l } = Mi[i];
  if (Et(n, c)) return !1;
  const { origin: u, flip: d } = Mi[o], g = Q(e[u]) * (n[d] ? -1 : 1), f = -Math.sign(g) * (n[l] ? -1 : 1), p = 0.5 * -((n[h] === 0 && ni(e, j, j, s, r)[i] > 0 || n[h] > 0 ? 1 : -1) * f) + 0.5;
  return Ce(Ca, Ye((b, T, w, S) => function(C, k, D) {
    let { target: M, ex: P, ey: X, skewingSide: et } = k, q = H(k, Jl);
    const { skew: R } = Mi[C], G = D.subtract(new _(P, X)).divide(new _(M.scaleX, M.scaleY))[C], mt = M[R], dt = q[R], Ot = Math.tan(U(dt)), N = C === "y" ? M._getTransformedDimensions({ scaleX: 1, scaleY: 1, skewX: 0 }).x : M._getTransformedDimensions({ scaleX: 1, scaleY: 1 }).y, Lt = 2 * G * et / Math.max(N, 1) + Ot, qt = _e(Math.atan(Lt));
    M.set(R, qt);
    const rr = mt !== M[R];
    if (rr && C === "y") {
      const { skewX: _i, scaleX: _s } = M, ue = M._getTransformedDimensions({ skewY: mt }), ir = M._getTransformedDimensions(), ke = _i !== 0 ? ue.x / ir.x : 1;
      ke !== 1 && M.set(ut, ke * _s);
    }
    return rr;
  }(i, T, new _(w, S))))(t, v(v({}, e), {}, { [a]: p, skewingSide: f }), s, r);
}
const hc = (i, t, e, s) => cc("x", i, t, e, s), lc = (i, t, e, s) => cc("y", i, t, e, s);
function ci(i, t) {
  return i[t.canvas.altActionKey];
}
const Cs = (i, t, e) => {
  const s = ci(i, e);
  return t.x === 0 ? s ? fs : bt : t.y === 0 ? s ? ps : ut : "";
}, Ie = (i, t, e) => ci(i, e) ? ac(0, t, e) : Ke(i, t, e), Ki = (i, t, e, s) => ci(i, t.target) ? lc(i, t, e, s) : nc(i, t, e, s), Ji = (i, t, e, s) => ci(i, t.target) ? hc(i, t, e, s) : oc(i, t, e, s), Fn = () => ({ ml: new V({ x: -0.5, y: 0, cursorStyleHandler: Ie, actionHandler: Ki, getActionName: Cs }), mr: new V({ x: 0.5, y: 0, cursorStyleHandler: Ie, actionHandler: Ki, getActionName: Cs }), mb: new V({ x: 0, y: 0.5, cursorStyleHandler: Ie, actionHandler: Ji, getActionName: Cs }), mt: new V({ x: 0, y: -0.5, cursorStyleHandler: Ie, actionHandler: Ji, getActionName: Cs }), tl: new V({ x: -0.5, y: -0.5, cursorStyleHandler: Ke, actionHandler: Ss }), tr: new V({ x: 0.5, y: -0.5, cursorStyleHandler: Ke, actionHandler: Ss }), bl: new V({ x: -0.5, y: 0.5, cursorStyleHandler: Ke, actionHandler: Ss }), br: new V({ x: 0.5, y: 0.5, cursorStyleHandler: Ke, actionHandler: Ss }), mtr: new V({ x: 0, y: -0.5, actionHandler: sc, cursorStyleHandler: ec, offsetY: -40, withConnection: !0, actionName: Tn }) }), uc = () => ({ mr: new V({ x: 0.5, y: 0, actionHandler: qi, cursorStyleHandler: Ie, actionName: Ls }), ml: new V({ x: -0.5, y: 0, actionHandler: qi, cursorStyleHandler: Ie, actionName: Ls }) }), dc = () => v(v({}, Fn()), uc());
class Xs extends Kt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Xs.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, this.constructor.createControls(), Xs.ownDefaults), this.setOptions(t);
  }
  static createControls() {
    return { controls: Fn() };
  }
  _updateCacheCanvas() {
    const t = this.canvas;
    if (this.noScaleCache && t && t._currentTransform) {
      const e = t._currentTransform, s = e.target, r = e.action;
      if (this === s && r && r.startsWith(ei)) return !1;
    }
    return super._updateCacheCanvas();
  }
  getActiveControl() {
    const t = this.__corner;
    return t ? { key: t, control: this.controls[t], coord: this.oCoords[t] } : void 0;
  }
  findControl(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    if (!this.hasControls || !this.canvas) return;
    this.__corner = void 0;
    const s = Object.entries(this.oCoords);
    for (let r = s.length - 1; r >= 0; r--) {
      const [n, o] = s[r], a = this.controls[n];
      if (a.shouldActivate(n, this, t, e ? o.touchCorner : o.corner)) return this.__corner = n, { key: n, control: a, coord: this.oCoords[n] };
    }
  }
  calcOCoords() {
    const t = this.getViewportTransform(), e = this.getCenterPoint(), s = ms(e.x, e.y), r = vs({ angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0) }), n = $(s, r), o = $(t, n), a = $(o, [1 / t[0], 0, 0, 1 / t[3], 0, 0]), c = this.group ? hs(this.calcTransformMatrix()) : void 0;
    c && (c.scaleX = Math.abs(c.scaleX), c.scaleY = Math.abs(c.scaleY));
    const h = this._calculateCurrentDimensions(c), l = {};
    return this.forEachControl((u, d) => {
      const g = u.positionHandler(h, a, this, u);
      l[d] = Object.assign(g, this._calcCornerCoords(u, g));
    }), l;
  }
  _calcCornerCoords(t, e) {
    const s = this.getTotalAngle();
    return { corner: t.calcCornerCoords(s, this.cornerSize, e.x, e.y, !1, this), touchCorner: t.calcCornerCoords(s, this.touchCornerSize, e.x, e.y, !0, this) };
  }
  setCoords() {
    super.setCoords(), this.canvas && (this.oCoords = this.calcOCoords());
  }
  forEachControl(t) {
    for (const e in this.controls) t(this.controls[e], e, this);
  }
  drawSelectionBackground(t) {
    if (!this.selectionBackgroundColor || this.canvas && this.canvas._activeObject !== this) return;
    t.save();
    const e = this.getRelativeCenterPoint(), s = this._calculateCurrentDimensions(), r = this.getViewportTransform();
    t.translate(e.x, e.y), t.scale(1 / r[0], 1 / r[3]), t.rotate(U(this.angle)), t.fillStyle = this.selectionBackgroundColor, t.fillRect(-s.x / 2, -s.y / 2, s.x, s.y), t.restore();
  }
  strokeBorders(t, e) {
    t.strokeRect(-e.x / 2, -e.y / 2, e.x, e.y);
  }
  _drawBorders(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const r = v({ hasControls: this.hasControls, borderColor: this.borderColor, borderDashArray: this.borderDashArray }, s);
    t.save(), t.strokeStyle = r.borderColor, this._setLineDash(t, r.borderDashArray), this.strokeBorders(t, e), r.hasControls && this.drawControlsConnectingLines(t, e), t.restore();
  }
  _renderControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { hasBorders: s, hasControls: r } = this, n = v({ hasBorders: s, hasControls: r }, e), o = this.getViewportTransform(), a = n.hasBorders, c = n.hasControls, h = $(o, this.calcTransformMatrix()), l = hs(h);
    t.save(), t.translate(l.translateX, l.translateY), t.lineWidth = this.borderScaleFactor, this.group === this.parent && (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), this.flipX && (l.angle -= 180), t.rotate(U(this.group ? l.angle : this.angle)), a && this.drawBorders(t, l, e), c && this.drawControls(t, e), t.restore();
  }
  drawBorders(t, e, s) {
    let r;
    if (s && s.forActiveSelection || this.group) {
      const n = ii(this.width, this.height, $s(e)), o = this.isStrokeAccountedForInDimensions() ? xn : (this.strokeUniform ? new _().scalarAdd(this.canvas ? this.canvas.getZoom() : 1) : new _(e.scaleX, e.scaleY)).scalarMultiply(this.strokeWidth);
      r = n.add(o).scalarAdd(this.borderScaleFactor).scalarAdd(2 * this.padding);
    } else r = this._calculateCurrentDimensions().scalarAdd(this.borderScaleFactor);
    this._drawBorders(t, r, s);
  }
  drawControlsConnectingLines(t, e) {
    let s = !1;
    t.beginPath(), this.forEachControl((r, n) => {
      r.withConnection && r.getVisibility(this, n) && (s = !0, t.moveTo(r.x * e.x, r.y * e.y), t.lineTo(r.x * e.x + r.offsetX, r.y * e.y + r.offsetY));
    }), s && t.stroke();
  }
  drawControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    t.save();
    const s = this.getCanvasRetinaScaling(), { cornerStrokeColor: r, cornerDashArray: n, cornerColor: o } = this, a = v({ cornerStrokeColor: r, cornerDashArray: n, cornerColor: o }, e);
    t.setTransform(s, 0, 0, s, 0, 0), t.strokeStyle = t.fillStyle = a.cornerColor, this.transparentCorners || (t.strokeStyle = a.cornerStrokeColor), this._setLineDash(t, a.cornerDashArray), this.forEachControl((c, h) => {
      if (c.getVisibility(this, h)) {
        const l = this.oCoords[h];
        c.render(t, l.x, l.y, a, this);
      }
    }), t.restore();
  }
  isControlVisible(t) {
    return this.controls[t] && this.controls[t].getVisibility(this, t);
  }
  setControlVisible(t, e) {
    this._controlsVisibility || (this._controlsVisibility = {}), this._controlsVisibility[t] = e;
  }
  setControlsVisibility() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Object.entries(t).forEach((e) => {
      let [s, r] = e;
      return this.setControlVisible(s, r);
    });
  }
  clearContextTop(t) {
    if (!this.canvas) return;
    const e = this.canvas.contextTop;
    if (!e) return;
    const s = this.canvas.viewportTransform;
    e.save(), e.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this.transform(e);
    const r = this.width + 4, n = this.height + 4;
    return e.clearRect(-r / 2, -n / 2, r, n), t || e.restore(), e;
  }
  onDeselect(t) {
    return !1;
  }
  onSelect(t) {
    return !1;
  }
  shouldStartDragging(t) {
    return !1;
  }
  onDragStart(t) {
    return !1;
  }
  canDrop(t) {
    return !1;
  }
  renderDragSourceEffect(t) {
  }
  renderDropTargetEffect(t) {
  }
}
function gc(i, t) {
  return t.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      s !== "constructor" && Object.defineProperty(i.prototype, s, Object.getOwnPropertyDescriptor(e.prototype, s) || /* @__PURE__ */ Object.create(null));
    });
  }), i;
}
y(Xs, "ownDefaults", { noScaleCache: !0, lockMovementX: !1, lockMovementY: !1, lockRotation: !1, lockScalingX: !1, lockScalingY: !1, lockSkewingX: !1, lockSkewingY: !1, lockScalingFlip: !1, cornerSize: 13, touchCornerSize: 24, transparentCorners: !0, cornerColor: "rgb(178,204,255)", cornerStrokeColor: "", cornerStyle: "rect", cornerDashArray: null, hasControls: !0, borderColor: "rgb(178,204,255)", borderDashArray: null, borderOpacityWhenMoving: 0.4, borderScaleFactor: 1, hasBorders: !0, selectionBackgroundColor: "", selectable: !0, evented: !0, perPixelTargetFind: !1, activeOn: "down", hoverCursor: null, moveCursor: null });
class ot extends Xs {
}
gc(ot, [Ua]), O.setClass(ot), O.setClass(ot, "object");
const fc = (i, t, e, s) => {
  const r = 2 * (s = Math.round(s)) + 1, { data: n } = i.getImageData(t - s, e - s, r, r);
  for (let o = 3; o < n.length; o += 4)
    if (n[o] > 0) return !1;
  return !0;
};
class pc {
  constructor(t) {
    this.options = t, this.strokeProjectionMagnitude = this.options.strokeWidth / 2, this.scale = new _(this.options.scaleX, this.options.scaleY), this.strokeUniformScalar = this.options.strokeUniform ? new _(1 / this.options.scaleX, 1 / this.options.scaleY) : new _(1, 1);
  }
  createSideVector(t, e) {
    const s = zr(t, e);
    return this.options.strokeUniform ? s.multiply(this.scale) : s;
  }
  projectOrthogonally(t, e, s) {
    return this.applySkew(t.add(this.calcOrthogonalProjection(t, e, s)));
  }
  isSkewed() {
    return this.options.skewX !== 0 || this.options.skewY !== 0;
  }
  applySkew(t) {
    const e = new _(t);
    return e.y += e.x * Math.tan(U(this.options.skewY)), e.x += e.y * Math.tan(U(this.options.skewX)), e;
  }
  scaleUnitVector(t, e) {
    return t.multiply(this.strokeUniformScalar).scalarMultiply(e);
  }
}
const Ql = new _();
class as extends pc {
  static getOrthogonalRotationFactor(t, e) {
    const s = e ? Yr(t, e) : qa(t);
    return Math.abs(s) < ye ? -1 : 1;
  }
  constructor(t, e, s, r) {
    super(r), y(this, "AB", void 0), y(this, "AC", void 0), y(this, "alpha", void 0), y(this, "bisector", void 0), this.A = new _(t), this.B = new _(e), this.C = new _(s), this.AB = this.createSideVector(this.A, this.B), this.AC = this.createSideVector(this.A, this.C), this.alpha = Yr(this.AB, this.AC), this.bisector = ai(In(this.AB.eq(Ql) ? this.AC : this.AB, this.alpha / 2));
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e), n = En(r), o = as.getOrthogonalRotationFactor(n, this.bisector);
    return this.scaleUnitVector(n, s * o);
  }
  projectBevel() {
    const t = [];
    return (this.alpha % oe == 0 ? [this.B] : [this.B, this.C]).forEach((e) => {
      t.push(this.projectOrthogonally(this.A, e)), t.push(this.projectOrthogonally(this.A, e, -this.strokeProjectionMagnitude));
    }), t;
  }
  projectMiter() {
    const t = [], e = Math.abs(this.alpha), s = 1 / Math.sin(e / 2), r = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s), n = this.options.strokeUniform ? Hr(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit)) : this.options.strokeMiterLimit;
    return Hr(r) / this.strokeProjectionMagnitude <= n && t.push(this.applySkew(this.A.add(r))), t.push(...this.projectBevel()), t;
  }
  projectRoundNoSkew(t, e) {
    const s = [], r = new _(as.getOrthogonalRotationFactor(this.bisector), as.getOrthogonalRotationFactor(new _(this.bisector.y, this.bisector.x)));
    return [new _(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r), new _(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(r)].forEach((n) => {
      Ui(n, t, e) && s.push(this.A.add(n));
    }), s;
  }
  projectRoundWithSkew(t, e) {
    const s = [], { skewX: r, skewY: n, scaleX: o, scaleY: a, strokeUniform: c } = this.options, h = new _(Math.tan(U(r)), Math.tan(U(n))), l = this.strokeProjectionMagnitude, u = c ? l / a / Math.sqrt(1 / a ** 2 + 1 / o ** 2 * h.y ** 2) : l / Math.sqrt(1 + h.y ** 2), d = new _(Math.sqrt(Math.max(l ** 2 - u ** 2, 0)), u), g = c ? l / Math.sqrt(1 + h.x ** 2 * (1 / a) ** 2 / (1 / o + 1 / o * h.x * h.y) ** 2) : l / Math.sqrt(1 + h.x ** 2 / (1 + h.x * h.y) ** 2), f = new _(g, Math.sqrt(Math.max(l ** 2 - g ** 2, 0)));
    return [f, f.scalarMultiply(-1), d, d.scalarMultiply(-1)].map((p) => this.applySkew(c ? p.multiply(this.strokeUniformScalar) : p)).forEach((p) => {
      Ui(p, t, e) && s.push(this.applySkew(this.A).add(p));
    }), s;
  }
  projectRound() {
    const t = [];
    t.push(...this.projectBevel());
    const e = this.alpha % oe == 0, s = this.applySkew(this.A), r = t[e ? 0 : 2].subtract(s), n = t[e ? 1 : 0].subtract(s), o = e ? this.applySkew(this.AB.scalarMultiply(-1)) : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)), a = os(r, o) > 0, c = a ? r : n, h = a ? n : r;
    return this.isSkewed() ? t.push(...this.projectRoundWithSkew(c, h)) : t.push(...this.projectRoundNoSkew(c, h)), t;
  }
  projectPoints() {
    switch (this.options.strokeLineJoin) {
      case "miter":
        return this.projectMiter();
      case "round":
        return this.projectRound();
      default:
        return this.projectBevel();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t, angle: this.alpha, bisector: this.bisector }));
  }
}
class vo extends pc {
  constructor(t, e, s) {
    super(s), this.A = new _(t), this.T = new _(e);
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude;
    const r = this.createSideVector(t, e);
    return this.scaleUnitVector(En(r), s);
  }
  projectButt() {
    return [this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude), this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)];
  }
  projectRound() {
    const t = [];
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e = new _(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.applySkew(this.A.add(e)), this.applySkew(this.A.subtract(e)));
    } else t.push(...new as(this.A, this.T, this.T, this.options).projectRound());
    return t;
  }
  projectSquare() {
    const t = [];
    if (this.A.eq(this.T)) {
      const e = new _(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t.push(this.A.add(e), this.A.subtract(e));
    } else {
      const e = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude), s = this.scaleUnitVector(ai(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude), r = this.A.add(s);
      t.push(r.add(e), r.subtract(e));
    }
    return t.map((e) => this.applySkew(e));
  }
  projectPoints() {
    switch (this.options.strokeLineCap) {
      case "round":
        return this.projectRound();
      case "square":
        return this.projectSquare();
      default:
        return this.projectButt();
    }
  }
  project() {
    return this.projectPoints().map((t) => ({ originPoint: this.A, projectedPoint: t }));
  }
}
const mc = function(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  const s = [];
  if (i.length === 0) return s;
  const r = i.reduce((n, o) => (n[n.length - 1].eq(o) || n.push(new _(o)), n), [new _(i[0])]);
  if (r.length === 1) e = !0;
  else if (!e) {
    const n = r[0], o = ((a, c) => {
      for (let h = a.length - 1; h >= 0; h--) if (c(a[h], h, a)) return h;
      return -1;
    })(r, (a) => !a.eq(n));
    r.splice(o + 1);
  }
  return r.forEach((n, o, a) => {
    let c, h;
    o === 0 ? (h = a[1], c = e ? n : a[a.length - 1]) : o === a.length - 1 ? (c = a[o - 1], h = e ? n : a[0]) : (c = a[o - 1], h = a[o + 1]), e && a.length === 1 ? s.push(...new vo(n, n, t).project()) : !e || o !== 0 && o !== a.length - 1 ? s.push(...new as(n, c, h, t).project()) : s.push(...new vo(n, o === 0 ? h : c, t).project());
  }), s;
}, Ln = (i) => {
  const t = {};
  return Object.keys(i).forEach((e) => {
    t[e] = {}, Object.keys(i[e]).forEach((s) => {
      t[e][s] = v({}, i[e][s]);
    });
  }), t;
}, vc = (i) => i.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), hi = (i) => {
  const t = [];
  for (let e, s = 0; s < i.length; s++) (e = tu(i, s)) !== !1 && t.push(e);
  return t;
}, tu = (i, t) => {
  const e = i.charCodeAt(t);
  if (isNaN(e)) return "";
  if (e < 55296 || e > 57343) return i.charAt(t);
  if (55296 <= e && e <= 56319) {
    if (i.length <= t + 1) throw "High surrogate without following low surrogate";
    const r = i.charCodeAt(t + 1);
    if (56320 > r || r > 57343) throw "High surrogate without following low surrogate";
    return i.charAt(t) + i.charAt(t + 1);
  }
  if (t === 0) throw "Low surrogate without preceding high surrogate";
  const s = i.charCodeAt(t - 1);
  if (55296 > s || s > 56319) throw "Low surrogate without preceding high surrogate";
  return !1;
};
var eu = Object.freeze({ __proto__: null, capitalize: function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
  return "".concat(i.charAt(0).toUpperCase()).concat(t ? i.slice(1) : i.slice(1).toLowerCase());
}, escapeXml: vc, graphemeSplit: hi });
const li = function(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
  return i.fill !== t.fill || i.stroke !== t.stroke || i.strokeWidth !== t.strokeWidth || i.fontSize !== t.fontSize || i.fontFamily !== t.fontFamily || i.fontWeight !== t.fontWeight || i.fontStyle !== t.fontStyle || i.textBackgroundColor !== t.textBackgroundColor || i.deltaY !== t.deltaY || e && (i.overline !== t.overline || i.underline !== t.underline || i.linethrough !== t.linethrough);
}, yc = (i, t) => {
  const e = t.split(`
`), s = [];
  let r = -1, n = {};
  i = Ln(i);
  for (let o = 0; o < e.length; o++) {
    const a = hi(e[o]);
    if (i[o]) for (let c = 0; c < a.length; c++) {
      r++;
      const h = i[o][c];
      h && Object.keys(h).length > 0 && (li(n, h, !0) ? s.push({ start: r, end: r + 1, style: h }) : s[s.length - 1].end++), n = h || {};
    }
    else r += a.length, n = {};
  }
  return s;
}, bc = (i, t) => {
  if (!Array.isArray(i)) return Ln(i);
  const e = t.split(_n), s = {};
  let r = -1, n = 0;
  for (let o = 0; o < e.length; o++) {
    const a = hi(e[o]);
    for (let c = 0; c < a.length; c++) r++, i[n] && i[n].start <= r && r < i[n].end && (s[o] = s[o] || {}, s[o][c] = v({}, i[n].style), r === i[n].end - 1 && n++);
  }
  return s;
}, Oe = ["display", "transform", st, "fill-opacity", "fill-rule", "opacity", pt, "stroke-dasharray", "stroke-linecap", "stroke-dashoffset", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "vector-effect", "instantiated_by_use", "clip-path"];
function yo(i, t) {
  const e = i.nodeName, s = i.getAttribute("class"), r = i.getAttribute("id"), n = "(?![a-zA-Z\\-]+)";
  let o;
  if (o = new RegExp("^" + e, "i"), t = t.replace(o, ""), r && t.length && (o = new RegExp("#" + r + n, "i"), t = t.replace(o, "")), s && t.length) {
    const a = s.split(" ");
    for (let c = a.length; c--; ) o = new RegExp("\\." + a[c] + n, "i"), t = t.replace(o, "");
  }
  return t.length === 0;
}
function su(i, t) {
  let e = !0;
  const s = yo(i, t.pop());
  return s && t.length && (e = function(r, n) {
    let o, a = !0;
    for (; r.parentElement && r.parentElement.nodeType === 1 && n.length; ) a && (o = n.pop()), a = yo(r = r.parentElement, o);
    return n.length === 0;
  }(i, t)), s && e && t.length === 0;
}
const ru = (i) => {
  var t;
  return (t = Al[i]) !== null && t !== void 0 ? t : i;
}, iu = new RegExp("(".concat(Be, ")"), "gi"), nu = (i) => i.replace(iu, " $1 ").replace(/,/gi, " ").replace(/\s+/gi, " ");
var bo, _o, To, xo, wo, So, Co;
const ht = "(".concat(Be, ")"), ou = String.raw(bo || (bo = Se(["(skewX)(", ")"], ["(skewX)\\(", "\\)"])), ht), au = String.raw(_o || (_o = Se(["(skewY)(", ")"], ["(skewY)\\(", "\\)"])), ht), cu = String.raw(To || (To = Se(["(rotate)(", "(?: ", " ", ")?)"], ["(rotate)\\(", "(?: ", " ", ")?\\)"])), ht, ht, ht), hu = String.raw(xo || (xo = Se(["(scale)(", "(?: ", ")?)"], ["(scale)\\(", "(?: ", ")?\\)"])), ht, ht), lu = String.raw(wo || (wo = Se(["(translate)(", "(?: ", ")?)"], ["(translate)\\(", "(?: ", ")?\\)"])), ht, ht), uu = String.raw(So || (So = Se(["(matrix)(", " ", " ", " ", " ", " ", ")"], ["(matrix)\\(", " ", " ", " ", " ", " ", "\\)"])), ht, ht, ht, ht, ht, ht), Bn = "(?:".concat(uu, "|").concat(lu, "|").concat(cu, "|").concat(hu, "|").concat(ou, "|").concat(au, ")"), du = "(?:".concat(Bn, "*)"), gu = String.raw(Co || (Co = Se(["^s*(?:", "?)s*$"], ["^\\s*(?:", "?)\\s*$"])), du), fu = new RegExp(gu), pu = new RegExp(Bn), mu = new RegExp(Bn, "g");
function Zi(i) {
  const t = [];
  if (!(i = nu(i).replace(/\s*([()])\s*/gi, "$1")) || i && !fu.test(i)) return [...lt];
  for (const e of i.matchAll(mu)) {
    const s = pu.exec(e[0]);
    if (!s) continue;
    let r = lt;
    const n = s.filter((f) => !!f), [, o, ...a] = n, [c, h, l, u, d, g] = a.map((f) => parseFloat(f));
    switch (o) {
      case "translate":
        r = ms(c, h);
        break;
      case Tn:
        r = vs({ angle: c }, { x: h, y: l });
        break;
      case ei:
        r = ri(c, h);
        break;
      case fs:
        r = Cn(c);
        break;
      case ps:
        r = On(c);
        break;
      case "matrix":
        r = [c, h, l, u, d, g];
    }
    t.push(r);
  }
  return si(t);
}
function vu(i, t, e, s) {
  const r = Array.isArray(t);
  let n, o = t;
  if (i !== st && i !== pt || t !== ft) {
    if (i === "strokeUniform") return t === "non-scaling-stroke";
    if (i === "strokeDashArray") o = t === ft ? null : t.replace(/,/g, " ").split(/\s+/).map(parseFloat);
    else if (i === "transformMatrix") o = e && e.transformMatrix ? $(e.transformMatrix, Zi(t)) : Zi(t);
    else if (i === "visible") o = t !== ft && t !== "hidden", e && e.visible === !1 && (o = !1);
    else if (i === "opacity") o = parseFloat(t), e && e.opacity !== void 0 && (o *= e.opacity);
    else if (i === "textAnchor") o = t === "start" ? A : t === "end" ? K : j;
    else if (i === "charSpacing") n = Re(t, s) / s * 1e3;
    else if (i === "paintFirst") {
      const a = t.indexOf(st), c = t.indexOf(pt);
      o = st, (a > -1 && c > -1 && c < a || a === -1 && c > -1) && (o = pt);
    } else {
      if (i === "href" || i === "xlink:href" || i === "font" || i === "id") return t;
      if (i === "imageSmoothing") return t === "optimizeQuality";
      n = r ? t.map(Re) : Re(t, s);
    }
  } else o = "";
  return !r && isNaN(n) ? o : n;
}
function yu(i, t) {
  const e = i.match(Pl);
  if (!e) return;
  const s = e[1], r = e[3], n = e[4], o = e[5], a = e[6];
  s && (t.fontStyle = s), r && (t.fontWeight = isNaN(parseFloat(r)) ? r : parseFloat(r)), n && (t.fontSize = Re(n)), a && (t.fontFamily = a), o && (t.lineHeight = o === "normal" ? 1 : o);
}
function bu(i, t) {
  i.replace(/;\s*$/, "").split(";").forEach((e) => {
    if (!e) return;
    const [s, r] = e.split(":");
    t[s.trim().toLowerCase()] = r.trim();
  });
}
function _u(i) {
  const t = {}, e = i.getAttribute("style");
  return e && (typeof e == "string" ? bu(e, t) : function(s, r) {
    Object.entries(s).forEach((n) => {
      let [o, a] = n;
      a !== void 0 && (r[o.toLowerCase()] = a);
    });
  }(e, t)), t;
}
const Tu = { stroke: "strokeOpacity", fill: "fillOpacity" };
function ce(i, t, e) {
  if (!i) return {};
  let s, r = {}, n = bn;
  i.parentNode && uo.test(i.parentNode.nodeName) && (r = ce(i.parentElement, t, e), r.fontSize && (s = n = Re(r.fontSize)));
  const o = v(v(v({}, t.reduce((h, l) => {
    const u = i.getAttribute(l);
    return u && (h[l] = u), h;
  }, {})), function(h) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = {};
    for (const d in l) su(h, d.split(" ")) && (u = v(v({}, u), l[d]));
    return u;
  }(i, e)), _u(i));
  o[Ci] && i.setAttribute(Ci, o[Ci]), o[Si] && (s = Re(o[Si], n), o[Si] = "".concat(s));
  const a = {};
  for (const h in o) {
    const l = ru(h), u = vu(l, o[h], r, s);
    a[l] = u;
  }
  a && a.font && yu(a.font, a);
  const c = v(v({}, r), a);
  return uo.test(i.nodeName) ? c : function(h) {
    const l = ot.getDefaults();
    return Object.entries(Tu).forEach((u) => {
      let [d, g] = u;
      if (h[g] === void 0 || h[d] === "") return;
      if (h[d] === void 0) {
        if (!l[d]) return;
        h[d] = l[d];
      }
      if (h[d].indexOf("url(") === 0) return;
      const f = new F(h[d]);
      h[d] = f.setAlpha(z(f.getAlpha() * h[g], 2)).toRgba();
    }), h;
  }(c);
}
const xu = ["left", "top", "width", "height", "visible"], _c = ["rx", "ry"];
class tt extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), tt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, tt.ownDefaults), this.setOptions(t), this._initRxRy();
  }
  _initRxRy() {
    const { rx: t, ry: e } = this;
    t && !e ? this.ry = t : e && !t && (this.rx = e);
  }
  _render(t) {
    const { width: e, height: s } = this, r = -e / 2, n = -s / 2, o = this.rx ? Math.min(this.rx, e / 2) : 0, a = this.ry ? Math.min(this.ry, s / 2) : 0, c = o !== 0 || a !== 0;
    t.beginPath(), t.moveTo(r + o, n), t.lineTo(r + e - o, n), c && t.bezierCurveTo(r + e - ge * o, n, r + e, n + ge * a, r + e, n + a), t.lineTo(r + e, n + s - a), c && t.bezierCurveTo(r + e, n + s - ge * a, r + e - ge * o, n + s, r + e - o, n + s), t.lineTo(r + o, n + s), c && t.bezierCurveTo(r + ge * o, n + s, r, n + s - ge * a, r, n + s - a), t.lineTo(r, n + a), c && t.bezierCurveTo(r, n + ge * a, r + ge * o, n, r + o, n), t.closePath(), this._renderPaintInOrder(t);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([..._c, ...t]);
  }
  _toSVG() {
    const { width: t, height: e, rx: s, ry: r } = this;
    return ["<rect ", "COMMON_PARTS", 'x="'.concat(-t / 2, '" y="').concat(-e / 2, '" rx="').concat(s, '" ry="').concat(r, '" width="').concat(t, '" height="').concat(e, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = ce(t, this.ATTRIBUTE_NAMES, s), { left: n = 0, top: o = 0, width: a = 0, height: c = 0, visible: h = !0 } = r, l = H(r, xu);
    return new this(v(v(v({}, e), l), {}, { left: n, top: o, width: a, height: c, visible: !!(h && a && c) }));
  }
}
y(tt, "type", "Rect"), y(tt, "cacheProperties", [...ae, ..._c]), y(tt, "ownDefaults", { rx: 0, ry: 0 }), y(tt, "ATTRIBUTE_NAMES", [...Oe, "x", "y", "rx", "ry", "width", "height"]), O.setClass(tt), O.setSVGClass(tt);
const te = "initialization", Vr = "added", Wn = "removed", Gr = "imperative", Tc = (i, t) => {
  const { strokeUniform: e, strokeWidth: s, width: r, height: n, group: o } = t, a = o && o !== i ? Js(o.calcTransformMatrix(), i.calcTransformMatrix()) : null, c = a ? t.getRelativeCenterPoint().transform(a) : t.getRelativeCenterPoint(), h = !t.isStrokeAccountedForInDimensions(), l = e && h ? Ya(new _(s, s), void 0, i.calcTransformMatrix()) : xn, u = !e && h ? s : 0, d = ii(r + u, n + u, si([a, t.calcOwnMatrix()], !0)).add(l).scalarDivide(2);
  return [c.subtract(d), c.add(d)];
};
class ui {
  calcLayoutResult(t, e) {
    if (this.shouldPerformLayout(t)) return this.calcBoundingBox(e, t);
  }
  shouldPerformLayout(t) {
    let { type: e, prevStrategy: s, strategy: r } = t;
    return e === te || e === Gr || !!s && r !== s;
  }
  shouldLayoutClipPath(t) {
    let { type: e, target: { clipPath: s } } = t;
    return e !== te && s && !s.absolutePositioned;
  }
  getInitialSize(t, e) {
    return e.size;
  }
  calcBoundingBox(t, e) {
    const { type: s, target: r } = e;
    if (s === Gr && e.overrides) return e.overrides;
    if (t.length === 0) return;
    const { left: n, top: o, width: a, height: c } = Xt(t.map((u) => Tc(r, u)).reduce((u, d) => u.concat(d), [])), h = new _(a, c), l = new _(n, o).add(h.scalarDivide(2));
    if (s === te) {
      const u = this.getInitialSize(e, { size: h, center: l });
      return { center: l, relativeCorrection: new _(0, 0), size: u };
    }
    return { center: l.transform(r.calcOwnMatrix()), size: h };
  }
}
y(ui, "type", "strategy");
class Qi extends ui {
  shouldPerformLayout(t) {
    return !0;
  }
}
y(Qi, "type", "fit-content"), O.setClass(Qi);
const wu = ["strategy"], Su = ["target", "strategy", "bubbles", "prevStrategy"], xc = "layoutManager";
class zs {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new Qi();
    y(this, "strategy", void 0), this.strategy = t, this._subscriptions = /* @__PURE__ */ new Map();
  }
  performLayout(t) {
    const e = v(v({ bubbles: !0, strategy: this.strategy }, t), {}, { prevStrategy: this._prevLayoutStrategy, stopPropagation() {
      this.bubbles = !1;
    } });
    this.onBeforeLayout(e);
    const s = this.getLayoutResult(e);
    s && this.commitLayout(e, s), this.onAfterLayout(e, s), this._prevLayoutStrategy = e.strategy;
  }
  attachHandlers(t, e) {
    const { target: s } = e;
    return [Lr, wa, Ls, Sa, ti, Ca, Fr, Oa, Ol].map((r) => t.on(r, (n) => this.performLayout(r === Lr ? { type: "object_modified", trigger: r, e: n, target: s } : { type: "object_modifying", trigger: r, e: n, target: s })));
  }
  subscribe(t, e) {
    this.unsubscribe(t, e);
    const s = this.attachHandlers(t, e);
    this._subscriptions.set(t, s);
  }
  unsubscribe(t, e) {
    (this._subscriptions.get(t) || []).forEach((s) => s()), this._subscriptions.delete(t);
  }
  unsubscribeTargets(t) {
    t.targets.forEach((e) => this.unsubscribe(e, t));
  }
  subscribeTargets(t) {
    t.targets.forEach((e) => this.subscribe(e, t));
  }
  onBeforeLayout(t) {
    const { target: e, type: s } = t, { canvas: r } = e;
    if (s === te || s === Vr ? this.subscribeTargets(t) : s === Wn && this.unsubscribeTargets(t), e.fire("layout:before", { context: t }), r && r.fire("object:layout:before", { target: e, context: t }), s === Gr && t.deep) {
      const n = H(t, wu);
      e.forEachObject((o) => o.layoutManager && o.layoutManager.performLayout(v(v({}, n), {}, { bubbles: !1, target: o })));
    }
  }
  getLayoutResult(t) {
    const { target: e, strategy: s, type: r } = t, n = s.calcLayoutResult(t, e.getObjects());
    if (!n) return;
    const o = r === te ? new _() : e.getRelativeCenterPoint(), { center: a, correction: c = new _(), relativeCorrection: h = new _() } = n, l = o.subtract(a).add(c).transform(r === te ? lt : yt(e.calcOwnMatrix()), !0).add(h);
    return { result: n, prevCenter: o, nextCenter: a, offset: l };
  }
  commitLayout(t, e) {
    const { target: s } = t, { result: { size: r }, nextCenter: n } = e;
    var o, a;
    s.set({ width: r.x, height: r.y }), this.layoutObjects(t, e), t.type === te ? s.set({ left: (o = t.x) !== null && o !== void 0 ? o : n.x + r.x * Q(s.originX), top: (a = t.y) !== null && a !== void 0 ? a : n.y + r.y * Q(s.originY) }) : (s.setPositionByOrigin(n, j, j), s.setCoords(), s.set("dirty", !0));
  }
  layoutObjects(t, e) {
    const { target: s } = t;
    s.forEachObject((r) => {
      r.group === s && this.layoutObject(t, e, r);
    }), t.strategy.shouldLayoutClipPath(t) && this.layoutObject(t, e, s.clipPath);
  }
  layoutObject(t, e, s) {
    let { offset: r } = e;
    s.set({ left: s.left + r.x, top: s.top + r.y });
  }
  onAfterLayout(t, e) {
    const { target: s, strategy: r, bubbles: n, prevStrategy: o } = t, a = H(t, Su), { canvas: c } = s;
    s.fire("layout:after", { context: t, result: e }), c && c.fire("object:layout:after", { context: t, result: e, target: s });
    const h = s.parent;
    n && h != null && h.layoutManager && ((a.path || (a.path = [])).push(s), h.layoutManager.performLayout(v(v({}, a), {}, { target: h }))), s.set("dirty", !0);
  }
  dispose() {
    const { _subscriptions: t } = this;
    t.forEach((e) => e.forEach((s) => s())), t.clear();
  }
  toObject() {
    return { type: xc, strategy: this.strategy.constructor.type };
  }
  toJSON() {
    return this.toObject();
  }
}
O.setClass(zs, xc);
const Cu = ["type", "objects", "layoutManager"];
class Ou extends zs {
  performLayout() {
  }
}
class zt extends ka(ot) {
  static getDefaults() {
    return v(v({}, super.getDefaults()), zt.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), y(this, "_activeObjects", []), y(this, "__objectSelectionTracker", void 0), y(this, "__objectSelectionDisposer", void 0), Object.assign(this, zt.ownDefaults), this.setOptions(e), this.groupInit(t, e);
  }
  groupInit(t, e) {
    var s;
    this._objects = [...t], this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, !0), this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, !1), this.forEachObject((r) => {
      this.enterGroup(r, !1);
    }), this.layoutManager = (s = e.layoutManager) !== null && s !== void 0 ? s : new zs(), this.layoutManager.performLayout({ type: te, target: this, targets: [...t], x: e.left, y: e.top });
  }
  canEnterGroup(t) {
    return t === this || this.isDescendantOf(t) ? (ve("error", "Group: circular object trees are not supported, this call has no effect"), !1) : this._objects.indexOf(t) === -1 || (ve("error", "Group: duplicate objects are not supported inside group, this call has no effect"), !1);
  }
  _filterObjectsBeforeEnteringGroup(t) {
    return t.filter((e, s, r) => this.canEnterGroup(e) && r.indexOf(e) === s);
  }
  add() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    const r = this._filterObjectsBeforeEnteringGroup(e), n = super.add(...r);
    return this._onAfterObjectsChange(Vr, r), n;
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) s[r - 1] = arguments[r];
    const n = this._filterObjectsBeforeEnteringGroup(s), o = super.insertAt(t, ...n);
    return this._onAfterObjectsChange(Vr, n), o;
  }
  remove() {
    const t = super.remove(...arguments);
    return this._onAfterObjectsChange(Wn, t), t;
  }
  _onObjectAdded(t) {
    this.enterGroup(t, !0), this.fire("object:added", { target: t }), t.fire("added", { target: this });
  }
  _onObjectRemoved(t, e) {
    this.exitGroup(t, e), this.fire("object:removed", { target: t }), t.fire("removed", { target: this });
  }
  _onAfterObjectsChange(t, e) {
    this.layoutManager.performLayout({ type: t, targets: e, target: this });
  }
  _onStackOrderChanged() {
    this._set("dirty", !0);
  }
  _set(t, e) {
    const s = this[t];
    return super._set(t, e), t === "canvas" && s !== e && (this._objects || []).forEach((r) => {
      r._set(t, e);
    }), this;
  }
  _shouldSetNestedCoords() {
    return this.subTargetCheck;
  }
  removeAll() {
    return this._activeObjects = [], this.remove(...this._objects);
  }
  __objectSelectionMonitor(t, e) {
    let { target: s } = e;
    const r = this._activeObjects;
    if (t) r.push(s), this._set("dirty", !0);
    else if (r.length > 0) {
      const n = r.indexOf(s);
      n > -1 && (r.splice(n, 1), this._set("dirty", !0));
    }
  }
  _watchObject(t, e) {
    t && this._watchObject(!1, e), t ? (e.on("selected", this.__objectSelectionTracker), e.on("deselected", this.__objectSelectionDisposer)) : (e.off("selected", this.__objectSelectionTracker), e.off("deselected", this.__objectSelectionDisposer));
  }
  enterGroup(t, e) {
    t.group && t.group.remove(t), t._set("parent", this), this._enterGroup(t, e);
  }
  _enterGroup(t, e) {
    e && us(t, $(yt(this.calcTransformMatrix()), t.calcTransformMatrix())), this._shouldSetNestedCoords() && t.setCoords(), t._set("group", this), t._set("canvas", this.canvas), this._watchObject(!0, t);
    const s = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject();
    s && (s === t || t.isDescendantOf(s)) && this._activeObjects.push(t);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t._set("parent", void 0), t._set("canvas", void 0);
  }
  _exitGroup(t, e) {
    t._set("group", void 0), e || (us(t, $(this.calcTransformMatrix(), t.calcTransformMatrix())), t.setCoords()), this._watchObject(!1, t);
    const s = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t) : -1;
    s > -1 && this._activeObjects.splice(s, 1);
  }
  shouldCache() {
    const t = ot.prototype.shouldCache.call(this);
    if (t) {
      for (let e = 0; e < this._objects.length; e++) if (this._objects[e].willDrawShadow()) return this.ownCaching = !1, !1;
    }
    return t;
  }
  willDrawShadow() {
    if (super.willDrawShadow()) return !0;
    for (let t = 0; t < this._objects.length; t++) if (this._objects[t].willDrawShadow()) return !0;
    return !1;
  }
  isOnACache() {
    return this.ownCaching || !!this.parent && this.parent.isOnACache();
  }
  drawObject(t, e, s) {
    this._renderBackground(t);
    for (let n = 0; n < this._objects.length; n++) {
      var r;
      const o = this._objects[n];
      (r = this.canvas) !== null && r !== void 0 && r.preserveObjectStacking && o.group !== this ? (t.save(), t.transform(...yt(this.calcTransformMatrix())), o.render(t), t.restore()) : o.group === this && o.render(t);
    }
    this._drawClipPath(t, this.clipPath, s);
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t) => t.setCoords());
  }
  triggerLayout() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.layoutManager.performLayout(v({ target: this, type: Gr }, t));
  }
  render(t) {
    this._transformDone = !0, super.render(t), this._transformDone = !1;
  }
  __serializeObjects(t, e) {
    const s = this.includeDefaultValues;
    return this._objects.filter(function(r) {
      return !r.excludeFromExport;
    }).map(function(r) {
      const n = r.includeDefaultValues;
      r.includeDefaultValues = s;
      const o = r[t || "toObject"](e);
      return r.includeDefaultValues = n, o;
    });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.layoutManager.toObject();
    return v(v(v({}, super.toObject(["subTargetCheck", "interactive", ...t])), e.strategy !== "fit-content" || this.includeDefaultValues ? { layoutManager: e } : {}), {}, { objects: this.__serializeObjects("toObject", t) });
  }
  toString() {
    return "#<Group: (".concat(this.complexity(), ")>");
  }
  dispose() {
    this.layoutManager.unsubscribeTargets({ targets: this.getObjects(), target: this }), this._activeObjects = [], this.forEachObject((t) => {
      this._watchObject(!1, t), t.dispose();
    }), super.dispose();
  }
  _createSVGBgRect(t) {
    if (!this.backgroundColor) return "";
    const e = tt.prototype._toSVG.call(this), s = e.indexOf("COMMON_PARTS");
    e[s] = 'for="group" ';
    const r = e.join("");
    return t ? t(r) : r;
  }
  _toSVG(t) {
    const e = ["<g ", "COMMON_PARTS", ` >
`], s = this._createSVGBgRect(t);
    s && e.push("		", s);
    for (let r = 0; r < this._objects.length; r++) e.push("		", this._objects[r].toSVG(t));
    return e.push(`</g>
`), e;
  }
  getSvgStyles() {
    const t = this.opacity !== void 0 && this.opacity !== 1 ? "opacity: ".concat(this.opacity, ";") : "", e = this.visible ? "" : " visibility: hidden;";
    return [t, this.getSvgFilter(), e].join("");
  }
  toClipPathSVG(t) {
    const e = [], s = this._createSVGBgRect(t);
    s && e.push("	", s);
    for (let r = 0; r < this._objects.length; r++) e.push("	", this._objects[r].toClipPathSVG(t));
    return this._createBaseClipPathSVGMarkup(e, { reviver: t });
  }
  static fromObject(t, e) {
    let { type: s, objects: r = [], layoutManager: n } = t, o = H(t, Cu);
    return Promise.all([ls(r, e), qs(o, e)]).then((a) => {
      let [c, h] = a;
      const l = new this(c, v(v(v({}, o), h), {}, { layoutManager: new Ou() }));
      if (n) {
        const u = O.getClass(n.type), d = O.getClass(n.strategy);
        l.layoutManager = new u(new d());
      } else l.layoutManager = new zs();
      return l.layoutManager.subscribeTargets({ type: te, target: l, targets: l.getObjects() }), l.setCoords(), l;
    });
  }
}
y(zt, "type", "Group"), y(zt, "ownDefaults", { strokeWidth: 0, subTargetCheck: !1, interactive: !1 }), O.setClass(zt);
const wc = (i, t) => Math.min(t.width / i.width, t.height / i.height), Sc = (i, t) => Math.max(t.width / i.width, t.height / i.height), tn = "\\s*,?\\s*", xs = "".concat(tn, "(").concat(Be, ")"), ku = "".concat(xs).concat(xs).concat(xs).concat(tn, "([01])").concat(tn, "([01])").concat(xs).concat(xs), Mu = { m: "l", M: "L" }, Du = (i, t, e, s, r, n, o, a, c, h, l) => {
  const u = Pt(i), d = At(i), g = Pt(t), f = At(t), p = e * r * g - s * n * f + o, m = s * r * g + e * n * f + a;
  return ["C", h + c * (-e * r * d - s * n * u), l + c * (-s * r * d + e * n * u), p + c * (e * r * f + s * n * g), m + c * (s * r * f - e * n * g), p, m];
}, Oo = (i, t, e, s) => {
  const r = Math.atan2(t, i), n = Math.atan2(s, e);
  return n >= r ? n - r : 2 * Math.PI - (r - n);
};
function en(i, t, e, s, r, n, o, a) {
  let c;
  if (E.cachesBoundsOfCurve && (c = [...arguments].join(), Ms.boundsOfCurveCache[c])) return Ms.boundsOfCurveCache[c];
  const h = Math.sqrt, l = Math.abs, u = [], d = [[0, 0], [0, 0]];
  let g = 6 * i - 12 * e + 6 * r, f = -3 * i + 9 * e - 9 * r + 3 * o, p = 3 * e - 3 * i;
  for (let S = 0; S < 2; ++S) {
    if (S > 0 && (g = 6 * t - 12 * s + 6 * n, f = -3 * t + 9 * s - 9 * n + 3 * a, p = 3 * s - 3 * t), l(f) < 1e-12) {
      if (l(g) < 1e-12) continue;
      const P = -p / g;
      0 < P && P < 1 && u.push(P);
      continue;
    }
    const C = g * g - 4 * p * f;
    if (C < 0) continue;
    const k = h(C), D = (-g + k) / (2 * f);
    0 < D && D < 1 && u.push(D);
    const M = (-g - k) / (2 * f);
    0 < M && M < 1 && u.push(M);
  }
  let m = u.length;
  const b = m, T = Oc(i, t, e, s, r, n, o, a);
  for (; m--; ) {
    const { x: S, y: C } = T(u[m]);
    d[0][m] = S, d[1][m] = C;
  }
  d[0][b] = i, d[1][b] = t, d[0][b + 1] = o, d[1][b + 1] = a;
  const w = [new _(Math.min(...d[0]), Math.min(...d[1])), new _(Math.max(...d[0]), Math.max(...d[1]))];
  return E.cachesBoundsOfCurve && (Ms.boundsOfCurveCache[c] = w), w;
}
const ju = (i, t, e) => {
  let [s, r, n, o, a, c, h, l] = e;
  const u = ((d, g, f, p, m, b, T) => {
    if (f === 0 || p === 0) return [];
    let w = 0, S = 0, C = 0;
    const k = Math.PI, D = T * yn, M = At(D), P = Pt(D), X = 0.5 * (-P * d - M * g), et = 0.5 * (-P * g + M * d), q = f ** 2, R = p ** 2, G = et ** 2, mt = X ** 2, dt = q * R - q * G - R * mt;
    let Ot = Math.abs(f), N = Math.abs(p);
    if (dt < 0) {
      const de = Math.sqrt(1 - dt / (q * R));
      Ot *= de, N *= de;
    } else C = (m === b ? -1 : 1) * Math.sqrt(dt / (q * G + R * mt));
    const Lt = C * Ot * et / N, qt = -C * N * X / Ot, rr = P * Lt - M * qt + 0.5 * d, _i = M * Lt + P * qt + 0.5 * g;
    let _s = Oo(1, 0, (X - Lt) / Ot, (et - qt) / N), ue = Oo((X - Lt) / Ot, (et - qt) / N, (-X - Lt) / Ot, (-et - qt) / N);
    b === 0 && ue > 0 ? ue -= 2 * k : b === 1 && ue < 0 && (ue += 2 * k);
    const ir = Math.ceil(Math.abs(ue / k * 2)), ke = [], Ts = ue / ir, _l = 8 / 3 * Math.sin(Ts / 4) * Math.sin(Ts / 4) / Math.sin(Ts / 2);
    let Ti = _s + Ts;
    for (let de = 0; de < ir; de++) ke[de] = Du(_s, Ti, P, M, Ot, N, rr, _i, _l, w, S), w = ke[de][5], S = ke[de][6], _s = Ti, Ti += Ts;
    return ke;
  })(h - i, l - t, r, n, a, c, o);
  for (let d = 0, g = u.length; d < g; d++) u[d][1] += i, u[d][2] += t, u[d][3] += i, u[d][4] += t, u[d][5] += i, u[d][6] += t;
  return u;
}, Cc = (i) => {
  let t = 0, e = 0, s = 0, r = 0;
  const n = [];
  let o, a = 0, c = 0;
  for (const h of i) {
    const l = [...h];
    let u;
    switch (l[0]) {
      case "l":
        l[1] += t, l[2] += e;
      case "L":
        t = l[1], e = l[2], u = ["L", t, e];
        break;
      case "h":
        l[1] += t;
      case "H":
        t = l[1], u = ["L", t, e];
        break;
      case "v":
        l[1] += e;
      case "V":
        e = l[1], u = ["L", t, e];
        break;
      case "m":
        l[1] += t, l[2] += e;
      case "M":
        t = l[1], e = l[2], s = l[1], r = l[2], u = ["M", t, e];
        break;
      case "c":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e, l[5] += t, l[6] += e;
      case "C":
        a = l[3], c = l[4], t = l[5], e = l[6], u = ["C", l[1], l[2], a, c, t, e];
        break;
      case "s":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e;
      case "S":
        o === "C" ? (a = 2 * t - a, c = 2 * e - c) : (a = t, c = e), t = l[3], e = l[4], u = ["C", a, c, l[1], l[2], t, e], a = u[3], c = u[4];
        break;
      case "q":
        l[1] += t, l[2] += e, l[3] += t, l[4] += e;
      case "Q":
        a = l[1], c = l[2], t = l[3], e = l[4], u = ["Q", a, c, t, e];
        break;
      case "t":
        l[1] += t, l[2] += e;
      case "T":
        o === "Q" ? (a = 2 * t - a, c = 2 * e - c) : (a = t, c = e), t = l[1], e = l[2], u = ["Q", a, c, t, e];
        break;
      case "a":
        l[6] += t, l[7] += e;
      case "A":
        ju(t, e, l).forEach((d) => n.push(d)), t = l[6], e = l[7];
        break;
      case "z":
      case "Z":
        t = s, e = r, u = ["Z"];
    }
    u ? (n.push(u), o = u[0]) : o = "";
  }
  return n;
}, Nr = (i, t, e, s) => Math.sqrt((e - i) ** 2 + (s - t) ** 2), Oc = (i, t, e, s, r, n, o, a) => (c) => {
  const h = c ** 3, l = ((g) => 3 * g ** 2 * (1 - g))(c), u = ((g) => 3 * g * (1 - g) ** 2)(c), d = ((g) => (1 - g) ** 3)(c);
  return new _(o * h + r * l + e * u + i * d, a * h + n * l + s * u + t * d);
}, kc = (i) => i ** 2, Mc = (i) => 2 * i * (1 - i), Dc = (i) => (1 - i) ** 2, Iu = (i, t, e, s, r, n, o, a) => (c) => {
  const h = kc(c), l = Mc(c), u = Dc(c), d = 3 * (u * (e - i) + l * (r - e) + h * (o - r)), g = 3 * (u * (s - t) + l * (n - s) + h * (a - n));
  return Math.atan2(g, d);
}, Eu = (i, t, e, s, r, n) => (o) => {
  const a = kc(o), c = Mc(o), h = Dc(o);
  return new _(r * a + e * c + i * h, n * a + s * c + t * h);
}, Pu = (i, t, e, s, r, n) => (o) => {
  const a = 1 - o, c = 2 * (a * (e - i) + o * (r - e)), h = 2 * (a * (s - t) + o * (n - s));
  return Math.atan2(h, c);
}, ko = (i, t, e) => {
  let s = new _(t, e), r = 0;
  for (let n = 1; n <= 100; n += 1) {
    const o = i(n / 100);
    r += Nr(s.x, s.y, o.x, o.y), s = o;
  }
  return r;
}, Au = (i, t) => {
  let e, s = 0, r = 0, n = { x: i.x, y: i.y }, o = v({}, n), a = 0.01, c = 0;
  const h = i.iterator, l = i.angleFinder;
  for (; r < t && a > 1e-4; ) o = h(s), c = s, e = Nr(n.x, n.y, o.x, o.y), e + r > t ? (s -= a, a /= 2) : (n = o, s += a, r += e);
  return v(v({}, o), {}, { angle: l(c) });
}, Xn = (i) => {
  let t, e, s = 0, r = 0, n = 0, o = 0, a = 0;
  const c = [];
  for (const h of i) {
    const l = { x: r, y: n, command: h[0], length: 0 };
    switch (h[0]) {
      case "M":
        e = l, e.x = o = r = h[1], e.y = a = n = h[2];
        break;
      case "L":
        e = l, e.length = Nr(r, n, h[1], h[2]), r = h[1], n = h[2];
        break;
      case "C":
        t = Oc(r, n, h[1], h[2], h[3], h[4], h[5], h[6]), e = l, e.iterator = t, e.angleFinder = Iu(r, n, h[1], h[2], h[3], h[4], h[5], h[6]), e.length = ko(t, r, n), r = h[5], n = h[6];
        break;
      case "Q":
        t = Eu(r, n, h[1], h[2], h[3], h[4]), e = l, e.iterator = t, e.angleFinder = Pu(r, n, h[1], h[2], h[3], h[4]), e.length = ko(t, r, n), r = h[3], n = h[4];
        break;
      case "Z":
        e = l, e.destX = o, e.destY = a, e.length = Nr(r, n, o, a), r = o, n = a;
    }
    s += e.length, c.push(e);
  }
  return c.push({ length: s, x: r, y: n }), c;
}, jc = function(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Xn(i), s = 0;
  for (; t - e[s].length > 0 && s < e.length - 2; ) t -= e[s].length, s++;
  const r = e[s], n = t / r.length, o = i[s];
  switch (r.command) {
    case "M":
      return { x: r.x, y: r.y, angle: 0 };
    case "Z":
      return v(v({}, new _(r.x, r.y).lerp(new _(r.destX, r.destY), n)), {}, { angle: Math.atan2(r.destY - r.y, r.destX - r.x) });
    case "L":
      return v(v({}, new _(r.x, r.y).lerp(new _(o[1], o[2]), n)), {}, { angle: Math.atan2(o[2] - r.y, o[1] - r.x) });
    case "C":
    case "Q":
      return Au(r, t);
  }
}, Ru = new RegExp("[mzlhvcsqta][^mzlhvcsqta]*", "gi"), Mo = new RegExp(ku, "g"), Fu = new RegExp(Be, "gi"), Lu = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 }, Ic = (i) => {
  var t;
  const e = [], s = (t = i.match(Ru)) !== null && t !== void 0 ? t : [];
  for (const r of s) {
    const n = r[0];
    if (n === "z" || n === "Z") {
      e.push([n]);
      continue;
    }
    const o = Lu[n.toLowerCase()];
    let a = [];
    if (n === "a" || n === "A") {
      Mo.lastIndex = 0;
      for (let c = null; c = Mo.exec(r); ) a.push(...c.slice(1));
    } else a = r.match(Fu) || [];
    for (let c = 0; c < a.length; c += o) {
      const h = new Array(o), l = Mu[n];
      h[0] = c > 0 && l ? l : n;
      for (let u = 0; u < o; u++) h[u + 1] = parseFloat(a[c + u]);
      e.push(h);
    }
  }
  return e;
}, Bu = function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = new _(i[0]), s = new _(i[1]), r = 1, n = 0;
  const o = [], a = i.length, c = a > 2;
  let h;
  for (c && (r = i[2].x < s.x ? -1 : i[2].x === s.x ? 0 : 1, n = i[2].y < s.y ? -1 : i[2].y === s.y ? 0 : 1), o.push(["M", e.x - r * t, e.y - n * t]), h = 1; h < a; h++) {
    if (!e.eq(s)) {
      const l = e.midPointFrom(s);
      o.push(["Q", e.x, e.y, l.x, l.y]);
    }
    e = i[h], h + 1 < i.length && (s = i[h + 1]);
  }
  return c && (r = e.x > i[h - 2].x ? 1 : e.x === i[h - 2].x ? 0 : -1, n = e.y > i[h - 2].y ? 1 : e.y === i[h - 2].y ? 0 : -1), o.push(["L", e.x + r * t, e.y + n * t]), o;
}, Ec = (i, t) => i.map((e) => e.map((s, r) => r === 0 || t === void 0 ? s : z(s, t)).join(" ")).join(" ");
function Ur(i, t) {
  const e = i.style;
  e && t && (typeof t == "string" ? e.cssText += ";" + t : Object.entries(t).forEach((s) => {
    let [r, n] = s;
    return e.setProperty(r, n);
  }));
}
const Wu = (i, t) => Math.floor(Math.random() * (t - i + 1)) + i;
function Xu(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const e = t.onComplete || Ae, s = new (Qr()).XMLHttpRequest(), r = t.signal, n = function() {
    s.abort();
  }, o = function() {
    r && r.removeEventListener("abort", n), s.onerror = s.ontimeout = Ae;
  };
  if (r && r.aborted) throw new Ta("request");
  return r && r.addEventListener("abort", n, { once: !0 }), s.onreadystatechange = function() {
    s.readyState === 4 && (o(), e(s), s.onreadystatechange = Ae);
  }, s.onerror = s.ontimeout = o, s.open("get", i, !0), s.send(), s;
}
const zu = (i, t) => {
  let e = i._findCenterFromElement();
  i.transformMatrix && (((s) => {
    if (s.transformMatrix) {
      const { scaleX: r, scaleY: n, angle: o, skewX: a } = hs(s.transformMatrix);
      s.flipX = !1, s.flipY = !1, s.set(ut, r), s.set(bt, n), s.angle = o, s.skewX = a, s.skewY = 0;
    }
  })(i), e = e.transform(i.transformMatrix)), delete i.transformMatrix, t && (i.scaleX *= t.scaleX, i.scaleY *= t.scaleY, i.cropX = t.cropX, i.cropY = t.cropY, e.x += t.offsetLeft, e.y += t.offsetTop, i.width = t.width, i.height = t.height), i.setPositionByOrigin(e, j, j);
};
var zn = Object.freeze({ __proto__: null, addTransformToObject: za, animate: An, animateColor: Za, applyTransformToObject: us, calcAngleBetweenVectors: Yr, calcDimensionsMatrix: $s, calcPlaneChangeMatrix: Js, calcVectorRotation: qa, cancelAnimFrame: Da, capValue: We, composeMatrix: Aa, copyCanvasElement: (i) => {
  var t;
  const e = Rt(i);
  return (t = e.getContext("2d")) === null || t === void 0 || t.drawImage(i, 0, 0), e;
}, cos: Pt, createCanvasElement: St, createImage: ja, createRotateMatrix: vs, createScaleMatrix: ri, createSkewXMatrix: Cn, createSkewYMatrix: On, createTranslateMatrix: ms, createVector: zr, crossProduct: os, degreesToRadians: U, dotProduct: Ka, ease: Bl, enlivenObjectEnlivables: qs, enlivenObjects: ls, findScaleToCover: Sc, findScaleToFit: wc, getBoundsOfCurve: en, getOrthonormalVector: En, getPathSegmentsInfo: Xn, getPointOnPath: jc, getPointer: Xa, getRandomInt: Wu, getRegularPolygonPath: (i, t) => {
  const e = 2 * Math.PI / i;
  let s = -ye;
  i % 2 == 0 && (s += e / 2);
  const r = new Array(i + 1);
  for (let n = 0; n < i; n++) {
    const o = n * e + s, { x: a, y: c } = new _(Pt(o), At(o)).scalarMultiply(t);
    r[n] = [n === 0 ? "M" : "L", a, c];
  }
  return r[i] = ["Z"], r;
}, getSmoothPathFromPoints: Bu, getSvgAttributes: (i) => {
  const t = ["instantiated_by_use", "style", "id", "class"];
  switch (i) {
    case "linearGradient":
      return t.concat(["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform"]);
    case "radialGradient":
      return t.concat(["gradientUnits", "gradientTransform", "cx", "cy", "r", "fx", "fy", "fr"]);
    case "stop":
      return t.concat(["offset", "stop-color", "stop-opacity"]);
  }
  return t;
}, getUnitVector: ai, groupSVGElements: (i, t) => i && i.length === 1 ? i[0] : new zt(i, t), hasStyleChanged: li, invertTransform: yt, isBetweenVectors: Ui, isIdentityMatrix: Ia, isTouchEvent: Wr, isTransparent: fc, joinPath: Ec, loadImage: js, magnitude: Hr, makeBoundingBoxFromPoints: Xt, makePathSimpler: Cc, matrixToSVG: Bs, mergeClipPaths: (i, t) => {
  var e;
  let s = i, r = t;
  s.inverted && !r.inverted && (s = t, r = i), Ni(r, (e = r.group) === null || e === void 0 ? void 0 : e.calcTransformMatrix(), s.calcTransformMatrix());
  const n = s.inverted && r.inverted;
  return n && (s.inverted = r.inverted = !1), new zt([s], { clipPath: r, inverted: n });
}, multiplyTransformMatrices: $, multiplyTransformMatrixArray: si, parsePath: Ic, parsePreserveAspectRatioAttribute: Ra, parseUnit: Re, pick: He, projectStrokeOnPoints: mc, qrDecompose: hs, radiansToDegrees: _e, removeFromArray: Me, removeTransformFromObject: (i, t) => {
  const e = yt(t), s = $(e, i.calcOwnMatrix());
  us(i, s);
}, removeTransformMatrixForSvgParsing: zu, request: Xu, requestAnimFrame: Ds, resetObjectTransform: Ha, rotatePoint: (i, t, e) => i.rotate(e, t), rotateVector: In, saveObjectTransform: Mn, sendObjectToPlane: Ni, sendPointToPlane: re, sendVectorToPlane: Ya, setStyle: Ur, sin: At, sizeAfterTransform: ii, string: eu, stylesFromArray: bc, stylesToArray: yc, toBlob: Sn, toDataURL: wn, toFixed: z, transformPath: (i, t, e) => (e && (t = $(t, [1, 0, 0, 1, -e.x, -e.y])), i.map((s) => {
  const r = [...s];
  for (let n = 1; n < s.length - 1; n += 2) {
    const { x: o, y: a } = at({ x: s[n], y: s[n + 1] }, t);
    r[n] = o, r[n + 1] = a;
  }
  return r;
})), transformPoint: at });
class Hu extends Wa {
  constructor(t) {
    let { allowTouchScrolling: e = !1, containerClass: s = "" } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(t), y(this, "upper", void 0), y(this, "container", void 0);
    const { el: r } = this.lower, n = this.createUpperCanvas();
    this.upper = { el: n, ctx: n.getContext("2d") }, this.applyCanvasStyle(r, { allowTouchScrolling: e }), this.applyCanvasStyle(n, { allowTouchScrolling: e, styles: { position: "absolute", left: "0", top: "0" } });
    const o = this.createContainerElement();
    o.classList.add(s), r.parentNode && r.parentNode.replaceChild(o, r), o.append(r, n), this.container = o;
  }
  createUpperCanvas() {
    const { el: t } = this.lower, e = St();
    return e.className = t.className, e.classList.remove("lower-canvas"), e.classList.add("upper-canvas"), e.setAttribute("data-fabric", "top"), e.style.cssText = t.style.cssText, e.setAttribute("draggable", "true"), e;
  }
  createContainerElement() {
    const t = gs().createElement("div");
    return t.setAttribute("data-fabric", "wrapper"), Ur(t, { position: "relative" }), co(t), t;
  }
  applyCanvasStyle(t, e) {
    const { styles: s, allowTouchScrolling: r } = e;
    Ur(t, v(v({}, s), {}, { "touch-action": r ? "manipulation" : ft })), co(t);
  }
  setDimensions(t, e) {
    super.setDimensions(t, e);
    const { el: s, ctx: r } = this.upper;
    Ba(s, r, t, e);
  }
  setCSSDimensions(t) {
    super.setCSSDimensions(t), Vi(this.upper.el, t), Vi(this.container, t);
  }
  cleanupDOM(t) {
    const e = this.container, { el: s } = this.lower, { el: r } = this.upper;
    super.cleanupDOM(t), e.removeChild(r), e.removeChild(s), e.parentNode && e.parentNode.replaceChild(s, e);
  }
  dispose() {
    super.dispose(), Ht().dispose(this.upper.el), delete this.upper, delete this.container;
  }
}
class di extends Ks {
  constructor() {
    super(...arguments), y(this, "targets", []), y(this, "_hoveredTargets", []), y(this, "_objectsToRender", void 0), y(this, "_currentTransform", null), y(this, "_groupSelector", null), y(this, "contextTopDirty", !1);
  }
  static getDefaults() {
    return v(v({}, super.getDefaults()), di.ownDefaults);
  }
  get upperCanvasEl() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.el;
  }
  get contextTop() {
    var t;
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.ctx;
  }
  get wrapperEl() {
    return this.elements.container;
  }
  initElements(t) {
    this.elements = new Hu(t, { allowTouchScrolling: this.allowTouchScrolling, containerClass: this.containerClass }), this._createCacheCanvas();
  }
  _onObjectAdded(t) {
    this._objectsToRender = void 0, super._onObjectAdded(t);
  }
  _onObjectRemoved(t) {
    this._objectsToRender = void 0, t === this._activeObject && (this.fire("before:selection:cleared", { deselected: [t] }), this._discardActiveObject(), this.fire("selection:cleared", { deselected: [t] }), t.fire("deselected", { target: t })), t === this._hoveredTarget && (this._hoveredTarget = void 0, this._hoveredTargets = []), super._onObjectRemoved(t);
  }
  _onStackOrderChanged() {
    this._objectsToRender = void 0, super._onStackOrderChanged();
  }
  _chooseObjectsToRender() {
    const t = this._activeObject;
    return !this.preserveObjectStacking && t ? this._objects.filter((e) => !e.group && e !== t).concat(t) : this._objects;
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || (!this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop), this.contextTopDirty = !1), this.hasLostContext && (this.renderTopLayer(this.contextTop), this.hasLostContext = !1), !this._objectsToRender && (this._objectsToRender = this._chooseObjectsToRender()), this.renderCanvas(this.getContext(), this._objectsToRender));
  }
  renderTopLayer(t) {
    t.save(), this.isDrawingMode && this._isCurrentlyDrawing && (this.freeDrawingBrush && this.freeDrawingBrush._render(), this.contextTopDirty = !0), this.selection && this._groupSelector && (this._drawSelection(t), this.contextTopDirty = !0), t.restore();
  }
  renderTop() {
    const t = this.contextTop;
    this.clearContext(t), this.renderTopLayer(t), this.fire("after:render", { ctx: t });
  }
  setTargetFindTolerance(t) {
    t = Math.round(t), this.targetFindTolerance = t;
    const e = this.getRetinaScaling(), s = Math.ceil((2 * t + 1) * e);
    this.pixelFindCanvasEl.width = this.pixelFindCanvasEl.height = s, this.pixelFindContext.scale(e, e);
  }
  isTargetTransparent(t, e, s) {
    const r = this.targetFindTolerance, n = this.pixelFindContext;
    this.clearContext(n), n.save(), n.translate(-e + r, -s + r), n.transform(...this.viewportTransform);
    const o = t.selectionBackgroundColor;
    t.selectionBackgroundColor = "", t.render(n), t.selectionBackgroundColor = o, n.restore();
    const a = Math.round(r * this.getRetinaScaling());
    return fc(n, a, a, a);
  }
  _isSelectionKeyPressed(t) {
    const e = this.selectionKey;
    return !!e && (Array.isArray(e) ? !!e.find((s) => !!s && t[s] === !0) : t[e]);
  }
  _shouldClearSelection(t, e) {
    const s = this.getActiveObjects(), r = this._activeObject;
    return !!(!e || e && r && s.length > 1 && s.indexOf(e) === -1 && r !== e && !this._isSelectionKeyPressed(t) || e && !e.evented || e && !e.selectable && r && r !== e);
  }
  _shouldCenterTransform(t, e, s) {
    if (!t) return;
    let r;
    return e === ei || e === ut || e === bt || e === Ls ? r = this.centeredScaling || t.centeredScaling : e === Tn && (r = this.centeredRotation || t.centeredRotation), r ? !s : s;
  }
  _getOriginFromCorner(t, e) {
    const s = { x: t.originX, y: t.originY };
    return e && (["ml", "tl", "bl"].includes(e) ? s.x = K : ["mr", "tr", "br"].includes(e) && (s.x = A), ["tl", "mt", "tr"].includes(e) ? s.y = Yi : ["bl", "mb", "br"].includes(e) && (s.y = gt)), s;
  }
  _setupCurrentTransform(t, e, s) {
    var r;
    const n = e.group ? re(this.getScenePoint(t), void 0, e.group.calcTransformMatrix()) : this.getScenePoint(t), { key: o = "", control: a } = e.getActiveControl() || {}, c = s && a ? (r = a.getActionHandler(t, e, a)) === null || r === void 0 ? void 0 : r.bind(a) : Na, h = ((g, f, p, m) => {
      if (!f || !g) return "drag";
      const b = m.controls[f];
      return b.getActionName(p, b, m);
    })(s, o, t, e), l = t[this.centeredKey], u = this._shouldCenterTransform(e, h, l) ? { x: j, y: j } : this._getOriginFromCorner(e, o), d = { target: e, action: h, actionHandler: c, actionPerformed: !1, corner: o, scaleX: e.scaleX, scaleY: e.scaleY, skewX: e.skewX, skewY: e.skewY, offsetX: n.x - e.left, offsetY: n.y - e.top, originX: u.x, originY: u.y, ex: n.x, ey: n.y, lastX: n.x, lastY: n.y, theta: U(e.angle), width: e.width, height: e.height, shiftKey: t.shiftKey, altKey: l, original: v(v({}, Mn(e)), {}, { originX: u.x, originY: u.y }) };
    this._currentTransform = d, this.fire("before:transform", { e: t, transform: d });
  }
  setCursor(t) {
    this.upperCanvasEl.style.cursor = t;
  }
  _drawSelection(t) {
    const { x: e, y: s, deltaX: r, deltaY: n } = this._groupSelector, o = new _(e, s).transform(this.viewportTransform), a = new _(e + r, s + n).transform(this.viewportTransform), c = this.selectionLineWidth / 2;
    let h = Math.min(o.x, a.x), l = Math.min(o.y, a.y), u = Math.max(o.x, a.x), d = Math.max(o.y, a.y);
    this.selectionColor && (t.fillStyle = this.selectionColor, t.fillRect(h, l, u - h, d - l)), this.selectionLineWidth && this.selectionBorderColor && (t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, h += c, l += c, u -= c, d -= c, ot.prototype._setLineDash.call(this, t, this.selectionDashArray), t.strokeRect(h, l, u - h, d - l));
  }
  findTarget(t) {
    if (this.skipTargetFind) return;
    const e = this.getViewportPoint(t), s = this._activeObject, r = this.getActiveObjects();
    if (this.targets = [], s && r.length >= 1) {
      if (s.findControl(e, Wr(t)) || r.length > 1 && this.searchPossibleTargets([s], e)) return s;
      if (s === this.searchPossibleTargets([s], e)) {
        if (this.preserveObjectStacking) {
          const n = this.targets;
          this.targets = [];
          const o = this.searchPossibleTargets(this._objects, e);
          return t[this.altSelectionKey] && o && o !== s ? (this.targets = n, s) : o;
        }
        return s;
      }
    }
    return this.searchPossibleTargets(this._objects, e);
  }
  _pointIsInObjectSelectionArea(t, e) {
    let s = t.getCoords();
    const r = this.getZoom(), n = t.padding / r;
    if (n) {
      const [o, a, c, h] = s, l = Math.atan2(a.y - o.y, a.x - o.x), u = Pt(l) * n, d = At(l) * n, g = u + d, f = u - d;
      s = [new _(o.x - f, o.y - g), new _(a.x + g, a.y - f), new _(c.x + f, c.y + g), new _(h.x - g, h.y + f)];
    }
    return Y.isPointInPolygon(e, s);
  }
  _checkTarget(t, e) {
    return !!(t && t.visible && t.evented && this._pointIsInObjectSelectionArea(t, re(e, void 0, this.viewportTransform)) && (!this.perPixelTargetFind && !t.perPixelTargetFind || t.isEditing || !this.isTargetTransparent(t, e.x, e.y)));
  }
  _searchPossibleTargets(t, e) {
    let s = t.length;
    for (; s--; ) {
      const r = t[s];
      if (this._checkTarget(r, e)) {
        if (Er(r) && r.subTargetCheck) {
          const n = this._searchPossibleTargets(r._objects, e);
          n && this.targets.push(n);
        }
        return r;
      }
    }
  }
  searchPossibleTargets(t, e) {
    const s = this._searchPossibleTargets(t, e);
    if (s && Er(s) && s.interactive && this.targets[0]) {
      const r = this.targets;
      for (let n = r.length - 1; n > 0; n--) {
        const o = r[n];
        if (!Er(o) || !o.interactive) return o;
      }
      return r[0];
    }
    return s;
  }
  getViewportPoint(t) {
    return this._pointer ? this._pointer : this.getPointer(t, !0);
  }
  getScenePoint(t) {
    return this._absolutePointer ? this._absolutePointer : this.getPointer(t);
  }
  getPointer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
    const s = this.upperCanvasEl, r = s.getBoundingClientRect();
    let n = Xa(t), o = r.width || 0, a = r.height || 0;
    o && a || (gt in r && Yi in r && (a = Math.abs(r.top - r.bottom)), K in r && A in r && (o = Math.abs(r.right - r.left))), this.calcOffset(), n.x = n.x - this._offset.left, n.y = n.y - this._offset.top, e || (n = re(n, void 0, this.viewportTransform));
    const c = this.getRetinaScaling();
    c !== 1 && (n.x /= c, n.y /= c);
    const h = o === 0 || a === 0 ? new _(1, 1) : new _(s.width / o, s.height / a);
    return n.multiply(h);
  }
  _setDimensionsImpl(t, e) {
    this._resetTransformEventData(), super._setDimensionsImpl(t, e), this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
  }
  _createCacheCanvas() {
    this.pixelFindCanvasEl = St(), this.pixelFindContext = this.pixelFindCanvasEl.getContext("2d", { willReadFrequently: !0 }), this.setTargetFindTolerance(this.targetFindTolerance);
  }
  getTopContext() {
    return this.elements.upper.ctx;
  }
  getSelectionContext() {
    return this.elements.upper.ctx;
  }
  getSelectionElement() {
    return this.elements.upper.el;
  }
  getActiveObject() {
    return this._activeObject;
  }
  getActiveObjects() {
    const t = this._activeObject;
    return De(t) ? t.getObjects() : t ? [t] : [];
  }
  _fireSelectionEvents(t, e) {
    let s = !1, r = !1;
    const n = this.getActiveObjects(), o = [], a = [];
    t.forEach((c) => {
      n.includes(c) || (s = !0, c.fire("deselected", { e, target: c }), a.push(c));
    }), n.forEach((c) => {
      t.includes(c) || (s = !0, c.fire("selected", { e, target: c }), o.push(c));
    }), t.length > 0 && n.length > 0 ? (r = !0, s && this.fire("selection:updated", { e, selected: o, deselected: a })) : n.length > 0 ? (r = !0, this.fire("selection:created", { e, selected: o })) : t.length > 0 && (r = !0, this.fire("selection:cleared", { e, deselected: a })), r && (this._objectsToRender = void 0);
  }
  setActiveObject(t, e) {
    const s = this.getActiveObjects(), r = this._setActiveObject(t, e);
    return this._fireSelectionEvents(s, e), r;
  }
  _setActiveObject(t, e) {
    const s = this._activeObject;
    return s !== t && !(!this._discardActiveObject(e, t) && this._activeObject) && !t.onSelect({ e }) && (this._activeObject = t, De(t) && s !== t && t.set("canvas", this), t.setCoords(), !0);
  }
  _discardActiveObject(t, e) {
    const s = this._activeObject;
    return !!s && !s.onDeselect({ e: t, object: e }) && (this._currentTransform && this._currentTransform.target === s && this.endCurrentTransform(t), De(s) && s === this._hoveredTarget && (this._hoveredTarget = void 0), this._activeObject = void 0, !0);
  }
  discardActiveObject(t) {
    const e = this.getActiveObjects(), s = this.getActiveObject();
    e.length && this.fire("before:selection:cleared", { e: t, deselected: [s] });
    const r = this._discardActiveObject(t);
    return this._fireSelectionEvents(e, t), r;
  }
  endCurrentTransform(t) {
    const e = this._currentTransform;
    this._finalizeCurrentTransform(t), e && e.target && (e.target.isMoving = !1), this._currentTransform = null;
  }
  _finalizeCurrentTransform(t) {
    const e = this._currentTransform, s = e.target, r = { e: t, target: s, transform: e, action: e.action };
    s._scaling && (s._scaling = !1), s.setCoords(), e.actionPerformed && (this.fire("object:modified", r), s.fire(Lr, r));
  }
  setViewportTransform(t) {
    super.setViewportTransform(t);
    const e = this._activeObject;
    e && e.setCoords();
  }
  destroy() {
    const t = this._activeObject;
    De(t) && (t.removeAll(), t.dispose()), delete this._activeObject, super.destroy(), this.pixelFindContext = null, this.pixelFindCanvasEl = void 0;
  }
  clear() {
    this.discardActiveObject(), this._activeObject = void 0, this.clearContext(this.contextTop), super.clear();
  }
  drawControls(t) {
    const e = this._activeObject;
    e && e._renderControls(t);
  }
  _toObject(t, e, s) {
    const r = this._realizeGroupTransformOnObject(t), n = super._toObject(t, e, s);
    return t.set(r), n;
  }
  _realizeGroupTransformOnObject(t) {
    const { group: e } = t;
    if (e && De(e) && this._activeObject === e) {
      const s = He(t, ["angle", "flipX", "flipY", A, ut, bt, fs, ps, gt]);
      return za(t, e.calcOwnMatrix()), s;
    }
    return {};
  }
  _setSVGObject(t, e, s) {
    const r = this._realizeGroupTransformOnObject(e);
    super._setSVGObject(t, e, s), e.set(r);
  }
}
y(di, "ownDefaults", { uniformScaling: !0, uniScaleKey: "shiftKey", centeredScaling: !1, centeredRotation: !1, centeredKey: "altKey", altActionKey: "shiftKey", selection: !0, selectionKey: "shiftKey", selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, selectionFullyContained: !1, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", notAllowedCursor: "not-allowed", perPixelTargetFind: !1, targetFindTolerance: 0, skipTargetFind: !1, stopContextMenu: !1, fireRightClick: !1, fireMiddleClick: !1, enablePointerEvents: !1, containerClass: "canvas-container", preserveObjectStacking: !1 });
class Yu {
  constructor(t) {
    y(this, "targets", []), y(this, "__disposer", void 0);
    const e = () => {
      const { hiddenTextarea: r } = t.getActiveObject() || {};
      r && r.focus();
    }, s = t.upperCanvasEl;
    s.addEventListener("click", e), this.__disposer = () => s.removeEventListener("click", e);
  }
  exitTextEditing() {
    this.target = void 0, this.targets.forEach((t) => {
      t.isEditing && t.exitEditing();
    });
  }
  add(t) {
    this.targets.push(t);
  }
  remove(t) {
    this.unregister(t), Me(this.targets, t);
  }
  register(t) {
    this.target = t;
  }
  unregister(t) {
    t === this.target && (this.target = void 0);
  }
  onMouseMove(t) {
    var e;
    !((e = this.target) === null || e === void 0) && e.isEditing && this.target.updateSelectionOnMouseMove(t);
  }
  clear() {
    this.targets = [], this.target = void 0;
  }
  dispose() {
    this.clear(), this.__disposer(), delete this.__disposer;
  }
}
const Vu = ["target", "oldTarget", "fireCanvas", "e"], vt = { passive: !1 }, qe = (i, t) => {
  const e = i.getViewportPoint(t), s = i.getScenePoint(t);
  return { viewportPoint: e, scenePoint: s, pointer: e, absolutePointer: s };
}, fe = function(i) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return i.addEventListener(...e);
}, _t = function(i) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s];
  return i.removeEventListener(...e);
}, Gu = { mouse: { in: "over", out: "out", targetIn: "mouseover", targetOut: "mouseout", canvasIn: "mouse:over", canvasOut: "mouse:out" }, drag: { in: "enter", out: "leave", targetIn: "dragenter", targetOut: "dragleave", canvasIn: "drag:enter", canvasOut: "drag:leave" } };
class sn extends di {
  constructor(t) {
    super(t, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}), y(this, "_isClick", void 0), y(this, "textEditingManager", new Yu(this)), ["_onMouseDown", "_onTouchStart", "_onMouseMove", "_onMouseUp", "_onTouchEnd", "_onResize", "_onMouseWheel", "_onMouseOut", "_onMouseEnter", "_onContextMenu", "_onDoubleClick", "_onDragStart", "_onDragEnd", "_onDragProgress", "_onDragOver", "_onDragEnter", "_onDragLeave", "_onDrop"].forEach((e) => {
      this[e] = this[e].bind(this);
    }), this.addOrRemove(fe, "add");
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? "pointer" : "mouse";
  }
  addOrRemove(t, e) {
    const s = this.upperCanvasEl, r = this._getEventPrefix();
    t(La(s), "resize", this._onResize), t(s, r + "down", this._onMouseDown), t(s, "".concat(r, "move"), this._onMouseMove, vt), t(s, "".concat(r, "out"), this._onMouseOut), t(s, "".concat(r, "enter"), this._onMouseEnter), t(s, "wheel", this._onMouseWheel), t(s, "contextmenu", this._onContextMenu), t(s, "dblclick", this._onDoubleClick), t(s, "dragstart", this._onDragStart), t(s, "dragend", this._onDragEnd), t(s, "dragover", this._onDragOver), t(s, "dragenter", this._onDragEnter), t(s, "dragleave", this._onDragLeave), t(s, "drop", this._onDrop), this.enablePointerEvents || t(s, "touchstart", this._onTouchStart, vt);
  }
  removeListeners() {
    this.addOrRemove(_t, "remove");
    const t = this._getEventPrefix(), e = jt(this.upperCanvasEl);
    _t(e, "".concat(t, "up"), this._onMouseUp), _t(e, "touchend", this._onTouchEnd, vt), _t(e, "".concat(t, "move"), this._onMouseMove, vt), _t(e, "touchmove", this._onMouseMove, vt), clearTimeout(this._willAddMouseDown);
  }
  _onMouseWheel(t) {
    this.__onMouseWheel(t);
  }
  _onMouseOut(t) {
    const e = this._hoveredTarget, s = v({ e: t }, qe(this, t));
    this.fire("mouse:out", v(v({}, s), {}, { target: e })), this._hoveredTarget = void 0, e && e.fire("mouseout", v({}, s)), this._hoveredTargets.forEach((r) => {
      this.fire("mouse:out", v(v({}, s), {}, { target: r })), r && r.fire("mouseout", v({}, s));
    }), this._hoveredTargets = [];
  }
  _onMouseEnter(t) {
    this._currentTransform || this.findTarget(t) || (this.fire("mouse:over", v({ e: t }, qe(this, t))), this._hoveredTarget = void 0, this._hoveredTargets = []);
  }
  _onDragStart(t) {
    this._isClick = !1;
    const e = this.getActiveObject();
    if (e && e.onDragStart(t)) {
      this._dragSource = e;
      const s = { e: t, target: e };
      return this.fire("dragstart", s), e.fire("dragstart", s), void fe(this.upperCanvasEl, "drag", this._onDragProgress);
    }
    Gi(t);
  }
  _renderDragEffects(t, e, s) {
    let r = !1;
    const n = this._dropTarget;
    n && n !== e && n !== s && (n.clearContextTop(), r = !0), e == null || e.clearContextTop(), s !== e && (s == null || s.clearContextTop());
    const o = this.contextTop;
    o.save(), o.transform(...this.viewportTransform), e && (o.save(), e.transform(o), e.renderDragSourceEffect(t), o.restore(), r = !0), s && (o.save(), s.transform(o), s.renderDropTargetEffect(t), o.restore(), r = !0), o.restore(), r && (this.contextTopDirty = !0);
  }
  _onDragEnd(t) {
    const e = !!t.dataTransfer && t.dataTransfer.dropEffect !== ft, s = e ? this._activeObject : void 0, r = { e: t, target: this._dragSource, subTargets: this.targets, dragSource: this._dragSource, didDrop: e, dropTarget: s };
    _t(this.upperCanvasEl, "drag", this._onDragProgress), this.fire("dragend", r), this._dragSource && this._dragSource.fire("dragend", r), delete this._dragSource, this._onMouseUp(t);
  }
  _onDragProgress(t) {
    const e = { e: t, target: this._dragSource, dragSource: this._dragSource, dropTarget: this._draggedoverTarget };
    this.fire("drag", e), this._dragSource && this._dragSource.fire("drag", e);
  }
  findDragTargets(t) {
    return this.targets = [], { target: this._searchPossibleTargets(this._objects, this.getViewportPoint(t)), targets: [...this.targets] };
  }
  _onDragOver(t) {
    const e = "dragover", { target: s, targets: r } = this.findDragTargets(t), n = this._dragSource, o = { e: t, target: s, subTargets: r, dragSource: n, canDrop: !1, dropTarget: void 0 };
    let a;
    this.fire(e, o), this._fireEnterLeaveEvents(s, o), s && (s.canDrop(t) && (a = s), s.fire(e, o));
    for (let c = 0; c < r.length; c++) {
      const h = r[c];
      h.canDrop(t) && (a = h), h.fire(e, o);
    }
    this._renderDragEffects(t, n, a), this._dropTarget = a;
  }
  _onDragEnter(t) {
    const { target: e, targets: s } = this.findDragTargets(t), r = { e: t, target: e, subTargets: s, dragSource: this._dragSource };
    this.fire("dragenter", r), this._fireEnterLeaveEvents(e, r);
  }
  _onDragLeave(t) {
    const e = { e: t, target: this._draggedoverTarget, subTargets: this.targets, dragSource: this._dragSource };
    this.fire("dragleave", e), this._fireEnterLeaveEvents(void 0, e), this._renderDragEffects(t, this._dragSource), this._dropTarget = void 0, this.targets = [], this._hoveredTargets = [];
  }
  _onDrop(t) {
    const { target: e, targets: s } = this.findDragTargets(t), r = this._basicEventHandler("drop:before", v({ e: t, target: e, subTargets: s, dragSource: this._dragSource }, qe(this, t)));
    r.didDrop = !1, r.dropTarget = void 0, this._basicEventHandler("drop", r), this.fire("drop:after", r);
  }
  _onContextMenu(t) {
    const e = this.findTarget(t), s = this.targets || [], r = this._basicEventHandler("contextmenu:before", { e: t, target: e, subTargets: s });
    return this.stopContextMenu && Gi(t), this._basicEventHandler("contextmenu", r), !1;
  }
  _onDoubleClick(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "dblclick"), this._resetTransformEventData();
  }
  getPointerId(t) {
    const e = t.changedTouches;
    return e ? e[0] && e[0].identifier : this.enablePointerEvents ? t.pointerId : -1;
  }
  _isMainEvent(t) {
    return t.isPrimary === !0 || t.isPrimary !== !1 && (t.type === "touchend" && t.touches.length === 0 || !t.changedTouches || t.changedTouches[0].identifier === this.mainTouchId);
  }
  _onTouchStart(t) {
    let e = !this.allowTouchScrolling;
    const s = this._activeObject;
    this.mainTouchId === void 0 && (this.mainTouchId = this.getPointerId(t)), this.__onMouseDown(t), (this.isDrawingMode || s && this._target === s) && (e = !0), e && t.preventDefault(), this._resetTransformEventData();
    const r = this.upperCanvasEl, n = this._getEventPrefix(), o = jt(r);
    fe(o, "touchend", this._onTouchEnd, vt), e && fe(o, "touchmove", this._onMouseMove, vt), _t(r, "".concat(n, "down"), this._onMouseDown);
  }
  _onMouseDown(t) {
    this.__onMouseDown(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    _t(e, "".concat(s, "move"), this._onMouseMove, vt);
    const r = jt(e);
    fe(r, "".concat(s, "up"), this._onMouseUp), fe(r, "".concat(s, "move"), this._onMouseMove, vt);
  }
  _onTouchEnd(t) {
    if (t.touches.length > 0) return;
    this.__onMouseUp(t), this._resetTransformEventData(), delete this.mainTouchId;
    const e = this._getEventPrefix(), s = jt(this.upperCanvasEl);
    _t(s, "touchend", this._onTouchEnd, vt), _t(s, "touchmove", this._onMouseMove, vt), this._willAddMouseDown && clearTimeout(this._willAddMouseDown), this._willAddMouseDown = setTimeout(() => {
      fe(this.upperCanvasEl, "".concat(e, "down"), this._onMouseDown), this._willAddMouseDown = 0;
    }, 400);
  }
  _onMouseUp(t) {
    this.__onMouseUp(t), this._resetTransformEventData();
    const e = this.upperCanvasEl, s = this._getEventPrefix();
    if (this._isMainEvent(t)) {
      const r = jt(this.upperCanvasEl);
      _t(r, "".concat(s, "up"), this._onMouseUp), _t(r, "".concat(s, "move"), this._onMouseMove, vt), fe(e, "".concat(s, "move"), this._onMouseMove, vt);
    }
  }
  _onMouseMove(t) {
    const e = this.getActiveObject();
    !this.allowTouchScrolling && (!e || !e.shouldStartDragging(t)) && t.preventDefault && t.preventDefault(), this.__onMouseMove(t);
  }
  _onResize() {
    this.calcOffset(), this._resetTransformEventData();
  }
  _shouldRender(t) {
    const e = this.getActiveObject();
    return !!e != !!t || e && t && e !== t;
  }
  __onMouseUp(t) {
    var e;
    this._cacheTransformEventData(t), this._handleEvent(t, "up:before");
    const s = this._currentTransform, r = this._isClick, n = this._target, { button: o } = t;
    if (o) return (this.fireMiddleClick && o === 1 || this.fireRightClick && o === 2) && this._handleEvent(t, "up"), void this._resetTransformEventData();
    if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    let a, c, h = !1;
    if (s && (this._finalizeCurrentTransform(t), h = s.actionPerformed), !r) {
      const l = n === this._activeObject;
      this.handleSelection(t), h || (h = this._shouldRender(n) || !l && n === this._activeObject);
    }
    if (n) {
      const l = n.findControl(this.getViewportPoint(t), Wr(t)), { key: u, control: d } = l || {};
      if (c = u, n.selectable && n !== this._activeObject && n.activeOn === "up") this.setActiveObject(n, t), h = !0;
      else if (d) {
        const g = d.getMouseUpHandler(t, n, d);
        g && (a = this.getScenePoint(t), g.call(d, t, s, a.x, a.y));
      }
      n.isMoving = !1;
    }
    if (s && (s.target !== n || s.corner !== c)) {
      const l = s.target && s.target.controls[s.corner], u = l && l.getMouseUpHandler(t, s.target, l);
      a = a || this.getScenePoint(t), u && u.call(l, t, s, a.x, a.y);
    }
    this._setCursorFromEvent(t, n), this._handleEvent(t, "up"), this._groupSelector = null, this._currentTransform = null, n && (n.__corner = void 0), h ? this.requestRenderAll() : r || (e = this._activeObject) !== null && e !== void 0 && e.isEditing || this.renderTop();
  }
  _basicEventHandler(t, e) {
    const { target: s, subTargets: r = [] } = e;
    this.fire(t, e), s && s.fire(t, e);
    for (let n = 0; n < r.length; n++) r[n] !== s && r[n].fire(t, e);
    return e;
  }
  _handleEvent(t, e) {
    const s = this._target, r = this.targets || [], n = v(v({ e: t, target: s, subTargets: r }, qe(this, t)), {}, { transform: this._currentTransform }, e === "up:before" || e === "up" ? { isClick: this._isClick, currentTarget: this.findTarget(t), currentSubTargets: this.targets } : {});
    this.fire("mouse:".concat(e), n), s && s.fire("mouse".concat(e), n);
    for (let o = 0; o < r.length; o++) r[o] !== s && r[o].fire("mouse".concat(e), n);
  }
  _onMouseDownInDrawingMode(t) {
    this._isCurrentlyDrawing = !0, this.getActiveObject() && (this.discardActiveObject(t), this.requestRenderAll());
    const e = this.getScenePoint(t);
    this.freeDrawingBrush && this.freeDrawingBrush.onMouseDown(e, { e: t, pointer: e }), this._handleEvent(t, "down");
  }
  _onMouseMoveInDrawingMode(t) {
    if (this._isCurrentlyDrawing) {
      const e = this.getScenePoint(t);
      this.freeDrawingBrush && this.freeDrawingBrush.onMouseMove(e, { e: t, pointer: e });
    }
    this.setCursor(this.freeDrawingCursor), this._handleEvent(t, "move");
  }
  _onMouseUpInDrawingMode(t) {
    const e = this.getScenePoint(t);
    this.freeDrawingBrush ? this._isCurrentlyDrawing = !!this.freeDrawingBrush.onMouseUp({ e: t, pointer: e }) : this._isCurrentlyDrawing = !1, this._handleEvent(t, "up");
  }
  __onMouseDown(t) {
    this._isClick = !0, this._cacheTransformEventData(t), this._handleEvent(t, "down:before");
    let e = this._target;
    const { button: s } = t;
    if (s) return (this.fireMiddleClick && s === 1 || this.fireRightClick && s === 2) && this._handleEvent(t, "down"), void this._resetTransformEventData();
    if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t);
    if (!this._isMainEvent(t) || this._currentTransform) return;
    let r = this._shouldRender(e), n = !1;
    if (this.handleMultiSelection(t, e) ? (e = this._activeObject, n = !0, r = !0) : this._shouldClearSelection(t, e) && this.discardActiveObject(t), this.selection && (!e || !e.selectable && !e.isEditing && e !== this._activeObject)) {
      const o = this.getScenePoint(t);
      this._groupSelector = { x: o.x, y: o.y, deltaY: 0, deltaX: 0 };
    }
    if (e) {
      const o = e === this._activeObject;
      e.selectable && e.activeOn === "down" && this.setActiveObject(e, t);
      const a = e.findControl(this.getViewportPoint(t), Wr(t));
      if (e === this._activeObject && (a || !n)) {
        this._setupCurrentTransform(t, e, o);
        const c = a ? a.control : void 0, h = this.getScenePoint(t), l = c && c.getMouseDownHandler(t, e, c);
        l && l.call(c, t, this._currentTransform, h.x, h.y);
      }
    }
    r && (this._objectsToRender = void 0), this._handleEvent(t, "down"), r && this.requestRenderAll();
  }
  _resetTransformEventData() {
    this._target = this._pointer = this._absolutePointer = void 0;
  }
  _cacheTransformEventData(t) {
    this._resetTransformEventData(), this._pointer = this.getViewportPoint(t), this._absolutePointer = re(this._pointer, void 0, this.viewportTransform), this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t);
  }
  __onMouseMove(t) {
    if (this._isClick = !1, this._cacheTransformEventData(t), this._handleEvent(t, "move:before"), this.isDrawingMode) return void this._onMouseMoveInDrawingMode(t);
    if (!this._isMainEvent(t)) return;
    const e = this._groupSelector;
    if (e) {
      const s = this.getScenePoint(t);
      e.deltaX = s.x - e.x, e.deltaY = s.y - e.y, this.renderTop();
    } else if (this._currentTransform) this._transformObject(t);
    else {
      const s = this.findTarget(t);
      this._setCursorFromEvent(t, s), this._fireOverOutEvents(t, s);
    }
    this.textEditingManager.onMouseMove(t), this._handleEvent(t, "move"), this._resetTransformEventData();
  }
  _fireOverOutEvents(t, e) {
    const s = this._hoveredTarget, r = this._hoveredTargets, n = this.targets, o = Math.max(r.length, n.length);
    this.fireSyntheticInOutEvents("mouse", { e: t, target: e, oldTarget: s, fireCanvas: !0 });
    for (let a = 0; a < o; a++) this.fireSyntheticInOutEvents("mouse", { e: t, target: n[a], oldTarget: r[a] });
    this._hoveredTarget = e, this._hoveredTargets = this.targets.concat();
  }
  _fireEnterLeaveEvents(t, e) {
    const s = this._draggedoverTarget, r = this._hoveredTargets, n = this.targets, o = Math.max(r.length, n.length);
    this.fireSyntheticInOutEvents("drag", v(v({}, e), {}, { target: t, oldTarget: s, fireCanvas: !0 }));
    for (let a = 0; a < o; a++) this.fireSyntheticInOutEvents("drag", v(v({}, e), {}, { target: n[a], oldTarget: r[a] }));
    this._draggedoverTarget = t;
  }
  fireSyntheticInOutEvents(t, e) {
    let { target: s, oldTarget: r, fireCanvas: n, e: o } = e, a = H(e, Vu);
    const { targetIn: c, targetOut: h, canvasIn: l, canvasOut: u } = Gu[t], d = r !== s;
    if (r && d) {
      const g = v(v({}, a), {}, { e: o, target: r, nextTarget: s }, qe(this, o));
      n && this.fire(u, g), r.fire(h, g);
    }
    if (s && d) {
      const g = v(v({}, a), {}, { e: o, target: s, previousTarget: r }, qe(this, o));
      n && this.fire(l, g), s.fire(c, g);
    }
  }
  __onMouseWheel(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, "wheel"), this._resetTransformEventData();
  }
  _transformObject(t) {
    const e = this.getScenePoint(t), s = this._currentTransform, r = s.target, n = r.group ? re(e, void 0, r.group.calcTransformMatrix()) : e;
    s.shiftKey = t.shiftKey, s.altKey = !!this.centeredKey && t[this.centeredKey], this._performTransformAction(t, s, n), s.actionPerformed && this.requestRenderAll();
  }
  _performTransformAction(t, e, s) {
    const { action: r, actionHandler: n, target: o } = e, a = !!n && n(t, e, s.x, s.y);
    a && o.setCoords(), r === "drag" && a && (e.target.isMoving = !0, this.setCursor(e.target.moveCursor || this.moveCursor)), e.actionPerformed = e.actionPerformed || a;
  }
  _setCursorFromEvent(t, e) {
    if (!e) return void this.setCursor(this.defaultCursor);
    let s = e.hoverCursor || this.hoverCursor;
    const r = De(this._activeObject) ? this._activeObject : null, n = (!r || e.group !== r) && e.findControl(this.getViewportPoint(t));
    if (n) {
      const o = n.control;
      this.setCursor(o.cursorStyleHandler(t, o, e));
    } else e.subTargetCheck && this.targets.concat().reverse().map((o) => {
      s = o.hoverCursor || s;
    }), this.setCursor(s);
  }
  handleMultiSelection(t, e) {
    const s = this._activeObject, r = De(s);
    if (s && this._isSelectionKeyPressed(t) && this.selection && e && e.selectable && (s !== e || r) && (r || !e.isDescendantOf(s) && !s.isDescendantOf(e)) && !e.onSelect({ e: t }) && !s.getActiveControl()) {
      if (r) {
        const n = s.getObjects();
        if (e === s) {
          const o = this.getViewportPoint(t);
          if (!(e = this.searchPossibleTargets(n, o) || this.searchPossibleTargets(this._objects, o)) || !e.selectable) return !1;
        }
        e.group === s ? (s.remove(e), this._hoveredTarget = e, this._hoveredTargets = [...this.targets], s.size() === 1 && this._setActiveObject(s.item(0), t)) : (s.multiSelectAdd(e), this._hoveredTarget = s, this._hoveredTargets = [...this.targets]), this._fireSelectionEvents(n, t);
      } else {
        s.isEditing && s.exitEditing();
        const n = new (O.getClass("ActiveSelection"))([], { canvas: this });
        n.multiSelectAdd(s, e), this._hoveredTarget = n, this._setActiveObject(n, t), this._fireSelectionEvents([s], t);
      }
      return !0;
    }
    return !1;
  }
  handleSelection(t) {
    if (!this.selection || !this._groupSelector) return !1;
    const { x: e, y: s, deltaX: r, deltaY: n } = this._groupSelector, o = new _(e, s), a = o.add(new _(r, n)), c = o.min(a), h = o.max(a).subtract(c), l = this.collectObjects({ left: c.x, top: c.y, width: h.x, height: h.y }, { includeIntersecting: !this.selectionFullyContained }), u = o.eq(a) ? l[0] ? [l[0]] : [] : l.length > 1 ? l.filter((d) => !d.onSelect({ e: t })).reverse() : l;
    if (u.length === 1) this.setActiveObject(u[0], t);
    else if (u.length > 1) {
      const d = O.getClass("ActiveSelection");
      this.setActiveObject(new d(u, { canvas: this }), t);
    }
    return this._groupSelector = null, !0;
  }
  clear() {
    this.textEditingManager.clear(), super.clear();
  }
  destroy() {
    this.removeListeners(), this.textEditingManager.dispose(), super.destroy();
  }
}
const Pc = { x1: 0, y1: 0, x2: 0, y2: 0 }, Nu = v(v({}, Pc), {}, { r1: 0, r2: 0 }), Je = (i, t) => isNaN(i) && typeof t == "number" ? t : i, Uu = /^(\d+\.\d+)%|(\d+)%$/;
function Ac(i) {
  return i && Uu.test(i);
}
function Rc(i, t) {
  const e = typeof i == "number" ? i : typeof i == "string" ? parseFloat(i) / (Ac(i) ? 100 : 1) : NaN;
  return We(0, Je(e, t), 1);
}
const $u = /\s*;\s*/, qu = /\s*:\s*/;
function Ku(i, t) {
  let e, s;
  const r = i.getAttribute("style");
  if (r) {
    const o = r.split($u);
    o[o.length - 1] === "" && o.pop();
    for (let a = o.length; a--; ) {
      const [c, h] = o[a].split(qu).map((l) => l.trim());
      c === "stop-color" ? e = h : c === "stop-opacity" && (s = h);
    }
  }
  const n = new F(e || i.getAttribute("stop-color") || "rgb(0,0,0)");
  return { offset: Rc(i.getAttribute("offset"), 0), color: n.toRgb(), opacity: Je(parseFloat(s || i.getAttribute("stop-opacity") || ""), 1) * n.getAlpha() * t };
}
function Ju(i, t) {
  const e = [], s = i.getElementsByTagName("stop"), r = Rc(t, 1);
  for (let n = s.length; n--; ) e.push(Ku(s[n], r));
  return e;
}
function Fc(i) {
  return i.nodeName === "linearGradient" || i.nodeName === "LINEARGRADIENT" ? "linear" : "radial";
}
function Lc(i) {
  return i.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage";
}
function kt(i, t) {
  return i.getAttribute(t);
}
function Zu(i, t) {
  return function(e, s) {
    let r, { width: n, height: o, gradientUnits: a } = s;
    return Object.keys(e).reduce((c, h) => {
      const l = e[h];
      return l === "Infinity" ? r = 1 : l === "-Infinity" ? r = 0 : (r = typeof l == "string" ? parseFloat(l) : l, typeof l == "string" && Ac(l) && (r *= 0.01, a === "pixels" && (h !== "x1" && h !== "x2" && h !== "r2" || (r *= n), h !== "y1" && h !== "y2" || (r *= o)))), c[h] = r, c;
    }, {});
  }(Fc(i) === "linear" ? function(e) {
    return { x1: kt(e, "x1") || 0, y1: kt(e, "y1") || 0, x2: kt(e, "x2") || "100%", y2: kt(e, "y2") || 0 };
  }(i) : function(e) {
    return { x1: kt(e, "fx") || kt(e, "cx") || "50%", y1: kt(e, "fy") || kt(e, "cy") || "50%", r1: 0, x2: kt(e, "cx") || "50%", y2: kt(e, "cy") || "50%", r2: kt(e, "r") || "50%" };
  }(i), v(v({}, t), {}, { gradientUnits: Lc(i) }));
}
class or {
  constructor(t) {
    const { type: e = "linear", gradientUnits: s = "pixels", coords: r = {}, colorStops: n = [], offsetX: o = 0, offsetY: a = 0, gradientTransform: c, id: h } = t || {};
    Object.assign(this, { type: e, gradientUnits: s, coords: v(v({}, e === "radial" ? Nu : Pc), r), colorStops: n, offsetX: o, offsetY: a, gradientTransform: c, id: h ? "".concat(h, "_").concat(be()) : be() });
  }
  addColorStop(t) {
    for (const e in t) {
      const s = new F(t[e]);
      this.colorStops.push({ offset: parseFloat(e), color: s.toRgb(), opacity: s.getAlpha() });
    }
    return this;
  }
  toObject(t) {
    return v(v({}, He(this, t)), {}, { type: this.type, coords: v({}, this.coords), colorStops: this.colorStops.map((e) => v({}, e)), offsetX: this.offsetX, offsetY: this.offsetY, gradientUnits: this.gradientUnits, gradientTransform: this.gradientTransform ? [...this.gradientTransform] : void 0 });
  }
  toSVG(t) {
    let { additionalTransform: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = [], r = this.gradientTransform ? this.gradientTransform.concat() : lt.concat(), n = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox", o = this.colorStops.map((u) => v({}, u)).sort((u, d) => u.offset - d.offset);
    let a = -this.offsetX, c = -this.offsetY;
    var h;
    n === "objectBoundingBox" ? (a /= t.width, c /= t.height) : (a += t.width / 2, c += t.height / 2), (h = t) && typeof h._renderPathCommands == "function" && this.gradientUnits !== "percentage" && (a -= t.pathOffset.x, c -= t.pathOffset.y), r[4] -= a, r[5] -= c;
    const l = ['id="SVGID_'.concat(this.id, '"'), 'gradientUnits="'.concat(n, '"'), 'gradientTransform="'.concat(e ? e + " " : "").concat(Bs(r), '"'), ""].join(" ");
    if (this.type === "linear") {
      const { x1: u, y1: d, x2: g, y2: f } = this.coords;
      s.push("<linearGradient ", l, ' x1="', u, '" y1="', d, '" x2="', g, '" y2="', f, `">
`);
    } else if (this.type === "radial") {
      const { x1: u, y1: d, x2: g, y2: f, r1: p, r2: m } = this.coords, b = p > m;
      s.push("<radialGradient ", l, ' cx="', b ? u : g, '" cy="', b ? d : f, '" r="', b ? p : m, '" fx="', b ? g : u, '" fy="', b ? f : d, `">
`), b && (o.reverse(), o.forEach((w) => {
        w.offset = 1 - w.offset;
      }));
      const T = Math.min(p, m);
      if (T > 0) {
        const w = T / Math.max(p, m);
        o.forEach((S) => {
          S.offset += w * (1 - S.offset);
        });
      }
    }
    return o.forEach((u) => {
      let { color: d, offset: g, opacity: f } = u;
      s.push("<stop ", 'offset="', 100 * g + "%", '" style="stop-color:', d, f !== void 0 ? ";stop-opacity: " + f : ";", `"/>
`);
    }), s.push(this.type === "linear" ? "</linearGradient>" : "</radialGradient>", `
`), s.join("");
  }
  toLive(t) {
    const { x1: e, y1: s, x2: r, y2: n, r1: o, r2: a } = this.coords, c = this.type === "linear" ? t.createLinearGradient(e, s, r, n) : t.createRadialGradient(e, s, o, r, n, a);
    return this.colorStops.forEach((h) => {
      let { color: l, opacity: u, offset: d } = h;
      c.addColorStop(d, u !== void 0 ? new F(l).setAlpha(u).toRgba() : l);
    }), c;
  }
  static async fromObject(t) {
    const { colorStops: e, gradientTransform: s } = t;
    return new this(v(v({}, t), {}, { colorStops: e ? e.map((r) => v({}, r)) : void 0, gradientTransform: s ? [...s] : void 0 }));
  }
  static fromElement(t, e, s) {
    const r = Lc(t), n = e._findCenterFromElement();
    return new this(v({ id: t.getAttribute("id") || void 0, type: Fc(t), coords: Zu(t, { width: s.viewBoxWidth || s.width, height: s.viewBoxHeight || s.height }), colorStops: Ju(t, s.opacity), gradientUnits: r, gradientTransform: Zi(t.getAttribute("gradientTransform") || "") }, r === "pixels" ? { offsetX: e.width / 2 - n.x, offsetY: e.height / 2 - n.y } : { offsetX: 0, offsetY: 0 }));
  }
}
y(or, "type", "Gradient"), O.setClass(or, "gradient"), O.setClass(or, "linear"), O.setClass(or, "radial");
const Qu = ["type", "source", "patternTransform"];
class Di {
  get type() {
    return "pattern";
  }
  set type(t) {
    ve("warn", "Setting type has no effect", t);
  }
  constructor(t) {
    y(this, "repeat", "repeat"), y(this, "offsetX", 0), y(this, "offsetY", 0), y(this, "crossOrigin", ""), this.id = be(), Object.assign(this, t);
  }
  isImageSource() {
    return !!this.source && typeof this.source.src == "string";
  }
  isCanvasSource() {
    return !!this.source && !!this.source.toDataURL;
  }
  sourceToString() {
    return this.isImageSource() ? this.source.src : this.isCanvasSource() ? this.source.toDataURL() : "";
  }
  toLive(t) {
    return this.source && (!this.isImageSource() || this.source.complete && this.source.naturalWidth !== 0 && this.source.naturalHeight !== 0) ? t.createPattern(this.source, this.repeat) : null;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const { repeat: e, crossOrigin: s } = this;
    return v(v({}, He(this, t)), {}, { type: "pattern", source: this.sourceToString(), repeat: e, crossOrigin: s, offsetX: z(this.offsetX, E.NUM_FRACTION_DIGITS), offsetY: z(this.offsetY, E.NUM_FRACTION_DIGITS), patternTransform: this.patternTransform ? [...this.patternTransform] : null });
  }
  toSVG(t) {
    let { width: e, height: s } = t;
    const { source: r, repeat: n, id: o } = this, a = Je(this.offsetX / e, 0), c = Je(this.offsetY / s, 0), h = n === "repeat-y" || n === "no-repeat" ? 1 + Math.abs(a || 0) : Je(r.width / e, 0), l = n === "repeat-x" || n === "no-repeat" ? 1 + Math.abs(c || 0) : Je(r.height / s, 0);
    return ['<pattern id="SVGID_'.concat(o, '" x="').concat(a, '" y="').concat(c, '" width="').concat(h, '" height="').concat(l, '">'), '<image x="0" y="0" width="'.concat(r.width, '" height="').concat(r.height, '" xlink:href="').concat(this.sourceToString(), '"></image>'), "</pattern>", ""].join(`
`);
  }
  static async fromObject(t, e) {
    let { type: s, source: r, patternTransform: n } = t, o = H(t, Qu);
    const a = await js(r, v(v({}, e), {}, { crossOrigin: o.crossOrigin }));
    return new this(v(v({}, o), {}, { patternTransform: n && n.slice(0), source: a }));
  }
}
y(Di, "type", "Pattern"), O.setClass(Di), O.setClass(Di, "pattern");
const td = ["path", "left", "top"], ed = ["d"];
class je extends ot {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, { path: s, left: r, top: n } = e, o = H(e, td);
    super(), Object.assign(this, je.ownDefaults), this.setOptions(o), this._setPath(t || [], !0), typeof r == "number" && this.set(A, r), typeof n == "number" && this.set(gt, n);
  }
  _setPath(t, e) {
    this.path = Cc(Array.isArray(t) ? t : Ic(t)), this.setBoundingBox(e);
  }
  _findCenterFromElement() {
    const t = this._calcBoundsFromPath();
    return new _(t.left + t.width / 2, t.top + t.height / 2);
  }
  _renderPathCommands(t) {
    const e = -this.pathOffset.x, s = -this.pathOffset.y;
    t.beginPath();
    for (const r of this.path) switch (r[0]) {
      case "L":
        t.lineTo(r[1] + e, r[2] + s);
        break;
      case "M":
        t.moveTo(r[1] + e, r[2] + s);
        break;
      case "C":
        t.bezierCurveTo(r[1] + e, r[2] + s, r[3] + e, r[4] + s, r[5] + e, r[6] + s);
        break;
      case "Q":
        t.quadraticCurveTo(r[1] + e, r[2] + s, r[3] + e, r[4] + s);
        break;
      case "Z":
        t.closePath();
    }
  }
  _render(t) {
    this._renderPathCommands(t), this._renderPaintInOrder(t);
  }
  toString() {
    return "#<Path (".concat(this.complexity(), '): { "top": ').concat(this.top, ', "left": ').concat(this.left, " }>");
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), {}, { path: this.path.map((e) => e.slice()) });
  }
  toDatalessObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = this.toObject(t);
    return this.sourcePath && (delete e.path, e.sourcePath = this.sourcePath), e;
  }
  _toSVG() {
    const t = Ec(this.path, E.NUM_FRACTION_DIGITS);
    return ["<path ", "COMMON_PARTS", 'd="'.concat(t, `" stroke-linecap="round" />
`)];
  }
  _getOffsetTransform() {
    const t = E.NUM_FRACTION_DIGITS;
    return " translate(".concat(z(-this.pathOffset.x, t), ", ").concat(z(-this.pathOffset.y, t), ")");
  }
  toClipPathSVG(t) {
    const e = this._getOffsetTransform();
    return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  toSVG(t) {
    const e = this._getOffsetTransform();
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: t, additionalTransform: e });
  }
  complexity() {
    return this.path.length;
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { width: e, height: s, pathOffset: r } = this._calcDimensions();
    this.set({ width: e, height: s, pathOffset: r }), t && this.setPositionByOrigin(r, j, j);
  }
  _calcBoundsFromPath() {
    const t = [];
    let e = 0, s = 0, r = 0, n = 0;
    for (const o of this.path) switch (o[0]) {
      case "L":
        r = o[1], n = o[2], t.push({ x: e, y: s }, { x: r, y: n });
        break;
      case "M":
        r = o[1], n = o[2], e = r, s = n;
        break;
      case "C":
        t.push(...en(r, n, o[1], o[2], o[3], o[4], o[5], o[6])), r = o[5], n = o[6];
        break;
      case "Q":
        t.push(...en(r, n, o[1], o[2], o[1], o[2], o[3], o[4])), r = o[3], n = o[4];
        break;
      case "Z":
        r = e, n = s;
    }
    return Xt(t);
  }
  _calcDimensions() {
    const t = this._calcBoundsFromPath();
    return v(v({}, t), {}, { pathOffset: new _(t.left + t.width / 2, t.top + t.height / 2) });
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "path" });
  }
  static async fromElement(t, e, s) {
    const r = ce(t, this.ATTRIBUTE_NAMES, s), { d: n } = r;
    return new this(n, v(v(v({}, H(r, ed)), e), {}, { left: void 0, top: void 0 }));
  }
}
y(je, "type", "Path"), y(je, "cacheProperties", [...ae, "path", "fillRule"]), y(je, "ATTRIBUTE_NAMES", [...Oe, "d"]), O.setClass(je), O.setSVGClass(je);
const sd = ["left", "top", "radius"], Bc = ["radius", "startAngle", "endAngle", "counterClockwise"];
class Jt extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Jt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Jt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    return super._set(t, e), t === "radius" && this.setRadius(e), this;
  }
  _render(t) {
    t.beginPath(), t.arc(0, 0, this.radius, U(this.startAngle), U(this.endAngle), this.counterClockwise), this._renderPaintInOrder(t);
  }
  getRadiusX() {
    return this.get("radius") * this.get(ut);
  }
  getRadiusY() {
    return this.get("radius") * this.get(bt);
  }
  setRadius(t) {
    this.radius = t, this.set({ width: 2 * t, height: 2 * t });
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Bc, ...t]);
  }
  _toSVG() {
    const t = (this.endAngle - this.startAngle) % 360;
    if (t === 0) return ["<circle ", "COMMON_PARTS", 'cx="0" cy="0" ', 'r="', "".concat(this.radius), `" />
`];
    {
      const { radius: e } = this, s = U(this.startAngle), r = U(this.endAngle), n = Pt(s) * e, o = At(s) * e, a = Pt(r) * e, c = At(r) * e, h = t > 180 ? 1 : 0, l = this.counterClockwise ? 0 : 1;
      return ['<path d="M '.concat(n, " ").concat(o, " A ").concat(e, " ").concat(e, " 0 ").concat(h, " ").concat(l, " ").concat(a, " ").concat(c, '" '), "COMMON_PARTS", ` />
`];
    }
  }
  static async fromElement(t, e, s) {
    const r = ce(t, this.ATTRIBUTE_NAMES, s), { left: n = 0, top: o = 0, radius: a = 0 } = r;
    return new this(v(v({}, H(r, sd)), {}, { radius: a, left: n - a, top: o - a }));
  }
  static fromObject(t) {
    return super._fromObject(t);
  }
}
y(Jt, "type", "Circle"), y(Jt, "cacheProperties", [...ae, ...Bc]), y(Jt, "ownDefaults", { radius: 0, startAngle: 0, endAngle: 360, counterClockwise: !1 }), y(Jt, "ATTRIBUTE_NAMES", ["cx", "cy", "r", ...Oe]), O.setClass(Jt), O.setSVGClass(Jt);
const rd = ["x1", "y1", "x2", "y2"], id = ["x1", "y1", "x2", "y2"], rn = ["x1", "x2", "y1", "y2"];
class pe extends ot {
  constructor() {
    let [t, e, s, r] = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [0, 0, 0, 0], n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, pe.ownDefaults), this.setOptions(n), this.x1 = t, this.x2 = s, this.y1 = e, this.y2 = r, this._setWidthHeight();
    const { left: o, top: a } = n;
    typeof o == "number" && this.set(A, o), typeof a == "number" && this.set(gt, a);
  }
  _setWidthHeight() {
    const { x1: t, y1: e, x2: s, y2: r } = this;
    this.width = Math.abs(s - t), this.height = Math.abs(r - e);
    const { left: n, top: o, width: a, height: c } = Xt([{ x: t, y: e }, { x: s, y: r }]), h = new _(n + a / 2, o + c / 2);
    this.setPositionByOrigin(h, j, j);
  }
  _set(t, e) {
    return super._set(t, e), rn.includes(t) && this._setWidthHeight(), this;
  }
  _render(t) {
    t.beginPath();
    const e = this.calcLinePoints();
    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2), t.lineWidth = this.strokeWidth;
    const s = t.strokeStyle;
    var r;
    xt(this.stroke) ? t.strokeStyle = this.stroke.toLive(t) : t.strokeStyle = (r = this.stroke) !== null && r !== void 0 ? r : t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = s;
  }
  _findCenterFromElement() {
    return new _((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), this.calcLinePoints());
  }
  _getNonTransformedDimensions() {
    const t = super._getNonTransformedDimensions();
    return this.strokeLineCap === "butt" && (this.width === 0 && (t.y -= this.strokeWidth), this.height === 0 && (t.x -= this.strokeWidth)), t;
  }
  calcLinePoints() {
    const { x1: t, x2: e, y1: s, y2: r, width: n, height: o } = this, a = t <= e ? -1 : 1, c = s <= r ? -1 : 1;
    return { x1: a * n / 2, x2: a * -n / 2, y1: c * o / 2, y2: c * -o / 2 };
  }
  _toSVG() {
    const { x1: t, x2: e, y1: s, y2: r } = this.calcLinePoints();
    return ["<line ", "COMMON_PARTS", 'x1="'.concat(t, '" y1="').concat(s, '" x2="').concat(e, '" y2="').concat(r, `" />
`)];
  }
  static async fromElement(t, e, s) {
    const r = ce(t, this.ATTRIBUTE_NAMES, s), { x1: n = 0, y1: o = 0, x2: a = 0, y2: c = 0 } = r;
    return new this([n, o, a, c], H(r, rd));
  }
  static fromObject(t) {
    let { x1: e, y1: s, x2: r, y2: n } = t, o = H(t, id);
    return this._fromObject(v(v({}, o), {}, { points: [e, s, r, n] }), { extraParam: "points" });
  }
}
y(pe, "type", "Line"), y(pe, "cacheProperties", [...ae, ...rn]), y(pe, "ATTRIBUTE_NAMES", Oe.concat(rn)), O.setClass(pe), O.setSVGClass(pe);
class Ee extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Ee.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Ee.ownDefaults), this.setOptions(t);
  }
  _render(t) {
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, s), t.lineTo(0, -s), t.lineTo(e, s), t.closePath(), this._renderPaintInOrder(t);
  }
  _toSVG() {
    const t = this.width / 2, e = this.height / 2;
    return ["<polygon ", "COMMON_PARTS", 'points="', "".concat(-t, " ").concat(e, ",0 ").concat(-e, ",").concat(t, " ").concat(e), '" />'];
  }
}
y(Ee, "type", "Triangle"), y(Ee, "ownDefaults", { width: 100, height: 100 }), O.setClass(Ee), O.setSVGClass(Ee);
const Wc = ["rx", "ry"];
class Zt extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Zt.ownDefaults);
  }
  constructor(t) {
    super(), Object.assign(this, Zt.ownDefaults), this.setOptions(t);
  }
  _set(t, e) {
    switch (super._set(t, e), t) {
      case "rx":
        this.rx = e, this.set("width", 2 * e);
        break;
      case "ry":
        this.ry = e, this.set("height", 2 * e);
    }
    return this;
  }
  getRx() {
    return this.get("rx") * this.get(ut);
  }
  getRy() {
    return this.get("ry") * this.get(bt);
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject([...Wc, ...t]);
  }
  _toSVG() {
    return ["<ellipse ", "COMMON_PARTS", 'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(this.ry, `" />
`)];
  }
  _render(t) {
    t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(0, 0, this.rx, 0, oe, !1), t.restore(), this._renderPaintInOrder(t);
  }
  static async fromElement(t, e, s) {
    const r = ce(t, this.ATTRIBUTE_NAMES, s);
    return r.left = (r.left || 0) - r.rx, r.top = (r.top || 0) - r.ry, new this(r);
  }
}
function nd(i) {
  if (!i) return [];
  const t = i.replace(/,/g, " ").trim().split(/\s+/), e = [];
  for (let s = 0; s < t.length; s += 2) e.push({ x: parseFloat(t[s]), y: parseFloat(t[s + 1]) });
  return e;
}
y(Zt, "type", "Ellipse"), y(Zt, "cacheProperties", [...ae, ...Wc]), y(Zt, "ownDefaults", { rx: 0, ry: 0 }), y(Zt, "ATTRIBUTE_NAMES", [...Oe, "cx", "cy", "rx", "ry"]), O.setClass(Zt), O.setSVGClass(Zt);
const od = ["left", "top"], Xc = { exactBoundingBox: !1 };
class Mt extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Mt.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), y(this, "strokeDiff", void 0), Object.assign(this, Mt.ownDefaults), this.setOptions(e), this.points = t;
    const { left: s, top: r } = e;
    this.initialized = !0, this.setBoundingBox(!0), typeof s == "number" && this.set(A, s), typeof r == "number" && this.set(gt, r);
  }
  isOpen() {
    return !0;
  }
  _projectStrokeOnPoints(t) {
    return mc(this.points, t, this.isOpen());
  }
  _calcDimensions(t) {
    t = v({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: this.strokeMiterLimit, strokeUniform: this.strokeUniform, strokeWidth: this.strokeWidth }, t || {});
    const e = this.exactBoundingBox ? this._projectStrokeOnPoints(t).map((h) => h.projectedPoint) : this.points;
    if (e.length === 0) return { left: 0, top: 0, width: 0, height: 0, pathOffset: new _(), strokeOffset: new _(), strokeDiff: new _() };
    const s = Xt(e), r = $s(v(v({}, t), {}, { scaleX: 1, scaleY: 1 })), n = Xt(this.points.map((h) => at(h, r, !0))), o = new _(this.scaleX, this.scaleY);
    let a = s.left + s.width / 2, c = s.top + s.height / 2;
    return this.exactBoundingBox && (a -= c * Math.tan(U(this.skewX)), c -= a * Math.tan(U(this.skewY))), v(v({}, s), {}, { pathOffset: new _(a, c), strokeOffset: new _(n.left, n.top).subtract(new _(s.left, s.top)).multiply(o), strokeDiff: new _(s.width, s.height).subtract(new _(n.width, n.height)).multiply(o) });
  }
  _findCenterFromElement() {
    const t = Xt(this.points);
    return new _(t.left + t.width / 2, t.top + t.height / 2);
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t) {
    const { left: e, top: s, width: r, height: n, pathOffset: o, strokeOffset: a, strokeDiff: c } = this._calcDimensions();
    this.set({ width: r, height: n, pathOffset: o, strokeOffset: a, strokeDiff: c }), t && this.setPositionByOrigin(new _(e + r / 2, s + n / 2), j, j);
  }
  isStrokeAccountedForInDimensions() {
    return this.exactBoundingBox;
  }
  _getNonTransformedDimensions() {
    return this.exactBoundingBox ? new _(this.width, this.height) : super._getNonTransformedDimensions();
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (this.exactBoundingBox) {
      let o;
      if (Object.keys(t).some((a) => this.strokeUniform || this.constructor.layoutProperties.includes(a))) {
        var e, s;
        const { width: a, height: c } = this._calcDimensions(t);
        o = new _((e = t.width) !== null && e !== void 0 ? e : a, (s = t.height) !== null && s !== void 0 ? s : c);
      } else {
        var r, n;
        o = new _((r = t.width) !== null && r !== void 0 ? r : this.width, (n = t.height) !== null && n !== void 0 ? n : this.height);
      }
      return o.multiply(new _(t.scaleX || this.scaleX, t.scaleY || this.scaleY));
    }
    return super._getTransformedDimensions(t);
  }
  _set(t, e) {
    const s = this.initialized && this[t] !== e, r = super._set(t, e);
    return this.exactBoundingBox && s && ((t === ut || t === bt) && this.strokeUniform && this.constructor.layoutProperties.includes("strokeUniform") || this.constructor.layoutProperties.includes(t)) && this.setDimensions(), r;
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject(t)), {}, { points: this.points.map((e) => {
      let { x: s, y: r } = e;
      return { x: s, y: r };
    }) });
  }
  _toSVG() {
    const t = [], e = this.pathOffset.x, s = this.pathOffset.y, r = E.NUM_FRACTION_DIGITS;
    for (let n = 0, o = this.points.length; n < o; n++) t.push(z(this.points[n].x - e, r), ",", z(this.points[n].y - s, r), " ");
    return ["<".concat(this.constructor.type.toLowerCase(), " "), "COMMON_PARTS", 'points="'.concat(t.join(""), `" />
`)];
  }
  _render(t) {
    const e = this.points.length, s = this.pathOffset.x, r = this.pathOffset.y;
    if (e && !isNaN(this.points[e - 1].y)) {
      t.beginPath(), t.moveTo(this.points[0].x - s, this.points[0].y - r);
      for (let n = 0; n < e; n++) {
        const o = this.points[n];
        t.lineTo(o.x - s, o.y - r);
      }
      !this.isOpen() && t.closePath(), this._renderPaintInOrder(t);
    }
  }
  complexity() {
    return this.points.length;
  }
  static async fromElement(t, e, s) {
    return new this(nd(t.getAttribute("points")), v(v({}, H(ce(t, this.ATTRIBUTE_NAMES, s), od)), e));
  }
  static fromObject(t) {
    return this._fromObject(t, { extraParam: "points" });
  }
}
y(Mt, "ownDefaults", Xc), y(Mt, "type", "Polyline"), y(Mt, "layoutProperties", [fs, ps, "strokeLineCap", "strokeLineJoin", "strokeMiterLimit", "strokeWidth", "strokeUniform", "points"]), y(Mt, "cacheProperties", [...ae, "points"]), y(Mt, "ATTRIBUTE_NAMES", [...Oe]), O.setClass(Mt), O.setSVGClass(Mt);
class ar extends Mt {
  isOpen() {
    return !1;
  }
}
y(ar, "ownDefaults", Xc), y(ar, "type", "Polygon"), O.setClass(ar), O.setSVGClass(ar);
const zc = ["fontSize", "fontWeight", "fontFamily", "fontStyle"], Hc = ["underline", "overline", "linethrough"], Yc = [...zc, "lineHeight", "text", "charSpacing", "textAlign", "styles", "path", "pathStartOffset", "pathSide", "pathAlign"], Vc = [...Yc, ...Hc, "textBackgroundColor", "direction"], ad = [...zc, ...Hc, pt, "strokeWidth", st, "deltaY", "textBackgroundColor"], cd = { _reNewline: _n, _reSpacesAndTabs: /[ \t\r]/g, _reSpaceAndTab: /[ \t\r]/, _reWords: /\S+/g, fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", underline: !1, overline: !1, linethrough: !1, textAlign: A, fontStyle: "normal", lineHeight: 1.16, superscript: { size: 0.6, baseline: -0.35 }, subscript: { size: 0.6, baseline: 0.11 }, textBackgroundColor: "", stroke: null, shadow: null, path: void 0, pathStartOffset: 0, pathSide: A, pathAlign: "baseline", _fontSizeFraction: 0.222, offsets: { underline: 0.1, linethrough: -0.315, overline: -0.88 }, _fontSizeMult: 1.13, charSpacing: 0, deltaY: 0, direction: "ltr", CACHE_FONT_SIZE: 400, MIN_TEXT_WIDTH: 2 }, Bt = "justify", $r = "justify-left", Is = "justify-right", Es = "justify-center";
class Gc extends ot {
  isEmptyStyles(t) {
    if (!this.styles || t !== void 0 && !this.styles[t]) return !0;
    const e = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const s in e) for (const r in e[s]) for (const n in e[s][r]) return !1;
    return !0;
  }
  styleHas(t, e) {
    if (!this.styles || e !== void 0 && !this.styles[e]) return !1;
    const s = e === void 0 ? this.styles : { 0: this.styles[e] };
    for (const r in s) for (const n in s[r]) if (s[r][n][t] !== void 0) return !0;
    return !1;
  }
  cleanStyle(t) {
    if (!this.styles) return !1;
    const e = this.styles;
    let s, r, n = 0, o = !0, a = 0;
    for (const c in e) {
      s = 0;
      for (const h in e[c]) {
        const l = e[c][h] || {};
        n++, l[t] !== void 0 ? (r ? l[t] !== r && (o = !1) : r = l[t], l[t] === this[t] && delete l[t]) : o = !1, Object.keys(l).length !== 0 ? s++ : delete e[c][h];
      }
      s === 0 && delete e[c];
    }
    for (let c = 0; c < this._textLines.length; c++) a += this._textLines[c].length;
    o && n === a && (this[t] = r, this.removeStyle(t));
  }
  removeStyle(t) {
    if (!this.styles) return;
    const e = this.styles;
    let s, r, n;
    for (r in e) {
      for (n in s = e[r], s) delete s[n][t], Object.keys(s[n]).length === 0 && delete s[n];
      Object.keys(s).length === 0 && delete e[r];
    }
  }
  _extendStyles(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t);
    this._getLineStyle(s) || this._setLineStyle(s);
    const n = kn(v(v({}, this._getStyleDeclaration(s, r)), e), (o) => o !== void 0);
    this._setStyleDeclaration(s, r, n);
  }
  getSelectionStyles(t, e, s) {
    const r = [];
    for (let n = t; n < (e || t); n++) r.push(this.getStyleAtPosition(n, s));
    return r;
  }
  getStyleAtPosition(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t);
    return e ? this.getCompleteStyleDeclaration(s, r) : this._getStyleDeclaration(s, r);
  }
  setSelectionStyles(t, e, s) {
    for (let r = e; r < (s || e); r++) this._extendStyles(r, t);
    this._forceClearCache = !0;
  }
  _getStyleDeclaration(t, e) {
    var s;
    const r = this.styles && this.styles[t];
    return r && (s = r[e]) !== null && s !== void 0 ? s : {};
  }
  getCompleteStyleDeclaration(t, e) {
    return v(v({}, He(this, this.constructor._styleProperties)), this._getStyleDeclaration(t, e));
  }
  _setStyleDeclaration(t, e, s) {
    this.styles[t][e] = s;
  }
  _deleteStyleDeclaration(t, e) {
    delete this.styles[t][e];
  }
  _getLineStyle(t) {
    return !!this.styles[t];
  }
  _setLineStyle(t) {
    this.styles[t] = {};
  }
  _deleteLineStyle(t) {
    delete this.styles[t];
  }
}
y(Gc, "_styleProperties", ad);
const hd = /  +/g, ld = /"/g;
function ji(i, t, e, s, r) {
  return "		".concat(function(n, o) {
    let { left: a, top: c, width: h, height: l } = o, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : E.NUM_FRACTION_DIGITS;
    const d = Ws(st, n, !1), [g, f, p, m] = [a, c, h, l].map((b) => z(b, u));
    return "<rect ".concat(d, ' x="').concat(g, '" y="').concat(f, '" width="').concat(p, '" height="').concat(m, '"></rect>');
  }(i, { left: t, top: e, width: s, height: r }), `
`);
}
const ud = ["textAnchor", "textDecoration", "dx", "dy", "top", "left", "fontSize", "strokeWidth"];
let Ii;
class ct extends Gc {
  static getDefaults() {
    return v(v({}, super.getDefaults()), ct.ownDefaults);
  }
  constructor(t, e) {
    super(), y(this, "__charBounds", []), Object.assign(this, ct.ownDefaults), this.setOptions(e), this.styles || (this.styles = {}), this.text = t, this.initialized = !0, this.path && this.setPathInfo(), this.initDimensions(), this.setCoords();
  }
  setPathInfo() {
    const t = this.path;
    t && (t.segmentsInfo = Xn(t.path));
  }
  _splitText() {
    const t = this._splitTextIntoLines(this.text);
    return this.textLines = t.lines, this._textLines = t.graphemeLines, this._unwrappedTextLines = t._unwrappedLines, this._text = t.graphemeText, t;
  }
  initDimensions() {
    this._splitText(), this._clearCache(), this.dirty = !0, this.path ? (this.width = this.path.width, this.height = this.path.height) : (this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH, this.height = this.calcTextHeight()), this.textAlign.includes(Bt) && this.enlargeSpaces();
  }
  enlargeSpaces() {
    let t, e, s, r, n, o, a;
    for (let c = 0, h = this._textLines.length; c < h; c++) if ((this.textAlign === Bt || c !== h - 1 && !this.isEndOfWrapping(c)) && (r = 0, n = this._textLines[c], e = this.getLineWidth(c), e < this.width && (a = this.textLines[c].match(this._reSpacesAndTabs)))) {
      s = a.length, t = (this.width - e) / s;
      for (let l = 0; l <= n.length; l++) o = this.__charBounds[c][l], this._reSpaceAndTab.test(n[l]) ? (o.width += t, o.kernedWidth += t, o.left += r, r += t) : o.left += r;
    }
  }
  isEndOfWrapping(t) {
    return t === this._textLines.length - 1;
  }
  missingNewlineOffset(t) {
    return 1;
  }
  get2DCursorLocation(t, e) {
    const s = e ? this._unwrappedTextLines : this._textLines;
    let r;
    for (r = 0; r < s.length; r++) {
      if (t <= s[r].length) return { lineIndex: r, charIndex: t };
      t -= s[r].length + this.missingNewlineOffset(r, e);
    }
    return { lineIndex: r - 1, charIndex: s[r - 1].length < t ? s[r - 1].length : t };
  }
  toString() {
    return "#<Text (".concat(this.complexity(), '): { "text": "').concat(this.text, '", "fontFamily": "').concat(this.fontFamily, '" }>');
  }
  _getCacheCanvasDimensions() {
    const t = super._getCacheCanvasDimensions(), e = this.fontSize;
    return t.width += e * t.zoomX, t.height += e * t.zoomY, t;
  }
  _render(t) {
    const e = this.path;
    e && !e.isNotVisible() && e._render(t), this._setTextStyles(t), this._renderTextLinesBackground(t), this._renderTextDecoration(t, "underline"), this._renderText(t), this._renderTextDecoration(t, "overline"), this._renderTextDecoration(t, "linethrough");
  }
  _renderText(t) {
    this.paintFirst === pt ? (this._renderTextStroke(t), this._renderTextFill(t)) : (this._renderTextFill(t), this._renderTextStroke(t));
  }
  _setTextStyles(t, e, s) {
    if (t.textBaseline = "alphabetic", this.path) switch (this.pathAlign) {
      case j:
        t.textBaseline = "middle";
        break;
      case "ascender":
        t.textBaseline = gt;
        break;
      case "descender":
        t.textBaseline = Yi;
    }
    t.font = this._getFontDeclaration(e, s);
  }
  calcTextWidth() {
    let t = this.getLineWidth(0);
    for (let e = 1, s = this._textLines.length; e < s; e++) {
      const r = this.getLineWidth(e);
      r > t && (t = r);
    }
    return t;
  }
  _renderTextLine(t, e, s, r, n, o) {
    this._renderChars(t, e, s, r, n, o);
  }
  _renderTextLinesBackground(t) {
    if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor")) return;
    const e = t.fillStyle, s = this._getLeftOffset();
    let r = this._getTopOffset();
    for (let n = 0, o = this._textLines.length; n < o; n++) {
      const a = this.getHeightOfLine(n);
      if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", n)) {
        r += a;
        continue;
      }
      const c = this._textLines[n].length, h = this._getLineLeftOffset(n);
      let l, u, d = 0, g = 0, f = this.getValueOfPropertyAt(n, 0, "textBackgroundColor");
      for (let p = 0; p < c; p++) {
        const m = this.__charBounds[n][p];
        u = this.getValueOfPropertyAt(n, p, "textBackgroundColor"), this.path ? (t.save(), t.translate(m.renderLeft, m.renderTop), t.rotate(m.angle), t.fillStyle = u, u && t.fillRect(-m.width / 2, -a / this.lineHeight * (1 - this._fontSizeFraction), m.width, a / this.lineHeight), t.restore()) : u !== f ? (l = s + h + g, this.direction === "rtl" && (l = this.width - l - d), t.fillStyle = f, f && t.fillRect(l, r, d, a / this.lineHeight), g = m.left, d = m.width, f = u) : d += m.kernedWidth;
      }
      u && !this.path && (l = s + h + g, this.direction === "rtl" && (l = this.width - l - d), t.fillStyle = u, t.fillRect(l, r, d, a / this.lineHeight)), r += a;
    }
    t.fillStyle = e, this._removeShadow(t);
  }
  _measureChar(t, e, s, r) {
    const n = Ms.getFontCache(e), o = this._getFontDeclaration(e), a = s + t, c = s && o === this._getFontDeclaration(r), h = e.fontSize / this.CACHE_FONT_SIZE;
    let l, u, d, g;
    if (s && n[s] !== void 0 && (d = n[s]), n[t] !== void 0 && (g = l = n[t]), c && n[a] !== void 0 && (u = n[a], g = u - d), l === void 0 || d === void 0 || u === void 0) {
      const f = function() {
        return Ii || (Ii = Rt({ width: 0, height: 0 }).getContext("2d")), Ii;
      }();
      this._setTextStyles(f, e, !0), l === void 0 && (g = l = f.measureText(t).width, n[t] = l), d === void 0 && c && s && (d = f.measureText(s).width, n[s] = d), c && u === void 0 && (u = f.measureText(a).width, n[a] = u, g = u - d);
    }
    return { width: l * h, kernedWidth: g * h };
  }
  getHeightOfChar(t, e) {
    return this.getValueOfPropertyAt(t, e, "fontSize");
  }
  measureLine(t) {
    const e = this._measureLine(t);
    return this.charSpacing !== 0 && (e.width -= this._getWidthOfCharSpacing()), e.width < 0 && (e.width = 0), e;
  }
  _measureLine(t) {
    let e, s, r = 0;
    const n = this.pathSide === K, o = this.path, a = this._textLines[t], c = a.length, h = new Array(c);
    this.__charBounds[t] = h;
    for (let l = 0; l < c; l++) {
      const u = a[l];
      s = this._getGraphemeBox(u, t, l, e), h[l] = s, r += s.kernedWidth, e = u;
    }
    if (h[c] = { left: s ? s.left + s.width : 0, width: 0, kernedWidth: 0, height: this.fontSize, deltaY: 0 }, o && o.segmentsInfo) {
      let l = 0;
      const u = o.segmentsInfo[o.segmentsInfo.length - 1].length;
      switch (this.textAlign) {
        case A:
          l = n ? u - r : 0;
          break;
        case j:
          l = (u - r) / 2;
          break;
        case K:
          l = n ? 0 : u - r;
      }
      l += this.pathStartOffset * (n ? -1 : 1);
      for (let d = n ? c - 1 : 0; n ? d >= 0 : d < c; n ? d-- : d++) s = h[d], l > u ? l %= u : l < 0 && (l += u), this._setGraphemeOnPath(l, s), l += s.kernedWidth;
    }
    return { width: r, numOfSpaces: 0 };
  }
  _setGraphemeOnPath(t, e) {
    const s = t + e.kernedWidth / 2, r = this.path, n = jc(r.path, s, r.segmentsInfo);
    e.renderLeft = n.x - r.pathOffset.x, e.renderTop = n.y - r.pathOffset.y, e.angle = n.angle + (this.pathSide === K ? Math.PI : 0);
  }
  _getGraphemeBox(t, e, s, r, n) {
    const o = this.getCompleteStyleDeclaration(e, s), a = r ? this.getCompleteStyleDeclaration(e, s - 1) : {}, c = this._measureChar(t, o, r, a);
    let h, l = c.kernedWidth, u = c.width;
    this.charSpacing !== 0 && (h = this._getWidthOfCharSpacing(), u += h, l += h);
    const d = { width: u, left: 0, height: o.fontSize, kernedWidth: l, deltaY: o.deltaY };
    if (s > 0 && !n) {
      const g = this.__charBounds[e][s - 1];
      d.left = g.left + g.width + c.kernedWidth - c.width;
    }
    return d;
  }
  getHeightOfLine(t) {
    if (this.__lineHeights[t]) return this.__lineHeights[t];
    let e = this.getHeightOfChar(t, 0);
    for (let s = 1, r = this._textLines[t].length; s < r; s++) e = Math.max(this.getHeightOfChar(t, s), e);
    return this.__lineHeights[t] = e * this.lineHeight * this._fontSizeMult;
  }
  calcTextHeight() {
    let t, e = 0;
    for (let s = 0, r = this._textLines.length; s < r; s++) t = this.getHeightOfLine(s), e += s === r - 1 ? t / this.lineHeight : t;
    return e;
  }
  _getLeftOffset() {
    return this.direction === "ltr" ? -this.width / 2 : this.width / 2;
  }
  _getTopOffset() {
    return -this.height / 2;
  }
  _renderTextCommon(t, e) {
    t.save();
    let s = 0;
    const r = this._getLeftOffset(), n = this._getTopOffset();
    for (let o = 0, a = this._textLines.length; o < a; o++) {
      const c = this.getHeightOfLine(o), h = c / this.lineHeight, l = this._getLineLeftOffset(o);
      this._renderTextLine(e, t, this._textLines[o], r + l, n + s + h, o), s += c;
    }
    t.restore();
  }
  _renderTextFill(t) {
    (this.fill || this.styleHas(st)) && this._renderTextCommon(t, "fillText");
  }
  _renderTextStroke(t) {
    (this.stroke && this.strokeWidth !== 0 || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray), t.beginPath(), this._renderTextCommon(t, "strokeText"), t.closePath(), t.restore());
  }
  _renderChars(t, e, s, r, n, o) {
    const a = this.getHeightOfLine(o), c = this.textAlign.includes(Bt), h = this.path, l = !c && this.charSpacing === 0 && this.isEmptyStyles(o) && !h, u = this.direction === "ltr", d = this.direction === "ltr" ? 1 : -1, g = e.direction;
    let f, p, m, b, T, w = "", S = 0;
    if (e.save(), g !== this.direction && (e.canvas.setAttribute("dir", u ? "ltr" : "rtl"), e.direction = u ? "ltr" : "rtl", e.textAlign = u ? A : K), n -= a * this._fontSizeFraction / this.lineHeight, l) return this._renderChar(t, e, o, 0, s.join(""), r, n), void e.restore();
    for (let C = 0, k = s.length - 1; C <= k; C++) b = C === k || this.charSpacing || h, w += s[C], m = this.__charBounds[o][C], S === 0 ? (r += d * (m.kernedWidth - m.width), S += m.width) : S += m.kernedWidth, c && !b && this._reSpaceAndTab.test(s[C]) && (b = !0), b || (f = f || this.getCompleteStyleDeclaration(o, C), p = this.getCompleteStyleDeclaration(o, C + 1), b = li(f, p, !1)), b && (h ? (e.save(), e.translate(m.renderLeft, m.renderTop), e.rotate(m.angle), this._renderChar(t, e, o, C, w, -S / 2, 0), e.restore()) : (T = r, this._renderChar(t, e, o, C, w, T, n)), w = "", f = p, r += d * S, S = 0);
    e.restore();
  }
  _applyPatternGradientTransformText(t) {
    const e = this.width + this.strokeWidth, s = this.height + this.strokeWidth, r = Rt({ width: e, height: s }), n = r.getContext("2d");
    return r.width = e, r.height = s, n.beginPath(), n.moveTo(0, 0), n.lineTo(e, 0), n.lineTo(e, s), n.lineTo(0, s), n.closePath(), n.translate(e / 2, s / 2), n.fillStyle = t.toLive(n), this._applyPatternGradientTransform(n, t), n.fill(), n.createPattern(r, "no-repeat");
  }
  handleFiller(t, e, s) {
    let r, n;
    return xt(s) ? s.gradientUnits === "percentage" || s.gradientTransform || s.patternTransform ? (r = -this.width / 2, n = -this.height / 2, t.translate(r, n), t[e] = this._applyPatternGradientTransformText(s), { offsetX: r, offsetY: n }) : (t[e] = s.toLive(t), this._applyPatternGradientTransform(t, s)) : (t[e] = s, { offsetX: 0, offsetY: 0 });
  }
  _setStrokeStyles(t, e) {
    let { stroke: s, strokeWidth: r } = e;
    return t.lineWidth = r, t.lineCap = this.strokeLineCap, t.lineDashOffset = this.strokeDashOffset, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, this.handleFiller(t, "strokeStyle", s);
  }
  _setFillStyles(t, e) {
    let { fill: s } = e;
    return this.handleFiller(t, "fillStyle", s);
  }
  _renderChar(t, e, s, r, n, o, a) {
    const c = this._getStyleDeclaration(s, r), h = this.getCompleteStyleDeclaration(s, r), l = t === "fillText" && h.fill, u = t === "strokeText" && h.stroke && h.strokeWidth;
    if (u || l) {
      if (e.save(), e.font = this._getFontDeclaration(h), c.textBackgroundColor && this._removeShadow(e), c.deltaY && (a += c.deltaY), l) {
        const d = this._setFillStyles(e, h);
        e.fillText(n, o - d.offsetX, a - d.offsetY);
      }
      if (u) {
        const d = this._setStrokeStyles(e, h);
        e.strokeText(n, o - d.offsetX, a - d.offsetY);
      }
      e.restore();
    }
  }
  setSuperscript(t, e) {
    this._setScript(t, e, this.superscript);
  }
  setSubscript(t, e) {
    this._setScript(t, e, this.subscript);
  }
  _setScript(t, e, s) {
    const r = this.get2DCursorLocation(t, !0), n = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "fontSize"), o = this.getValueOfPropertyAt(r.lineIndex, r.charIndex, "deltaY"), a = { fontSize: n * s.size, deltaY: o + n * s.baseline };
    this.setSelectionStyles(a, t, e);
  }
  _getLineLeftOffset(t) {
    const e = this.getLineWidth(t), s = this.width - e, r = this.textAlign, n = this.direction, o = this.isEndOfWrapping(t);
    let a = 0;
    return r === Bt || r === Es && !o || r === Is && !o || r === $r && !o ? 0 : (r === j && (a = s / 2), r === K && (a = s), r === Es && (a = s / 2), r === Is && (a = s), n === "rtl" && (r === K || r === Bt || r === Is ? a = 0 : r === A || r === $r ? a = -s : r !== j && r !== Es || (a = -s / 2)), a);
  }
  _clearCache() {
    this._forceClearCache = !1, this.__lineWidths = [], this.__lineHeights = [], this.__charBounds = [];
  }
  getLineWidth(t) {
    if (this.__lineWidths[t] !== void 0) return this.__lineWidths[t];
    const { width: e } = this.measureLine(t);
    return this.__lineWidths[t] = e, e;
  }
  _getWidthOfCharSpacing() {
    return this.charSpacing !== 0 ? this.fontSize * this.charSpacing / 1e3 : 0;
  }
  getValueOfPropertyAt(t, e, s) {
    var r;
    return (r = this._getStyleDeclaration(t, e)[s]) !== null && r !== void 0 ? r : this[s];
  }
  _renderTextDecoration(t, e) {
    if (!this[e] && !this.styleHas(e)) return;
    let s = this._getTopOffset();
    const r = this._getLeftOffset(), n = this.path, o = this._getWidthOfCharSpacing(), a = this.offsets[e];
    for (let c = 0, h = this._textLines.length; c < h; c++) {
      const l = this.getHeightOfLine(c);
      if (!this[e] && !this.styleHas(e, c)) {
        s += l;
        continue;
      }
      const u = this._textLines[c], d = l / this.lineHeight, g = this._getLineLeftOffset(c);
      let f, p, m = 0, b = 0, T = this.getValueOfPropertyAt(c, 0, e), w = this.getValueOfPropertyAt(c, 0, st);
      const S = s + d * (1 - this._fontSizeFraction);
      let C = this.getHeightOfChar(c, 0), k = this.getValueOfPropertyAt(c, 0, "deltaY");
      for (let M = 0, P = u.length; M < P; M++) {
        const X = this.__charBounds[c][M];
        f = this.getValueOfPropertyAt(c, M, e), p = this.getValueOfPropertyAt(c, M, st);
        const et = this.getHeightOfChar(c, M), q = this.getValueOfPropertyAt(c, M, "deltaY");
        if (n && f && p) t.save(), t.fillStyle = w, t.translate(X.renderLeft, X.renderTop), t.rotate(X.angle), t.fillRect(-X.kernedWidth / 2, a * et + q, X.kernedWidth, this.fontSize / 15), t.restore();
        else if ((f !== T || p !== w || et !== C || q !== k) && b > 0) {
          let R = r + g + m;
          this.direction === "rtl" && (R = this.width - R - b), T && w && (t.fillStyle = w, t.fillRect(R, S + a * C + k, b, this.fontSize / 15)), m = X.left, b = X.width, T = f, w = p, C = et, k = q;
        } else b += X.kernedWidth;
      }
      let D = r + g + m;
      this.direction === "rtl" && (D = this.width - D - b), t.fillStyle = p, f && p && t.fillRect(D, S + a * C + k, b - o, this.fontSize / 15), s += l;
    }
    this._removeShadow(t);
  }
  _getFontDeclaration() {
    let { fontFamily: t = this.fontFamily, fontStyle: e = this.fontStyle, fontWeight: s = this.fontWeight, fontSize: r = this.fontSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    const o = t.includes("'") || t.includes('"') || t.includes(",") || ct.genericFonts.includes(t.toLowerCase()) ? t : '"'.concat(t, '"');
    return [e, s, "".concat(n ? this.CACHE_FONT_SIZE : r, "px"), o].join(" ");
  }
  render(t) {
    this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._forceClearCache && this.initDimensions(), super.render(t)));
  }
  graphemeSplit(t) {
    return hi(t);
  }
  _splitTextIntoLines(t) {
    const e = t.split(this._reNewline), s = new Array(e.length), r = [`
`];
    let n = [];
    for (let o = 0; o < e.length; o++) s[o] = this.graphemeSplit(e[o]), n = n.concat(s[o], r);
    return n.pop(), { _unwrappedLines: s, lines: e, graphemeText: n, graphemeLines: s };
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return v(v({}, super.toObject([...Vc, ...t])), {}, { styles: yc(this.styles, this.text) }, this.path ? { path: this.path.toObject() } : {});
  }
  set(t, e) {
    const { textLayoutProperties: s } = this.constructor;
    super.set(t, e);
    let r = !1, n = !1;
    if (typeof t == "object") for (const o in t) o === "path" && this.setPathInfo(), r = r || s.includes(o), n = n || o === "path";
    else r = s.includes(t), n = t === "path";
    return n && this.setPathInfo(), r && this.initialized && (this.initDimensions(), this.setCoords()), this;
  }
  complexity() {
    return 1;
  }
  static async fromElement(t, e, s) {
    const r = ce(t, ct.ATTRIBUTE_NAMES, s), n = v(v({}, e), r), { textAnchor: o = A, textDecoration: a = "", dx: c = 0, dy: h = 0, top: l = 0, left: u = 0, fontSize: d = bn, strokeWidth: g = 1 } = n, f = H(n, ud), p = new this((t.textContent || "").replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " "), v({ left: u + c, top: l + h, underline: a.includes("underline"), overline: a.includes("overline"), linethrough: a.includes("line-through"), strokeWidth: 0, fontSize: d }, f)), m = p.getScaledHeight() / p.height, b = ((p.height + p.strokeWidth) * p.lineHeight - p.height) * m, T = p.getScaledHeight() + b;
    let w = 0;
    return o === j && (w = p.getScaledWidth() / 2), o === K && (w = p.getScaledWidth()), p.set({ left: p.left - w, top: p.top - (T - p.fontSize * (0.07 + p._fontSizeFraction)) / p.lineHeight, strokeWidth: g }), p;
  }
  static fromObject(t) {
    return this._fromObject(v(v({}, t), {}, { styles: bc(t.styles || {}, t.text) }), { extraParam: "text" });
  }
}
y(ct, "textLayoutProperties", Yc), y(ct, "cacheProperties", [...ae, ...Vc]), y(ct, "ownDefaults", cd), y(ct, "type", "Text"), y(ct, "genericFonts", ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]), y(ct, "ATTRIBUTE_NAMES", Oe.concat("x", "y", "dx", "dy", "font-family", "font-style", "font-weight", "font-size", "letter-spacing", "text-decoration", "text-anchor")), gc(ct, [class extends Ua {
  _toSVG() {
    const i = this._getSVGLeftTopOffsets(), t = this._getSVGTextAndBg(i.textTop, i.textLeft);
    return this._wrapSVGTextAndBg(t);
  }
  toSVG(i) {
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: i, noStyle: !0, withShadow: !0 });
  }
  _getSVGLeftTopOffsets() {
    return { textLeft: -this.width / 2, textTop: -this.height / 2, lineTop: this.getHeightOfLine(0) };
  }
  _wrapSVGTextAndBg(i) {
    let { textBgRects: t, textSpans: e } = i;
    const s = this.getSvgTextDecoration(this);
    return [t.join(""), '		<text xml:space="preserve" ', this.fontFamily ? 'font-family="'.concat(this.fontFamily.replace(ld, "'"), '" ') : "", this.fontSize ? 'font-size="'.concat(this.fontSize, '" ') : "", this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : "", this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : "", s ? 'text-decoration="'.concat(s, '" ') : "", this.direction === "rtl" ? 'direction="'.concat(this.direction, '" ') : "", 'style="', this.getSvgStyles(!0), '"', this.addPaintOrder(), " >", e.join(""), `</text>
`];
  }
  _getSVGTextAndBg(i, t) {
    const e = [], s = [];
    let r, n = i;
    this.backgroundColor && s.push(...ji(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height));
    for (let o = 0, a = this._textLines.length; o < a; o++) r = this._getLineLeftOffset(o), this.direction === "rtl" && (r += this.width), (this.textBackgroundColor || this.styleHas("textBackgroundColor", o)) && this._setSVGTextLineBg(s, o, t + r, n), this._setSVGTextLineText(e, o, t + r, n), n += this.getHeightOfLine(o);
    return { textSpans: e, textBgRects: s };
  }
  _createTextCharSpan(i, t, e, s) {
    const r = this.getSvgSpanStyles(t, i !== i.trim() || !!i.match(hd)), n = r ? 'style="'.concat(r, '"') : "", o = t.deltaY, a = o ? ' dy="'.concat(z(o, E.NUM_FRACTION_DIGITS), '" ') : "";
    return '<tspan x="'.concat(z(e, E.NUM_FRACTION_DIGITS), '" y="').concat(z(s, E.NUM_FRACTION_DIGITS), '" ').concat(a).concat(n, ">").concat(vc(i), "</tspan>");
  }
  _setSVGTextLineText(i, t, e, s) {
    const r = this.getHeightOfLine(t), n = this.textAlign.includes(Bt), o = this._textLines[t];
    let a, c, h, l, u, d = "", g = 0;
    s += r * (1 - this._fontSizeFraction) / this.lineHeight;
    for (let f = 0, p = o.length - 1; f <= p; f++) u = f === p || this.charSpacing, d += o[f], h = this.__charBounds[t][f], g === 0 ? (e += h.kernedWidth - h.width, g += h.width) : g += h.kernedWidth, n && !u && this._reSpaceAndTab.test(o[f]) && (u = !0), u || (a = a || this.getCompleteStyleDeclaration(t, f), c = this.getCompleteStyleDeclaration(t, f + 1), u = li(a, c, !0)), u && (l = this._getStyleDeclaration(t, f), i.push(this._createTextCharSpan(d, l, e, s)), d = "", a = c, this.direction === "rtl" ? e -= g : e += g, g = 0);
  }
  _setSVGTextLineBg(i, t, e, s) {
    const r = this._textLines[t], n = this.getHeightOfLine(t) / this.lineHeight;
    let o, a = 0, c = 0, h = this.getValueOfPropertyAt(t, 0, "textBackgroundColor");
    for (let l = 0; l < r.length; l++) {
      const { left: u, width: d, kernedWidth: g } = this.__charBounds[t][l];
      o = this.getValueOfPropertyAt(t, l, "textBackgroundColor"), o !== h ? (h && i.push(...ji(h, e + c, s, a, n)), c = u, a = d, h = o) : a += g;
    }
    o && i.push(...ji(h, e + c, s, a, n));
  }
  _getSVGLineTopOffset(i) {
    let t, e = 0;
    for (t = 0; t < i; t++) e += this.getHeightOfLine(t);
    const s = this.getHeightOfLine(t);
    return { lineTop: e, offset: (this._fontSizeMult - this._fontSizeFraction) * s / (this.lineHeight * this._fontSizeMult) };
  }
  getSvgStyles(i) {
    return "".concat(super.getSvgStyles(i), " white-space: pre;");
  }
  getSvgSpanStyles(i, t) {
    const { fontFamily: e, strokeWidth: s, stroke: r, fill: n, fontSize: o, fontStyle: a, fontWeight: c, deltaY: h } = i, l = this.getSvgTextDecoration(i);
    return [r ? Ws(pt, r) : "", s ? "stroke-width: ".concat(s, "; ") : "", e ? "font-family: ".concat(e.includes("'") || e.includes('"') ? e : "'".concat(e, "'"), "; ") : "", o ? "font-size: ".concat(o, "px; ") : "", a ? "font-style: ".concat(a, "; ") : "", c ? "font-weight: ".concat(c, "; ") : "", l && "text-decoration: ".concat(l, "; "), n ? Ws(st, n) : "", h ? "baseline-shift: ".concat(-h, "; ") : "", t ? "white-space: pre; " : ""].join("");
  }
  getSvgTextDecoration(i) {
    return ["overline", "underline", "line-through"].filter((t) => i[t.replace("-", "")]).join(" ");
  }
}]), O.setClass(ct), O.setSVGClass(ct);
class dd {
  constructor(t) {
    y(this, "target", void 0), y(this, "__mouseDownInPlace", !1), y(this, "__dragStartFired", !1), y(this, "__isDraggingOver", !1), y(this, "__dragStartSelection", void 0), y(this, "__dragImageDisposer", void 0), y(this, "_dispose", void 0), this.target = t;
    const e = [this.target.on("dragenter", this.dragEnterHandler.bind(this)), this.target.on("dragover", this.dragOverHandler.bind(this)), this.target.on("dragleave", this.dragLeaveHandler.bind(this)), this.target.on("dragend", this.dragEndHandler.bind(this)), this.target.on("drop", this.dropHandler.bind(this))];
    this._dispose = () => {
      e.forEach((s) => s()), this._dispose = void 0;
    };
  }
  isPointerOverSelection(t) {
    const e = this.target, s = e.getSelectionStartFromPointer(t);
    return e.isEditing && s >= e.selectionStart && s <= e.selectionEnd && e.selectionStart < e.selectionEnd;
  }
  start(t) {
    return this.__mouseDownInPlace = this.isPointerOverSelection(t);
  }
  isActive() {
    return this.__mouseDownInPlace;
  }
  end(t) {
    const e = this.isActive();
    return e && !this.__dragStartFired && (this.target.setCursorByClick(t), this.target.initDelayedCursor(!0)), this.__mouseDownInPlace = !1, this.__dragStartFired = !1, this.__isDraggingOver = !1, e;
  }
  getDragStartSelection() {
    return this.__dragStartSelection;
  }
  setDragImage(t, e) {
    var s;
    let { selectionStart: r, selectionEnd: n } = e;
    const o = this.target, a = o.canvas, c = new _(o.flipX ? -1 : 1, o.flipY ? -1 : 1), h = o._getCursorBoundaries(r), l = new _(h.left + h.leftOffset, h.top + h.topOffset).multiply(c).transform(o.calcTransformMatrix()), u = a.getScenePoint(t).subtract(l), d = o.getCanvasRetinaScaling(), g = o.getBoundingRect(), f = l.subtract(new _(g.left, g.top)), p = a.viewportTransform, m = f.add(u).transform(p, !0), b = o.backgroundColor, T = Ln(o.styles);
    o.backgroundColor = "";
    const w = { stroke: "transparent", fill: "transparent", textBackgroundColor: "transparent" };
    o.setSelectionStyles(w, 0, r), o.setSelectionStyles(w, n, o.text.length), o.dirty = !0;
    const S = o.toCanvasElement({ enableRetinaScaling: a.enableRetinaScaling, viewportTransform: !0 });
    o.backgroundColor = b, o.styles = T, o.dirty = !0, Ur(S, { position: "fixed", left: "".concat(-S.width, "px"), border: ft, width: "".concat(S.width / d, "px"), height: "".concat(S.height / d, "px") }), this.__dragImageDisposer && this.__dragImageDisposer(), this.__dragImageDisposer = () => {
      S.remove();
    }, jt(t.target || this.target.hiddenTextarea).body.appendChild(S), (s = t.dataTransfer) === null || s === void 0 || s.setDragImage(S, m.x, m.y);
  }
  onDragStart(t) {
    this.__dragStartFired = !0;
    const e = this.target, s = this.isActive();
    if (s && t.dataTransfer) {
      const r = this.__dragStartSelection = { selectionStart: e.selectionStart, selectionEnd: e.selectionEnd }, n = e._text.slice(r.selectionStart, r.selectionEnd).join(""), o = v({ text: e.text, value: n }, r);
      t.dataTransfer.setData("text/plain", n), t.dataTransfer.setData("application/fabric", JSON.stringify({ value: n, styles: e.getSelectionStyles(r.selectionStart, r.selectionEnd, !0) })), t.dataTransfer.effectAllowed = "copyMove", this.setDragImage(t, o);
    }
    return e.abortCursorAnimation(), s;
  }
  canDrop(t) {
    if (this.target.editable && !this.target.getActiveControl() && !t.defaultPrevented) {
      if (this.isActive() && this.__dragStartSelection) {
        const e = this.target.getSelectionStartFromPointer(t), s = this.__dragStartSelection;
        return e < s.selectionStart || e > s.selectionEnd;
      }
      return !0;
    }
    return !1;
  }
  targetCanDrop(t) {
    return this.target.canDrop(t);
  }
  dragEnterHandler(t) {
    let { e } = t;
    const s = this.targetCanDrop(e);
    !this.__isDraggingOver && s && (this.__isDraggingOver = !0);
  }
  dragOverHandler(t) {
    const { e } = t, s = this.targetCanDrop(e);
    !this.__isDraggingOver && s ? this.__isDraggingOver = !0 : this.__isDraggingOver && !s && (this.__isDraggingOver = !1), this.__isDraggingOver && (e.preventDefault(), t.canDrop = !0, t.dropTarget = this.target);
  }
  dragLeaveHandler() {
    (this.__isDraggingOver || this.isActive()) && (this.__isDraggingOver = !1);
  }
  dropHandler(t) {
    var e;
    const { e: s } = t, r = s.defaultPrevented;
    this.__isDraggingOver = !1, s.preventDefault();
    let n = (e = s.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain");
    if (n && !r) {
      const o = this.target, a = o.canvas;
      let c = o.getSelectionStartFromPointer(s);
      const { styles: h } = s.dataTransfer.types.includes("application/fabric") ? JSON.parse(s.dataTransfer.getData("application/fabric")) : {}, l = n[Math.max(0, n.length - 1)], u = 0;
      if (this.__dragStartSelection) {
        const d = this.__dragStartSelection.selectionStart, g = this.__dragStartSelection.selectionEnd;
        c > d && c <= g ? c = d : c > g && (c -= g - d), o.removeChars(d, g), delete this.__dragStartSelection;
      }
      o._reNewline.test(l) && (o._reNewline.test(o._text[c]) || c === o._text.length) && (n = n.trimEnd()), t.didDrop = !0, t.dropTarget = o, o.insertChars(n, h, c), a.setActiveObject(o), o.enterEditing(s), o.selectionStart = Math.min(c + u, o._text.length), o.selectionEnd = Math.min(o.selectionStart + n.length, o._text.length), o.hiddenTextarea.value = o.text, o._updateTextarea(), o.hiddenTextarea.focus(), o.fire(Fr, { index: c + u, action: "drop" }), a.fire("text:changed", { target: o }), a.contextTopDirty = !0, a.requestRenderAll();
    }
  }
  dragEndHandler(t) {
    let { e } = t;
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s;
      const r = this.target, n = this.target.canvas, { selectionStart: o, selectionEnd: a } = this.__dragStartSelection, c = ((s = e.dataTransfer) === null || s === void 0 ? void 0 : s.dropEffect) || ft;
      c === ft ? (r.selectionStart = o, r.selectionEnd = a, r._updateTextarea(), r.hiddenTextarea.focus()) : (r.clearContextTop(), c === "move" && (r.removeChars(o, a), r.selectionStart = r.selectionEnd = o, r.hiddenTextarea && (r.hiddenTextarea.value = r.text), r._updateTextarea(), r.fire(Fr, { index: o, action: "dragend" }), n.fire("text:changed", { target: r }), n.requestRenderAll()), r.exitEditing());
    }
    this.__dragImageDisposer && this.__dragImageDisposer(), delete this.__dragImageDisposer, delete this.__dragStartSelection, this.__isDraggingOver = !1;
  }
  dispose() {
    this._dispose && this._dispose();
  }
}
const Do = /[ \n\.,;!\?\-]/;
class gd extends ct {
  constructor() {
    super(...arguments), y(this, "_currentCursorOpacity", 1);
  }
  initBehavior() {
    this._tick = this._tick.bind(this), this._onTickComplete = this._onTickComplete.bind(this), this.updateSelectionOnMouseMove = this.updateSelectionOnMouseMove.bind(this);
  }
  onDeselect(t) {
    return this.isEditing && this.exitEditing(), this.selected = !1, super.onDeselect(t);
  }
  _animateCursor(t) {
    let { toValue: e, duration: s, delay: r, onComplete: n } = t;
    return An({ startValue: this._currentCursorOpacity, endValue: e, duration: s, delay: r, onComplete: n, abort: () => !this.canvas || this.selectionStart !== this.selectionEnd, onChange: (o) => {
      this._currentCursorOpacity = o, this.renderCursorOrSelection();
    } });
  }
  _tick(t) {
    this._currentTickState = this._animateCursor({ toValue: 0, duration: this.cursorDuration / 2, delay: Math.max(t || 0, 100), onComplete: this._onTickComplete });
  }
  _onTickComplete() {
    var t;
    (t = this._currentTickCompleteState) === null || t === void 0 || t.abort(), this._currentTickCompleteState = this._animateCursor({ toValue: 1, duration: this.cursorDuration, onComplete: this._tick });
  }
  initDelayedCursor(t) {
    this.abortCursorAnimation(), this._tick(t ? 0 : this.cursorDelay);
  }
  abortCursorAnimation() {
    let t = !1;
    [this._currentTickState, this._currentTickCompleteState].forEach((e) => {
      e && !e.isDone() && (t = !0, e.abort());
    }), this._currentCursorOpacity = 1, t && this.clearContextTop();
  }
  restartCursorIfNeeded() {
    [this._currentTickState, this._currentTickCompleteState].some((t) => !t || t.isDone()) && this.initDelayedCursor();
  }
  selectAll() {
    return this.selectionStart = 0, this.selectionEnd = this._text.length, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  getSelectedText() {
    return this._text.slice(this.selectionStart, this.selectionEnd).join("");
  }
  findWordBoundaryLeft(t) {
    let e = 0, s = t - 1;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s--;
    for (; /\S/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findWordBoundaryRight(t) {
    let e = 0, s = t;
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s++;
    for (; /\S/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  findLineBoundaryLeft(t) {
    let e = 0, s = t - 1;
    for (; !/\n/.test(this._text[s]) && s > -1; ) e++, s--;
    return t - e;
  }
  findLineBoundaryRight(t) {
    let e = 0, s = t;
    for (; !/\n/.test(this._text[s]) && s < this._text.length; ) e++, s++;
    return t + e;
  }
  searchWordBoundary(t, e) {
    const s = this._text;
    let r = t > 0 && this._reSpace.test(s[t]) && (e === -1 || !_n.test(s[t - 1])) ? t - 1 : t, n = s[r];
    for (; r > 0 && r < s.length && !Do.test(n); ) r += e, n = s[r];
    return e === -1 && Do.test(n) && r++, r;
  }
  selectWord(t) {
    t = t || this.selectionStart;
    const e = this.searchWordBoundary(t, -1), s = Math.max(e, this.searchWordBoundary(t, 1));
    this.selectionStart = e, this.selectionEnd = s, this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection();
  }
  selectLine(t) {
    t = t || this.selectionStart;
    const e = this.findLineBoundaryLeft(t), s = this.findLineBoundaryRight(t);
    return this.selectionStart = e, this.selectionEnd = s, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  enterEditing(t) {
    !this.isEditing && this.editable && (this.enterEditingImpl(), this.fire("editing:entered", t ? { e: t } : void 0), this._fireSelectionChanged(), this.canvas && (this.canvas.fire("text:editing:entered", { target: this, e: t }), this.canvas.requestRenderAll()));
  }
  enterEditingImpl() {
    this.canvas && (this.canvas.calcOffset(), this.canvas.textEditingManager.exitTextEditing()), this.isEditing = !0, this.initHiddenTextarea(), this.hiddenTextarea.focus(), this.hiddenTextarea.value = this.text, this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._textBeforeEdit = this.text, this._tick();
  }
  updateSelectionOnMouseMove(t) {
    if (this.getActiveControl()) return;
    const e = this.hiddenTextarea;
    jt(e).activeElement !== e && e.focus();
    const s = this.getSelectionStartFromPointer(t), r = this.selectionStart, n = this.selectionEnd;
    (s === this.__selectionStartOnMouseDown && r !== n || r !== s && n !== s) && (s > this.__selectionStartOnMouseDown ? (this.selectionStart = this.__selectionStartOnMouseDown, this.selectionEnd = s) : (this.selectionStart = s, this.selectionEnd = this.__selectionStartOnMouseDown), this.selectionStart === r && this.selectionEnd === n || (this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()));
  }
  _setEditingProps() {
    this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = !1, this.lockMovementX = this.lockMovementY = !0;
  }
  fromStringToGraphemeSelection(t, e, s) {
    const r = s.slice(0, t), n = this.graphemeSplit(r).length;
    if (t === e) return { selectionStart: n, selectionEnd: n };
    const o = s.slice(t, e);
    return { selectionStart: n, selectionEnd: n + this.graphemeSplit(o).length };
  }
  fromGraphemeToStringSelection(t, e, s) {
    const r = s.slice(0, t).join("").length;
    return t === e ? { selectionStart: r, selectionEnd: r } : { selectionStart: r, selectionEnd: r + s.slice(t, e).join("").length };
  }
  _updateTextarea() {
    if (this.cursorOffsetCache = {}, this.hiddenTextarea) {
      if (!this.inCompositionMode) {
        const t = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
        this.hiddenTextarea.selectionStart = t.selectionStart, this.hiddenTextarea.selectionEnd = t.selectionEnd;
      }
      this.updateTextareaPosition();
    }
  }
  updateFromTextArea() {
    if (!this.hiddenTextarea) return;
    this.cursorOffsetCache = {};
    const t = this.hiddenTextarea;
    this.text = t.value, this.set("dirty", !0), this.initDimensions(), this.setCoords();
    const e = this.fromStringToGraphemeSelection(t.selectionStart, t.selectionEnd, t.value);
    this.selectionEnd = this.selectionStart = e.selectionEnd, this.inCompositionMode || (this.selectionStart = e.selectionStart), this.updateTextareaPosition();
  }
  updateTextareaPosition() {
    if (this.selectionStart === this.selectionEnd) {
      const t = this._calcTextareaPosition();
      this.hiddenTextarea.style.left = t.left, this.hiddenTextarea.style.top = t.top;
    }
  }
  _calcTextareaPosition() {
    if (!this.canvas) return { left: "1px", top: "1px" };
    const t = this.inCompositionMode ? this.compositionStart : this.selectionStart, e = this._getCursorBoundaries(t), s = this.get2DCursorLocation(t), r = s.lineIndex, n = s.charIndex, o = this.getValueOfPropertyAt(r, n, "fontSize") * this.lineHeight, a = e.leftOffset, c = this.getCanvasRetinaScaling(), h = this.canvas.upperCanvasEl, l = h.width / c, u = h.height / c, d = l - o, g = u - o, f = new _(e.left + a, e.top + e.topOffset + o).transform(this.calcTransformMatrix()).transform(this.canvas.viewportTransform).multiply(new _(h.clientWidth / l, h.clientHeight / u));
    return f.x < 0 && (f.x = 0), f.x > d && (f.x = d), f.y < 0 && (f.y = 0), f.y > g && (f.y = g), f.x += this.canvas._offset.left, f.y += this.canvas._offset.top, { left: "".concat(f.x, "px"), top: "".concat(f.y, "px"), fontSize: "".concat(o, "px"), charHeight: o };
  }
  _saveEditingProps() {
    this._savedProps = { hasControls: this.hasControls, borderColor: this.borderColor, lockMovementX: this.lockMovementX, lockMovementY: this.lockMovementY, hoverCursor: this.hoverCursor, selectable: this.selectable, defaultCursor: this.canvas && this.canvas.defaultCursor, moveCursor: this.canvas && this.canvas.moveCursor };
  }
  _restoreEditingProps() {
    this._savedProps && (this.hoverCursor = this._savedProps.hoverCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.selectable = this._savedProps.selectable, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor || this.canvas.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor || this.canvas.moveCursor), delete this._savedProps);
  }
  _exitEditing() {
    const t = this.hiddenTextarea;
    this.selected = !1, this.isEditing = !1, t && (t.blur && t.blur(), t.parentNode && t.parentNode.removeChild(t)), this.hiddenTextarea = null, this.abortCursorAnimation(), this.selectionStart !== this.selectionEnd && this.clearContextTop();
  }
  exitEditingImpl() {
    this._exitEditing(), this.selectionEnd = this.selectionStart, this._restoreEditingProps(), this._forceClearCache && (this.initDimensions(), this.setCoords());
  }
  exitEditing() {
    const t = this._textBeforeEdit !== this.text;
    return this.exitEditingImpl(), this.fire("editing:exited"), t && this.fire(Lr), this.canvas && (this.canvas.fire("text:editing:exited", { target: this }), t && this.canvas.fire("object:modified", { target: this })), this;
  }
  _removeExtraneousStyles() {
    for (const t in this.styles) this._textLines[t] || delete this.styles[t];
  }
  removeStyleFromTo(t, e) {
    const { lineIndex: s, charIndex: r } = this.get2DCursorLocation(t, !0), { lineIndex: n, charIndex: o } = this.get2DCursorLocation(e, !0);
    if (s !== n) {
      if (this.styles[s]) for (let a = r; a < this._unwrappedTextLines[s].length; a++) delete this.styles[s][a];
      if (this.styles[n]) for (let a = o; a < this._unwrappedTextLines[n].length; a++) {
        const c = this.styles[n][a];
        c && (this.styles[s] || (this.styles[s] = {}), this.styles[s][r + a - o] = c);
      }
      for (let a = s + 1; a <= n; a++) delete this.styles[a];
      this.shiftLineStyles(n, s - n);
    } else if (this.styles[s]) {
      const a = this.styles[s], c = o - r;
      for (let h = r; h < o; h++) delete a[h];
      for (const h in this.styles[s]) {
        const l = parseInt(h, 10);
        l >= o && (a[l - c] = a[h], delete a[h]);
      }
    }
  }
  shiftLineStyles(t, e) {
    const s = Object.assign({}, this.styles);
    for (const r in this.styles) {
      const n = parseInt(r, 10);
      n > t && (this.styles[n + e] = s[n], s[n - e] || delete this.styles[n]);
    }
  }
  insertNewlineStyleObject(t, e, s, r) {
    const n = {}, o = this._unwrappedTextLines[t].length, a = o === e;
    let c = !1;
    s || (s = 1), this.shiftLineStyles(t, s);
    const h = this.styles[t] ? this.styles[t][e === 0 ? e : e - 1] : void 0;
    for (const u in this.styles[t]) {
      const d = parseInt(u, 10);
      d >= e && (c = !0, n[d - e] = this.styles[t][u], a && e === 0 || delete this.styles[t][u]);
    }
    let l = !1;
    for (c && !a && (this.styles[t + s] = n, l = !0), (l || o > e) && s--; s > 0; ) r && r[s - 1] ? this.styles[t + s] = { 0: v({}, r[s - 1]) } : h ? this.styles[t + s] = { 0: v({}, h) } : delete this.styles[t + s], s--;
    this._forceClearCache = !0;
  }
  insertCharStyleObject(t, e, s, r) {
    this.styles || (this.styles = {});
    const n = this.styles[t], o = n ? v({}, n) : {};
    s || (s = 1);
    for (const c in o) {
      const h = parseInt(c, 10);
      h >= e && (n[h + s] = o[h], o[h - s] || delete n[h]);
    }
    if (this._forceClearCache = !0, r) {
      for (; s--; ) Object.keys(r[s]).length && (this.styles[t] || (this.styles[t] = {}), this.styles[t][e + s] = v({}, r[s]));
      return;
    }
    if (!n) return;
    const a = n[e ? e - 1 : 1];
    for (; a && s--; ) this.styles[t][e + s] = v({}, a);
  }
  insertNewStyleBlock(t, e, s) {
    const r = this.get2DCursorLocation(e, !0), n = [0];
    let o, a = 0;
    for (let c = 0; c < t.length; c++) t[c] === `
` ? (a++, n[a] = 0) : n[a]++;
    for (n[0] > 0 && (this.insertCharStyleObject(r.lineIndex, r.charIndex, n[0], s), s = s && s.slice(n[0] + 1)), a && this.insertNewlineStyleObject(r.lineIndex, r.charIndex + n[0], a), o = 1; o < a; o++) n[o] > 0 ? this.insertCharStyleObject(r.lineIndex + o, 0, n[o], s) : s && this.styles[r.lineIndex + o] && s[0] && (this.styles[r.lineIndex + o][0] = s[0]), s = s && s.slice(n[o] + 1);
    n[o] > 0 && this.insertCharStyleObject(r.lineIndex + o, 0, n[o], s);
  }
  removeChars(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t + 1;
    this.removeStyleFromTo(t, e), this._text.splice(t, e - t), this.text = this._text.join(""), this.set("dirty", !0), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  insertChars(t, e, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s;
    r > s && this.removeStyleFromTo(s, r);
    const n = this.graphemeSplit(t);
    this.insertNewStyleBlock(n, s, e), this._text = [...this._text.slice(0, s), ...n, ...this._text.slice(r)], this.text = this._text.join(""), this.set("dirty", !0), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  setSelectionStartEndWithShift(t, e, s) {
    s <= t ? (e === t ? this._selectionDirection = A : this._selectionDirection === K && (this._selectionDirection = A, this.selectionEnd = t), this.selectionStart = s) : s > t && s < e ? this._selectionDirection === K ? this.selectionEnd = s : this.selectionStart = s : (e === t ? this._selectionDirection = K : this._selectionDirection === A && (this._selectionDirection = K, this.selectionStart = e), this.selectionEnd = s);
  }
}
class fd extends gd {
  initHiddenTextarea() {
    const t = this.canvas && jt(this.canvas.getElement()) || gs(), e = t.createElement("textarea");
    Object.entries({ autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "data-fabric": "textarea", wrap: "off" }).map((o) => {
      let [a, c] = o;
      return e.setAttribute(a, c);
    });
    const { top: s, left: r, fontSize: n } = this._calcTextareaPosition();
    e.style.cssText = "position: absolute; top: ".concat(s, "; left: ").concat(r, "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ").concat(n, ";"), (this.hiddenTextareaContainer || t.body).appendChild(e), Object.entries({ blur: "blur", keydown: "onKeyDown", keyup: "onKeyUp", input: "onInput", copy: "copy", cut: "copy", paste: "paste", compositionstart: "onCompositionStart", compositionupdate: "onCompositionUpdate", compositionend: "onCompositionEnd" }).map((o) => {
      let [a, c] = o;
      return e.addEventListener(a, this[c].bind(this));
    }), this.hiddenTextarea = e;
  }
  blur() {
    this.abortCursorAnimation();
  }
  onKeyDown(t) {
    if (!this.isEditing) return;
    const e = this.direction === "rtl" ? this.keysMapRtl : this.keysMap;
    if (t.keyCode in e) this[e[t.keyCode]](t);
    else {
      if (!(t.keyCode in this.ctrlKeysMapDown) || !t.ctrlKey && !t.metaKey) return;
      this[this.ctrlKeysMapDown[t.keyCode]](t);
    }
    t.stopImmediatePropagation(), t.preventDefault(), t.keyCode >= 33 && t.keyCode <= 40 ? (this.inCompositionMode = !1, this.clearContextTop(), this.renderCursorOrSelection()) : this.canvas && this.canvas.requestRenderAll();
  }
  onKeyUp(t) {
    !this.isEditing || this._copyDone || this.inCompositionMode ? this._copyDone = !1 : t.keyCode in this.ctrlKeysMapUp && (t.ctrlKey || t.metaKey) && (this[this.ctrlKeysMapUp[t.keyCode]](t), t.stopImmediatePropagation(), t.preventDefault(), this.canvas && this.canvas.requestRenderAll());
  }
  onInput(t) {
    const e = this.fromPaste;
    if (this.fromPaste = !1, t && t.stopPropagation(), !this.isEditing) return;
    const s = () => {
      this.updateFromTextArea(), this.fire(Fr), this.canvas && (this.canvas.fire("text:changed", { target: this }), this.canvas.requestRenderAll());
    };
    if (this.hiddenTextarea.value === "") return this.styles = {}, void s();
    const r = this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText, n = this._text.length, o = r.length, a = this.selectionStart, c = this.selectionEnd, h = a !== c;
    let l, u, d, g, f = o - n;
    const p = this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart, this.hiddenTextarea.selectionEnd, this.hiddenTextarea.value), m = a > p.selectionStart;
    h ? (u = this._text.slice(a, c), f += c - a) : o < n && (u = m ? this._text.slice(c + f, c) : this._text.slice(a, a - f));
    const b = r.slice(p.selectionEnd - f, p.selectionEnd);
    if (u && u.length && (b.length && (l = this.getSelectionStyles(a, a + 1, !1), l = b.map(() => l[0])), h ? (d = a, g = c) : m ? (d = c - u.length, g = c) : (d = c, g = c + u.length), this.removeStyleFromTo(d, g)), b.length) {
      const { copyPasteData: T } = Ht();
      e && b.join("") === T.copiedText && !E.disableStyleCopyPaste && (l = T.copiedTextStyle), this.insertNewStyleBlock(b, a, l);
    }
    s();
  }
  onCompositionStart() {
    this.inCompositionMode = !0;
  }
  onCompositionEnd() {
    this.inCompositionMode = !1;
  }
  onCompositionUpdate(t) {
    let { target: e } = t;
    const { selectionStart: s, selectionEnd: r } = e;
    this.compositionStart = s, this.compositionEnd = r, this.updateTextareaPosition();
  }
  copy() {
    if (this.selectionStart === this.selectionEnd) return;
    const { copyPasteData: t } = Ht();
    t.copiedText = this.getSelectedText(), E.disableStyleCopyPaste ? t.copiedTextStyle = void 0 : t.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, !0), this._copyDone = !0;
  }
  paste() {
    this.fromPaste = !0;
  }
  _getWidthBeforeCursor(t, e) {
    let s, r = this._getLineLeftOffset(t);
    return e > 0 && (s = this.__charBounds[t][e - 1], r += s.left + s.width), r;
  }
  getDownCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), r = this.get2DCursorLocation(s), n = r.lineIndex;
    if (n === this._textLines.length - 1 || t.metaKey || t.keyCode === 34) return this._text.length - s;
    const o = r.charIndex, a = this._getWidthBeforeCursor(n, o), c = this._getIndexOnLine(n + 1, a);
    return this._textLines[n].slice(o).length + c + 1 + this.missingNewlineOffset(n);
  }
  _getSelectionForOffset(t, e) {
    return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart;
  }
  getUpCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e), r = this.get2DCursorLocation(s), n = r.lineIndex;
    if (n === 0 || t.metaKey || t.keyCode === 33) return -s;
    const o = r.charIndex, a = this._getWidthBeforeCursor(n, o), c = this._getIndexOnLine(n - 1, a), h = this._textLines[n].slice(0, o), l = this.missingNewlineOffset(n - 1);
    return -this._textLines[n - 1].length + c - h.length + (1 - l);
  }
  _getIndexOnLine(t, e) {
    const s = this._textLines[t];
    let r, n, o = this._getLineLeftOffset(t), a = 0;
    for (let c = 0, h = s.length; c < h; c++) if (r = this.__charBounds[t][c].width, o += r, o > e) {
      n = !0;
      const l = o - r, u = o, d = Math.abs(l - e);
      a = Math.abs(u - e) < d ? c : c - 1;
      break;
    }
    return n || (a = s.length - 1), a;
  }
  moveCursorDown(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t);
  }
  moveCursorUp(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorUpOrDown("Up", t);
  }
  _moveCursorUpOrDown(t, e) {
    const s = this["get".concat(t, "CursorOffset")](e, this._selectionDirection === K);
    if (e.shiftKey ? this.moveCursorWithShift(s) : this.moveCursorWithoutShift(s), s !== 0) {
      const r = this.text.length;
      this.selectionStart = We(0, this.selectionStart, r), this.selectionEnd = We(0, this.selectionEnd, r), this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea();
    }
  }
  moveCursorWithShift(t) {
    const e = this._selectionDirection === A ? this.selectionStart + t : this.selectionEnd + t;
    return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e), t !== 0;
  }
  moveCursorWithoutShift(t) {
    return t < 0 ? (this.selectionStart += t, this.selectionEnd = this.selectionStart) : (this.selectionEnd += t, this.selectionStart = this.selectionEnd), t !== 0;
  }
  moveCursorLeft(t) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorLeftOrRight("Left", t);
  }
  _move(t, e, s) {
    let r;
    if (t.altKey) r = this["findWordBoundary".concat(s)](this[e]);
    else {
      if (!t.metaKey && t.keyCode !== 35 && t.keyCode !== 36) return this[e] += s === "Left" ? -1 : 1, !0;
      r = this["findLineBoundary".concat(s)](this[e]);
    }
    return r !== void 0 && this[e] !== r && (this[e] = r, !0);
  }
  _moveLeft(t, e) {
    return this._move(t, e, "Left");
  }
  _moveRight(t, e) {
    return this._move(t, e, "Right");
  }
  moveCursorLeftWithoutShift(t) {
    let e = !0;
    return this._selectionDirection = A, this.selectionEnd === this.selectionStart && this.selectionStart !== 0 && (e = this._moveLeft(t, "selectionStart")), this.selectionEnd = this.selectionStart, e;
  }
  moveCursorLeftWithShift(t) {
    return this._selectionDirection === K && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : this.selectionStart !== 0 ? (this._selectionDirection = A, this._moveLeft(t, "selectionStart")) : void 0;
  }
  moveCursorRight(t) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t);
  }
  _moveCursorLeftOrRight(t, e) {
    const s = "moveCursor".concat(t).concat(e.shiftKey ? "WithShift" : "WithoutShift");
    this._currentCursorOpacity = 1, this[s](e) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea());
  }
  moveCursorRightWithShift(t) {
    return this._selectionDirection === A && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = K, this._moveRight(t, "selectionEnd")) : void 0;
  }
  moveCursorRightWithoutShift(t) {
    let e = !0;
    return this._selectionDirection = K, this.selectionStart === this.selectionEnd ? (e = this._moveRight(t, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e;
  }
}
const Ei = (i) => !!i.button;
class pd extends fd {
  constructor() {
    super(...arguments), y(this, "draggableTextDelegate", void 0);
  }
  initBehavior() {
    this.on("mousedown", this._mouseDownHandler), this.on("mousedown:before", this._mouseDownHandlerBefore), this.on("mouseup", this.mouseUpHandler), this.on("mousedblclick", this.doubleClickHandler), this.on("tripleclick", this.tripleClickHandler), this.__lastClickTime = +/* @__PURE__ */ new Date(), this.__lastLastClickTime = +/* @__PURE__ */ new Date(), this.__lastPointer = {}, this.on("mousedown", this.onMouseDown), this.draggableTextDelegate = new dd(this), super.initBehavior();
  }
  shouldStartDragging() {
    return this.draggableTextDelegate.isActive();
  }
  onDragStart(t) {
    return this.draggableTextDelegate.onDragStart(t);
  }
  canDrop(t) {
    return this.draggableTextDelegate.canDrop(t);
  }
  onMouseDown(t) {
    if (!this.canvas) return;
    this.__newClickTime = +/* @__PURE__ */ new Date();
    const e = t.pointer;
    this.isTripleClick(e) && (this.fire("tripleclick", t), Gi(t.e)), this.__lastLastClickTime = this.__lastClickTime, this.__lastClickTime = this.__newClickTime, this.__lastPointer = e, this.__lastSelected = this.selected && !this.getActiveControl();
  }
  isTripleClick(t) {
    return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === t.x && this.__lastPointer.y === t.y;
  }
  doubleClickHandler(t) {
    this.isEditing && this.selectWord(this.getSelectionStartFromPointer(t.e));
  }
  tripleClickHandler(t) {
    this.isEditing && this.selectLine(this.getSelectionStartFromPointer(t.e));
  }
  _mouseDownHandler(t) {
    let { e } = t;
    this.canvas && this.editable && !Ei(e) && !this.getActiveControl() && (this.draggableTextDelegate.start(e) || (this.canvas.textEditingManager.register(this), this.selected && (this.inCompositionMode = !1, this.setCursorByClick(e)), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection())));
  }
  _mouseDownHandlerBefore(t) {
    let { e } = t;
    this.canvas && this.editable && !Ei(e) && (this.selected = this === this.canvas._activeObject);
  }
  mouseUpHandler(t) {
    let { e, transform: s } = t;
    const r = this.draggableTextDelegate.end(e);
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this);
      const n = this.canvas._activeObject;
      if (n && n !== this) return;
    }
    !this.editable || this.group && !this.group.interactive || s && s.actionPerformed || Ei(e) || r || (this.__lastSelected && !this.getActiveControl() ? (this.selected = !1, this.__lastSelected = !1, this.enterEditing(e), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(!0) : this.renderCursorOrSelection()) : this.selected = !0);
  }
  setCursorByClick(t) {
    const e = this.getSelectionStartFromPointer(t), s = this.selectionStart, r = this.selectionEnd;
    t.shiftKey ? this.setSelectionStartEndWithShift(s, r, e) : (this.selectionStart = e, this.selectionEnd = e), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea());
  }
  getSelectionStartFromPointer(t) {
    const e = this.canvas.getScenePoint(t).transform(yt(this.calcTransformMatrix())).add(new _(-this._getLeftOffset(), -this._getTopOffset()));
    let s = 0, r = 0, n = 0;
    for (let h = 0; h < this._textLines.length && s <= e.y; h++) s += this.getHeightOfLine(h), n = h, h > 0 && (r += this._textLines[h - 1].length + this.missingNewlineOffset(h - 1));
    let o = Math.abs(this._getLineLeftOffset(n));
    const a = this._textLines[n].length, c = this.__charBounds[n];
    for (let h = 0; h < a; h++) {
      const l = o + c[h].kernedWidth;
      if (e.x <= l) {
        Math.abs(e.x - l) <= Math.abs(e.x - o) && r++;
        break;
      }
      o = l, r++;
    }
    return Math.min(this.flipX ? a - r : r, this._text.length);
  }
}
const cr = "moveCursorUp", hr = "moveCursorDown", lr = "moveCursorLeft", ur = "moveCursorRight", dr = "exitEditing", md = v({ selectionStart: 0, selectionEnd: 0, selectionColor: "rgba(17,119,255,0.3)", isEditing: !1, editable: !0, editingBorderColor: "rgba(102,153,255,0.25)", cursorWidth: 2, cursorColor: "", cursorDelay: 1e3, cursorDuration: 600, caching: !0, hiddenTextareaContainer: null, keysMap: { 9: dr, 27: dr, 33: cr, 34: hr, 35: ur, 36: lr, 37: lr, 38: cr, 39: ur, 40: hr }, keysMapRtl: { 9: dr, 27: dr, 33: cr, 34: hr, 35: lr, 36: ur, 37: ur, 38: cr, 39: lr, 40: hr }, ctrlKeysMapDown: { 65: "selectAll" }, ctrlKeysMapUp: { 67: "copy", 88: "cut" } }, { _selectionDirection: null, _reSpace: /\s|\r?\n/, inCompositionMode: !1 });
class ee extends pd {
  static getDefaults() {
    return v(v({}, super.getDefaults()), ee.ownDefaults);
  }
  get type() {
    const t = super.type;
    return t === "itext" ? "i-text" : t;
  }
  constructor(t, e) {
    super(t, v(v({}, ee.ownDefaults), e)), this.initBehavior();
  }
  _set(t, e) {
    return this.isEditing && this._savedProps && t in this._savedProps ? (this._savedProps[t] = e, this) : (t === "canvas" && (this.canvas instanceof sn && this.canvas.textEditingManager.remove(this), e instanceof sn && e.textEditingManager.add(this)), super._set(t, e));
  }
  setSelectionStart(t) {
    t = Math.max(t, 0), this._updateAndFire("selectionStart", t);
  }
  setSelectionEnd(t) {
    t = Math.min(t, this.text.length), this._updateAndFire("selectionEnd", t);
  }
  _updateAndFire(t, e) {
    this[t] !== e && (this._fireSelectionChanged(), this[t] = e), this._updateTextarea();
  }
  _fireSelectionChanged() {
    this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", { target: this });
  }
  initDimensions() {
    this.isEditing && this.initDelayedCursor(), super.initDimensions();
  }
  getSelectionStyles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart || 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionEnd, s = arguments.length > 2 ? arguments[2] : void 0;
    return super.getSelectionStyles(t, e, s);
  }
  setSelectionStyles(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionStart || 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.selectionEnd;
    return super.setSelectionStyles(t, e, s);
  }
  get2DCursorLocation() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    return super.get2DCursorLocation(t, e);
  }
  render(t) {
    super.render(t), this.cursorOffsetCache = {}, this.renderCursorOrSelection();
  }
  toCanvasElement(t) {
    const e = this.isEditing;
    this.isEditing = !1;
    const s = super.toCanvasElement(t);
    return this.isEditing = e, s;
  }
  renderCursorOrSelection() {
    if (!this.isEditing) return;
    const t = this.clearContextTop(!0);
    if (!t) return;
    const e = this._getCursorBoundaries();
    this.selectionStart !== this.selectionEnd || this.inCompositionMode ? this.renderSelection(t, e) : this.renderCursor(t, e), this.canvas.contextTopDirty = !0, t.restore();
  }
  _getCursorBoundaries() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 ? arguments[1] : void 0;
    const s = this._getLeftOffset(), r = this._getTopOffset(), n = this._getCursorBoundariesOffsets(t, e);
    return { left: s, top: r, leftOffset: n.left, topOffset: n.top };
  }
  _getCursorBoundariesOffsets(t, e) {
    return e ? this.__getCursorBoundariesOffsets(t) : this.cursorOffsetCache && "top" in this.cursorOffsetCache ? this.cursorOffsetCache : this.cursorOffsetCache = this.__getCursorBoundariesOffsets(t);
  }
  __getCursorBoundariesOffsets(t) {
    let e = 0, s = 0;
    const { charIndex: r, lineIndex: n } = this.get2DCursorLocation(t);
    for (let h = 0; h < n; h++) e += this.getHeightOfLine(h);
    const o = this._getLineLeftOffset(n), a = this.__charBounds[n][r];
    a && (s = a.left), this.charSpacing !== 0 && r === this._textLines[n].length && (s -= this._getWidthOfCharSpacing());
    const c = { top: e, left: o + (s > 0 ? s : 0) };
    return this.direction === "rtl" && (this.textAlign === K || this.textAlign === Bt || this.textAlign === Is ? c.left *= -1 : this.textAlign === A || this.textAlign === $r ? c.left = o - (s > 0 ? s : 0) : this.textAlign !== j && this.textAlign !== Es || (c.left = o - (s > 0 ? s : 0))), c;
  }
  renderCursorAt(t) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t, !0), t);
  }
  renderCursor(t, e) {
    this._renderCursor(t, e, this.selectionStart);
  }
  getCursorRenderingData() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._getCursorBoundaries(t);
    const s = this.get2DCursorLocation(t), r = s.lineIndex, n = s.charIndex > 0 ? s.charIndex - 1 : 0, o = this.getValueOfPropertyAt(r, n, "fontSize"), a = this.getObjectScaling().x * this.canvas.getZoom(), c = this.cursorWidth / a, h = this.getValueOfPropertyAt(r, n, "deltaY"), l = e.topOffset + (1 - this._fontSizeFraction) * this.getHeightOfLine(r) / this.lineHeight - o * (1 - this._fontSizeFraction);
    return { color: this.cursorColor || this.getValueOfPropertyAt(r, n, "fill"), opacity: this._currentCursorOpacity, left: e.left + e.leftOffset - c / 2, top: l + e.top + h, width: c, height: o };
  }
  _renderCursor(t, e, s) {
    const { color: r, opacity: n, left: o, top: a, width: c, height: h } = this.getCursorRenderingData(s, e);
    t.fillStyle = r, t.globalAlpha = n, t.fillRect(o, a, c, h);
  }
  renderSelection(t, e) {
    const s = { selectionStart: this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, selectionEnd: this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd };
    this._renderSelection(t, s, e);
  }
  renderDragSourceEffect() {
    const t = this.draggableTextDelegate.getDragStartSelection();
    this._renderSelection(this.canvas.contextTop, t, this._getCursorBoundaries(t.selectionStart, !0));
  }
  renderDropTargetEffect(t) {
    const e = this.getSelectionStartFromPointer(t);
    this.renderCursorAt(e);
  }
  _renderSelection(t, e, s) {
    const r = e.selectionStart, n = e.selectionEnd, o = this.textAlign.includes(Bt), a = this.get2DCursorLocation(r), c = this.get2DCursorLocation(n), h = a.lineIndex, l = c.lineIndex, u = a.charIndex < 0 ? 0 : a.charIndex, d = c.charIndex < 0 ? 0 : c.charIndex;
    for (let g = h; g <= l; g++) {
      const f = this._getLineLeftOffset(g) || 0;
      let p = this.getHeightOfLine(g), m = 0, b = 0, T = 0;
      if (g === h && (b = this.__charBounds[h][u].left), g >= h && g < l) T = o && !this.isEndOfWrapping(g) ? this.width : this.getLineWidth(g) || 5;
      else if (g === l) if (d === 0) T = this.__charBounds[l][d].left;
      else {
        const D = this._getWidthOfCharSpacing();
        T = this.__charBounds[l][d - 1].left + this.__charBounds[l][d - 1].width - D;
      }
      m = p, (this.lineHeight < 1 || g === l && this.lineHeight > 1) && (p /= this.lineHeight);
      let w = s.left + f + b, S = p, C = 0;
      const k = T - b;
      this.inCompositionMode ? (t.fillStyle = this.compositionColor || "black", S = 1, C = p) : t.fillStyle = this.selectionColor, this.direction === "rtl" && (this.textAlign === K || this.textAlign === Bt || this.textAlign === Is ? w = this.width - w - k : this.textAlign === A || this.textAlign === $r ? w = s.left + f - T : this.textAlign !== j && this.textAlign !== Es || (w = s.left + f - T)), t.fillRect(w, s.top + s.topOffset + C, k, S), s.topOffset += m;
    }
  }
  getCurrentCharFontSize() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, "fontSize");
  }
  getCurrentCharColor() {
    const t = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t.l, t.c, st);
  }
  _getCurrentCharIndex() {
    const t = this.get2DCursorLocation(this.selectionStart, !0), e = t.charIndex > 0 ? t.charIndex - 1 : 0;
    return { l: t.lineIndex, c: e };
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose();
  }
}
y(ee, "ownDefaults", md), y(ee, "type", "IText"), O.setClass(ee), O.setClass(ee, "i-text");
class Pe extends ee {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Pe.ownDefaults);
  }
  constructor(t, e) {
    super(t, v(v({}, Pe.ownDefaults), e));
  }
  static createControls() {
    return { controls: dc() };
  }
  initDimensions() {
    this.initialized && (this.isEditing && this.initDelayedCursor(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this.textAlign.includes(Bt) && this.enlargeSpaces(), this.height = this.calcTextHeight());
  }
  _generateStyleMap(t) {
    let e = 0, s = 0, r = 0;
    const n = {};
    for (let o = 0; o < t.graphemeLines.length; o++) t.graphemeText[r] === `
` && o > 0 ? (s = 0, r++, e++) : !this.splitByGrapheme && this._reSpaceAndTab.test(t.graphemeText[r]) && o > 0 && (s++, r++), n[o] = { line: e, offset: s }, r += t.graphemeLines[o].length, s += t.graphemeLines[o].length;
    return n;
  }
  styleHas(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[e];
      s && (e = s.line);
    }
    return super.styleHas(t, e);
  }
  isEmptyStyles(t) {
    if (!this.styles) return !0;
    let e, s = 0, r = t + 1, n = !1;
    const o = this._styleMap[t], a = this._styleMap[t + 1];
    o && (t = o.line, s = o.offset), a && (r = a.line, n = r === t, e = a.offset);
    const c = t === void 0 ? this.styles : { line: this.styles[t] };
    for (const h in c) for (const l in c[h]) {
      const u = parseInt(l, 10);
      if (u >= s && (!n || u < e)) for (const d in c[h][l]) return !1;
    }
    return !0;
  }
  _getStyleDeclaration(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[t];
      if (!s) return {};
      t = s.line, e = s.offset + e;
    }
    return super._getStyleDeclaration(t, e);
  }
  _setStyleDeclaration(t, e, s) {
    const r = this._styleMap[t];
    super._setStyleDeclaration(r.line, r.offset + e, s);
  }
  _deleteStyleDeclaration(t, e) {
    const s = this._styleMap[t];
    super._deleteStyleDeclaration(s.line, s.offset + e);
  }
  _getLineStyle(t) {
    const e = this._styleMap[t];
    return !!this.styles[e.line];
  }
  _setLineStyle(t) {
    const e = this._styleMap[t];
    super._setLineStyle(e.line);
  }
  _wrapText(t, e) {
    this.isWrapping = !0;
    const s = this.getGraphemeDataForRender(t), r = [];
    for (let n = 0; n < s.wordsData.length; n++) r.push(...this._wrapLine(n, e, s));
    return this.isWrapping = !1, r;
  }
  getGraphemeDataForRender(t) {
    const e = this.splitByGrapheme, s = e ? "" : " ";
    let r = 0;
    return { wordsData: t.map((n, o) => {
      let a = 0;
      const c = e ? this.graphemeSplit(n) : this.wordSplit(n);
      return c.length === 0 ? [{ word: [], width: 0 }] : c.map((h) => {
        const l = e ? [h] : this.graphemeSplit(h), u = this._measureWord(l, o, a);
        return r = Math.max(u, r), a += l.length + s.length, { word: l, width: u };
      });
    }), largestWordWidth: r };
  }
  _measureWord(t, e) {
    let s, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, n = 0;
    for (let o = 0, a = t.length; o < a; o++)
      n += this._getGraphemeBox(t[o], e, o + r, s, !0).kernedWidth, s = t[o];
    return n;
  }
  wordSplit(t) {
    return t.split(this._wordJoiners);
  }
  _wrapLine(t, e, s) {
    let { largestWordWidth: r, wordsData: n } = s, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    const a = this._getWidthOfCharSpacing(), c = this.splitByGrapheme, h = [], l = c ? "" : " ";
    let u = 0, d = [], g = 0, f = 0, p = !0;
    e -= o;
    const m = Math.max(e, r, this.dynamicMinWidth), b = n[t];
    let T;
    for (g = 0, T = 0; T < b.length; T++) {
      const { word: w, width: S } = b[T];
      g += w.length, u += f + S - a, u > m && !p ? (h.push(d), d = [], u = S, p = !0) : u += a, p || c || d.push(l), d = d.concat(w), f = c ? 0 : this._measureWord([l], t, g), g++, p = !1;
    }
    return T && h.push(d), r + o > this.dynamicMinWidth && (this.dynamicMinWidth = r - a + o), h;
  }
  isEndOfWrapping(t) {
    return !this._styleMap[t + 1] || this._styleMap[t + 1].line !== this._styleMap[t].line;
  }
  missingNewlineOffset(t, e) {
    return this.splitByGrapheme && !e ? this.isEndOfWrapping(t) ? 1 : 0 : 1;
  }
  _splitTextIntoLines(t) {
    const e = super._splitTextIntoLines(t), s = this._wrapText(e.lines, this.width), r = new Array(s.length);
    for (let n = 0; n < s.length; n++) r[n] = s[n].join("");
    return e.lines = r, e.graphemeLines = s, e;
  }
  getMinWidth() {
    return Math.max(this.minWidth, this.dynamicMinWidth);
  }
  _removeExtraneousStyles() {
    const t = /* @__PURE__ */ new Map();
    for (const e in this._styleMap) {
      const s = parseInt(e, 10);
      if (this._textLines[s]) {
        const r = this._styleMap[e].line;
        t.set("".concat(r), !0);
      }
    }
    for (const e in this.styles) t.has(e) || delete this.styles[e];
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return super.toObject(["minWidth", "splitByGrapheme", ...t]);
  }
}
y(Pe, "type", "Textbox"), y(Pe, "textLayoutProperties", [...ee.textLayoutProperties, "width"]), y(Pe, "ownDefaults", { minWidth: 20, dynamicMinWidth: 2, lockScalingFlip: !0, noScaleCache: !1, _wordJoiners: /[ \t\r]/, splitByGrapheme: !1 }), O.setClass(Pe);
class jo extends ui {
  shouldPerformLayout(t) {
    return !!t.target.clipPath && super.shouldPerformLayout(t);
  }
  shouldLayoutClipPath() {
    return !1;
  }
  calcLayoutResult(t, e) {
    const { target: s } = t, { clipPath: r, group: n } = s;
    if (!r || !this.shouldPerformLayout(t)) return;
    const { width: o, height: a } = Xt(Tc(s, r)), c = new _(o, a);
    if (r.absolutePositioned)
      return { center: re(r.getRelativeCenterPoint(), void 0, n ? n.calcTransformMatrix() : void 0), size: c };
    {
      const h = r.getRelativeCenterPoint().transform(s.calcOwnMatrix(), !0);
      if (this.shouldPerformLayout(t)) {
        const { center: l = new _(), correction: u = new _() } = this.calcBoundingBox(e, t) || {};
        return { center: l.add(h), correction: u.subtract(h), size: c };
      }
      return { center: s.getRelativeCenterPoint().add(h), size: c };
    }
  }
}
y(jo, "type", "clip-path"), O.setClass(jo);
class Io extends ui {
  getInitialSize(t, e) {
    let { target: s } = t, { size: r } = e;
    return new _(s.width || r.x, s.height || r.y);
  }
}
y(Io, "type", "fixed"), O.setClass(Io);
class vd extends zs {
  subscribeTargets(t) {
    const e = t.target;
    t.targets.reduce((s, r) => (r.parent && s.add(r.parent), s), /* @__PURE__ */ new Set()).forEach((s) => {
      s.layoutManager.subscribeTargets({ target: s, targets: [e] });
    });
  }
  unsubscribeTargets(t) {
    const e = t.target, s = e.getObjects();
    t.targets.reduce((r, n) => (n.parent && r.add(n.parent), r), /* @__PURE__ */ new Set()).forEach((r) => {
      !s.some((n) => n.parent === r) && r.layoutManager.unsubscribeTargets({ target: r, targets: [e] });
    });
  }
}
class wt extends zt {
  static getDefaults() {
    return v(v({}, super.getDefaults()), wt.ownDefaults);
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Object.assign(this, wt.ownDefaults), this.setOptions(e);
    const { left: s, top: r, layoutManager: n } = e;
    this.groupInit(t, { left: s, top: r, layoutManager: n ?? new vd() });
  }
  _shouldSetNestedCoords() {
    return !0;
  }
  __objectSelectionMonitor() {
  }
  multiSelectAdd() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s];
    this.multiSelectionStacking === "selection-order" ? this.add(...e) : e.forEach((r) => {
      const n = this._objects.findIndex((a) => a.isInFrontOf(r)), o = n === -1 ? this.size() : n;
      this.insertAt(o, r);
    });
  }
  canEnterGroup(t) {
    return this.getObjects().some((e) => e.isDescendantOf(t) || t.isDescendantOf(e)) ? (ve("error", "ActiveSelection: circular object trees are not supported, this call has no effect"), !1) : super.canEnterGroup(t);
  }
  enterGroup(t, e) {
    t.parent && t.parent === t.group ? t.parent._exitGroup(t) : t.group && t.parent !== t.group && t.group.remove(t), this._enterGroup(t, e);
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t.parent && t.parent._enterGroup(t, !0);
  }
  _onAfterObjectsChange(t, e) {
    super._onAfterObjectsChange(t, e);
    const s = /* @__PURE__ */ new Set();
    e.forEach((r) => {
      const { parent: n } = r;
      n && s.add(n);
    }), t === Wn ? s.forEach((r) => {
      r._onAfterObjectsChange(Vr, e);
    }) : s.forEach((r) => {
      r._set("dirty", !0);
    });
  }
  onDeselect() {
    return this.removeAll(), !1;
  }
  toString() {
    return "#<ActiveSelection: (".concat(this.complexity(), ")>");
  }
  shouldCache() {
    return !1;
  }
  isOnACache() {
    return !1;
  }
  _renderControls(t, e, s) {
    t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    const r = v(v({ hasControls: !1 }, s), {}, { forActiveSelection: !0 });
    for (let n = 0; n < this._objects.length; n++) this._objects[n]._renderControls(t, r);
    super._renderControls(t, e), t.restore();
  }
}
y(wt, "type", "ActiveSelection"), y(wt, "ownDefaults", { multiSelectionStacking: "canvas-stacking" }), O.setClass(wt), O.setClass(wt, "activeSelection");
class yd {
  constructor() {
    y(this, "resources", {});
  }
  applyFilters(t, e, s, r, n) {
    const o = n.getContext("2d");
    if (!o) return;
    o.drawImage(e, 0, 0, s, r);
    const a = { sourceWidth: s, sourceHeight: r, imageData: o.getImageData(0, 0, s, r), originalEl: e, originalImageData: o.getImageData(0, 0, s, r), canvasEl: n, ctx: o, filterBackend: this };
    t.forEach((h) => {
      h.applyTo(a);
    });
    const { imageData: c } = a;
    return c.width === s && c.height === r || (n.width = c.width, n.height = c.height), o.putImageData(c, 0, 0), a;
  }
}
class Nc {
  constructor() {
    let { tileSize: t = E.textureSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    y(this, "aPosition", new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), y(this, "resources", {}), this.tileSize = t, this.setupGLContext(t, t), this.captureGPUInfo();
  }
  setupGLContext(t, e) {
    this.dispose(), this.createWebGLCanvas(t, e);
  }
  createWebGLCanvas(t, e) {
    const s = Rt({ width: t, height: e }), r = s.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, depth: !1, stencil: !1, antialias: !1 });
    r && (r.clearColor(0, 0, 0, 0), this.canvas = s, this.gl = r);
  }
  applyFilters(t, e, s, r, n, o) {
    const a = this.gl, c = n.getContext("2d");
    if (!a || !c) return;
    let h;
    o && (h = this.getCachedTexture(o, e));
    const l = { originalWidth: e.width || e.naturalWidth || 0, originalHeight: e.height || e.naturalHeight || 0, sourceWidth: s, sourceHeight: r, destinationWidth: s, destinationHeight: r, context: a, sourceTexture: this.createTexture(a, s, r, h ? void 0 : e), targetTexture: this.createTexture(a, s, r), originalTexture: h || this.createTexture(a, s, r, h ? void 0 : e), passes: t.length, webgl: !0, aPosition: this.aPosition, programCache: this.programCache, pass: 0, filterBackend: this, targetCanvas: n }, u = a.createFramebuffer();
    return a.bindFramebuffer(a.FRAMEBUFFER, u), t.forEach((d) => {
      d && d.applyTo(l);
    }), function(d) {
      const g = d.targetCanvas, f = g.width, p = g.height, m = d.destinationWidth, b = d.destinationHeight;
      f === m && p === b || (g.width = m, g.height = b);
    }(l), this.copyGLTo2D(a, l), a.bindTexture(a.TEXTURE_2D, null), a.deleteTexture(l.sourceTexture), a.deleteTexture(l.targetTexture), a.deleteFramebuffer(u), c.setTransform(1, 0, 0, 1, 0, 0), l;
  }
  dispose() {
    this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches();
  }
  clearWebGLCaches() {
    this.programCache = {}, this.textureCache = {};
  }
  createTexture(t, e, s, r, n) {
    const { NEAREST: o, TEXTURE_2D: a, RGBA: c, UNSIGNED_BYTE: h, CLAMP_TO_EDGE: l, TEXTURE_MAG_FILTER: u, TEXTURE_MIN_FILTER: d, TEXTURE_WRAP_S: g, TEXTURE_WRAP_T: f } = t, p = t.createTexture();
    return t.bindTexture(a, p), t.texParameteri(a, u, n || o), t.texParameteri(a, d, n || o), t.texParameteri(a, g, l), t.texParameteri(a, f, l), r ? t.texImage2D(a, 0, c, c, h, r) : t.texImage2D(a, 0, c, e, s, 0, c, h, null), p;
  }
  getCachedTexture(t, e, s) {
    const { textureCache: r } = this;
    if (r[t]) return r[t];
    {
      const n = this.createTexture(this.gl, e.width, e.height, e, s);
      return n && (r[t] = n), n;
    }
  }
  evictCachesForKey(t) {
    this.textureCache[t] && (this.gl.deleteTexture(this.textureCache[t]), delete this.textureCache[t]);
  }
  copyGLTo2D(t, e) {
    const s = t.canvas, r = e.targetCanvas, n = r.getContext("2d");
    if (!n) return;
    n.translate(0, r.height), n.scale(1, -1);
    const o = s.height - r.height;
    n.drawImage(s, 0, o, r.width, r.height, 0, 0, r.width, r.height);
  }
  copyGLTo2DPutImageData(t, e) {
    const s = e.targetCanvas.getContext("2d"), r = e.destinationWidth, n = e.destinationHeight, o = r * n * 4;
    if (!s) return;
    const a = new Uint8Array(this.imageBuffer, 0, o), c = new Uint8ClampedArray(this.imageBuffer, 0, o);
    t.readPixels(0, 0, r, n, t.RGBA, t.UNSIGNED_BYTE, a);
    const h = new ImageData(c, r, n);
    s.putImageData(h, 0, 0);
  }
  captureGPUInfo() {
    if (this.gpuInfo) return this.gpuInfo;
    const t = this.gl, e = { renderer: "", vendor: "" };
    if (!t) return e;
    const s = t.getExtension("WEBGL_debug_renderer_info");
    if (s) {
      const r = t.getParameter(s.UNMASKED_RENDERER_WEBGL), n = t.getParameter(s.UNMASKED_VENDOR_WEBGL);
      r && (e.renderer = r.toLowerCase()), n && (e.vendor = n.toLowerCase());
    }
    return this.gpuInfo = e, e;
  }
}
let Pi;
function bd() {
  const { WebGLProbe: i } = Ht();
  return i.queryWebGL(St()), E.enableGLFiltering && i.isSupported(E.textureSize) ? new Nc({ tileSize: E.textureSize }) : new yd();
}
function Ai() {
  return !Pi && (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && (Pi = bd()), Pi;
}
const _d = ["filters", "resizeFilter", "src", "crossOrigin", "type"], Uc = ["cropX", "cropY"];
class Tt extends ot {
  static getDefaults() {
    return v(v({}, super.getDefaults()), Tt.ownDefaults);
  }
  constructor(t, e) {
    super(), y(this, "_lastScaleX", 1), y(this, "_lastScaleY", 1), y(this, "_filterScalingX", 1), y(this, "_filterScalingY", 1), this.filters = [], Object.assign(this, Tt.ownDefaults), this.setOptions(e), this.cacheKey = "texture".concat(be()), this.setElement(typeof t == "string" ? (this.canvas && jt(this.canvas.getElement()) || gs()).getElementById(t) : t, e);
  }
  getElement() {
    return this._element;
  }
  setElement(t) {
    var e;
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._element = t, this._originalElement = t, this._setWidthHeight(s), (e = t.classList) === null || e === void 0 || e.add(Tt.CSS_CANVAS), this.filters.length !== 0 && this.applyFilters(), this.resizeFilter && this.applyResizeFilters();
  }
  removeTexture(t) {
    const e = Ai(!1);
    e instanceof Nc && e.evictCachesForKey(t);
  }
  dispose() {
    super.dispose(), this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._cacheContext = null, ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach((t) => {
      const e = this[t];
      e && Ht().dispose(e), this[t] = void 0;
    });
  }
  getCrossOrigin() {
    return this._originalElement && (this._originalElement.crossOrigin || null);
  }
  getOriginalSize() {
    const t = this.getElement();
    return t ? { width: t.naturalWidth || t.width, height: t.naturalHeight || t.height } : { width: 0, height: 0 };
  }
  _stroke(t) {
    if (!this.stroke || this.strokeWidth === 0) return;
    const e = this.width / 2, s = this.height / 2;
    t.beginPath(), t.moveTo(-e, -s), t.lineTo(e, -s), t.lineTo(e, s), t.lineTo(-e, s), t.lineTo(-e, -s), t.closePath();
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const e = [];
    return this.filters.forEach((s) => {
      s && e.push(s.toObject());
    }), v(v({}, super.toObject([...Uc, ...t])), {}, { src: this.getSrc(), crossOrigin: this.getCrossOrigin(), filters: e }, this.resizeFilter ? { resizeFilter: this.resizeFilter.toObject() } : {});
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height;
  }
  _toSVG() {
    const t = [], e = this._element, s = -this.width / 2, r = -this.height / 2;
    let n = [], o = [], a = "", c = "";
    if (!e) return [];
    if (this.hasCrop()) {
      const h = be();
      n.push('<clipPath id="imageCrop_' + h + `">
`, '	<rect x="' + s + '" y="' + r + '" width="' + this.width + '" height="' + this.height + `" />
`, `</clipPath>
`), a = ' clip-path="url(#imageCrop_' + h + ')" ';
    }
    if (this.imageSmoothing || (c = ' image-rendering="optimizeSpeed"'), t.push("	<image ", "COMMON_PARTS", 'xlink:href="'.concat(this.getSvgSrc(!0), '" x="').concat(s - this.cropX, '" y="').concat(r - this.cropY, '" width="').concat(e.width || e.naturalWidth, '" height="').concat(e.height || e.naturalHeight, '"').concat(c).concat(a, `></image>
`)), this.stroke || this.strokeDashArray) {
      const h = this.fill;
      this.fill = null, o = ['	<rect x="'.concat(s, '" y="').concat(r, '" width="').concat(this.width, '" height="').concat(this.height, '" style="').concat(this.getSvgStyles(), `" />
`)], this.fill = h;
    }
    return n = this.paintFirst !== st ? n.concat(o, t) : n.concat(t, o), n;
  }
  getSrc(t) {
    const e = t ? this._element : this._originalElement;
    return e ? e.toDataURL ? e.toDataURL() : this.srcFromAttribute ? e.getAttribute("src") || "" : e.src : this.src || "";
  }
  getSvgSrc(t) {
    return this.getSrc(t);
  }
  setSrc(t) {
    let { crossOrigin: e, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return js(t, { crossOrigin: e, signal: s }).then((r) => {
      e !== void 0 && this.set({ crossOrigin: e }), this.setElement(r);
    });
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>');
  }
  applyResizeFilters() {
    const t = this.resizeFilter, e = this.minimumScaleTrigger, s = this.getTotalObjectScaling(), r = s.x, n = s.y, o = this._filteredEl || this._originalElement;
    if (this.group && this.set("dirty", !0), !t || r > e && n > e) return this._element = o, this._filterScalingX = 1, this._filterScalingY = 1, this._lastScaleX = r, void (this._lastScaleY = n);
    const a = Rt(o), { width: c, height: h } = o;
    this._element = a, this._lastScaleX = t.scaleX = r, this._lastScaleY = t.scaleY = n, Ai().applyFilters([t], o, c, h, this._element), this._filterScalingX = a.width / this._originalElement.width, this._filterScalingY = a.height / this._originalElement.height;
  }
  applyFilters() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.filters || [];
    if (t = t.filter((n) => n && !n.isNeutralState()), this.set("dirty", !0), this.removeTexture("".concat(this.cacheKey, "_filtered")), t.length === 0) return this._element = this._originalElement, this._filteredEl = void 0, this._filterScalingX = 1, void (this._filterScalingY = 1);
    const e = this._originalElement, s = e.naturalWidth || e.width, r = e.naturalHeight || e.height;
    if (this._element === this._originalElement) {
      const n = Rt({ width: s, height: r });
      this._element = n, this._filteredEl = n;
    } else this._filteredEl && (this._element = this._filteredEl, this._filteredEl.getContext("2d").clearRect(0, 0, s, r), this._lastScaleX = 1, this._lastScaleY = 1);
    Ai().applyFilters(t, this._originalElement, s, r, this._element, this.cacheKey), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height);
  }
  _render(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, this.isMoving !== !0 && this.resizeFilter && this._needsResize() && this.applyResizeFilters(), this._stroke(t), this._renderPaintInOrder(t);
  }
  drawCacheOnCanvas(t) {
    t.imageSmoothingEnabled = this.imageSmoothing, super.drawCacheOnCanvas(t);
  }
  shouldCache() {
    return this.needsItsOwnCache();
  }
  _renderFill(t) {
    const e = this._element;
    if (!e) return;
    const s = this._filterScalingX, r = this._filterScalingY, n = this.width, o = this.height, a = Math.max(this.cropX, 0), c = Math.max(this.cropY, 0), h = e.naturalWidth || e.width, l = e.naturalHeight || e.height, u = a * s, d = c * r, g = Math.min(n * s, h - u), f = Math.min(o * r, l - d), p = -n / 2, m = -o / 2, b = Math.min(n, h / s - a), T = Math.min(o, l / r - c);
    e && t.drawImage(e, u, d, g, f, p, m, b, T);
  }
  _needsResize() {
    const t = this.getTotalObjectScaling();
    return t.x !== this._lastScaleX || t.y !== this._lastScaleY;
  }
  _resetWidthHeight() {
    this.set(this.getOriginalSize());
  }
  _setWidthHeight() {
    let { width: t, height: e } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const s = this.getOriginalSize();
    this.width = t || s.width, this.height = e || s.height;
  }
  parsePreserveAspectRatioAttribute() {
    const t = Ra(this.preserveAspectRatio || ""), e = this.width, s = this.height, r = { width: e, height: s };
    let n, o = this._element.width, a = this._element.height, c = 1, h = 1, l = 0, u = 0, d = 0, g = 0;
    return !t || t.alignX === ft && t.alignY === ft ? (c = e / o, h = s / a) : (t.meetOrSlice === "meet" && (c = h = wc(this._element, r), n = (e - o * c) / 2, t.alignX === "Min" && (l = -n), t.alignX === "Max" && (l = n), n = (s - a * h) / 2, t.alignY === "Min" && (u = -n), t.alignY === "Max" && (u = n)), t.meetOrSlice === "slice" && (c = h = Sc(this._element, r), n = o - e / c, t.alignX === "Mid" && (d = n / 2), t.alignX === "Max" && (d = n), n = a - s / h, t.alignY === "Mid" && (g = n / 2), t.alignY === "Max" && (g = n), o = e / c, a = s / h)), { width: o, height: a, scaleX: c, scaleY: h, offsetLeft: l, offsetTop: u, cropX: d, cropY: g };
  }
  static fromObject(t, e) {
    let { filters: s, resizeFilter: r, src: n, crossOrigin: o, type: a } = t, c = H(t, _d);
    return Promise.all([js(n, v(v({}, e), {}, { crossOrigin: o })), s && ls(s, e), r && ls([r], e), qs(c, e)]).then((h) => {
      let [l, u = [], [d] = [], g = {}] = h;
      return new this(l, v(v({}, c), {}, { src: n, filters: u, resizeFilter: d }, g));
    });
  }
  static fromURL(t) {
    let { crossOrigin: e = null, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
    return js(t, { crossOrigin: e, signal: s }).then((n) => new this(n, r));
  }
  static async fromElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = arguments.length > 2 ? arguments[2] : void 0;
    const r = ce(t, this.ATTRIBUTE_NAMES, s);
    return this.fromURL(r["xlink:href"], e, r).catch((n) => (ve("log", "Unable to parse Image", n), null));
  }
}
y(Tt, "type", "Image"), y(Tt, "cacheProperties", [...ae, ...Uc]), y(Tt, "ownDefaults", { strokeWidth: 0, srcFromAttribute: !1, minimumScaleTrigger: 0.5, cropX: 0, cropY: 0, imageSmoothing: !0 }), y(Tt, "CSS_CANVAS", "canvas-img"), y(Tt, "ATTRIBUTE_NAMES", [...Oe, "x", "y", "width", "height", "preserveAspectRatio", "xlink:href", "crossOrigin", "image-rendering"]), O.setClass(Tt), O.setSVGClass(Tt);
oi(["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"]);
const $c = Oa, Eo = (i) => function(t, e, s) {
  const { points: r, pathOffset: n } = s;
  return new _(r[i]).subtract(n).transform($(s.getViewportTransform(), s.calcTransformMatrix()));
}, qc = (i, t, e, s) => {
  const { target: r, pointIndex: n } = t, o = r, a = re(new _(e, s), void 0, o.calcOwnMatrix());
  return o.points[n] = a.add(o.pathOffset), o.setDimensions(), !0;
}, Kc = (i, t) => function(e, s, r, n) {
  const o = s.target, a = new _(o.points[(i > 0 ? i : o.points.length) - 1]), c = a.subtract(o.pathOffset).transform(o.calcOwnMatrix()), h = t(e, v(v({}, s), {}, { pointIndex: i }), r, n), l = a.subtract(o.pathOffset).transform(o.calcOwnMatrix()).subtract(c);
  return o.left -= l.x, o.top -= l.y, h;
}, Po = (i) => Ce($c, Kc(i, qc)), nn = (i, t, e) => {
  const { path: s, pathOffset: r } = i, n = s[t];
  return new _(n[e] - r.x, n[e + 1] - r.y).transform($(i.getViewportTransform(), i.calcTransformMatrix()));
};
function Td(i, t, e) {
  const { commandIndex: s, pointIndex: r } = this;
  return nn(e, s, r);
}
function xd(i, t, e, s) {
  const { target: r } = t, { commandIndex: n, pointIndex: o } = this, a = ((c, h, l, u, d) => {
    const { path: g, pathOffset: f } = c, p = g[(u > 0 ? u : g.length) - 1], m = new _(p[d], p[d + 1]), b = m.subtract(f).transform(c.calcOwnMatrix()), T = re(new _(h, l), void 0, c.calcOwnMatrix());
    g[u][d] = T.x + f.x, g[u][d + 1] = T.y + f.y, c.setDimensions();
    const w = m.subtract(c.pathOffset).transform(c.calcOwnMatrix()).subtract(b);
    return c.left -= w.x, c.top -= w.y, c.set("dirty", !0), !0;
  })(r, e, s, n, o);
  return Dn(this.actionName, v(v({}, jn(i, t, e, s)), {}, { commandIndex: n, pointIndex: o })), a;
}
class Jc extends V {
  constructor(t) {
    super(t);
  }
  render(t, e, s, r, n) {
    const o = v(v({}, r), {}, { cornerColor: this.controlFill, cornerStrokeColor: this.controlStroke, transparentCorners: !this.controlFill });
    super.render(t, e, s, o, n);
  }
}
class wd extends Jc {
  constructor(t) {
    super(t);
  }
  render(t, e, s, r, n) {
    const { path: o } = n, { commandIndex: a, pointIndex: c, connectToCommandIndex: h, connectToPointIndex: l } = this;
    t.save(), t.strokeStyle = this.controlStroke, this.connectionDashArray && t.setLineDash(this.connectionDashArray);
    const [u] = o[a], d = nn(n, h, l);
    if (u === "Q") {
      const g = nn(n, a, c + 2);
      t.moveTo(g.x, g.y), t.lineTo(e, s);
    } else t.moveTo(e, s);
    t.lineTo(d.x, d.y), t.stroke(), t.restore(), super.render(t, e, s, r, n);
  }
}
const gr = (i, t, e, s, r, n) => new (e ? wd : Jc)(v(v({ commandIndex: i, pointIndex: t, actionName: "modifyPath", positionHandler: Td, actionHandler: xd, connectToCommandIndex: r, connectToPointIndex: n }, s), e ? s.controlPointStyle : s.pointStyle));
var ys = Object.freeze({ __proto__: null, changeWidth: qi, createObjectDefaultControls: Fn, createPathControls: function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const e = {};
  let s = "M";
  return i.path.forEach((r, n) => {
    const o = r[0];
    switch (o !== "Z" && (e["c_".concat(n, "_").concat(o)] = gr(n, r.length - 2, !1, t)), o) {
      case "C":
        e["c_".concat(n, "_C_CP_1")] = gr(n, 1, !0, t, n - 1, /* @__PURE__ */ ((a) => a === "C" ? 5 : a === "Q" ? 3 : 1)(s)), e["c_".concat(n, "_C_CP_2")] = gr(n, 3, !0, t, n, 5);
        break;
      case "Q":
        e["c_".concat(n, "_Q_CP_1")] = gr(n, 1, !0, t, n, 3);
    }
    s = o;
  }), e;
}, createPolyActionHandler: Po, createPolyControls: function(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const e = {};
  for (let s = 0; s < (typeof i == "number" ? i : i.points.length); s++) e["p".concat(s)] = new V(v({ actionName: $c, positionHandler: Eo(s), actionHandler: Po(s) }, t));
  return e;
}, createPolyPositionHandler: Eo, createResizeControls: uc, createTextboxDefaultControls: dc, dragHandler: Na, factoryPolyActionHandler: Kc, getLocalPoint: ni, polyActionHandler: qc, renderCircleControl: Qa, renderSquareControl: tc, rotationStyleHandler: ec, rotationWithSnapping: sc, scaleCursorStyleHandler: Ke, scaleOrSkewActionName: Cs, scaleSkewCursorStyleHandler: Ie, scalingEqually: Ss, scalingX: nc, scalingXOrSkewingY: Ki, scalingY: oc, scalingYOrSkewingX: Ji, skewCursorStyleHandler: ac, skewHandlerX: hc, skewHandlerY: lc, wrapWithFireEvent: Ce, wrapWithFixedAnchor: Ye });
const gi = (i) => i.webgl !== void 0, Hn = "precision highp float", Sd = `
    `.concat(Hn, `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`), Cd = ["type"], Od = ["type"], kd = new RegExp(Hn, "g");
class rt {
  get type() {
    return this.constructor.type;
  }
  constructor() {
    let t = H(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, Cd);
    Object.assign(this, this.constructor.defaults, t);
  }
  getFragmentSource() {
    return Sd;
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }`;
  }
  createProgram(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getFragmentSource(), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.getVertexSource();
    const { WebGLProbe: { GLPrecision: r = "highp" } } = Ht();
    r !== "highp" && (e = e.replace(kd, Hn.replace("highp", r)));
    const n = t.createShader(t.VERTEX_SHADER), o = t.createShader(t.FRAGMENT_SHADER), a = t.createProgram();
    if (!n || !o || !a) throw new Wt("Vertex, fragment shader or program creation error");
    if (t.shaderSource(n, s), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Wt("Vertex shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(n)));
    if (t.shaderSource(o, e), t.compileShader(o), !t.getShaderParameter(o, t.COMPILE_STATUS)) throw new Wt("Fragment shader compile error for ".concat(this.type, ": ").concat(t.getShaderInfoLog(o)));
    if (t.attachShader(a, n), t.attachShader(a, o), t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS)) throw new Wt('Shader link error for "'.concat(this.type, '" ').concat(t.getProgramInfoLog(a)));
    const c = this.getUniformLocations(t, a) || {};
    return c.uStepW = t.getUniformLocation(a, "uStepW"), c.uStepH = t.getUniformLocation(a, "uStepH"), { program: a, attributeLocations: this.getAttributeLocations(t, a), uniformLocations: c };
  }
  getAttributeLocations(t, e) {
    return { aPosition: t.getAttribLocation(e, "aPosition") };
  }
  getUniformLocations(t, e) {
    const s = this.constructor.uniformLocations, r = {};
    for (let n = 0; n < s.length; n++) r[s[n]] = t.getUniformLocation(e, s[n]);
    return r;
  }
  sendAttributeData(t, e, s) {
    const r = e.aPosition, n = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, n), t.enableVertexAttribArray(r), t.vertexAttribPointer(r, 2, t.FLOAT, !1, 0, 0), t.bufferData(t.ARRAY_BUFFER, s, t.STATIC_DRAW);
  }
  _setupFrameBuffer(t) {
    const e = t.context;
    if (t.passes > 1) {
      const s = t.destinationWidth, r = t.destinationHeight;
      t.sourceWidth === s && t.sourceHeight === r || (e.deleteTexture(t.targetTexture), t.targetTexture = t.filterBackend.createTexture(e, s, r)), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.targetTexture, 0);
    } else e.bindFramebuffer(e.FRAMEBUFFER, null), e.finish();
  }
  _swapTextures(t) {
    t.passes--, t.pass++;
    const e = t.targetTexture;
    t.targetTexture = t.sourceTexture, t.sourceTexture = e;
  }
  isNeutralState(t) {
    return !1;
  }
  applyTo(t) {
    gi(t) ? (this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
  }
  getCacheKey() {
    return this.type;
  }
  retrieveShader(t) {
    const e = this.getCacheKey();
    return t.programCache[e] || (t.programCache[e] = this.createProgram(t.context)), t.programCache[e];
  }
  applyToWebGL(t) {
    const e = t.context, s = this.retrieveShader(t);
    t.pass === 0 && t.originalTexture ? e.bindTexture(e.TEXTURE_2D, t.originalTexture) : e.bindTexture(e.TEXTURE_2D, t.sourceTexture), e.useProgram(s.program), this.sendAttributeData(e, s.attributeLocations, t.aPosition), e.uniform1f(s.uniformLocations.uStepW, 1 / t.sourceWidth), e.uniform1f(s.uniformLocations.uStepH, 1 / t.sourceHeight), this.sendUniformData(e, s.uniformLocations), e.viewport(0, 0, t.destinationWidth, t.destinationHeight), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
  }
  bindAdditionalTexture(t, e, s) {
    t.activeTexture(s), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE0);
  }
  unbindAdditionalTexture(t, e) {
    t.activeTexture(e), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE0);
  }
  sendUniformData(t, e) {
  }
  createHelpLayer(t) {
    if (!t.helpLayer) {
      const { sourceWidth: e, sourceHeight: s } = t, r = Rt({ width: e, height: s });
      t.helpLayer = r;
    }
  }
  toObject() {
    const t = Object.keys(this.constructor.defaults || {});
    return v({ type: this.type }, t.reduce((e, s) => (e[s] = this[s], e), {}));
  }
  toJSON() {
    return this.toObject();
  }
  static async fromObject(t, e) {
    return new this(H(t, Od));
  }
}
y(rt, "type", "BaseFilter"), y(rt, "uniformLocations", []);
const Md = { multiply: `gl_FragColor.rgb *= uColor.rgb;
`, screen: `gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);
`, add: `gl_FragColor.rgb += uColor.rgb;
`, difference: `gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);
`, subtract: `gl_FragColor.rgb -= uColor.rgb;
`, lighten: `gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);
`, darken: `gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);
`, exclusion: `gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);
`, overlay: `
    if (uColor.r < 0.5) {
      gl_FragColor.r *= 2.0 * uColor.r;
    } else {
      gl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);
    }
    if (uColor.g < 0.5) {
      gl_FragColor.g *= 2.0 * uColor.g;
    } else {
      gl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);
    }
    if (uColor.b < 0.5) {
      gl_FragColor.b *= 2.0 * uColor.b;
    } else {
      gl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);
    }
    `, tint: `
    gl_FragColor.rgb *= (1.0 - uColor.a);
    gl_FragColor.rgb += uColor.rgb;
    ` };
class fr extends rt {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        gl_FragColor = color;
        if (color.a > 0.0) {
          `.concat(Md[this.mode], `
        }
      }
      `);
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = new F(this.color).getSource(), r = this.alpha, n = s[0] * r, o = s[1] * r, a = s[2] * r, c = 1 - r;
    for (let h = 0; h < e.length; h += 4) {
      const l = e[h], u = e[h + 1], d = e[h + 2];
      let g, f, p;
      switch (this.mode) {
        case "multiply":
          g = l * n / 255, f = u * o / 255, p = d * a / 255;
          break;
        case "screen":
          g = 255 - (255 - l) * (255 - n) / 255, f = 255 - (255 - u) * (255 - o) / 255, p = 255 - (255 - d) * (255 - a) / 255;
          break;
        case "add":
          g = l + n, f = u + o, p = d + a;
          break;
        case "difference":
          g = Math.abs(l - n), f = Math.abs(u - o), p = Math.abs(d - a);
          break;
        case "subtract":
          g = l - n, f = u - o, p = d - a;
          break;
        case "darken":
          g = Math.min(l, n), f = Math.min(u, o), p = Math.min(d, a);
          break;
        case "lighten":
          g = Math.max(l, n), f = Math.max(u, o), p = Math.max(d, a);
          break;
        case "overlay":
          g = n < 128 ? 2 * l * n / 255 : 255 - 2 * (255 - l) * (255 - n) / 255, f = o < 128 ? 2 * u * o / 255 : 255 - 2 * (255 - u) * (255 - o) / 255, p = a < 128 ? 2 * d * a / 255 : 255 - 2 * (255 - d) * (255 - a) / 255;
          break;
        case "exclusion":
          g = n + l - 2 * n * l / 255, f = o + u - 2 * o * u / 255, p = a + d - 2 * a * d / 255;
          break;
        case "tint":
          g = n + l * c, f = o + u * c, p = a + d * c;
      }
      e[h] = g, e[h + 1] = f, e[h + 2] = p;
    }
  }
  sendUniformData(t, e) {
    const s = new F(this.color).getSource();
    s[0] = this.alpha * s[0] / 255, s[1] = this.alpha * s[1] / 255, s[2] = this.alpha * s[2] / 255, s[3] = this.alpha, t.uniform4fv(e.uColor, s);
  }
}
y(fr, "defaults", { color: "#F95C63", mode: "multiply", alpha: 1 }), y(fr, "type", "BlendColor"), y(fr, "uniformLocations", ["uColor"]), O.setClass(fr);
const Dd = { multiply: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.rgba *= color2.rgba;
      gl_FragColor = color;
    }
    `, mask: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.a = color2.a;
      gl_FragColor = color;
    }
    ` }, jd = ["type", "image"];
class pr extends rt {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Dd[this.mode];
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    uniform mat3 uTransformMatrix;
    void main() {
      vTexCoord = aPosition;
      vTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
    `;
  }
  applyToWebGL(t) {
    const e = t.context, s = this.createTexture(t.filterBackend, this.image);
    this.bindAdditionalTexture(e, s, e.TEXTURE1), super.applyToWebGL(t), this.unbindAdditionalTexture(e, e.TEXTURE1);
  }
  createTexture(t, e) {
    return t.getCachedTexture(e.cacheKey, e.getElement());
  }
  calculateMatrix() {
    const t = this.image, { width: e, height: s } = t.getElement();
    return [1 / t.scaleX, 0, 0, 0, 1 / t.scaleY, 0, -t.left / e, -t.top / s, 1];
  }
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r }, filterBackend: { resources: n } } = t;
    const o = this.image;
    n.blendImage || (n.blendImage = St());
    const a = n.blendImage, c = a.getContext("2d");
    a.width !== s || a.height !== r ? (a.width = s, a.height = r) : c.clearRect(0, 0, s, r), c.setTransform(o.scaleX, 0, 0, o.scaleY, o.left, o.top), c.drawImage(o.getElement(), 0, 0, s, r);
    const h = c.getImageData(0, 0, s, r).data;
    for (let l = 0; l < e.length; l += 4) {
      const u = e[l], d = e[l + 1], g = e[l + 2], f = e[l + 3], p = h[l], m = h[l + 1], b = h[l + 2], T = h[l + 3];
      switch (this.mode) {
        case "multiply":
          e[l] = u * p / 255, e[l + 1] = d * m / 255, e[l + 2] = g * b / 255, e[l + 3] = f * T / 255;
          break;
        case "mask":
          e[l + 3] = T;
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.calculateMatrix();
    t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, !1, s);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { image: this.image && this.image.toObject() });
  }
  static async fromObject(t, e) {
    let { type: s, image: r } = t, n = H(t, jd);
    return Tt.fromObject(r, e).then((o) => new this(v(v({}, n), {}, { image: o })));
  }
}
y(pr, "type", "BlendImage"), y(pr, "defaults", { mode: "multiply", alpha: 1 }), y(pr, "uniformLocations", ["uTransformMatrix", "uImage"]), O.setClass(pr);
class mr extends rt {
  getFragmentSource() {
    return `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uDelta;
    varying vec2 vTexCoord;
    const float nSamples = 15.0;
    vec3 v3offset = vec3(12.9898, 78.233, 151.7182);
    float random(vec3 scale) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);
    }
    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;
      float offset = random(v3offset);
      for (float t = -nSamples; t <= nSamples; t++) {
        float percent = (t + offset - 0.5) / nSamples;
        float weight = 1.0 - abs(percent);
        color += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;
        total += weight;
      }
      gl_FragColor = color / total;
    }
  `;
  }
  applyTo(t) {
    gi(t) ? (this.aspectRatio = t.sourceWidth / t.sourceHeight, t.passes++, this._setupFrameBuffer(t), this.horizontal = !0, this.applyToWebGL(t), this._swapTextures(t), this._setupFrameBuffer(t), this.horizontal = !1, this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t);
  }
  applyTo2d(t) {
    t.imageData = this.simpleBlur(t);
  }
  simpleBlur(t) {
    let { ctx: e, imageData: s, filterBackend: { resources: r } } = t;
    const { width: n, height: o } = s;
    r.blurLayer1 || (r.blurLayer1 = St(), r.blurLayer2 = St());
    const a = r.blurLayer1, c = r.blurLayer2;
    a.width === n && a.height === o || (c.width = a.width = n, c.height = a.height = o);
    const h = a.getContext("2d"), l = c.getContext("2d"), u = 15, d = 0.06 * this.blur * 0.5;
    let g, f, p, m;
    for (h.putImageData(s, 0, 0), l.clearRect(0, 0, n, o), m = -15; m <= u; m++) g = (Math.random() - 0.5) / 4, f = m / u, p = d * f * n + g, l.globalAlpha = 1 - Math.abs(f), l.drawImage(a, p, g), h.drawImage(c, 0, 0), l.globalAlpha = 1, l.clearRect(0, 0, c.width, c.height);
    for (m = -15; m <= u; m++) g = (Math.random() - 0.5) / 4, f = m / u, p = d * f * o + g, l.globalAlpha = 1 - Math.abs(f), l.drawImage(a, g, p), h.drawImage(c, 0, 0), l.globalAlpha = 1, l.clearRect(0, 0, c.width, c.height);
    e.drawImage(a, 0, 0);
    const b = e.getImageData(0, 0, a.width, a.height);
    return h.globalAlpha = 1, h.clearRect(0, 0, a.width, a.height), b;
  }
  sendUniformData(t, e) {
    const s = this.chooseRightDelta();
    t.uniform2fv(e.uDelta, s);
  }
  isNeutralState() {
    return this.blur === 0;
  }
  chooseRightDelta() {
    let t = 1;
    const e = [0, 0];
    this.horizontal ? this.aspectRatio > 1 && (t = 1 / this.aspectRatio) : this.aspectRatio < 1 && (t = this.aspectRatio);
    const s = t * this.blur * 0.12;
    return this.horizontal ? e[0] = s : e[1] = s, e;
  }
}
y(mr, "type", "Blur"), y(mr, "defaults", { blur: 0 }), y(mr, "uniformLocations", ["uDelta"]), O.setClass(mr);
class vr extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBrightness;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += uBrightness;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.round(255 * this.brightness);
    for (let r = 0; r < e.length; r += 4) e[r] += s, e[r + 1] += s, e[r + 2] += s;
  }
  isNeutralState() {
    return this.brightness === 0;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBrightness, this.brightness);
  }
}
y(vr, "type", "Brightness"), y(vr, "defaults", { brightness: 0 }), y(vr, "uniformLocations", ["uBrightness"]), O.setClass(vr);
const Zc = { matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], colorsOnly: !0 };
class Ze extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vTexCoord;
  uniform mat4 uColorMatrix;
  uniform vec4 uConstants;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color *= uColorMatrix;
    color += uConstants;
    gl_FragColor = color;
  }`;
  }
  applyTo2d(t) {
    const e = t.imageData.data, s = this.matrix, r = this.colorsOnly;
    for (let n = 0; n < e.length; n += 4) {
      const o = e[n], a = e[n + 1], c = e[n + 2];
      if (e[n] = o * s[0] + a * s[1] + c * s[2] + 255 * s[4], e[n + 1] = o * s[5] + a * s[6] + c * s[7] + 255 * s[9], e[n + 2] = o * s[10] + a * s[11] + c * s[12] + 255 * s[14], !r) {
        const h = e[n + 3];
        e[n] += h * s[3], e[n + 1] += h * s[8], e[n + 2] += h * s[13], e[n + 3] = o * s[15] + a * s[16] + c * s[17] + h * s[18] + 255 * s[19];
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.matrix, r = [s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]], n = [s[4], s[9], s[14], s[19]];
    t.uniformMatrix4fv(e.uColorMatrix, !1, r), t.uniform4fv(e.uConstants, n);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { matrix: [...this.matrix] });
  }
}
function Ve(i, t) {
  var e;
  const s = (y(e = class extends Ze {
    toObject() {
      return { type: this.type, colorsOnly: this.colorsOnly };
    }
  }, "type", i), y(e, "defaults", { colorsOnly: !1, matrix: t }), e);
  return O.setClass(s, i), s;
}
y(Ze, "type", "ColorMatrix"), y(Ze, "defaults", Zc), y(Ze, "uniformLocations", ["uColorMatrix", "uConstants"]), O.setClass(Ze);
Ve("Brownie", [0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965, 0, 0, 0, 1, 0]);
Ve("Vintage", [0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0, 0, 0, 1, 0]);
Ve("Kodachrome", [1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972, 0, 0, 0, 1, 0]);
Ve("Technicolor", [1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137, 0, 0, 0, 1, 0]);
Ve("Polaroid", [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]);
Ve("Sepia", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]);
Ve("BlackWhite", [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]);
class Ao extends rt {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.subFilters = t.subFilters || [];
  }
  applyTo(t) {
    gi(t) && (t.passes += this.subFilters.length - 1), this.subFilters.forEach((e) => {
      e.applyTo(t);
    });
  }
  toObject() {
    return { type: this.type, subFilters: this.subFilters.map((t) => t.toObject()) };
  }
  isNeutralState() {
    return !this.subFilters.some((t) => !t.isNeutralState());
  }
  static fromObject(t, e) {
    return Promise.all((t.subFilters || []).map((s) => O.getClass(s.type).fromObject(s, e))).then((s) => new this({ subFilters: s }));
  }
}
y(Ao, "type", "Composed"), O.setClass(Ao);
class yr extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uContrast;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));
    color.rgb = contrastF * (color.rgb - 0.5) + 0.5;
    gl_FragColor = color;
  }`;
  }
  isNeutralState() {
    return this.contrast === 0;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = Math.floor(255 * this.contrast), r = 259 * (s + 255) / (255 * (259 - s));
    for (let n = 0; n < e.length; n += 4) e[n] = r * (e[n] - 128) + 128, e[n + 1] = r * (e[n + 1] - 128) + 128, e[n + 2] = r * (e[n + 2] - 128) + 128;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uContrast, this.contrast);
  }
}
y(yr, "type", "Contrast"), y(yr, "defaults", { contrast: 0 }), y(yr, "uniformLocations", ["uContrast"]), O.setClass(yr);
const Id = { Convolute_3_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_3_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_5_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_5_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_7_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_7_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_9_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_9_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    ` };
class br extends rt {
  getCacheKey() {
    return "".concat(this.type, "_").concat(Math.sqrt(this.matrix.length), "_").concat(this.opaque ? 1 : 0);
  }
  getFragmentSource() {
    return Id[this.getCacheKey()];
  }
  applyTo2d(t) {
    const e = t.imageData, s = e.data, r = this.matrix, n = Math.round(Math.sqrt(r.length)), o = Math.floor(n / 2), a = e.width, c = e.height, h = t.ctx.createImageData(a, c), l = h.data, u = this.opaque ? 1 : 0;
    let d, g, f, p, m, b, T, w, S, C, k, D, M;
    for (k = 0; k < c; k++) for (C = 0; C < a; C++) {
      for (m = 4 * (k * a + C), d = 0, g = 0, f = 0, p = 0, M = 0; M < n; M++) for (D = 0; D < n; D++) T = k + M - o, b = C + D - o, T < 0 || T >= c || b < 0 || b >= a || (w = 4 * (T * a + b), S = r[M * n + D], d += s[w] * S, g += s[w + 1] * S, f += s[w + 2] * S, u || (p += s[w + 3] * S));
      l[m] = d, l[m + 1] = g, l[m + 2] = f, l[m + 3] = u ? s[m + 3] : p;
    }
    t.imageData = h;
  }
  sendUniformData(t, e) {
    t.uniform1fv(e.uMatrix, this.matrix);
  }
  toObject() {
    return v(v({}, super.toObject()), {}, { opaque: this.opaque, matrix: [...this.matrix] });
  }
}
y(br, "type", "Convolute"), y(br, "defaults", { opaque: !1, matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0] }), y(br, "uniformLocations", ["uMatrix", "uOpaque", "uHalfSize", "uSize"]), O.setClass(br);
const Qc = "Gamma";
class _r extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec3 uGamma;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    vec3 correction = (1.0 / uGamma);
    color.r = pow(color.r, correction.r);
    color.g = pow(color.g, correction.g);
    color.b = pow(color.b, correction.b);
    gl_FragColor = color;
    gl_FragColor.rgb *= color.a;
  }
`;
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(t), this.gamma = t.gamma || this.constructor.defaults.gamma.concat();
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.gamma, r = 1 / s[0], n = 1 / s[1], o = 1 / s[2];
    this.rgbValues || (this.rgbValues = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) });
    const a = this.rgbValues;
    for (let c = 0; c < 256; c++) a.r[c] = 255 * Math.pow(c / 255, r), a.g[c] = 255 * Math.pow(c / 255, n), a.b[c] = 255 * Math.pow(c / 255, o);
    for (let c = 0; c < e.length; c += 4) e[c] = a.r[e[c]], e[c + 1] = a.g[e[c + 1]], e[c + 2] = a.b[e[c + 2]];
  }
  sendUniformData(t, e) {
    t.uniform3fv(e.uGamma, this.gamma);
  }
  isNeutralState() {
    const { gamma: t } = this;
    return t[0] === 1 && t[1] === 1 && t[2] === 1;
  }
  toObject() {
    return { type: Qc, gamma: this.gamma.concat() };
  }
}
y(_r, "type", Qc), y(_r, "defaults", { gamma: [1, 1, 1] }), y(_r, "uniformLocations", ["uGamma"]), O.setClass(_r);
const Ed = { average: `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      float average = (color.r + color.b + color.g) / 3.0;
      gl_FragColor = vec4(average, average, average, color.a);
    }
    `, lightness: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `, luminosity: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    ` };
class Tr extends rt {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s, r = 0; r < e.length; r += 4) {
      const n = e[r], o = e[r + 1], a = e[r + 2];
      switch (this.mode) {
        case "average":
          s = (n + o + a) / 3;
          break;
        case "lightness":
          s = (Math.min(n, o, a) + Math.max(n, o, a)) / 2;
          break;
        case "luminosity":
          s = 0.21 * n + 0.72 * o + 0.07 * a;
      }
      e[r + 2] = e[r + 1] = e[r] = s;
    }
  }
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Ed[this.mode];
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uMode, 1);
  }
  isNeutralState() {
    return !1;
  }
}
y(Tr, "type", "Grayscale"), y(Tr, "defaults", { mode: "average" }), y(Tr, "uniformLocations", ["uMode"]), O.setClass(Tr);
const Pd = v(v({}, Zc), {}, { rotation: 0 });
class Ri extends Ze {
  calculateMatrix() {
    const t = this.rotation * Math.PI, e = Pt(t), s = At(t), r = 1 / 3, n = Math.sqrt(r) * s, o = 1 - e;
    this.matrix = [e + o / 3, r * o - n, r * o + n, 0, 0, r * o + n, e + r * o, r * o - n, 0, 0, r * o - n, r * o + n, e + r * o, 0, 0, 0, 0, 0, 1, 0];
  }
  isNeutralState() {
    return this.rotation === 0;
  }
  applyTo(t) {
    this.calculateMatrix(), super.applyTo(t);
  }
  toObject() {
    return { type: this.type, rotation: this.rotation };
  }
}
y(Ri, "type", "HueRotation"), y(Ri, "defaults", Pd), O.setClass(Ri);
class xr extends rt {
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    for (let s = 0; s < e.length; s += 4) e[s] = 255 - e[s], e[s + 1] = 255 - e[s + 1], e[s + 2] = 255 - e[s + 2], this.alpha && (e[s + 3] = 255 - e[s + 3]);
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform int uInvert;
  uniform int uAlpha;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    if (uInvert == 1) {
      if (uAlpha == 1) {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,1.0 -color.a);
      } else {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);
      }
    } else {
      gl_FragColor = color;
    }
  }
`;
  }
  isNeutralState() {
    return !this.invert;
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uInvert, Number(this.invert)), t.uniform1i(e.uAlpha, Number(this.alpha));
  }
}
y(xr, "type", "Invert"), y(xr, "defaults", { alpha: !1, invert: !0 }), y(xr, "uniformLocations", ["uInvert", "uAlpha"]), O.setClass(xr);
class wr extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uStepH;
  uniform float uNoise;
  uniform float uSeed;
  varying vec2 vTexCoord;
  float rand(vec2 co, float seed, float vScale) {
    return fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);
  }
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = this.noise;
    for (let r = 0; r < e.length; r += 4) {
      const n = (0.5 - Math.random()) * s;
      e[r] += n, e[r + 1] += n, e[r + 2] += n;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uNoise, this.noise / 255), t.uniform1f(e.uSeed, Math.random());
  }
  isNeutralState() {
    return this.noise === 0;
  }
}
y(wr, "type", "Noise"), y(wr, "defaults", { noise: 0 }), y(wr, "uniformLocations", ["uNoise", "uSeed"]), O.setClass(wr);
class Sr extends rt {
  applyTo2d(t) {
    let { imageData: { data: e, width: s, height: r } } = t;
    for (let n = 0; n < r; n += this.blocksize) for (let o = 0; o < s; o += this.blocksize) {
      const a = 4 * n * s + 4 * o, c = e[a], h = e[a + 1], l = e[a + 2], u = e[a + 3];
      for (let d = n; d < Math.min(n + this.blocksize, r); d++) for (let g = o; g < Math.min(o + this.blocksize, s); g++) {
        const f = 4 * d * s + 4 * g;
        e[f] = c, e[f + 1] = h, e[f + 2] = l, e[f + 3] = u;
      }
    }
  }
  isNeutralState() {
    return this.blocksize === 1;
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBlocksize;
  uniform float uStepW;
  uniform float uStepH;
  varying vec2 vTexCoord;
  void main() {
    float blockW = uBlocksize * uStepW;
    float blockH = uBlocksize * uStepH;
    int posX = int(vTexCoord.x / blockW);
    int posY = int(vTexCoord.y / blockH);
    float fposX = float(posX);
    float fposY = float(posY);
    vec2 squareCoords = vec2(fposX * blockW, fposY * blockH);
    vec4 color = texture2D(uTexture, squareCoords);
    gl_FragColor = color;
  }
`;
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBlocksize, this.blocksize);
  }
}
y(Sr, "type", "Pixelate"), y(Sr, "defaults", { blocksize: 4 }), y(Sr, "uniformLocations", ["uBlocksize"]), O.setClass(Sr);
class Cr extends rt {
  getFragmentSource() {
    return `
precision highp float;
uniform sampler2D uTexture;
uniform vec4 uLow;
uniform vec4 uHigh;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = texture2D(uTexture, vTexCoord);
  if(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {
    gl_FragColor.a = 0.0;
  }
}
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = 255 * this.distance, r = new F(this.color).getSource(), n = [r[0] - s, r[1] - s, r[2] - s], o = [r[0] + s, r[1] + s, r[2] + s];
    for (let a = 0; a < e.length; a += 4) {
      const c = e[a], h = e[a + 1], l = e[a + 2];
      c > n[0] && h > n[1] && l > n[2] && c < o[0] && h < o[1] && l < o[2] && (e[a + 3] = 0);
    }
  }
  sendUniformData(t, e) {
    const s = new F(this.color).getSource(), r = this.distance, n = [0 + s[0] / 255 - r, 0 + s[1] / 255 - r, 0 + s[2] / 255 - r, 1], o = [s[0] / 255 + r, s[1] / 255 + r, s[2] / 255 + r, 1];
    t.uniform4fv(e.uLow, n), t.uniform4fv(e.uHigh, o);
  }
}
y(Cr, "type", "RemoveColor"), y(Cr, "defaults", { color: "#FFFFFF", distance: 0.02, useAlpha: !1 }), y(Cr, "uniformLocations", ["uLow", "uHigh"]), O.setClass(Cr);
class Or extends rt {
  sendUniformData(t, e) {
    t.uniform2fv(e.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]), t.uniform1fv(e.uTaps, this.taps);
  }
  getFilterWindow() {
    const t = this.tempScale;
    return Math.ceil(this.lanczosLobes / t);
  }
  getCacheKey() {
    const t = this.getFilterWindow();
    return "".concat(this.type, "_").concat(t);
  }
  getFragmentSource() {
    const t = this.getFilterWindow();
    return this.generateShader(t);
  }
  getTaps() {
    const t = this.lanczosCreate(this.lanczosLobes), e = this.tempScale, s = this.getFilterWindow(), r = new Array(s);
    for (let n = 1; n <= s; n++) r[n - 1] = t(n * e);
    return r;
  }
  generateShader(t) {
    const e = new Array(t);
    for (let s = 1; s <= t; s++) e[s - 1] = "".concat(s, ".0 * uDelta");
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uDelta;
      varying vec2 vTexCoord;
      uniform float uTaps[`.concat(t, `];
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        float sum = 1.0;
        `).concat(e.map((s, r) => `
              color += texture2D(uTexture, vTexCoord + `.concat(s, ") * uTaps[").concat(r, "] + texture2D(uTexture, vTexCoord - ").concat(s, ") * uTaps[").concat(r, `];
              sum += 2.0 * uTaps[`).concat(r, `];
            `)).join(`
`), `
        gl_FragColor = color / sum;
      }
    `);
  }
  applyToForWebgl(t) {
    t.passes++, this.width = t.sourceWidth, this.horizontal = !0, this.dW = Math.round(this.width * this.scaleX), this.dH = t.sourceHeight, this.tempScale = this.dW / this.width, this.taps = this.getTaps(), t.destinationWidth = this.dW, super.applyTo(t), t.sourceWidth = t.destinationWidth, this.height = t.sourceHeight, this.horizontal = !1, this.dH = Math.round(this.height * this.scaleY), this.tempScale = this.dH / this.height, this.taps = this.getTaps(), t.destinationHeight = this.dH, super.applyTo(t), t.sourceHeight = t.destinationHeight;
  }
  applyTo(t) {
    gi(t) ? this.applyToForWebgl(t) : this.applyTo2d(t);
  }
  isNeutralState() {
    return this.scaleX === 1 && this.scaleY === 1;
  }
  lanczosCreate(t) {
    return (e) => {
      if (e >= t || e <= -t) return 0;
      if (e < 11920929e-14 && e > -11920929e-14) return 1;
      const s = (e *= Math.PI) / t;
      return Math.sin(e) / e * Math.sin(s) / s;
    };
  }
  applyTo2d(t) {
    const e = t.imageData, s = this.scaleX, r = this.scaleY;
    this.rcpScaleX = 1 / s, this.rcpScaleY = 1 / r;
    const n = e.width, o = e.height, a = Math.round(n * s), c = Math.round(o * r);
    let h;
    h = this.resizeType === "sliceHack" ? this.sliceByTwo(t, n, o, a, c) : this.resizeType === "hermite" ? this.hermiteFastResize(t, n, o, a, c) : this.resizeType === "bilinear" ? this.bilinearFiltering(t, n, o, a, c) : this.resizeType === "lanczos" ? this.lanczosResize(t, n, o, a, c) : new ImageData(a, c), t.imageData = h;
  }
  sliceByTwo(t, e, s, r, n) {
    const o = t.imageData, a = 0.5;
    let c = !1, h = !1, l = e * a, u = s * a;
    const d = t.filterBackend.resources;
    let g = 0, f = 0;
    const p = e;
    let m = 0;
    d.sliceByTwo || (d.sliceByTwo = St());
    const b = d.sliceByTwo;
    (b.width < 1.5 * e || b.height < s) && (b.width = 1.5 * e, b.height = s);
    const T = b.getContext("2d");
    for (T.clearRect(0, 0, 1.5 * e, s), T.putImageData(o, 0, 0), r = Math.floor(r), n = Math.floor(n); !c || !h; ) e = l, s = u, r < Math.floor(l * a) ? l = Math.floor(l * a) : (l = r, c = !0), n < Math.floor(u * a) ? u = Math.floor(u * a) : (u = n, h = !0), T.drawImage(b, g, f, e, s, p, m, l, u), g = p, f = m, m += u;
    return T.getImageData(g, f, r, n);
  }
  lanczosResize(t, e, s, r, n) {
    const o = t.imageData.data, a = t.ctx.createImageData(r, n), c = a.data, h = this.lanczosCreate(this.lanczosLobes), l = this.rcpScaleX, u = this.rcpScaleY, d = 2 / this.rcpScaleX, g = 2 / this.rcpScaleY, f = Math.ceil(l * this.lanczosLobes / 2), p = Math.ceil(u * this.lanczosLobes / 2), m = {}, b = { x: 0, y: 0 }, T = { x: 0, y: 0 };
    return function w(S) {
      let C, k, D, M, P, X, et, q, R, G, mt;
      for (b.x = (S + 0.5) * l, T.x = Math.floor(b.x), C = 0; C < n; C++) {
        for (b.y = (C + 0.5) * u, T.y = Math.floor(b.y), P = 0, X = 0, et = 0, q = 0, R = 0, k = T.x - f; k <= T.x + f; k++) if (!(k < 0 || k >= e)) {
          G = Math.floor(1e3 * Math.abs(k - b.x)), m[G] || (m[G] = {});
          for (let dt = T.y - p; dt <= T.y + p; dt++) dt < 0 || dt >= s || (mt = Math.floor(1e3 * Math.abs(dt - b.y)), m[G][mt] || (m[G][mt] = h(Math.sqrt(Math.pow(G * d, 2) + Math.pow(mt * g, 2)) / 1e3)), D = m[G][mt], D > 0 && (M = 4 * (dt * e + k), P += D, X += D * o[M], et += D * o[M + 1], q += D * o[M + 2], R += D * o[M + 3]));
        }
        M = 4 * (C * r + S), c[M] = X / P, c[M + 1] = et / P, c[M + 2] = q / P, c[M + 3] = R / P;
      }
      return ++S < r ? w(S) : a;
    }(0);
  }
  bilinearFiltering(t, e, s, r, n) {
    let o, a, c, h, l, u, d, g, f, p, m, b, T, w = 0;
    const S = this.rcpScaleX, C = this.rcpScaleY, k = 4 * (e - 1), D = t.imageData.data, M = t.ctx.createImageData(r, n), P = M.data;
    for (d = 0; d < n; d++) for (g = 0; g < r; g++) for (l = Math.floor(S * g), u = Math.floor(C * d), f = S * g - l, p = C * d - u, T = 4 * (u * e + l), m = 0; m < 4; m++) o = D[T + m], a = D[T + 4 + m], c = D[T + k + m], h = D[T + k + 4 + m], b = o * (1 - f) * (1 - p) + a * f * (1 - p) + c * p * (1 - f) + h * f * p, P[w++] = b;
    return M;
  }
  hermiteFastResize(t, e, s, r, n) {
    const o = this.rcpScaleX, a = this.rcpScaleY, c = Math.ceil(o / 2), h = Math.ceil(a / 2), l = t.imageData.data, u = t.ctx.createImageData(r, n), d = u.data;
    for (let g = 0; g < n; g++) for (let f = 0; f < r; f++) {
      const p = 4 * (f + g * r);
      let m = 0, b = 0, T = 0, w = 0, S = 0, C = 0, k = 0;
      const D = (g + 0.5) * a;
      for (let M = Math.floor(g * a); M < (g + 1) * a; M++) {
        const P = Math.abs(D - (M + 0.5)) / h, X = (f + 0.5) * o, et = P * P;
        for (let q = Math.floor(f * o); q < (f + 1) * o; q++) {
          let R = Math.abs(X - (q + 0.5)) / c;
          const G = Math.sqrt(et + R * R);
          G > 1 && G < -1 || (m = 2 * G * G * G - 3 * G * G + 1, m > 0 && (R = 4 * (q + M * e), k += m * l[R + 3], T += m, l[R + 3] < 255 && (m = m * l[R + 3] / 250), w += m * l[R], S += m * l[R + 1], C += m * l[R + 2], b += m));
        }
      }
      d[p] = w / b, d[p + 1] = S / b, d[p + 2] = C / b, d[p + 3] = k / T;
    }
    return u;
  }
}
y(Or, "type", "Resize"), y(Or, "defaults", { resizeType: "hermite", scaleX: 1, scaleY: 1, lanczosLobes: 3 }), y(Or, "uniformLocations", ["uDelta", "uTaps"]), O.setClass(Or);
class kr extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uSaturation;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float rgMax = max(color.r, color.g);
    float rgbMax = max(rgMax, color.b);
    color.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;
    color.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;
    color.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.saturation;
    for (let r = 0; r < e.length; r += 4) {
      const n = e[r], o = e[r + 1], a = e[r + 2], c = Math.max(n, o, a);
      e[r] += c !== n ? (c - n) * s : 0, e[r + 1] += c !== o ? (c - o) * s : 0, e[r + 2] += c !== a ? (c - a) * s : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uSaturation, -this.saturation);
  }
  isNeutralState() {
    return this.saturation === 0;
  }
}
y(kr, "type", "Saturation"), y(kr, "defaults", { saturation: 0 }), y(kr, "uniformLocations", ["uSaturation"]), O.setClass(kr);
class Mr extends rt {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVibrance;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float max = max(color.r, max(color.g, color.b));
    float avg = (color.r + color.g + color.b) / 3.0;
    float amt = (abs(max - avg) * 2.0) * uVibrance;
    color.r += max != color.r ? (max - color.r) * amt : 0.00;
    color.g += max != color.g ? (max - color.g) * amt : 0.00;
    color.b += max != color.b ? (max - color.b) * amt : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t) {
    let { imageData: { data: e } } = t;
    const s = -this.vibrance;
    for (let r = 0; r < e.length; r += 4) {
      const n = e[r], o = e[r + 1], a = e[r + 2], c = Math.max(n, o, a), h = (n + o + a) / 3, l = 2 * Math.abs(c - h) / 255 * s;
      e[r] += c !== n ? (c - n) * l : 0, e[r + 1] += c !== o ? (c - o) * l : 0, e[r + 2] += c !== a ? (c - a) * l : 0;
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uVibrance, -this.vibrance);
  }
  isNeutralState() {
    return this.vibrance === 0;
  }
}
y(Mr, "type", "Vibrance"), y(Mr, "defaults", { vibrance: 0 }), y(Mr, "uniformLocations", ["uVibrance"]), O.setClass(Mr);
function Yt(i, t, e, s, r) {
  const a = r.canvas;
  if (!a) return;
  const c = a.viewportTransform;
  i.save(), this.controlOrientation === "left" ? i.translate(
    r.left + c[4],
    r.top + c[5] + r.height / 2
  ) : i.translate(
    r.left + r.width + c[4],
    r.top + c[5] + r.height / 2
  ), i.rotate(zn.degreesToRadians(90 + r.angle)), i.lineWidth = 6, i.lineCap = "round", i.strokeStyle = "white", i.beginPath(), i.moveTo(-6, 0), i.lineTo(6, 0), i.stroke(), i.lineWidth = 4, i.strokeStyle = "black", i.beginPath(), i.moveTo(-6, 0), i.lineTo(6, 0), i.stroke(), i.restore();
}
const Ad = {
  selectable: !1,
  evented: !1,
  strokeWidth: 0,
  stroke: "transparent"
}, Qe = class Qe extends tt {
  constructor(e) {
    super(e);
    x(this, "id");
    x(this, "accepts", [
      "audio",
      "video",
      "image",
      "text",
      "caption",
      "template"
    ]);
    x(this, "metadata");
    x(this, "items", []);
    x(this, "magnetic");
    x(this, "static");
    Object.assign(this, Qe.ownDefaults), this.id = e.id, this.accepts = e.accepts || [], this.items = e.items || [], this.magnetic = e.magnetic, this.static = e.static, this.metadata = e.metadata, this.fill = "rgba(34, 34, 37, 0.8)", this.objectCaching = !1;
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...Qe.ownDefaults
    };
  }
  updateCoords(e) {
    this.width = e;
  }
};
x(Qe, "ownDefaults", Ad), x(Qe, "type", "Track");
let Vt = Qe;
O.setClass(Vt, "Track");
const Zs = 1, Ge = "rgba(255, 255, 255,1.0)", Rd = [
  "Track",
  "Transition",
  "Helper",
  "PreviewTrackItem"
], Fd = {
  top: {
    top: 35,
    guide: 2,
    bottom: 3
  },
  center: {
    top: 3,
    guide: 2,
    bottom: 3
  },
  bottom: {
    top: 3,
    guide: 2,
    bottom: 35
  }
}, Ld = (i, t) => {
  const e = Fd[i];
  return i === "top" ? {
    top: t - (e.guide + e.bottom),
    guide: e.guide,
    bottom: e.bottom
  } : i === "center" ? {
    top: e.top,
    guide: e.guide,
    bottom: e.bottom
  } : {
    top: e == null ? void 0 : e.top,
    guide: e == null ? void 0 : e.guide,
    bottom: t - ((e == null ? void 0 : e.guide) + (e == null ? void 0 : e.top))
  };
}, ts = class ts extends zt {
  constructor(e) {
    const s = Ld(e.kind, e.height), r = new tt({
      top: 0,
      left: 0,
      strokeWidth: 0,
      fill: "transparent",
      selectable: !0,
      height: s.top,
      width: e.width
    }), n = new tt({
      top: s.top,
      left: 0,
      strokeWidth: 0,
      fill: "transparent",
      selectable: !0,
      height: s.guide,
      width: e.width
    }), o = new tt({
      top: s.top + s.guide,
      left: 0,
      strokeWidth: 0,
      fill: "transparent",
      selectable: !0,
      height: s.bottom,
      width: e.width
    });
    super([r, n, o], e);
    x(this, "guide");
    x(this, "topGuide");
    x(this, "bottomGuide");
    x(this, "metadata");
    x(this, "accepts", []);
    x(this, "kind");
    x(this, "activeGuideFill");
    Object.assign(this, ts.ownDefaults), this.guide = n, this.topGuide = r, this.bottomGuide = o, this.id = e.id, this.metadata = e.metadata, this.tScale = e.tScale, this.kind = e.kind, this.activeGuideFill = e.activeGuideFill || Ge;
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...ts.ownDefaults
    };
  }
  updateCoords(e) {
    this.scaleToWidth(e), this.set("scaleY", 1);
  }
  setSelected(e) {
    e ? this.guide.set("fill", this.activeGuideFill) : this.guide.set("fill", "transparent");
  }
};
x(ts, "type", "Helper"), x(ts, "ownDefaults", {
  selectable: !1,
  evented: !1
});
let Te = ts;
O.setClass(Te, "Helper");
const es = class es extends tt {
  constructor(e) {
    super(e);
    x(this, "guideItemId");
    x(this, "distXToActCenter");
    x(this, "trackItemType");
    x(this, "defaultPos");
    x(this, "draggedObject");
    Object.assign(this, es.ownDefaults), this.id = e.id;
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...es.ownDefaults
    };
  }
  // add custom text to the track item
  _render(e) {
    super._render(e), this.updateSelected(e);
  }
  updateSelected(e) {
    e.save(), e.beginPath(), e.roundRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.rx
    ), e.lineWidth = Zs, e.setLineDash(this.strokeDashArray), e.strokeStyle = Ge, e.stroke(), e.restore();
  }
};
x(es, "type", "Placeholder"), x(es, "ownDefaults", {
  rx: 6,
  ry: 6,
  objectCaching: !1,
  borderColor: "transparent",
  strokeWidth: 0,
  fill: "rgba(255, 211, 42,0.1)",
  stroke: "rgba(255, 211, 42,1.0)",
  selectable: !1,
  borderOpacityWhenMoving: 1,
  hoverCursor: "default",
  strokeDashArray: [5, 1],
  evented: !1
});
let Hs = es;
O.setClass(Hs, "Placeholder");
const Bd = {
  left: -0.5,
  top: -0.5,
  center: 0,
  bottom: 0.5,
  right: 0.5
}, I = (i) => typeof i == "string" ? Bd[i] : i - 0.5, Xe = "center", Qs = "left", Oy = "top", ky = "bottom", tr = "right", My = "none";
function er(i) {
  return I(i.originX) === I(Xe) && I(i.originY) === I(Xe);
}
function fi(i) {
  return (t, e, s, r) => {
    const { target: n, originX: o, originY: a } = e, c = n.getRelativeCenterPoint(), h = n.translateToOriginPoint(c, o, a), l = i(t, e, s, r);
    return n.setPositionByOrigin(
      h,
      e.originX,
      e.originY
    ), l;
  };
}
const Ro = 3, Wd = 4, th = 188, Xd = 60, zd = 1e3 / Xd;
function nt(i, t = 1, e = 1) {
  const s = th * t;
  return i * (60 / 1e3) * s / e;
}
function L(i, t = 1, e = 1) {
  const s = th * t;
  return i / s * zd * e;
}
function Dy(i, t = 1) {
  return nt(i, t);
}
const Ar = (i) => Object.keys(i).reduce((t, e) => {
  const { display: s } = i[e];
  return Math.max(t, s.to);
}, 0), { wrapWithFireEvent: Hd, getLocalPoint: Yd } = ys, Vd = (i, t, e, s) => {
  const r = Yd(
    t,
    t.originX,
    t.originY,
    e,
    s
  );
  if (I(t.originX) === I(Xe) || I(t.originX) === I(tr) && r.x < 0 || I(t.originX) === I(Qs) && r.x > 0) {
    let { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = er(t) ? 2 : 1, c = n.width, h = Math.ceil(
      Math.abs(r.x * a / n.scaleX) - o
    );
    if (t.corner === "mr") {
      const u = n.trim.to, d = h - c, g = L(
        d,
        n.tScale,
        n.playbackRate
      ), f = u + g;
      if (f > n.duration) return !1;
      n.set("width", Math.max(h, 0)), n.trim.to = f;
    } else {
      if (n.left < 0) return !1;
      const u = c - h;
      if (n.left + u < 0) {
        const b = nt(
          n.duration,
          n.tScale,
          n.playbackRate
        ), T = n.width + n.left;
        if (T <= b) {
          n.set("width", T);
          const w = L(
            b - T,
            n.tScale,
            n.playbackRate
          );
          return n.trim.from = w, !0;
        }
        return !1;
      }
      const g = h - c, f = n.trim.from, p = L(
        g,
        n.tScale,
        n.playbackRate
      ), m = f - p;
      if (m < 0) return !1;
      n.set("width", Math.max(h, 0)), n.trim.from = m, n.onResize && n.onResize();
    }
    return c !== n.width;
  }
  return !1;
}, on = Hd(
  "resizing",
  fi(Vd)
), { wrapWithFireEvent: Gd, getLocalPoint: Nd, wrapWithFixedAnchor: Ud } = ys, $d = (i, t, e, s) => {
  const r = Nd(
    t,
    t.originX,
    t.originY,
    e,
    s
  );
  if (I(t.originX) === I(Xe) || I(t.originX) === I(tr) && r.x < 0 || I(t.originX) === I(Qs) && r.x > 0) {
    const { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = er(t) ? 2 : 1, c = n.width, h = Math.ceil(
      Math.abs(r.x * a / n.scaleX) - o
    ), l = t.corner === "ml";
    if (n.left < 0) return !1;
    if (l) {
      const g = c - h;
      if (n.left + g < 0)
        return n.set("width", n.width + n.left), !0;
    }
    const u = L(1, n.tScale);
    return L(
      h,
      n.tScale,
      n.playbackRate
    ) < u ? !1 : (n.set("width", Math.max(h, 0)), c !== n.width);
  }
  return !1;
}, an = Gd(
  "resizing",
  Ud($d)
), { wrapWithFireEvent: qd, getLocalPoint: Kd } = ys, Jd = (i, t, e, s) => {
  const r = Kd(
    t,
    t.originX,
    t.originY,
    e,
    s
  );
  if (I(t.originX) === I(Xe) || I(t.originX) === I(tr) && r.x < 0 || I(t.originX) === I(Qs) && r.x > 0) {
    const { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = er(t) ? 2 : 1, c = n.width, h = Math.ceil(
      Math.abs(r.x * a / n.scaleX) - o
    ), l = L(
      h,
      n.tScale,
      n.playbackRate
    );
    return l >= 1500 || l < 500 ? !1 : (n.set("width", Math.max(h, 0)), n.set("duration", l), c !== n.width);
  }
  return !1;
}, cn = qd(
  "resizing",
  fi(Jd)
), { wrapWithFireEvent: Zd, getLocalPoint: Qd } = ys, tg = (i, t, e, s) => {
  const r = Qd(
    t,
    t.originX,
    t.originY,
    e,
    s
  );
  if (I(t.originX) === I(Xe) || I(t.originX) === I(tr) && r.x < 0 || I(t.originX) === I(Qs) && r.x > 0) {
    let { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = er(t) ? 2 : 1, c = n.width, h = Math.ceil(
      Math.abs(r.x * a / n.scaleX) - o
    );
    if (t.corner === "mr") {
      const u = n.trim.to, d = h - c, g = L(
        d,
        n.tScale,
        n.playbackRate
      ), f = u + g;
      if (f > n.duration) return !1;
      n.set("width", Math.max(h, 0)), n.trim.to = f;
    } else {
      if (n.left < 0) return !1;
      const u = c - h;
      if (n.left + u < 0) return !1;
      const g = h - c, f = n.trim.from, p = L(
        g,
        n.tScale,
        n.playbackRate
      ), m = f - p;
      if (m < 0) return !1;
      n.set("width", Math.max(h, 0)), n.trim.from = m;
    }
    return c !== n.width;
  }
  return !1;
}, Fo = Zd(
  "resizing",
  fi(tg)
), { scaleSkewCursorStyleHandler: Gt } = ys, eg = () => ({
  mr: new V({
    x: 0.5,
    y: 0,
    actionHandler: an,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    render: Yt,
    controlOrientation: "right"
  }),
  ml: new V({
    x: -0.5,
    y: 0,
    actionHandler: an,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    render: Yt,
    controlOrientation: "left"
  })
}), jy = () => ({
  mr: new V({
    x: 0.5,
    y: 0,
    render: Yt,
    actionHandler: Fo,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "right"
  }),
  ml: new V({
    x: -0.5,
    y: 0,
    render: Yt,
    actionHandler: Fo,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "left"
  })
}), Iy = () => ({
  mr: new V({
    x: 0.5,
    y: 0,
    render: Yt,
    actionHandler: on,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "right"
  }),
  ml: new V({
    x: -0.5,
    y: 0,
    render: Yt,
    actionHandler: on,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "left"
  })
}), sg = () => ({
  mr: new V({
    x: 0.5,
    y: 0,
    render: Yt,
    actionHandler: hn,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "right"
  }),
  ml: new V({
    x: -0.5,
    y: 0,
    render: Yt,
    actionHandler: hn,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    controlOrientation: "left"
  })
}), eh = () => ({
  mr: new V({
    x: 0.5,
    y: 0,
    actionHandler: cn,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    render: Yt,
    controlOrientation: "right"
  }),
  ml: new V({
    x: -0.5,
    y: 0,
    actionHandler: cn,
    cursorStyleHandler: Gt,
    actionName: "resizing",
    render: Yt,
    controlOrientation: "left"
  })
}), rg = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let sr = (i = 21) => {
  let t = "", e = crypto.getRandomValues(new Uint8Array(i |= 0));
  for (; i--; )
    t += rg[e[i] & 63];
  return t;
};
function Os(i = 16) {
  const t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", e = t.charAt(Math.floor(Math.random() * t.length));
  let s = sr(i - 1);
  return s = s.replace(/[^a-zA-Z0-9]/g, "").slice(0, i - 1), e + s;
}
const { wrapWithFireEvent: ig, getLocalPoint: ng } = ys, og = (i, t, e, s) => {
  const r = ng(
    t,
    t.originX,
    t.originY,
    e,
    s
  );
  if (I(t.originX) === I(Xe) || I(t.originX) === I(tr) && r.x < 0 || I(t.originX) === I(Qs) && r.x > 0) {
    let { target: n } = t, o = n.strokeWidth / (n.strokeUniform ? n.scaleX : 1), a = er(t) ? 2 : 1, c = n.width, h = Math.ceil(
      Math.abs(r.x * a / n.scaleX) - o
    );
    const l = L(1, n.tScale);
    if (t.corner === "mr") {
      const d = n.trim.to, g = h - c, f = L(
        g,
        n.tScale,
        n.playbackRate
      ), p = d + f;
      if (p > n.duration || L(
        h,
        n.tScale,
        n.playbackRate
      ) < l) return !1;
      n.set("width", Math.max(h, 0)), n.trim.to = p;
    } else {
      if (n.left < 0) return !1;
      const d = c - h;
      if (n.left + d < 0) {
        const w = nt(
          n.duration,
          n.tScale,
          n.playbackRate
        ), S = n.width + n.left;
        if (S <= w) {
          n.set("width", S);
          const C = L(
            w - S,
            n.tScale,
            n.playbackRate
          );
          return n.trim.from = C, !0;
        }
        return !1;
      }
      if (L(
        h,
        n.tScale,
        n.playbackRate
      ) < l) return !1;
      const p = h - c, m = n.trim.from, b = L(
        p,
        n.tScale,
        n.playbackRate
      ), T = m - b;
      if (T < 0) return !1;
      n.set("width", Math.max(h, 0)), n.trim.from = T, n.onResize && n.onResize();
    }
    return c !== n.width;
  }
  return !1;
}, hn = ig(
  "resizing",
  fi(og)
), ss = class ss extends tt {
  constructor(e) {
    super(e);
    x(this, "duration");
    x(this, "fromId");
    x(this, "toId");
    x(this, "kind", "none");
    x(this, "isSelected", !1);
    x(this, "availableDrop", !0);
    Object.assign(this, ss.ownDefaults), this.id = e.id, this.centeredScaling = !0, this.strokeWidth = 0, this.tScale = e.tScale, this.duration = e.duration, this.fromId = e.fromId, this.toId = e.toId, this.kind = e.kind, this.strokeDashArray = e.strokeDashArray || [];
  }
  static createControls() {
    return { controls: eh() };
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...ss.ownDefaults
    };
  }
  updateCoords() {
  }
  // add custom text to the track item
  _render(e) {
    super._render(e), this.updateSelected(e);
  }
  setSelected(e) {
    this.isSelected = e, this.set({ dirty: !0 });
  }
  updateSelected(e) {
    const s = this.availableDrop ? this.isSelected ? Ge : "rgba(255, 255, 255,0.15)" : "red";
    e.save(), e.beginPath(), e.roundRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.rx
    ), e.lineWidth = Zs, e.setLineDash(this.strokeDashArray), e.strokeStyle = s, e.stroke(), e.restore();
  }
};
x(ss, "type", "Transition"), x(ss, "ownDefaults", {
  objectCaching: !1,
  borderColor: "transparent",
  stroke: "transparent",
  strokeWidth: 1.5,
  fill: "rgba(0,0,0, 0.5)",
  borderOpacityWhenMoving: 1,
  hoverCursor: "default",
  lockMovementX: !0,
  lockMovementY: !0,
  duration: 1500,
  rx: 8,
  ry: 8
});
let Nt = ss;
O.setClass(Nt, "Transition");
const Rs = class Rs extends tt {
  constructor(e) {
    super(e);
    x(this, "id");
    x(this, "resourceId", "");
    x(this, "tScale");
    x(this, "isSelected", !1);
    x(this, "trim");
    x(this, "duration");
    Object.assign(this, Rs.ownDefaults), this.id = e.id, this.tScale = e.tScale, this.objectCaching = !1, this.rx = 8, this.ry = 8;
  }
  static createControls() {
    return { controls: sg() };
  }
  // add custom text to the track item
  _render(e) {
    super._render(e), this.updateSelected(e);
  }
  setSelected(e) {
    this.isSelected = e, this.set({ dirty: !0 });
  }
  updateSelected(e) {
    this.isSelected && (e.save(), e.beginPath(), e.roundRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.rx
    ), e.lineWidth = Zs, e.strokeStyle = Ge, e.stroke(), e.restore());
  }
  onResizeSnap() {
  }
  setSrc(e) {
    this.src = e;
  }
};
x(Rs, "type", "Trimmable"), x(Rs, "ownDefaults", {
  rx: 6,
  ry: 6,
  objectCaching: !1,
  borderColor: "transparent",
  stroke: "transparent",
  strokeWidth: 0,
  fill: "#27272a",
  borderOpacityWhenMoving: 1,
  hoverCursor: "default"
});
let se = Rs;
O.setClass(se, "Trimmable");
const rs = class rs extends tt {
  constructor(e) {
    super(e);
    x(this, "isSelected", !1);
    Object.assign(this, rs.ownDefaults), this.tScale = e.tScale, this.display = e.display;
  }
  static createControls() {
    return { controls: eg() };
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...rs.ownDefaults
    };
  }
  setSelected(e) {
    this.isSelected = e, this.set({ dirty: !0 });
  }
  // add custom text to the track item
  _render(e) {
    super._render(e), this.updateSelected(e);
  }
  updateSelected(e) {
    this.isSelected && (e.save(), e.beginPath(), e.roundRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      6
    ), e.lineWidth = Zs, e.strokeStyle = Ge, e.stroke(), e.restore());
  }
};
x(rs, "type", "Resizable"), x(rs, "ownDefaults", {
  rx: 6,
  ry: 6,
  objectCaching: !1,
  borderColor: "transparent",
  stroke: "transparent",
  strokeWidth: 0,
  fill: "#27272a",
  borderOpacityWhenMoving: 1,
  hoverCursor: "default"
});
let ln = rs;
O.setClass(ln, "Resizable");
function ag(i) {
  const t = Math.floor(i / 1e3), e = Math.floor(t / 60), s = t % 60, r = String(e).padStart(2, "0"), n = String(s).padStart(2, "0");
  return `${r}:${n}`;
}
const is = class is extends tt {
  constructor(e) {
    super(e);
    x(this, "duration");
    x(this, "fromId");
    x(this, "toId");
    x(this, "isSelected", !1);
    x(this, "name");
    x(this, "durationString");
    x(this, "itemType");
    Object.assign(this, is.ownDefaults), this.id = e.id, this.fill = "#27272a", this.name = e.type.toUpperCase(), this.durationString = ag(e.duration), this.itemType = e.type;
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...is.ownDefaults
    };
  }
  _render(e) {
    e.save(), super._render(e), e.beginPath(), e.rect(-this.width / 2, -this.height / 2, this.width, this.height), e.clip(), this.drawTextIdentity(e), e.restore();
  }
  drawTextIdentity(e) {
    e.font = "600 12px 'Geist variable'", e.textAlign = "left";
    const s = e.measureText(this.name).width, r = e.measureText(this.durationString).width, n = 8, o = 4, a = 4 - this.height / 2, c = 20, h = 4, l = 4 - this.width / 2, u = s + n * 2;
    this.drawRoundedRect(
      e,
      l,
      a,
      u,
      c,
      h
    ), e.fillStyle = "#f4f4f5", e.fillText(this.name, l + n, a + 14);
    const d = l + u + o, g = r + n * 2;
    this.drawRoundedRect(
      e,
      d,
      a,
      g,
      c,
      h
    ), e.fillStyle = "#f4f4f5", e.fillText(this.durationString, d + n, a + 14);
  }
  drawRoundedRect(e, s, r, n, o, a) {
    e.fillStyle = "rgba(0, 0, 0, 0.5)", e.roundRect ? (e.beginPath(), e.roundRect(s, r, n, o, a), e.fill()) : e.fillRect(s, r, n, o);
  }
};
x(is, "type", "PreviewTrackItem"), x(is, "ownDefaults", {
  objectCaching: !1,
  borderColor: "transparent",
  stroke: "transparent",
  strokeWidth: 0,
  borderOpacityWhenMoving: 1,
  hoverCursor: "default",
  rx: 4,
  ry: 4
});
let xe = is;
O.setClass(xe, "PreviewTrackItem");
class cg {
  constructor() {
    x(this, "___eventListeners", {});
    x(this, "___activeObjects", []);
  }
  resize(t, { force: e } = { force: !1 }) {
    var s;
    this.lowerCanvasEl && (this.setDimensions(t), e && this.renderTracks(), (s = this.onResizeCanvas) == null || s.call(this, {
      width: this.width,
      height: this.height
    }));
  }
  pauseEventListeners() {
    this.___eventListeners = this.__eventListeners, this.__eventListeners = {};
    const t = this.getActiveObjects();
    this.discardActiveObject(), this.___activeObjects = t;
  }
  resumeEventListeners() {
    this.__eventListeners = this.___eventListeners, this.___eventListeners = {};
    const t = this.___activeObjects;
    if (!t.length)
      return this.requestRenderAll(), !1;
    if (t.length === 1)
      this.setActiveObject(t[0]);
    else {
      const e = new wt(t);
      this.setActiveObject(e);
    }
    this.requestRenderAll();
  }
  updateCachingActiveObjects(t) {
    const e = this.___activeObjects;
    this.___activeObjects = e.map((s) => {
      const r = t.find((n) => n.id === s.id);
      return r || s;
    });
  }
}
function Ys(i, t) {
  return i.map((e) => ({
    ...e,
    items: e.items.filter((s) => !t.includes(s))
  }));
}
const hg = (i, t) => {
  var h, l, u, d, g;
  const e = i.display, s = nt(e.from, t.tScale), r = nt(
    e.to - e.from,
    t.tScale,
    i.playbackRate
  ), n = t.sizesMap[i.type] || 42, o = i.type.charAt(0).toUpperCase() + i.type.slice(1), a = O.getClass(o), c = {
    width: r,
    height: n,
    id: i.id,
    tScale: t.tScale,
    top: 10,
    left: s,
    display: e,
    duration: i.duration || e.to - e.from,
    metadata: i.metadata,
    playbackRate: i.playbackRate || 1,
    src: (h = i.details) == null ? void 0 : h.src,
    trim: i.trim || { from: 0, to: i.duration },
    text: (l = i.details) == null ? void 0 : l.text,
    srcs: ((u = i.details) == null ? void 0 : u.srcs) || [],
    backgroundColorDiv: (d = i.details) == null ? void 0 : d.backgroundColor,
    svgString: (g = i.details) == null ? void 0 : g.svgString
  };
  return new a(c);
};
var sh = typeof global == "object" && global && global.Object === Object && global, lg = typeof self == "object" && self && self.Object === Object && self, Ft = sh || lg || Function("return this")(), Ct = Ft.Symbol, rh = Object.prototype, ug = rh.hasOwnProperty, dg = rh.toString, ws = Ct ? Ct.toStringTag : void 0;
function gg(i) {
  var t = ug.call(i, ws), e = i[ws];
  try {
    i[ws] = void 0;
    var s = !0;
  } catch {
  }
  var r = dg.call(i);
  return s && (t ? i[ws] = e : delete i[ws]), r;
}
var fg = Object.prototype, pg = fg.toString;
function mg(i) {
  return pg.call(i);
}
var vg = "[object Null]", yg = "[object Undefined]", Lo = Ct ? Ct.toStringTag : void 0;
function bs(i) {
  return i == null ? i === void 0 ? yg : vg : Lo && Lo in Object(i) ? gg(i) : mg(i);
}
function we(i) {
  return i != null && typeof i == "object";
}
var bg = "[object Symbol]";
function pi(i) {
  return typeof i == "symbol" || we(i) && bs(i) == bg;
}
function _g(i, t) {
  for (var e = -1, s = i == null ? 0 : i.length, r = Array(s); ++e < s; )
    r[e] = t(i[e], e, i);
  return r;
}
var Ut = Array.isArray, Bo = Ct ? Ct.prototype : void 0, Wo = Bo ? Bo.toString : void 0;
function ih(i) {
  if (typeof i == "string")
    return i;
  if (Ut(i))
    return _g(i, ih) + "";
  if (pi(i))
    return Wo ? Wo.call(i) : "";
  var t = i + "";
  return t == "0" && 1 / i == -1 / 0 ? "-0" : t;
}
var Tg = /\s/;
function xg(i) {
  for (var t = i.length; t-- && Tg.test(i.charAt(t)); )
    ;
  return t;
}
var wg = /^\s+/;
function Sg(i) {
  return i && i.slice(0, xg(i) + 1).replace(wg, "");
}
function $t(i) {
  var t = typeof i;
  return i != null && (t == "object" || t == "function");
}
var Xo = NaN, Cg = /^[-+]0x[0-9a-f]+$/i, Og = /^0b[01]+$/i, kg = /^0o[0-7]+$/i, Mg = parseInt;
function zo(i) {
  if (typeof i == "number")
    return i;
  if (pi(i))
    return Xo;
  if ($t(i)) {
    var t = typeof i.valueOf == "function" ? i.valueOf() : i;
    i = $t(t) ? t + "" : t;
  }
  if (typeof i != "string")
    return i === 0 ? i : +i;
  i = Sg(i);
  var e = Og.test(i);
  return e || kg.test(i) ? Mg(i.slice(2), e ? 2 : 8) : Cg.test(i) ? Xo : +i;
}
function Dg(i) {
  return i;
}
var jg = "[object AsyncFunction]", Ig = "[object Function]", Eg = "[object GeneratorFunction]", Pg = "[object Proxy]";
function nh(i) {
  if (!$t(i))
    return !1;
  var t = bs(i);
  return t == Ig || t == Eg || t == jg || t == Pg;
}
var Fi = Ft["__core-js_shared__"], Ho = function() {
  var i = /[^.]+$/.exec(Fi && Fi.keys && Fi.keys.IE_PROTO || "");
  return i ? "Symbol(src)_1." + i : "";
}();
function Ag(i) {
  return !!Ho && Ho in i;
}
var Rg = Function.prototype, Fg = Rg.toString;
function Ne(i) {
  if (i != null) {
    try {
      return Fg.call(i);
    } catch {
    }
    try {
      return i + "";
    } catch {
    }
  }
  return "";
}
var Lg = /[\\^$.*+?()[\]{}|]/g, Bg = /^\[object .+?Constructor\]$/, Wg = Function.prototype, Xg = Object.prototype, zg = Wg.toString, Hg = Xg.hasOwnProperty, Yg = RegExp(
  "^" + zg.call(Hg).replace(Lg, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vg(i) {
  if (!$t(i) || Ag(i))
    return !1;
  var t = nh(i) ? Yg : Bg;
  return t.test(Ne(i));
}
function Gg(i, t) {
  return i == null ? void 0 : i[t];
}
function Ue(i, t) {
  var e = Gg(i, t);
  return Vg(e) ? e : void 0;
}
var un = Ue(Ft, "WeakMap"), Yo = Object.create, Ng = /* @__PURE__ */ function() {
  function i() {
  }
  return function(t) {
    if (!$t(t))
      return {};
    if (Yo)
      return Yo(t);
    i.prototype = t;
    var e = new i();
    return i.prototype = void 0, e;
  };
}();
function Ug(i, t, e) {
  switch (e.length) {
    case 0:
      return i.call(t);
    case 1:
      return i.call(t, e[0]);
    case 2:
      return i.call(t, e[0], e[1]);
    case 3:
      return i.call(t, e[0], e[1], e[2]);
  }
  return i.apply(t, e);
}
var $g = 800, qg = 16, Kg = Date.now;
function Jg(i) {
  var t = 0, e = 0;
  return function() {
    var s = Kg(), r = qg - (s - e);
    if (e = s, r > 0) {
      if (++t >= $g)
        return arguments[0];
    } else
      t = 0;
    return i.apply(void 0, arguments);
  };
}
function Zg(i) {
  return function() {
    return i;
  };
}
var qr = function() {
  try {
    var i = Ue(Object, "defineProperty");
    return i({}, "", {}), i;
  } catch {
  }
}(), Qg = qr ? function(i, t) {
  return qr(i, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Zg(t),
    writable: !0
  });
} : Dg, tf = Jg(Qg);
function ef(i, t) {
  for (var e = -1, s = i == null ? 0 : i.length; ++e < s && t(i[e], e, i) !== !1; )
    ;
  return i;
}
var sf = 9007199254740991, rf = /^(?:0|[1-9]\d*)$/;
function Yn(i, t) {
  var e = typeof i;
  return t = t ?? sf, !!t && (e == "number" || e != "symbol" && rf.test(i)) && i > -1 && i % 1 == 0 && i < t;
}
function nf(i, t, e) {
  t == "__proto__" && qr ? qr(i, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : i[t] = e;
}
function Vn(i, t) {
  return i === t || i !== i && t !== t;
}
var of = Object.prototype, af = of.hasOwnProperty;
function oh(i, t, e) {
  var s = i[t];
  (!(af.call(i, t) && Vn(s, e)) || e === void 0 && !(t in i)) && nf(i, t, e);
}
var Vo = Math.max;
function cf(i, t, e) {
  return t = Vo(t === void 0 ? i.length - 1 : t, 0), function() {
    for (var s = arguments, r = -1, n = Vo(s.length - t, 0), o = Array(n); ++r < n; )
      o[r] = s[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = s[r];
    return a[t] = e(o), Ug(i, this, a);
  };
}
var hf = 9007199254740991;
function Gn(i) {
  return typeof i == "number" && i > -1 && i % 1 == 0 && i <= hf;
}
function lf(i) {
  return i != null && Gn(i.length) && !nh(i);
}
var uf = Object.prototype;
function ah(i) {
  var t = i && i.constructor, e = typeof t == "function" && t.prototype || uf;
  return i === e;
}
function df(i, t) {
  for (var e = -1, s = Array(i); ++e < i; )
    s[e] = t(e);
  return s;
}
var gf = "[object Arguments]";
function Go(i) {
  return we(i) && bs(i) == gf;
}
var ch = Object.prototype, ff = ch.hasOwnProperty, pf = ch.propertyIsEnumerable, Nn = Go(/* @__PURE__ */ function() {
  return arguments;
}()) ? Go : function(i) {
  return we(i) && ff.call(i, "callee") && !pf.call(i, "callee");
};
function mf() {
  return !1;
}
var hh = typeof exports == "object" && exports && !exports.nodeType && exports, No = hh && typeof module == "object" && module && !module.nodeType && module, vf = No && No.exports === hh, Uo = vf ? Ft.Buffer : void 0, yf = Uo ? Uo.isBuffer : void 0, Kr = yf || mf, bf = "[object Arguments]", _f = "[object Array]", Tf = "[object Boolean]", xf = "[object Date]", wf = "[object Error]", Sf = "[object Function]", Cf = "[object Map]", Of = "[object Number]", kf = "[object Object]", Mf = "[object RegExp]", Df = "[object Set]", jf = "[object String]", If = "[object WeakMap]", Ef = "[object ArrayBuffer]", Pf = "[object DataView]", Af = "[object Float32Array]", Rf = "[object Float64Array]", Ff = "[object Int8Array]", Lf = "[object Int16Array]", Bf = "[object Int32Array]", Wf = "[object Uint8Array]", Xf = "[object Uint8ClampedArray]", zf = "[object Uint16Array]", Hf = "[object Uint32Array]", W = {};
W[Af] = W[Rf] = W[Ff] = W[Lf] = W[Bf] = W[Wf] = W[Xf] = W[zf] = W[Hf] = !0;
W[bf] = W[_f] = W[Ef] = W[Tf] = W[Pf] = W[xf] = W[wf] = W[Sf] = W[Cf] = W[Of] = W[kf] = W[Mf] = W[Df] = W[jf] = W[If] = !1;
function Yf(i) {
  return we(i) && Gn(i.length) && !!W[bs(i)];
}
function Un(i) {
  return function(t) {
    return i(t);
  };
}
var lh = typeof exports == "object" && exports && !exports.nodeType && exports, Ps = lh && typeof module == "object" && module && !module.nodeType && module, Vf = Ps && Ps.exports === lh, Li = Vf && sh.process, ds = function() {
  try {
    var i = Ps && Ps.require && Ps.require("util").types;
    return i || Li && Li.binding && Li.binding("util");
  } catch {
  }
}(), $o = ds && ds.isTypedArray, uh = $o ? Un($o) : Yf, Gf = Object.prototype, Nf = Gf.hasOwnProperty;
function Uf(i, t) {
  var e = Ut(i), s = !e && Nn(i), r = !e && !s && Kr(i), n = !e && !s && !r && uh(i), o = e || s || r || n, a = o ? df(i.length, String) : [], c = a.length;
  for (var h in i)
    Nf.call(i, h) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    n && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    Yn(h, c))) && a.push(h);
  return a;
}
function dh(i, t) {
  return function(e) {
    return i(t(e));
  };
}
var $f = dh(Object.keys, Object), qf = Object.prototype, Kf = qf.hasOwnProperty;
function Jf(i) {
  if (!ah(i))
    return $f(i);
  var t = [];
  for (var e in Object(i))
    Kf.call(i, e) && e != "constructor" && t.push(e);
  return t;
}
function Zf(i) {
  return lf(i) ? Uf(i) : Jf(i);
}
var Qf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, tp = /^\w*$/;
function ep(i, t) {
  if (Ut(i))
    return !1;
  var e = typeof i;
  return e == "number" || e == "symbol" || e == "boolean" || i == null || pi(i) ? !0 : tp.test(i) || !Qf.test(i) || t != null && i in Object(t);
}
var Vs = Ue(Object, "create");
function sp() {
  this.__data__ = Vs ? Vs(null) : {}, this.size = 0;
}
function rp(i) {
  var t = this.has(i) && delete this.__data__[i];
  return this.size -= t ? 1 : 0, t;
}
var ip = "__lodash_hash_undefined__", np = Object.prototype, op = np.hasOwnProperty;
function ap(i) {
  var t = this.__data__;
  if (Vs) {
    var e = t[i];
    return e === ip ? void 0 : e;
  }
  return op.call(t, i) ? t[i] : void 0;
}
var cp = Object.prototype, hp = cp.hasOwnProperty;
function lp(i) {
  var t = this.__data__;
  return Vs ? t[i] !== void 0 : hp.call(t, i);
}
var up = "__lodash_hash_undefined__";
function dp(i, t) {
  var e = this.__data__;
  return this.size += this.has(i) ? 0 : 1, e[i] = Vs && t === void 0 ? up : t, this;
}
function ze(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var s = i[t];
    this.set(s[0], s[1]);
  }
}
ze.prototype.clear = sp;
ze.prototype.delete = rp;
ze.prototype.get = ap;
ze.prototype.has = lp;
ze.prototype.set = dp;
function gp() {
  this.__data__ = [], this.size = 0;
}
function mi(i, t) {
  for (var e = i.length; e--; )
    if (Vn(i[e][0], t))
      return e;
  return -1;
}
var fp = Array.prototype, pp = fp.splice;
function mp(i) {
  var t = this.__data__, e = mi(t, i);
  if (e < 0)
    return !1;
  var s = t.length - 1;
  return e == s ? t.pop() : pp.call(t, e, 1), --this.size, !0;
}
function vp(i) {
  var t = this.__data__, e = mi(t, i);
  return e < 0 ? void 0 : t[e][1];
}
function yp(i) {
  return mi(this.__data__, i) > -1;
}
function bp(i, t) {
  var e = this.__data__, s = mi(e, i);
  return s < 0 ? (++this.size, e.push([i, t])) : e[s][1] = t, this;
}
function he(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var s = i[t];
    this.set(s[0], s[1]);
  }
}
he.prototype.clear = gp;
he.prototype.delete = mp;
he.prototype.get = vp;
he.prototype.has = yp;
he.prototype.set = bp;
var Gs = Ue(Ft, "Map");
function _p() {
  this.size = 0, this.__data__ = {
    hash: new ze(),
    map: new (Gs || he)(),
    string: new ze()
  };
}
function Tp(i) {
  var t = typeof i;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? i !== "__proto__" : i === null;
}
function vi(i, t) {
  var e = i.__data__;
  return Tp(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function xp(i) {
  var t = vi(this, i).delete(i);
  return this.size -= t ? 1 : 0, t;
}
function wp(i) {
  return vi(this, i).get(i);
}
function Sp(i) {
  return vi(this, i).has(i);
}
function Cp(i, t) {
  var e = vi(this, i), s = e.size;
  return e.set(i, t), this.size += e.size == s ? 0 : 1, this;
}
function le(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var s = i[t];
    this.set(s[0], s[1]);
  }
}
le.prototype.clear = _p;
le.prototype.delete = xp;
le.prototype.get = wp;
le.prototype.has = Sp;
le.prototype.set = Cp;
var Op = "Expected a function";
function $n(i, t) {
  if (typeof i != "function" || t != null && typeof t != "function")
    throw new TypeError(Op);
  var e = function() {
    var s = arguments, r = t ? t.apply(this, s) : s[0], n = e.cache;
    if (n.has(r))
      return n.get(r);
    var o = i.apply(this, s);
    return e.cache = n.set(r, o) || n, o;
  };
  return e.cache = new ($n.Cache || le)(), e;
}
$n.Cache = le;
var kp = 500;
function Mp(i) {
  var t = $n(i, function(s) {
    return e.size === kp && e.clear(), s;
  }), e = t.cache;
  return t;
}
var Dp = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, jp = /\\(\\)?/g, Ip = Mp(function(i) {
  var t = [];
  return i.charCodeAt(0) === 46 && t.push(""), i.replace(Dp, function(e, s, r, n) {
    t.push(r ? n.replace(jp, "$1") : s || e);
  }), t;
});
function Ep(i) {
  return i == null ? "" : ih(i);
}
function yi(i, t) {
  return Ut(i) ? i : ep(i, t) ? [i] : Ip(Ep(i));
}
function qn(i) {
  if (typeof i == "string" || pi(i))
    return i;
  var t = i + "";
  return t == "0" && 1 / i == -1 / 0 ? "-0" : t;
}
function Pp(i, t) {
  t = yi(t, i);
  for (var e = 0, s = t.length; i != null && e < s; )
    i = i[qn(t[e++])];
  return e && e == s ? i : void 0;
}
function gh(i, t) {
  for (var e = -1, s = t.length, r = i.length; ++e < s; )
    i[r + e] = t[e];
  return i;
}
var qo = Ct ? Ct.isConcatSpreadable : void 0;
function Ap(i) {
  return Ut(i) || Nn(i) || !!(qo && i && i[qo]);
}
function Rp(i, t, e, s, r) {
  var n = -1, o = i.length;
  for (e || (e = Ap), r || (r = []); ++n < o; ) {
    var a = i[n];
    e(a) ? gh(r, a) : r[r.length] = a;
  }
  return r;
}
function Kn(i) {
  var t = i == null ? 0 : i.length;
  return t ? Rp(i) : [];
}
function Fp(i) {
  return tf(cf(i, void 0, Kn), i + "");
}
var Lp = dh(Object.getPrototypeOf, Object);
function Bp() {
  this.__data__ = new he(), this.size = 0;
}
function Wp(i) {
  var t = this.__data__, e = t.delete(i);
  return this.size = t.size, e;
}
function Xp(i) {
  return this.__data__.get(i);
}
function zp(i) {
  return this.__data__.has(i);
}
var Hp = 200;
function Yp(i, t) {
  var e = this.__data__;
  if (e instanceof he) {
    var s = e.__data__;
    if (!Gs || s.length < Hp - 1)
      return s.push([i, t]), this.size = ++e.size, this;
    e = this.__data__ = new le(s);
  }
  return e.set(i, t), this.size = e.size, this;
}
function ne(i) {
  var t = this.__data__ = new he(i);
  this.size = t.size;
}
ne.prototype.clear = Bp;
ne.prototype.delete = Wp;
ne.prototype.get = Xp;
ne.prototype.has = zp;
ne.prototype.set = Yp;
var fh = typeof exports == "object" && exports && !exports.nodeType && exports, Ko = fh && typeof module == "object" && module && !module.nodeType && module, Vp = Ko && Ko.exports === fh, Jo = Vp ? Ft.Buffer : void 0;
Jo && Jo.allocUnsafe;
function Gp(i, t) {
  return i.slice();
}
function Np(i, t) {
  for (var e = -1, s = i == null ? 0 : i.length, r = 0, n = []; ++e < s; ) {
    var o = i[e];
    t(o, e, i) && (n[r++] = o);
  }
  return n;
}
function Up() {
  return [];
}
var $p = Object.prototype, qp = $p.propertyIsEnumerable, Zo = Object.getOwnPropertySymbols, Kp = Zo ? function(i) {
  return i == null ? [] : (i = Object(i), Np(Zo(i), function(t) {
    return qp.call(i, t);
  }));
} : Up;
function Jp(i, t, e) {
  var s = t(i);
  return Ut(i) ? s : gh(s, e(i));
}
function dn(i) {
  return Jp(i, Zf, Kp);
}
var gn = Ue(Ft, "DataView"), fn = Ue(Ft, "Promise"), pn = Ue(Ft, "Set"), Qo = "[object Map]", Zp = "[object Object]", ta = "[object Promise]", ea = "[object Set]", sa = "[object WeakMap]", ra = "[object DataView]", Qp = Ne(gn), tm = Ne(Gs), em = Ne(fn), sm = Ne(pn), rm = Ne(un), Dt = bs;
(gn && Dt(new gn(new ArrayBuffer(1))) != ra || Gs && Dt(new Gs()) != Qo || fn && Dt(fn.resolve()) != ta || pn && Dt(new pn()) != ea || un && Dt(new un()) != sa) && (Dt = function(i) {
  var t = bs(i), e = t == Zp ? i.constructor : void 0, s = e ? Ne(e) : "";
  if (s)
    switch (s) {
      case Qp:
        return ra;
      case tm:
        return Qo;
      case em:
        return ta;
      case sm:
        return ea;
      case rm:
        return sa;
    }
  return t;
});
var im = Object.prototype, nm = im.hasOwnProperty;
function om(i) {
  var t = i.length, e = new i.constructor(t);
  return t && typeof i[0] == "string" && nm.call(i, "index") && (e.index = i.index, e.input = i.input), e;
}
var Jr = Ft.Uint8Array;
function Jn(i) {
  var t = new i.constructor(i.byteLength);
  return new Jr(t).set(new Jr(i)), t;
}
function am(i, t) {
  var e = Jn(i.buffer);
  return new i.constructor(e, i.byteOffset, i.byteLength);
}
var cm = /\w*$/;
function hm(i) {
  var t = new i.constructor(i.source, cm.exec(i));
  return t.lastIndex = i.lastIndex, t;
}
var ia = Ct ? Ct.prototype : void 0, na = ia ? ia.valueOf : void 0;
function lm(i) {
  return na ? Object(na.call(i)) : {};
}
function um(i, t) {
  var e = Jn(i.buffer);
  return new i.constructor(e, i.byteOffset, i.length);
}
var dm = "[object Boolean]", gm = "[object Date]", fm = "[object Map]", pm = "[object Number]", mm = "[object RegExp]", vm = "[object Set]", ym = "[object String]", bm = "[object Symbol]", _m = "[object ArrayBuffer]", Tm = "[object DataView]", xm = "[object Float32Array]", wm = "[object Float64Array]", Sm = "[object Int8Array]", Cm = "[object Int16Array]", Om = "[object Int32Array]", km = "[object Uint8Array]", Mm = "[object Uint8ClampedArray]", Dm = "[object Uint16Array]", jm = "[object Uint32Array]";
function Im(i, t, e) {
  var s = i.constructor;
  switch (t) {
    case _m:
      return Jn(i);
    case dm:
    case gm:
      return new s(+i);
    case Tm:
      return am(i);
    case xm:
    case wm:
    case Sm:
    case Cm:
    case Om:
    case km:
    case Mm:
    case Dm:
    case jm:
      return um(i);
    case fm:
      return new s();
    case pm:
    case ym:
      return new s(i);
    case mm:
      return hm(i);
    case vm:
      return new s();
    case bm:
      return lm(i);
  }
}
function Em(i) {
  return typeof i.constructor == "function" && !ah(i) ? Ng(Lp(i)) : {};
}
var Pm = "[object Map]";
function Am(i) {
  return we(i) && Dt(i) == Pm;
}
var oa = ds && ds.isMap, Rm = oa ? Un(oa) : Am, Fm = "[object Set]";
function Lm(i) {
  return we(i) && Dt(i) == Fm;
}
var aa = ds && ds.isSet, Bm = aa ? Un(aa) : Lm, ph = "[object Arguments]", Wm = "[object Array]", Xm = "[object Boolean]", zm = "[object Date]", Hm = "[object Error]", mh = "[object Function]", Ym = "[object GeneratorFunction]", Vm = "[object Map]", Gm = "[object Number]", vh = "[object Object]", Nm = "[object RegExp]", Um = "[object Set]", $m = "[object String]", qm = "[object Symbol]", Km = "[object WeakMap]", Jm = "[object ArrayBuffer]", Zm = "[object DataView]", Qm = "[object Float32Array]", tv = "[object Float64Array]", ev = "[object Int8Array]", sv = "[object Int16Array]", rv = "[object Int32Array]", iv = "[object Uint8Array]", nv = "[object Uint8ClampedArray]", ov = "[object Uint16Array]", av = "[object Uint32Array]", B = {};
B[ph] = B[Wm] = B[Jm] = B[Zm] = B[Xm] = B[zm] = B[Qm] = B[tv] = B[ev] = B[sv] = B[rv] = B[Vm] = B[Gm] = B[vh] = B[Nm] = B[Um] = B[$m] = B[qm] = B[iv] = B[nv] = B[ov] = B[av] = !0;
B[Hm] = B[mh] = B[Km] = !1;
function Rr(i, t, e, s, r, n) {
  var o;
  if (o !== void 0)
    return o;
  if (!$t(i))
    return i;
  var a = Ut(i);
  if (a)
    o = om(i);
  else {
    var c = Dt(i), h = c == mh || c == Ym;
    if (Kr(i))
      return Gp(i);
    if (c == vh || c == ph || h && !r)
      o = h ? {} : Em(i);
    else {
      if (!B[c])
        return r ? i : {};
      o = Im(i, c);
    }
  }
  n || (n = new ne());
  var l = n.get(i);
  if (l)
    return l;
  n.set(i, o), Bm(i) ? i.forEach(function(g) {
    o.add(Rr(g, t, e, g, i, n));
  }) : Rm(i) && i.forEach(function(g, f) {
    o.set(f, Rr(g, t, e, f, i, n));
  });
  var u = dn, d = a ? void 0 : u(i);
  return ef(d || i, function(g, f) {
    d && (f = g, g = i[f]), oh(o, f, Rr(g, t, e, f, i, n));
  }), o;
}
var cv = 1, hv = 4;
function Fe(i) {
  return Rr(i, cv | hv);
}
var lv = "__lodash_hash_undefined__";
function uv(i) {
  return this.__data__.set(i, lv), this;
}
function dv(i) {
  return this.__data__.has(i);
}
function Zr(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.__data__ = new le(); ++t < e; )
    this.add(i[t]);
}
Zr.prototype.add = Zr.prototype.push = uv;
Zr.prototype.has = dv;
function gv(i, t) {
  for (var e = -1, s = i == null ? 0 : i.length; ++e < s; )
    if (t(i[e], e, i))
      return !0;
  return !1;
}
function fv(i, t) {
  return i.has(t);
}
var pv = 1, mv = 2;
function yh(i, t, e, s, r, n) {
  var o = e & pv, a = i.length, c = t.length;
  if (a != c && !(o && c > a))
    return !1;
  var h = n.get(i), l = n.get(t);
  if (h && l)
    return h == t && l == i;
  var u = -1, d = !0, g = e & mv ? new Zr() : void 0;
  for (n.set(i, t), n.set(t, i); ++u < a; ) {
    var f = i[u], p = t[u];
    if (s)
      var m = o ? s(p, f, u, t, i, n) : s(f, p, u, i, t, n);
    if (m !== void 0) {
      if (m)
        continue;
      d = !1;
      break;
    }
    if (g) {
      if (!gv(t, function(b, T) {
        if (!fv(g, T) && (f === b || r(f, b, e, s, n)))
          return g.push(T);
      })) {
        d = !1;
        break;
      }
    } else if (!(f === p || r(f, p, e, s, n))) {
      d = !1;
      break;
    }
  }
  return n.delete(i), n.delete(t), d;
}
function vv(i) {
  var t = -1, e = Array(i.size);
  return i.forEach(function(s, r) {
    e[++t] = [r, s];
  }), e;
}
function yv(i) {
  var t = -1, e = Array(i.size);
  return i.forEach(function(s) {
    e[++t] = s;
  }), e;
}
var bv = 1, _v = 2, Tv = "[object Boolean]", xv = "[object Date]", wv = "[object Error]", Sv = "[object Map]", Cv = "[object Number]", Ov = "[object RegExp]", kv = "[object Set]", Mv = "[object String]", Dv = "[object Symbol]", jv = "[object ArrayBuffer]", Iv = "[object DataView]", ca = Ct ? Ct.prototype : void 0, Bi = ca ? ca.valueOf : void 0;
function Ev(i, t, e, s, r, n, o) {
  switch (e) {
    case Iv:
      if (i.byteLength != t.byteLength || i.byteOffset != t.byteOffset)
        return !1;
      i = i.buffer, t = t.buffer;
    case jv:
      return !(i.byteLength != t.byteLength || !n(new Jr(i), new Jr(t)));
    case Tv:
    case xv:
    case Cv:
      return Vn(+i, +t);
    case wv:
      return i.name == t.name && i.message == t.message;
    case Ov:
    case Mv:
      return i == t + "";
    case Sv:
      var a = vv;
    case kv:
      var c = s & bv;
      if (a || (a = yv), i.size != t.size && !c)
        return !1;
      var h = o.get(i);
      if (h)
        return h == t;
      s |= _v, o.set(i, t);
      var l = yh(a(i), a(t), s, r, n, o);
      return o.delete(i), l;
    case Dv:
      if (Bi)
        return Bi.call(i) == Bi.call(t);
  }
  return !1;
}
var Pv = 1, Av = Object.prototype, Rv = Av.hasOwnProperty;
function Fv(i, t, e, s, r, n) {
  var o = e & Pv, a = dn(i), c = a.length, h = dn(t), l = h.length;
  if (c != l && !o)
    return !1;
  for (var u = c; u--; ) {
    var d = a[u];
    if (!(o ? d in t : Rv.call(t, d)))
      return !1;
  }
  var g = n.get(i), f = n.get(t);
  if (g && f)
    return g == t && f == i;
  var p = !0;
  n.set(i, t), n.set(t, i);
  for (var m = o; ++u < c; ) {
    d = a[u];
    var b = i[d], T = t[d];
    if (s)
      var w = o ? s(T, b, d, t, i, n) : s(b, T, d, i, t, n);
    if (!(w === void 0 ? b === T || r(b, T, e, s, n) : w)) {
      p = !1;
      break;
    }
    m || (m = d == "constructor");
  }
  if (p && !m) {
    var S = i.constructor, C = t.constructor;
    S != C && "constructor" in i && "constructor" in t && !(typeof S == "function" && S instanceof S && typeof C == "function" && C instanceof C) && (p = !1);
  }
  return n.delete(i), n.delete(t), p;
}
var Lv = 1, ha = "[object Arguments]", la = "[object Array]", Dr = "[object Object]", Bv = Object.prototype, ua = Bv.hasOwnProperty;
function Wv(i, t, e, s, r, n) {
  var o = Ut(i), a = Ut(t), c = o ? la : Dt(i), h = a ? la : Dt(t);
  c = c == ha ? Dr : c, h = h == ha ? Dr : h;
  var l = c == Dr, u = h == Dr, d = c == h;
  if (d && Kr(i)) {
    if (!Kr(t))
      return !1;
    o = !0, l = !1;
  }
  if (d && !l)
    return n || (n = new ne()), o || uh(i) ? yh(i, t, e, s, r, n) : Ev(i, t, c, e, s, r, n);
  if (!(e & Lv)) {
    var g = l && ua.call(i, "__wrapped__"), f = u && ua.call(t, "__wrapped__");
    if (g || f) {
      var p = g ? i.value() : i, m = f ? t.value() : t;
      return n || (n = new ne()), r(p, m, e, s, n);
    }
  }
  return d ? (n || (n = new ne()), Fv(i, t, e, s, r, n)) : !1;
}
function bh(i, t, e, s, r) {
  return i === t ? !0 : i == null || t == null || !we(i) && !we(t) ? i !== i && t !== t : Wv(i, t, e, s, bh, r);
}
function Xv(i, t) {
  return i != null && t in Object(i);
}
function zv(i, t, e) {
  t = yi(t, i);
  for (var s = -1, r = t.length, n = !1; ++s < r; ) {
    var o = qn(t[s]);
    if (!(n = i != null && e(i, o)))
      break;
    i = i[o];
  }
  return n || ++s != r ? n : (r = i == null ? 0 : i.length, !!r && Gn(r) && Yn(o, r) && (Ut(i) || Nn(i)));
}
function Hv(i, t) {
  return i != null && zv(i, t, Xv);
}
var Wi = function() {
  return Ft.Date.now();
}, Yv = "Expected a function", Vv = Math.max, Gv = Math.min;
function Nv(i, t, e) {
  var s, r, n, o, a, c, h = 0, l = !1, u = !1, d = !0;
  if (typeof i != "function")
    throw new TypeError(Yv);
  t = zo(t) || 0, $t(e) && (l = !!e.leading, u = "maxWait" in e, n = u ? Vv(zo(e.maxWait) || 0, t) : n, d = "trailing" in e ? !!e.trailing : d);
  function g(k) {
    var D = s, M = r;
    return s = r = void 0, h = k, o = i.apply(M, D), o;
  }
  function f(k) {
    return h = k, a = setTimeout(b, t), l ? g(k) : o;
  }
  function p(k) {
    var D = k - c, M = k - h, P = t - D;
    return u ? Gv(P, n - M) : P;
  }
  function m(k) {
    var D = k - c, M = k - h;
    return c === void 0 || D >= t || D < 0 || u && M >= n;
  }
  function b() {
    var k = Wi();
    if (m(k))
      return T(k);
    a = setTimeout(b, p(k));
  }
  function T(k) {
    return a = void 0, d && s ? g(k) : (s = r = void 0, o);
  }
  function w() {
    a !== void 0 && clearTimeout(a), h = 0, s = c = r = a = void 0;
  }
  function S() {
    return a === void 0 ? o : T(Wi());
  }
  function C() {
    var k = Wi(), D = m(k);
    if (s = arguments, r = this, c = k, D) {
      if (a === void 0)
        return f(c);
      if (u)
        return clearTimeout(a), a = setTimeout(b, t), g(c);
    }
    return a === void 0 && (a = setTimeout(b, t)), o;
  }
  return C.cancel = w, C.flush = S, C;
}
function Uv(i, t) {
  return bh(i, t);
}
function $v(i, t, e, s) {
  if (!$t(i))
    return i;
  t = yi(t, i);
  for (var r = -1, n = t.length, o = n - 1, a = i; a != null && ++r < n; ) {
    var c = qn(t[r]), h = e;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return i;
    if (r != o) {
      var l = a[c];
      h = void 0, h === void 0 && (h = $t(l) ? l : Yn(t[r + 1]) ? [] : {});
    }
    oh(a, c, h), a = a[c];
  }
  return i;
}
function qv(i, t, e) {
  for (var s = -1, r = t.length, n = {}; ++s < r; ) {
    var o = t[s], a = Pp(i, o);
    e(a, o) && $v(n, yi(o, i), a);
  }
  return n;
}
function Kv(i, t) {
  return qv(i, t, function(e, s) {
    return Hv(i, s);
  });
}
var Jv = Fp(function(i, t) {
  return i == null ? {} : Kv(i, t);
}), Zv = "Expected a function";
function Qv(i, t, e) {
  var s = !0, r = !0;
  if (typeof i != "function")
    throw new TypeError(Zv);
  return $t(e) && (s = "leading" in e ? !!e.leading : s, r = "trailing" in e ? !!e.trailing : r), Nv(i, t, {
    leading: s,
    maxWait: t,
    trailing: r
  });
}
class t0 {
  addTrackItem(t) {
    const e = hg(t, {
      tScale: this.tScale,
      sizesMap: this.sizesMap
    });
    this.add(e);
  }
  alignItemsToTrack() {
    this.pauseEventListeners();
    const t = new Map(
      this.getObjects("Track").map((r) => [r.id, r])
    ), e = this.getTrackItems(), s = this.getObjects("Transition");
    this.trackItemIds.forEach((r) => {
      const n = this.tracks.find(
        (c) => c.items.includes(r)
      );
      if (!n) return;
      const o = t.get(n.id), a = this.getTrackItems().find((c) => c.id === r);
      a && o && (a.isMain = o.magnetic, this.trackItemsMap[r].isMain = o.magnetic, a.set({ top: o.top }), a.setCoords());
    }), t.forEach((r) => {
      r.items = e.filter((n) => n.top === r.top).map((n) => n.id);
    }), s.forEach((r) => {
      const n = r.fromId, o = e.find((a) => a.id === n);
      o && (r.set({ top: o.top }), r.setCoords());
    }), this.resumeEventListeners();
  }
  updateTrackItemsToHistory() {
    this.pauseEventListeners(), this.trackItemIds.forEach((t) => {
      const e = this.tracks.find((c) => c.items.includes(t)), s = this.getObjects().find((c) => c.id === (e == null ? void 0 : e.id)).top, r = this.trackItemsMap[t], n = this.getObjects().find((c) => c.id === t), o = nt(r.display.from, this.tScale), a = nt(
        r.display.to - r.display.from,
        this.tScale,
        r.playbackRate
      );
      if (n.set({ left: o, width: a, top: s }), n instanceof se) {
        const c = n.display.to - n.display.from;
        n.setDuration ? n.setDuration(c) : n.set({ duration: c }), r.trim = n.trim, r.display = n.display;
      }
      n.setCoords();
    }), this.requestRenderAll(), this.resumeEventListeners();
  }
  deleteTrackItemToHistory(t) {
    this.getObjects().filter((e) => t.includes(e.id)).map((e) => this.remove(e)), this.alignItemsToTrack(), this.requestRenderAll();
  }
  uodateTrackItemIdsOrdering() {
    const t = this.getTrackItems();
    t.sort((e, s) => e.top - s.top), this.trackItemIds = t.map((e) => e.id).reverse();
  }
  selectTrackItemByIds(t) {
    const e = this.getActiveObjects().map((n) => n.id);
    if (Uv(e, t)) return;
    const r = this.getObjects(...me.objectTypes, "Transition").filter((n) => t.includes(n.id));
    if (!r.length)
      this.discardActiveObject();
    else if (r.length === 1)
      this.setActiveObject(r[0]);
    else {
      const n = new wt(r);
      this.setActiveObject(n);
    }
    this.requestRenderAll();
  }
  synchronizeTrackItemsState() {
    this.pauseEventListeners();
    const t = this.getTrackItems(), e = {};
    t.forEach((s) => {
      const { id: r, left: n, width: o } = s, a = this.trackItemsMap[r], c = L(n, this.tScale), h = L(o, this.tScale), l = {
        from: c,
        to: c + h
      }, u = {
        display: l
      };
      s instanceof se && (u.trim = s.trim), s.display = l, e[r] = {
        ...a,
        ...u
      };
    }), this.trackItemsMap = {
      ...this.trackItemsMap,
      ...e
    }, this.resumeEventListeners();
  }
  deleteTrackItemById(t) {
    const e = t, s = this.getObjects().filter(
      (a) => t.includes(a.id)
    ), r = Ys(this.tracks, e), n = {};
    Object.keys(this.trackItemsMap).forEach((a) => {
      e.includes(a) || (n[a] = this.trackItemsMap[a]);
    });
    const o = this.trackItemIds.filter(
      (a) => !e.includes(a)
    );
    this.tracks = r, this.trackItemsMap = n, this.trackItemIds = o, this.discardActiveObject(), this.remove(...s), this.renderTracks(), this.alignItemsToTrack();
  }
  deleteActiveTrackItem() {
    const t = this.getActiveObjects();
    if (!t.length) return !1;
    const e = t.map((o) => o.id), s = Ys(this.tracks, e), r = {};
    Object.keys(this.trackItemsMap).forEach((o) => {
      e.includes(o) || (r[o] = this.trackItemsMap[o]);
    });
    const n = this.trackItemIds.filter(
      (o) => !e.includes(o)
    );
    this.tracks = s, this.trackItemsMap = r, this.trackItemIds = n, this.discardActiveObject(), this.remove(...t), this.setActiveIds([]), this.renderTracks(), this.alignItemsToTrack(), this.updateState({ updateHistory: !0, kind: "remove" });
  }
  /*
   * This method updates the coordinates of all track items in the timeline.
   */
  updateTrackItemCoords(t) {
    const e = t ? this.getActiveObjects().map((s) => s.id) : [];
    !t && this.pauseEventListeners(), this.trackItemIds.forEach((s) => {
      if (e.includes(s)) return;
      const r = this.getObjects().find((c) => c.id === s), n = this.trackItemsMap[s], o = nt(n.display.from, this.tScale), a = nt(
        n.display.to - n.display.from,
        this.tScale
      );
      r.set({
        left: o,
        width: a
      }), r.setCoords();
    }), !t && this.resumeEventListeners();
  }
  getTrackItems() {
    return this.getObjects(...me.objectTypes);
  }
  setTrackItemCoords() {
    this.getTrackItems().forEach((t) => {
      t.setCoords();
    });
  }
  setActiveTrackItemCoords() {
    this.getActiveObjects().forEach((e) => e.setCoords());
  }
}
const da = (i) => {
  switch (i) {
    case "top":
      return 1e3;
    case "bottom":
      return 1e3;
    case "center":
      return 8;
    default:
      return 1e3;
  }
};
class e0 {
  findOrCreateTrack(t, { trackId: e, trackIndex: s }) {
    if (e) {
      const o = this.tracks.find((a) => a.id === e);
      if (o)
        return o.items.push(t.id), e;
    }
    const r = this.getItemAccepts(t.type), n = {
      id: sr(),
      items: [t.id],
      type: t.type,
      accepts: r,
      magnetic: !1,
      static: !1,
      muted: !1
    };
    return s !== void 0 ? this.tracks.splice(s, 0, n) : this.tracks.push(n), this.renderTracks(), n.id;
  }
  removeTracks() {
    this.getObjects("Track", "Helper").forEach((e) => this.remove(e));
  }
  renderTracks() {
    this.filterEmptyTracks(), this.removeTracks();
    const t = this.width, e = this.tracks.flatMap(
      (a) => [
        a,
        {
          id: `helper-${a.id}`,
          type: "helper",
          items: [],
          accepts: []
        }
      ]
    ).slice(0, -1);
    let s = -970;
    const r = O.getClass("Helper") || Te, n = new r({
      top: s,
      selectable: !1,
      evented: !1,
      tScale: this.tScale,
      id: "helper-line-top",
      width: t,
      kind: "top",
      height: 1e3,
      metadata: {}
    });
    s += da("top"), this.insertAt(0, n), e.forEach((a, c) => {
      if (a.type === "helper") {
        const h = da("center"), l = new r({
          id: a.id,
          top: s,
          tScale: this.tScale,
          width: t,
          height: h,
          metadata: {
            order: (c + 1) / 2
          },
          kind: "center"
        });
        s += h, this.insertAt(0, l);
      } else {
        const h = this.getItemSize(a.type), l = O.getClass("Track") || Vt, u = this.getItemAccepts(a.type), d = new l({
          id: a.id,
          top: s,
          left: 0,
          height: h,
          width: t,
          tScale: this.tScale,
          accepts: u,
          items: a.items,
          magnetic: a.magnetic,
          static: a.static
        });
        s += h, this.insertAt(0, d);
      }
    });
    const o = new r({
      id: "helper-line-bottom",
      top: s,
      selectable: !1,
      evented: !1,
      tScale: this.tScale,
      width: t,
      kind: "bottom",
      height: 1e3,
      metadata: {}
    });
    this.insertAt(0, o);
  }
  filterEmptyTracks() {
    const t = /* @__PURE__ */ new Set();
    this.tracks = this.tracks.filter((e) => (e.items.length || e.static) && !t.has(e.id) ? (t.add(e.id), !0) : !1);
  }
  refreshTrackLayout() {
    const t = this.bounding.width + this.spacing.right;
    this.getObjects("Track", "Helper").forEach((e) => {
      e.updateCoords(t), e.setCoords();
    });
  }
  adjustMagneticTrack() {
    this.pauseEventListeners();
    const t = this.tracks.filter((e) => e.magnetic);
    t.length > 0 && t.forEach((e) => {
      const s = e.accepts || [], r = this.getObjects(...s).filter((o) => e.items.includes(o.id)).sort((o, a) => o.left - a.left);
      let n = 0;
      r.forEach((o) => {
        o.left = n, n += o.width;
      });
    }), this.resumeEventListeners();
  }
}
function _h(i) {
  const t = this, e = i.target, s = i.transform;
  if (s.action === "resizing") {
    const r = t.getObjects().filter((l) => l !== e && !["Track", "Helper", "Transition", "Placeholder"].includes(l.type)), n = 10, o = e.left, a = e.width * e.scaleX, c = o + a;
    let h = !1;
    r.forEach((l) => {
      if (h) return;
      const u = l.getBoundingRect(), d = u.left, g = u.left + u.width;
      if (s.corner === "mr") {
        const f = Math.abs(c - g), p = Math.abs(c - d), m = L(1, e.tScale);
        if (f < n)
          if (e instanceof se) {
            const b = g - e.left, T = b - a, w = L(
              T,
              e.tScale,
              e.playbackRate
            ), S = e.trim.to + w;
            if (b < m) return;
            S <= e.duration && (e.set({
              width: b,
              scaleX: 1
            }), e.trim.to = S, e.onResizeSnap && e.onResizeSnap(), h = !0);
          } else
            e.set({
              width: g - e.left,
              scaleX: 1
            }), e.onResizeSnap && e.onResizeSnap(), h = !0;
        else if (p < n)
          if (e instanceof se) {
            const b = d - e.left, T = b - a, w = L(
              T,
              e.tScale,
              e.playbackRate
            ), S = e.trim.to + w;
            if (b < m) return;
            S <= e.duration && (e.set({
              width: b,
              scaleX: 1
            }), e.trim.to = S, e.onResizeSnap && e.onResizeSnap(), h = !0);
          } else
            e.set({
              width: d - e.left,
              scaleX: 1
            }), e.onResizeSnap && e.onResizeSnap(), h = !0;
      } else if (s.corner === "ml") {
        const f = Math.abs(o - d), p = Math.abs(o - g);
        if (f < n)
          if (e instanceof se) {
            const m = c - d, b = m - a, T = L(
              b,
              e.tScale,
              e.playbackRate
            ), w = e.trim.from - T;
            w >= 0 && (e.set({
              left: d,
              width: m,
              scaleX: 1
            }), e.trim.from = w, e.onResizeSnap && e.onResizeSnap(), h = !0);
          } else
            e.set({
              left: d,
              width: c - d,
              scaleX: 1
            }), e.onResizeSnap && e.onResizeSnap(), h = !0;
        else if (p < n)
          if (e instanceof se) {
            const m = c - g, b = m - a, T = L(
              b,
              e.tScale,
              e.playbackRate
            ), w = e.trim.from - T;
            w >= 0 && (e.set({
              left: g,
              width: m,
              scaleX: 1
            }), e.trim.from = w, e.onResizeSnap && e.onResizeSnap(), h = !0);
          } else
            e.set({
              left: g,
              width: c - g,
              scaleX: 1
            }), e.onResizeSnap && e.onResizeSnap(), h = !0;
      }
    }), h && (e.setCoords(), t.requestRenderAll());
  }
}
function s0(i) {
  i.on("object:resizing", _h.bind(i));
}
function r0(i) {
  i.off("object:resizing", _h.bind(i));
}
const As = 100, Xi = 0, jr = 5, ga = 3, i0 = 25, cs = {
  scrollInterval: null
};
function fa(i) {
  const t = i0 - ga, e = (As - i) / As;
  return ga + t * e;
}
function n0(i, t) {
  cs.scrollInterval && clearInterval(cs.scrollInterval);
  const e = t.target, s = e.getBoundingRect();
  cs.scrollInterval = setInterval(() => {
    const r = i.viewportTransform, n = i.getViewportPoint(t.e);
    if (n.x > i.width - As && e.left + s.width < i.bounding.width) {
      const o = fa(i.width - n.x);
      e.set("left", e.left + o), i.setViewportPos(r[4] - o, r[5]);
    }
    if (n.x < As && e.left > 0 && r[4] < As && r[4] < i.spacing.left) {
      const o = fa(n.x);
      e.set("left", e.left - o), i.setViewportPos(r[4] + o, r[5]);
    }
    n.y > i.height - Xi && e.top + s.height < i.bounding.height + 80 && (e.set("top", e.top + jr), i.setViewportPos(r[4], r[5] - jr)), n.y < Xi && e.top > -80 && -r[5] > Xi && (e.set("top", e.top - jr), i.setViewportPos(r[4], r[5] + jr)), e.setCoords(), i.requestRenderAll();
  }, 16);
}
function o0() {
  cs.scrollInterval && (clearInterval(cs.scrollInterval), cs.scrollInterval = null);
}
function Th() {
  o0();
}
function xh(i) {
  n0(this, i);
}
function a0(i) {
  i.on("mouse:up", Th), i.on("object:moving", xh.bind(i));
}
function c0(i) {
  i.off("mouse:up", Th), i.off("object:moving", xh.bind(i));
}
function wh(i) {
  const t = i.target, e = i.target.canvas;
  if (i.action === "resizing" && t instanceof Nt && e) {
    const s = t.id, r = e.getObjects("Transition").find((n) => n.id === s);
    if (r && r instanceof Nt) {
      const n = Fe(this.transitionsMap), o = {
        ...n,
        [s]: {
          ...n[s],
          width: r.width,
          duration: r.duration
        }
      };
      this.transitionsMap = o, this.updateState();
    }
  }
}
function h0(i) {
  i.on("object:modified", wh);
}
function l0(i) {
  i.off("object:modified", wh);
}
const Sh = {
  canvas: null,
  enableGuideRedraw: !0,
  isPointerOverHelperTrack: !1,
  draggingOverTrack: null,
  placeholderMovingObjects: [],
  primaryMovingObjects: [],
  secondaryMovingObjects: [],
  objectInitialPositions: {},
  originTrack: {},
  trackToItemsMap: {},
  activeTrackToItemsMap: {},
  trackTopToIdMap: {},
  trackTops: [],
  activeObjects: [],
  primaryTracks: {},
  secondaryTracks: {},
  isDragOver: !1,
  initialTrackPoints: [],
  updateItemsInTrack: null,
  orderNormalTrack: !1
}, J = () => Sh, it = (i) => {
  Object.assign(Sh, i);
}, pa = 10, bi = (i, t) => {
  t.forEach((e) => e.isAlignmentAuxiliary && i.remove(e));
}, Ch = (i, t) => {
  const e = [], s = [];
  return t.getObjects().filter((r) => r.visible).forEach((r) => {
    if (i.find((o) => o.id === r.id) || r.isAlignmentAuxiliary)
      return;
    const n = r.getBoundingRect();
    e.push(
      va(n.left, n.width, n.top, n.height)
    ), s.push(
      va(n.top, n.height, n.left, n.width)
    );
  }), {
    vertical: e.flat(),
    horizontal: []
  };
}, Oh = (i, t) => {
  const e = [], s = [];
  i.vertical.forEach((a) => {
    t.vertical.forEach((c) => {
      const h = Math.abs(a.val - c.guide);
      h < pa && e.push({
        lineGuide: a.val,
        diff: h,
        orientation: "V",
        snap: c.snap,
        offset: c.offset,
        targetDim: { start: a.start, end: a.end }
      });
    });
  }), i.horizontal.forEach((a) => {
    t.horizontal.forEach((c) => {
      const h = Math.abs(a.val - c.guide);
      h < pa && s.push({
        lineGuide: a.val,
        diff: h,
        orientation: "H",
        snap: c.snap,
        offset: c.offset,
        targetDim: { start: a.start, end: a.end }
      });
    });
  });
  const r = [], n = e.sort((a, c) => a.diff - c.diff)[0], o = s.sort((a, c) => a.diff - c.diff)[0];
  return n && r.push({
    lineGuide: n.lineGuide,
    offset: n.offset,
    orientation: "V",
    snap: n.snap,
    targetDim: n.targetDim
  }), o && r.push({
    lineGuide: o.lineGuide,
    offset: o.offset,
    orientation: "H",
    snap: o.snap,
    targetDim: o.targetDim
  }), r;
}, kh = (i, t, e) => {
  i.forEach((s) => {
    const r = u0(e.getZoom());
    s.orientation === "H" ? e.add(
      ma(
        [
          0,
          s.lineGuide - r.strokeWidth / 2,
          2e3,
          s.lineGuide - r.strokeWidth / 2
        ],
        { ...r, stroke: e.guideLineColor }
      )
    ) : s.orientation === "V" && e.add(
      ma(
        [
          s.lineGuide - r.strokeWidth / 2,
          0,
          s.lineGuide - r.strokeWidth / 2,
          2e3
        ],
        { ...r, stroke: e.guideLineColor }
      )
    );
  });
}, u0 = (i) => ({
  strokeWidth: 2 / i
}), ma = (i, t) => new pe(i, {
  ...t,
  strokeLineCap: "square",
  excludeFromExport: !0,
  isAlignmentAuxiliary: !0,
  selectable: !1,
  objectCaching: !1
}), Mh = (i) => {
  const t = i.getBoundingRect();
  return {
    vertical: [
      {
        guide: Math.round(t.left),
        offset: Math.round(i.left - t.left),
        snap: "start"
      },
      {
        guide: Math.round(t.left + t.width),
        offset: Math.round(i.left - t.left - t.width),
        snap: "end"
      }
    ],
    horizontal: [
      {
        guide: Math.round(t.top),
        offset: Math.round(i.top - t.top),
        snap: "start"
      },
      {
        guide: Math.round(t.top + t.height),
        offset: Math.round(i.top - t.top - t.height),
        snap: "end"
      }
    ]
  };
}, va = (i, t, e, s) => [i, i + t].map((n) => ({
  val: n,
  start: e,
  end: e + s
})), Dh = (i, t) => {
  i.remove(...t), t = [];
}, jh = (i) => {
  i.forEach((t) => t.setSelected(!1));
}, ya = (i) => i instanceof Te, d0 = (i) => Object.assign({}, {
  left: 16,
  right: 80
}, i), g0 = ["touchstart", "touchmove", "touchend"], f0 = (i) => g0.includes(i.type) || i.pointerType === "touch";
function Ih(i) {
  const t = this;
  if (!t) return;
  const s = J().enableGuideRedraw, r = t.getScenePoint(i.e), n = t.getObjects("Helper", "Track"), o = n.find((f) => {
    const p = f.getBoundingRect();
    return r.x >= p.left && r.x <= p.left + p.width && r.y >= p.top && r.y <= p.top + p.height;
  });
  it({ draggingOverTrack: o }), n.forEach((f) => {
    ya(f) && (f === o ? f.setSelected(!0) : f.setSelected(!1));
  }), ya(o) ? it({ isPointerOverHelperTrack: !0 }) : it({ isPointerOverHelperTrack: !1 });
  const a = t.getObjects(), c = i.target, h = c.getBoundingRect();
  c.setCoords();
  const l = [
    c,
    ...t.getActiveObjects(),
    ...t.getObjects("Track", "Helper", "Transition", "Placeholder")
  ], u = Ch(l, t), d = Mh(c), g = Oh(u, d);
  s && (bi(t, a), g.length && kh(g, h, t), it({ enableGuideRedraw: !1 }), setTimeout(() => it({ enableGuideRedraw: !0 }), 50)), g.forEach((f) => {
    f.orientation === "V" ? c.left = f.lineGuide + f.offset : c.top = f.lineGuide + f.offset;
  });
}
function Eh(i) {
  const t = i.target.canvas;
  t && (bi(t, t.getObjects()), jh(t.getObjects("Helper")), it({ draggingOverTrack: null, isPointerOverHelperTrack: !1 }));
}
function Ph(i) {
  var a;
  const t = this, e = t.getObjects(), s = i.target, r = i.transform, n = (a = t._currentTransform) == null ? void 0 : a.corner, o = s.getBoundingRect();
  if (r.action === "resizing") {
    const c = [
      s,
      ...t.getActiveObjects(),
      ...t.getObjects("Track", "Helper", "Transition", "Placeholder")
    ], h = Ch(c, t), l = h.vertical.filter(
      (g) => {
        const f = g.val;
        if (n === "ml")
          return f <= o.left;
        if (n === "mr")
          return f >= o.left + o.width;
      }
    );
    h.vertical = l;
    const u = Mh(s), d = Oh(h, u);
    bi(t, e), d.length && kh(d, o, t);
  }
}
function p0(i) {
  i.on("object:moving", Ih.bind(i)), i.on("object:modified", Eh.bind(i)), i.on("object:resizing", Ph.bind(i));
}
function m0(i) {
  i.off("object:moving", Ih.bind(i)), i.off("object:modified", Eh.bind(i)), i.off("object:resizing", Ph.bind(i));
}
function mn(i, t, e) {
  const s = i.indexOf(t), r = i.indexOf(e);
  return s === -1 || r === -1 ? null : r - s;
}
function Ah(i, t) {
  const e = t.sort((r, n) => r.tempIndex - n.tempIndex), s = [];
  for (const r of e)
    r.tempIndex < 0 && s.push(r);
  s.push(i);
  for (const r of e)
    r.tempIndex >= 0 && s.push(r);
  return s;
}
function Rh(i) {
  const t = J(), e = t.canvas;
  it({
    activeTrackToItemsMap: {},
    primaryTracks: {},
    secondaryTracks: {},
    trackTops: [],
    trackToItemsMap: {},
    activeObjects: [],
    trackTopToIdMap: {},
    isDragOver: !1,
    initialTrackPoints: [],
    updateItemsInTrack: null
  }), e.trackIdAfterTransform = "", e.positionAfterTransform = {};
  const s = e.getActiveObject(), r = s instanceof wt ? s.getObjects() : [s];
  it({ activeObjects: r });
  const n = e.getScenePoint(i.e), o = e.getObjects("Track"), a = e.getActiveObjects().map((u) => u.id);
  let h = o.filter((u) => {
    const d = u.items;
    return a.some((g) => d.includes(g));
  }).find((u) => {
    const d = u.getBoundingRect();
    return n.x >= d.left && n.x <= d.left + d.width && n.y >= d.top && n.y <= d.top + d.height;
  });
  it({ originTrack: h });
  const l = e.getObjects(...this.itemTypes);
  o.forEach((u) => {
    const d = l.filter((g) => u.items.includes(g.id));
    t.trackToItemsMap[u.id] = d, t.trackTopToIdMap[u.top] = u.id, t.trackTops.push(u.top);
  }), t.trackTops.sort((u, d) => u - d), r.forEach((u) => {
    const d = o.find((f) => f.items.includes(u.id));
    if (!d) return;
    const g = d.id;
    t.activeTrackToItemsMap[g] ? t.activeTrackToItemsMap[g].push(u) : t.activeTrackToItemsMap[g] = [u];
  }), t.primaryMovingObjects = r.filter((u) => {
    const d = u.getBoundingRect();
    return n.y >= d.top && n.y <= d.top + d.height && !(u instanceof Nt);
  }), t.primaryMovingObjects.length !== 0 && (t.primaryMovingObjects.forEach((u) => {
    const d = u.getBoundingRect().top, g = t.trackTopToIdMap[d];
    if (t.primaryTracks[g])
      t.primaryTracks[g].objects.push(u);
    else {
      const f = mn(
        t.trackTops,
        h == null ? void 0 : h.top,
        d
      );
      t.primaryTracks[g] = {
        objects: [u],
        index: f
      };
    }
  }), t.primaryMovingObjects = t.primaryMovingObjects.sort(
    (u, d) => u.left - d.left
  ), t.secondaryMovingObjects = r.filter(
    (u) => !t.primaryMovingObjects.includes(u)
  ), t.secondaryMovingObjects.forEach((u) => {
    const d = u.getBoundingRect().top, g = t.trackTopToIdMap[u.getBoundingRect().top];
    if (t.secondaryTracks[g])
      t.secondaryTracks[g].objects.push(u);
    else {
      const f = mn(
        t.trackTops,
        h.top,
        d
      );
      t.secondaryTracks[g] = {
        objects: [u],
        index: f
      };
    }
  }), h && (e.trackOriginBeforeTransform = h.id), s && (e.positionBeforeTransform = {
    top: s.top,
    left: s.left
  }), i.transform.action === "drag" && (t.placeholderMovingObjects = t.primaryMovingObjects.map((u) => {
    const d = u.getBoundingRect();
    t.objectInitialPositions[u.id] = {
      top: d.top,
      left: d.left
    };
    const g = new Hs({
      id: `${u.id}-placeholder`,
      left: d.left,
      top: d.top,
      width: d.width,
      height: d.height
    });
    return g.draggedObject = u, g;
  }), e.add(...t.placeholderMovingObjects)));
}
function v0(i) {
  i.on("before:transform", Rh.bind(i));
}
function y0(i) {
  i.off("before:transform", Rh.bind(i));
}
const ns = class ns extends tt {
  constructor(e) {
    super(e);
    x(this, "duration");
    x(this, "fromId");
    x(this, "toId");
    x(this, "itemType", "none");
    x(this, "isSelected", !1);
    Object.assign(this, ns.ownDefaults), this.id = e.id;
  }
  static createControls() {
    return { controls: eh() };
  }
  static getDefaults() {
    return {
      ...super.getDefaults(),
      ...ns.ownDefaults
    };
  }
  updateCoords() {
    const e = this.canvas;
    if (!e) return;
    const s = e.getObjects().find((o) => o.id === this.fromId);
    if (!s) return;
    const r = nt(this.duration, this.tScale), n = s.left + s.width - r / 2;
    this.set({
      width: r,
      left: n
    });
  }
  // add custom text to the track item
  _render(e) {
    super._render(e), this.drawTextIdentity(e), this.updateSelected(e);
  }
  drawTextIdentity(e) {
    const s = new Path2D(
      "M3 5.30359C3 3.93159 4.659 3.24359 5.629 4.21359L11.997 10.5826L10.583 11.9966L5 6.41359V17.5856L10.586 11.9996L10.583 11.9966L11.997 10.5826L12 10.5856L18.371 4.21459C19.341 3.24459 21 3.93159 21 5.30359V18.6956C21 20.0676 19.341 20.7556 18.371 19.7856L12 13.5L13.414 11.9996L19 17.5866V6.41359L13.414 11.9996L13.421 12.0056L12.006 13.4206L12 13.4136L5.629 19.7846C4.659 20.7546 3 20.0676 3 18.6956V5.30359Z"
    );
    e.save(), e.translate(-12, -12), e.fillStyle = "#ffffff", e.fill(s), e.restore();
  }
  setSelected(e) {
    this.isSelected = e, this.set({ dirty: !0 });
  }
  updateSelected(e) {
    this.isSelected && (e.save(), e.beginPath(), e.roundRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.rx
    ), e.lineWidth = Zs, e.strokeStyle = Ge, e.stroke(), e.restore());
  }
};
x(ns, "type", "TransitionGuide"), x(ns, "ownDefaults", {
  objectCaching: !1,
  borderColor: "transparent",
  stroke: "transparent",
  strokeWidth: 1.5,
  fill: "rgba(0,0,0, 0.85)",
  borderOpacityWhenMoving: 1,
  hoverCursor: "default",
  lockMovementX: !0,
  lockMovementY: !0,
  duration: 1500,
  rx: 8,
  ry: 8
});
let Ns = ns;
const b0 = (i) => {
  const { trackItemIds: t, transitionsMap: e, trackItemsMap: s } = i, r = /* @__PURE__ */ new Map();
  Object.values(e).forEach((h) => {
    var g, f;
    const { fromId: l, toId: u, kind: d } = h;
    d !== "none" && (r.has(l) || r.set(l, []), r.has(u) || r.set(u, []), (g = r.get(l)) == null || g.push(h), (f = r.get(u)) == null || f.push(h));
  });
  const n = [], o = /* @__PURE__ */ new Set(), a = (h) => {
    const l = [];
    let u = h;
    for (; u && !o.has(u); ) {
      o.add(u);
      const d = s[u];
      l.push(d);
      const g = Object.values(e).find(
        (f) => f.fromId === u && f.kind !== "none"
        // Filter here
      );
      if (!g) break;
      l.push(g), u = g.toId;
    }
    return l;
  }, c = Object.values(e).filter(
    (h) => h.kind !== "none"
  );
  for (const h of t)
    if (!o.has(h) && (!r.has(h) || !c.some((l) => l.toId === h))) {
      const l = a(h);
      l.length > 0 && n.push(l);
    }
  return n.forEach((h) => {
    h.sort((l, u) => "display" in l && "display" in u ? l.display.from - u.display.from : 0);
  }), n;
}, _0 = [
  "text",
  "image",
  "video",
  "audio",
  "caption",
  "template"
];
function Fh() {
  const i = J();
  Dh(this, i.placeholderMovingObjects);
}
function T0(i) {
  const t = i.target.left;
  i.target.left = Math.max(t, 0);
}
function Lh(i, t) {
  return i.find((s) => {
    const r = s.getBoundingRect();
    return t.left < r.left + r.width && t.left + t.width - 1 > r.left && t.top < r.top + r.height && t.top + t.height > r.top;
  });
}
function x0(i, t) {
  const s = i.canvas.getActiveObject(), r = s.left + s.width / 2, n = t.left + t.width / 2;
  return r < n ? t.left - s.width : (r > n, t.left + t.width);
}
const w0 = (i, t, e) => !(e < 0 || Lh(i, {
  ...t.getBoundingRect(),
  left: e
})), Bh = (i) => {
  const e = J().draggingOverTrack, s = e == null ? void 0 : e.accepts.map(
    (n) => n.toLowerCase()
  ), r = i.type.toLowerCase();
  return i instanceof xe, e && (s == null ? void 0 : s.includes(r));
};
function S0(i) {
  J().isPointerOverHelperTrack ? i.opacity = 0 : i.opacity = 1;
}
function C0() {
  const i = J(), t = i.primaryMovingObjects[0];
  return {
    top: i.objectInitialPositions[t.id].top,
    left: i.objectInitialPositions[t.id].left
  };
}
function O0(i) {
  const t = i.getBoundingRect(), e = J(), s = e.draggingOverTrack;
  if (e.primaryMovingObjects.map((n) => n.id).includes(i.id)) {
    const o = e.primaryMovingObjects[0].getBoundingRect();
    return {
      top: s.top,
      left: o.left
    };
  }
  return {
    top: s.top,
    left: t.left
  };
}
function k0(i, t, e, s) {
  const n = i.canvas.getActiveObjects().map((l) => l.id), o = x0(i, t), a = e.filter(
    (l) => !n.includes(l.id)
  ), c = w0(
    a,
    i,
    o
  ), h = J();
  if (h.orderNormalTrack = !0, !c || s.x - 20 < 0) {
    const l = h.draggingOverTrack;
    return {
      left: h.initialTrackPoints.reduce(
        (d, g) => Math.abs(g - s.x) < Math.abs(d - s.x) ? g : d
      ),
      top: l.top
    };
  }
  return {
    left: o,
    top: t.top
  };
}
const M0 = (i, t) => {
  i.forEach((e, s) => {
    e.set({ left: t[s] });
  });
}, Wh = Qv(
  (i) => {
    const t = i.target.canvas;
    T0(i);
    const e = J(), s = e.draggingOverTrack;
    if (s) {
      const a = e.primaryMovingObjects[0];
      _0.includes(a.type) && e.placeholderMovingObjects.forEach((c) => {
        c.visible = !0;
      });
    } else {
      e.placeholderMovingObjects.forEach((a) => {
        a.visible = !1;
      });
      return;
    }
    const r = e.placeholderMovingObjects.map(
      (a) => a.draggedObject
    ), n = (e.trackToItemsMap[s.id] || []).filter((a) => !r.includes(a)), o = Bh(e.primaryMovingObjects[0]);
    if (s.magnetic && o) {
      e.updateItemsInTrack ? e.updateItemsInTrack !== s.id && (e.updateItemsInTrack = s.id, e.initialTrackPoints = []) : (e.updateItemsInTrack = s.id, e.initialTrackPoints = []), e.initialTrackPoints.length === 0 && (e.updateItemsInTrack = s.id, e.initialTrackPoints = ba(
        e,
        s
      ));
      let a = 0;
      for (const [c, h] of e.initialTrackPoints.entries()) {
        const l = h, u = e.initialTrackPoints[c + 1], d = e.initialTrackPoints[c - 1], g = u - l, f = l - d;
        if (!u)
          a = l;
        else if (l <= i.pointer.x && l + g / 2 >= i.pointer.x) {
          a = l;
          break;
        } else if (l - f / 2 <= i.pointer.x && i.pointer.x <= l) {
          a = l;
          break;
        }
      }
      e.placeholderMovingObjects.forEach((c) => {
        c.opacity = 1, c.left = a, c.top = s.top, a += c.width;
      }), e.placeholderMovingObjects.forEach((c) => {
        const h = c.draggedObject;
        t.positionAfterTransform[h.id] = {
          top: c.top,
          left: c.left
        };
      }), t.trackIdAfterTransform = e.trackTopToIdMap[s.top];
    } else {
      if (e.orderNormalTrack = !1, e.updateItemsInTrack && e.updateItemsInTrack !== s.id) {
        const d = t.getObjects().find((g) => g.id === e.updateItemsInTrack);
        d != null && d.magnetic ? D0(t, e) : t.updateTrackItemCoords(!0), e.updateItemsInTrack = null, e.initialTrackPoints = [];
      }
      e.initialTrackPoints.length === 0 && s instanceof Vt && (e.updateItemsInTrack = s.id, e.initialTrackPoints = ba(
        e,
        s
      ));
      const a = n.find((d) => Lh(
        r,
        d.getBoundingRect()
      )), c = [], l = e.primaryMovingObjects.sort((d, g) => d.left - g.left), u = l[0];
      l.forEach((d, g) => {
        if (!l[g - 1]) return;
        const f = d.left - u.left;
        c.push(f);
      }), e.placeholderMovingObjects.forEach((d, g) => {
        const f = d.draggedObject;
        if (f instanceof Ns) {
          d.visible = !1;
          return;
        }
        f.setCoords(), S0(d);
        let p = P0(
          f,
          n,
          i.pointer,
          a
        );
        if (e.draggingOverTrack instanceof Te ? d.opacity = 0 : d.opacity = 1, f instanceof xe && p.isInvalidDrop && e.draggingOverTrack instanceof Vt) {
          const m = i.pointer, b = [...t.viewportTransform], T = m.y - b[5];
          E0(t, T);
        } else e.primaryMovingObjects.length > 1 ? (t.trackIdAfterTransform = e.trackTopToIdMap[p.top], t.positionAfterTransform[f.id] = {
          top: p.top,
          left: p.left + (c[g - 1] || 0)
        }, d.left = p.left + (c[g - 1] || 0), d.top = p.top) : (t.trackIdAfterTransform = e.trackTopToIdMap[p.top], t.positionAfterTransform[f.id] = {
          top: p.top,
          left: p.left
        }, d.left = p.left, d.top = p.top);
      });
    }
  }
), ba = (i, t) => {
  const e = i.canvas, s = [];
  t.items.forEach((h) => {
    const l = e.getObjects().find((u) => u.id === h);
    l && s.push(l);
  });
  const r = i.activeObjects.map((h) => h.id), o = s.filter(
    (h) => !r.includes(h.id)
  ).sort(
    (h, l) => h.left - l.left
  );
  let a = 0;
  const c = [];
  return t.magnetic ? j0(o, a, c) : I0(t, c, e), c;
};
function D0(i, t) {
  const e = [];
  i.getObjects().find((a) => a.id === t.updateItemsInTrack).items.forEach((a) => {
    const c = i.getObjects().find((h) => h.id === a);
    c && e.push(c);
  });
  const r = t.activeObjects.map((a) => a.id), o = e.filter(
    (a) => !r.includes(a.id)
  ).sort(
    (a, c) => a.left - c.left
  );
  t.initialTrackPoints.length > o.length && M0(o, t.initialTrackPoints);
}
function j0(i, t, e) {
  var h;
  const s = J(), r = (h = i[0]) == null ? void 0 : h.canvas, n = s.draggingOverTrack, o = s.primaryMovingObjects.map((l) => l.id);
  if (!r) return;
  const a = r.transitionIds.filter(
    (l) => r.transitionsMap[l].kind !== "none"
  );
  i.forEach((l) => {
    l.set({ left: t }), t += l.width, a.find(
      (d) => r.transitionsMap[d].toId === l.id
    ) || e.push(l.left);
  });
  const c = i[i.length - 1];
  if (e.push(((c == null ? void 0 : c.left) || 0) + ((c == null ? void 0 : c.width) || 0)), n != null && n.items.includes(o[0])) {
    const l = s.primaryMovingObjects[0], u = [...e];
    if (l) {
      const d = u.findIndex((g) => g > (l == null ? void 0 : l.left));
      d !== -1 && e.splice(
        d,
        0,
        nt(l.display.from, r.tScale)
      );
    }
  }
}
function I0(i, t, e) {
  const s = i.items, r = {}, n = {}, o = e.getActiveObjects().map((h) => h.id);
  Object.values(e.trackItemsMap).forEach((h) => {
    s.includes(h.id) && (r[h.id] = h);
  });
  const a = e.getObjects("Transition").filter((h) => h.top === i.top).map((h) => h.id);
  Object.values(e.transitionsMap).forEach((h) => {
    a.includes(h.id) && (n[h.id] = h);
  });
  const c = b0({
    trackItemIds: Fe(s),
    transitionsMap: Fe(n),
    trackItemsMap: Fe(r)
  });
  t.push(0), c.forEach((h) => {
    if (h.length === 1) {
      const l = e.getObjects().find((u) => u.id === h[0].id);
      o.includes(l.id) || t.push(l.left + l.width);
    } else {
      const l = h[h.length - 1], u = e.getObjects().find((d) => d.id === l.id);
      t.push(u.width + u.left);
    }
  });
}
function E0(i, t) {
  i.getObjects("Helper").reduce(
    (r, n) => Math.abs(n.top - t) < Math.abs(r.top - t) ? n : r
  ).setSelected(!0);
}
const P0 = (i, t, e, s) => {
  const r = Bh(i);
  return !r && i instanceof xe ? {
    top: 0,
    left: 0,
    isInvalidDrop: !0
  } : r ? s ? i instanceof xe ? {
    top: 0,
    left: 0,
    isInvalidDrop: !0
  } : k0(
    i,
    s,
    t,
    e
  ) : O0(i) : C0();
};
function A0(i) {
  i.on("mouse:up", Fh.bind(i)), i.on("object:moving", Wh);
}
function R0(i) {
  i.off("mouse:up", Fh.bind(i)), i.off("object:moving", Wh);
}
const F0 = (i) => {
  J().canvas.fire("track:create", i);
}, L0 = (i) => {
  J().canvas.fire("track-items:moved", i);
}, Xh = (i) => {
  var a, c, h;
  const t = (a = i.target) == null ? void 0 : a.canvas;
  if (!t) return;
  const e = J(), s = t.getActiveObject();
  if (!s || !t.positionBeforeTransform) return;
  const r = t.getScenePoint(i.e), o = t.getObjects("Track", "Helper").find((l) => {
    const u = l.getBoundingRect();
    return r.x >= u.left && r.x <= u.left + u.width && r.y >= u.top && r.y <= u.top + u.height;
  });
  if (i.action === "resizing") {
    const l = (e.trackToItemsMap[(c = e.originTrack) == null ? void 0 : c.id] || []).filter((d) => d !== s);
    s.setCoords();
    const u = zh(
      l,
      s.getBoundingRect()
    );
    return t.fire("track-items:resized", {
      trackId: (h = e.originTrack) == null ? void 0 : h.id,
      trackItemIds: [s.id],
      isOverlapped: !!u
    }), !1;
  }
  if (!o)
    return s == null || s.set(t.positionBeforeTransform), s == null || s.setCoords(), !1;
  if (o instanceof Te) {
    let l;
    switch (o.kind) {
      case "top":
        l = 0;
        break;
      case "center":
        l = o.metadata.order || 0;
        break;
      case "bottom":
        l = -1;
        break;
      default:
        return;
    }
    const u = {
      isSecondaryOverlapped: !1,
      secondaryTracks: e.secondaryTracks,
      primaryTracks: e.primaryTracks,
      primaryPositions: {
        trackIndex: l,
        trackId: t.trackIdAfterTransform,
        positions: t.positionAfterTransform
      }
    };
    F0(u);
  } else if (o instanceof Vt) {
    const u = {
      isSecondaryOverlapped: W0(),
      secondaryTracks: e.secondaryTracks,
      primaryTracks: e.primaryTracks,
      primaryPositions: {
        trackId: t.trackIdAfterTransform,
        positions: t.positionAfterTransform
      }
    };
    L0(u);
  }
};
function B0() {
  const i = J(), t = i.canvas, [e] = i.primaryMovingObjects, s = e.id, r = t.positionAfterTransform[s], n = e.getBoundingRect().top, o = r.top - n, a = {};
  return i.secondaryMovingObjects.forEach((c) => {
    const h = c.getBoundingRect().top + o, l = i.trackTopToIdMap[h], u = mn(
      i.trackTops,
      i.originTrack.top,
      h
    );
    a[l] ? a[l].objects.push(c) : a[l] = {
      objects: [c],
      index: u
    };
  }), a;
}
function W0() {
  const i = B0(), t = J();
  return Object.keys(i).some((e) => {
    const s = t.trackToItemsMap[e], r = i[e].objects;
    return !s || !s.length ? !0 : s.filter((n) => !r.includes(n)).some((n) => zh(
      r,
      n.getBoundingRect()
    ));
  });
}
function zh(i, t) {
  return i.find((s) => {
    const r = s.getBoundingRect();
    return t.left < r.left + r.width && t.left + t.width > r.left && t.top < r.top + r.height && t.top + t.height > r.top;
  });
}
const X0 = (i) => {
  i.on("object:modified", Xh);
}, z0 = (i) => {
  i.off("object:modified", Xh);
}, Hh = "drag", H0 = `${Hh}:start`, Yh = `${Hh}:end`, Vh = "timeline", Y0 = `${Vh}:boundingChanged`, V0 = `${Vh}:seek`, G0 = (i) => {
  const { trackItemIds: t, transitionsMap: e, trackItemsMap: s } = i, r = /* @__PURE__ */ new Map();
  Object.values(e).forEach((c) => {
    var u, d;
    if (c.kind === "none") return;
    const { fromId: h, toId: l } = c;
    r.has(h) || r.set(h, []), r.has(l) || r.set(l, []), (u = r.get(h)) == null || u.push(c), (d = r.get(l)) == null || d.push(c);
  });
  const n = [], o = /* @__PURE__ */ new Set(), a = (c) => {
    const h = [];
    let l = c;
    for (; l && !o.has(l); ) {
      o.add(l);
      const u = s[l];
      h.push(u);
      const d = Object.values(e).find(
        (g) => g.fromId === l && g.kind !== "none"
      );
      if (!d) break;
      h.push(d), l = d.toId;
    }
    return h;
  };
  for (const c of t)
    if (!o.has(c) && (!r.has(c) || !Object.values(e).some(
      (h) => h.toId === c && h.kind !== "none"
    ))) {
      const h = a(c);
      h.length > 0 && n.push(h);
    }
  return n.forEach((c) => {
    c.sort((h, l) => "display" in h && "display" in l ? h.display.from - l.display.from : 0);
  }), n;
}, N0 = "add:audio", U0 = "add:video", $0 = "add:image", q0 = "add:text", K0 = [
  "transition",
  "image",
  "video",
  "audio",
  "caption",
  "text"
];
let Z, ks, Le = [], Us = "";
function J0(i, t) {
  let e = 1 / 0, s = null;
  const r = new _(i.x, i.y);
  return t.forEach((n) => {
    const o = Math.sqrt(
      Math.pow(n.left - r.x, 2) + Math.pow(n.top - r.y, 2)
    );
    o < e && (e = o, s = n);
  }), s;
}
const Z0 = ({
  width: i,
  height: t,
  id: e,
  left: s,
  top: r,
  type: n,
  duration: o
}) => {
  if (n === "transition")
    return new Ns({
      top: 0,
      left: 0,
      height: 48,
      width: 48,
      id: "TransitionGuide"
    });
  const a = O.getClass("PreviewTrackItem") || xe;
  return new a({
    top: r,
    left: s,
    height: t,
    width: i,
    id: e,
    type: n,
    duration: o
  });
};
function Gh(i) {
  var f;
  const t = (f = i.e.dataTransfer) == null ? void 0 : f.types[0];
  if (!t) return;
  const e = JSON.parse(t), s = e.type;
  if (!K0.includes(s)) return;
  const r = e.duration || 5e3, n = this;
  n.discardActiveObject(), n.setActiveIds([]);
  const o = nt(r, this.tScale), a = n.getItemSize(s), c = n.getTrackItems();
  if (Z = Z0({
    width: o,
    height: a,
    id: "TransitionGuide",
    left: 0,
    top: 0,
    type: s,
    duration: r
  }), Z.visible = !1, Us = s, s === "transition") {
    Le = n.getObjects("Transition");
    const p = Le.filter((m) => m.kind !== "none");
    Le.forEach((m) => {
      const b = c.find((k) => k.id === m.toId), T = c.find((k) => k.id === m.fromId), w = m.width;
      ((b == null ? void 0 : b.width) || 0) >= w / 2 && ((T == null ? void 0 : T.width) || 0) >= w / 2 || (m.availableDrop = !1);
      const S = p.find(
        (k) => k.fromId === m.toId
      );
      S && S.width + w / 2 >= ((b == null ? void 0 : b.width) || 0) && (m.availableDrop = !1);
      const C = p.find(
        (k) => k.toId === m.fromId
      );
      C && C.width + w / 2 >= ((T == null ? void 0 : T.width) || 0) && (m.availableDrop = !1), m.visible = !0;
    });
  }
  const h = J();
  n.trackIdAfterTransform = "", n.positionAfterTransform = {};
  const l = Z, u = [Z];
  it({
    activeTrackToItemsMap: {},
    primaryTracks: {},
    secondaryTracks: {},
    trackTops: [],
    trackToItemsMap: {},
    activeObjects: [],
    trackTopToIdMap: {},
    isDragOver: !1
  }), it({ activeObjects: u });
  const d = n.getObjects("Track"), g = n.getTrackItems();
  d.forEach((p) => {
    const m = g.filter((b) => p.items.includes(b.id));
    h.trackToItemsMap[p.id] = m, h.trackTopToIdMap[p.top] = p.id, h.trackTops.push(p.top);
  }), h.trackTops.sort((p, m) => p - m), h.primaryMovingObjects = u, h.primaryMovingObjects = h.primaryMovingObjects.sort(
    (p, m) => p.left - m.left
  ), l && (n.positionBeforeTransform = {
    top: l.top,
    left: l.left
  }), h.placeholderMovingObjects = h.primaryMovingObjects.map((p) => {
    const m = p.getBoundingRect();
    h.objectInitialPositions[p.id] = {
      top: m.top,
      left: m.left
    };
    const b = new Hs({
      id: `${p.id}-placeholder`,
      left: m.left,
      top: m.top,
      width: m.width,
      height: m.height
    });
    return b.visible = !1, b.draggedObject = p, b;
  }), n.add(...h.placeholderMovingObjects), n.add(Z), Qt(H0);
}
const Nh = (i) => {
  const t = J();
  Dh(i, t.placeholderMovingObjects), i && (bi(i, i.getObjects()), jh(i.getObjects("Helper")));
};
function Uh() {
  if (Us = "", Nh(this), it({ draggingOverTrack: null, isPointerOverHelperTrack: !1 }), !Z) return;
  Qt(Yh);
  const i = this;
  Le.forEach((t) => {
    t.strokeDashArray = [], t.setSelected(!1), t.kind === "none" && (t.visible = !1);
  }), i.getObjects("Helper", "Track").forEach((t) => {
    t.setSelected && t.setSelected(!1);
  }), i.remove(Z);
}
function $h(i) {
  const t = J(), e = t.placeholderMovingObjects[0];
  if (e.visible || (Z.visible = !0, e.visible = !0), t.activeObjects[0] instanceof Ns && (e.visible = !1), !Z) return !1;
  i.e.preventDefault();
  const s = this, r = s.getScenePoint(i.e);
  Z.set({
    left: r.x - 16,
    top: r.y - Z.height / 2
  });
  const n = J0(
    r,
    Le.filter((c) => c.availableDrop)
  );
  n && (ks = n, n.strokeDashArray = [5, 1], n.setSelected(!0)), Le.forEach((c) => {
    c !== n && c.setSelected(!1);
  }), it({ isDragOver: !0 }), Z.setCoords();
  const o = {
    target: Z,
    action: "drag",
    originX: "center",
    originY: "center",
    offsetX: r.x - Z.left,
    offsetY: r.y - Z.top,
    scaleX: Z.scaleX,
    scaleY: Z.scaleY
  };
  if (t.activeObjects[0].type !== "transitionguide" && s.fire("object:moving", {
    target: Z,
    e: i.e,
    pointer: r,
    transform: o
  }), this.itemTypes.includes(Us))
    if (t.draggingOverTrack instanceof Vt) {
      it({ isPointerOverHelperTrack: !1 });
      const c = t.activeObjects[0].left, h = t.activeObjects[0].left + t.activeObjects[0].width;
      let l = !1;
      const u = t.draggingOverTrack.items;
      s.getObjects().filter((d) => u.includes(d.id)).forEach((d) => {
        (d.left <= c && d.left + d.width >= c || d.left <= h && d.left + d.width >= h || c <= d.left && h >= d.left + d.width) && (l = !0);
      }), t.draggingOverTrack.accepts.includes(Us) && !l ? (t.placeholderMovingObjects[0].left = t.activeObjects[0].left, t.placeholderMovingObjects[0].top = t.draggingOverTrack.top, s.getObjects("Helper").forEach((d) => {
        d.setSelected && d.setSelected(!1);
      })) : t.placeholderMovingObjects.forEach((d) => {
        d.opacity = 0;
      });
    } else t.draggingOverTrack instanceof Te && (it({ isPointerOverHelperTrack: !0 }), t.draggingOverTrack.setSelected(!0));
  s.requestRenderAll();
}
function qh(i) {
  var o;
  Us = "";
  const t = this;
  Nh(t);
  const e = J(), s = e.draggingOverTrack;
  it({ draggingOverTrack: null, isPointerOverHelperTrack: !1 });
  const r = (o = i.e.dataTransfer) == null ? void 0 : o.types[0], n = JSON.parse(i.e.dataTransfer.getData(r));
  if (n.type !== "transition") {
    const a = e.activeObjects[0], c = L(a.left, t.tScale);
    if (s instanceof Vt)
      if (e.placeholderMovingObjects[0].opacity !== 0) {
        const l = zi(s, this.getObjects("Track"));
        if (s.magnetic) {
          const u = e.initialTrackPoints[e.initialTrackPoints.length - 1], d = L(u, t.tScale) || 0;
          Ir(n, l, d);
        } else Ir(n, l, c);
      } else {
        const l = t.getScenePoint(i.e), u = L(
          l.x,
          t.tScale
        ), d = l.y, f = t.getObjects("Helper").reduce(
          (m, b) => Math.abs(b.top - d) < Math.abs(m.top - d) ? b : m
        ), p = zi(f, this.getObjects("Track"));
        Ir(n, p, u, !0);
      }
    else {
      const h = t.getScenePoint(i.e), l = L(
        h.x,
        t.tScale
      ), u = zi(
        s,
        this.getObjects("Track")
      );
      Ir(n, u, l, !0);
    }
    this.remove(a), this.requestRenderAll();
    return;
  }
  if (Z) {
    if (ks) {
      const a = ks.id, c = Jv(n, ["kind", "direction"]);
      Object.keys(c).forEach((T) => {
        T === "kind" ? ks.kind = c[T] : ks[T] = c[T];
      });
      const h = Fe(this.trackItemIds), l = Fe(this.transitionsMap), u = Fe(this.trackItemsMap);
      l[a] = {
        ...l[a],
        ...c
      };
      const d = G0({
        trackItemIds: h,
        transitionsMap: l,
        trackItemsMap: u
      }), f = l[a].fromId, p = d.find((T) => T.find((w) => w.id === f)) || [], m = Q0(
        p
      ), b = ty(
        this.trackItemsMap,
        m
      );
      this.trackItemsMap = b, this.transitionsMap[a] = {
        ...this.transitionsMap[a],
        ...c
      }, this.adjustMagneticTrack(), this.calcBounding(), this.updateTransitions(), this.refreshTrackLayout(), this.updateState({ kind: "add:transition", updateHistory: !0 });
    }
    Le.forEach((a) => {
      a.strokeDashArray = [], a.setSelected(!1), a.kind === "none" && (a.visible = !1);
    }), t.remove(Z), t.requestRenderAll(), Qt(Yh);
  }
}
const Q0 = (i) => {
  const [t] = i, e = i.filter(
    (r) => r.type !== "transition"
  );
  let s = t.display.from;
  return e.map((r) => {
    const n = r.display.to - r.display.from, o = {
      from: s,
      to: s + n
    };
    return s = o.to, {
      ...r,
      display: o
    };
  });
}, ty = (i, t) => {
  let e = i;
  return t.forEach((s) => {
    e[s.id] = s;
  }), e;
}, zi = (i, t) => {
  const e = t.sort((o, a) => o.top - a.top);
  if (e.length === 0) return 0;
  const s = e[e.length - 1];
  if (s.top + s.height <= i.top)
    return e.length;
  const r = i.top;
  return e.reduce((o, a, c) => {
    const h = Math.abs(a.top - r), l = Math.abs(e[o].top - r);
    return h < l ? c : o;
  }, 0);
}, Ir = (i, t, e, s) => {
  i.type === "image" ? Qt($0, {
    payload: {
      ...i,
      id: Os(),
      display: { from: e }
    },
    options: { trackIndex: t, isNewTrack: s }
  }) : i.type === "video" ? Qt(U0, {
    payload: {
      ...i,
      id: Os(),
      display: { from: e }
    },
    options: { trackIndex: t, isNewTrack: s }
  }) : i.type === "audio" ? Qt(N0, {
    payload: {
      ...i,
      id: Os(),
      display: { from: e }
    },
    options: { trackIndex: t, isNewTrack: s }
  }) : i.type === "text" && Qt(q0, {
    payload: {
      ...i,
      id: Os(),
      display: { from: e }
    },
    options: { trackIndex: t, isNewTrack: s }
  });
};
function ey(i) {
  i.on("dragover", $h), i.on("dragenter", Gh), i.on("dragleave", Uh), i.on("drop", qh);
}
function sy(i) {
  i.off("dragover", $h), i.off("dragenter", Gh), i.off("dragleave", Uh), i.off("drop", qh);
}
function Kh(i) {
  const t = this.height < this.bounding.height;
  if (!(this.width < this.bounding.width) && !t) return;
  const s = this.viewportTransform;
  let r = s[4], n = s[5];
  const o = 2;
  i.e.shiftKey ? r = r - i.e.deltaY * o : (t && (n = n - i.e.deltaY * o), r = r - i.e.deltaX * o), this.setViewportPos(r, n);
}
function Jh() {
  const i = this, t = i.getActiveObject(), e = i.getActiveObjects(), s = e.map((n) => n.id), r = e.filter((n) => {
    if (e.length === 1)
      return !0;
    if (n.id && !(n instanceof Nt))
      return !0;
    if (n instanceof Nt && s.includes(n.fromId) && s.includes(n.toId))
      return !0;
  }).map((n) => n.id);
  t instanceof wt ? (t.borderColor = "rgba(0, 216, 214,0.75)", t.hasControls = !1, t.hoverCursor = "default", t.borderScaleFactor = 1, t.padding = 0, t.getObjects().forEach((n) => {
    n.setSelected(!0);
  })) : t == null || t.setSelected(!0), r.length === 1 && String(t == null ? void 0 : t.id) !== String(r[0]) ? this.setActiveIds(r) : r.length >= 1 && this.setActiveIds(r);
}
function Zh(i) {
  const t = this, e = t.getActiveObject();
  e instanceof wt && (e.borderColor = "transparent", e.hasControls = !1, e.hoverCursor = "default"), i.selected.forEach((n) => {
    n.setSelected(!0);
  }), i.deselected.forEach((n) => {
    n.setSelected(!1);
  });
  const r = t.getActiveObjects().map((n) => n.id);
  this.setActiveIds(r);
}
function Qh(i) {
  i.deselected.forEach((t) => {
    t.setSelected(!1);
  });
}
const ry = (i) => {
  i.on("selection:created", Jh), i.on("selection:updated", Zh), i.on("selection:cleared", Qh), i.on("mouse:wheel", Kh);
}, iy = (i) => {
  i.off("mouse:wheel", Kh), i.off("selection:created", Jh), i.off("selection:updated", Zh), i.off("selection:cleared", Qh);
}, tl = () => {
  var n;
  const i = J(), t = i.canvas, e = i.draggingOverTrack;
  t.updateTrackItemCoords(!0);
  const s = e == null ? void 0 : e.magnetic, r = new Set(i.activeObjects.map((o) => o.id));
  if (s) {
    const o = e.id, c = i.trackToItemsMap[o].sort((f, p) => f.left - p.left), h = i.placeholderMovingObjects, l = ((n = h[0]) == null ? void 0 : n.top) || 0, u = h.reduce(
      (f, p) => f + p.width,
      0
    ), d = Math.min(...h.map((f) => f.left));
    let g = 0;
    c.forEach((f) => {
      r.has(f.id) || f.top === l && (Math.abs(d - g) < 1 && (g += u), f.left = g, g += f.width);
    });
  } else if (e instanceof Vt && i.orderNormalTrack) {
    const o = e.items, a = t.getTrackItems().filter(
      (p) => !r.has(p.id) && o.includes(p.id)
    ), c = a.sort((p, m) => p.left - m.left), h = i.placeholderMovingObjects[0], l = i.placeholderMovingObjects[i.placeholderMovingObjects.length - 1], u = h.left, d = l.left - h.left + l.width, g = c.find((p, m) => {
      if (p.left >= u - 1) return c[m];
    }), f = a.filter(
      (p) => p.left >= u - 1
    );
    if (h.left + d > (g == null ? void 0 : g.left)) {
      const p = d - (g.left - h.left);
      f.forEach((m) => {
        const b = nt(m.display.from, t.tScale);
        m.left = b + p;
      });
    }
  }
  t.alignTransitionsToTrack(!1);
};
function ny(i) {
  i.on("object:moving", tl);
}
function oy(i) {
  i.off("object:moving", tl);
}
let It, Zn = !1;
function ay(i, t) {
  const e = i.canvas;
  if (e.objectTypes.includes(i.type)) {
    It || (It = i);
    const r = i.top, n = i.height, o = i.left, a = i.width, c = t.x, h = t.y, l = Math.abs(h - (r + n / 2)) <= Wd;
    Math.abs(c - o) <= Ro && l || Math.abs(c - o - a) <= Ro && l ? (e.hoverCornerItem = !0, i.hoverCursor = "ew-resize") : (e.hoverCornerItem = !1, i.hoverCursor = "move"), e.requestRenderAll();
  }
}
function el(i) {
  const t = this, e = t.findTarget(i.e), s = t.getScenePoint(i.e);
  e && (e.isSelected && It && (e.hoverCursor = "default"), ay(e, s));
}
function sl() {
  It && (It.lockMovementX = !1, It.lockMovementY = !1, It = void 0);
}
function rl(i) {
  It && (Zn || It._renderControls(i.ctx));
}
function il() {
  It && (It = void 0, this.requestRenderAll());
}
function nl() {
  Zn = !0;
}
function ol() {
  Zn = !1;
}
function cy(i) {
  i.on("mouse:out", il.bind(i)), i.on("mouse:up", sl.bind(i)), i.on("mouse:move", el.bind(i)), i.on("after:render", rl.bind(i)), i.on("object:resizing", nl.bind(i)), i.on("object:modified", ol.bind(i));
}
function hy(i) {
  i.off("mouse:out", il.bind(i)), i.off("mouse:up", sl.bind(i)), i.off("mouse:move", el.bind(i)), i.off("after:render", rl.bind(i)), i.off("object:resizing", nl.bind(i)), i.off("object:modified", ol.bind(i));
}
const ly = (i) => {
  it({ canvas: i }), a0(i), s0(i), h0(i), p0(i), v0(i), A0(i), X0(i), ey(i), ry(i), ny(i), cy(i);
}, uy = (i) => {
  it({ canvas: null }), c0(i), r0(i), l0(i), m0(i), y0(i), R0(i), z0(i), sy(i), iy(i), oy(i), hy(i);
};
class dy {
  removeTransitions() {
    const t = this.getObjects("Transition");
    this.remove(...t);
  }
  renderTransitions() {
    this.removeTransitions(), this.transitionIds.forEach((t) => {
      const e = this.transitionsMap[t], s = e.fromId, r = e.toId, n = this.getObjects(), o = n.find((d) => d.id === s), a = n.find((d) => d.id === r);
      if (!o || !a)
        return;
      const c = nt(e.duration, this.tScale), h = o.left + o.width - c / 2, l = o.height, u = new Nt({
        id: e.id,
        left: h,
        top: o.top,
        height: l,
        width: c,
        tScale: this.tScale,
        duration: e.duration,
        fromId: o.id,
        toId: a.id,
        kind: e.kind
      });
      e.kind === "none" && (u.visible = !1), u && this.add(u);
    });
  }
  updateTrackTransitionsItemCoords() {
    this.pauseEventListeners(), this.getObjects("Transition").forEach((e) => {
      e.tScale = this.tScale, e.updateCoords(), e.setCoords();
    }), this.resumeEventListeners();
  }
  alignTransitionsToTrack(t = !0) {
    const e = t ? [] : this.getActiveObjects().map((s) => s.id);
    this.transitionIds.forEach((s) => {
      const r = this.getObjects("Transition").find(
        (n) => n.id === s
      );
      if (r instanceof Nt) {
        const n = this.getObjects().find(
          (c) => c.id === r.fromId && !e.includes(c.id)
        );
        if (!n) return;
        const o = nt(r.duration, this.tScale), a = n.left + n.width - o / 2;
        r.set({
          left: a,
          top: n.top
        }), r.setCoords();
      }
    });
  }
  updateTransitions(t = !0) {
    t && this.pauseEventListeners();
    const e = this.getObjects("Track"), s = this.getObjects(...this.withTransitions);
    this.removeTransitions();
    const r = {}, n = [];
    e.forEach((a) => {
      const c = s.filter((h) => a.items.includes(h.id)).sort((h, l) => h.left - l.left);
      for (let h = 0; h < c.length - 1; h++) {
        const l = c[h], u = c[h + 1];
        if (Math.abs(l.left + l.width - u.left) <= 1) {
          const d = `${l.id}-${u.id}`;
          if (this.transitionIds.includes(d)) {
            const f = this.transitionsMap[d];
            r[d] = f;
          } else {
            const f = {
              id: d,
              duration: 1500,
              fromId: l.id,
              toId: u.id,
              kind: "none",
              trackId: a.id,
              type: "transition"
            };
            r[d] = f;
          }
          n.push(d);
        }
      }
    }), this.transitionIds = n, this.transitionsMap = r, this.renderTransitions();
    const o = this.getObjects("Transition");
    this.updateCachingActiveObjects(o), t && this.resumeEventListeners();
  }
}
function al(i) {
  const { secondaryTracks: t, primaryTracks: e, primaryPositions: s } = i, { positions: r, trackIndex: n } = s, o = n === -1 ? this.tracks.length : n, [a] = Object.keys(e), c = this.tracks.find(
    (p) => p.id === a
  ), h = e[a], l = {
    id: Os(),
    items: h.objects.map((p) => p.id),
    type: c.type,
    accepts: c.accepts,
    muted: c.muted || !1
  }, u = Kn(
    Object.keys(t).map((p) => t[p].objects.map((m) => m.id))
  );
  let d = Ys(this.tracks, [
    ...Object.keys(r),
    ...u
  ]);
  const g = [];
  Object.keys(t).forEach((p) => {
    const { objects: m, index: b } = t[p], T = this.tracks.find(
      (C) => C.id === p
    ), w = m.map((C) => C.id).filter((C) => !this.transitionIds.includes(C)), S = {
      id: sr(),
      items: w,
      type: T.type,
      accepts: T.accepts,
      tempIndex: b,
      muted: T.muted || !1
    };
    g.push(S);
  });
  const f = Ah(l, g);
  f.length && d.splice(o, 0, ...f), this.tracks = d, this.renderTracks(), this.refreshTrackLayout(), this.alignItemsToTrack(), this.uodateTrackItemIdsOrdering(), this.adjustMagneticTrack(), this.updateTransitions(!0), this.updateState({ updateHistory: !0, kind: "update" });
}
function cl(i) {
  const {
    isSecondaryOverlapped: t,
    secondaryTracks: e,
    primaryTracks: s,
    primaryPositions: r
  } = i, { trackId: n, positions: o } = r, a = this.tracks.find((b) => b.id === n), l = J().primaryMovingObjects.sort((b, T) => b.left - T.left);
  l.forEach((b, T) => {
    l[T - 1] && b.left - l[T - 1].left;
  });
  const u = this.tracks.findIndex((b) => b.id === n), d = Kn(
    Object.keys(e).map((b) => e[b].objects.map((T) => T.id))
  );
  let g = Ys(this.tracks, [
    ...Object.keys(o),
    ...d
  ]);
  Object.keys(s).forEach((b) => {
    this.pauseEventListeners();
    const { objects: T } = s[b];
    T.forEach((C) => {
      if (C.isMain && (a != null && a.magnetic)) return;
      const k = o[C.id];
      C.left = k == null ? void 0 : k.left;
    }), this.resumeEventListeners();
    const w = r.trackId, S = g.find((C) => C.id === w);
    S == null || S.items.push(...Object.keys(o)), this.tracks = g;
  });
  const f = this.tracks[u], p = [];
  Object.keys(e).forEach((b) => {
    const { objects: T, index: w } = e[b], S = T.filter((D) => D.type !== "transition").map((D) => D.id), [C] = S, k = this.trackItemsMap[C];
    if (t && k) {
      const D = this.getItemAccepts(k.type), M = {
        id: sr(),
        items: S,
        type: k.type,
        accepts: D,
        tempIndex: w,
        muted: !1
      };
      p.push(M);
    } else {
      const D = g[u + w];
      D == null || D.items.push(...S), this.tracks = g;
    }
  });
  const m = Ah(f, p);
  m.length && g.splice(u, 1, ...m), this.tracks = g, this.renderTracks(), this.alignItemsToTrack(), this.uodateTrackItemIdsOrdering(), this.adjustMagneticTrack(), this.updateTransitions(!0), this.updateState({ updateHistory: !0, kind: "update" });
}
function hl({
  trackItemIds: i,
  isOverlapped: t
}) {
  var o, a;
  const [e] = i;
  if (!e) return;
  const s = this.getObjects("Transition");
  if (!s.find((c) => c.id === e)) {
    const c = this.tracks.find(
      (h) => h.items.includes(e)
    );
    if (t) {
      const h = Ys(this.tracks, i), l = {
        id: sr(),
        items: [e],
        type: c.type,
        accepts: c.accepts,
        muted: c.muted || !1
      }, u = this.tracks.findIndex(
        (d) => d.id === c.id
      );
      h.splice(u, 0, l), this.tracks = h;
    }
  }
  const n = s.filter(
    (c) => c.fromId === e || c.toId === e
  );
  if (n) {
    const c = this.getTrackItems().find((g) => g.id === e), h = c == null ? void 0 : c.width;
    n.forEach((g) => {
      if (g.width / 2 > h) {
        this.transitionIds = this.transitionIds.filter((p) => p !== g.id);
        const f = {};
        Object.keys(this.transitionsMap).forEach((p) => {
          p !== g.id && (f[p] = this.transitionsMap[p]);
        }), this.transitionsMap = f;
      }
    });
    const l = ((o = n[0]) == null ? void 0 : o.width) || 0, u = ((a = n[1]) == null ? void 0 : a.width) || 0, d = n[1];
    if (h <= l / 2 + u / 2) {
      this.transitionIds = this.transitionIds.filter(
        (f) => f !== (d == null ? void 0 : d.id)
      );
      const g = {};
      Object.keys(this.transitionsMap).forEach((f) => {
        f !== (d == null ? void 0 : d.id) && (g[f] = this.transitionsMap[f]);
      }), this.transitionsMap = g;
    }
  }
  this.renderTracks(), this.alignItemsToTrack(), this.adjustMagneticTrack(), this.updateTransitions(!0), this.uodateTrackItemIdsOrdering(), this.updateState({ updateHistory: !0, kind: "update" });
}
let vn = { x: 0, y: 0 };
function gy(i) {
  vn = i.scenePoint;
}
function ll(i) {
  const t = i.scenePoint;
  if ((vn.x === t.x || vn.y === t.y) && !i.target) {
    const s = this.getElement().getBoundingClientRect(), r = this.viewportTransform, n = i.e.clientX - s.left - r[4], o = L(n, this.scale.zoom);
    Qt(V0, { payload: { time: o } });
  }
}
const fy = (i) => {
  i.on("track:create", al.bind(i)), i.on("track-items:resized", hl.bind(i)), i.on("track-items:moved", cl.bind(i)), i.on("mouse:up", ll.bind(i)), i.on("mouse:down", gy.bind(i));
};
function py(i) {
  i.off("track:create", al.bind(i)), i.off("track-items:resized", hl.bind(i)), i.off("track-items:moved", cl.bind(i)), i.off("mouse:up", ll.bind(i));
}
function my(i, t) {
  return t.forEach((e) => {
    Object.getOwnPropertyNames(e.prototype).forEach((s) => {
      s !== "constructor" && Object.defineProperty(
        i.prototype,
        s,
        Object.getOwnPropertyDescriptor(e.prototype, s) || /* @__PURE__ */ Object.create(null)
      );
    });
  }), i;
}
let ul, dl, gl, fl, pl, ml, vl, yl, bl;
const vy = (i) => {
  ul = i.state.subscribeToActiveIds(
    ({ activeIds: t }) => {
      const e = i.activeIds;
      if (t.length === 1 && e.length === 1) {
        const s = t[0], r = e[0], o = i.state.getState().structure;
        let a = "";
        if (o.forEach((c) => {
          c.id === r && c.items.includes(s) && (a = c.id);
        }), a !== "") return;
        i.selectTrackItemByIds([s]);
      } else
        i.selectTrackItemByIds(t);
    }
  ), bl = i.state.subscribeToUpdateTracks(
    ({ tracks: t, duration: e, trackItemsMap: s }) => {
      i.tracks = t, i.duration = e, i.trackItemsMap = s, i.synchronizeTrackItemsState(), i.renderTracks(), i.refreshTrackLayout(), i.adjustMagneticTrack(), i.renderTransitions(), i.alignItemsToTrack(), i.alignTransitionsToTrack(), i.calcBounding();
    }
  ), yl = i.state.subscribeToTracks(
    ({ tracks: t, changedTracks: e }) => {
      e.length && (i.tracks = t, i.renderTracks(), i.refreshTrackLayout());
    }
  ), vl = i.state.subscribeToUpdateAnimations(
    ({ trackItemsMap: t, changedAnimationIds: e }) => {
      if (e != null && e.length) {
        const s = i.getTrackItems();
        i.trackItemsMap = t, s.forEach((r) => {
          if (e.includes(r.id)) {
            const n = t[r.id].animations;
            n && r.set({
              animations: n
            });
          }
        });
      }
    }
  ), ml = i.state.subscribeToUpdateTrackItemTiming(
    ({ trackItemsMap: t, changedTrimIds: e, changedDisplayIds: s }) => {
      if (e && i.getTrackItems().forEach((n) => {
        if (e.includes(n.id)) {
          const o = t[n.id].trim;
          o && n.set({
            trim: {
              from: o.from,
              to: o.to
            }
          });
        }
      }), s) {
        const r = i.getTrackItems();
        i.pauseEventListeners(), r.forEach((n) => {
          if (s.includes(n.id)) {
            const o = t[n.id].display;
            i.trackItemsMap[n.id].display = o, t[n.id].playbackRate !== i.trackItemsMap[n.id].playbackRate && (i.trackItemsMap[n.id].playbackRate = t[n.id].playbackRate, n.playbackRate = t[n.id].playbackRate, n.onScale && n.onScale()), o && n.set({
              display: o
            });
          }
        }), i.resumeEventListeners();
      }
      i.updateTrackItemCoords(), i.adjustMagneticTrack(), i.updateTransitions(), i.alignItemsToTrack(), i.renderTracks(), i.calcBounding(), i.refreshTrackLayout(), i.setTrackItemCoords(), i.requestRenderAll();
    }
  ), pl = i.state.subscribeToScale((t) => {
    i.setScale(t.scale);
  }), fl = i.state.subscribeToUpdateItemDetails((t) => {
    const e = i.getTrackItems();
    if (e.length === 0) return;
    const s = i.state.getState(), r = t.trackItemsMap, n = s.trackItemsMap;
    i.trackItemsMap = r, e.forEach((o) => {
      var c, h;
      const a = r[o.id];
      if (a)
        if (o.hasSrc) {
          const l = n[o.id];
          if (o.src !== a.details.src && o.setSrc && o.setSrc(a.details.src), a.type === "video" || a.type === "audio") {
            const d = (((c = l.trim) == null ? void 0 : c.to) || 0) - (((h = l.trim) == null ? void 0 : h.from) || 0), g = nt(
              d,
              i.scale.zoom,
              l.playbackRate
            );
            o.set({
              duration: l.duration,
              display: l.display,
              trim: l.trim,
              width: g
            }), o.setCoords();
          }
        } else (a.type === "text" || a.type === "caption") && (a.type === "text" || a.type === "caption") && o.set({ text: a.details.text });
    }), i.requestRenderAll();
  }), gl = i.state.subscribeToHistory((t) => {
    i.tracks = t.tracks, i.trackItemsMap = t.trackItemsMap, i.trackItemIds = t.trackItemIds, i.transitionIds = t.transitionIds, i.transitionsMap = t.transitionsMap, i.renderTracks(), i.refreshTrackLayout(), i.updateTrackItemCoords(), i.alignItemsToTrack(), i.alignTransitionsToTrack(), i.adjustMagneticTrack(), i.updateTransitions(), i.calcBounding(), i.duration = Ar(i.trackItemsMap);
  }), dl = i.state.subscribeToAddOrRemoveItems(() => {
    const t = i.getTrackItems().map((n) => n.id), e = i.state.getState(), s = e.trackItemIds, r = [];
    t.forEach((n) => {
      s.includes(n) || r.push(n);
    }), i.deleteTrackItemById(r), i.tracks = e.tracks, i.trackItemsMap = e.trackItemsMap, i.transitionIds = e.transitionIds, i.transitionsMap = e.transitionsMap, s.forEach((n) => {
      if (!t.includes(n)) {
        const a = {
          ...e.trackItemsMap[n]
        };
        i.addTrackItem(a);
      }
    }), i.trackItemIds = e.trackItemIds, i.activeIds = e.activeIds, i.renderTracks(), i.alignItemsToTrack(), i.updateTrackItemCoords(), i.calcBounding(), i.updateTransitions(), i.refreshTrackLayout(), i.selectTrackItemByIds(e.activeIds);
  });
}, yy = (i) => {
  ul.unsubscribe(), dl.unsubscribe(), gl.unsubscribe(), fl.unsubscribe(), pl.unsubscribe(), ml.unsubscribe(), vl.unsubscribe(), yl.unsubscribe(), bl.unsubscribe();
}, _a = (i, t) => {
  let e = !1;
  const s = [];
  return t.forEach((r) => {
    r.containsPoint(i) && (s.push(r), e = !0);
  }), { isOverObject: e, overObjects: s };
};
function by(i) {
  return JSON.parse(JSON.stringify(i));
}
class _y {
  constructor(t, e = {}) {
    x(this, "canvas");
    x(this, "fill", "rgba(0,0,0,.3)");
    x(this, "stroke", "rgba(255,255,255,.3)");
    x(this, "lineWidth", 1);
    x(this, "hideX", !1);
    x(this, "hideY", !1);
    x(this, "scrollbarMinWidth", 40);
    x(this, "scrollbarSize", 5);
    x(this, "scrollSpace", 4);
    x(this, "padding", 4);
    x(this, "extraMarginX", 200);
    x(this, "extraMarginY", 200);
    x(this, "offsetX", 0);
    x(this, "offsetY", 0);
    x(this, "scrollbarWidth", 5);
    x(this, "scrollbarColor", "rgba(0,0,0,.3)");
    x(this, "onViewportChange");
    x(this, "_bar");
    x(this, "_barViewport", {
      left: 1,
      right: -1,
      top: 1,
      bottom: -1,
      sx: 1,
      sy: 1
    });
    x(this, "_originalMouseDown");
    x(this, "_originalMouseMove");
    x(this, "_originalMouseUp");
    this.canvas = t, Object.assign(this, e), e.scrollbarWidth !== void 0 && (this.scrollbarSize = e.scrollbarWidth), e.scrollbarColor !== void 0 && (this.fill = e.scrollbarColor), this._originalMouseDown = this.canvas.__onMouseDown, this._originalMouseMove = this.canvas._onMouseMove, this._originalMouseUp = this.canvas._onMouseUp, this.canvas.__onMouseDown = this.mouseDownHandler.bind(this), this.canvas._onMouseMove = this.mouseMoveHandler.bind(this), this.canvas._onMouseUp = this.mouseUpHandler.bind(this), this.beforeRenderHandler = this.beforeRenderHandler.bind(this), this.afterRenderHandler = this.afterRenderHandler.bind(this), this.initBehavior();
  }
  initBehavior() {
    this.canvas.on("before:render", this.beforeRenderHandler), this.canvas.on("after:render", this.afterRenderHandler);
  }
  getScrollbar(t) {
    const e = this.canvas.getViewportPoint(t), s = this.canvas.viewportTransform.slice(0);
    if (!this.hideX && e.x > this._barViewport.left && e.x < this._barViewport.right && e.y > this.canvas.height - this.scrollbarSize - this.scrollSpace - this.padding && e.y < this.canvas.height - this.scrollSpace + this.padding)
      return { type: "x", start: e.x, vpt: s };
    if (!this.hideY && e.y > this._barViewport.top && e.y < this._barViewport.bottom && e.x > this.canvas.width - this.scrollbarSize - this.scrollSpace - this.padding && e.x < this.canvas.width - this.scrollSpace + this.padding)
      return { type: "y", start: e.y, vpt: s };
  }
  mouseDownHandler(t) {
    if (this._bar = this.getScrollbar(t), !this._bar)
      return me.prototype.__onMouseDown.call(this.canvas, t);
  }
  mouseMoveHandler(t) {
    if (!this._bar) return me.prototype._onMouseMove.call(this.canvas, t);
    const e = this.canvas.getViewportPoint(t), s = this._bar.type == "x" ? this._barViewport.sx : this._barViewport.sy, r = this._bar.type == "x" ? 4 : 5, n = this._bar.type == "x" ? e.x : e.y, o = this._bar.vpt.slice(0);
    o[r] -= (n - this._bar.start) * s, this.applyViewportLimits(o), this.canvas.setViewportTransform(o), this.canvas.requestRenderAll();
  }
  mouseUpHandler(t) {
    this._bar || me.prototype._onMouseUp.call(this.canvas, t), delete this._bar;
  }
  beforeRenderHandler() {
    const t = this.canvas.contextTop;
    t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.restore();
  }
  afterRenderHandler() {
    const { tl: t, br: e } = this.canvas.vptCoords, s = { left: t.x, top: t.y, right: e.x, bottom: e.y }, r = this.getObjectsBoundingRect(), n = {
      left: Math.min(r.left, -this.offsetX),
      top: Math.min(r.top, -this.offsetY),
      right: r.right + this.extraMarginX,
      bottom: r.bottom + this.extraMarginY
    };
    if (n.left > s.left && (n.left = s.left), n.top > s.top && (n.top = s.top), n.bottom < s.bottom && (n.bottom = s.bottom), n.right < s.right && (n.right = s.right), this.render(this.canvas.contextTop, s, n), this.onViewportChange) {
      const o = t.x;
      this.onViewportChange(o);
    }
  }
  render(t, e, s) {
    this.hideX || t.clearRect(
      0,
      this.canvas.height - this.scrollbarSize - this.scrollSpace - this.lineWidth,
      this.canvas.width,
      this.scrollbarSize + this.scrollSpace + this.lineWidth
    ), this.hideY || t.clearRect(
      this.canvas.width - this.scrollbarSize - this.scrollSpace - this.lineWidth,
      0,
      this.scrollbarSize + this.scrollSpace + this.lineWidth,
      this.canvas.height
    ), t.save(), t.fillStyle = this.fill, t.strokeStyle = this.stroke, t.lineWidth = this.lineWidth, this.hideX || this.drawScrollbarX(t, e, s), this.hideY || this.drawScrollbarY(t, e, s), t.restore();
  }
  drawScrollbarX(t, e, s) {
    const r = e.right - e.left, n = s.right - s.left;
    if (r == n) {
      this._barViewport.left = 1, this._barViewport.right = -1, this._barViewport.sx = 1;
      return;
    }
    const o = Math.min(r / n, 1), a = this.canvas.width - this.scrollbarSize - this.scrollSpace * 2, c = Math.max(a * o | 0, this.scrollbarMinWidth), h = (e.left - s.left) / (n - r) * (a - c), l = this.scrollSpace + h, u = this.canvas.height - this.scrollbarSize - this.scrollSpace;
    this._barViewport.left = l, this._barViewport.right = l + c, this._barViewport.sx = n / r, this.drawRect(t, {
      x: l,
      y: u,
      w: c,
      h: this.scrollbarSize
    });
  }
  drawScrollbarY(t, e, s) {
    const r = e.bottom - e.top, n = s.bottom - s.top;
    if (r == n) {
      this._barViewport.top = 1, this._barViewport.bottom = -1, this._barViewport.sy = 1;
      return;
    }
    const o = Math.min(r / n, 1), a = this.canvas.height - this.scrollbarSize - this.scrollSpace * 2, c = Math.max(a * o | 0, this.scrollbarMinWidth), h = (e.top - s.top) / (n - r) * (a - c), l = this.canvas.width - this.scrollbarSize - this.scrollSpace, u = this.scrollSpace + h;
    this._barViewport.top = u, this._barViewport.bottom = u + c, this._barViewport.sy = n / r, this.drawRect(t, {
      x: l,
      y: u,
      w: this.scrollbarSize,
      h: c
    });
  }
  drawRect(t, e) {
    const { x: s, y: r, w: n, h: o } = e, a = Math.min(n, o) / 2;
    t.beginPath(), t.moveTo(s + a, r), t.lineTo(s + n - a, r), t.arcTo(s + n, r, s + n, r + a, a), t.lineTo(s + n, r + o - a), t.arcTo(s + n, r + o, s + n - a, r + o, a), t.lineTo(s + a, r + o), t.arcTo(s, r + o, s, r + o - a, a), t.lineTo(s, r + a), t.arcTo(s, r, s + a, r, a), t.closePath(), t.fill(), t.stroke();
  }
  getObjectsBoundingRect() {
    const t = this.canvas.getTrackItems();
    if (t.length === 0)
      return { left: 0, top: 0, right: 0, bottom: 0 };
    const { left: e, top: s, width: r, height: n } = zn.makeBoundingBoxFromPoints(
      t.map((o) => o.getCoords()).flat(1)
    );
    return { left: e, top: s, right: e + r, bottom: s + n };
  }
  applyViewportLimits(t) {
    const e = t[0], s = this.getObjectsBoundingRect(), r = Math.min(s.left, -this.offsetX), n = Math.min(s.top, -this.offsetY), o = s.right + this.extraMarginX, a = s.bottom + this.extraMarginY, c = o - r, h = a - n, l = this.canvas.width / e, u = this.canvas.height / e;
    if (c <= l)
      t[4] = -r * e;
    else {
      const d = this.offsetX * e;
      t[4] > d && (t[4] = d);
      const g = -((s.right + this.extraMarginX) * e - this.canvas.width);
      g < 0 && t[4] < g && (t[4] = g);
    }
    if (h <= u)
      t[5] = -n * e;
    else {
      const d = this.offsetY * e;
      t[5] > d && (t[5] = d);
      const g = -((s.bottom + this.extraMarginY) * e - this.canvas.height);
      g < 0 && t[5] < g && (t[5] = g);
    }
  }
  dispose() {
    this._originalMouseDown && (this.canvas.__onMouseDown = this._originalMouseDown), this._originalMouseMove && (this.canvas._onMouseMove = this._originalMouseMove), this._originalMouseUp && (this.canvas._onMouseUp = this._originalMouseUp), this.canvas.off("before:render", this.beforeRenderHandler), this.canvas.off("after:render", this.afterRenderHandler);
  }
}
const Ty = (i) => {
  const t = i.getTrackItems();
  if (t.length === 0)
    return { left: 0, top: 0, right: 0, bottom: 0 };
  const { left: e, top: s, width: r, height: n } = zn.makeBoundingBoxFromPoints(
    t.map((o) => o.getCoords()).flat(1)
  );
  return { left: e, top: s, right: e + r, bottom: s + n };
}, xy = (i, t, e = 0, s = 0, r = 200, n = 200) => {
  const o = t[0], a = Ty(i), c = Math.min(a.left, -e), h = Math.min(a.top, -s), l = a.right + r, u = a.bottom + n, d = l - c, g = u - h, f = i.width / o, p = i.height / o;
  if (d <= f)
    t[4] = -c * o;
  else {
    const m = e * o;
    t[4] > m && (t[4] = m);
    const b = -((a.right + r) * o - i.width);
    b < 0 && t[4] < b && (t[4] = b);
  }
  if (g <= p)
    t[5] = -h * o;
  else {
    const m = s * o;
    t[5] > m && (t[5] = m);
    const b = -((a.bottom + n) * o - i.height);
    b < 0 && t[5] < b && (t[5] = b);
  }
  return t;
}, wy = (i, t = {}) => (e) => {
  const s = e.e;
  s.target == i.upperCanvasEl && s.preventDefault();
  const r = Math.floor(s.deltaY) != Math.ceil(s.deltaY);
  if (s.ctrlKey || s.metaKey) {
    const a = r ? 0.99 : 0.998;
    let c = i.getZoom();
    c *= a ** s.deltaY, t.max != null && c > t.max && (c = t.max), t.min != null && c < t.min && (c = t.min), i.zoomToPoint(e.viewportPoint, c), i.requestRenderAll();
    return;
  }
  const n = i.viewportTransform.slice(0);
  s.shiftKey ? n[4] -= s.deltaY : (n[4] -= s.deltaX, n[5] -= s.deltaY);
  const o = xy(
    i,
    n,
    t.offsetX ?? 0,
    t.offsetY ?? 0,
    t.extraMarginX ?? 200,
    t.extraMarginY ?? 200
  );
  i.setViewportTransform(o), i.requestRenderAll();
}, Fs = class Fs extends sn {
  constructor(e, s) {
    var r;
    super(e, s);
    x(this, "itemTypes", []);
    x(this, "acceptsMap");
    x(this, "sizesMap", {});
    x(this, "objectTypes", []);
    // Declare properties from state
    x(this, "tracks", []);
    x(this, "hoverCornerItem", !1);
    x(this, "trackItemsMap", {});
    x(this, "trackItemIds", []);
    x(this, "transitionIds", []);
    x(this, "transitionsMap", {});
    x(this, "scale");
    x(this, "duration");
    x(this, "bounding");
    x(this, "onScroll");
    x(this, "onResizeCanvas");
    x(this, "tScale");
    x(this, "state");
    x(this, "activeIds", []);
    x(this, "spacing");
    x(this, "guideLineColor");
    x(this, "withTransitions", []);
    x(this, "_mouseWheelHandler");
    x(this, "_scrollbars");
    x(this, "_viewportChangeCallback");
    this.bounding = s.bounding || {
      width: s.width || 0,
      height: s.height || 0
    }, this.tScale = ((r = s.scale) == null ? void 0 : r.zoom) || 1, this.state = s.state, this.onScroll = s.onScroll, this.onResizeCanvas = s.onResizeCanvas, this.acceptsMap = s.acceptsMap || {}, this.sizesMap = s.sizesMap || {}, this.itemTypes = s.itemTypes || [], this.objectTypes = Fs.objectTypes, this.spacing = d0(s.spacing), this.positionAfterTransform = {}, this.initializeCanvasDefaults(), this.scale = s.scale, this.duration = s.duration, this.guideLineColor = s.guideLineColor || Ge, this.initEventListeners(), this.withTransitions = s.withTransitions || [];
  }
  static registerItems(e) {
    Object.keys(e).forEach((s) => {
      O.setClass(e[s], s);
    }), Fs.objectTypes = Object.keys(e).filter(
      (s) => !Rd.includes(s)
    );
  }
  initScrollbars(e = {}) {
    const s = {
      offsetX: e.offsetX ?? 0,
      offsetY: e.offsetY ?? 0,
      extraMarginX: e.extraMarginX ?? 200,
      extraMarginY: e.extraMarginY ?? 200,
      scrollbarWidth: e.scrollbarWidth,
      scrollbarColor: e.scrollbarColor,
      onViewportChange: (o) => {
        this._viewportChangeCallback && this._viewportChangeCallback(o);
      }
    };
    this._mouseWheelHandler = wy(this, s), this.on("mouse:wheel", this._mouseWheelHandler), this._scrollbars = new _y(this, s);
    const r = e.offsetX ?? 0, n = e.offsetY ?? 0;
    if (r !== 0 || n !== 0) {
      const o = this.viewportTransform.slice(0);
      o[4] = r, o[5] = n, this.setViewportTransform(o), this.requestRenderAll();
    }
  }
  onViewportChange(e) {
    this._viewportChangeCallback = e;
  }
  disposeScrollbars() {
    this._mouseWheelHandler && (this.off("mouse:wheel", this._mouseWheelHandler), this._mouseWheelHandler = void 0), this._scrollbars && (this._scrollbars.dispose(), this._scrollbars = void 0);
  }
  getItemAccepts(e) {
    return this.acceptsMap[e] || this.itemTypes;
  }
  getItemSize(e) {
    return this.sizesMap[e] || 42;
  }
  initializeCanvasDefaults() {
    const e = this.viewportTransform;
    e[4] = this.spacing.left, Object.assign(ot.ownDefaults, {
      borderColor: "transparent",
      cornerColor: "white",
      cornerStrokeColor: "transparent",
      strokeWidth: 0,
      borderOpacityWhenMoving: 1,
      borderScaleFactor: 1,
      cornerSize: 8,
      cornerStyle: "rect",
      centeredScaling: !1,
      centeredRotation: !0,
      transparentCorners: !1
    });
  }
  // detect if the mouse click does not land on any item -> clean the selection and generate another selection
  __onMouseDown(e) {
    const s = this.getScenePoint(e), r = this._activeObject, n = this.getActiveObjects();
    if (n.length === 0) {
      super.__onMouseDown(e);
      return;
    }
    const { isOverObject: o } = _a(
      s,
      n
    );
    if (r && (r == null ? void 0 : r.findControl(
      this.getViewportPoint(e),
      f0(e)
    ))) {
      super.__onMouseDown(e);
      return;
    }
    const a = this.getTrackItems(), c = this.getObjects("Transition"), { isOverObject: h, overObjects: l } = _a(
      s,
      [...c, ...a]
    );
    h ? o ? super.__onMouseDown(e) : (this.setActiveIds([l[0].id]), super.__onMouseDown(e)) : (this.discardActiveObject(), this.requestRenderAll(), this.setActiveIds([]), this._groupSelector = {
      x: s.x,
      y: s.y,
      deltaY: 0,
      deltaX: 0
    }, super.__onMouseDown(e));
  }
  _setupCurrentTransform(e, s, r) {
    var n;
    if (this.hoverCornerItem) {
      const o = this.getScenePoint(e), { key: a = "", control: c } = s.getActiveControl() || {}, h = c && ((n = c.getActionHandler(e, s, c)) == null ? void 0 : n.bind(c)), l = this._getOriginFromCorner(s, a), u = {
        target: s,
        action: "resizing",
        actionHandler: h,
        actionPerformed: !1,
        corner: a,
        scaleX: s.scaleX,
        scaleY: s.scaleY,
        skewX: s.skewX,
        skewY: s.skewY,
        offsetX: o.x - s.left,
        offsetY: o.y - s.top,
        originX: l.x,
        originY: l.y,
        ex: o.x,
        ey: o.y,
        lastX: o.x,
        lastY: o.y,
        theta: s.angle * Math.PI / 180,
        width: s.width,
        height: s.height,
        shiftKey: e.shiftKey,
        altKey: !1,
        original: {
          scaleX: s.scaleX,
          scaleY: s.scaleY,
          skewX: s.skewX,
          skewY: s.skewY,
          angle: s.angle,
          left: s.left,
          flipX: s.flipX,
          flipY: s.flipY,
          top: s.top,
          originX: l.x,
          originY: l.y
        }
      };
      this._currentTransform = u, this.fire("before:transform", {
        e,
        transform: u
      });
    } else
      super._setupCurrentTransform(e, s, r);
  }
  initEventListeners() {
    fy(this), ly(this), vy(this);
  }
  setActiveIds(e) {
    this.activeIds = e, this.state.updateState(
      {
        activeIds: by(this.activeIds)
      },
      {
        kind: "layer:selection",
        updateHistory: !1
      }
    );
  }
  updateState(e = { updateHistory: !1 }) {
    this.filterEmptyTracks(), this.synchronizeTrackItemsState(), this.requestRenderAll(), this.duration = Ar(this.trackItemsMap), this.calcBounding(), this.refreshTrackLayout(), this.setTrackItemCoords();
    const s = this.getUpdatedState();
    this.state.updateState(s, e);
  }
  getUpdatedState() {
    const e = Ar(this.trackItemsMap);
    return {
      tracks: this.tracks,
      trackItemIds: this.trackItemIds,
      trackItemsMap: this.trackItemsMap,
      transitionIds: this.transitionIds,
      transitionsMap: this.transitionsMap,
      scale: this.scale,
      duration: e
    };
  }
  getDurationBasedOnTrackItemsPosition() {
    const e = this.getTrackItems().map((n) => n.getBoundingRect()), s = e.reduce((n, o) => n.left + n.width < o.left + o.width ? o : n, e[0]), r = s.left + s.width;
    return L(r, this.tScale);
  }
  notify(e = { updateHistory: !1 }) {
    const s = this.getUpdatedState();
    this.state.updateState(s, e);
  }
  getState() {
    const e = Ar(this.trackItemsMap);
    return {
      tracks: this.tracks,
      trackItemIds: this.trackItemIds,
      trackItemsMap: this.trackItemsMap,
      transitionIds: this.transitionIds,
      transitionsMap: this.transitionsMap,
      scale: this.scale,
      duration: e
    };
  }
  purge() {
    uy(this), py(this), yy(), this.disposeScrollbars(), this.dispose();
  }
  scrollTo({
    scrollLeft: e,
    scrollTop: s
  }) {
    var o;
    const r = [...this.viewportTransform];
    let n = !1;
    typeof e == "number" && (r[4] = -e + this.spacing.left, n = !0), typeof s == "number" && (r[5] = -s, n = !0), n && (this.viewportTransform = r, (o = this.getActiveObject()) == null || o.setCoords(), this.requestRenderAll());
  }
  setBounding(e) {
    this.bounding = e;
  }
  calcBounding() {
    const e = this.getObjects("Track").filter(
      (c) => c.static
    ), s = [...this.getTrackItems(), ...e].reduce(
      (c, h) => {
        const { top: l, height: u } = h.getBoundingRect();
        return {
          top: Math.min(c.top, l),
          height: Math.max(c.height, l + u)
        };
      },
      {
        top: 1 / 0,
        height: 0
      }
    ), r = [...this.getTrackItems()].reduce(
      (c, h) => {
        const { left: l, width: u } = h.getBoundingRect();
        return {
          left: Math.min(c.left, l),
          width: Math.max(c.width, l + u)
        };
      },
      {
        left: 1 / 0,
        width: this.width
      }
    ), n = this.bounding.width, o = r.width, a = o - n;
    if (a < 0) {
      const c = this.getTrackItems(), h = this.getElement().clientWidth, l = c.reduce(
        (u, d) => d.left + d.width > u.left + u.width ? d : u,
        c[0]
      );
      Math.abs(a) > h ? this.setViewportPos(
        -(o - h) + this.spacing.right,
        this.viewportTransform[5]
      ) : l.left + l.width <= h ? this.setViewportPos(16, this.viewportTransform[5]) : this.setViewportPos(
        this.viewportTransform[4] - a,
        this.viewportTransform[5]
      );
    }
    this.bounding = {
      ...s,
      ...r
    }, Qt(Y0, {
      payload: {
        bounding: {
          ...s,
          ...r
        }
      }
    });
  }
  setViewportPos(e, s) {
    var o;
    const r = this.getViewportPos(e, s), n = this.viewportTransform;
    n[4] = r.x, n[5] = r.y, this.requestRenderAll(), this.setActiveTrackItemCoords(), (o = this.onScroll) == null || o.call(this, {
      scrollTop: r.y,
      scrollLeft: r.x - this.spacing.left
    });
  }
  getViewportPos(e, s) {
    const r = this, n = this.bounding.width - 100 >= r.width ? this.spacing.right : 0, o = r.width - this.bounding.width - n, a = this.spacing.left, c = Math.max(o, Math.min(e, a));
    if (this.bounding.height < this.height)
      return { x: c, y: 0 };
    const h = r.height - this.bounding.height - 40, u = Math.max(h, Math.min(s, 0));
    return { x: c, y: u };
  }
  setScale(e) {
    this.pauseEventListeners(), this.tScale = e.zoom, this.scale = e, this.getTrackItems().forEach((r) => {
      const n = nt(r.display.from, this.tScale), o = nt(
        r.display.to - r.display.from,
        this.tScale,
        r.playbackRate
      );
      r.set({ left: n, width: o, tScale: e.zoom }), r.onScale && r.onScale(), r.setCoords();
    }), this.requestRenderAll(), this.calcBounding(), this.refreshTrackLayout(), this.updateTransitions(!1), this.resumeEventListeners();
  }
};
x(Fs, "objectTypes", []);
let me = Fs;
my(me, [
  cg,
  e0,
  t0,
  dy
]);
const Ey = {
  audio: on,
  media: hn,
  common: an,
  transition: cn
};
export {
  ky as BOTTOM,
  Xe as CENTER,
  V as Control,
  Yh as DRAG_END,
  Hh as DRAG_PREFIX,
  H0 as DRAG_START,
  ot as FabricObject,
  Te as Helper,
  Qs as LEFT,
  My as NONE,
  Di as Pattern,
  Hs as Placeholder,
  xe as PreviewTrackItem,
  tr as RIGHT,
  tt as Rect,
  ln as Resizable,
  Y0 as TIMELINE_BOUNDING_CHANGED,
  Vh as TIMELINE_PREFIX,
  V0 as TIMELINE_SEEK,
  Oy as TOP,
  Vt as Track,
  Nt as Transition,
  se as Trimmable,
  Dy as calculateTimelineWidth,
  an as changeWidth,
  O as classRegistry,
  ys as controlsUtils,
  Iy as createAudioControls,
  sg as createMediaControls,
  eg as createResizeControls,
  jy as createTemplateControls,
  eh as createTransitionControls,
  me as default,
  Yt as drawVerticalLine,
  Os as generateId,
  Ar as getDuration,
  er as isTransformCentered,
  Ey as resize,
  I as resolveOrigin,
  nt as timeMsToUnits,
  L as unitsToTimeMs,
  zn as util,
  fi as wrapWithFixedAnchor
};
