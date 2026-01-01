var Hs = Object.defineProperty;
var Us = (t, r, e) => r in t ? Hs(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var Vt = (t, r, e) => Us(t, typeof r != "symbol" ? r + "" : r, e);
import { subject as qt, filter as Jt, dispatch as Ws } from "@designcombo/events";
var bn = function(t, r) {
  return bn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s]);
  }, bn(t, r);
};
function rr(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  bn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
function kn(t) {
  var r = typeof Symbol == "function" && Symbol.iterator, e = r && t[r], n = 0;
  if (e) return e.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function vn(t, r) {
  var e = typeof Symbol == "function" && t[Symbol.iterator];
  if (!e) return t;
  var n = e.call(t), s, a = [], u;
  try {
    for (; (r === void 0 || r-- > 0) && !(s = n.next()).done; ) a.push(s.value);
  } catch (c) {
    u = { error: c };
  } finally {
    try {
      s && !s.done && (e = n.return) && e.call(n);
    } finally {
      if (u) throw u.error;
    }
  }
  return a;
}
function _n(t, r, e) {
  if (e || arguments.length === 2) for (var n = 0, s = r.length, a; n < s; n++)
    (a || !(n in r)) && (a || (a = Array.prototype.slice.call(r, 0, n)), a[n] = r[n]);
  return t.concat(a || Array.prototype.slice.call(r));
}
function Dt(t) {
  return typeof t == "function";
}
function os(t) {
  var r = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, e = t(r);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var pn = os(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(n, s) {
      return s + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function Sn(t, r) {
  if (t) {
    var e = t.indexOf(r);
    0 <= e && t.splice(e, 1);
  }
}
var Mr = function() {
  function t(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var r, e, n, s, a;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var c = kn(u), d = c.next(); !d.done; d = c.next()) {
              var p = d.value;
              p.remove(this);
            }
          } catch (b) {
            r = { error: b };
          } finally {
            try {
              d && !d.done && (e = c.return) && e.call(c);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          u.remove(this);
      var h = this.initialTeardown;
      if (Dt(h))
        try {
          h();
        } catch (b) {
          a = b instanceof pn ? b.errors : [b];
        }
      var y = this._finalizers;
      if (y) {
        this._finalizers = null;
        try {
          for (var m = kn(y), I = m.next(); !I.done; I = m.next()) {
            var k = I.value;
            try {
              Wn(k);
            } catch (b) {
              a = a ?? [], b instanceof pn ? a = _n(_n([], vn(a)), vn(b.errors)) : a.push(b);
            }
          }
        } catch (b) {
          n = { error: b };
        } finally {
          try {
            I && !I.done && (s = m.return) && s.call(m);
          } finally {
            if (n) throw n.error;
          }
        }
      }
      if (a)
        throw new pn(a);
    }
  }, t.prototype.add = function(r) {
    var e;
    if (r && r !== this)
      if (this.closed)
        Wn(r);
      else {
        if (r instanceof t) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(r);
      }
  }, t.prototype._hasParent = function(r) {
    var e = this._parentage;
    return e === r || Array.isArray(e) && e.includes(r);
  }, t.prototype._addParent = function(r) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(r), e) : e ? [e, r] : r;
  }, t.prototype._removeParent = function(r) {
    var e = this._parentage;
    e === r ? this._parentage = null : Array.isArray(e) && Sn(e, r);
  }, t.prototype.remove = function(r) {
    var e = this._finalizers;
    e && Sn(e, r), r instanceof t && r._removeParent(this);
  }, t.EMPTY = function() {
    var r = new t();
    return r.closed = !0, r;
  }(), t;
}(), cs = Mr.EMPTY;
function us(t) {
  return t instanceof Mr || t && "closed" in t && Dt(t.remove) && Dt(t.add) && Dt(t.unsubscribe);
}
function Wn(t) {
  Dt(t) ? t() : t.unsubscribe();
}
var js = {
  Promise: void 0
}, Bs = {
  setTimeout: function(t, r) {
    for (var e = [], n = 2; n < arguments.length; n++)
      e[n - 2] = arguments[n];
    return setTimeout.apply(void 0, _n([t, r], vn(e)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function Ys(t) {
  Bs.setTimeout(function() {
    throw t;
  });
}
function jn() {
}
function kr(t) {
  t();
}
var ls = function(t) {
  rr(r, t);
  function r(e) {
    var n = t.call(this) || this;
    return n.isStopped = !1, e ? (n.destination = e, us(e) && e.add(n)) : n.destination = Ks, n;
  }
  return r.create = function(e, n, s) {
    return new wn(e, n, s);
  }, r.prototype.next = function(e) {
    this.isStopped || this._next(e);
  }, r.prototype.error = function(e) {
    this.isStopped || (this.isStopped = !0, this._error(e));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(e) {
    this.destination.next(e);
  }, r.prototype._error = function(e) {
    try {
      this.destination.error(e);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
}(Mr), Gs = function() {
  function t(r) {
    this.partialObserver = r;
  }
  return t.prototype.next = function(r) {
    var e = this.partialObserver;
    if (e.next)
      try {
        e.next(r);
      } catch (n) {
        br(n);
      }
  }, t.prototype.error = function(r) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(r);
      } catch (n) {
        br(n);
      }
    else
      br(r);
  }, t.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (e) {
        br(e);
      }
  }, t;
}(), wn = function(t) {
  rr(r, t);
  function r(e, n, s) {
    var a = t.call(this) || this, u;
    return Dt(e) || !e ? u = {
      next: e ?? void 0,
      error: n ?? void 0,
      complete: s ?? void 0
    } : u = e, a.destination = new Gs(u), a;
  }
  return r;
}(ls);
function br(t) {
  Ys(t);
}
function Xs(t) {
  throw t;
}
var Ks = {
  closed: !0,
  next: jn,
  error: Xs,
  complete: jn
}, Vs = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function qs(t) {
  return t;
}
function Js(t) {
  return t.length === 0 ? qs : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(n, s) {
      return s(n);
    }, e);
  };
}
var Bn = function() {
  function t(r) {
    r && (this._subscribe = r);
  }
  return t.prototype.lift = function(r) {
    var e = new t();
    return e.source = this, e.operator = r, e;
  }, t.prototype.subscribe = function(r, e, n) {
    var s = this, a = Qs(r) ? r : new wn(r, e, n);
    return kr(function() {
      var u = s, c = u.operator, d = u.source;
      a.add(c ? c.call(a, d) : d ? s._subscribe(a) : s._trySubscribe(a));
    }), a;
  }, t.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (e) {
      r.error(e);
    }
  }, t.prototype.forEach = function(r, e) {
    var n = this;
    return e = Yn(e), new e(function(s, a) {
      var u = new wn({
        next: function(c) {
          try {
            r(c);
          } catch (d) {
            a(d), u.unsubscribe();
          }
        },
        error: a,
        complete: s
      });
      n.subscribe(u);
    });
  }, t.prototype._subscribe = function(r) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(r);
  }, t.prototype[Vs] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var r = [], e = 0; e < arguments.length; e++)
      r[e] = arguments[e];
    return Js(r)(this);
  }, t.prototype.toPromise = function(r) {
    var e = this;
    return r = Yn(r), new r(function(n, s) {
      var a;
      e.subscribe(function(u) {
        return a = u;
      }, function(u) {
        return s(u);
      }, function() {
        return n(a);
      });
    });
  }, t.create = function(r) {
    return new t(r);
  }, t;
}();
function Yn(t) {
  var r;
  return (r = t ?? js.Promise) !== null && r !== void 0 ? r : Promise;
}
function Zs(t) {
  return t && Dt(t.next) && Dt(t.error) && Dt(t.complete);
}
function Qs(t) {
  return t && t instanceof ls || Zs(t) && us(t);
}
var ti = os(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), ds = function(t) {
  rr(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return r.prototype.lift = function(e) {
    var n = new Gn(this, this);
    return n.operator = e, n;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new ti();
  }, r.prototype.next = function(e) {
    var n = this;
    kr(function() {
      var s, a;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var u = kn(n.currentObservers), c = u.next(); !c.done; c = u.next()) {
            var d = c.value;
            d.next(e);
          }
        } catch (p) {
          s = { error: p };
        } finally {
          try {
            c && !c.done && (a = u.return) && a.call(u);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, r.prototype.error = function(e) {
    var n = this;
    kr(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = e;
        for (var s = n.observers; s.length; )
          s.shift().error(e);
      }
    });
  }, r.prototype.complete = function() {
    var e = this;
    kr(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = !0;
        for (var n = e.observers; n.length; )
          n.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var e;
      return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, e);
  }, r.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, r.prototype._innerSubscribe = function(e) {
    var n = this, s = this, a = s.hasError, u = s.isStopped, c = s.observers;
    return a || u ? cs : (this.currentObservers = null, c.push(e), new Mr(function() {
      n.currentObservers = null, Sn(c, e);
    }));
  }, r.prototype._checkFinalizedStatuses = function(e) {
    var n = this, s = n.hasError, a = n.thrownError, u = n.isStopped;
    s ? e.error(a) : u && e.complete();
  }, r.prototype.asObservable = function() {
    var e = new Bn();
    return e.source = this, e;
  }, r.create = function(e, n) {
    return new Gn(e, n);
  }, r;
}(Bn), Gn = function(t) {
  rr(r, t);
  function r(e, n) {
    var s = t.call(this) || this;
    return s.destination = e, s.source = n, s;
  }
  return r.prototype.next = function(e) {
    var n, s;
    (s = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || s === void 0 || s.call(n, e);
  }, r.prototype.error = function(e) {
    var n, s;
    (s = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || s === void 0 || s.call(n, e);
  }, r.prototype.complete = function() {
    var e, n;
    (n = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || n === void 0 || n.call(e);
  }, r.prototype._subscribe = function(e) {
    var n, s;
    return (s = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e)) !== null && s !== void 0 ? s : cs;
  }, r;
}(ds), Xn = function(t) {
  rr(r, t);
  function r(e) {
    var n = t.call(this) || this;
    return n._value = e, n;
  }
  return Object.defineProperty(r.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._subscribe = function(e) {
    var n = t.prototype._subscribe.call(this, e);
    return !n.closed && e.next(this._value), n;
  }, r.prototype.getValue = function() {
    var e = this, n = e.hasError, s = e.thrownError, a = e._value;
    if (n)
      throw s;
    return this._throwIfClosed(), a;
  }, r.prototype.next = function(e) {
    t.prototype.next.call(this, this._value = e);
  }, r;
}(ds), ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var vr = { exports: {} };
vr.exports;
(function(t, r) {
  var e = 200, n = "__lodash_hash_undefined__", s = 1, a = 2, u = 9007199254740991, c = "[object Arguments]", d = "[object Array]", p = "[object AsyncFunction]", h = "[object Boolean]", y = "[object Date]", m = "[object Error]", I = "[object Function]", k = "[object GeneratorFunction]", b = "[object Map]", S = "[object Number]", f = "[object Null]", v = "[object Object]", T = "[object Promise]", w = "[object Proxy]", E = "[object RegExp]", _ = "[object Set]", M = "[object String]", L = "[object Symbol]", R = "[object Undefined]", G = "[object WeakMap]", x = "[object ArrayBuffer]", F = "[object DataView]", et = "[object Float32Array]", Qt = "[object Float64Array]", te = "[object Int8Array]", Se = "[object Int16Array]", we = "[object Int32Array]", Te = "[object Uint8Array]", Me = "[object Uint8ClampedArray]", z = "[object Uint16Array]", Ee = "[object Uint32Array]", Ae = /[\\^$.*+?()[\]{}|]/g, st = /^\[object .+?Constructor\]$/, ee = /^(?:0|[1-9]\d*)$/, $ = {};
  $[et] = $[Qt] = $[te] = $[Se] = $[we] = $[Te] = $[Me] = $[z] = $[Ee] = !0, $[c] = $[d] = $[x] = $[h] = $[F] = $[y] = $[m] = $[I] = $[b] = $[S] = $[v] = $[E] = $[_] = $[M] = $[G] = !1;
  var re = typeof ft == "object" && ft && ft.Object === Object && ft, xe = typeof self == "object" && self && self.Object === Object && self, it = re || xe || Function("return this")(), ne = r && !r.nodeType && r, se = ne && !0 && t && !t.nodeType && t, $t = se && se.exports === ne, Ft = $t && re.process, ie = function() {
    try {
      return Ft && Ft.binding && Ft.binding("util");
    } catch {
    }
  }(), Nt = ie && ie.isTypedArray;
  function ae(i, o) {
    for (var l = -1, g = i == null ? 0 : i.length, O = 0, A = []; ++l < g; ) {
      var D = i[l];
      o(D, l, i) && (A[O++] = D);
    }
    return A;
  }
  function Lt(i, o) {
    for (var l = -1, g = o.length, O = i.length; ++l < g; )
      i[O + l] = o[l];
    return i;
  }
  function oe(i, o) {
    for (var l = -1, g = i == null ? 0 : i.length; ++l < g; )
      if (o(i[l], l, i))
        return !0;
    return !1;
  }
  function Oe(i, o) {
    for (var l = -1, g = Array(i); ++l < i; )
      g[l] = o(l);
    return g;
  }
  function Ce(i) {
    return function(o) {
      return i(o);
    };
  }
  function wt(i, o) {
    return i.has(o);
  }
  function Ht(i, o) {
    return i == null ? void 0 : i[o];
  }
  function ce(i) {
    var o = -1, l = Array(i.size);
    return i.forEach(function(g, O) {
      l[++o] = [O, g];
    }), l;
  }
  function ue(i, o) {
    return function(l) {
      return i(o(l));
    };
  }
  function ut(i) {
    var o = -1, l = Array(i.size);
    return i.forEach(function(g) {
      l[++o] = g;
    }), l;
  }
  var Tt = Array.prototype, Re = Function.prototype, yt = Object.prototype, Mt = it["__core-js_shared__"], Ut = Re.toString, rt = yt.hasOwnProperty, le = function() {
    var i = /[^.]+$/.exec(Mt && Mt.keys && Mt.keys.IE_PROTO || "");
    return i ? "Symbol(src)_1." + i : "";
  }(), de = yt.toString, Pe = RegExp(
    "^" + Ut.call(rt).replace(Ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Wt = $t ? it.Buffer : void 0, Et = it.Symbol, fe = it.Uint8Array, At = yt.propertyIsEnumerable, gt = Tt.splice, at = Et ? Et.toStringTag : void 0, xt = Object.getOwnPropertySymbols, jt = Wt ? Wt.isBuffer : void 0, It = ue(Object.keys, Object), Bt = Ct(it, "DataView"), bt = Ct(it, "Map"), Yt = Ct(it, "Promise"), Gt = Ct(it, "Set"), We = Ct(it, "WeakMap"), Xt = Ct(Object, "create"), ar = nt(Bt), Ot = nt(bt), xr = nt(Yt), Or = nt(Gt), Cr = nt(We), or = Et ? Et.prototype : void 0, je = or ? or.valueOf : void 0;
  function X(i) {
    var o = -1, l = i == null ? 0 : i.length;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function Rr() {
    this.__data__ = Xt ? Xt(null) : {}, this.size = 0;
  }
  function Pr(i) {
    var o = this.has(i) && delete this.__data__[i];
    return this.size -= o ? 1 : 0, o;
  }
  function Dr(i) {
    var o = this.__data__;
    if (Xt) {
      var l = o[i];
      return l === n ? void 0 : l;
    }
    return rt.call(o, i) ? o[i] : void 0;
  }
  function zr(i) {
    var o = this.__data__;
    return Xt ? o[i] !== void 0 : rt.call(o, i);
  }
  function $r(i, o) {
    var l = this.__data__;
    return this.size += this.has(i) ? 0 : 1, l[i] = Xt && o === void 0 ? n : o, this;
  }
  X.prototype.clear = Rr, X.prototype.delete = Pr, X.prototype.get = Dr, X.prototype.has = zr, X.prototype.set = $r;
  function J(i) {
    var o = -1, l = i == null ? 0 : i.length;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function Fr() {
    this.__data__ = [], this.size = 0;
  }
  function Nr(i) {
    var o = this.__data__, l = $e(o, i);
    if (l < 0)
      return !1;
    var g = o.length - 1;
    return l == g ? o.pop() : gt.call(o, l, 1), --this.size, !0;
  }
  function Lr(i) {
    var o = this.__data__, l = $e(o, i);
    return l < 0 ? void 0 : o[l][1];
  }
  function Hr(i) {
    return $e(this.__data__, i) > -1;
  }
  function Ur(i, o) {
    var l = this.__data__, g = $e(l, i);
    return g < 0 ? (++this.size, l.push([i, o])) : l[g][1] = o, this;
  }
  J.prototype.clear = Fr, J.prototype.delete = Nr, J.prototype.get = Lr, J.prototype.has = Hr, J.prototype.set = Ur;
  function ot(i) {
    var o = -1, l = i == null ? 0 : i.length;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function Wr() {
    this.size = 0, this.__data__ = {
      hash: new X(),
      map: new (bt || J)(),
      string: new X()
    };
  }
  function jr(i) {
    var o = mt(this, i).delete(i);
    return this.size -= o ? 1 : 0, o;
  }
  function Br(i) {
    return mt(this, i).get(i);
  }
  function Yr(i) {
    return mt(this, i).has(i);
  }
  function Gr(i, o) {
    var l = mt(this, i), g = l.size;
    return l.set(i, o), this.size += l.size == g ? 0 : 1, this;
  }
  ot.prototype.clear = Wr, ot.prototype.delete = jr, ot.prototype.get = Br, ot.prototype.has = Yr, ot.prototype.set = Gr;
  function De(i) {
    var o = -1, l = i == null ? 0 : i.length;
    for (this.__data__ = new ot(); ++o < l; )
      this.add(i[o]);
  }
  function cr(i) {
    return this.__data__.set(i, n), this;
  }
  function ze(i) {
    return this.__data__.has(i);
  }
  De.prototype.add = De.prototype.push = cr, De.prototype.has = ze;
  function kt(i) {
    var o = this.__data__ = new J(i);
    this.size = o.size;
  }
  function Be() {
    this.__data__ = new J(), this.size = 0;
  }
  function Xr(i) {
    var o = this.__data__, l = o.delete(i);
    return this.size = o.size, l;
  }
  function Kr(i) {
    return this.__data__.get(i);
  }
  function Vr(i) {
    return this.__data__.has(i);
  }
  function qr(i, o) {
    var l = this.__data__;
    if (l instanceof J) {
      var g = l.__data__;
      if (!bt || g.length < e - 1)
        return g.push([i, o]), this.size = ++l.size, this;
      l = this.__data__ = new ot(g);
    }
    return l.set(i, o), this.size = l.size, this;
  }
  kt.prototype.clear = Be, kt.prototype.delete = Xr, kt.prototype.get = Kr, kt.prototype.has = Vr, kt.prototype.set = qr;
  function Jr(i, o) {
    var l = Fe(i), g = !l && pr(i), O = !l && !g && Ne(i), A = !l && !g && !O && yr(i), D = l || g || O || A, P = D ? Oe(i.length, String) : [], U = P.length;
    for (var N in i)
      rt.call(i, N) && !(D && // Safari 9 has enumerable `arguments.length` in strict mode.
      (N == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      O && (N == "offset" || N == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      A && (N == "buffer" || N == "byteLength" || N == "byteOffset") || // Skip index properties.
      an(N, U))) && P.push(N);
    return P;
  }
  function $e(i, o) {
    for (var l = i.length; l--; )
      if (fr(i[l][0], o))
        return l;
    return -1;
  }
  function Ye(i, o, l) {
    var g = o(i);
    return Fe(i) ? g : Lt(g, l(i));
  }
  function pe(i) {
    return i == null ? i === void 0 ? R : f : at && at in Object(i) ? Rt(i) : dr(i);
  }
  function ur(i) {
    return _t(i) && pe(i) == c;
  }
  function lr(i, o, l, g, O) {
    return i === o ? !0 : i == null || o == null || !_t(i) && !_t(o) ? i !== i && o !== o : Zr(i, o, l, g, lr, O);
  }
  function Zr(i, o, l, g, O, A) {
    var D = Fe(i), P = Fe(o), U = D ? d : vt(i), N = P ? d : vt(o);
    U = U == c ? v : U, N = N == c ? v : N;
    var Z = U == v, ct = N == v, B = U == N;
    if (B && Ne(i)) {
      if (!Ne(o))
        return !1;
      D = !0, Z = !1;
    }
    if (B && !Z)
      return A || (A = new kt()), D || yr(i) ? Ge(i, o, l, g, O, A) : rn(i, o, U, l, g, O, A);
    if (!(l & s)) {
      var Q = Z && rt.call(i, "__wrapped__"), K = ct && rt.call(o, "__wrapped__");
      if (Q || K) {
        var Kt = Q ? i.value() : i, Pt = K ? o.value() : o;
        return A || (A = new kt()), O(Kt, Pt, l, g, A);
      }
    }
    return B ? (A || (A = new kt()), nn(i, o, l, g, O, A)) : !1;
  }
  function Qr(i) {
    if (!mr(i) || cn(i))
      return !1;
    var o = hr(i) ? Pe : st;
    return o.test(nt(i));
  }
  function tn(i) {
    return _t(i) && Ke(i.length) && !!$[pe(i)];
  }
  function en(i) {
    if (!un(i))
      return It(i);
    var o = [];
    for (var l in Object(i))
      rt.call(i, l) && l != "constructor" && o.push(l);
    return o;
  }
  function Ge(i, o, l, g, O, A) {
    var D = l & s, P = i.length, U = o.length;
    if (P != U && !(D && U > P))
      return !1;
    var N = A.get(i);
    if (N && A.get(o))
      return N == o;
    var Z = -1, ct = !0, B = l & a ? new De() : void 0;
    for (A.set(i, o), A.set(o, i); ++Z < P; ) {
      var Q = i[Z], K = o[Z];
      if (g)
        var Kt = D ? g(K, Q, Z, o, i, A) : g(Q, K, Z, i, o, A);
      if (Kt !== void 0) {
        if (Kt)
          continue;
        ct = !1;
        break;
      }
      if (B) {
        if (!oe(o, function(Pt, me) {
          if (!wt(B, me) && (Q === Pt || O(Q, Pt, l, g, A)))
            return B.push(me);
        })) {
          ct = !1;
          break;
        }
      } else if (!(Q === K || O(Q, K, l, g, A))) {
        ct = !1;
        break;
      }
    }
    return A.delete(i), A.delete(o), ct;
  }
  function rn(i, o, l, g, O, A, D) {
    switch (l) {
      case F:
        if (i.byteLength != o.byteLength || i.byteOffset != o.byteOffset)
          return !1;
        i = i.buffer, o = o.buffer;
      case x:
        return !(i.byteLength != o.byteLength || !A(new fe(i), new fe(o)));
      case h:
      case y:
      case S:
        return fr(+i, +o);
      case m:
        return i.name == o.name && i.message == o.message;
      case E:
      case M:
        return i == o + "";
      case b:
        var P = ce;
      case _:
        var U = g & s;
        if (P || (P = ut), i.size != o.size && !U)
          return !1;
        var N = D.get(i);
        if (N)
          return N == o;
        g |= a, D.set(i, o);
        var Z = Ge(P(i), P(o), g, O, A, D);
        return D.delete(i), Z;
      case L:
        if (je)
          return je.call(i) == je.call(o);
    }
    return !1;
  }
  function nn(i, o, l, g, O, A) {
    var D = l & s, P = he(i), U = P.length, N = he(o), Z = N.length;
    if (U != Z && !D)
      return !1;
    for (var ct = U; ct--; ) {
      var B = P[ct];
      if (!(D ? B in o : rt.call(o, B)))
        return !1;
    }
    var Q = A.get(i);
    if (Q && A.get(o))
      return Q == o;
    var K = !0;
    A.set(i, o), A.set(o, i);
    for (var Kt = D; ++ct < U; ) {
      B = P[ct];
      var Pt = i[B], me = o[B];
      if (g)
        var Un = D ? g(me, Pt, B, o, i, A) : g(Pt, me, B, i, o, A);
      if (!(Un === void 0 ? Pt === me || O(Pt, me, l, g, A) : Un)) {
        K = !1;
        break;
      }
      Kt || (Kt = B == "constructor");
    }
    if (K && !Kt) {
      var gr = i.constructor, Ir = o.constructor;
      gr != Ir && "constructor" in i && "constructor" in o && !(typeof gr == "function" && gr instanceof gr && typeof Ir == "function" && Ir instanceof Ir) && (K = !1);
    }
    return A.delete(i), A.delete(o), K;
  }
  function he(i) {
    return Ye(i, Ve, sn);
  }
  function mt(i, o) {
    var l = i.__data__;
    return on(o) ? l[typeof o == "string" ? "string" : "hash"] : l.map;
  }
  function Ct(i, o) {
    var l = Ht(i, o);
    return Qr(l) ? l : void 0;
  }
  function Rt(i) {
    var o = rt.call(i, at), l = i[at];
    try {
      i[at] = void 0;
      var g = !0;
    } catch {
    }
    var O = de.call(i);
    return g && (o ? i[at] = l : delete i[at]), O;
  }
  var sn = xt ? function(i) {
    return i == null ? [] : (i = Object(i), ae(xt(i), function(o) {
      return At.call(i, o);
    }));
  } : dn, vt = pe;
  (Bt && vt(new Bt(new ArrayBuffer(1))) != F || bt && vt(new bt()) != b || Yt && vt(Yt.resolve()) != T || Gt && vt(new Gt()) != _ || We && vt(new We()) != G) && (vt = function(i) {
    var o = pe(i), l = o == v ? i.constructor : void 0, g = l ? nt(l) : "";
    if (g)
      switch (g) {
        case ar:
          return F;
        case Ot:
          return b;
        case xr:
          return T;
        case Or:
          return _;
        case Cr:
          return G;
      }
    return o;
  });
  function an(i, o) {
    return o = o ?? u, !!o && (typeof i == "number" || ee.test(i)) && i > -1 && i % 1 == 0 && i < o;
  }
  function on(i) {
    var o = typeof i;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? i !== "__proto__" : i === null;
  }
  function cn(i) {
    return !!le && le in i;
  }
  function un(i) {
    var o = i && i.constructor, l = typeof o == "function" && o.prototype || yt;
    return i === l;
  }
  function dr(i) {
    return de.call(i);
  }
  function nt(i) {
    if (i != null) {
      try {
        return Ut.call(i);
      } catch {
      }
      try {
        return i + "";
      } catch {
      }
    }
    return "";
  }
  function fr(i, o) {
    return i === o || i !== i && o !== o;
  }
  var pr = ur(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ur : function(i) {
    return _t(i) && rt.call(i, "callee") && !At.call(i, "callee");
  }, Fe = Array.isArray;
  function Xe(i) {
    return i != null && Ke(i.length) && !hr(i);
  }
  var Ne = jt || fn;
  function ln(i, o) {
    return lr(i, o);
  }
  function hr(i) {
    if (!mr(i))
      return !1;
    var o = pe(i);
    return o == I || o == k || o == p || o == w;
  }
  function Ke(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= u;
  }
  function mr(i) {
    var o = typeof i;
    return i != null && (o == "object" || o == "function");
  }
  function _t(i) {
    return i != null && typeof i == "object";
  }
  var yr = Nt ? Ce(Nt) : tn;
  function Ve(i) {
    return Xe(i) ? Jr(i) : en(i);
  }
  function dn() {
    return [];
  }
  function fn() {
    return !1;
  }
  t.exports = ln;
})(vr, vr.exports);
var ei = vr.exports;
const W = /* @__PURE__ */ Cn(ei), So = "add", ri = "track", ni = "trackItems", wo = `${ri}:changed`, To = `${ni}:changed`, si = "state", Mo = `${si}:changed`, ii = "bulk", Kn = `${ii}:edit`, Rn = "design", ai = `${Rn}:load`, oi = `${Rn}:resize`, H = "add", ci = `${H}:text`, ui = `${H}:video`, li = `${H}:audio`, Eo = `${H}:placeholder`, di = `${H}:image`, fi = `${H}:illustration`, pi = `${H}:shape`, Ao = `${H}:mask`, xo = `${H}:transition`, hi = `${H}:animation`, mi = `${H}:caption`, yi = `${H}:template`, gi = `${H}:items`, Ii = `${H}:composition`, bi = `${H}:progressBar`, ki = `${H}:progressFrame`, vi = `${H}:radialAudioBars`, _i = `${H}:linealAudioBars`, Si = `${H}:progressSquare`, wi = `${H}:waveAudioBars`, Ti = `${H}:hillAudioBars`, Mi = `${H}:rect`, zt = "edit", Ei = `${zt}:object`, Ai = `${zt}:replaceMedia`, Oo = `${zt}:text`, Co = `${zt}:shape`, Ro = `${zt}:templateItem`, Po = `${zt}:deleteTemplateItem`, xi = `${zt}:backgroundEditor`, Oi = `${zt}:track`, Do = "enterEditMode", Le = "active", zo = `${Le}:set`, $o = `${Le}:delete`, Ci = `${Le}:paste`, Fo = `${Le}:clone`, Ri = `${Le}:split`, tt = "layer", No = `${tt}:locked`, Lo = `${tt}:hidden`, Ho = `${tt}:move`, Pi = `${tt}:select`, Uo = `${tt}:selection`, Wo = `${tt}:sendTo`, jo = `${tt}:rename`, Bo = `${tt}:editingName`, Di = `${tt}:copy`, Yo = `${tt}:paste`, zi = `${tt}:clone`, Go = `${tt}:split`, Xo = `${tt}:cut`, $i = `${tt}:delete`, Fi = `${tt}:replace`, Er = "history", Ni = `${Er}:undo`, Li = `${Er}:redo`, Ko = `${Er}:reset`, fs = "scale", Hi = `${fs}:changed`;
var _r = { exports: {} };
_r.exports;
(function(t, r) {
  var e = 200, n = "__lodash_hash_undefined__", s = 9007199254740991, a = "[object Arguments]", u = "[object Array]", c = "[object Boolean]", d = "[object Date]", p = "[object Error]", h = "[object Function]", y = "[object GeneratorFunction]", m = "[object Map]", I = "[object Number]", k = "[object Object]", b = "[object Promise]", S = "[object RegExp]", f = "[object Set]", v = "[object String]", T = "[object Symbol]", w = "[object WeakMap]", E = "[object ArrayBuffer]", _ = "[object DataView]", M = "[object Float32Array]", L = "[object Float64Array]", R = "[object Int8Array]", G = "[object Int16Array]", x = "[object Int32Array]", F = "[object Uint8Array]", et = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", te = "[object Uint32Array]", Se = /[\\^$.*+?()[\]{}|]/g, we = /\w*$/, Te = /^\[object .+?Constructor\]$/, Me = /^(?:0|[1-9]\d*)$/, z = {};
  z[a] = z[u] = z[E] = z[_] = z[c] = z[d] = z[M] = z[L] = z[R] = z[G] = z[x] = z[m] = z[I] = z[k] = z[S] = z[f] = z[v] = z[T] = z[F] = z[et] = z[Qt] = z[te] = !0, z[p] = z[h] = z[w] = !1;
  var Ee = typeof ft == "object" && ft && ft.Object === Object && ft, Ae = typeof self == "object" && self && self.Object === Object && self, st = Ee || Ae || Function("return this")(), ee = r && !r.nodeType && r, $ = ee && !0 && t && !t.nodeType && t, re = $ && $.exports === ee;
  function xe(i, o) {
    return i.set(o[0], o[1]), i;
  }
  function it(i, o) {
    return i.add(o), i;
  }
  function ne(i, o) {
    for (var l = -1, g = i ? i.length : 0; ++l < g && o(i[l], l, i) !== !1; )
      ;
    return i;
  }
  function se(i, o) {
    for (var l = -1, g = o.length, O = i.length; ++l < g; )
      i[O + l] = o[l];
    return i;
  }
  function $t(i, o, l, g) {
    for (var O = -1, A = i ? i.length : 0; ++O < A; )
      l = o(l, i[O], O, i);
    return l;
  }
  function Ft(i, o) {
    for (var l = -1, g = Array(i); ++l < i; )
      g[l] = o(l);
    return g;
  }
  function ie(i, o) {
    return i == null ? void 0 : i[o];
  }
  function Nt(i) {
    var o = !1;
    if (i != null && typeof i.toString != "function")
      try {
        o = !!(i + "");
      } catch {
      }
    return o;
  }
  function ae(i) {
    var o = -1, l = Array(i.size);
    return i.forEach(function(g, O) {
      l[++o] = [O, g];
    }), l;
  }
  function Lt(i, o) {
    return function(l) {
      return i(o(l));
    };
  }
  function oe(i) {
    var o = -1, l = Array(i.size);
    return i.forEach(function(g) {
      l[++o] = g;
    }), l;
  }
  var Oe = Array.prototype, Ce = Function.prototype, wt = Object.prototype, Ht = st["__core-js_shared__"], ce = function() {
    var i = /[^.]+$/.exec(Ht && Ht.keys && Ht.keys.IE_PROTO || "");
    return i ? "Symbol(src)_1." + i : "";
  }(), ue = Ce.toString, ut = wt.hasOwnProperty, Tt = wt.toString, Re = RegExp(
    "^" + ue.call(ut).replace(Se, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), yt = re ? st.Buffer : void 0, Mt = st.Symbol, Ut = st.Uint8Array, rt = Lt(Object.getPrototypeOf, Object), le = Object.create, de = wt.propertyIsEnumerable, Pe = Oe.splice, Wt = Object.getOwnPropertySymbols, Et = yt ? yt.isBuffer : void 0, fe = Lt(Object.keys, Object), At = mt(st, "DataView"), gt = mt(st, "Map"), at = mt(st, "Promise"), xt = mt(st, "Set"), jt = mt(st, "WeakMap"), It = mt(Object, "create"), Bt = nt(At), bt = nt(gt), Yt = nt(at), Gt = nt(xt), We = nt(jt), Xt = Mt ? Mt.prototype : void 0, ar = Xt ? Xt.valueOf : void 0;
  function Ot(i) {
    var o = -1, l = i ? i.length : 0;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function xr() {
    this.__data__ = It ? It(null) : {};
  }
  function Or(i) {
    return this.has(i) && delete this.__data__[i];
  }
  function Cr(i) {
    var o = this.__data__;
    if (It) {
      var l = o[i];
      return l === n ? void 0 : l;
    }
    return ut.call(o, i) ? o[i] : void 0;
  }
  function or(i) {
    var o = this.__data__;
    return It ? o[i] !== void 0 : ut.call(o, i);
  }
  function je(i, o) {
    var l = this.__data__;
    return l[i] = It && o === void 0 ? n : o, this;
  }
  Ot.prototype.clear = xr, Ot.prototype.delete = Or, Ot.prototype.get = Cr, Ot.prototype.has = or, Ot.prototype.set = je;
  function X(i) {
    var o = -1, l = i ? i.length : 0;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function Rr() {
    this.__data__ = [];
  }
  function Pr(i) {
    var o = this.__data__, l = ze(o, i);
    if (l < 0)
      return !1;
    var g = o.length - 1;
    return l == g ? o.pop() : Pe.call(o, l, 1), !0;
  }
  function Dr(i) {
    var o = this.__data__, l = ze(o, i);
    return l < 0 ? void 0 : o[l][1];
  }
  function zr(i) {
    return ze(this.__data__, i) > -1;
  }
  function $r(i, o) {
    var l = this.__data__, g = ze(l, i);
    return g < 0 ? l.push([i, o]) : l[g][1] = o, this;
  }
  X.prototype.clear = Rr, X.prototype.delete = Pr, X.prototype.get = Dr, X.prototype.has = zr, X.prototype.set = $r;
  function J(i) {
    var o = -1, l = i ? i.length : 0;
    for (this.clear(); ++o < l; ) {
      var g = i[o];
      this.set(g[0], g[1]);
    }
  }
  function Fr() {
    this.__data__ = {
      hash: new Ot(),
      map: new (gt || X)(),
      string: new Ot()
    };
  }
  function Nr(i) {
    return he(this, i).delete(i);
  }
  function Lr(i) {
    return he(this, i).get(i);
  }
  function Hr(i) {
    return he(this, i).has(i);
  }
  function Ur(i, o) {
    return he(this, i).set(i, o), this;
  }
  J.prototype.clear = Fr, J.prototype.delete = Nr, J.prototype.get = Lr, J.prototype.has = Hr, J.prototype.set = Ur;
  function ot(i) {
    this.__data__ = new X(i);
  }
  function Wr() {
    this.__data__ = new X();
  }
  function jr(i) {
    return this.__data__.delete(i);
  }
  function Br(i) {
    return this.__data__.get(i);
  }
  function Yr(i) {
    return this.__data__.has(i);
  }
  function Gr(i, o) {
    var l = this.__data__;
    if (l instanceof X) {
      var g = l.__data__;
      if (!gt || g.length < e - 1)
        return g.push([i, o]), this;
      l = this.__data__ = new J(g);
    }
    return l.set(i, o), this;
  }
  ot.prototype.clear = Wr, ot.prototype.delete = jr, ot.prototype.get = Br, ot.prototype.has = Yr, ot.prototype.set = Gr;
  function De(i, o) {
    var l = Xe(i) || Fe(i) ? Ft(i.length, String) : [], g = l.length, O = !!g;
    for (var A in i)
      ut.call(i, A) && !(O && (A == "length" || on(A, g))) && l.push(A);
    return l;
  }
  function cr(i, o, l) {
    var g = i[o];
    (!(ut.call(i, o) && pr(g, l)) || l === void 0 && !(o in i)) && (i[o] = l);
  }
  function ze(i, o) {
    for (var l = i.length; l--; )
      if (pr(i[l][0], o))
        return l;
    return -1;
  }
  function kt(i, o) {
    return i && Ge(o, Ve(o), i);
  }
  function Be(i, o, l, g, O, A, D) {
    var P;
    if (g && (P = A ? g(i, O, A, D) : g(i)), P !== void 0)
      return P;
    if (!_t(i))
      return i;
    var U = Xe(i);
    if (U) {
      if (P = sn(i), !o)
        return en(i, P);
    } else {
      var N = Rt(i), Z = N == h || N == y;
      if (hr(i))
        return $e(i, o);
      if (N == k || N == a || Z && !A) {
        if (Nt(i))
          return A ? i : {};
        if (P = vt(Z ? {} : i), !o)
          return rn(i, kt(P, i));
      } else {
        if (!z[N])
          return A ? i : {};
        P = an(i, N, Be, o);
      }
    }
    D || (D = new ot());
    var ct = D.get(i);
    if (ct)
      return ct;
    if (D.set(i, P), !U)
      var B = l ? nn(i) : Ve(i);
    return ne(B || i, function(Q, K) {
      B && (K = Q, Q = i[K]), cr(P, K, Be(Q, o, l, g, K, i, D));
    }), P;
  }
  function Xr(i) {
    return _t(i) ? le(i) : {};
  }
  function Kr(i, o, l) {
    var g = o(i);
    return Xe(i) ? g : se(g, l(i));
  }
  function Vr(i) {
    return Tt.call(i);
  }
  function qr(i) {
    if (!_t(i) || un(i))
      return !1;
    var o = Ke(i) || Nt(i) ? Re : Te;
    return o.test(nt(i));
  }
  function Jr(i) {
    if (!dr(i))
      return fe(i);
    var o = [];
    for (var l in Object(i))
      ut.call(i, l) && l != "constructor" && o.push(l);
    return o;
  }
  function $e(i, o) {
    if (o)
      return i.slice();
    var l = new i.constructor(i.length);
    return i.copy(l), l;
  }
  function Ye(i) {
    var o = new i.constructor(i.byteLength);
    return new Ut(o).set(new Ut(i)), o;
  }
  function pe(i, o) {
    var l = o ? Ye(i.buffer) : i.buffer;
    return new i.constructor(l, i.byteOffset, i.byteLength);
  }
  function ur(i, o, l) {
    var g = o ? l(ae(i), !0) : ae(i);
    return $t(g, xe, new i.constructor());
  }
  function lr(i) {
    var o = new i.constructor(i.source, we.exec(i));
    return o.lastIndex = i.lastIndex, o;
  }
  function Zr(i, o, l) {
    var g = o ? l(oe(i), !0) : oe(i);
    return $t(g, it, new i.constructor());
  }
  function Qr(i) {
    return ar ? Object(ar.call(i)) : {};
  }
  function tn(i, o) {
    var l = o ? Ye(i.buffer) : i.buffer;
    return new i.constructor(l, i.byteOffset, i.length);
  }
  function en(i, o) {
    var l = -1, g = i.length;
    for (o || (o = Array(g)); ++l < g; )
      o[l] = i[l];
    return o;
  }
  function Ge(i, o, l, g) {
    l || (l = {});
    for (var O = -1, A = o.length; ++O < A; ) {
      var D = o[O], P = void 0;
      cr(l, D, P === void 0 ? i[D] : P);
    }
    return l;
  }
  function rn(i, o) {
    return Ge(i, Ct(i), o);
  }
  function nn(i) {
    return Kr(i, Ve, Ct);
  }
  function he(i, o) {
    var l = i.__data__;
    return cn(o) ? l[typeof o == "string" ? "string" : "hash"] : l.map;
  }
  function mt(i, o) {
    var l = ie(i, o);
    return qr(l) ? l : void 0;
  }
  var Ct = Wt ? Lt(Wt, Object) : dn, Rt = Vr;
  (At && Rt(new At(new ArrayBuffer(1))) != _ || gt && Rt(new gt()) != m || at && Rt(at.resolve()) != b || xt && Rt(new xt()) != f || jt && Rt(new jt()) != w) && (Rt = function(i) {
    var o = Tt.call(i), l = o == k ? i.constructor : void 0, g = l ? nt(l) : void 0;
    if (g)
      switch (g) {
        case Bt:
          return _;
        case bt:
          return m;
        case Yt:
          return b;
        case Gt:
          return f;
        case We:
          return w;
      }
    return o;
  });
  function sn(i) {
    var o = i.length, l = i.constructor(o);
    return o && typeof i[0] == "string" && ut.call(i, "index") && (l.index = i.index, l.input = i.input), l;
  }
  function vt(i) {
    return typeof i.constructor == "function" && !dr(i) ? Xr(rt(i)) : {};
  }
  function an(i, o, l, g) {
    var O = i.constructor;
    switch (o) {
      case E:
        return Ye(i);
      case c:
      case d:
        return new O(+i);
      case _:
        return pe(i, g);
      case M:
      case L:
      case R:
      case G:
      case x:
      case F:
      case et:
      case Qt:
      case te:
        return tn(i, g);
      case m:
        return ur(i, g, l);
      case I:
      case v:
        return new O(i);
      case S:
        return lr(i);
      case f:
        return Zr(i, g, l);
      case T:
        return Qr(i);
    }
  }
  function on(i, o) {
    return o = o ?? s, !!o && (typeof i == "number" || Me.test(i)) && i > -1 && i % 1 == 0 && i < o;
  }
  function cn(i) {
    var o = typeof i;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? i !== "__proto__" : i === null;
  }
  function un(i) {
    return !!ce && ce in i;
  }
  function dr(i) {
    var o = i && i.constructor, l = typeof o == "function" && o.prototype || wt;
    return i === l;
  }
  function nt(i) {
    if (i != null) {
      try {
        return ue.call(i);
      } catch {
      }
      try {
        return i + "";
      } catch {
      }
    }
    return "";
  }
  function fr(i) {
    return Be(i, !0, !0);
  }
  function pr(i, o) {
    return i === o || i !== i && o !== o;
  }
  function Fe(i) {
    return ln(i) && ut.call(i, "callee") && (!de.call(i, "callee") || Tt.call(i) == a);
  }
  var Xe = Array.isArray;
  function Ne(i) {
    return i != null && mr(i.length) && !Ke(i);
  }
  function ln(i) {
    return yr(i) && Ne(i);
  }
  var hr = Et || fn;
  function Ke(i) {
    var o = _t(i) ? Tt.call(i) : "";
    return o == h || o == y;
  }
  function mr(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= s;
  }
  function _t(i) {
    var o = typeof i;
    return !!i && (o == "object" || o == "function");
  }
  function yr(i) {
    return !!i && typeof i == "object";
  }
  function Ve(i) {
    return Ne(i) ? De(i) : Jr(i);
  }
  function dn() {
    return [];
  }
  function fn() {
    return !1;
  }
  t.exports = fr;
})(_r, _r.exports);
var Ui = _r.exports;
const C = /* @__PURE__ */ Cn(Ui);
function Wi(t, r) {
  return t.filter((n) => {
    if (r.forEach((s) => {
      n.items.includes(s) && (n.items = n.items.filter((a) => a !== s));
    }), n.items.length !== 0 || n.static)
      return n;
  });
}
const j = (t) => Object.keys(t).reduce((r, e) => {
  const { display: n } = t[e];
  return Math.max(r, n.to);
}, 0);
function q(t, r, e) {
  t.forEach((n) => {
    const s = n.items.map((k) => String(k)), a = Object.values(r).filter(
      (k) => s.includes(String(k.id))
    ), c = a.filter(
      (k) => !e.includes(String(k.id))
    ).sort(
      (k, b) => k.display.from - b.display.from
    ), d = a.sort(
      (k, b) => k.display.from - b.display.from
    ), p = c[c.length - 1];
    let h = (p == null ? void 0 : p.display.to) || 0;
    d.forEach((k) => {
      if (e.includes(String(k.id))) {
        const b = k.playbackRate || 1;
        let S;
        (k.type === "video" || k.type === "audio") && k.trim ? S = (k.trim.to - k.trim.from) / b : S = k.display.to - k.display.from, k.display = {
          from: h,
          to: h + S
        }, h = h + S;
      }
    });
    const m = a.sort(
      (k, b) => k.display.from - b.display.from
    ).map((k) => String(k.id));
    let I = 0;
    m.forEach((k) => {
      const b = [];
      let S = 0;
      if (b.forEach((f) => {
        f.forEach((v) => {
          v.type === "transition" && (S += v.duration);
        });
      }), r[String(k)]) {
        const f = r[String(k)], v = f.playbackRate || 1;
        let T;
        (f.type === "video" || f.type === "audio") && f.trim ? T = (f.trim.to - f.trim.from) / v : T = f.display.to - f.display.from, r[String(k)].display = {
          from: I - S,
          to: I + T - S
        }, I += T;
      }
    });
  });
}
function ps(t, r, e, n, s, a) {
  return r.forEach((u) => {
    if (!t.includes(u) && (s[u] = e[u], e[u].type === "composition" || e[u].type === "template")) {
      const c = n.find((d) => d.id === u);
      c && (a.push(c), ps(
        t,
        c.items,
        e,
        n,
        s,
        a
      ));
    }
  }), { updatedTrackItems: s, updatedStructure: a };
}
function ji(t, r) {
  const e = C(t), n = r && r.length ? r : e.activeIds, s = n.map((_) => e.trackItemsMap[_]).filter((_) => !!_).map((_) => _.id), a = e.transitionIds.filter(
    (_) => {
      const M = e.transitionsMap[_];
      return s.includes(M.fromId) || s.includes(M.toId);
    }
  );
  s.push(...a);
  const u = e.trackItemIds, c = e.transitionIds, d = C(e.tracks), p = C(e.structure);
  s.forEach((_) => {
    var L;
    const M = e.trackItemsMap[_] || e.transitionsMap[_];
    if (M.type === "template" || M.type === "composition") {
      const R = (L = e.structure.find(
        (x) => x.id === M.id
      )) == null ? void 0 : L.items;
      s.push(...R);
      const G = p.findIndex(
        (x) => x.id === M.id
      );
      p.splice(G, 1);
    }
  }), s.forEach((_) => {
    p.forEach((M) => {
      M.items.includes(_) && (M.items = M.items.filter((L) => L !== _));
    });
  });
  const h = u.filter(
    (_) => !s.includes(_)
  );
  c.forEach((_) => {
    n.includes(_) && n.length === 1 && C(e.transitionsMap[_]);
  });
  const y = c.filter(
    (_) => !s.includes(_) && !n.includes(_)
  ), m = Object.fromEntries(
    Object.entries(e.transitionsMap).filter(
      ([_]) => !s.includes(_)
    )
  );
  Object.keys(m).forEach((_) => {
    n.includes(_) && (m[_].kind = "none");
  });
  const I = e.trackItemIds.filter(
    (_) => !n.includes(_)
  ), k = Wi(
    e.tracks,
    n
  ), b = Object.fromEntries(
    Object.entries(e.trackItemsMap).filter(
      ([_]) => !s.includes(_)
    )
  ), S = d.filter((_) => _.magnetic);
  q(S, b, []);
  const f = {}, v = [], { updatedTrackItems: T, updatedStructure: w } = ps(
    s,
    I,
    e.trackItemsMap,
    e.structure,
    f,
    v
  ), E = j(T);
  return {
    trackItemIds: h,
    activeIds: [],
    trackItemsMap: T,
    tracks: k,
    duration: E,
    structure: w,
    transitionIds: y,
    transitionsMap: m
  };
}
const Bi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Pn = (t = 21) => {
  let r = "", e = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    r += Bi[e[t] & 63];
  return r;
};
function Ie(t = 16) {
  const r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", e = r.charAt(Math.floor(Math.random() * r.length));
  let n = Pn(t - 1);
  return n = n.replace(/[^a-zA-Z0-9]/g, "").slice(0, t - 1), e + n;
}
const He = (t) => {
  const r = t.map((e) => new FontFace(e.fontFamily, `url(${e.url})`).load().catch((n) => n));
  return r.length === 0 ? Promise.resolve(!0) : new Promise((e, n) => {
    Promise.all(r).then((s) => {
      s.forEach((a) => {
        a && a.family && (document.fonts.add(a), e(!0));
      });
    }).catch((s) => n(s));
  });
};
function Yi(t, r) {
  return t.forEach((e) => {
    r = r.split(e).join(Ie());
  }), r;
}
function hs(t, r, e) {
  const n = t.find((a) => a.id === r);
  if (!n) return [];
  const s = n.items;
  return s.forEach((a) => {
    const u = e[a];
    (u.type === "text" || u.type === "caption") && He([
      {
        fontFamily: u.details.fontFamily,
        url: u.details.fontUrl
      }
    ]), (u.type === "composition" || u.type === "template") && s.push(
      ...hs(t, a, e)
    );
  }), s;
}
async function Gi(t) {
  let r = localStorage.getItem("DesignComboTemp");
  if (!r) return {};
  const e = C(t);
  let n = C(JSON.parse(r));
  const s = n.activeIds, a = n.trackItemsMap, u = n.structure;
  Object.keys(a).forEach((b) => {
    const S = a[b];
    if ((S.type === "text" || S.type === "caption") && He([
      {
        fontFamily: S.details.fontFamily,
        url: S.details.fontUrl
      }
    ]), S.type === "composition" || S.type === "template") {
      const f = hs(
        u,
        b,
        a
      );
      s.push(...f);
    }
  });
  const c = Yi(s, r), d = C(JSON.parse(c)), p = e.tracks;
  d.activeIds.forEach((b) => {
    const S = d.trackItemsMap[b];
    e.trackItemsMap[b] = S, e.trackItemIds.push(b);
    const f = {
      id: Ie(),
      type: S.type,
      items: [b],
      magnetic: !1,
      static: !1,
      muted: !1
    };
    p.unshift(f);
  });
  const h = [...d.structure, ...e.structure], y = e.trackItemIds, m = {
    ...d.trackItemsMap,
    ...e.trackItemsMap
  }, I = {
    structure: h,
    trackItemIds: y,
    trackItemsMap: m,
    tracks: p
  }, k = j(I.trackItemsMap);
  return {
    trackItemIds: I.trackItemIds,
    trackItemsMap: I.trackItemsMap,
    structure: I.structure,
    tracks: I.tracks,
    duration: k
  };
}
let Sr = {
  cors: {
    audio: !0,
    video: !0,
    image: !0
  },
  acceptsMap: {
    text: ["text", "caption", "composition"],
    image: ["image", "video"],
    video: ["video", "image"],
    audio: ["audio"],
    composition: ["composition"],
    caption: ["caption", "text", "composition"],
    template: ["template", "image", "video"],
    customTrack: ["video", "image", "template"],
    customTrack2: ["video", "image", "template"],
    illustration: ["illustration", "custom"],
    custom: ["custom", "video", "illustration"],
    main: ["video", "image", "template"],
    shape: ["shape", "custom", "illustration"],
    linealAudioBars: ["audio", "linealAudioBars"],
    radialAudioBars: ["audio", "radialAudioBars"],
    progressFrame: ["audio", "progressFrame"],
    progressBar: ["audio", "progressBar"],
    rect: ["rect"],
    progressSquare: ["progressSquare"]
  }
};
const Xi = (t) => {
  const r = Object.fromEntries(
    Object.entries(t).filter(([e, n]) => n !== void 0)
  );
  Sr = { ...Sr, ...r };
}, Dn = () => Sr.cors, ms = () => Sr.acceptsMap, Ue = (t) => new Promise((r, e) => {
  const n = new Image();
  n.onload = () => {
    const a = n.width, u = n.height;
    r({ width: a, height: u });
  }, n.onerror = (a) => {
    e(a);
  }, Dn().image && (n.crossOrigin = "anonymous"), n.src = t;
}), ys = (t) => new Promise((r, e) => {
  const n = new Audio();
  n.preload = "auto", n.addEventListener("loadedmetadata", () => {
    const a = n.duration * 1e3;
    r({ duration: a });
  }), n.addEventListener("error", (a) => {
    e(a);
  }), n.src = t, Dn().audio && (n.crossOrigin = "anonymous"), n.load();
}), zn = (t) => new Promise((r, e) => {
  const n = document.createElement("video");
  n.preload = "auto", n.addEventListener("loadedmetadata", () => {
    const a = n.duration * 1e3, u = n.videoWidth, c = n.videoHeight;
    r({ duration: a, width: u, height: c });
  }), n.addEventListener("error", (a) => {
    e(a);
  }), n.src = t, Dn().video && (n.crossOrigin = "anonymous"), n.load();
}), Ki = async (t) => {
  var s, a;
  const r = t.duration, e = (s = t.details) == null ? void 0 : s.width, n = (a = t.details) == null ? void 0 : a.height;
  return r && e && n ? { duration: r, width: e, height: n } : zn(t.details.src);
}, gs = (t, r) => {
  const e = document.createElement("div");
  Object.keys(r).forEach((s) => {
    s !== "height" && (e.style[s] = r[s]);
  }), document.body.appendChild(e), e.textContent = t, e.style.whiteSpace = "normal", e.style.position = "absolute", e.style.visibility = "hidden", e.style.display = "inline-block", e.style.width = r.width + "px", e.style.fontSize = r.fontSize + "px";
  const n = getComputedStyle(e).height;
  return document.body.removeChild(e), parseFloat(n);
}, Vn = (t, r) => {
  var c, d;
  const e = ((c = t.details.crop) == null ? void 0 : c.width) || t.details.width || 0, n = ((d = t.details.crop) == null ? void 0 : d.height) || t.details.height || 0;
  let s = r.width, a = r.height;
  const u = r.width / r.height;
  return e / n > u ? (s = e, a = e / u) : (a = n, s = n * u), {
    newWidth: s,
    newHeight: a,
    crop: {
      x: 0,
      y: 0,
      height: n,
      width: e
    }
  };
}, qn = (t, r) => {
  const e = C(t.trim), n = C(t.display);
  return r.duration < t.display.to && (n.to = r.duration + t.display.from, e && (e.to = r.duration)), {
    duration: r.duration,
    trim: e,
    display: n
  };
};
async function Vi(t, r) {
  const e = { ...t }, n = Object.keys(r)[0], s = Object.values(r)[0], a = e.trackItemsMap[n], u = { ...e.trackItemsMap[n] }, c = a.details;
  if (!s.details.src) return {};
  if (a.type === "image") {
    const d = await Ue(s.details.src), { crop: p, newHeight: h, newWidth: y } = Vn(a, d);
    s.details.crop = p, s.details.height = h, s.details.width = y;
  } else if (a.type === "video") {
    const d = await zn(s.details.src), p = e.trackItemsMap[n], { display: h, duration: y, trim: m } = qn(p, d), { crop: I, newHeight: k, newWidth: b } = Vn(a, d);
    s.details.crop = I, s.details.height = k, s.details.width = b, u.display = h, u.duration = y, u.trim = m;
  } else if (a.type === "audio") {
    const d = await ys(s.details.src), p = e.trackItemsMap[n], { display: h, duration: y, trim: m } = qn(p, d);
    u.display = h, u.duration = y, u.trim = m;
  }
  return a.metadata && s.metadata ? u.metadata = { ...a.metadata, ...s.metadata } : s.metadata && (u.metadata = s.metadata), a.details = { ...c, ...s.details }, e.trackItemsMap[n] = { ...u }, {
    trackItemsMap: {
      ...e.trackItemsMap,
      [n]: { ...u, details: { ...c, ...s.details } }
    }
  };
}
function qi(t, r) {
  const e = C(t), n = {}, s = r && r.length ? r : e.activeIds;
  if (s.length === 0) return {};
  s.forEach((u) => {
    const c = e.trackItemsMap[u], d = Ie();
    e.trackItemsMap[d] = {
      ...C(c),
      id: d
    }, e.trackItemIds.push(d);
    const p = e.tracks.find(
      (h) => h.items.includes(u)
    );
    n[p.id] ? n[p.id].items.push(d) : n[p.id] = {
      ...p,
      id: Ie(),
      items: [d],
      static: !1,
      magnetic: !1
    };
  });
  const a = Object.values(n);
  return e.tracks = [...a, ...e.tracks], {
    trackItemsMap: e.trackItemsMap,
    tracks: e.tracks,
    trackItemIds: e.trackItemIds
  };
}
function Ji(t) {
  const r = /#([0-9a-fA-F]{3,6})\b/g, e = /rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/g, n = /rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\s*\)/g;
  function s(u) {
    return u.length === 3 ? `#${u[0]}${u[0]}${u[1]}${u[1]}${u[2]}${u[2]}`.toUpperCase() : `#${u.toUpperCase()}`;
  }
  function a(u, c, d) {
    return `#${(1 << 24 | u << 16 | c << 8 | d).toString(16).slice(1).toUpperCase()}`;
  }
  return t = t.replace(r, (u, c) => s(c)), t = t.replace(
    e,
    (u, c, d, p) => a(+c, +d, +p)
  ), t = t.replace(
    n,
    (u, c, d, p) => a(+c, +d, +p)
  ), t;
}
function V(t) {
  return /^#[0-9a-fA-F]{3}$/.test(t) ? "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] : t;
}
function Is(t, r) {
  let e = t;
  for (const n in r)
    if (Object.prototype.hasOwnProperty.call(r, n)) {
      const s = new RegExp(n, "g");
      e = e.replace(s, r[n]);
    }
  return e;
}
function bs(t) {
  const r = t.getAttribute("fill");
  if (r && r.trim() !== "" && r.trim() !== "none")
    return r.trim();
  const e = t.getAttribute("style");
  if (e) {
    const s = /fill\s*:\s*([^;]+);?/.exec(e);
    if (s) {
      const a = s[1].trim();
      if (a !== "" && a !== "none")
        return a;
    }
  }
  const n = t.parentElement;
  return n ? bs(n) : null;
}
function qe(t) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(t);
}
const Zi = (t) => {
  const r = `.${t.split(".").filter((a) => a.includes("fill:")).join(".")}`, e = {}, n = /\.([\w-]+)\s*\{\s*([^}]+)\s*\}/g;
  let s;
  for (; (s = n.exec(r)) !== null; ) {
    const a = s[1], u = s[2], c = {}, d = /fill\s*:\s*([^;]+);?/.exec(u), p = /stroke\s*:\s*([^;]+);?/.exec(u);
    d && (c.fill = V(d[1].trim())), p && (c.stroke = V(p[1].trim())), e[a] = c;
  }
  return e;
};
function hn(t) {
  let r = t.parentElement;
  for (; r; ) {
    if (r.tagName.toLowerCase() === "mask")
      return !0;
    r = r.parentElement;
  }
  return !1;
}
function Qi(t, r, e = 300, n = 300) {
  const s = [], u = new DOMParser().parseFromString(t, "image/svg+xml"), c = u.documentElement;
  c.setAttribute("width", `${e}`), c.setAttribute("height", `${n}`);
  const d = c.querySelectorAll("style"), p = {};
  d.forEach((b) => {
    const S = b.textContent || "", f = Zi(S);
    Object.assign(p, f);
    const v = S.replace(/\.(st[\w-]+)/g, `.${r}-$1`).replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`);
    b.textContent = v;
    const T = Array.from(u.querySelectorAll("*")), w = /* @__PURE__ */ new Set();
    T.forEach((E) => {
      if (hn(E)) return;
      ["fill", "stroke", "stop-color"].forEach((L) => {
        const R = E.getAttribute(L);
        R && !["none", "transparent"].includes(R) && w.add(V(R));
      });
      const _ = E.getAttribute("style");
      if (_) {
        const L = /fill\s*:\s*([^;]+);?/.exec(_), R = /stroke\s*:\s*([^;]+);?/.exec(_), G = /stop-color\s*:\s*([^;]+);?/.exec(_);
        if (L) {
          const x = L[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
        if (R) {
          const x = R[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
        if (G) {
          const x = G[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
      }
      const M = E.getAttribute("class");
      M && M.split(" ").forEach((L) => {
        const R = p[L];
        R != null && R.fill && !["none", "transparent"].includes(R.fill) && w.add(V(R.fill)), R != null && R.stroke && !["none", "transparent"].includes(R.stroke) && w.add(V(R.stroke));
      });
    }), Array.from(w).forEach((E) => {
      qe(E) && s.push(E);
    });
  });
  const h = Array.from(u.querySelectorAll("*")), y = /* @__PURE__ */ new Set();
  return h.forEach((b) => {
    if (hn(b)) return;
    const S = b.getAttribute("class");
    if (S) {
      const v = S.split(" ").map((T) => `${r}-${T}`).join(" ");
      b.setAttribute("class", v), v.split(" ").forEach((T) => {
        const w = p[T];
        w != null && w.fill && !["none", "transparent"].includes(w.fill) && y.add(V(w.fill)), w != null && w.stroke && !["none", "transparent"].includes(w.stroke) && y.add(V(w.stroke));
      });
    }
    ["fill", "stroke", "stop-color"].forEach((v) => {
      const T = b.getAttribute(v);
      T && !["none", "transparent"].includes(T) && y.add(V(T));
    });
    const f = b.getAttribute("style");
    if (f) {
      const v = /fill\s*:\s*([^;]+);?/.exec(f), T = /stroke\s*:\s*([^;]+);?/.exec(f), w = /stop-color\s*:\s*([^;]+);?/.exec(f);
      if (v) {
        const E = v[1].trim();
        E && !["none", "transparent"].includes(E) && y.add(V(E));
      }
      if (T) {
        const E = T[1].trim();
        E && !["none", "transparent"].includes(E) && y.add(V(E));
      }
      if (w) {
        const E = w[1].trim();
        E && !["none", "transparent"].includes(E) && y.add(V(E));
      }
    }
  }), y.forEach(
    (b) => !s.includes(b) && qe(b) && s.push(b)
  ), Array.from(u.querySelectorAll("*")).forEach((b) => {
    if (b.hasAttribute("id")) {
      const S = b.getAttribute("id");
      b.setAttribute("id", `${r}-${S}`);
    }
    if (["fill", "stroke", "stop-color", "filter", "clip-path", "mask"].forEach(
      (S) => {
        const f = b.getAttribute(S);
        f && f.includes("url(#") && b.setAttribute(
          S,
          f.replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`)
        );
      }
    ), b.hasAttribute("style")) {
      const S = b.getAttribute("style");
      S.includes("url(#") && b.setAttribute(
        "style",
        S.replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`)
      );
    }
  }), Array.from(u.querySelectorAll("path")).forEach((b) => {
    if (hn(b)) return;
    !bs(b) && !b.getAttribute("class") && (b.setAttribute("fill", "#000000"), s.includes("#000000") || s.push("#000000"));
  }), { serializer: new XMLSerializer().serializeToString(u), colors: s };
}
const nr = {
  color: "#000000",
  x: 0,
  y: 0,
  blur: 0
}, pt = (t, r) => {
  let e = r != null && r.trim ? r.trim.to - r.trim.from : (r == null ? void 0 : r.duration) || 5e3;
  const n = {
    from: 0,
    to: e
  };
  if (!t)
    return n;
  if (t.from < 0)
    return console.error(
      "'from' must be a non-negative number. Returning default display."
    ), n;
  if (t.from !== void 0 && t.to === void 0)
    return {
      from: t.from,
      to: t.from + e
    };
  if (t.to !== void 0) {
    if (t.to < 0)
      return console.error(
        "'to' must be a non-negative number. Returning default display."
      ), n;
    if (t.to < t.from)
      return console.error(
        "'to' must be greater than or equal to 'from'. Returning default display."
      ), n;
  }
  return t;
}, ks = (t, r) => t ? t.from && !t.to ? {
  from: t.from,
  to: r.duration
} : t : {
  from: 0,
  to: r.duration
};
function vs(t, r) {
  const e = {
    x: t.size.width / 2,
    y: t.size.height / 2
  }, n = { x: r.width / 2, y: r.height / 2 }, s = e.x - n.x;
  return {
    top: `${e.y - n.y}px`,
    left: `${s}px`,
    transform: "none"
    // No scaling for text/captions
  };
}
function ht(t, r) {
  const e = t.scaleMode, n = {
    x: t.size.width / 2,
    y: t.size.height / 2
  }, s = { x: r.width / 2, y: r.height / 2 };
  let a;
  if (e === "fill")
    a = Math.max(
      t.size.width / r.width,
      t.size.height / r.height
    );
  else if (e === "fit") {
    const d = t.scaleAspectRatio || 1;
    a = Math.min(
      t.size.width / r.width,
      t.size.height / r.height
    ) * d;
  } else
    a = Math.min(
      t.size.width / r.width,
      t.size.height / r.height
    );
  const u = n.x - s.x;
  return {
    top: `${n.y - s.y}px`,
    left: `${u}px`,
    transform: `scale(${a})`
  };
}
const _s = async (t, r) => {
  const e = t.details.src, n = await Ki(t), s = ht(r, {
    ...n
  }), a = ks(t.trim, { duration: n.duration }), u = {
    width: n.width,
    height: n.height,
    opacity: 100,
    src: e,
    volume: t.details.volume ?? 100,
    // Default volume
    borderRadius: t.details.borderRadius ?? 0,
    // Default border radius
    borderWidth: t.details.borderWidth ?? 0,
    // Default border width
    borderColor: t.details.borderColor || "#000000",
    // Default border color
    boxShadow: t.details.boxShadow || nr,
    top: t.details.top || s.top || "0px",
    // Default top
    left: t.details.left || s.left || "0px",
    // Default left
    transform: t.details.transform || s.transform,
    // Default transform
    blur: t.details.blur || 0,
    brightness: t.details.brightness || 100,
    flipX: t.details.flipX || !1,
    flipY: t.details.flipY || !1,
    rotate: t.details.rotate || "0deg",
    visibility: t.details.visibility || "visible"
  };
  return {
    ...t,
    trim: a,
    type: "video",
    name: "video",
    details: u,
    playbackRate: t.playbackRate || 1,
    display: pt(t.display, { duration: n.duration, trim: a }),
    duration: n.duration
  };
}, Ss = async (t) => {
  const r = t.id, e = t.details, s = (await ys(e.src)).duration, a = ks(t.trim, { duration: s });
  return {
    id: r,
    name: t.name || "audio",
    type: "audio",
    display: pt(t.display, { duration: s, trim: a }),
    trim: a,
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src,
      volume: e.volume ?? 100
      // Default volume
    },
    metadata: { ...t.metadata },
    duration: s
  };
}, ta = async (t, r) => {
  var c, d;
  const e = t.id, n = {
    width: ((c = t.details) == null ? void 0 : c.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, s = t.details, a = ht(r, n), u = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: u,
    details: {
      width: (s == null ? void 0 : s.width) || n.width,
      // Default width
      height: (s == null ? void 0 : s.height) || n.height,
      // Default height
      top: (s == null ? void 0 : s.top) || a.top,
      left: (s == null ? void 0 : s.left) || a.left,
      border: s.border || "none",
      // Default border
      borderRadius: s.borderRadius || 0,
      // Default border radius
      borderWidth: s.borderWidth || 0,
      // Default border width
      borderColor: s.borderColor || "#000000",
      // Default border color
      opacity: s.opacity || 100,
      // Default opacity
      flipX: s.flipX || !1,
      flipY: s.flipY || !1,
      inverted: s.inverted || !1,
      backgroundColors: (s == null ? void 0 : s.backgroundColors) || [
        "rgba(128, 128, 128,0.5)",
        "rgba(128, 128, 128,1)"
      ]
    },
    metadata: {}
  };
}, ea = async (t, r) => {
  var c, d;
  const e = t.id, n = {
    width: ((c = t.details) == null ? void 0 : c.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, s = t.details, a = ht(r, n), u = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: u,
    details: {
      width: (s == null ? void 0 : s.width) || n.width,
      // Default width
      height: (s == null ? void 0 : s.height) || n.height,
      // Default height
      top: (s == null ? void 0 : s.top) || a.top,
      left: (s == null ? void 0 : s.left) || a.left,
      border: s.border || "none",
      // Default border
      borderRadius: s.borderRadius || 0,
      // Default border radius
      borderWidth: s.borderWidth || 0,
      // Default border width
      borderColor: s.borderColor || "#000000",
      // Default border color
      opacity: s.opacity || 100,
      // Default opacity
      flipX: s.flipX || !1,
      flipY: s.flipY || !1,
      inverted: s.inverted || !1,
      backgroundColors: (s == null ? void 0 : s.backgroundColors) || [
        "rgba(128, 128, 128,0.5)",
        "rgba(128, 128, 128,1)"
      ],
      barThickness: s.barThickness || 10
    },
    metadata: {}
  };
}, ra = async (t, r) => {
  var c, d;
  const e = t.id, n = {
    width: ((c = t.details) == null ? void 0 : c.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, s = t.details, a = ht(r, n), u = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: u,
    details: {
      width: (s == null ? void 0 : s.width) || n.width,
      // Default width
      height: (s == null ? void 0 : s.height) || n.height,
      // Default height
      top: (s == null ? void 0 : s.top) || a.top,
      left: (s == null ? void 0 : s.left) || a.left,
      radialBarColor: s.radialBarColor || "rgba(128, 128, 128,1)",
      border: s.border || "none",
      // Default border
      borderRadius: s.borderRadius || 0,
      // Default border radius
      borderWidth: s.borderWidth || 0,
      // Default border width
      borderColor: s.borderColor || "#000000",
      // Default border color
      opacity: s.opacity || 100,
      // Default opacity
      flipX: s.flipX || !1,
      flipY: s.flipY || !1
    },
    metadata: {}
  };
}, na = async (t, r) => {
  var c, d;
  const e = t.id, n = {
    width: ((c = t.details) == null ? void 0 : c.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, s = t.details, a = ht(r, n), u = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: u,
    details: {
      width: (s == null ? void 0 : s.width) || n.width,
      // Default width
      height: (s == null ? void 0 : s.height) || n.height,
      // Default height
      top: (s == null ? void 0 : s.top) || a.top,
      left: (s == null ? void 0 : s.left) || a.left,
      border: s.border || "none",
      // Default border
      borderRadius: s.borderRadius || 0,
      // Default border radius
      borderWidth: s.borderWidth || 0,
      // Default border width
      borderColor: s.borderColor || "#000000",
      // Default border color
      opacity: s.opacity || 100,
      // Default opacity
      strokeColors: (s == null ? void 0 : s.strokeColors) || ["#ff9800", "#ff5722"],
      strokeWidth: (s == null ? void 0 : s.strokeWidth) || 100,
      strokeBackground: (s == null ? void 0 : s.strokeBackground) || "#fff",
      flipX: (s == null ? void 0 : s.flipX) || !1,
      flipY: (s == null ? void 0 : s.flipY) || !1,
      rotate: (s == null ? void 0 : s.rotate) || "0deg",
      transform: (s == null ? void 0 : s.transform) || "none"
    },
    metadata: {}
  };
}, mn = async (t, r) => {
  var u, c;
  const e = t.id, n = {
    width: ((u = t.details) == null ? void 0 : u.width) || r.size.width,
    height: ((c = t.details) == null ? void 0 : c.height) || r.size.height
  }, s = t.details, a = ht(r, n);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: {
      from: 0,
      to: t.duration || 1e4
    },
    details: {
      width: (s == null ? void 0 : s.width) || n.width,
      // Default width
      height: (s == null ? void 0 : s.height) || n.height,
      // Default height
      top: (s == null ? void 0 : s.top) || a.top,
      left: (s == null ? void 0 : s.left) || a.left,
      border: s.border || "none",
      // Default border
      borderRadius: s.borderRadius || 0,
      // Default border radius
      borderWidth: s.borderWidth || 0,
      // Default border width
      borderColor: s.borderColor || "#000000",
      // Default border color
      opacity: s.opacity || 100,
      // Default opacity
      flipX: s.flipX || !1,
      flipY: s.flipY || !1,
      inverted: s.inverted || !1,
      linealBarColor: s.linealBarColor || "rgba(128, 128, 128,1)",
      lineThickness: s.lineThickness || 1,
      gapSize: s.gapSize || 1,
      roundness: s.roundness || 1,
      placement: s.placement || null,
      strokeColor: s.strokeColor || "#92E1B0",
      fillColor: s.fillColor || null,
      strokeWidth: s.strokeWidth || null,
      copies: s.copies || null,
      offsetPixelSpeed: s.offsetPixelSpeed || 0,
      lineColor: s.lineColor || "#92E1B0",
      lineGap: s.lineGap || 0,
      topRoundness: s.topRoundness || 0,
      bottomRoundness: s.bottomRoundness || 0,
      lines: s.lines || 0,
      sections: s.sections || 0
    },
    metadata: {}
  };
}, ws = async (t, r) => {
  var y;
  const e = t.trackItemIds, n = t.size || {
    width: t.details.width,
    height: t.details.height
  }, s = Math.min(
    r.size.width / n.width,
    r.size.height / n.height
  ), a = ((y = t.details) == null ? void 0 : y.rotate) || 0, u = ht(r, n), c = t.display;
  let d = 1 / 0, p = 0;
  e.forEach((m) => {
    const I = t.trackItemsMap[m];
    I.display.from < d && (d = I.display.from), I.display.to > p && (p = I.display.to);
  });
  const h = t.trim || t.display || { from: d, to: p };
  return {
    id: t.id,
    type: "template",
    details: {
      ...n,
      transform: t.details.transform || u.transform,
      // Default transform
      top: t.details.top || u.top,
      left: t.details.left || u.left,
      scale: s,
      rotate: a,
      background: t.details.background || "transparent"
    },
    trim: h,
    display: c || { from: d, to: p },
    activeEdit: !1
  };
}, sa = async (t, r) => {
  var h;
  const e = t.trackItemIds, n = t.size || {
    width: t.details.width,
    height: t.details.height
  }, s = Math.min(
    r.size.width / n.width,
    r.size.height / n.height
  ), a = ((h = t.details) == null ? void 0 : h.rotate) || 0, u = ht(r, n), c = t.display;
  let d = 1 / 0, p = 0;
  return e.forEach((y) => {
    const m = t.trackItemsMap[y];
    m.display.from < d && (d = m.display.from), m.display.to > p && (p = m.display.to);
  }), {
    id: t.id,
    type: "composition",
    details: {
      ...n,
      transform: t.details.transform || u.transform,
      // Default transform
      top: t.details.top || u.top,
      left: t.details.left || u.left,
      scale: s,
      rotate: a
    },
    display: c || { from: d, to: p }
  };
}, Ts = async (t, r) => {
  const e = t.details, n = Ue(e.src), s = fetch(e.src), [a, u] = await Promise.all([
    n,
    s
  ]), c = await u.text(), d = ht(r, a), { serializer: p, colors: h } = Qi(
    Ji(c),
    t.id,
    Number(e.width || a.width),
    Number(e.height || a.height)
  ), y = t.details.colorMap || Object.fromEntries(h.map((m) => [m, m]));
  return {
    id: t.id,
    name: "illustration",
    type: t.type,
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src || "",
      // Default source URL
      width: e.width || a.width || 100,
      // Default width
      height: e.height || a.height || 100,
      // Default height
      opacity: e.opacity ?? 100,
      // Default opacity
      transform: e.transform || d.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      top: e.top || d.top || "0px",
      // Default top
      left: e.left || d.left || "0px",
      // Default left
      borderWidth: e.borderWidth ?? 0,
      // Default border width
      borderColor: e.borderColor || "#000000",
      // Default border color
      flipX: e.flipX || !1,
      flipY: e.flipY || !1,
      rotate: e.rotate || "0deg",
      visibility: e.visibility || "visible",
      svgString: p,
      initialSvgString: C(p),
      colorMap: y
    },
    metadata: t.metadata || {}
  };
}, ia = async (t, r) => {
  const e = t.details, n = Ue(e.src), [s] = await Promise.all([n]), a = ht(r, s);
  return {
    id: t.id,
    name: "shape",
    type: t.type,
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src || "",
      // Default source URL
      width: e.width || s.width || 100,
      // Default width
      height: e.height || s.height || 100,
      // Default height
      opacity: e.opacity ?? 100,
      // Default opacity
      transform: e.transform || a.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      top: e.top || a.top || "0px",
      // Default top
      left: e.left || a.left || "0px",
      // Default left
      borderWidth: e.borderWidth ?? 0,
      // Default border width
      borderColor: e.borderColor || "#000000",
      // Default border color
      flipX: e.flipX || !1,
      flipY: e.flipY || !1,
      rotate: e.rotate || "0deg",
      visibility: e.visibility || "visible",
      backgroundColor: e.backgroundColor || "#808080"
    },
    metadata: t.metadata || {}
  };
}, aa = async (t, r) => {
  const e = t.details, n = ht(r, {
    width: e.width,
    height: e.height
  });
  return {
    id: t.id,
    name: "rect",
    type: t.type,
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      width: e.width || 100,
      // Default width
      height: e.height || 100,
      // Default height
      opacity: e.opacity ?? 100,
      // Default opacity
      transform: e.transform || n.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      top: e.top || n.top || "0px",
      // Default top
      left: e.left || n.left || "0px",
      // Default left
      borderWidth: e.borderWidth ?? 0,
      // Default border width
      borderColor: e.borderColor || "#000000",
      // Default border color
      flipX: e.flipX || !1,
      flipY: e.flipY || !1,
      rotate: e.rotate || "0deg",
      visibility: e.visibility || "visible",
      backgroundColor: e.backgroundColor || "#808080",
      boxShadow: e.boxShadow || nr,
      // Default box shadow
      blur: e.blur || 0,
      brightness: e.brightness || 100
    },
    metadata: t.metadata || {}
  };
}, Ms = async (t, r) => {
  const e = t.details, n = await Ue(e.src), s = ht(r, n);
  return {
    id: t.id,
    type: "image",
    name: "image",
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src || "",
      // Default source URL
      width: e.width || n.width || 100,
      // Default width
      height: e.height || n.height || 100,
      // Default height
      opacity: e.opacity ?? 100,
      // Default opacity
      transform: e.transform || s.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      boxShadow: e.boxShadow || nr,
      // Default box shadow
      top: e.top || s.top || "0px",
      // Default top
      left: e.left || s.left || "0px",
      // Default left
      borderWidth: e.borderWidth ?? 0,
      // Default border width
      borderColor: e.borderColor || "#000000",
      // Default border color
      blur: e.blur || 0,
      brightness: e.brightness || 100,
      flipX: e.flipX || !1,
      flipY: e.flipY || !1,
      rotate: e.rotate || "0deg",
      visibility: e.visibility || "visible"
    },
    metadata: t.metadata || {}
  };
}, Es = async (t, r) => {
  const e = t;
  e.details.fontUrl && await He([
    {
      fontFamily: e.details.fontFamily,
      url: e.details.fontUrl
    }
  ]);
  const n = e.id, s = e.details, a = xs(s), u = s.height || gs(e.details.text, a), c = s.top != null && s.left != null ? {
    top: `${s.top}px`,
    left: `${s.left}px`
  } : vs(r, {
    width: a.width,
    height: u
  });
  return {
    id: n,
    name: "caption",
    type: "caption",
    display: pt(e.display),
    details: {
      ...e.details,
      ...a,
      text: s.text || "",
      // Default text content
      height: u,
      // Default height
      fontUrl: s.fontUrl,
      top: a.top || c.top,
      left: a.left || c.left,
      borderWidth: s.borderWidth || 0,
      borderColor: s.borderColor || "#000000",
      boxShadow: s.boxShadow || nr,
      words: s.words || [],
      appearedColor: s.appearedColor || s.color,
      activeColor: s.activeColor || s.color,
      activeFillColor: s.activeFillColor || "transparent",
      isKeywordColor: s.isKeywordColor || "transparent",
      preservedColorKeyWord: s.preservedColorKeyWord || !1,
      linesPerCaption: s.linesPerCaption || 2,
      wordsPerLine: s.wordsPerLine || "punctuationOrPause"
    },
    metadata: t.metadata || {}
  };
}, As = async (t, r) => {
  t.details.fontUrl && await He([
    {
      fontFamily: t.details.fontFamily,
      url: t.details.fontUrl
    }
  ]);
  const e = t.id, n = t.details, s = xs(n), a = n.height || gs(t.details.text, s), u = n.top != null && n.left != null ? {
    top: `${n.top}px`,
    left: `${n.left}px`
  } : vs(r, {
    width: s.width,
    height: a
  });
  return {
    id: e,
    name: "text",
    type: "text",
    display: pt(t.display),
    details: {
      ...t.details,
      ...s,
      text: n.text || "",
      // Default text content
      height: a,
      // Default height
      fontUrl: n.fontUrl,
      top: s.top || u.top,
      left: s.left || u.left,
      borderWidth: n.borderWidth || 0,
      borderColor: n.borderColor || "#000000",
      boxShadow: n.boxShadow || nr
    },
    metadata: {}
  };
}, xs = (t) => ({
  fontFamily: t.fontFamily || "Arial",
  // Default font family
  fontSize: t.fontSize || "16px",
  // Default font size
  fontWeight: t.fontWeight || "normal",
  // Default font weight
  fontStyle: t.fontStyle || "normal",
  // Default font style
  textDecoration: t.textDecoration || "none",
  // Default text decoration
  textAlign: t.textAlign || "left",
  // Default text alignment
  lineHeight: t.lineHeight || "normal",
  // Default line height
  letterSpacing: t.letterSpacing || "normal",
  // Default letter spacing
  wordSpacing: t.wordSpacing || "normal",
  // Default word spacing
  color: t.color || "#ffffff",
  // Default text color (black)
  backgroundColor: t.backgroundColor || "transparent",
  // Default background color
  border: t.border || "none",
  // Default border
  textShadow: t.textShadow || "none",
  // Default text shadow
  text: t.text || "",
  // Default text content
  opacity: t.opacity ?? 100,
  // Default opacity
  width: t.width || 300,
  wordWrap: t.wordWrap || "normal",
  //'break-word'
  wordBreak: t.wordBreak || "normal",
  //'break-all',
  WebkitTextStrokeColor: t.WebkitTextStrokeColor || "#ffffff",
  WebkitTextStrokeWidth: t.WebkitTextStrokeWidth || "0px",
  top: t.top,
  left: t.left,
  textTransform: t.textTransform || "none",
  transform: t.transform || "none",
  skewX: t.skewX || 0,
  skewY: t.skewY || 0
}), oa = async (t, r) => {
  switch (t.type) {
    case "video":
      return _s(t, r || {});
    case "audio":
      return Ss(t);
    case "image":
      return Ms(t, r || {});
    case "text":
      return As(t, r || {});
    case "caption":
      return Es(t, r || {});
    case "template":
      return ws(t, {
        size: r == null ? void 0 : r.size
      });
    default:
      throw new Error("Unsupported track item");
  }
};
function Os(t, r) {
  return r.some(
    (e) => t.some((n) => n.id === e.id)
  );
}
const Cs = (t = [], r = []) => t.length === 0 ? r.map((n) => ({
  id: Ie(),
  items: [n.id],
  type: n.type,
  accepts: ["text", "image", "video", "audio", "caption", "template"]
})) : t.map((e) => ({
  ...e,
  items: e.items || [],
  accepts: ["audio", "video", "image", "text", "caption", "template"],
  type: e.type || "text",
  magnetic: e.magnetic || !1,
  static: e.static || !1,
  id: e.id || Ie(),
  muted: e.muted || !1
}));
async function ca(t, r) {
  var u, c, d;
  const e = r.trackItemsMap, n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
  for (const p in e) {
    const h = e[p];
    if (h.type === "text" || h.type === "caption") {
      if (h.details.fontUrl) {
        const y = {
          fontFamily: h.details.fontFamily,
          url: h.details.fontUrl
        };
        n.add(JSON.stringify(y));
      }
      (u = h.animations) != null && u.in && h.animations.in.composition.forEach(
        (y) => {
          var m;
          (m = y.details) != null && m.fonts && y.details.fonts.forEach(
            (I) => {
              n.add(JSON.stringify(I));
            }
          );
        }
      ), (c = h.animations) != null && c.loop && h.animations.loop.composition.forEach(
        (y) => {
          var m;
          (m = y.details) != null && m.fonts && y.details.fonts.forEach(
            (I) => {
              n.add(JSON.stringify(I));
            }
          );
        }
      ), (d = h.animations) != null && d.out && h.animations.out.composition.forEach(
        (y) => {
          var m;
          (m = y.details) != null && m.fonts && y.details.fonts.forEach(
            (I) => {
              n.add(JSON.stringify(I));
            }
          );
        }
      );
    } else h.type === "illustration" && s.set(p, {
      trackItem: h,
      details: h.details
    });
  }
  n.size > 0 && await He(
    Array.from(n).map((p) => JSON.parse(p))
  );
  for (const [p, h] of s) {
    const y = await Ts(
      { ...h.trackItem, details: h.details },
      {
        size: { width: h.details.width, height: h.details.height }
      }
    ), m = Is(
      y.details.svgString,
      h.details.colorMap
    );
    y.details.svgString = m, e[p] = y;
  }
  const a = j(e);
  return {
    ...r,
    duration: a
  };
}
function ua(t) {
  const r = C(t);
  if (!r.activeIds.length) return;
  const e = r.activeIds, n = [], s = {
    activeIds: e,
    trackItemsMap: {},
    tracks: [],
    structure: []
  };
  e.forEach((d) => {
    s.trackItemsMap[d] = r.trackItemsMap[d], n.push(r.tracks.find((p) => p.items.includes(d)));
  });
  const a = /* @__PURE__ */ new Set();
  n.filter((d) => a.has(d.id) ? !1 : (a.add(d.id), !0)), s.tracks = Array.from(a), s.activeIds.forEach((d) => {
    if (s.trackItemsMap[d].type === "composition" || s.trackItemsMap[d].type === "template") {
      const p = r.structure.find(
        (h) => h.id === d
      );
      p && (s.structure.push(p), p.items.forEach((h) => {
        s.trackItemsMap[h] = r.trackItemsMap[h];
      }));
    }
  });
  let c = JSON.stringify(s);
  localStorage.setItem("DesignComboTemp", c);
}
function la(t, r) {
  const e = C(t);
  if (e.activeIds.length !== 1) return {};
  const n = e.activeIds[0], s = C(e.trackItemsMap[n]);
  if (r >= s.display.to || r <= s.display.from)
    return {};
  const a = Ie(), u = {
    ...s,
    display: {
      from: s.display.from,
      to: r
    }
  }, c = {
    ...s,
    id: a,
    display: {
      from: r,
      to: s.display.to
    }
  }, d = Object.values(e.transitionsMap).find(
    (h) => h.fromId === s.id && h.kind !== "none"
  ), p = Object.values(e.transitionsMap).find(
    (h) => h.toId === s.id && h.kind !== "none"
  );
  if (s.type === "video" || s.type === "audio") {
    const h = r - u.display.from;
    u.trim = {
      from: s.trim.from,
      to: s.trim.from + h
    }, c.trim = {
      from: s.trim.from + h,
      to: s.trim.to
    };
  }
  if (p) {
    const h = u.display.to - u.display.from;
    if (p.duration / 2 > h) {
      e.transitionIds = e.transitionIds.filter(
        (m) => m !== p.id
      );
      const y = {};
      e.transitionIds.forEach(
        (m) => y[m] = e.transitionsMap[m]
      ), e.transitionsMap = y;
    }
  }
  if (d) {
    const h = c.display.to - c.display.from, y = {};
    d.duration / 2 > h ? (e.transitionIds = e.transitionIds.filter(
      (m) => m !== d.id
    ), e.transitionIds.forEach(
      (m) => y[m] = e.transitionsMap[m]
    ), e.transitionsMap = y) : (e.transitionIds = e.transitionIds.map((m) => e.transitionsMap[m].fromId === u.id ? m.replace(u.id, a) : m), Object.keys(e.transitionsMap).forEach((m) => {
      if (e.transitionsMap[m].fromId === u.id) {
        const k = m.replace(u.id, a);
        y[k] = {
          ...e.transitionsMap[m],
          id: k,
          fromId: a
        };
      } else
        y[m] = e.transitionsMap[m];
    }), e.transitionsMap = y);
  }
  return e.trackItemsMap[n] = u, e.trackItemsMap[a] = c, e.trackItemIds.push(a), e.tracks.forEach((h) => {
    h.items.includes(n) && h.items.push(a);
  }), {
    tracks: e.tracks,
    trackItemIds: e.trackItemIds,
    trackItemsMap: e.trackItemsMap,
    transitionsMap: e.transitionsMap,
    transitionIds: e.transitionIds
  };
}
async function da(t, r) {
  const e = C(t), n = e.trackItemsMap, s = Object.keys(r);
  if (!s.length) return {};
  for (const c of s) {
    const d = r[c];
    if (d.details && (n[c].details = {
      ...n[c].details,
      ...d.details
    }, d.details.colorMap)) {
      const p = n[c].details.initialSvgString, h = Is(
        p,
        d.details.colorMap
      );
      n[c].details.svgString = h;
    }
    if (d.metadata && (n[c].metadata ? n[c].metadata = {
      ...n[c].metadata,
      ...d.metadata
    } : n[c].metadata = d.metadata), d.display || d.playbackRate) {
      const p = d.playbackRate, h = n[c].playbackRate || 1, y = n[c].display, k = (y.to - y.from) * h / p, b = {
        from: y.from,
        to: y.from + k
      };
      n[c].display = b, n[c].playbackRate = p;
    }
    d.animations && (n[c].animations = {
      ...n[c].animations,
      ...d.animations
    });
  }
  for (const c of s) {
    const d = r[c];
    if (n[c].type === "shape" && d.details.src) {
      const p = await Ue(d.details.src);
      n[c].details.width = p.width, n[c].details.height = p.height;
    }
  }
  if (s.some((c) => {
    const d = r[c];
    return d.display !== void 0 || d.playbackRate !== void 0;
  })) {
    const c = e.tracks.filter((h) => h.magnetic);
    s.filter((h) => c.some((y) => y.items.includes(h))).length > 0 && q(c, n, []);
    const p = [];
    for (const h of s) {
      const y = r[h];
      if (y.playbackRate === void 0 && y.display === void 0)
        continue;
      const m = n[h];
      if (!m) continue;
      const I = e.tracks.find(
        (v) => v.items.includes(h)
      );
      if (!I || I.magnetic) continue;
      const k = m.display;
      if (Object.values(
        e.transitionsMap
      ).filter(
        (v) => v.fromId === h || v.toId === h
      ).forEach((v) => {
        const T = n[v.fromId], w = n[v.toId];
        if (!T || !w) {
          p.push(v.id);
          return;
        }
        const E = T.display, _ = w.display, M = E.to, L = _.from;
        Math.abs(M - L) <= 1 || p.push(v.id);
      }), I.items.map((v) => n[v]).filter((v) => v && v.id !== h).some((v) => {
        const T = v.display.from, w = v.display.to, E = k.from;
        return !(k.to <= T || E >= w);
      })) {
        const v = e.tracks.findIndex(
          (E) => E.id === I.id
        );
        I.items = I.items.filter(
          (E) => E !== h
        );
        const T = {
          id: Pn(),
          accepts: Object.keys(ms()),
          type: m.type,
          items: [h],
          magnetic: !1,
          static: !1,
          muted: !1
        }, w = Math.max(0, v - 1);
        e.tracks.splice(w, 0, T);
      }
    }
    p.length > 0 && (e.transitionIds = e.transitionIds.filter(
      (h) => !p.includes(h)
    ), p.forEach((h) => {
      delete e.transitionsMap[h];
    }));
  }
  const u = j(n);
  return {
    trackItemsMap: { ...n },
    tracks: e.tracks,
    transitionIds: e.transitionIds,
    transitionsMap: e.transitionsMap,
    duration: u
  };
}
async function fa(t, r) {
  const e = C(t), n = Object.keys(r)[0], s = Object.values(r)[0], a = e.trackItemsMap[n], u = a.details;
  if (!s.details.src) return {};
  if (a.type === "image") {
    const p = await Ue(s.details.src), h = a.details.width || 0, y = a.details.height || 0;
    let m = p.width, I = p.height;
    const k = p.width / p.height;
    h / y > k ? (m = h, I = h / k) : (I = y, m = y * k), u.crop = {
      x: 0,
      y: 0,
      height: u.height,
      width: u.width
    }, s.details.width = m, s.details.height = I;
  } else if (a.type === "video") {
    const p = await zn(s.details.src), h = a.details.width || 0, y = a.details.height || 0;
    let m = p.width, I = p.height;
    const k = p.width / p.height;
    h / y > k ? (m = h, I = h / k) : (I = y, m = y * k), u.crop = {
      x: 0,
      y: 0,
      height: u.height,
      width: u.width
    }, s.details.width = m, s.details.height = I, a.duration = p.duration, a.trim = {
      from: 0,
      to: p.duration
    };
    const b = a.playbackRate || 1, S = p.duration / b, f = a.display.from + S;
    a.display = {
      from: a.display.from,
      to: (a.duration || 0) >= p.duration ? a.display.to : f
    };
  }
  s.details && (a.details = { ...u, ...s.details }, s.details = a.details), e.trackItemsMap[n] = {
    ...e.trackItemsMap[n],
    type: s.type
  }, a.type === "video" && (e.trackItemsMap[n].display = a.display, e.trackItemsMap[n].duration = a.duration, e.trackItemsMap[n].trim = a.trim);
  const c = e.tracks.find(
    (p) => p.items.includes(n)
  );
  if (c && c.magnetic && a.type === "video") {
    const p = e.tracks.filter((h) => h.magnetic);
    q(p, e.trackItemsMap, []);
  }
  const d = j(e.trackItemsMap);
  return {
    trackItemsMap: {
      ...e.trackItemsMap
    },
    tracks: e.tracks,
    duration: d
  };
}
function pa(t, r) {
  const e = C(t);
  return e.background.value = r.value, e.background.type = r.type || "color", {
    ...e
  };
}
function ha(t, { idTrack: r, idItems: e }, n) {
  const s = n.tracks.find((c) => c.id === r);
  if (!s || !s.magnetic) return;
  let u = s.items.reduce(
    (c, d) => {
      const p = n.trackItemsMap[d];
      return p.display.to > c.display.to ? p : c;
    },
    { display: { to: 0 } }
  ).display.to;
  e.forEach((c) => {
    const d = t.find((y) => String(y.id) === String(c));
    if (!d) return;
    const p = d.playbackRate || 1;
    let h;
    (d.type === "video" || d.type === "audio") && d.trim ? h = (d.trim.to - d.trim.from) / p : h = d.display.to - d.display.from, d.display.from = u, d.display.to = u + h, u = u + h;
  });
}
async function ma(t, r, e = {}) {
  var m;
  const n = C(t), s = r.trackItems.map(
    (I) => oa(I, {
      size: n.size
    })
  ), a = await Promise.all(s);
  (m = r.tracks) == null || m.forEach((I) => {
    ha(
      a,
      { idTrack: I.id, idItems: I.items },
      n
    );
  });
  const u = Cs(r.tracks, r.trackItems), c = [], d = a.map((I) => I.id);
  r.trackItems.forEach((I) => {
    if (I.type !== "template") return;
    n.trackItemsMap = {
      ...n.trackItemsMap,
      ...I.trackItemsMap
    }, n.transitionsMap = {
      ...n.transitionsMap,
      ...I.transitionsMap
    };
    const k = {
      id: I.id,
      items: I.trackItemIds,
      transitions: I.transitionsIds || [],
      tracks: I.tracks
    };
    c.push(k);
  });
  const p = [], h = {};
  return a.forEach((I) => {
    p.push(I.id), h[I.id] = I;
  }), u.map((I) => Os(n.tracks, [I]) ? I : null).forEach((I, k) => {
    if (I)
      n.tracks.forEach((b) => {
        b.id === I.id && (b.items = b.items.concat(I.items), b.magnetic && q(
          [b],
          n.trackItemsMap,
          d
        ));
      });
    else {
      const b = e.trackIndex || 0, S = u[k], f = Math.min(
        Math.max(b, 0),
        n.tracks.length
      );
      n.tracks.splice(f, 0, S);
    }
  }), n.trackItemsMap = {
    ...n.trackItemsMap,
    ...h
  }, n.trackItemIds = [
    ...n.trackItemIds,
    ...p
  ], n.structure = [...n.structure, ...c], n.duration = j(n.trackItemsMap), {
    trackItemIds: n.trackItemIds,
    trackItemsMap: n.trackItemsMap,
    tracks: n.tracks,
    duration: n.duration,
    structure: n.structure,
    transitionIds: n.transitionIds,
    transitionsMap: n.transitionsMap
  };
}
function St(t, r, e = {
  isNewTrack: !0
}) {
  const n = r.map((u) => u.id), s = [], a = {};
  if (r.forEach((u) => {
    s.push(u.id), a[u.id] = u;
  }), (e.targetTrackIndex !== void 0 || e.targetTrackId) && !e.isNewTrack) {
    const u = e.targetTrackIndex || 0, c = e.targetTrackId;
    let d = t.tracks[u];
    if (c && (d = t.tracks.find((p) => p.id === c)), !d)
      throw new Error("Target track not found");
    d.items.push(...s);
  } else {
    const u = {
      id: Pn(),
      accepts: Object.keys(ms()),
      type: r[0].type,
      items: n,
      magnetic: !1,
      static: !1,
      muted: !1
    };
    t.tracks.splice(e.targetTrackIndex || 0, 0, u);
  }
  return t.trackItemsMap = {
    ...t.trackItemsMap,
    ...a
  }, t.trackItemIds = [
    ...t.trackItemIds,
    ...s
  ], t;
}
async function ya(t, r, e = {}) {
  const n = C(t), s = [
    Ms(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e), d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), c.duration = j(c.trackItemsMap), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function ga(t, r, e = {}) {
  const n = C(t), s = [Ss(r)], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function Ia(t, r, e = {}) {
  const n = C(t), s = [
    _s(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function ba(t, r, e = {}) {
  const n = C(t), s = [
    As(r, {
      size: e.size
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function ka(t, r, e = {}) {
  const n = C(t), s = [
    ia(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function va(t, r, e = {}) {
  const n = C(t), s = [
    Ts(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function _a(t, r, e = {}) {
  const n = C(t), s = "composition", a = r.trackItemsMap, u = r.trackItemIds, c = r.tracks || [], d = r.trackItemDetailsMap, { details: p, ...h } = await sa(r, {
    size: n.size,
    scaleMode: e.scaleMode,
    scaleAspectRatio: e.scaleAspectRatio
  }), y = {
    id: h.id,
    items: u,
    transitions: [],
    tracks: c
  }, I = [{
    ...h,
    type: s,
    details: p
  }], k = St(n, I, e);
  k.trackItemsMap = {
    ...k.trackItemsMap,
    ...a,
    [h.id]: {
      ...h,
      type: s,
      details: p
    }
  }, k.structure = [...k.structure, y], k.duration = j(k.trackItemsMap);
  const b = k.tracks.filter((S) => S.magnetic);
  return q(b, k.trackItemsMap, [h.id]), d && Object.keys(d).forEach((S) => {
    k.trackItemsMap[S] = {
      ...k.trackItemsMap[S],
      details: {
        ...d[S].details
      }
    };
  }), {
    trackItemIds: k.trackItemIds,
    trackItemsMap: k.trackItemsMap,
    tracks: k.tracks,
    duration: k.duration,
    structure: k.structure
  };
}
async function ye(t, r, e = {}, n) {
  const s = C(t), a = (y) => y.display ? y.display : {
    from: 0,
    to: s.duration
  }, u = [];
  n === "progress-bar" && u.push(
    ta(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ), n === "progress-frame" && u.push(
    ea(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ), n === "radial-audio-bars" && (r.display = a(r), u.push(
    ra(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "lineal-audio-bars" && (r.display = a(r), u.push(
    mn(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "wave-audio-bars" && (r.display = a(r), u.push(
    mn(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "hill-audio-bars" && (r.display = a(r), u.push(
    mn(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "progress-square" && u.push(
    na(r, {
      size: s.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  );
  const c = await Promise.all(u), d = c.map((y) => y.id), p = St(s, c, e);
  p.duration = j(p.trackItemsMap);
  const h = p.tracks.filter((y) => y.magnetic);
  return q(h, p.trackItemsMap, d), {
    trackItemIds: p.trackItemIds,
    trackItemsMap: p.trackItemsMap,
    tracks: p.tracks,
    duration: p.duration
  };
}
async function Sa(t, r, e = {}) {
  const n = C(t), s = "template", a = r.trackItemsMap, u = r.trackItemIds, c = r.transitionsMap, d = r.transitionIds || [], p = r.tracks || [], h = r.structure || [], { details: y, ...m } = await ws(r, {
    size: n.size,
    scaleMode: e.scaleMode,
    scaleAspectRatio: e.scaleAspectRatio
  }), I = {
    id: m.id,
    items: u,
    transitions: d,
    tracks: p
  }, b = [{
    ...m,
    type: s,
    details: y
  }], S = St(n, b, e);
  S.transitionIds = [
    ...S.transitionIds,
    ...d
  ], S.transitionsMap = {
    ...S.transitionsMap,
    ...c
  }, S.trackItemsMap = {
    ...S.trackItemsMap,
    ...a,
    [m.id]: {
      ...m,
      type: s,
      details: y
    }
  }, S.structure = [
    ...S.structure,
    I,
    ...h
  ], S.duration = j(S.trackItemsMap);
  const f = S.tracks.filter((v) => v.magnetic);
  return q(f, S.trackItemsMap, [m.id]), {
    trackItemIds: S.trackItemIds,
    trackItemsMap: S.trackItemsMap,
    tracks: S.tracks,
    duration: S.duration,
    structure: S.structure,
    transitionsMap: S.transitionsMap
  };
}
async function wa(t, r, e = {}) {
  const n = C(t), s = r.trackItems.map(
    (y) => Es(y, {
      size: e.size
    })
  ), a = await Promise.all(s), u = Cs(r.tracks, r.trackItems), c = [], d = {};
  if (a.forEach((y) => {
    const { details: m, ...I } = y;
    c.push(y.id), d[y.id] = I;
  }), Os(
    n.tracks,
    u
  ))
    n.tracks.forEach((y) => {
      u.forEach((m) => {
        y.id === m.id && (y.magnetic && q(
          [y],
          n.trackItemsMap,
          c
        ), y.items.push(...c));
      });
    });
  else {
    const y = e.trackIndex || 0, m = Math.min(
      Math.max(y, 0),
      n.tracks.length
    );
    n.tracks.splice(m, 0, ...u);
  }
  n.trackItemsMap = {
    ...n.trackItemsMap,
    ...d
  }, n.trackItemIds = [
    ...n.trackItemIds,
    ...c
  ], n.duration = j(n.trackItemsMap);
  const h = n.tracks.filter((y) => y.magnetic);
  return q(
    h,
    n.trackItemsMap,
    c
  ), {
    trackItemIds: n.trackItemIds,
    trackItemsMap: n.trackItemsMap,
    tracks: n.tracks,
    duration: n.duration
  };
}
async function Ta(t, r) {
  const e = C(t), n = e.trackItemsMap[r.id], s = [];
  if (!n) return {};
  let a = n.animations || {};
  return r.animations.loop ? r.animations.loop.composition.forEach(
    (u) => {
      var c;
      (c = u.details) != null && c.fonts && s.push(...u.details.fonts);
    }
  ) : r.animations.in ? r.animations.in.composition.forEach(
    (u) => {
      var c;
      (c = u.details) != null && c.fonts && s.push(...u.details.fonts);
    }
  ) : r.animations.out ? r.animations.out.composition.forEach(
    (u) => {
      var c;
      (c = u.details) != null && c.fonts && s.push(...u.details.fonts);
    }
  ) : r.animations.timed && r.animations.timed.composition.forEach(
    (u) => {
      var c;
      (c = u.details) != null && c.fonts && s.push(...u.details.fonts);
    }
  ), s.length > 0 && await He(s), a.in && r.animations.in ? a.in = r.animations.in : a.out && r.animations.out ? a.out = r.animations.out : a.loop && r.animations.loop ? a.loop = r.animations.loop : !a.out && r.animations.out ? a.out = r.animations.out : !a.in && r.animations.in ? a.in = r.animations.in : !a.loop && r.animations.loop ? a.loop = r.animations.loop : a = r.animations, (r.animations.in || r.animations.out || r.animations.loop) && delete a.timed, r.animations.timed && (a.timed = r.animations.timed, delete a.in, delete a.out, delete a.loop), n.animations = a, {
    trackItemsMap: e.trackItemsMap
  };
}
async function Ma(t, r, e = {}) {
  const n = C(t), s = [
    aa(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], a = await Promise.all(s), u = a.map((p) => p.id), c = St(n, a, e);
  c.duration = j(c.trackItemsMap);
  const d = c.tracks.filter((p) => p.magnetic);
  return q(d, c.trackItemsMap, u), {
    trackItemIds: c.trackItemIds,
    trackItemsMap: c.trackItemsMap,
    tracks: c.tracks,
    duration: c.duration
  };
}
async function Ea(t, r) {
  const e = C(t), n = e.tracks, s = Object.keys(r);
  if (!s.length) return e;
  for (const u of s)
    e.tracks = n.map((c) => {
      if (c.id === u) {
        const d = r[u] || {};
        c = {
          ...c,
          magnetic: d.magnetic !== void 0 ? d.magnetic : c.magnetic,
          muted: d.muted !== void 0 ? d.muted : c.muted
        };
      }
      return c;
    });
  if (e.tracks.some((u) => u.magnetic)) {
    const u = e.tracks.filter((c) => c.magnetic);
    q(u, e.trackItemsMap, []);
  }
  const a = j(e.trackItemsMap);
  return {
    ...e,
    duration: a
  };
}
function Aa(t) {
  const r = qt.pipe(
    Jt(({ key: f }) => f.startsWith(Kn))
  ), e = qt.pipe(
    Jt(({ key: f }) => f.startsWith(Rn))
  ), n = qt.pipe(
    Jt(({ key: f }) => f.startsWith(H))
  ), s = qt.pipe(
    Jt(({ key: f }) => f.startsWith(tt))
  ), a = qt.pipe(
    Jt(({ key: f }) => f.startsWith(Er))
  ), u = qt.pipe(
    Jt(({ key: f }) => f.startsWith(Le))
  ), c = qt.pipe(
    Jt(({ key: f }) => f.startsWith(zt))
  ), d = qt.pipe(
    Jt(({ key: f }) => f.startsWith(fs))
  ), p = r.subscribe(async (f) => {
    var v;
    if (f.key === Kn) {
      const { actions: T } = (v = f.value) == null ? void 0 : v.payload;
      T.forEach((w) => {
        Ws(w.type, w.payload && { payload: w.payload });
      });
    }
  }), h = e.subscribe(async (f) => {
    var v, T;
    if (f.key === ai) {
      const w = (v = f.value) == null ? void 0 : v.payload, E = await ca(t.getState(), w);
      t.updateState(E, {
        kind: "design:load",
        updateHistory: !1
      });
    }
    if (f.key === oi) {
      const w = (T = f.value) == null ? void 0 : T.payload;
      t.updateState(
        {
          size: w
        },
        {
          kind: "design:resize",
          updateHistory: !1
        }
      );
    }
  }), y = a.subscribe((f) => {
    if (f.key === Ni) return t.undo();
    if (f.key === Li) return t.redo();
  }), m = d.subscribe((f) => {
    var v;
    if (f.key === Hi) {
      const T = (v = f.value) == null ? void 0 : v.payload.scale;
      t.updateState(
        {
          scale: T
        },
        {
          kind: "update",
          updateHistory: !1
        }
      );
    }
  }), I = s.subscribe(async (f) => {
    var v, T, w, E;
    if (f.key === Pi) {
      const _ = ((v = f.value) == null ? void 0 : v.payload.trackItemIds) || [];
      t.updateState(
        { activeIds: _ },
        {
          kind: "update",
          updateHistory: !1
        }
      );
    }
    if (f.key === Di && ua(t.getState()), f.key === $i) {
      const _ = (T = f.value) == null ? void 0 : T.payload.trackItemIds, M = ji(t.getState(), _);
      t.updateState(M, { updateHistory: !0, kind: "remove" });
    }
    if (f.key === zi) {
      const _ = qi(
        t.getState(),
        (w = f.value) == null ? void 0 : w.payload.trackItemIds
      );
      t.updateState(_, {
        updateHistory: !0,
        kind: "update"
      });
    }
    if (f.key === Fi) {
      const _ = (E = f.value) == null ? void 0 : E.payload, M = await Vi(t.getState(), _);
      t.updateState(M, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
  }), k = n.subscribe(async (f) => {
    var L, R, G, x, F, et, Qt, te, Se, we, Te, Me, z, Ee, Ae, st, ee, $, re, xe, it, ne, se, $t, Ft, ie, Nt, ae, Lt, oe, Oe, Ce, wt, Ht, ce, ue, ut, Tt, Re, yt, Mt, Ut, rt, le, de, Pe, Wt, Et, fe, At, gt, at, xt, jt, It, Bt, bt, Yt, Gt;
    const v = C(t.getState()), T = ((R = (L = f.value) == null ? void 0 : L.options) == null ? void 0 : R.isSelected) || !1, w = (x = (G = f.value) == null ? void 0 : G.options) == null ? void 0 : x.scaleMode, E = (et = (F = f.value) == null ? void 0 : F.options) == null ? void 0 : et.scaleAspectRatio, _ = (te = (Qt = f.value) == null ? void 0 : Qt.options) == null ? void 0 : te.trackIndex;
    let M = {};
    f.key === hi ? M = await Ta(v, (Se = f.value) == null ? void 0 : Se.payload) : f.key === gi ? M = await ma(v, (we = f.value) == null ? void 0 : we.payload, {
      trackIndex: _
    }) : f.key === mi ? M = await wa(v, (Te = f.value) == null ? void 0 : Te.payload, {
      trackIndex: _
    }) : f.key === ci ? M = await ba(v, (Me = f.value) == null ? void 0 : Me.payload, {
      targetTrackIndex: _,
      targetTrackId: (z = f.value) == null ? void 0 : z.options.targetTrackId,
      size: v.size,
      isNewTrack: (Ae = (Ee = f.value) == null ? void 0 : Ee.options) == null ? void 0 : Ae.isNewTrack
    }) : f.key === yi ? M = await Sa(v, (st = f.value) == null ? void 0 : st.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: ($ = (ee = f.value) == null ? void 0 : ee.options) == null ? void 0 : $.targetTrackId
    }) : f.key === fi ? M = await va(v, (re = f.value) == null ? void 0 : re.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: (xe = f.value) == null ? void 0 : xe.options.targetTrackId
    }) : f.key === pi ? M = await ka(v, (it = f.value) == null ? void 0 : it.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: (ne = f.value) == null ? void 0 : ne.options.targetTrackId
    }) : f.key === Mi ? M = await Ma(v, (se = f.value) == null ? void 0 : se.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: ($t = f.value) == null ? void 0 : $t.options.targetTrackId
    }) : f.key === di ? M = await ya(v, (Ft = f.value) == null ? void 0 : Ft.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: (ie = f.value) == null ? void 0 : ie.options.targetTrackId,
      isNewTrack: (ae = (Nt = f.value) == null ? void 0 : Nt.options) == null ? void 0 : ae.isNewTrack
    }) : f.key === li ? M = await ga(v, (Lt = f.value) == null ? void 0 : Lt.payload, {
      targetTrackIndex: _,
      targetTrackId: (oe = f.value) == null ? void 0 : oe.options.targetTrackId,
      isNewTrack: (Ce = (Oe = f.value) == null ? void 0 : Oe.options) == null ? void 0 : Ce.isNewTrack
    }) : f.key === ui ? M = await Ia(v, (wt = f.value) == null ? void 0 : wt.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: (Ht = f.value) == null ? void 0 : Ht.options.targetTrackId,
      isNewTrack: (ue = (ce = f.value) == null ? void 0 : ce.options) == null ? void 0 : ue.isNewTrack
    }) : f.key === Ii ? M = await _a(v, (ut = f.value) == null ? void 0 : ut.payload, {
      scaleMode: w,
      scaleAspectRatio: E,
      targetTrackIndex: _,
      targetTrackId: (Tt = f.value) == null ? void 0 : Tt.options.targetTrackId
    }) : f.key === bi ? M = await ye(
      v,
      (Re = f.value) == null ? void 0 : Re.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Mt = (yt = f.value) == null ? void 0 : yt.options) == null ? void 0 : Mt.targetTrackId
      },
      "progress-bar"
    ) : f.key === Si ? M = await ye(
      v,
      (Ut = f.value) == null ? void 0 : Ut.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (le = (rt = f.value) == null ? void 0 : rt.options) == null ? void 0 : le.targetTrackId
      },
      "progress-square"
    ) : f.key === ki ? M = await ye(
      v,
      (de = f.value) == null ? void 0 : de.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Wt = (Pe = f.value) == null ? void 0 : Pe.options) == null ? void 0 : Wt.targetTrackId
      },
      "progress-frame"
    ) : f.key === vi ? M = await ye(
      v,
      (Et = f.value) == null ? void 0 : Et.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (At = (fe = f.value) == null ? void 0 : fe.options) == null ? void 0 : At.targetTrackId
      },
      "radial-audio-bars"
    ) : f.key === _i ? M = await ye(
      v,
      (gt = f.value) == null ? void 0 : gt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (xt = (at = f.value) == null ? void 0 : at.options) == null ? void 0 : xt.targetTrackId
      },
      "lineal-audio-bars"
    ) : f.key === wi ? M = await ye(
      v,
      (jt = f.value) == null ? void 0 : jt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Bt = (It = f.value) == null ? void 0 : It.options) == null ? void 0 : Bt.targetTrackId
      },
      "wave-audio-bars"
    ) : f.key === Ti && (M = await ye(
      v,
      (bt = f.value) == null ? void 0 : bt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Gt = (Yt = f.value) == null ? void 0 : Yt.options) == null ? void 0 : Gt.targetTrackId
      },
      "hill-audio-bars"
    )), T && M.trackItemIds && (M.activeIds = M.trackItemIds), t.updateState(M, {
      updateHistory: !0,
      kind: "add"
    });
  }), b = u.subscribe(async (f) => {
    var v;
    if (f.key === Ri) {
      const T = (v = f.value) == null ? void 0 : v.options.time, w = la(t.getState(), T);
      Object.keys(w).length > 0 && t.updateState(w, {
        updateHistory: !0,
        kind: "update"
      });
    }
    if (f.key === Ci) {
      const T = await Gi(t.getState());
      t.updateState(T, {
        updateHistory: !0,
        kind: "update"
      });
    }
  }), S = c.subscribe(async (f) => {
    var v, T, w, E;
    if (f.key === Ei) {
      const _ = await da(
        t.getState(),
        (v = f.value) == null ? void 0 : v.payload
      );
      t.updateState(_, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
    if (f.key === Oi) {
      const _ = await Ea(
        t.getState(),
        (T = f.value) == null ? void 0 : T.payload
      );
      t.updateState(_, {
        updateHistory: !0,
        kind: "edit:track"
      });
    }
    if (f.key === Ai) {
      const _ = await fa(
        t.getState(),
        (w = f.value) == null ? void 0 : w.payload
      );
      t.updateState(_, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
    if (f.key === xi) {
      const _ = pa(t.getState(), (E = f.value) == null ? void 0 : E.payload);
      t.updateState(_, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
  });
  return {
    unsubscribe: () => {
      k.unsubscribe(), b.unsubscribe(), S.unsubscribe(), y.unsubscribe(), I.unsubscribe(), h.unsubscribe(), m.unsubscribe(), p.unsubscribe();
    }
  };
}
const xa = { Date: !0, RegExp: !0, String: !0, Number: !0 };
function Rs(t, r, e = { cyclesFix: !0 }, n = []) {
  var c, d;
  let s = [];
  const a = Array.isArray(t);
  for (const p in t) {
    const h = t[p], y = a ? +p : p;
    if (!(p in r)) {
      s.push({
        type: "REMOVE",
        path: [y],
        oldValue: t[p]
      });
      continue;
    }
    const m = r[p], I = typeof h == "object" && typeof m == "object" && Array.isArray(h) === Array.isArray(m);
    h && m && I && !xa[(d = (c = Object.getPrototypeOf(h)) == null ? void 0 : c.constructor) == null ? void 0 : d.name] && (!e.cyclesFix || !n.includes(h)) ? s.push.apply(s, Rs(h, m, e, e.cyclesFix ? n.concat([h]) : []).map((k) => (k.path.unshift(y), k))) : h !== m && // treat NaN values as equivalent
    !(Number.isNaN(h) && Number.isNaN(m)) && !(I && (isNaN(h) ? h + "" == m + "" : +h == +m)) && s.push({
      path: [y],
      type: "CHANGE",
      value: m,
      oldValue: h
    });
  }
  const u = Array.isArray(r);
  for (const p in r)
    p in t || s.push({
      type: "CREATE",
      path: [u ? +p : p],
      value: r[p]
    });
  return s;
}
var $n = Symbol.for("immer-nothing"), Je = Symbol.for("immer-draftable"), lt = Symbol.for("immer-state"), Ps = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(t) {
    return `The plugin for '${t}' has not been loaded into Immer. To enable the plugin, import and call \`enable${t}()\` when initializing your application.`;
  },
  function(t) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${t}'`;
  },
  "This object has been frozen and should not be mutated",
  function(t) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + t;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(t) {
    return `'current' expects a draft, got: ${t}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(t) {
    return `'original' expects a draft, got: ${t}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function Y(t, ...r) {
  if (process.env.NODE_ENV !== "production") {
    const e = Ps[t], n = typeof e == "function" ? e.apply(null, r) : e;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var be = Object.getPrototypeOf;
function ke(t) {
  return !!t && !!t[lt];
}
function Zt(t) {
  var r;
  return t ? Ds(t) || Array.isArray(t) || !!t[Je] || !!((r = t.constructor) != null && r[Je]) || sr(t) || ir(t) : !1;
}
var Oa = Object.prototype.constructor.toString();
function Ds(t) {
  if (!t || typeof t != "object")
    return !1;
  const r = be(t);
  if (r === null)
    return !0;
  const e = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
  return e === Object ? !0 : typeof e == "function" && Function.toString.call(e) === Oa;
}
function Ze(t, r) {
  ve(t) === 0 ? Reflect.ownKeys(t).forEach((e) => {
    r(e, t[e], t);
  }) : t.forEach((e, n) => r(n, e, t));
}
function ve(t) {
  const r = t[lt];
  return r ? r.type_ : Array.isArray(t) ? 1 : sr(t) ? 2 : ir(t) ? 3 : 0;
}
function Qe(t, r) {
  return ve(t) === 2 ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r);
}
function yn(t, r) {
  return ve(t) === 2 ? t.get(r) : t[r];
}
function zs(t, r, e) {
  const n = ve(t);
  n === 2 ? t.set(r, e) : n === 3 ? t.add(e) : t[r] = e;
}
function Ca(t, r) {
  return t === r ? t !== 0 || 1 / t === 1 / r : t !== t && r !== r;
}
function sr(t) {
  return t instanceof Map;
}
function ir(t) {
  return t instanceof Set;
}
function ge(t) {
  return t.copy_ || t.base_;
}
function Tn(t, r) {
  if (sr(t))
    return new Map(t);
  if (ir(t))
    return new Set(t);
  if (Array.isArray(t))
    return Array.prototype.slice.call(t);
  const e = Ds(t);
  if (r === !0 || r === "class_only" && !e) {
    const n = Object.getOwnPropertyDescriptors(t);
    delete n[lt];
    let s = Reflect.ownKeys(n);
    for (let a = 0; a < s.length; a++) {
      const u = s[a], c = n[u];
      c.writable === !1 && (c.writable = !0, c.configurable = !0), (c.get || c.set) && (n[u] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: c.enumerable,
        value: t[u]
      });
    }
    return Object.create(be(t), n);
  } else {
    const n = be(t);
    if (n !== null && e)
      return { ...t };
    const s = Object.create(n);
    return Object.assign(s, t);
  }
}
function Fn(t, r = !1) {
  return Ar(t) || ke(t) || !Zt(t) || (ve(t) > 1 && (t.set = t.add = t.clear = t.delete = Ra), Object.freeze(t), r && Object.entries(t).forEach(([e, n]) => Fn(n, !0))), t;
}
function Ra() {
  Y(2);
}
function Ar(t) {
  return Object.isFrozen(t);
}
var Mn = {};
function _e(t) {
  const r = Mn[t];
  return r || Y(0, t), r;
}
function Pa(t, r) {
  Mn[t] || (Mn[t] = r);
}
var tr;
function $s() {
  return tr;
}
function Da(t, r) {
  return {
    drafts_: [],
    parent_: t,
    immer_: r,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function Jn(t, r) {
  r && (_e("Patches"), t.patches_ = [], t.inversePatches_ = [], t.patchListener_ = r);
}
function En(t) {
  An(t), t.drafts_.forEach(za), t.drafts_ = null;
}
function An(t) {
  t === tr && (tr = t.parent_);
}
function Zn(t) {
  return tr = Da(tr, t);
}
function za(t) {
  const r = t[lt];
  r.type_ === 0 || r.type_ === 1 ? r.revoke_() : r.revoked_ = !0;
}
function Qn(t, r) {
  r.unfinalizedDrafts_ = r.drafts_.length;
  const e = r.drafts_[0];
  return t !== void 0 && t !== e ? (e[lt].modified_ && (En(r), Y(4)), Zt(t) && (t = wr(r, t), r.parent_ || Tr(r, t)), r.patches_ && _e("Patches").generateReplacementPatches_(
    e[lt].base_,
    t,
    r.patches_,
    r.inversePatches_
  )) : t = wr(r, e, []), En(r), r.patches_ && r.patchListener_(r.patches_, r.inversePatches_), t !== $n ? t : void 0;
}
function wr(t, r, e) {
  if (Ar(r))
    return r;
  const n = r[lt];
  if (!n)
    return Ze(
      r,
      (s, a) => ts(t, n, r, s, a, e)
    ), r;
  if (n.scope_ !== t)
    return r;
  if (!n.modified_)
    return Tr(t, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const s = n.copy_;
    let a = s, u = !1;
    n.type_ === 3 && (a = new Set(s), s.clear(), u = !0), Ze(
      a,
      (c, d) => ts(t, n, s, c, d, e, u)
    ), Tr(t, s, !1), e && t.patches_ && _e("Patches").generatePatches_(
      n,
      e,
      t.patches_,
      t.inversePatches_
    );
  }
  return n.copy_;
}
function ts(t, r, e, n, s, a, u) {
  if (process.env.NODE_ENV !== "production" && s === e && Y(5), ke(s)) {
    const c = a && r && r.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Qe(r.assigned_, n) ? a.concat(n) : void 0, d = wr(t, s, c);
    if (zs(e, n, d), ke(d))
      t.canAutoFreeze_ = !1;
    else
      return;
  } else u && e.add(s);
  if (Zt(s) && !Ar(s)) {
    if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1)
      return;
    wr(t, s), (!r || !r.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(e, n) && Tr(t, s);
  }
}
function Tr(t, r, e = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && Fn(r, e);
}
function $a(t, r) {
  const e = Array.isArray(t), n = {
    type_: e ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: r ? r.scope_ : $s(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: r,
    // The base state.
    base_: t,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let s = n, a = Nn;
  e && (s = [n], a = er);
  const { revoke: u, proxy: c } = Proxy.revocable(s, a);
  return n.draft_ = c, n.revoke_ = u, c;
}
var Nn = {
  get(t, r) {
    if (r === lt)
      return t;
    const e = ge(t);
    if (!Qe(e, r))
      return Fa(t, e, r);
    const n = e[r];
    return t.finalized_ || !Zt(n) ? n : n === gn(t.base_, r) ? (In(t), t.copy_[r] = On(n, t)) : n;
  },
  has(t, r) {
    return r in ge(t);
  },
  ownKeys(t) {
    return Reflect.ownKeys(ge(t));
  },
  set(t, r, e) {
    const n = Fs(ge(t), r);
    if (n != null && n.set)
      return n.set.call(t.draft_, e), !0;
    if (!t.modified_) {
      const s = gn(ge(t), r), a = s == null ? void 0 : s[lt];
      if (a && a.base_ === e)
        return t.copy_[r] = e, t.assigned_[r] = !1, !0;
      if (Ca(e, s) && (e !== void 0 || Qe(t.base_, r)))
        return !0;
      In(t), xn(t);
    }
    return t.copy_[r] === e && // special case: handle new props with value 'undefined'
    (e !== void 0 || r in t.copy_) || // special case: NaN
    Number.isNaN(e) && Number.isNaN(t.copy_[r]) || (t.copy_[r] = e, t.assigned_[r] = !0), !0;
  },
  deleteProperty(t, r) {
    return gn(t.base_, r) !== void 0 || r in t.base_ ? (t.assigned_[r] = !1, In(t), xn(t)) : delete t.assigned_[r], t.copy_ && delete t.copy_[r], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(t, r) {
    const e = ge(t), n = Reflect.getOwnPropertyDescriptor(e, r);
    return n && {
      writable: !0,
      configurable: t.type_ !== 1 || r !== "length",
      enumerable: n.enumerable,
      value: e[r]
    };
  },
  defineProperty() {
    Y(11);
  },
  getPrototypeOf(t) {
    return be(t.base_);
  },
  setPrototypeOf() {
    Y(12);
  }
}, er = {};
Ze(Nn, (t, r) => {
  er[t] = function() {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
});
er.deleteProperty = function(t, r) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(r)) && Y(13), er.set.call(this, t, r, void 0);
};
er.set = function(t, r, e) {
  return process.env.NODE_ENV !== "production" && r !== "length" && isNaN(parseInt(r)) && Y(14), Nn.set.call(this, t[0], r, e, t[0]);
};
function gn(t, r) {
  const e = t[lt];
  return (e ? ge(e) : t)[r];
}
function Fa(t, r, e) {
  var s;
  const n = Fs(r, e);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (s = n.get) == null ? void 0 : s.call(t.draft_)
  ) : void 0;
}
function Fs(t, r) {
  if (!(r in t))
    return;
  let e = be(t);
  for (; e; ) {
    const n = Object.getOwnPropertyDescriptor(e, r);
    if (n)
      return n;
    e = be(e);
  }
}
function xn(t) {
  t.modified_ || (t.modified_ = !0, t.parent_ && xn(t.parent_));
}
function In(t) {
  t.copy_ || (t.copy_ = Tn(
    t.base_,
    t.scope_.immer_.useStrictShallowCopy_
  ));
}
var Na = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (r, e, n) => {
      if (typeof r == "function" && typeof e != "function") {
        const a = e;
        e = r;
        const u = this;
        return function(d = a, ...p) {
          return u.produce(d, (h) => e.call(this, h, ...p));
        };
      }
      typeof e != "function" && Y(6), n !== void 0 && typeof n != "function" && Y(7);
      let s;
      if (Zt(r)) {
        const a = Zn(this), u = On(r, void 0);
        let c = !0;
        try {
          s = e(u), c = !1;
        } finally {
          c ? En(a) : An(a);
        }
        return Jn(a, n), Qn(s, a);
      } else if (!r || typeof r != "object") {
        if (s = e(r), s === void 0 && (s = r), s === $n && (s = void 0), this.autoFreeze_ && Fn(s, !0), n) {
          const a = [], u = [];
          _e("Patches").generateReplacementPatches_(r, s, a, u), n(a, u);
        }
        return s;
      } else
        Y(1, r);
    }, this.produceWithPatches = (r, e) => {
      if (typeof r == "function")
        return (u, ...c) => this.produceWithPatches(u, (d) => r(d, ...c));
      let n, s;
      return [this.produce(r, e, (u, c) => {
        n = u, s = c;
      }), n, s];
    }, typeof (t == null ? void 0 : t.autoFreeze) == "boolean" && this.setAutoFreeze(t.autoFreeze), typeof (t == null ? void 0 : t.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(t.useStrictShallowCopy);
  }
  createDraft(t) {
    Zt(t) || Y(8), ke(t) && (t = La(t));
    const r = Zn(this), e = On(t, void 0);
    return e[lt].isManual_ = !0, An(r), e;
  }
  finishDraft(t, r) {
    const e = t && t[lt];
    (!e || !e.isManual_) && Y(9);
    const { scope_: n } = e;
    return Jn(n, r), Qn(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  applyPatches(t, r) {
    let e;
    for (e = r.length - 1; e >= 0; e--) {
      const s = r[e];
      if (s.path.length === 0 && s.op === "replace") {
        t = s.value;
        break;
      }
    }
    e > -1 && (r = r.slice(e + 1));
    const n = _e("Patches").applyPatches_;
    return ke(t) ? n(t, r) : this.produce(
      t,
      (s) => n(s, r)
    );
  }
};
function On(t, r) {
  const e = sr(t) ? _e("MapSet").proxyMap_(t, r) : ir(t) ? _e("MapSet").proxySet_(t, r) : $a(t, r);
  return (r ? r.scope_ : $s()).drafts_.push(e), e;
}
function La(t) {
  return ke(t) || Y(10, t), Ns(t);
}
function Ns(t) {
  if (!Zt(t) || Ar(t))
    return t;
  const r = t[lt];
  let e;
  if (r) {
    if (!r.modified_)
      return r.base_;
    r.finalized_ = !0, e = Tn(t, r.scope_.immer_.useStrictShallowCopy_);
  } else
    e = Tn(t, !0);
  return Ze(e, (n, s) => {
    zs(e, n, Ns(s));
  }), r && (r.finalized_ = !1), e;
}
function es() {
  process.env.NODE_ENV !== "production" && Ps.push(
    'Sets cannot have "replace" patches.',
    function(m) {
      return "Unsupported patch operation: " + m;
    },
    function(m) {
      return "Cannot apply patch, path doesn't resolve: " + m;
    },
    "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  );
  const r = "replace", e = "add", n = "remove";
  function s(m, I, k, b) {
    switch (m.type_) {
      case 0:
      case 2:
        return u(
          m,
          I,
          k,
          b
        );
      case 1:
        return a(m, I, k, b);
      case 3:
        return c(
          m,
          I,
          k,
          b
        );
    }
  }
  function a(m, I, k, b) {
    let { base_: S, assigned_: f } = m, v = m.copy_;
    v.length < S.length && ([S, v] = [v, S], [k, b] = [b, k]);
    for (let T = 0; T < S.length; T++)
      if (f[T] && v[T] !== S[T]) {
        const w = I.concat([T]);
        k.push({
          op: r,
          path: w,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: y(v[T])
        }), b.push({
          op: r,
          path: w,
          value: y(S[T])
        });
      }
    for (let T = S.length; T < v.length; T++) {
      const w = I.concat([T]);
      k.push({
        op: e,
        path: w,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: y(v[T])
      });
    }
    for (let T = v.length - 1; S.length <= T; --T) {
      const w = I.concat([T]);
      b.push({
        op: n,
        path: w
      });
    }
  }
  function u(m, I, k, b) {
    const { base_: S, copy_: f } = m;
    Ze(m.assigned_, (v, T) => {
      const w = yn(S, v), E = yn(f, v), _ = T ? Qe(S, v) ? r : e : n;
      if (w === E && _ === r)
        return;
      const M = I.concat(v);
      k.push(_ === n ? { op: _, path: M } : { op: _, path: M, value: E }), b.push(
        _ === e ? { op: n, path: M } : _ === n ? { op: e, path: M, value: y(w) } : { op: r, path: M, value: y(w) }
      );
    });
  }
  function c(m, I, k, b) {
    let { base_: S, copy_: f } = m, v = 0;
    S.forEach((T) => {
      if (!f.has(T)) {
        const w = I.concat([v]);
        k.push({
          op: n,
          path: w,
          value: T
        }), b.unshift({
          op: e,
          path: w,
          value: T
        });
      }
      v++;
    }), v = 0, f.forEach((T) => {
      if (!S.has(T)) {
        const w = I.concat([v]);
        k.push({
          op: e,
          path: w,
          value: T
        }), b.unshift({
          op: n,
          path: w,
          value: T
        });
      }
      v++;
    });
  }
  function d(m, I, k, b) {
    k.push({
      op: r,
      path: [],
      value: I === $n ? void 0 : I
    }), b.push({
      op: r,
      path: [],
      value: m
    });
  }
  function p(m, I) {
    return I.forEach((k) => {
      const { path: b, op: S } = k;
      let f = m;
      for (let E = 0; E < b.length - 1; E++) {
        const _ = ve(f);
        let M = b[E];
        typeof M != "string" && typeof M != "number" && (M = "" + M), (_ === 0 || _ === 1) && (M === "__proto__" || M === "constructor") && Y(19), typeof f == "function" && M === "prototype" && Y(19), f = yn(f, M), typeof f != "object" && Y(18, b.join("/"));
      }
      const v = ve(f), T = h(k.value), w = b[b.length - 1];
      switch (S) {
        case r:
          switch (v) {
            case 2:
              return f.set(w, T);
            case 3:
              Y(16);
            default:
              return f[w] = T;
          }
        case e:
          switch (v) {
            case 1:
              return w === "-" ? f.push(T) : f.splice(w, 0, T);
            case 2:
              return f.set(w, T);
            case 3:
              return f.add(T);
            default:
              return f[w] = T;
          }
        case n:
          switch (v) {
            case 1:
              return f.splice(w, 1);
            case 2:
              return f.delete(w);
            case 3:
              return f.delete(k.value);
            default:
              return delete f[w];
          }
        default:
          Y(17, S);
      }
    }), m;
  }
  function h(m) {
    if (!Zt(m))
      return m;
    if (Array.isArray(m))
      return m.map(h);
    if (sr(m))
      return new Map(
        Array.from(m.entries()).map(([k, b]) => [k, h(b)])
      );
    if (ir(m))
      return new Set(Array.from(m).map(h));
    const I = Object.create(be(m));
    for (const k in m)
      I[k] = h(m[k]);
    return Qe(m, Je) && (I[Je] = m[Je]), I;
  }
  function y(m) {
    return ke(m) ? h(m) : m;
  }
  Pa("Patches", {
    applyPatches_: p,
    generatePatches_: s,
    generateReplacementPatches_: d
  });
}
var dt = new Na(), Ha = dt.produce;
dt.produceWithPatches.bind(
  dt
);
dt.setAutoFreeze.bind(dt);
dt.setUseStrictShallowCopy.bind(dt);
var Ua = dt.applyPatches.bind(dt);
dt.createDraft.bind(dt);
dt.finishDraft.bind(dt);
var Wa = 9007199254740991, ja = "[object Arguments]", Ba = "[object Function]", Ya = "[object GeneratorFunction]", Ga = "[object Symbol]", Xa = typeof ft == "object" && ft && ft.Object === Object && ft, Ka = typeof self == "object" && self && self.Object === Object && self, Va = Xa || Ka || Function("return this")();
function qa(t, r, e) {
  switch (e.length) {
    case 0:
      return t.call(r);
    case 1:
      return t.call(r, e[0]);
    case 2:
      return t.call(r, e[0], e[1]);
    case 3:
      return t.call(r, e[0], e[1], e[2]);
  }
  return t.apply(r, e);
}
function Ja(t, r) {
  for (var e = -1, n = t ? t.length : 0, s = Array(n); ++e < n; )
    s[e] = r(t[e], e, t);
  return s;
}
function Za(t, r) {
  for (var e = -1, n = r.length, s = t.length; ++e < n; )
    t[s + e] = r[e];
  return t;
}
var Ln = Object.prototype, Qa = Ln.hasOwnProperty, Hn = Ln.toString, rs = Va.Symbol, to = Ln.propertyIsEnumerable, ns = rs ? rs.isConcatSpreadable : void 0, ss = Math.max;
function eo(t, r, e, n, s) {
  var a = -1, u = t.length;
  for (e || (e = io), s || (s = []); ++a < u; ) {
    var c = t[a];
    e(c) ? Za(s, c) : s[s.length] = c;
  }
  return s;
}
function ro(t, r) {
  return t = Object(t), no(t, r, function(e, n) {
    return n in t;
  });
}
function no(t, r, e) {
  for (var n = -1, s = r.length, a = {}; ++n < s; ) {
    var u = r[n], c = t[u];
    e(c, u) && (a[u] = c);
  }
  return a;
}
function so(t, r) {
  return r = ss(r === void 0 ? t.length - 1 : r, 0), function() {
    for (var e = arguments, n = -1, s = ss(e.length - r, 0), a = Array(s); ++n < s; )
      a[n] = e[r + n];
    n = -1;
    for (var u = Array(r + 1); ++n < r; )
      u[n] = e[n];
    return u[r] = a, qa(t, this, u);
  };
}
function io(t) {
  return co(t) || oo(t) || !!(ns && t && t[ns]);
}
function ao(t) {
  if (typeof t == "string" || mo(t))
    return t;
  var r = t + "";
  return r == "0" && 1 / t == -1 / 0 ? "-0" : r;
}
function oo(t) {
  return lo(t) && Qa.call(t, "callee") && (!to.call(t, "callee") || Hn.call(t) == ja);
}
var co = Array.isArray;
function uo(t) {
  return t != null && po(t.length) && !fo(t);
}
function lo(t) {
  return Ls(t) && uo(t);
}
function fo(t) {
  var r = ho(t) ? Hn.call(t) : "";
  return r == Ba || r == Ya;
}
function po(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Wa;
}
function ho(t) {
  var r = typeof t;
  return !!t && (r == "object" || r == "function");
}
function Ls(t) {
  return !!t && typeof t == "object";
}
function mo(t) {
  return typeof t == "symbol" || Ls(t) && Hn.call(t) == Ga;
}
var yo = so(function(t, r) {
  return t == null ? {} : ro(t, Ja(eo(r), ao));
}), go = yo;
const is = /* @__PURE__ */ Cn(go), Io = {
  width: 1080,
  height: 1920
}, bo = 30, ko = {
  size: Io,
  fps: bo,
  tracks: [],
  trackItemIds: [],
  trackItemsMap: {},
  transitionIds: [],
  transitionsMap: {},
  scale: {
    // 1x distance (second 0 to second 5, 5 segments).
    index: 7,
    unit: 300,
    zoom: 1 / 300,
    segments: 5
  },
  duration: 0,
  activeIds: [],
  structure: [],
  background: {
    type: "color",
    value: "transparent"
  }
}, as = [
  "tracks",
  "trackItemsMap",
  "transitionIds",
  "transitionsMap",
  "trackItemIds",
  "structure"
];
class Vo {
  // Clean constructor with clear configuration interface
  constructor(r, e) {
    Vt(this, "stateSubject");
    Vt(this, "stateHistorySubject");
    Vt(this, "prevState");
    Vt(this, "background");
    Vt(this, "undos", []);
    Vt(this, "redos", []);
    Vt(this, "listener");
    const n = Object.assign(
      {},
      ko,
      r,
      e != null && e.scale ? { scale: e.scale } : {}
    );
    this.stateSubject = new Xn(n), this.stateHistorySubject = new Xn({
      handleRedo: !1,
      handleUndo: !1
    }), this.background = n.background, this.prevState = n, (e != null && e.cors || e != null && e.acceptsMap) && Xi({
      cors: e.cors,
      acceptsMap: e.acceptsMap
    }), this.initListeners();
  }
  initListeners() {
    Aa(this);
  }
  destroyListeners() {
    this.listener && this.listener.unsubscribe();
  }
  purge() {
    this.destroyListeners();
  }
  updateHistory(r, e) {
    const n = is(r, as), s = is(this.getState(), as), a = Rs(s, n);
    a.length && (this.undos.push({ undos: a, type: e }), this.redos = []);
  }
  getStateHistory() {
    return this.stateHistorySubject.getValue();
  }
  subscribeHistory(r) {
    return this.stateHistorySubject.subscribe(r);
  }
  // Get the current state
  getState() {
    return this.stateSubject.getValue();
  }
  // Subscribe to state changes
  subscribe(r) {
    return this.stateSubject.subscribe(r);
  }
  // Update the state, emitting only if the part of the state has changed
  updateState(r, e = { updateHistory: !1 }) {
    const n = this.getState(), s = {
      ...C(n),
      ...C(r)
    };
    W(n, s) || (e.updateHistory && this.updateHistory(s, e.kind), this.prevState = n, this.stateSubject.next(s));
  }
  // emit changes for design size
  subscribeToUpdateStateDetails(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      (!W(e.size, this.prevState.size) || !W(e.background, this.prevState.background)) && r({
        size: e.size,
        background: e.background
      });
    });
  }
  // Selectively subscribe to scale changes
  subscribeToScale(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      W(e.scale, this.prevState.scale) || r({ scale: e.scale });
    });
  }
  // Selectively subscribe to fps changes
  subscribeToFps(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      e.fps !== this.prevState.fps && r({ fps: e.fps });
    });
  }
  subscribeToUpdateTrackItem(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      W(e.trackItemsMap, this.prevState.trackItemsMap) || r({ trackItemsMap: e.trackItemsMap });
    });
  }
  subscribeToUpdateAnimations(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      const n = Object.keys(e.trackItemsMap).filter(
        (s) => {
          const a = this.prevState.trackItemsMap[s], u = e.trackItemsMap[s];
          return a && u && !W(a.animations, u.animations);
        }
      );
      r({ trackItemsMap: e.trackItemsMap, changedAnimationIds: n });
    });
  }
  subscribeToUpdateTrackItemTiming(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      if (!W(e.trackItemsMap, this.prevState.trackItemsMap)) {
        const n = Object.keys(e.trackItemsMap).filter((a) => {
          const u = this.prevState.trackItemsMap[a], c = e.trackItemsMap[a];
          return u && c && !W(u.trim, c.trim);
        }), s = Object.keys(e.trackItemsMap).filter(
          (a) => {
            const u = this.prevState.trackItemsMap[a], c = e.trackItemsMap[a];
            return u && c && !W(u.display, c.display);
          }
        );
        r({
          trackItemsMap: e.trackItemsMap,
          changedTrimIds: n.length > 0 ? n : void 0,
          changedDisplayIds: s.length > 0 ? s : void 0
        });
      }
    });
  }
  subscribeToUpdateItemDetails(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      Object.keys(e.trackItemsMap).some((s) => {
        const a = this.prevState.trackItemsMap[s], u = e.trackItemsMap[s];
        return a && u && !W(a.details, u.details);
      }) && r({ trackItemsMap: e.trackItemsMap });
    });
  }
  // Selectively subscribe to duration changes
  subscribeToDuration(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      e.duration !== this.prevState.duration && r({ duration: e.duration });
    });
  }
  subscribeToHistory(r) {
    return this.stateHistorySubject.asObservable().subscribe((e) => {
      if (e.handleRedo) {
        const n = this.undos[this.undos.length - 1].type;
        r({ ...this.getState(), type: n }), this.stateHistorySubject.next({ handleRedo: !1, handleUndo: !1 });
      }
      if (e.handleUndo) {
        const n = this.redos[this.redos.length - 1].type;
        r({ ...this.getState(), type: n }), this.stateHistorySubject.next({ handleRedo: !1, handleUndo: !1 });
      }
    });
  }
  subscribeToAddOrRemoveItems(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      const n = [...e.trackItemIds].sort(), s = [...this.prevState.trackItemIds].sort(), a = [...e.transitionIds].sort(), u = [...this.prevState.transitionIds].sort();
      (!W(n, s) || !W(a, u)) && r({ trackItemIds: e.trackItemIds });
    });
  }
  // Selectively subscribe to activeIds changes
  subscribeToActiveIds(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      W(e.activeIds, this.prevState.activeIds) || r({ activeIds: e.activeIds });
    });
  }
  subscribeToTracks(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      const n = e.tracks, a = this.prevState.tracks.map((c) => c.id), u = n.filter(
        (c) => !a.includes(c.id)
      );
      u.length && r({
        tracks: e.tracks,
        changedTracks: u.map((c) => c.id)
      });
    });
  }
  subscribeToUpdateTracks(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      W(e.tracks, this.prevState.tracks) || r({
        tracks: e.tracks,
        duration: e.duration,
        trackItemsMap: e.trackItemsMap
      });
    });
  }
  // Selectively subscribe to multiple track-related properties
  subscribeToState(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      (!W(e.tracks, this.prevState.tracks) || !W(e.trackItemIds, this.prevState.trackItemIds) || !W(e.trackItemsMap, this.prevState.trackItemsMap) || !W(e.transitionIds, this.prevState.transitionIds) || !W(e.transitionsMap, this.prevState.transitionsMap) || !W(e.structure, this.prevState.structure)) && r({
        tracks: e.tracks,
        trackItemIds: e.trackItemIds,
        trackItemsMap: e.trackItemsMap,
        transitionIds: e.transitionIds,
        transitionsMap: e.transitionsMap,
        structure: e.structure
      });
    });
  }
  undo() {
    const r = this.undos.pop(), e = r == null ? void 0 : r.undos, n = r == null ? void 0 : r.type;
    if (!e || !n) return;
    es();
    const {
      trackItemIds: s,
      tracks: a,
      transitionIds: u,
      transitionsMap: c,
      trackItemsMap: d,
      structure: p
    } = this.getState(), h = C({
      trackItemIds: s,
      tracks: a,
      transitionIds: u,
      transitionsMap: c,
      trackItemsMap: d,
      structure: p
    }), y = [], m = [], I = [], k = [], b = [], S = [];
    e.forEach((x) => {
      let F;
      const et = x.path.slice(1);
      x.type === "CREATE" ? F = {
        path: et,
        op: "remove",
        value: x.value
      } : x.type === "CHANGE" ? F = {
        path: et,
        op: "replace",
        value: x.oldValue
      } : F = {
        path: et,
        op: "add",
        value: x.oldValue
      }, x.path.includes("trackItemIds") ? I.push(F) : x.path.includes("transitionIds") ? m.push(F) : x.path.includes("trackItemsMap") ? b.push(F) : x.path.includes("transitionsMap") ? k.push(F) : x.path.includes("tracks") ? y.push(F) : x.path.includes("structure") && S.push(F);
    });
    const f = this.applyPatch(
      h.tracks,
      y
    ), v = this.applyPatch(
      h.transitionIds,
      m
    ), T = this.applyPatch(
      h.trackItemIds,
      I
    ), w = this.applyPatch(
      h.transitionsMap,
      k
    ), E = this.applyPatch(
      h.trackItemsMap,
      b
    ), _ = this.applyPatch(
      h.structure,
      S
    ), M = C({
      tracks: f,
      transitionIds: v,
      trackItemIds: T,
      transitionsMap: w,
      trackItemsMap: E,
      structure: _
    }), L = C(this.getState()), R = { ...L, ...M };
    this.prevState = L, this.redos.push({ redos: e, type: n });
    const G = j(R.trackItemsMap);
    this.stateSubject.next({ ...R, duration: G }), this.stateHistorySubject.next({ handleRedo: !1, handleUndo: !0 }), this.updateState(R, { updateHistory: !1 });
  }
  applyPatch(r, e) {
    return e.reverse().reduce((n, s) => Ha(n, (a) => {
      Ua(a, [s]);
    }), r);
  }
  redo() {
    const r = this.redos.pop(), e = r == null ? void 0 : r.redos, n = r == null ? void 0 : r.type;
    if (!e || !n) return;
    es();
    const {
      trackItemIds: s,
      tracks: a,
      transitionIds: u,
      transitionsMap: c,
      trackItemsMap: d,
      structure: p
    } = this.getState(), h = C({
      trackItemIds: s,
      tracks: a,
      transitionIds: u,
      transitionsMap: c,
      trackItemsMap: d,
      structure: p
    }), y = [], m = [], I = [], k = [], b = [], S = [];
    e.forEach((x) => {
      let F;
      const et = x.path.slice(1);
      x.type === "CREATE" ? F = {
        path: et,
        op: "add",
        value: x.value
      } : x.type === "CHANGE" ? F = {
        path: et,
        op: "replace",
        value: x.value
      } : F = {
        path: et,
        op: "remove",
        value: x.oldValue
      }, x.path.includes("trackItemIds") ? I.push(F) : x.path.includes("transitionIds") ? m.push(F) : x.path.includes("trackItemsMap") ? b.push(F) : x.path.includes("transitionsMap") ? k.push(F) : x.path.includes("structure") ? S.push(F) : y.push(F);
    });
    const f = this.applyPatch(
      h.tracks,
      y
    ), v = this.applyPatch(
      h.transitionIds,
      m
    ), T = this.applyPatch(
      h.trackItemIds,
      I
    ), w = this.applyPatch(
      h.transitionsMap,
      k
    ), E = this.applyPatch(
      h.trackItemsMap,
      b
    ), _ = this.applyPatch(
      h.structure,
      S
    ), M = C({
      tracks: f,
      transitionIds: v,
      trackItemIds: T,
      transitionsMap: w,
      trackItemsMap: E,
      structure: _
    }), L = C(this.getState()), R = { ...L, ...M };
    this.prevState = L, this.undos.push({ undos: e, type: n });
    const G = j(R.trackItemsMap);
    this.stateSubject.next({ ...R, duration: G }), this.stateHistorySubject.next({ handleRedo: !0, handleUndo: !1 }), this.updateState(R, { updateHistory: !1 });
  }
  toJSON() {
    const {
      fps: r,
      tracks: e,
      size: n,
      trackItemIds: s,
      transitionsMap: a,
      trackItemsMap: u,
      transitionIds: c
    } = this.getState();
    return {
      fps: r,
      tracks: e,
      size: n,
      trackItemIds: s,
      transitionsMap: a,
      trackItemsMap: u,
      transitionIds: c
    };
  }
}
export {
  Fo as ACTIVE_CLONE,
  $o as ACTIVE_DELETE,
  Ci as ACTIVE_PASTE,
  Le as ACTIVE_PREFIX,
  zo as ACTIVE_SET,
  Ri as ACTIVE_SPLIT,
  hi as ADD_ANIMATION,
  li as ADD_AUDIO,
  mi as ADD_CAPTIONS,
  Ii as ADD_COMPOSITION,
  Ti as ADD_HILL_AUDIO_BARS,
  fi as ADD_ILLUSTRATION,
  di as ADD_IMAGE,
  gi as ADD_ITEMS,
  _i as ADD_LINEAL_AUDIO_BARS,
  Ao as ADD_MASK,
  Eo as ADD_PLACEHOLDER,
  H as ADD_PREFIX,
  bi as ADD_PROGRESS_BAR,
  ki as ADD_PROGRESS_FRAME,
  Si as ADD_PROGRESS_SQUARE,
  vi as ADD_RADIAL_AUDIO_BARS,
  Mi as ADD_RECT,
  pi as ADD_SHAPE,
  So as ADD_SUFFIX,
  yi as ADD_TEMPLATE,
  ci as ADD_TEXT,
  xo as ADD_TRANSITION,
  ui as ADD_VIDEO,
  wi as ADD_WAVE_AUDIO_BARS,
  ii as BULK_PREFIX,
  Po as DELETE_TEMPLATE_ITEM,
  ai as DESIGN_LOAD,
  Rn as DESIGN_PREFIX,
  oi as DESIGN_RESIZE,
  xi as EDIT_BACKGROUND_EDITOR,
  Kn as EDIT_BULK,
  Ei as EDIT_OBJECT,
  zt as EDIT_PREFIX,
  Co as EDIT_SHAPE,
  Ro as EDIT_TEMPLATE_ITEM,
  Oo as EDIT_TEXT,
  Oi as EDIT_TRACK,
  Do as ENTER_EDIT_MODE,
  Er as HISTORY_PREFIX,
  Li as HISTORY_REDO,
  Ko as HISTORY_RESET,
  Ni as HISTORY_UNDO,
  zi as LAYER_CLONE,
  Di as LAYER_COPY,
  Xo as LAYER_CUT,
  $i as LAYER_DELETE,
  Bo as LAYER_EDITING_NAME,
  Lo as LAYER_HIDDEN,
  No as LAYER_LOCKED,
  Ho as LAYER_MOVE,
  Yo as LAYER_PASTE,
  tt as LAYER_PREFIX,
  jo as LAYER_RENAME,
  Fi as LAYER_REPLACE,
  Pi as LAYER_SELECT,
  Uo as LAYER_SELECTION,
  Wo as LAYER_SEND_TO,
  Go as LAYER_SPLIT,
  Ai as REPLACE_MEDIA,
  Mo as STATE_CHANGED,
  si as STATE_PREFIX,
  Hi as TIMELINE_SCALE_CHANGED,
  fs as TIMELINE_SCALE_PREFIX,
  wo as TRACKS_CHANGED,
  To as TRACK_ITEMS_CHANGED,
  ni as TRACK_ITEMS_PREFIX,
  ri as TRACK_PREFIX,
  Vo as default,
  ms as getAcceptsMap
};
