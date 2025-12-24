var Ls = Object.defineProperty;
var Hs = (t, r, e) => r in t ? Ls(t, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[r] = e;
var Kt = (t, r, e) => Hs(t, typeof r != "symbol" ? r + "" : r, e);
import { subject as Vt, filter as qt, dispatch as Us } from "@designcombo/events";
var bn = function(t, r) {
  return bn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
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
  var n = e.call(t), i, o = [], c;
  try {
    for (; (r === void 0 || r-- > 0) && !(i = n.next()).done; ) o.push(i.value);
  } catch (u) {
    c = { error: u };
  } finally {
    try {
      i && !i.done && (e = n.return) && e.call(n);
    } finally {
      if (c) throw c.error;
    }
  }
  return o;
}
function _n(t, r, e) {
  if (e || arguments.length === 2) for (var n = 0, i = r.length, o; n < i; n++)
    (o || !(n in r)) && (o || (o = Array.prototype.slice.call(r, 0, n)), o[n] = r[n]);
  return t.concat(o || Array.prototype.slice.call(r));
}
function Dt(t) {
  return typeof t == "function";
}
function as(t) {
  var r = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, e = t(r);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var pn = as(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(n, i) {
      return i + 1 + ") " + n.toString();
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
var Er = function() {
  function t(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var r, e, n, i, o;
    if (!this.closed) {
      this.closed = !0;
      var c = this._parentage;
      if (c)
        if (this._parentage = null, Array.isArray(c))
          try {
            for (var u = kn(c), d = u.next(); !d.done; d = u.next()) {
              var h = d.value;
              h.remove(this);
            }
          } catch (I) {
            r = { error: I };
          } finally {
            try {
              d && !d.done && (e = u.return) && e.call(u);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          c.remove(this);
      var m = this.initialTeardown;
      if (Dt(m))
        try {
          m();
        } catch (I) {
          o = I instanceof pn ? I.errors : [I];
        }
      var y = this._finalizers;
      if (y) {
        this._finalizers = null;
        try {
          for (var p = kn(y), v = p.next(); !v.done; v = p.next()) {
            var b = v.value;
            try {
              Un(b);
            } catch (I) {
              o = o ?? [], I instanceof pn ? o = _n(_n([], vn(o)), vn(I.errors)) : o.push(I);
            }
          }
        } catch (I) {
          n = { error: I };
        } finally {
          try {
            v && !v.done && (i = p.return) && i.call(p);
          } finally {
            if (n) throw n.error;
          }
        }
      }
      if (o)
        throw new pn(o);
    }
  }, t.prototype.add = function(r) {
    var e;
    if (r && r !== this)
      if (this.closed)
        Un(r);
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
}(), os = Er.EMPTY;
function cs(t) {
  return t instanceof Er || t && "closed" in t && Dt(t.remove) && Dt(t.add) && Dt(t.unsubscribe);
}
function Un(t) {
  Dt(t) ? t() : t.unsubscribe();
}
var Ws = {
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
function js(t) {
  Bs.setTimeout(function() {
    throw t;
  });
}
function Wn() {
}
function kr(t) {
  t();
}
var us = function(t) {
  rr(r, t);
  function r(e) {
    var n = t.call(this) || this;
    return n.isStopped = !1, e ? (n.destination = e, cs(e) && e.add(n)) : n.destination = Xs, n;
  }
  return r.create = function(e, n, i) {
    return new wn(e, n, i);
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
}(Er), Ys = function() {
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
  function r(e, n, i) {
    var o = t.call(this) || this, c;
    return Dt(e) || !e ? c = {
      next: e ?? void 0,
      error: n ?? void 0,
      complete: i ?? void 0
    } : c = e, o.destination = new Ys(c), o;
  }
  return r;
}(us);
function br(t) {
  js(t);
}
function Gs(t) {
  throw t;
}
var Xs = {
  closed: !0,
  next: Wn,
  error: Gs,
  complete: Wn
}, Ks = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Vs(t) {
  return t;
}
function qs(t) {
  return t.length === 0 ? Vs : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(n, i) {
      return i(n);
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
    var i = this, o = Zs(r) ? r : new wn(r, e, n);
    return kr(function() {
      var c = i, u = c.operator, d = c.source;
      o.add(u ? u.call(o, d) : d ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, t.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (e) {
      r.error(e);
    }
  }, t.prototype.forEach = function(r, e) {
    var n = this;
    return e = jn(e), new e(function(i, o) {
      var c = new wn({
        next: function(u) {
          try {
            r(u);
          } catch (d) {
            o(d), c.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      n.subscribe(c);
    });
  }, t.prototype._subscribe = function(r) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(r);
  }, t.prototype[Ks] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var r = [], e = 0; e < arguments.length; e++)
      r[e] = arguments[e];
    return qs(r)(this);
  }, t.prototype.toPromise = function(r) {
    var e = this;
    return r = jn(r), new r(function(n, i) {
      var o;
      e.subscribe(function(c) {
        return o = c;
      }, function(c) {
        return i(c);
      }, function() {
        return n(o);
      });
    });
  }, t.create = function(r) {
    return new t(r);
  }, t;
}();
function jn(t) {
  var r;
  return (r = t ?? Ws.Promise) !== null && r !== void 0 ? r : Promise;
}
function Js(t) {
  return t && Dt(t.next) && Dt(t.error) && Dt(t.complete);
}
function Zs(t) {
  return t && t instanceof us || Js(t) && cs(t);
}
var Qs = as(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), ls = function(t) {
  rr(r, t);
  function r() {
    var e = t.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return r.prototype.lift = function(e) {
    var n = new Yn(this, this);
    return n.operator = e, n;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Qs();
  }, r.prototype.next = function(e) {
    var n = this;
    kr(function() {
      var i, o;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var c = kn(n.currentObservers), u = c.next(); !u.done; u = c.next()) {
            var d = u.value;
            d.next(e);
          }
        } catch (h) {
          i = { error: h };
        } finally {
          try {
            u && !u.done && (o = c.return) && o.call(c);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, r.prototype.error = function(e) {
    var n = this;
    kr(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = e;
        for (var i = n.observers; i.length; )
          i.shift().error(e);
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
    var n = this, i = this, o = i.hasError, c = i.isStopped, u = i.observers;
    return o || c ? os : (this.currentObservers = null, u.push(e), new Er(function() {
      n.currentObservers = null, Sn(u, e);
    }));
  }, r.prototype._checkFinalizedStatuses = function(e) {
    var n = this, i = n.hasError, o = n.thrownError, c = n.isStopped;
    i ? e.error(o) : c && e.complete();
  }, r.prototype.asObservable = function() {
    var e = new Bn();
    return e.source = this, e;
  }, r.create = function(e, n) {
    return new Yn(e, n);
  }, r;
}(Bn), Yn = function(t) {
  rr(r, t);
  function r(e, n) {
    var i = t.call(this) || this;
    return i.destination = e, i.source = n, i;
  }
  return r.prototype.next = function(e) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || i === void 0 || i.call(n, e);
  }, r.prototype.error = function(e) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || i === void 0 || i.call(n, e);
  }, r.prototype.complete = function() {
    var e, n;
    (n = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || n === void 0 || n.call(e);
  }, r.prototype._subscribe = function(e) {
    var n, i;
    return (i = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(e)) !== null && i !== void 0 ? i : os;
  }, r;
}(ls), Gn = function(t) {
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
    var e = this, n = e.hasError, i = e.thrownError, o = e._value;
    if (n)
      throw i;
    return this._throwIfClosed(), o;
  }, r.prototype.next = function(e) {
    t.prototype.next.call(this, this._value = e);
  }, r;
}(ls), ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var vr = { exports: {} };
vr.exports;
(function(t, r) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, c = 9007199254740991, u = "[object Arguments]", d = "[object Array]", h = "[object AsyncFunction]", m = "[object Boolean]", y = "[object Date]", p = "[object Error]", v = "[object Function]", b = "[object GeneratorFunction]", I = "[object Map]", S = "[object Number]", f = "[object Null]", k = "[object Object]", T = "[object Promise]", w = "[object Proxy]", A = "[object RegExp]", _ = "[object Set]", E = "[object String]", L = "[object Symbol]", P = "[object Undefined]", Y = "[object WeakMap]", x = "[object ArrayBuffer]", F = "[object DataView]", tt = "[object Float32Array]", Qt = "[object Float64Array]", te = "[object Int8Array]", Se = "[object Int16Array]", we = "[object Int32Array]", Te = "[object Uint8Array]", Ee = "[object Uint8ClampedArray]", z = "[object Uint16Array]", Ae = "[object Uint32Array]", Me = /[\\^$.*+?()[\]{}|]/g, st = /^\[object .+?Constructor\]$/, ee = /^(?:0|[1-9]\d*)$/, $ = {};
  $[tt] = $[Qt] = $[te] = $[Se] = $[we] = $[Te] = $[Ee] = $[z] = $[Ae] = !0, $[u] = $[d] = $[x] = $[m] = $[F] = $[y] = $[p] = $[v] = $[I] = $[S] = $[k] = $[A] = $[_] = $[E] = $[Y] = !1;
  var re = typeof ft == "object" && ft && ft.Object === Object && ft, xe = typeof self == "object" && self && self.Object === Object && self, it = re || xe || Function("return this")(), ne = r && !r.nodeType && r, se = ne && !0 && t && !t.nodeType && t, zt = se && se.exports === ne, $t = zt && re.process, ie = function() {
    try {
      return $t && $t.binding && $t.binding("util");
    } catch {
    }
  }(), Ft = ie && ie.isTypedArray;
  function ae(s, a) {
    for (var l = -1, g = s == null ? 0 : s.length, O = 0, M = []; ++l < g; ) {
      var D = s[l];
      a(D, l, s) && (M[O++] = D);
    }
    return M;
  }
  function Nt(s, a) {
    for (var l = -1, g = a.length, O = s.length; ++l < g; )
      s[O + l] = a[l];
    return s;
  }
  function oe(s, a) {
    for (var l = -1, g = s == null ? 0 : s.length; ++l < g; )
      if (a(s[l], l, s))
        return !0;
    return !1;
  }
  function Oe(s, a) {
    for (var l = -1, g = Array(s); ++l < s; )
      g[l] = a(l);
    return g;
  }
  function Ce(s) {
    return function(a) {
      return s(a);
    };
  }
  function wt(s, a) {
    return s.has(a);
  }
  function Lt(s, a) {
    return s == null ? void 0 : s[a];
  }
  function ce(s) {
    var a = -1, l = Array(s.size);
    return s.forEach(function(g, O) {
      l[++a] = [O, g];
    }), l;
  }
  function ue(s, a) {
    return function(l) {
      return s(a(l));
    };
  }
  function ut(s) {
    var a = -1, l = Array(s.size);
    return s.forEach(function(g) {
      l[++a] = g;
    }), l;
  }
  var Tt = Array.prototype, Pe = Function.prototype, gt = Object.prototype, Et = it["__core-js_shared__"], Ht = Pe.toString, et = gt.hasOwnProperty, le = function() {
    var s = /[^.]+$/.exec(Et && Et.keys && Et.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), de = gt.toString, Re = RegExp(
    "^" + Ht.call(et).replace(Me, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ut = zt ? it.Buffer : void 0, At = it.Symbol, fe = it.Uint8Array, Mt = gt.propertyIsEnumerable, yt = Tt.splice, at = At ? At.toStringTag : void 0, xt = Object.getOwnPropertySymbols, Wt = Ut ? Ut.isBuffer : void 0, It = ue(Object.keys, Object), Bt = Ct(it, "DataView"), bt = Ct(it, "Map"), jt = Ct(it, "Promise"), Yt = Ct(it, "Set"), We = Ct(it, "WeakMap"), Gt = Ct(Object, "create"), ar = rt(Bt), Ot = rt(bt), xr = rt(jt), Or = rt(Yt), Cr = rt(We), or = At ? At.prototype : void 0, Be = or ? or.valueOf : void 0;
  function X(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function Pr() {
    this.__data__ = Gt ? Gt(null) : {}, this.size = 0;
  }
  function Rr(s) {
    var a = this.has(s) && delete this.__data__[s];
    return this.size -= a ? 1 : 0, a;
  }
  function Dr(s) {
    var a = this.__data__;
    if (Gt) {
      var l = a[s];
      return l === n ? void 0 : l;
    }
    return et.call(a, s) ? a[s] : void 0;
  }
  function zr(s) {
    var a = this.__data__;
    return Gt ? a[s] !== void 0 : et.call(a, s);
  }
  function $r(s, a) {
    var l = this.__data__;
    return this.size += this.has(s) ? 0 : 1, l[s] = Gt && a === void 0 ? n : a, this;
  }
  X.prototype.clear = Pr, X.prototype.delete = Rr, X.prototype.get = Dr, X.prototype.has = zr, X.prototype.set = $r;
  function q(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function Fr() {
    this.__data__ = [], this.size = 0;
  }
  function Nr(s) {
    var a = this.__data__, l = $e(a, s);
    if (l < 0)
      return !1;
    var g = a.length - 1;
    return l == g ? a.pop() : yt.call(a, l, 1), --this.size, !0;
  }
  function Lr(s) {
    var a = this.__data__, l = $e(a, s);
    return l < 0 ? void 0 : a[l][1];
  }
  function Hr(s) {
    return $e(this.__data__, s) > -1;
  }
  function Ur(s, a) {
    var l = this.__data__, g = $e(l, s);
    return g < 0 ? (++this.size, l.push([s, a])) : l[g][1] = a, this;
  }
  q.prototype.clear = Fr, q.prototype.delete = Nr, q.prototype.get = Lr, q.prototype.has = Hr, q.prototype.set = Ur;
  function ot(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function Wr() {
    this.size = 0, this.__data__ = {
      hash: new X(),
      map: new (bt || q)(),
      string: new X()
    };
  }
  function Br(s) {
    var a = mt(this, s).delete(s);
    return this.size -= a ? 1 : 0, a;
  }
  function jr(s) {
    return mt(this, s).get(s);
  }
  function Yr(s) {
    return mt(this, s).has(s);
  }
  function Gr(s, a) {
    var l = mt(this, s), g = l.size;
    return l.set(s, a), this.size += l.size == g ? 0 : 1, this;
  }
  ot.prototype.clear = Wr, ot.prototype.delete = Br, ot.prototype.get = jr, ot.prototype.has = Yr, ot.prototype.set = Gr;
  function De(s) {
    var a = -1, l = s == null ? 0 : s.length;
    for (this.__data__ = new ot(); ++a < l; )
      this.add(s[a]);
  }
  function cr(s) {
    return this.__data__.set(s, n), this;
  }
  function ze(s) {
    return this.__data__.has(s);
  }
  De.prototype.add = De.prototype.push = cr, De.prototype.has = ze;
  function kt(s) {
    var a = this.__data__ = new q(s);
    this.size = a.size;
  }
  function je() {
    this.__data__ = new q(), this.size = 0;
  }
  function Xr(s) {
    var a = this.__data__, l = a.delete(s);
    return this.size = a.size, l;
  }
  function Kr(s) {
    return this.__data__.get(s);
  }
  function Vr(s) {
    return this.__data__.has(s);
  }
  function qr(s, a) {
    var l = this.__data__;
    if (l instanceof q) {
      var g = l.__data__;
      if (!bt || g.length < e - 1)
        return g.push([s, a]), this.size = ++l.size, this;
      l = this.__data__ = new ot(g);
    }
    return l.set(s, a), this.size = l.size, this;
  }
  kt.prototype.clear = je, kt.prototype.delete = Xr, kt.prototype.get = Kr, kt.prototype.has = Vr, kt.prototype.set = qr;
  function Jr(s, a) {
    var l = Fe(s), g = !l && pr(s), O = !l && !g && Ne(s), M = !l && !g && !O && gr(s), D = l || g || O || M, R = D ? Oe(s.length, String) : [], U = R.length;
    for (var N in s)
      et.call(s, N) && !(D && // Safari 9 has enumerable `arguments.length` in strict mode.
      (N == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      O && (N == "offset" || N == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      M && (N == "buffer" || N == "byteLength" || N == "byteOffset") || // Skip index properties.
      an(N, U))) && R.push(N);
    return R;
  }
  function $e(s, a) {
    for (var l = s.length; l--; )
      if (fr(s[l][0], a))
        return l;
    return -1;
  }
  function Ye(s, a, l) {
    var g = a(s);
    return Fe(s) ? g : Nt(g, l(s));
  }
  function pe(s) {
    return s == null ? s === void 0 ? P : f : at && at in Object(s) ? Pt(s) : dr(s);
  }
  function ur(s) {
    return _t(s) && pe(s) == u;
  }
  function lr(s, a, l, g, O) {
    return s === a ? !0 : s == null || a == null || !_t(s) && !_t(a) ? s !== s && a !== a : Zr(s, a, l, g, lr, O);
  }
  function Zr(s, a, l, g, O, M) {
    var D = Fe(s), R = Fe(a), U = D ? d : vt(s), N = R ? d : vt(a);
    U = U == u ? k : U, N = N == u ? k : N;
    var J = U == k, ct = N == k, W = U == N;
    if (W && Ne(s)) {
      if (!Ne(a))
        return !1;
      D = !0, J = !1;
    }
    if (W && !J)
      return M || (M = new kt()), D || gr(s) ? Ge(s, a, l, g, O, M) : rn(s, a, U, l, g, O, M);
    if (!(l & i)) {
      var Z = J && et.call(s, "__wrapped__"), K = ct && et.call(a, "__wrapped__");
      if (Z || K) {
        var Xt = Z ? s.value() : s, Rt = K ? a.value() : a;
        return M || (M = new kt()), O(Xt, Rt, l, g, M);
      }
    }
    return W ? (M || (M = new kt()), nn(s, a, l, g, O, M)) : !1;
  }
  function Qr(s) {
    if (!mr(s) || cn(s))
      return !1;
    var a = hr(s) ? Re : st;
    return a.test(rt(s));
  }
  function tn(s) {
    return _t(s) && Ke(s.length) && !!$[pe(s)];
  }
  function en(s) {
    if (!un(s))
      return It(s);
    var a = [];
    for (var l in Object(s))
      et.call(s, l) && l != "constructor" && a.push(l);
    return a;
  }
  function Ge(s, a, l, g, O, M) {
    var D = l & i, R = s.length, U = a.length;
    if (R != U && !(D && U > R))
      return !1;
    var N = M.get(s);
    if (N && M.get(a))
      return N == a;
    var J = -1, ct = !0, W = l & o ? new De() : void 0;
    for (M.set(s, a), M.set(a, s); ++J < R; ) {
      var Z = s[J], K = a[J];
      if (g)
        var Xt = D ? g(K, Z, J, a, s, M) : g(Z, K, J, s, a, M);
      if (Xt !== void 0) {
        if (Xt)
          continue;
        ct = !1;
        break;
      }
      if (W) {
        if (!oe(a, function(Rt, me) {
          if (!wt(W, me) && (Z === Rt || O(Z, Rt, l, g, M)))
            return W.push(me);
        })) {
          ct = !1;
          break;
        }
      } else if (!(Z === K || O(Z, K, l, g, M))) {
        ct = !1;
        break;
      }
    }
    return M.delete(s), M.delete(a), ct;
  }
  function rn(s, a, l, g, O, M, D) {
    switch (l) {
      case F:
        if (s.byteLength != a.byteLength || s.byteOffset != a.byteOffset)
          return !1;
        s = s.buffer, a = a.buffer;
      case x:
        return !(s.byteLength != a.byteLength || !M(new fe(s), new fe(a)));
      case m:
      case y:
      case S:
        return fr(+s, +a);
      case p:
        return s.name == a.name && s.message == a.message;
      case A:
      case E:
        return s == a + "";
      case I:
        var R = ce;
      case _:
        var U = g & i;
        if (R || (R = ut), s.size != a.size && !U)
          return !1;
        var N = D.get(s);
        if (N)
          return N == a;
        g |= o, D.set(s, a);
        var J = Ge(R(s), R(a), g, O, M, D);
        return D.delete(s), J;
      case L:
        if (Be)
          return Be.call(s) == Be.call(a);
    }
    return !1;
  }
  function nn(s, a, l, g, O, M) {
    var D = l & i, R = he(s), U = R.length, N = he(a), J = N.length;
    if (U != J && !D)
      return !1;
    for (var ct = U; ct--; ) {
      var W = R[ct];
      if (!(D ? W in a : et.call(a, W)))
        return !1;
    }
    var Z = M.get(s);
    if (Z && M.get(a))
      return Z == a;
    var K = !0;
    M.set(s, a), M.set(a, s);
    for (var Xt = D; ++ct < U; ) {
      W = R[ct];
      var Rt = s[W], me = a[W];
      if (g)
        var Hn = D ? g(me, Rt, W, a, s, M) : g(Rt, me, W, s, a, M);
      if (!(Hn === void 0 ? Rt === me || O(Rt, me, l, g, M) : Hn)) {
        K = !1;
        break;
      }
      Xt || (Xt = W == "constructor");
    }
    if (K && !Xt) {
      var yr = s.constructor, Ir = a.constructor;
      yr != Ir && "constructor" in s && "constructor" in a && !(typeof yr == "function" && yr instanceof yr && typeof Ir == "function" && Ir instanceof Ir) && (K = !1);
    }
    return M.delete(s), M.delete(a), K;
  }
  function he(s) {
    return Ye(s, Ve, sn);
  }
  function mt(s, a) {
    var l = s.__data__;
    return on(a) ? l[typeof a == "string" ? "string" : "hash"] : l.map;
  }
  function Ct(s, a) {
    var l = Lt(s, a);
    return Qr(l) ? l : void 0;
  }
  function Pt(s) {
    var a = et.call(s, at), l = s[at];
    try {
      s[at] = void 0;
      var g = !0;
    } catch {
    }
    var O = de.call(s);
    return g && (a ? s[at] = l : delete s[at]), O;
  }
  var sn = xt ? function(s) {
    return s == null ? [] : (s = Object(s), ae(xt(s), function(a) {
      return Mt.call(s, a);
    }));
  } : dn, vt = pe;
  (Bt && vt(new Bt(new ArrayBuffer(1))) != F || bt && vt(new bt()) != I || jt && vt(jt.resolve()) != T || Yt && vt(new Yt()) != _ || We && vt(new We()) != Y) && (vt = function(s) {
    var a = pe(s), l = a == k ? s.constructor : void 0, g = l ? rt(l) : "";
    if (g)
      switch (g) {
        case ar:
          return F;
        case Ot:
          return I;
        case xr:
          return T;
        case Or:
          return _;
        case Cr:
          return Y;
      }
    return a;
  });
  function an(s, a) {
    return a = a ?? c, !!a && (typeof s == "number" || ee.test(s)) && s > -1 && s % 1 == 0 && s < a;
  }
  function on(s) {
    var a = typeof s;
    return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? s !== "__proto__" : s === null;
  }
  function cn(s) {
    return !!le && le in s;
  }
  function un(s) {
    var a = s && s.constructor, l = typeof a == "function" && a.prototype || gt;
    return s === l;
  }
  function dr(s) {
    return de.call(s);
  }
  function rt(s) {
    if (s != null) {
      try {
        return Ht.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function fr(s, a) {
    return s === a || s !== s && a !== a;
  }
  var pr = ur(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ur : function(s) {
    return _t(s) && et.call(s, "callee") && !Mt.call(s, "callee");
  }, Fe = Array.isArray;
  function Xe(s) {
    return s != null && Ke(s.length) && !hr(s);
  }
  var Ne = Wt || fn;
  function ln(s, a) {
    return lr(s, a);
  }
  function hr(s) {
    if (!mr(s))
      return !1;
    var a = pe(s);
    return a == v || a == b || a == h || a == w;
  }
  function Ke(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= c;
  }
  function mr(s) {
    var a = typeof s;
    return s != null && (a == "object" || a == "function");
  }
  function _t(s) {
    return s != null && typeof s == "object";
  }
  var gr = Ft ? Ce(Ft) : tn;
  function Ve(s) {
    return Xe(s) ? Jr(s) : en(s);
  }
  function dn() {
    return [];
  }
  function fn() {
    return !1;
  }
  t.exports = ln;
})(vr, vr.exports);
var ti = vr.exports;
const B = /* @__PURE__ */ Cn(ti), vo = "add", ei = "track", ri = "trackItems", _o = `${ei}:changed`, So = `${ri}:changed`, ni = "state", wo = `${ni}:changed`, si = "bulk", Xn = `${si}:edit`, Pn = "design", ii = `${Pn}:load`, ai = `${Pn}:resize`, H = "add", oi = `${H}:text`, ci = `${H}:video`, ui = `${H}:audio`, To = `${H}:placeholder`, li = `${H}:image`, di = `${H}:illustration`, fi = `${H}:shape`, Eo = `${H}:mask`, Ao = `${H}:transition`, pi = `${H}:animation`, hi = `${H}:caption`, mi = `${H}:template`, gi = `${H}:items`, yi = `${H}:composition`, Ii = `${H}:progressBar`, bi = `${H}:progressFrame`, ki = `${H}:radialAudioBars`, vi = `${H}:linealAudioBars`, _i = `${H}:progressSquare`, Si = `${H}:waveAudioBars`, wi = `${H}:hillAudioBars`, Ti = `${H}:rect`, Zt = "edit", Ei = `${Zt}:object`, Ai = `${Zt}:replaceMedia`, Mo = `${Zt}:text`, xo = `${Zt}:shape`, Oo = `${Zt}:templateItem`, Co = `${Zt}:deleteTemplateItem`, Mi = `${Zt}:backgroundEditor`, Po = "enterEditMode", Le = "active", Ro = `${Le}:set`, Do = `${Le}:delete`, xi = `${Le}:paste`, zo = `${Le}:clone`, Oi = `${Le}:split`, Q = "layer", $o = `${Q}:locked`, Fo = `${Q}:hidden`, No = `${Q}:move`, Ci = `${Q}:select`, Lo = `${Q}:selection`, Ho = `${Q}:sendTo`, Uo = `${Q}:rename`, Wo = `${Q}:editingName`, Pi = `${Q}:copy`, Bo = `${Q}:paste`, Ri = `${Q}:clone`, jo = `${Q}:split`, Yo = `${Q}:cut`, Di = `${Q}:delete`, zi = `${Q}:replace`, Ar = "history", $i = `${Ar}:undo`, Fi = `${Ar}:redo`, Go = `${Ar}:reset`, ds = "scale", Ni = `${ds}:changed`;
var _r = { exports: {} };
_r.exports;
(function(t, r) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", c = "[object Array]", u = "[object Boolean]", d = "[object Date]", h = "[object Error]", m = "[object Function]", y = "[object GeneratorFunction]", p = "[object Map]", v = "[object Number]", b = "[object Object]", I = "[object Promise]", S = "[object RegExp]", f = "[object Set]", k = "[object String]", T = "[object Symbol]", w = "[object WeakMap]", A = "[object ArrayBuffer]", _ = "[object DataView]", E = "[object Float32Array]", L = "[object Float64Array]", P = "[object Int8Array]", Y = "[object Int16Array]", x = "[object Int32Array]", F = "[object Uint8Array]", tt = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", te = "[object Uint32Array]", Se = /[\\^$.*+?()[\]{}|]/g, we = /\w*$/, Te = /^\[object .+?Constructor\]$/, Ee = /^(?:0|[1-9]\d*)$/, z = {};
  z[o] = z[c] = z[A] = z[_] = z[u] = z[d] = z[E] = z[L] = z[P] = z[Y] = z[x] = z[p] = z[v] = z[b] = z[S] = z[f] = z[k] = z[T] = z[F] = z[tt] = z[Qt] = z[te] = !0, z[h] = z[m] = z[w] = !1;
  var Ae = typeof ft == "object" && ft && ft.Object === Object && ft, Me = typeof self == "object" && self && self.Object === Object && self, st = Ae || Me || Function("return this")(), ee = r && !r.nodeType && r, $ = ee && !0 && t && !t.nodeType && t, re = $ && $.exports === ee;
  function xe(s, a) {
    return s.set(a[0], a[1]), s;
  }
  function it(s, a) {
    return s.add(a), s;
  }
  function ne(s, a) {
    for (var l = -1, g = s ? s.length : 0; ++l < g && a(s[l], l, s) !== !1; )
      ;
    return s;
  }
  function se(s, a) {
    for (var l = -1, g = a.length, O = s.length; ++l < g; )
      s[O + l] = a[l];
    return s;
  }
  function zt(s, a, l, g) {
    for (var O = -1, M = s ? s.length : 0; ++O < M; )
      l = a(l, s[O], O, s);
    return l;
  }
  function $t(s, a) {
    for (var l = -1, g = Array(s); ++l < s; )
      g[l] = a(l);
    return g;
  }
  function ie(s, a) {
    return s == null ? void 0 : s[a];
  }
  function Ft(s) {
    var a = !1;
    if (s != null && typeof s.toString != "function")
      try {
        a = !!(s + "");
      } catch {
      }
    return a;
  }
  function ae(s) {
    var a = -1, l = Array(s.size);
    return s.forEach(function(g, O) {
      l[++a] = [O, g];
    }), l;
  }
  function Nt(s, a) {
    return function(l) {
      return s(a(l));
    };
  }
  function oe(s) {
    var a = -1, l = Array(s.size);
    return s.forEach(function(g) {
      l[++a] = g;
    }), l;
  }
  var Oe = Array.prototype, Ce = Function.prototype, wt = Object.prototype, Lt = st["__core-js_shared__"], ce = function() {
    var s = /[^.]+$/.exec(Lt && Lt.keys && Lt.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), ue = Ce.toString, ut = wt.hasOwnProperty, Tt = wt.toString, Pe = RegExp(
    "^" + ue.call(ut).replace(Se, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), gt = re ? st.Buffer : void 0, Et = st.Symbol, Ht = st.Uint8Array, et = Nt(Object.getPrototypeOf, Object), le = Object.create, de = wt.propertyIsEnumerable, Re = Oe.splice, Ut = Object.getOwnPropertySymbols, At = gt ? gt.isBuffer : void 0, fe = Nt(Object.keys, Object), Mt = mt(st, "DataView"), yt = mt(st, "Map"), at = mt(st, "Promise"), xt = mt(st, "Set"), Wt = mt(st, "WeakMap"), It = mt(Object, "create"), Bt = rt(Mt), bt = rt(yt), jt = rt(at), Yt = rt(xt), We = rt(Wt), Gt = Et ? Et.prototype : void 0, ar = Gt ? Gt.valueOf : void 0;
  function Ot(s) {
    var a = -1, l = s ? s.length : 0;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function xr() {
    this.__data__ = It ? It(null) : {};
  }
  function Or(s) {
    return this.has(s) && delete this.__data__[s];
  }
  function Cr(s) {
    var a = this.__data__;
    if (It) {
      var l = a[s];
      return l === n ? void 0 : l;
    }
    return ut.call(a, s) ? a[s] : void 0;
  }
  function or(s) {
    var a = this.__data__;
    return It ? a[s] !== void 0 : ut.call(a, s);
  }
  function Be(s, a) {
    var l = this.__data__;
    return l[s] = It && a === void 0 ? n : a, this;
  }
  Ot.prototype.clear = xr, Ot.prototype.delete = Or, Ot.prototype.get = Cr, Ot.prototype.has = or, Ot.prototype.set = Be;
  function X(s) {
    var a = -1, l = s ? s.length : 0;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function Pr() {
    this.__data__ = [];
  }
  function Rr(s) {
    var a = this.__data__, l = ze(a, s);
    if (l < 0)
      return !1;
    var g = a.length - 1;
    return l == g ? a.pop() : Re.call(a, l, 1), !0;
  }
  function Dr(s) {
    var a = this.__data__, l = ze(a, s);
    return l < 0 ? void 0 : a[l][1];
  }
  function zr(s) {
    return ze(this.__data__, s) > -1;
  }
  function $r(s, a) {
    var l = this.__data__, g = ze(l, s);
    return g < 0 ? l.push([s, a]) : l[g][1] = a, this;
  }
  X.prototype.clear = Pr, X.prototype.delete = Rr, X.prototype.get = Dr, X.prototype.has = zr, X.prototype.set = $r;
  function q(s) {
    var a = -1, l = s ? s.length : 0;
    for (this.clear(); ++a < l; ) {
      var g = s[a];
      this.set(g[0], g[1]);
    }
  }
  function Fr() {
    this.__data__ = {
      hash: new Ot(),
      map: new (yt || X)(),
      string: new Ot()
    };
  }
  function Nr(s) {
    return he(this, s).delete(s);
  }
  function Lr(s) {
    return he(this, s).get(s);
  }
  function Hr(s) {
    return he(this, s).has(s);
  }
  function Ur(s, a) {
    return he(this, s).set(s, a), this;
  }
  q.prototype.clear = Fr, q.prototype.delete = Nr, q.prototype.get = Lr, q.prototype.has = Hr, q.prototype.set = Ur;
  function ot(s) {
    this.__data__ = new X(s);
  }
  function Wr() {
    this.__data__ = new X();
  }
  function Br(s) {
    return this.__data__.delete(s);
  }
  function jr(s) {
    return this.__data__.get(s);
  }
  function Yr(s) {
    return this.__data__.has(s);
  }
  function Gr(s, a) {
    var l = this.__data__;
    if (l instanceof X) {
      var g = l.__data__;
      if (!yt || g.length < e - 1)
        return g.push([s, a]), this;
      l = this.__data__ = new q(g);
    }
    return l.set(s, a), this;
  }
  ot.prototype.clear = Wr, ot.prototype.delete = Br, ot.prototype.get = jr, ot.prototype.has = Yr, ot.prototype.set = Gr;
  function De(s, a) {
    var l = Xe(s) || Fe(s) ? $t(s.length, String) : [], g = l.length, O = !!g;
    for (var M in s)
      ut.call(s, M) && !(O && (M == "length" || on(M, g))) && l.push(M);
    return l;
  }
  function cr(s, a, l) {
    var g = s[a];
    (!(ut.call(s, a) && pr(g, l)) || l === void 0 && !(a in s)) && (s[a] = l);
  }
  function ze(s, a) {
    for (var l = s.length; l--; )
      if (pr(s[l][0], a))
        return l;
    return -1;
  }
  function kt(s, a) {
    return s && Ge(a, Ve(a), s);
  }
  function je(s, a, l, g, O, M, D) {
    var R;
    if (g && (R = M ? g(s, O, M, D) : g(s)), R !== void 0)
      return R;
    if (!_t(s))
      return s;
    var U = Xe(s);
    if (U) {
      if (R = sn(s), !a)
        return en(s, R);
    } else {
      var N = Pt(s), J = N == m || N == y;
      if (hr(s))
        return $e(s, a);
      if (N == b || N == o || J && !M) {
        if (Ft(s))
          return M ? s : {};
        if (R = vt(J ? {} : s), !a)
          return rn(s, kt(R, s));
      } else {
        if (!z[N])
          return M ? s : {};
        R = an(s, N, je, a);
      }
    }
    D || (D = new ot());
    var ct = D.get(s);
    if (ct)
      return ct;
    if (D.set(s, R), !U)
      var W = l ? nn(s) : Ve(s);
    return ne(W || s, function(Z, K) {
      W && (K = Z, Z = s[K]), cr(R, K, je(Z, a, l, g, K, s, D));
    }), R;
  }
  function Xr(s) {
    return _t(s) ? le(s) : {};
  }
  function Kr(s, a, l) {
    var g = a(s);
    return Xe(s) ? g : se(g, l(s));
  }
  function Vr(s) {
    return Tt.call(s);
  }
  function qr(s) {
    if (!_t(s) || un(s))
      return !1;
    var a = Ke(s) || Ft(s) ? Pe : Te;
    return a.test(rt(s));
  }
  function Jr(s) {
    if (!dr(s))
      return fe(s);
    var a = [];
    for (var l in Object(s))
      ut.call(s, l) && l != "constructor" && a.push(l);
    return a;
  }
  function $e(s, a) {
    if (a)
      return s.slice();
    var l = new s.constructor(s.length);
    return s.copy(l), l;
  }
  function Ye(s) {
    var a = new s.constructor(s.byteLength);
    return new Ht(a).set(new Ht(s)), a;
  }
  function pe(s, a) {
    var l = a ? Ye(s.buffer) : s.buffer;
    return new s.constructor(l, s.byteOffset, s.byteLength);
  }
  function ur(s, a, l) {
    var g = a ? l(ae(s), !0) : ae(s);
    return zt(g, xe, new s.constructor());
  }
  function lr(s) {
    var a = new s.constructor(s.source, we.exec(s));
    return a.lastIndex = s.lastIndex, a;
  }
  function Zr(s, a, l) {
    var g = a ? l(oe(s), !0) : oe(s);
    return zt(g, it, new s.constructor());
  }
  function Qr(s) {
    return ar ? Object(ar.call(s)) : {};
  }
  function tn(s, a) {
    var l = a ? Ye(s.buffer) : s.buffer;
    return new s.constructor(l, s.byteOffset, s.length);
  }
  function en(s, a) {
    var l = -1, g = s.length;
    for (a || (a = Array(g)); ++l < g; )
      a[l] = s[l];
    return a;
  }
  function Ge(s, a, l, g) {
    l || (l = {});
    for (var O = -1, M = a.length; ++O < M; ) {
      var D = a[O], R = void 0;
      cr(l, D, R === void 0 ? s[D] : R);
    }
    return l;
  }
  function rn(s, a) {
    return Ge(s, Ct(s), a);
  }
  function nn(s) {
    return Kr(s, Ve, Ct);
  }
  function he(s, a) {
    var l = s.__data__;
    return cn(a) ? l[typeof a == "string" ? "string" : "hash"] : l.map;
  }
  function mt(s, a) {
    var l = ie(s, a);
    return qr(l) ? l : void 0;
  }
  var Ct = Ut ? Nt(Ut, Object) : dn, Pt = Vr;
  (Mt && Pt(new Mt(new ArrayBuffer(1))) != _ || yt && Pt(new yt()) != p || at && Pt(at.resolve()) != I || xt && Pt(new xt()) != f || Wt && Pt(new Wt()) != w) && (Pt = function(s) {
    var a = Tt.call(s), l = a == b ? s.constructor : void 0, g = l ? rt(l) : void 0;
    if (g)
      switch (g) {
        case Bt:
          return _;
        case bt:
          return p;
        case jt:
          return I;
        case Yt:
          return f;
        case We:
          return w;
      }
    return a;
  });
  function sn(s) {
    var a = s.length, l = s.constructor(a);
    return a && typeof s[0] == "string" && ut.call(s, "index") && (l.index = s.index, l.input = s.input), l;
  }
  function vt(s) {
    return typeof s.constructor == "function" && !dr(s) ? Xr(et(s)) : {};
  }
  function an(s, a, l, g) {
    var O = s.constructor;
    switch (a) {
      case A:
        return Ye(s);
      case u:
      case d:
        return new O(+s);
      case _:
        return pe(s, g);
      case E:
      case L:
      case P:
      case Y:
      case x:
      case F:
      case tt:
      case Qt:
      case te:
        return tn(s, g);
      case p:
        return ur(s, g, l);
      case v:
      case k:
        return new O(s);
      case S:
        return lr(s);
      case f:
        return Zr(s, g, l);
      case T:
        return Qr(s);
    }
  }
  function on(s, a) {
    return a = a ?? i, !!a && (typeof s == "number" || Ee.test(s)) && s > -1 && s % 1 == 0 && s < a;
  }
  function cn(s) {
    var a = typeof s;
    return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? s !== "__proto__" : s === null;
  }
  function un(s) {
    return !!ce && ce in s;
  }
  function dr(s) {
    var a = s && s.constructor, l = typeof a == "function" && a.prototype || wt;
    return s === l;
  }
  function rt(s) {
    if (s != null) {
      try {
        return ue.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function fr(s) {
    return je(s, !0, !0);
  }
  function pr(s, a) {
    return s === a || s !== s && a !== a;
  }
  function Fe(s) {
    return ln(s) && ut.call(s, "callee") && (!de.call(s, "callee") || Tt.call(s) == o);
  }
  var Xe = Array.isArray;
  function Ne(s) {
    return s != null && mr(s.length) && !Ke(s);
  }
  function ln(s) {
    return gr(s) && Ne(s);
  }
  var hr = At || fn;
  function Ke(s) {
    var a = _t(s) ? Tt.call(s) : "";
    return a == m || a == y;
  }
  function mr(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= i;
  }
  function _t(s) {
    var a = typeof s;
    return !!s && (a == "object" || a == "function");
  }
  function gr(s) {
    return !!s && typeof s == "object";
  }
  function Ve(s) {
    return Ne(s) ? De(s) : Jr(s);
  }
  function dn() {
    return [];
  }
  function fn() {
    return !1;
  }
  t.exports = fr;
})(_r, _r.exports);
var Li = _r.exports;
const C = /* @__PURE__ */ Cn(Li);
function Hi(t, r) {
  return t.filter((n) => {
    if (r.forEach((i) => {
      n.items.includes(i) && (n.items = n.items.filter((o) => o !== i));
    }), n.items.length !== 0 || n.static)
      return n;
  });
}
const G = (t) => Object.keys(t).reduce((r, e) => {
  const { display: n } = t[e];
  return Math.max(r, n.to);
}, 0);
function nt(t, r, e) {
  t.forEach((n) => {
    const i = Object.values(r).filter(
      (p) => n.items.includes(p.id)
    ), c = i.filter(
      (p) => !e.includes(p.id)
    ).sort(
      (p, v) => p.display.from - v.display.from
    ), u = c[c.length - 1];
    let d = (u == null ? void 0 : u.display.to) || 0;
    i.forEach((p) => {
      if (e.includes(p.id)) {
        const v = p.display.to - p.display.from;
        p.display = {
          from: d,
          to: d + v
        }, d = d + v;
      }
    });
    const m = i.sort(
      (p, v) => p.display.from - v.display.from
    ).map((p) => p.id);
    let y = 0;
    m.forEach((p) => {
      const v = [];
      let b = 0;
      if (v.forEach((I) => {
        I.forEach((S) => {
          S.type === "transition" && (b += S.duration);
        });
      }), r[p]) {
        const I = r[p].display.to - r[p].display.from;
        r[p].display = {
          from: y - b,
          to: y + I - b
        }, y += I;
      }
    });
  });
}
function fs(t, r, e, n, i, o) {
  return r.forEach((c) => {
    if (!t.includes(c) && (i[c] = e[c], e[c].type === "composition" || e[c].type === "template")) {
      const u = n.find((d) => d.id === c);
      u && (o.push(u), fs(
        t,
        u.items,
        e,
        n,
        i,
        o
      ));
    }
  }), { updatedTrackItems: i, updatedStructure: o };
}
function Ui(t, r) {
  const e = C(t), n = r && r.length ? r : e.activeIds, i = n.map((_) => e.trackItemsMap[_]).filter((_) => !!_).map((_) => _.id), o = e.transitionIds.filter(
    (_) => {
      const E = e.transitionsMap[_];
      return i.includes(E.fromId) || i.includes(E.toId);
    }
  );
  i.push(...o);
  const c = e.trackItemIds, u = e.transitionIds, d = C(e.tracks), h = C(e.structure);
  i.forEach((_) => {
    var L;
    const E = e.trackItemsMap[_] || e.transitionsMap[_];
    if (E.type === "template" || E.type === "composition") {
      const P = (L = e.structure.find(
        (x) => x.id === E.id
      )) == null ? void 0 : L.items;
      i.push(...P);
      const Y = h.findIndex(
        (x) => x.id === E.id
      );
      h.splice(Y, 1);
    }
  }), i.forEach((_) => {
    h.forEach((E) => {
      E.items.includes(_) && (E.items = E.items.filter((L) => L !== _));
    });
  });
  const m = c.filter(
    (_) => !i.includes(_)
  );
  u.forEach((_) => {
    n.includes(_) && n.length === 1 && C(e.transitionsMap[_]);
  });
  const y = u.filter(
    (_) => !i.includes(_) && !n.includes(_)
  ), p = Object.fromEntries(
    Object.entries(e.transitionsMap).filter(
      ([_]) => !i.includes(_)
    )
  );
  Object.keys(p).forEach((_) => {
    n.includes(_) && (p[_].kind = "none");
  });
  const v = e.trackItemIds.filter(
    (_) => !n.includes(_)
  ), b = Hi(
    e.tracks,
    n
  ), I = Object.fromEntries(
    Object.entries(e.trackItemsMap).filter(
      ([_]) => !i.includes(_)
    )
  ), S = d.filter((_) => _.magnetic);
  nt(S, I, []);
  const f = {}, k = [], { updatedTrackItems: T, updatedStructure: w } = fs(
    i,
    v,
    e.trackItemsMap,
    e.structure,
    f,
    k
  ), A = G(T);
  return {
    trackItemIds: m,
    activeIds: [],
    trackItemsMap: T,
    tracks: b,
    duration: A,
    structure: w,
    transitionIds: y,
    transitionsMap: p
  };
}
const Wi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ps = (t = 21) => {
  let r = "", e = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    r += Wi[e[t] & 63];
  return r;
};
function Ie(t = 16) {
  const r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", e = r.charAt(Math.floor(Math.random() * r.length));
  let n = ps(t - 1);
  return n = n.replace(/[^a-zA-Z0-9]/g, "").slice(0, t - 1), e + n;
}
const He = (t) => {
  const r = t.map((e) => new FontFace(e.fontFamily, `url(${e.url})`).load().catch((n) => n));
  return r.length === 0 ? Promise.resolve(!0) : new Promise((e, n) => {
    Promise.all(r).then((i) => {
      i.forEach((o) => {
        o && o.family && (document.fonts.add(o), e(!0));
      });
    }).catch((i) => n(i));
  });
};
function Bi(t, r) {
  return t.forEach((e) => {
    r = r.split(e).join(Ie());
  }), r;
}
function hs(t, r, e) {
  const n = t.find((o) => o.id === r);
  if (!n) return [];
  const i = n.items;
  return i.forEach((o) => {
    const c = e[o];
    (c.type === "text" || c.type === "caption") && He([
      {
        fontFamily: c.details.fontFamily,
        url: c.details.fontUrl
      }
    ]), (c.type === "composition" || c.type === "template") && i.push(
      ...hs(t, o, e)
    );
  }), i;
}
async function ji(t) {
  let r = localStorage.getItem("DesignComboTemp");
  if (!r) return {};
  const e = C(t);
  let n = C(JSON.parse(r));
  const i = n.activeIds, o = n.trackItemsMap, c = n.structure;
  Object.keys(o).forEach((I) => {
    const S = o[I];
    if ((S.type === "text" || S.type === "caption") && He([
      {
        fontFamily: S.details.fontFamily,
        url: S.details.fontUrl
      }
    ]), S.type === "composition" || S.type === "template") {
      const f = hs(
        c,
        I,
        o
      );
      i.push(...f);
    }
  });
  const u = Bi(i, r), d = C(JSON.parse(u)), h = e.tracks;
  d.activeIds.forEach((I) => {
    const S = d.trackItemsMap[I];
    e.trackItemsMap[I] = S, e.trackItemIds.push(I);
    const f = {
      id: Ie(),
      type: S.type,
      items: [I],
      magnetic: !1,
      static: !1
    };
    h.unshift(f);
  });
  const m = [...d.structure, ...e.structure], y = e.trackItemIds, p = {
    ...d.trackItemsMap,
    ...e.trackItemsMap
  }, v = {
    structure: m,
    trackItemIds: y,
    trackItemsMap: p,
    tracks: h
  }, b = G(v.trackItemsMap);
  return {
    trackItemIds: v.trackItemIds,
    trackItemsMap: v.trackItemsMap,
    structure: v.structure,
    tracks: v.tracks,
    duration: b
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
const Yi = (t) => {
  const r = Object.fromEntries(
    Object.entries(t).filter(([e, n]) => n !== void 0)
  );
  Sr = { ...Sr, ...r };
}, Rn = () => Sr.cors, Gi = () => Sr.acceptsMap, Ue = (t) => new Promise((r, e) => {
  const n = new Image();
  n.onload = () => {
    const o = n.width, c = n.height;
    r({ width: o, height: c });
  }, n.onerror = (o) => {
    e(o);
  }, Rn().image && (n.crossOrigin = "anonymous"), n.src = t;
}), ms = (t) => new Promise((r, e) => {
  const n = new Audio();
  n.preload = "auto", n.addEventListener("loadedmetadata", () => {
    const o = n.duration * 1e3;
    r({ duration: o });
  }), n.addEventListener("error", (o) => {
    e(o);
  }), n.src = t, Rn().audio && (n.crossOrigin = "anonymous"), n.load();
}), Dn = (t) => new Promise((r, e) => {
  const n = document.createElement("video");
  n.preload = "auto", n.addEventListener("loadedmetadata", () => {
    const o = n.duration * 1e3, c = n.videoWidth, u = n.videoHeight;
    r({ duration: o, width: c, height: u });
  }), n.addEventListener("error", (o) => {
    e(o);
  }), n.src = t, Rn().video && (n.crossOrigin = "anonymous"), n.load();
}), Xi = async (t) => {
  var i, o;
  const r = t.duration, e = (i = t.details) == null ? void 0 : i.width, n = (o = t.details) == null ? void 0 : o.height;
  return r && e && n ? { duration: r, width: e, height: n } : Dn(t.details.src);
}, gs = (t, r) => {
  const e = document.createElement("div");
  Object.keys(r).forEach((i) => {
    i !== "height" && (e.style[i] = r[i]);
  }), document.body.appendChild(e), e.textContent = t, e.style.whiteSpace = "normal", e.style.position = "absolute", e.style.visibility = "hidden", e.style.display = "inline-block", e.style.width = r.width + "px", e.style.fontSize = r.fontSize + "px";
  const n = getComputedStyle(e).height;
  return document.body.removeChild(e), parseFloat(n);
}, Kn = (t, r) => {
  var u, d;
  const e = ((u = t.details.crop) == null ? void 0 : u.width) || t.details.width || 0, n = ((d = t.details.crop) == null ? void 0 : d.height) || t.details.height || 0;
  let i = r.width, o = r.height;
  const c = r.width / r.height;
  return e / n > c ? (i = e, o = e / c) : (o = n, i = n * c), {
    newWidth: i,
    newHeight: o,
    crop: {
      x: 0,
      y: 0,
      height: n,
      width: e
    }
  };
}, Vn = (t, r) => {
  const e = C(t.trim), n = C(t.display);
  return r.duration < t.display.to && (n.to = r.duration, e && (e.to = r.duration)), {
    duration: r.duration,
    trim: e,
    display: n
  };
};
async function Ki(t, r) {
  const e = { ...t }, n = Object.keys(r)[0], i = Object.values(r)[0], o = e.trackItemsMap[n], c = { ...e.trackItemsMap[n] }, u = o.details;
  if (!i.details.src) return {};
  if (o.type === "image") {
    const d = await Ue(i.details.src), { crop: h, newHeight: m, newWidth: y } = Kn(o, d);
    i.details.crop = h, i.details.height = m, i.details.width = y;
  } else if (o.type === "video") {
    const d = await Dn(i.details.src), h = e.trackItemsMap[n], { display: m, duration: y, trim: p } = Vn(h, d), { crop: v, newHeight: b, newWidth: I } = Kn(o, d);
    i.details.crop = v, i.details.height = b, i.details.width = I, c.display = m, c.duration = y, c.trim = p;
  } else if (o.type === "audio") {
    const d = await ms(i.details.src), h = e.trackItemsMap[n], { display: m, duration: y, trim: p } = Vn(h, d);
    c.display = m, c.duration = y, c.trim = p;
  }
  return o.details = { ...u, ...i.details }, e.trackItemsMap[n] = { ...c }, {
    trackItemsMap: {
      ...e.trackItemsMap,
      [n]: { ...c, details: { ...u, ...i.details } }
    }
  };
}
function Vi(t, r) {
  const e = C(t), n = {}, i = r && r.length ? r : e.activeIds;
  if (i.length === 0) return {};
  i.forEach((c) => {
    const u = e.trackItemsMap[c], d = Ie();
    e.trackItemsMap[d] = {
      ...C(u),
      id: d
    }, e.trackItemIds.push(d);
    const h = e.tracks.find(
      (m) => m.items.includes(c)
    );
    n[h.id] ? n[h.id].items.push(d) : n[h.id] = {
      ...h,
      id: Ie(),
      items: [d],
      static: !1,
      magnetic: !1
    };
  });
  const o = Object.values(n);
  return e.tracks = [...o, ...e.tracks], {
    trackItemsMap: e.trackItemsMap,
    tracks: e.tracks,
    trackItemIds: e.trackItemIds
  };
}
function qi(t) {
  const r = /#([0-9a-fA-F]{3,6})\b/g, e = /rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/g, n = /rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\s*\)/g;
  function i(c) {
    return c.length === 3 ? `#${c[0]}${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}`.toUpperCase() : `#${c.toUpperCase()}`;
  }
  function o(c, u, d) {
    return `#${(1 << 24 | c << 16 | u << 8 | d).toString(16).slice(1).toUpperCase()}`;
  }
  return t = t.replace(r, (c, u) => i(u)), t = t.replace(
    e,
    (c, u, d, h) => o(+u, +d, +h)
  ), t = t.replace(
    n,
    (c, u, d, h) => o(+u, +d, +h)
  ), t;
}
function V(t) {
  return /^#[0-9a-fA-F]{3}$/.test(t) ? "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] : t;
}
function ys(t, r) {
  let e = t;
  for (const n in r)
    if (Object.prototype.hasOwnProperty.call(r, n)) {
      const i = new RegExp(n, "g");
      e = e.replace(i, r[n]);
    }
  return e;
}
function Is(t) {
  const r = t.getAttribute("fill");
  if (r && r.trim() !== "" && r.trim() !== "none")
    return r.trim();
  const e = t.getAttribute("style");
  if (e) {
    const i = /fill\s*:\s*([^;]+);?/.exec(e);
    if (i) {
      const o = i[1].trim();
      if (o !== "" && o !== "none")
        return o;
    }
  }
  const n = t.parentElement;
  return n ? Is(n) : null;
}
function qe(t) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(t);
}
const Ji = (t) => {
  const r = `.${t.split(".").filter((o) => o.includes("fill:")).join(".")}`, e = {}, n = /\.([\w-]+)\s*\{\s*([^}]+)\s*\}/g;
  let i;
  for (; (i = n.exec(r)) !== null; ) {
    const o = i[1], c = i[2], u = {}, d = /fill\s*:\s*([^;]+);?/.exec(c), h = /stroke\s*:\s*([^;]+);?/.exec(c);
    d && (u.fill = V(d[1].trim())), h && (u.stroke = V(h[1].trim())), e[o] = u;
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
function Zi(t, r, e = 300, n = 300) {
  const i = [], c = new DOMParser().parseFromString(t, "image/svg+xml"), u = c.documentElement;
  u.setAttribute("width", `${e}`), u.setAttribute("height", `${n}`);
  const d = u.querySelectorAll("style"), h = {};
  d.forEach((I) => {
    const S = I.textContent || "", f = Ji(S);
    Object.assign(h, f);
    const k = S.replace(/\.(st[\w-]+)/g, `.${r}-$1`).replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`);
    I.textContent = k;
    const T = Array.from(c.querySelectorAll("*")), w = /* @__PURE__ */ new Set();
    T.forEach((A) => {
      if (hn(A)) return;
      ["fill", "stroke", "stop-color"].forEach((L) => {
        const P = A.getAttribute(L);
        P && !["none", "transparent"].includes(P) && w.add(V(P));
      });
      const _ = A.getAttribute("style");
      if (_) {
        const L = /fill\s*:\s*([^;]+);?/.exec(_), P = /stroke\s*:\s*([^;]+);?/.exec(_), Y = /stop-color\s*:\s*([^;]+);?/.exec(_);
        if (L) {
          const x = L[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
        if (P) {
          const x = P[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
        if (Y) {
          const x = Y[1].trim();
          x && !["none", "transparent"].includes(x) && qe(V(x)) && w.add(V(x));
        }
      }
      const E = A.getAttribute("class");
      E && E.split(" ").forEach((L) => {
        const P = h[L];
        P != null && P.fill && !["none", "transparent"].includes(P.fill) && w.add(V(P.fill)), P != null && P.stroke && !["none", "transparent"].includes(P.stroke) && w.add(V(P.stroke));
      });
    }), Array.from(w).forEach((A) => {
      qe(A) && i.push(A);
    });
  });
  const m = Array.from(c.querySelectorAll("*")), y = /* @__PURE__ */ new Set();
  return m.forEach((I) => {
    if (hn(I)) return;
    const S = I.getAttribute("class");
    if (S) {
      const k = S.split(" ").map((T) => `${r}-${T}`).join(" ");
      I.setAttribute("class", k), k.split(" ").forEach((T) => {
        const w = h[T];
        w != null && w.fill && !["none", "transparent"].includes(w.fill) && y.add(V(w.fill)), w != null && w.stroke && !["none", "transparent"].includes(w.stroke) && y.add(V(w.stroke));
      });
    }
    ["fill", "stroke", "stop-color"].forEach((k) => {
      const T = I.getAttribute(k);
      T && !["none", "transparent"].includes(T) && y.add(V(T));
    });
    const f = I.getAttribute("style");
    if (f) {
      const k = /fill\s*:\s*([^;]+);?/.exec(f), T = /stroke\s*:\s*([^;]+);?/.exec(f), w = /stop-color\s*:\s*([^;]+);?/.exec(f);
      if (k) {
        const A = k[1].trim();
        A && !["none", "transparent"].includes(A) && y.add(V(A));
      }
      if (T) {
        const A = T[1].trim();
        A && !["none", "transparent"].includes(A) && y.add(V(A));
      }
      if (w) {
        const A = w[1].trim();
        A && !["none", "transparent"].includes(A) && y.add(V(A));
      }
    }
  }), y.forEach(
    (I) => !i.includes(I) && qe(I) && i.push(I)
  ), Array.from(c.querySelectorAll("*")).forEach((I) => {
    if (I.hasAttribute("id")) {
      const S = I.getAttribute("id");
      I.setAttribute("id", `${r}-${S}`);
    }
    if (["fill", "stroke", "stop-color", "filter", "clip-path", "mask"].forEach(
      (S) => {
        const f = I.getAttribute(S);
        f && f.includes("url(#") && I.setAttribute(
          S,
          f.replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`)
        );
      }
    ), I.hasAttribute("style")) {
      const S = I.getAttribute("style");
      S.includes("url(#") && I.setAttribute(
        "style",
        S.replace(/url\(#(.*?)\)/g, `url(#${r}-$1)`)
      );
    }
  }), Array.from(c.querySelectorAll("path")).forEach((I) => {
    if (hn(I)) return;
    !Is(I) && !I.getAttribute("class") && (I.setAttribute("fill", "#000000"), i.includes("#000000") || i.push("#000000"));
  }), { serializer: new XMLSerializer().serializeToString(c), colors: i };
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
}, bs = (t, r) => t ? t.from && !t.to ? {
  from: t.from,
  to: r.duration
} : t : {
  from: 0,
  to: r.duration
};
function ks(t, r) {
  const e = {
    x: t.size.width / 2,
    y: t.size.height / 2
  }, n = { x: r.width / 2, y: r.height / 2 }, i = e.x - n.x;
  return {
    top: `${e.y - n.y}px`,
    left: `${i}px`,
    transform: "none"
    // No scaling for text/captions
  };
}
function ht(t, r) {
  const e = t.scaleMode, n = {
    x: t.size.width / 2,
    y: t.size.height / 2
  }, i = { x: r.width / 2, y: r.height / 2 };
  let o;
  if (e === "fill")
    o = Math.max(
      t.size.width / r.width,
      t.size.height / r.height
    );
  else if (e === "fit") {
    const d = t.scaleAspectRatio || 1;
    o = Math.min(
      t.size.width / r.width,
      t.size.height / r.height
    ) * d;
  } else
    o = Math.min(
      t.size.width / r.width,
      t.size.height / r.height
    );
  const c = n.x - i.x;
  return {
    top: `${n.y - i.y}px`,
    left: `${c}px`,
    transform: `scale(${o})`
  };
}
const vs = async (t, r) => {
  const e = t.details.src, n = await Xi(t), i = ht(r, {
    ...n
  }), o = bs(t.trim, { duration: n.duration }), c = {
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
    top: t.details.top || i.top || "0px",
    // Default top
    left: t.details.left || i.left || "0px",
    // Default left
    transform: t.details.transform || i.transform,
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
    trim: o,
    type: "video",
    name: "video",
    details: c,
    playbackRate: t.playbackRate || 1,
    display: pt(t.display, { duration: n.duration, trim: o }),
    duration: n.duration
  };
}, _s = async (t) => {
  const r = t.id, e = t.details, i = (await ms(e.src)).duration, o = bs(t.trim, { duration: i });
  return {
    id: r,
    name: t.name || "audio",
    type: "audio",
    display: pt(t.display, { duration: i, trim: o }),
    trim: o,
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src,
      volume: e.volume ?? 100
      // Default volume
    },
    metadata: { ...t.metadata },
    duration: i
  };
}, Qi = async (t, r) => {
  var u, d;
  const e = t.id, n = {
    width: ((u = t.details) == null ? void 0 : u.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, i = t.details, o = ht(r, n), c = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: c,
    details: {
      width: (i == null ? void 0 : i.width) || n.width,
      // Default width
      height: (i == null ? void 0 : i.height) || n.height,
      // Default height
      top: (i == null ? void 0 : i.top) || o.top,
      left: (i == null ? void 0 : i.left) || o.left,
      border: i.border || "none",
      // Default border
      borderRadius: i.borderRadius || 0,
      // Default border radius
      borderWidth: i.borderWidth || 0,
      // Default border width
      borderColor: i.borderColor || "#000000",
      // Default border color
      opacity: i.opacity || 100,
      // Default opacity
      flipX: i.flipX || !1,
      flipY: i.flipY || !1,
      inverted: i.inverted || !1,
      backgroundColors: (i == null ? void 0 : i.backgroundColors) || [
        "rgba(128, 128, 128,0.5)",
        "rgba(128, 128, 128,1)"
      ]
    },
    metadata: {}
  };
}, ta = async (t, r) => {
  var u, d;
  const e = t.id, n = {
    width: ((u = t.details) == null ? void 0 : u.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, i = t.details, o = ht(r, n), c = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: c,
    details: {
      width: (i == null ? void 0 : i.width) || n.width,
      // Default width
      height: (i == null ? void 0 : i.height) || n.height,
      // Default height
      top: (i == null ? void 0 : i.top) || o.top,
      left: (i == null ? void 0 : i.left) || o.left,
      border: i.border || "none",
      // Default border
      borderRadius: i.borderRadius || 0,
      // Default border radius
      borderWidth: i.borderWidth || 0,
      // Default border width
      borderColor: i.borderColor || "#000000",
      // Default border color
      opacity: i.opacity || 100,
      // Default opacity
      flipX: i.flipX || !1,
      flipY: i.flipY || !1,
      inverted: i.inverted || !1,
      backgroundColors: (i == null ? void 0 : i.backgroundColors) || [
        "rgba(128, 128, 128,0.5)",
        "rgba(128, 128, 128,1)"
      ],
      barThickness: i.barThickness || 10
    },
    metadata: {}
  };
}, ea = async (t, r) => {
  var u, d;
  const e = t.id, n = {
    width: ((u = t.details) == null ? void 0 : u.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, i = t.details, o = ht(r, n), c = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: c,
    details: {
      width: (i == null ? void 0 : i.width) || n.width,
      // Default width
      height: (i == null ? void 0 : i.height) || n.height,
      // Default height
      top: (i == null ? void 0 : i.top) || o.top,
      left: (i == null ? void 0 : i.left) || o.left,
      radialBarColor: i.radialBarColor || "rgba(128, 128, 128,1)",
      border: i.border || "none",
      // Default border
      borderRadius: i.borderRadius || 0,
      // Default border radius
      borderWidth: i.borderWidth || 0,
      // Default border width
      borderColor: i.borderColor || "#000000",
      // Default border color
      opacity: i.opacity || 100,
      // Default opacity
      flipX: i.flipX || !1,
      flipY: i.flipY || !1
    },
    metadata: {}
  };
}, ra = async (t, r) => {
  var u, d;
  const e = t.id, n = {
    width: ((u = t.details) == null ? void 0 : u.width) || r.size.width,
    height: ((d = t.details) == null ? void 0 : d.height) || r.size.height
  }, i = t.details, o = ht(r, n), c = pt(t.display);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: c,
    details: {
      width: (i == null ? void 0 : i.width) || n.width,
      // Default width
      height: (i == null ? void 0 : i.height) || n.height,
      // Default height
      top: (i == null ? void 0 : i.top) || o.top,
      left: (i == null ? void 0 : i.left) || o.left,
      border: i.border || "none",
      // Default border
      borderRadius: i.borderRadius || 0,
      // Default border radius
      borderWidth: i.borderWidth || 0,
      // Default border width
      borderColor: i.borderColor || "#000000",
      // Default border color
      opacity: i.opacity || 100,
      // Default opacity
      strokeColors: (i == null ? void 0 : i.strokeColors) || ["#ff9800", "#ff5722"],
      strokeWidth: (i == null ? void 0 : i.strokeWidth) || 100,
      strokeBackground: (i == null ? void 0 : i.strokeBackground) || "#fff",
      flipX: (i == null ? void 0 : i.flipX) || !1,
      flipY: (i == null ? void 0 : i.flipY) || !1,
      rotate: (i == null ? void 0 : i.rotate) || "0deg",
      transform: (i == null ? void 0 : i.transform) || "none"
    },
    metadata: {}
  };
}, mn = async (t, r) => {
  var c, u;
  const e = t.id, n = {
    width: ((c = t.details) == null ? void 0 : c.width) || r.size.width,
    height: ((u = t.details) == null ? void 0 : u.height) || r.size.height
  }, i = t.details, o = ht(r, n);
  return {
    id: e,
    name: t.type,
    type: t.type,
    display: {
      from: 0,
      to: t.duration || 1e4
    },
    details: {
      width: (i == null ? void 0 : i.width) || n.width,
      // Default width
      height: (i == null ? void 0 : i.height) || n.height,
      // Default height
      top: (i == null ? void 0 : i.top) || o.top,
      left: (i == null ? void 0 : i.left) || o.left,
      border: i.border || "none",
      // Default border
      borderRadius: i.borderRadius || 0,
      // Default border radius
      borderWidth: i.borderWidth || 0,
      // Default border width
      borderColor: i.borderColor || "#000000",
      // Default border color
      opacity: i.opacity || 100,
      // Default opacity
      flipX: i.flipX || !1,
      flipY: i.flipY || !1,
      inverted: i.inverted || !1,
      linealBarColor: i.linealBarColor || "rgba(128, 128, 128,1)",
      lineThickness: i.lineThickness || 1,
      gapSize: i.gapSize || 1,
      roundness: i.roundness || 1,
      placement: i.placement || null,
      strokeColor: i.strokeColor || "#92E1B0",
      fillColor: i.fillColor || null,
      strokeWidth: i.strokeWidth || null,
      copies: i.copies || null,
      offsetPixelSpeed: i.offsetPixelSpeed || 0,
      lineColor: i.lineColor || "#92E1B0",
      lineGap: i.lineGap || 0,
      topRoundness: i.topRoundness || 0,
      bottomRoundness: i.bottomRoundness || 0,
      lines: i.lines || 0,
      sections: i.sections || 0
    },
    metadata: {}
  };
}, Ss = async (t, r) => {
  var y;
  const e = t.trackItemIds, n = t.size || {
    width: t.details.width,
    height: t.details.height
  }, i = Math.min(
    r.size.width / n.width,
    r.size.height / n.height
  ), o = ((y = t.details) == null ? void 0 : y.rotate) || 0, c = ht(r, n), u = t.display;
  let d = 1 / 0, h = 0;
  e.forEach((p) => {
    const v = t.trackItemsMap[p];
    v.display.from < d && (d = v.display.from), v.display.to > h && (h = v.display.to);
  });
  const m = t.trim || t.display || { from: d, to: h };
  return {
    id: t.id,
    type: "template",
    details: {
      ...n,
      transform: t.details.transform || c.transform,
      // Default transform
      top: t.details.top || c.top,
      left: t.details.left || c.left,
      scale: i,
      rotate: o,
      background: t.details.background || "transparent"
    },
    trim: m,
    display: u || { from: d, to: h },
    activeEdit: !1
  };
}, na = async (t, r) => {
  var m;
  const e = t.trackItemIds, n = t.size || {
    width: t.details.width,
    height: t.details.height
  }, i = Math.min(
    r.size.width / n.width,
    r.size.height / n.height
  ), o = ((m = t.details) == null ? void 0 : m.rotate) || 0, c = ht(r, n), u = t.display;
  let d = 1 / 0, h = 0;
  return e.forEach((y) => {
    const p = t.trackItemsMap[y];
    p.display.from < d && (d = p.display.from), p.display.to > h && (h = p.display.to);
  }), {
    id: t.id,
    type: "composition",
    details: {
      ...n,
      transform: t.details.transform || c.transform,
      // Default transform
      top: t.details.top || c.top,
      left: t.details.left || c.left,
      scale: i,
      rotate: o
    },
    display: u || { from: d, to: h }
  };
}, ws = async (t, r) => {
  const e = t.details, n = Ue(e.src), i = fetch(e.src), [o, c] = await Promise.all([
    n,
    i
  ]), u = await c.text(), d = ht(r, o), { serializer: h, colors: m } = Zi(
    qi(u),
    t.id,
    Number(e.width || o.width),
    Number(e.height || o.height)
  ), y = t.details.colorMap || Object.fromEntries(m.map((p) => [p, p]));
  return {
    id: t.id,
    name: "illustration",
    type: t.type,
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src || "",
      // Default source URL
      width: e.width || o.width || 100,
      // Default width
      height: e.height || o.height || 100,
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
      svgString: h,
      initialSvgString: C(h),
      colorMap: y
    },
    metadata: t.metadata || {}
  };
}, sa = async (t, r) => {
  const e = t.details, n = Ue(e.src), [i] = await Promise.all([n]), o = ht(r, i);
  return {
    id: t.id,
    name: "shape",
    type: t.type,
    display: pt(t.display),
    playbackRate: t.playbackRate || 1,
    details: {
      src: e.src || "",
      // Default source URL
      width: e.width || i.width || 100,
      // Default width
      height: e.height || i.height || 100,
      // Default height
      opacity: e.opacity ?? 100,
      // Default opacity
      transform: e.transform || o.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      top: e.top || o.top || "0px",
      // Default top
      left: e.left || o.left || "0px",
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
}, ia = async (t, r) => {
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
}, Ts = async (t, r) => {
  const e = t.details, n = await Ue(e.src), i = ht(r, n);
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
      transform: e.transform || i.transform,
      // Default transform
      border: e.border || "none",
      // Default border
      borderRadius: e.borderRadius || 0,
      // Default border radius
      boxShadow: e.boxShadow || nr,
      // Default box shadow
      top: e.top || i.top || "0px",
      // Default top
      left: e.left || i.left || "0px",
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
  const n = e.id, i = e.details, o = Ms(i), c = i.height || gs(e.details.text, o), u = i.top != null && i.left != null ? {
    top: `${i.top}px`,
    left: `${i.left}px`
  } : ks(r, {
    width: o.width,
    height: c
  });
  return {
    id: n,
    name: "caption",
    type: "caption",
    display: pt(e.display),
    details: {
      ...e.details,
      ...o,
      text: i.text || "",
      // Default text content
      height: c,
      // Default height
      fontUrl: i.fontUrl,
      top: o.top || u.top,
      left: o.left || u.left,
      borderWidth: i.borderWidth || 0,
      borderColor: i.borderColor || "#000000",
      boxShadow: i.boxShadow || nr,
      words: i.words || [],
      appearedColor: i.appearedColor || i.color,
      activeColor: i.activeColor || i.color,
      activeFillColor: i.activeFillColor || "transparent",
      isKeywordColor: i.isKeywordColor || "transparent",
      preservedColorKeyWord: i.preservedColorKeyWord || !1,
      linesPerCaption: i.linesPerCaption || 2,
      wordsPerLine: i.wordsPerLine || "punctuationOrPause"
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
  const e = t.id, n = t.details, i = Ms(n), o = n.height || gs(t.details.text, i), c = n.top != null && n.left != null ? {
    top: `${n.top}px`,
    left: `${n.left}px`
  } : ks(r, {
    width: i.width,
    height: o
  });
  return {
    id: e,
    name: "text",
    type: "text",
    display: pt(t.display),
    details: {
      ...t.details,
      ...i,
      text: n.text || "",
      // Default text content
      height: o,
      // Default height
      fontUrl: n.fontUrl,
      top: i.top || c.top,
      left: i.left || c.left,
      borderWidth: n.borderWidth || 0,
      borderColor: n.borderColor || "#000000",
      boxShadow: n.boxShadow || nr
    },
    metadata: {}
  };
}, Ms = (t) => ({
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
}), aa = async (t, r) => {
  switch (t.type) {
    case "video":
      return vs(t, r || {});
    case "audio":
      return _s(t);
    case "image":
      return Ts(t, r || {});
    case "text":
      return As(t, r || {});
    case "caption":
      return Es(t, r || {});
    case "template":
      return Ss(t, {
        size: r == null ? void 0 : r.size
      });
    default:
      throw new Error("Unsupported track item");
  }
};
function xs(t, r) {
  return r.some(
    (e) => t.some((n) => n.id === e.id)
  );
}
const Os = (t = [], r = []) => t.length === 0 ? r.map((n) => ({
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
  id: e.id || Ie()
}));
async function oa(t, r) {
  var c, u, d;
  const e = r.trackItemsMap, n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  for (const h in e) {
    const m = e[h];
    if (m.type === "text" || m.type === "caption") {
      if (m.details.fontUrl) {
        const y = {
          fontFamily: m.details.fontFamily,
          url: m.details.fontUrl
        };
        n.add(JSON.stringify(y));
      }
      (c = m.animations) != null && c.in && m.animations.in.composition.forEach(
        (y) => {
          var p;
          (p = y.details) != null && p.fonts && y.details.fonts.forEach(
            (v) => {
              n.add(JSON.stringify(v));
            }
          );
        }
      ), (u = m.animations) != null && u.loop && m.animations.loop.composition.forEach(
        (y) => {
          var p;
          (p = y.details) != null && p.fonts && y.details.fonts.forEach(
            (v) => {
              n.add(JSON.stringify(v));
            }
          );
        }
      ), (d = m.animations) != null && d.out && m.animations.out.composition.forEach(
        (y) => {
          var p;
          (p = y.details) != null && p.fonts && y.details.fonts.forEach(
            (v) => {
              n.add(JSON.stringify(v));
            }
          );
        }
      );
    } else m.type === "illustration" && i.set(h, {
      trackItem: m,
      details: m.details
    });
  }
  n.size > 0 && await He(
    Array.from(n).map((h) => JSON.parse(h))
  );
  for (const [h, m] of i) {
    const y = await ws(
      { ...m.trackItem, details: m.details },
      {
        size: { width: m.details.width, height: m.details.height }
      }
    ), p = ys(
      y.details.svgString,
      m.details.colorMap
    );
    y.details.svgString = p, e[h] = y;
  }
  const o = G(e);
  return {
    ...r,
    duration: o
  };
}
function ca(t) {
  const r = C(t);
  if (!r.activeIds.length) return;
  const e = r.activeIds, n = [], i = {
    activeIds: e,
    trackItemsMap: {},
    tracks: [],
    structure: []
  };
  e.forEach((d) => {
    i.trackItemsMap[d] = r.trackItemsMap[d], n.push(r.tracks.find((h) => h.items.includes(d)));
  });
  const o = /* @__PURE__ */ new Set();
  n.filter((d) => o.has(d.id) ? !1 : (o.add(d.id), !0)), i.tracks = Array.from(o), i.activeIds.forEach((d) => {
    if (i.trackItemsMap[d].type === "composition" || i.trackItemsMap[d].type === "template") {
      const h = r.structure.find(
        (m) => m.id === d
      );
      h && (i.structure.push(h), h.items.forEach((m) => {
        i.trackItemsMap[m] = r.trackItemsMap[m];
      }));
    }
  });
  let u = JSON.stringify(i);
  localStorage.setItem("DesignComboTemp", u);
}
function ua(t, r) {
  const e = C(t);
  if (e.activeIds.length !== 1) return {};
  const n = e.activeIds[0], i = C(e.trackItemsMap[n]);
  if (r >= i.display.to || r <= i.display.from)
    return {};
  const o = Ie(), c = {
    ...i,
    display: {
      from: i.display.from,
      to: r
    }
  }, u = {
    ...i,
    id: o,
    display: {
      from: r,
      to: i.display.to
    }
  }, d = Object.values(e.transitionsMap).find(
    (m) => m.fromId === i.id && m.kind !== "none"
  ), h = Object.values(e.transitionsMap).find(
    (m) => m.toId === i.id && m.kind !== "none"
  );
  if (i.type === "video" || i.type === "audio") {
    const m = r - c.display.from;
    c.trim = {
      from: i.trim.from,
      to: i.trim.from + m
    }, u.trim = {
      from: i.trim.from + m,
      to: i.trim.to
    };
  }
  if (h) {
    const m = c.display.to - c.display.from;
    if (h.duration / 2 > m) {
      e.transitionIds = e.transitionIds.filter(
        (p) => p !== h.id
      );
      const y = {};
      e.transitionIds.forEach(
        (p) => y[p] = e.transitionsMap[p]
      ), e.transitionsMap = y;
    }
  }
  if (d) {
    const m = u.display.to - u.display.from, y = {};
    d.duration / 2 > m ? (e.transitionIds = e.transitionIds.filter(
      (p) => p !== d.id
    ), e.transitionIds.forEach(
      (p) => y[p] = e.transitionsMap[p]
    ), e.transitionsMap = y) : (e.transitionIds = e.transitionIds.map((p) => e.transitionsMap[p].fromId === c.id ? p.replace(c.id, o) : p), Object.keys(e.transitionsMap).forEach((p) => {
      if (e.transitionsMap[p].fromId === c.id) {
        const b = p.replace(c.id, o);
        y[b] = {
          ...e.transitionsMap[p],
          id: b,
          fromId: o
        };
      } else
        y[p] = e.transitionsMap[p];
    }), e.transitionsMap = y);
  }
  return e.trackItemsMap[n] = c, e.trackItemsMap[o] = u, e.trackItemIds.push(o), e.tracks.forEach((m) => {
    m.items.includes(n) && m.items.push(o);
  }), {
    tracks: e.tracks,
    trackItemIds: e.trackItemIds,
    trackItemsMap: e.trackItemsMap,
    transitionsMap: e.transitionsMap,
    transitionIds: e.transitionIds
  };
}
async function la(t, r) {
  const n = C(t).trackItemsMap, i = Object.keys(r);
  if (!i.length) return {};
  for (const c of i) {
    const u = r[c];
    if (u.details && (n[c].details = {
      ...n[c].details,
      ...u.details
    }, u.details.colorMap)) {
      const d = n[c].details.initialSvgString, h = ys(
        d,
        u.details.colorMap
      );
      n[c].details.svgString = h;
    }
    if (u.metadata && (n[c].metadata ? n[c].metadata = {
      ...n[c].metadata,
      ...u.metadata
    } : n[c].metadata = u.metadata), u.display || u.playbackRate) {
      const d = u.playbackRate, h = n[c].playbackRate || 1, m = n[c].display, v = (m.to - m.from) * h / d, b = {
        from: m.from,
        to: m.from + v
      };
      n[c].display = b, n[c].playbackRate = d;
    }
    u.animations && (n[c].animations = {
      ...n[c].animations,
      ...u.animations
    });
  }
  for (const c of i) {
    const u = r[c];
    if (n[c].type === "shape" && u.details.src) {
      const d = await Ue(u.details.src);
      n[c].details.width = d.width, n[c].details.height = d.height;
    }
  }
  const o = G(n);
  return {
    trackItemsMap: { ...n },
    duration: o
  };
}
async function da(t, r) {
  const e = C(t), n = Object.keys(r)[0], i = Object.values(r)[0], o = e.trackItemsMap[n], c = o.details;
  if (!i.details.src) return {};
  if (o.type === "image") {
    const u = await Ue(i.details.src), d = o.details.width || 0, h = o.details.height || 0;
    let m = u.width, y = u.height;
    const p = u.width / u.height;
    d / h > p ? (m = d, y = d / p) : (y = h, m = h * p), c.crop = {
      x: 0,
      y: 0,
      height: c.height,
      width: c.width
    }, i.details.width = m, i.details.height = y;
  } else if (o.type === "video") {
    const u = await Dn(i.details.src), d = o.details.width || 0, h = o.details.height || 0;
    let m = u.width, y = u.height;
    const p = u.width / u.height;
    d / h > p ? (m = d, y = d / p) : (y = h, m = h * p), c.crop = {
      x: 0,
      y: 0,
      height: c.height,
      width: c.width
    }, i.details.width = m, i.details.height = y;
  }
  return i.details && (o.details = { ...c, ...i.details }, i.details = o.details), e.trackItemsMap[n] = {
    ...e.trackItemsMap[n],
    type: i.type
  }, {
    trackItemsMap: {
      ...e.trackItemsMap
    }
  };
}
function fa(t, r) {
  const e = C(t);
  return e.background.value = r.value, e.background.type = r.type || "color", {
    ...e
  };
}
function pa(t, { idTrack: r, idItems: e }, n) {
  const i = n.tracks.find((c) => c.id === r);
  if (!i) return;
  const o = i.items.reduce((c, u) => {
    const d = n.trackItemsMap[u];
    return d.display.to > c.display.to ? d : c;
  }, t[0]);
  e.forEach((c) => {
    const u = t.find((h) => h.id === c);
    if (!u) return;
    const d = u.display.to - u.display.from;
    u.display.from = o.display.to, u.display.to = u.display.from + d;
  });
}
async function ha(t, r, e = {}) {
  var v;
  const n = C(t), i = r.trackItems.map(
    (b) => aa(b, {
      size: n.size
    })
  ), o = await Promise.all(i);
  (v = r.tracks) == null || v.forEach((b) => {
    pa(
      o,
      { idTrack: b.id, idItems: b.items },
      n
    );
  });
  const c = Os(r.tracks, r.trackItems), u = [], d = o.map((b) => b.id);
  r.trackItems.forEach((b) => {
    if (b.type !== "template") return;
    n.trackItemsMap = {
      ...n.trackItemsMap,
      ...b.trackItemsMap
    }, n.transitionsMap = {
      ...n.transitionsMap,
      ...b.transitionsMap
    };
    const I = {
      id: b.id,
      items: b.trackItemIds,
      transitions: b.transitionsIds || [],
      tracks: b.tracks
    };
    u.push(I);
  });
  const h = [], m = {};
  if (o.forEach((b) => {
    h.push(b.id), m[b.id] = b;
  }), xs(
    n.tracks,
    c
  ))
    n.tracks.forEach((b) => {
      c.forEach((I) => {
        b.id === I.id && (b.magnetic && nt(
          [b],
          n.trackItemsMap,
          d
        ), b.items.push(...h));
      });
    });
  else {
    const b = e.trackIndex || 0, I = Math.min(
      Math.max(b, 0),
      n.tracks.length
    );
    n.tracks.splice(I, 0, ...c);
  }
  n.trackItemsMap = {
    ...n.trackItemsMap,
    ...m
  }, n.trackItemIds = [
    ...n.trackItemIds,
    ...h
  ], n.structure = [...n.structure, ...u];
  const p = n.tracks.filter((b) => b.magnetic);
  return nt(p, n.trackItemsMap, d), n.duration = G(n.trackItemsMap), {
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
  const n = r.map((c) => c.id), i = [], o = {};
  if (r.forEach((c) => {
    i.push(c.id), o[c.id] = c;
  }), (e.targetTrackIndex !== void 0 || e.targetTrackId) && !e.isNewTrack) {
    const c = e.targetTrackIndex || 0, u = e.targetTrackId;
    let d = t.tracks[c];
    if (u && (d = t.tracks.find((h) => h.id === u)), !d)
      throw new Error("Target track not found");
    d.items.push(...i);
  } else {
    const c = {
      id: ps(),
      accepts: Object.keys(Gi()),
      type: r[0].type,
      items: n,
      magnetic: !1,
      static: !1
    };
    t.tracks.splice(e.targetTrackIndex || 0, 0, c);
  }
  return t.trackItemsMap = {
    ...t.trackItemsMap,
    ...o
  }, t.trackItemIds = [
    ...t.trackItemIds,
    ...i
  ], t;
}
async function ma(t, r, e = {}) {
  const n = C(t), i = [
    Ts(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e), d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), u.duration = G(u.trackItemsMap), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function ga(t, r, e = {}) {
  const n = C(t), i = [_s(r)], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function ya(t, r, e = {}) {
  const n = C(t), i = [
    vs(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function Ia(t, r, e = {}) {
  const n = C(t), i = [
    As(r, {
      size: e.size
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function ba(t, r, e = {}) {
  const n = C(t), i = [
    sa(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function ka(t, r, e = {}) {
  const n = C(t), i = [
    ws(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
async function va(t, r, e = {}) {
  const n = C(t), i = "composition", o = r.trackItemsMap, c = r.trackItemIds, u = r.tracks || [], d = r.trackItemDetailsMap, { details: h, ...m } = await na(r, {
    size: n.size,
    scaleMode: e.scaleMode,
    scaleAspectRatio: e.scaleAspectRatio
  }), y = {
    id: m.id,
    items: c,
    transitions: [],
    tracks: u
  }, v = [{
    ...m,
    type: i,
    details: h
  }], b = St(n, v, e);
  b.trackItemsMap = {
    ...b.trackItemsMap,
    ...o,
    [m.id]: {
      ...m,
      type: i,
      details: h
    }
  }, b.structure = [...b.structure, y], b.duration = G(b.trackItemsMap);
  const I = b.tracks.filter((S) => S.magnetic);
  return nt(I, b.trackItemsMap, [m.id]), d && Object.keys(d).forEach((S) => {
    b.trackItemsMap[S] = {
      ...b.trackItemsMap[S],
      details: {
        ...d[S].details
      }
    };
  }), {
    trackItemIds: b.trackItemIds,
    trackItemsMap: b.trackItemsMap,
    tracks: b.tracks,
    duration: b.duration,
    structure: b.structure
  };
}
async function ge(t, r, e = {}, n) {
  const i = C(t), o = (y) => y.display ? y.display : {
    from: 0,
    to: i.duration
  }, c = [];
  n === "progress-bar" && c.push(
    Qi(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ), n === "progress-frame" && c.push(
    ta(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ), n === "radial-audio-bars" && (r.display = o(r), c.push(
    ea(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "lineal-audio-bars" && (r.display = o(r), c.push(
    mn(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "wave-audio-bars" && (r.display = o(r), c.push(
    mn(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "hill-audio-bars" && (r.display = o(r), c.push(
    mn(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  )), n === "progress-square" && c.push(
    ra(r, {
      size: i.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  );
  const u = await Promise.all(c), d = u.map((y) => y.id), h = St(i, u, e);
  h.duration = G(h.trackItemsMap);
  const m = h.tracks.filter((y) => y.magnetic);
  return nt(m, h.trackItemsMap, d), {
    trackItemIds: h.trackItemIds,
    trackItemsMap: h.trackItemsMap,
    tracks: h.tracks,
    duration: h.duration
  };
}
async function _a(t, r, e = {}) {
  const n = C(t), i = "template", o = r.trackItemsMap, c = r.trackItemIds, u = r.transitionsMap, d = r.transitionIds || [], h = r.tracks || [], m = r.structure || [], { details: y, ...p } = await Ss(r, {
    size: n.size,
    scaleMode: e.scaleMode,
    scaleAspectRatio: e.scaleAspectRatio
  }), v = {
    id: p.id,
    items: c,
    transitions: d,
    tracks: h
  }, I = [{
    ...p,
    type: i,
    details: y
  }], S = St(n, I, e);
  S.transitionIds = [
    ...S.transitionIds,
    ...d
  ], S.transitionsMap = {
    ...S.transitionsMap,
    ...u
  }, S.trackItemsMap = {
    ...S.trackItemsMap,
    ...o,
    [p.id]: {
      ...p,
      type: i,
      details: y
    }
  }, S.structure = [
    ...S.structure,
    v,
    ...m
  ], S.duration = G(S.trackItemsMap);
  const f = S.tracks.filter((k) => k.magnetic);
  return nt(f, S.trackItemsMap, [p.id]), {
    trackItemIds: S.trackItemIds,
    trackItemsMap: S.trackItemsMap,
    tracks: S.tracks,
    duration: S.duration,
    structure: S.structure,
    transitionsMap: S.transitionsMap
  };
}
async function Sa(t, r, e = {}) {
  const n = C(t), i = r.trackItems.map(
    (y) => Es(y, {
      size: e.size
    })
  ), o = await Promise.all(i), c = Os(r.tracks, r.trackItems), u = [], d = {};
  if (o.forEach((y) => {
    const { details: p, ...v } = y;
    u.push(y.id), d[y.id] = v;
  }), xs(
    n.tracks,
    c
  ))
    n.tracks.forEach((y) => {
      c.forEach((p) => {
        y.id === p.id && (y.magnetic && nt(
          [y],
          n.trackItemsMap,
          u
        ), y.items.push(...u));
      });
    });
  else {
    const y = e.trackIndex || 0, p = Math.min(
      Math.max(y, 0),
      n.tracks.length
    );
    n.tracks.splice(p, 0, ...c);
  }
  n.trackItemsMap = {
    ...n.trackItemsMap,
    ...d
  }, n.trackItemIds = [
    ...n.trackItemIds,
    ...u
  ], n.duration = G(n.trackItemsMap);
  const m = n.tracks.filter((y) => y.magnetic);
  return nt(
    m,
    n.trackItemsMap,
    u
  ), {
    trackItemIds: n.trackItemIds,
    trackItemsMap: n.trackItemsMap,
    tracks: n.tracks,
    duration: n.duration
  };
}
async function wa(t, r) {
  const e = C(t), n = e.trackItemsMap[r.id], i = [];
  if (!n) return {};
  let o = n.animations || {};
  return r.animations.loop ? r.animations.loop.composition.forEach(
    (c) => {
      var u;
      (u = c.details) != null && u.fonts && i.push(...c.details.fonts);
    }
  ) : r.animations.in ? r.animations.in.composition.forEach(
    (c) => {
      var u;
      (u = c.details) != null && u.fonts && i.push(...c.details.fonts);
    }
  ) : r.animations.out ? r.animations.out.composition.forEach(
    (c) => {
      var u;
      (u = c.details) != null && u.fonts && i.push(...c.details.fonts);
    }
  ) : r.animations.timed && r.animations.timed.composition.forEach(
    (c) => {
      var u;
      (u = c.details) != null && u.fonts && i.push(...c.details.fonts);
    }
  ), i.length > 0 && await He(i), o.in && r.animations.in ? o.in = r.animations.in : o.out && r.animations.out ? o.out = r.animations.out : o.loop && r.animations.loop ? o.loop = r.animations.loop : !o.out && r.animations.out ? o.out = r.animations.out : !o.in && r.animations.in ? o.in = r.animations.in : !o.loop && r.animations.loop ? o.loop = r.animations.loop : o = r.animations, (r.animations.in || r.animations.out || r.animations.loop) && delete o.timed, r.animations.timed && (o.timed = r.animations.timed, delete o.in, delete o.out, delete o.loop), n.animations = o, {
    trackItemsMap: e.trackItemsMap
  };
}
async function Ta(t, r, e = {}) {
  const n = C(t), i = [
    ia(r, {
      size: n.size,
      scaleMode: e.scaleMode,
      scaleAspectRatio: e.scaleAspectRatio
    })
  ], o = await Promise.all(i), c = o.map((h) => h.id), u = St(n, o, e);
  u.duration = G(u.trackItemsMap);
  const d = u.tracks.filter((h) => h.magnetic);
  return nt(d, u.trackItemsMap, c), {
    trackItemIds: u.trackItemIds,
    trackItemsMap: u.trackItemsMap,
    tracks: u.tracks,
    duration: u.duration
  };
}
function Ea(t) {
  const r = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Xn))
  ), e = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Pn))
  ), n = Vt.pipe(
    qt(({ key: f }) => f.startsWith(H))
  ), i = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Q))
  ), o = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Ar))
  ), c = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Le))
  ), u = Vt.pipe(
    qt(({ key: f }) => f.startsWith(Zt))
  ), d = Vt.pipe(
    qt(({ key: f }) => f.startsWith(ds))
  ), h = r.subscribe(async (f) => {
    var k;
    if (f.key === Xn) {
      const { actions: T } = (k = f.value) == null ? void 0 : k.payload;
      T.forEach((w) => {
        Us(w.type, w.payload && { payload: w.payload });
      });
    }
  }), m = e.subscribe(async (f) => {
    var k, T;
    if (f.key === ii) {
      const w = (k = f.value) == null ? void 0 : k.payload, A = await oa(t.getState(), w);
      t.updateState(A, {
        kind: "design:load",
        updateHistory: !1
      });
    }
    if (f.key === ai) {
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
  }), y = o.subscribe((f) => {
    if (f.key === $i) return t.undo();
    if (f.key === Fi) return t.redo();
  }), p = d.subscribe((f) => {
    var k;
    if (f.key === Ni) {
      const T = (k = f.value) == null ? void 0 : k.payload.scale;
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
  }), v = i.subscribe(async (f) => {
    var k, T, w, A;
    if (f.key === Ci) {
      const _ = ((k = f.value) == null ? void 0 : k.payload.trackItemIds) || [];
      t.updateState(
        { activeIds: _ },
        {
          kind: "update",
          updateHistory: !1
        }
      );
    }
    if (f.key === Pi && ca(t.getState()), f.key === Di) {
      const _ = (T = f.value) == null ? void 0 : T.payload.trackItemIds, E = Ui(t.getState(), _);
      t.updateState(E, { updateHistory: !0, kind: "remove" });
    }
    if (f.key === Ri) {
      const _ = Vi(
        t.getState(),
        (w = f.value) == null ? void 0 : w.payload.trackItemIds
      );
      t.updateState(_, {
        updateHistory: !0,
        kind: "update"
      });
    }
    if (f.key === zi) {
      const _ = (A = f.value) == null ? void 0 : A.payload, E = await Ki(t.getState(), _);
      t.updateState(E, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
  }), b = n.subscribe(async (f) => {
    var L, P, Y, x, F, tt, Qt, te, Se, we, Te, Ee, z, Ae, Me, st, ee, $, re, xe, it, ne, se, zt, $t, ie, Ft, ae, Nt, oe, Oe, Ce, wt, Lt, ce, ue, ut, Tt, Pe, gt, Et, Ht, et, le, de, Re, Ut, At, fe, Mt, yt, at, xt, Wt, It, Bt, bt, jt, Yt;
    const k = C(t.getState()), T = ((P = (L = f.value) == null ? void 0 : L.options) == null ? void 0 : P.isSelected) || !1, w = (x = (Y = f.value) == null ? void 0 : Y.options) == null ? void 0 : x.scaleMode, A = (tt = (F = f.value) == null ? void 0 : F.options) == null ? void 0 : tt.scaleAspectRatio, _ = (te = (Qt = f.value) == null ? void 0 : Qt.options) == null ? void 0 : te.trackIndex;
    let E = {};
    f.key === pi ? E = await wa(k, (Se = f.value) == null ? void 0 : Se.payload) : f.key === gi ? E = await ha(k, (we = f.value) == null ? void 0 : we.payload, {
      trackIndex: _
    }) : f.key === hi ? E = await Sa(k, (Te = f.value) == null ? void 0 : Te.payload, {
      trackIndex: _
    }) : f.key === oi ? E = await Ia(k, (Ee = f.value) == null ? void 0 : Ee.payload, {
      targetTrackIndex: _,
      targetTrackId: (z = f.value) == null ? void 0 : z.options.targetTrackId,
      size: k.size,
      isNewTrack: (Me = (Ae = f.value) == null ? void 0 : Ae.options) == null ? void 0 : Me.isNewTrack
    }) : f.key === mi ? E = await _a(k, (st = f.value) == null ? void 0 : st.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: ($ = (ee = f.value) == null ? void 0 : ee.options) == null ? void 0 : $.targetTrackId
    }) : f.key === di ? E = await ka(k, (re = f.value) == null ? void 0 : re.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (xe = f.value) == null ? void 0 : xe.options.targetTrackId
    }) : f.key === fi ? E = await ba(k, (it = f.value) == null ? void 0 : it.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (ne = f.value) == null ? void 0 : ne.options.targetTrackId
    }) : f.key === Ti ? E = await Ta(k, (se = f.value) == null ? void 0 : se.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (zt = f.value) == null ? void 0 : zt.options.targetTrackId
    }) : f.key === li ? E = await ma(k, ($t = f.value) == null ? void 0 : $t.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (ie = f.value) == null ? void 0 : ie.options.targetTrackId,
      isNewTrack: (ae = (Ft = f.value) == null ? void 0 : Ft.options) == null ? void 0 : ae.isNewTrack
    }) : f.key === ui ? E = await ga(k, (Nt = f.value) == null ? void 0 : Nt.payload, {
      targetTrackIndex: _,
      targetTrackId: (oe = f.value) == null ? void 0 : oe.options.targetTrackId,
      isNewTrack: (Ce = (Oe = f.value) == null ? void 0 : Oe.options) == null ? void 0 : Ce.isNewTrack
    }) : f.key === ci ? E = await ya(k, (wt = f.value) == null ? void 0 : wt.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (Lt = f.value) == null ? void 0 : Lt.options.targetTrackId,
      isNewTrack: (ue = (ce = f.value) == null ? void 0 : ce.options) == null ? void 0 : ue.isNewTrack
    }) : f.key === yi ? E = await va(k, (ut = f.value) == null ? void 0 : ut.payload, {
      scaleMode: w,
      scaleAspectRatio: A,
      targetTrackIndex: _,
      targetTrackId: (Tt = f.value) == null ? void 0 : Tt.options.targetTrackId
    }) : f.key === Ii ? E = await ge(
      k,
      (Pe = f.value) == null ? void 0 : Pe.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Et = (gt = f.value) == null ? void 0 : gt.options) == null ? void 0 : Et.targetTrackId
      },
      "progress-bar"
    ) : f.key === _i ? E = await ge(
      k,
      (Ht = f.value) == null ? void 0 : Ht.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (le = (et = f.value) == null ? void 0 : et.options) == null ? void 0 : le.targetTrackId
      },
      "progress-square"
    ) : f.key === bi ? E = await ge(
      k,
      (de = f.value) == null ? void 0 : de.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Ut = (Re = f.value) == null ? void 0 : Re.options) == null ? void 0 : Ut.targetTrackId
      },
      "progress-frame"
    ) : f.key === ki ? E = await ge(
      k,
      (At = f.value) == null ? void 0 : At.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Mt = (fe = f.value) == null ? void 0 : fe.options) == null ? void 0 : Mt.targetTrackId
      },
      "radial-audio-bars"
    ) : f.key === vi ? E = await ge(
      k,
      (yt = f.value) == null ? void 0 : yt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (xt = (at = f.value) == null ? void 0 : at.options) == null ? void 0 : xt.targetTrackId
      },
      "lineal-audio-bars"
    ) : f.key === Si ? E = await ge(
      k,
      (Wt = f.value) == null ? void 0 : Wt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Bt = (It = f.value) == null ? void 0 : It.options) == null ? void 0 : Bt.targetTrackId
      },
      "wave-audio-bars"
    ) : f.key === wi && (E = await ge(
      k,
      (bt = f.value) == null ? void 0 : bt.payload,
      {
        targetTrackIndex: _,
        targetTrackId: (Yt = (jt = f.value) == null ? void 0 : jt.options) == null ? void 0 : Yt.targetTrackId
      },
      "hill-audio-bars"
    )), T && E.trackItemIds && (E.activeIds = E.trackItemIds), t.updateState(E, {
      updateHistory: !0,
      kind: "add"
    });
  }), I = c.subscribe(async (f) => {
    var k;
    if (f.key === Oi) {
      const T = (k = f.value) == null ? void 0 : k.options.time, w = ua(t.getState(), T);
      Object.keys(w).length > 0 && t.updateState(w, {
        updateHistory: !0,
        kind: "update"
      });
    }
    if (f.key === xi) {
      const T = await ji(t.getState());
      t.updateState(T, {
        updateHistory: !0,
        kind: "update"
      });
    }
  }), S = u.subscribe(async (f) => {
    var k, T, w;
    if (f.key === Ei) {
      const A = await la(
        t.getState(),
        (k = f.value) == null ? void 0 : k.payload
      );
      t.updateState(A, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
    if (f.key === Ai) {
      const A = await da(
        t.getState(),
        (T = f.value) == null ? void 0 : T.payload
      );
      t.updateState(A, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
    if (f.key === Mi) {
      const A = fa(t.getState(), (w = f.value) == null ? void 0 : w.payload);
      t.updateState(A, {
        updateHistory: !0,
        kind: "update:details"
      });
    }
  });
  return {
    unsubscribe: () => {
      b.unsubscribe(), I.unsubscribe(), S.unsubscribe(), y.unsubscribe(), v.unsubscribe(), m.unsubscribe(), p.unsubscribe(), h.unsubscribe();
    }
  };
}
const Aa = { Date: !0, RegExp: !0, String: !0, Number: !0 };
function Cs(t, r, e = { cyclesFix: !0 }, n = []) {
  var u, d;
  let i = [];
  const o = Array.isArray(t);
  for (const h in t) {
    const m = t[h], y = o ? +h : h;
    if (!(h in r)) {
      i.push({
        type: "REMOVE",
        path: [y],
        oldValue: t[h]
      });
      continue;
    }
    const p = r[h], v = typeof m == "object" && typeof p == "object" && Array.isArray(m) === Array.isArray(p);
    m && p && v && !Aa[(d = (u = Object.getPrototypeOf(m)) == null ? void 0 : u.constructor) == null ? void 0 : d.name] && (!e.cyclesFix || !n.includes(m)) ? i.push.apply(i, Cs(m, p, e, e.cyclesFix ? n.concat([m]) : []).map((b) => (b.path.unshift(y), b))) : m !== p && // treat NaN values as equivalent
    !(Number.isNaN(m) && Number.isNaN(p)) && !(v && (isNaN(m) ? m + "" == p + "" : +m == +p)) && i.push({
      path: [y],
      type: "CHANGE",
      value: p,
      oldValue: m
    });
  }
  const c = Array.isArray(r);
  for (const h in r)
    h in t || i.push({
      type: "CREATE",
      path: [c ? +h : h],
      value: r[h]
    });
  return i;
}
var zn = Symbol.for("immer-nothing"), Je = Symbol.for("immer-draftable"), lt = Symbol.for("immer-state"), Ps = process.env.NODE_ENV !== "production" ? [
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
function j(t, ...r) {
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
function Jt(t) {
  var r;
  return t ? Rs(t) || Array.isArray(t) || !!t[Je] || !!((r = t.constructor) != null && r[Je]) || sr(t) || ir(t) : !1;
}
var Ma = Object.prototype.constructor.toString();
function Rs(t) {
  if (!t || typeof t != "object")
    return !1;
  const r = be(t);
  if (r === null)
    return !0;
  const e = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
  return e === Object ? !0 : typeof e == "function" && Function.toString.call(e) === Ma;
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
function gn(t, r) {
  return ve(t) === 2 ? t.get(r) : t[r];
}
function Ds(t, r, e) {
  const n = ve(t);
  n === 2 ? t.set(r, e) : n === 3 ? t.add(e) : t[r] = e;
}
function xa(t, r) {
  return t === r ? t !== 0 || 1 / t === 1 / r : t !== t && r !== r;
}
function sr(t) {
  return t instanceof Map;
}
function ir(t) {
  return t instanceof Set;
}
function ye(t) {
  return t.copy_ || t.base_;
}
function Tn(t, r) {
  if (sr(t))
    return new Map(t);
  if (ir(t))
    return new Set(t);
  if (Array.isArray(t))
    return Array.prototype.slice.call(t);
  const e = Rs(t);
  if (r === !0 || r === "class_only" && !e) {
    const n = Object.getOwnPropertyDescriptors(t);
    delete n[lt];
    let i = Reflect.ownKeys(n);
    for (let o = 0; o < i.length; o++) {
      const c = i[o], u = n[c];
      u.writable === !1 && (u.writable = !0, u.configurable = !0), (u.get || u.set) && (n[c] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: u.enumerable,
        value: t[c]
      });
    }
    return Object.create(be(t), n);
  } else {
    const n = be(t);
    if (n !== null && e)
      return { ...t };
    const i = Object.create(n);
    return Object.assign(i, t);
  }
}
function $n(t, r = !1) {
  return Mr(t) || ke(t) || !Jt(t) || (ve(t) > 1 && (t.set = t.add = t.clear = t.delete = Oa), Object.freeze(t), r && Object.entries(t).forEach(([e, n]) => $n(n, !0))), t;
}
function Oa() {
  j(2);
}
function Mr(t) {
  return Object.isFrozen(t);
}
var En = {};
function _e(t) {
  const r = En[t];
  return r || j(0, t), r;
}
function Ca(t, r) {
  En[t] || (En[t] = r);
}
var tr;
function zs() {
  return tr;
}
function Pa(t, r) {
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
function qn(t, r) {
  r && (_e("Patches"), t.patches_ = [], t.inversePatches_ = [], t.patchListener_ = r);
}
function An(t) {
  Mn(t), t.drafts_.forEach(Ra), t.drafts_ = null;
}
function Mn(t) {
  t === tr && (tr = t.parent_);
}
function Jn(t) {
  return tr = Pa(tr, t);
}
function Ra(t) {
  const r = t[lt];
  r.type_ === 0 || r.type_ === 1 ? r.revoke_() : r.revoked_ = !0;
}
function Zn(t, r) {
  r.unfinalizedDrafts_ = r.drafts_.length;
  const e = r.drafts_[0];
  return t !== void 0 && t !== e ? (e[lt].modified_ && (An(r), j(4)), Jt(t) && (t = wr(r, t), r.parent_ || Tr(r, t)), r.patches_ && _e("Patches").generateReplacementPatches_(
    e[lt].base_,
    t,
    r.patches_,
    r.inversePatches_
  )) : t = wr(r, e, []), An(r), r.patches_ && r.patchListener_(r.patches_, r.inversePatches_), t !== zn ? t : void 0;
}
function wr(t, r, e) {
  if (Mr(r))
    return r;
  const n = r[lt];
  if (!n)
    return Ze(
      r,
      (i, o) => Qn(t, n, r, i, o, e)
    ), r;
  if (n.scope_ !== t)
    return r;
  if (!n.modified_)
    return Tr(t, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const i = n.copy_;
    let o = i, c = !1;
    n.type_ === 3 && (o = new Set(i), i.clear(), c = !0), Ze(
      o,
      (u, d) => Qn(t, n, i, u, d, e, c)
    ), Tr(t, i, !1), e && t.patches_ && _e("Patches").generatePatches_(
      n,
      e,
      t.patches_,
      t.inversePatches_
    );
  }
  return n.copy_;
}
function Qn(t, r, e, n, i, o, c) {
  if (process.env.NODE_ENV !== "production" && i === e && j(5), ke(i)) {
    const u = o && r && r.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Qe(r.assigned_, n) ? o.concat(n) : void 0, d = wr(t, i, u);
    if (Ds(e, n, d), ke(d))
      t.canAutoFreeze_ = !1;
    else
      return;
  } else c && e.add(i);
  if (Jt(i) && !Mr(i)) {
    if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1)
      return;
    wr(t, i), (!r || !r.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(e, n) && Tr(t, i);
  }
}
function Tr(t, r, e = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && $n(r, e);
}
function Da(t, r) {
  const e = Array.isArray(t), n = {
    type_: e ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: r ? r.scope_ : zs(),
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
  let i = n, o = Fn;
  e && (i = [n], o = er);
  const { revoke: c, proxy: u } = Proxy.revocable(i, o);
  return n.draft_ = u, n.revoke_ = c, u;
}
var Fn = {
  get(t, r) {
    if (r === lt)
      return t;
    const e = ye(t);
    if (!Qe(e, r))
      return za(t, e, r);
    const n = e[r];
    return t.finalized_ || !Jt(n) ? n : n === yn(t.base_, r) ? (In(t), t.copy_[r] = On(n, t)) : n;
  },
  has(t, r) {
    return r in ye(t);
  },
  ownKeys(t) {
    return Reflect.ownKeys(ye(t));
  },
  set(t, r, e) {
    const n = $s(ye(t), r);
    if (n != null && n.set)
      return n.set.call(t.draft_, e), !0;
    if (!t.modified_) {
      const i = yn(ye(t), r), o = i == null ? void 0 : i[lt];
      if (o && o.base_ === e)
        return t.copy_[r] = e, t.assigned_[r] = !1, !0;
      if (xa(e, i) && (e !== void 0 || Qe(t.base_, r)))
        return !0;
      In(t), xn(t);
    }
    return t.copy_[r] === e && // special case: handle new props with value 'undefined'
    (e !== void 0 || r in t.copy_) || // special case: NaN
    Number.isNaN(e) && Number.isNaN(t.copy_[r]) || (t.copy_[r] = e, t.assigned_[r] = !0), !0;
  },
  deleteProperty(t, r) {
    return yn(t.base_, r) !== void 0 || r in t.base_ ? (t.assigned_[r] = !1, In(t), xn(t)) : delete t.assigned_[r], t.copy_ && delete t.copy_[r], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(t, r) {
    const e = ye(t), n = Reflect.getOwnPropertyDescriptor(e, r);
    return n && {
      writable: !0,
      configurable: t.type_ !== 1 || r !== "length",
      enumerable: n.enumerable,
      value: e[r]
    };
  },
  defineProperty() {
    j(11);
  },
  getPrototypeOf(t) {
    return be(t.base_);
  },
  setPrototypeOf() {
    j(12);
  }
}, er = {};
Ze(Fn, (t, r) => {
  er[t] = function() {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
});
er.deleteProperty = function(t, r) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(r)) && j(13), er.set.call(this, t, r, void 0);
};
er.set = function(t, r, e) {
  return process.env.NODE_ENV !== "production" && r !== "length" && isNaN(parseInt(r)) && j(14), Fn.set.call(this, t[0], r, e, t[0]);
};
function yn(t, r) {
  const e = t[lt];
  return (e ? ye(e) : t)[r];
}
function za(t, r, e) {
  var i;
  const n = $s(r, e);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = n.get) == null ? void 0 : i.call(t.draft_)
  ) : void 0;
}
function $s(t, r) {
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
var $a = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (r, e, n) => {
      if (typeof r == "function" && typeof e != "function") {
        const o = e;
        e = r;
        const c = this;
        return function(d = o, ...h) {
          return c.produce(d, (m) => e.call(this, m, ...h));
        };
      }
      typeof e != "function" && j(6), n !== void 0 && typeof n != "function" && j(7);
      let i;
      if (Jt(r)) {
        const o = Jn(this), c = On(r, void 0);
        let u = !0;
        try {
          i = e(c), u = !1;
        } finally {
          u ? An(o) : Mn(o);
        }
        return qn(o, n), Zn(i, o);
      } else if (!r || typeof r != "object") {
        if (i = e(r), i === void 0 && (i = r), i === zn && (i = void 0), this.autoFreeze_ && $n(i, !0), n) {
          const o = [], c = [];
          _e("Patches").generateReplacementPatches_(r, i, o, c), n(o, c);
        }
        return i;
      } else
        j(1, r);
    }, this.produceWithPatches = (r, e) => {
      if (typeof r == "function")
        return (c, ...u) => this.produceWithPatches(c, (d) => r(d, ...u));
      let n, i;
      return [this.produce(r, e, (c, u) => {
        n = c, i = u;
      }), n, i];
    }, typeof (t == null ? void 0 : t.autoFreeze) == "boolean" && this.setAutoFreeze(t.autoFreeze), typeof (t == null ? void 0 : t.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(t.useStrictShallowCopy);
  }
  createDraft(t) {
    Jt(t) || j(8), ke(t) && (t = Fa(t));
    const r = Jn(this), e = On(t, void 0);
    return e[lt].isManual_ = !0, Mn(r), e;
  }
  finishDraft(t, r) {
    const e = t && t[lt];
    (!e || !e.isManual_) && j(9);
    const { scope_: n } = e;
    return qn(n, r), Zn(void 0, n);
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
      const i = r[e];
      if (i.path.length === 0 && i.op === "replace") {
        t = i.value;
        break;
      }
    }
    e > -1 && (r = r.slice(e + 1));
    const n = _e("Patches").applyPatches_;
    return ke(t) ? n(t, r) : this.produce(
      t,
      (i) => n(i, r)
    );
  }
};
function On(t, r) {
  const e = sr(t) ? _e("MapSet").proxyMap_(t, r) : ir(t) ? _e("MapSet").proxySet_(t, r) : Da(t, r);
  return (r ? r.scope_ : zs()).drafts_.push(e), e;
}
function Fa(t) {
  return ke(t) || j(10, t), Fs(t);
}
function Fs(t) {
  if (!Jt(t) || Mr(t))
    return t;
  const r = t[lt];
  let e;
  if (r) {
    if (!r.modified_)
      return r.base_;
    r.finalized_ = !0, e = Tn(t, r.scope_.immer_.useStrictShallowCopy_);
  } else
    e = Tn(t, !0);
  return Ze(e, (n, i) => {
    Ds(e, n, Fs(i));
  }), r && (r.finalized_ = !1), e;
}
function ts() {
  process.env.NODE_ENV !== "production" && Ps.push(
    'Sets cannot have "replace" patches.',
    function(p) {
      return "Unsupported patch operation: " + p;
    },
    function(p) {
      return "Cannot apply patch, path doesn't resolve: " + p;
    },
    "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  );
  const r = "replace", e = "add", n = "remove";
  function i(p, v, b, I) {
    switch (p.type_) {
      case 0:
      case 2:
        return c(
          p,
          v,
          b,
          I
        );
      case 1:
        return o(p, v, b, I);
      case 3:
        return u(
          p,
          v,
          b,
          I
        );
    }
  }
  function o(p, v, b, I) {
    let { base_: S, assigned_: f } = p, k = p.copy_;
    k.length < S.length && ([S, k] = [k, S], [b, I] = [I, b]);
    for (let T = 0; T < S.length; T++)
      if (f[T] && k[T] !== S[T]) {
        const w = v.concat([T]);
        b.push({
          op: r,
          path: w,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: y(k[T])
        }), I.push({
          op: r,
          path: w,
          value: y(S[T])
        });
      }
    for (let T = S.length; T < k.length; T++) {
      const w = v.concat([T]);
      b.push({
        op: e,
        path: w,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: y(k[T])
      });
    }
    for (let T = k.length - 1; S.length <= T; --T) {
      const w = v.concat([T]);
      I.push({
        op: n,
        path: w
      });
    }
  }
  function c(p, v, b, I) {
    const { base_: S, copy_: f } = p;
    Ze(p.assigned_, (k, T) => {
      const w = gn(S, k), A = gn(f, k), _ = T ? Qe(S, k) ? r : e : n;
      if (w === A && _ === r)
        return;
      const E = v.concat(k);
      b.push(_ === n ? { op: _, path: E } : { op: _, path: E, value: A }), I.push(
        _ === e ? { op: n, path: E } : _ === n ? { op: e, path: E, value: y(w) } : { op: r, path: E, value: y(w) }
      );
    });
  }
  function u(p, v, b, I) {
    let { base_: S, copy_: f } = p, k = 0;
    S.forEach((T) => {
      if (!f.has(T)) {
        const w = v.concat([k]);
        b.push({
          op: n,
          path: w,
          value: T
        }), I.unshift({
          op: e,
          path: w,
          value: T
        });
      }
      k++;
    }), k = 0, f.forEach((T) => {
      if (!S.has(T)) {
        const w = v.concat([k]);
        b.push({
          op: e,
          path: w,
          value: T
        }), I.unshift({
          op: n,
          path: w,
          value: T
        });
      }
      k++;
    });
  }
  function d(p, v, b, I) {
    b.push({
      op: r,
      path: [],
      value: v === zn ? void 0 : v
    }), I.push({
      op: r,
      path: [],
      value: p
    });
  }
  function h(p, v) {
    return v.forEach((b) => {
      const { path: I, op: S } = b;
      let f = p;
      for (let A = 0; A < I.length - 1; A++) {
        const _ = ve(f);
        let E = I[A];
        typeof E != "string" && typeof E != "number" && (E = "" + E), (_ === 0 || _ === 1) && (E === "__proto__" || E === "constructor") && j(19), typeof f == "function" && E === "prototype" && j(19), f = gn(f, E), typeof f != "object" && j(18, I.join("/"));
      }
      const k = ve(f), T = m(b.value), w = I[I.length - 1];
      switch (S) {
        case r:
          switch (k) {
            case 2:
              return f.set(w, T);
            case 3:
              j(16);
            default:
              return f[w] = T;
          }
        case e:
          switch (k) {
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
          switch (k) {
            case 1:
              return f.splice(w, 1);
            case 2:
              return f.delete(w);
            case 3:
              return f.delete(b.value);
            default:
              return delete f[w];
          }
        default:
          j(17, S);
      }
    }), p;
  }
  function m(p) {
    if (!Jt(p))
      return p;
    if (Array.isArray(p))
      return p.map(m);
    if (sr(p))
      return new Map(
        Array.from(p.entries()).map(([b, I]) => [b, m(I)])
      );
    if (ir(p))
      return new Set(Array.from(p).map(m));
    const v = Object.create(be(p));
    for (const b in p)
      v[b] = m(p[b]);
    return Qe(p, Je) && (v[Je] = p[Je]), v;
  }
  function y(p) {
    return ke(p) ? m(p) : p;
  }
  Ca("Patches", {
    applyPatches_: h,
    generatePatches_: i,
    generateReplacementPatches_: d
  });
}
var dt = new $a(), Na = dt.produce;
dt.produceWithPatches.bind(
  dt
);
dt.setAutoFreeze.bind(dt);
dt.setUseStrictShallowCopy.bind(dt);
var La = dt.applyPatches.bind(dt);
dt.createDraft.bind(dt);
dt.finishDraft.bind(dt);
var Ha = 9007199254740991, Ua = "[object Arguments]", Wa = "[object Function]", Ba = "[object GeneratorFunction]", ja = "[object Symbol]", Ya = typeof ft == "object" && ft && ft.Object === Object && ft, Ga = typeof self == "object" && self && self.Object === Object && self, Xa = Ya || Ga || Function("return this")();
function Ka(t, r, e) {
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
function Va(t, r) {
  for (var e = -1, n = t ? t.length : 0, i = Array(n); ++e < n; )
    i[e] = r(t[e], e, t);
  return i;
}
function qa(t, r) {
  for (var e = -1, n = r.length, i = t.length; ++e < n; )
    t[i + e] = r[e];
  return t;
}
var Nn = Object.prototype, Ja = Nn.hasOwnProperty, Ln = Nn.toString, es = Xa.Symbol, Za = Nn.propertyIsEnumerable, rs = es ? es.isConcatSpreadable : void 0, ns = Math.max;
function Qa(t, r, e, n, i) {
  var o = -1, c = t.length;
  for (e || (e = no), i || (i = []); ++o < c; ) {
    var u = t[o];
    e(u) ? qa(i, u) : i[i.length] = u;
  }
  return i;
}
function to(t, r) {
  return t = Object(t), eo(t, r, function(e, n) {
    return n in t;
  });
}
function eo(t, r, e) {
  for (var n = -1, i = r.length, o = {}; ++n < i; ) {
    var c = r[n], u = t[c];
    e(u, c) && (o[c] = u);
  }
  return o;
}
function ro(t, r) {
  return r = ns(r === void 0 ? t.length - 1 : r, 0), function() {
    for (var e = arguments, n = -1, i = ns(e.length - r, 0), o = Array(i); ++n < i; )
      o[n] = e[r + n];
    n = -1;
    for (var c = Array(r + 1); ++n < r; )
      c[n] = e[n];
    return c[r] = o, Ka(t, this, c);
  };
}
function no(t) {
  return ao(t) || io(t) || !!(rs && t && t[rs]);
}
function so(t) {
  if (typeof t == "string" || po(t))
    return t;
  var r = t + "";
  return r == "0" && 1 / t == -1 / 0 ? "-0" : r;
}
function io(t) {
  return co(t) && Ja.call(t, "callee") && (!Za.call(t, "callee") || Ln.call(t) == Ua);
}
var ao = Array.isArray;
function oo(t) {
  return t != null && lo(t.length) && !uo(t);
}
function co(t) {
  return Ns(t) && oo(t);
}
function uo(t) {
  var r = fo(t) ? Ln.call(t) : "";
  return r == Wa || r == Ba;
}
function lo(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Ha;
}
function fo(t) {
  var r = typeof t;
  return !!t && (r == "object" || r == "function");
}
function Ns(t) {
  return !!t && typeof t == "object";
}
function po(t) {
  return typeof t == "symbol" || Ns(t) && Ln.call(t) == ja;
}
var ho = ro(function(t, r) {
  return t == null ? {} : to(t, Va(Qa(r), so));
}), mo = ho;
const ss = /* @__PURE__ */ Cn(mo), go = {
  width: 1080,
  height: 1920
}, yo = 30, Io = {
  size: go,
  fps: yo,
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
}, is = [
  "tracks",
  "trackItemsMap",
  "transitionIds",
  "transitionsMap",
  "trackItemIds",
  "structure"
];
class Xo {
  // Clean constructor with clear configuration interface
  constructor(r, e) {
    Kt(this, "stateSubject");
    Kt(this, "stateHistorySubject");
    Kt(this, "prevState");
    Kt(this, "background");
    Kt(this, "undos", []);
    Kt(this, "redos", []);
    Kt(this, "listener");
    const n = Object.assign(
      {},
      Io,
      r,
      e != null && e.scale ? { scale: e.scale } : {}
    );
    this.stateSubject = new Gn(n), this.stateHistorySubject = new Gn({
      handleRedo: !1,
      handleUndo: !1
    }), this.background = n.background, this.prevState = n, (e != null && e.cors || e != null && e.acceptsMap) && Yi({
      cors: e.cors,
      acceptsMap: e.acceptsMap
    }), this.initListeners();
  }
  initListeners() {
    Ea(this);
  }
  destroyListeners() {
    this.listener && this.listener.unsubscribe();
  }
  purge() {
    this.destroyListeners();
  }
  updateHistory(r, e) {
    const n = ss(r, is), i = ss(this.getState(), is), o = Cs(i, n);
    o.length && (this.undos.push({ undos: o, type: e }), this.redos = []);
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
    const n = this.getState(), i = {
      ...C(n),
      ...C(r)
    };
    B(n, i) || (e.updateHistory && this.updateHistory(i, e.kind), this.prevState = n, this.stateSubject.next(i));
  }
  // emit changes for design size
  subscribeToUpdateStateDetails(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      (!B(e.size, this.prevState.size) || !B(e.background, this.prevState.background)) && r({
        size: e.size,
        background: e.background
      });
    });
  }
  // Selectively subscribe to scale changes
  subscribeToScale(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      B(e.scale, this.prevState.scale) || r({ scale: e.scale });
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
      B(e.trackItemsMap, this.prevState.trackItemsMap) || r({ trackItemsMap: e.trackItemsMap });
    });
  }
  subscribeToUpdateAnimations(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      const n = Object.keys(e.trackItemsMap).filter(
        (i) => {
          const o = this.prevState.trackItemsMap[i], c = e.trackItemsMap[i];
          return o && c && !B(o.animations, c.animations);
        }
      );
      r({ trackItemsMap: e.trackItemsMap, changedAnimationIds: n });
    });
  }
  subscribeToUpdateTrackItemTiming(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      if (!B(e.trackItemsMap, this.prevState.trackItemsMap)) {
        const n = Object.keys(e.trackItemsMap).filter((o) => {
          const c = this.prevState.trackItemsMap[o], u = e.trackItemsMap[o];
          return c && u && !B(c.trim, u.trim);
        }), i = Object.keys(e.trackItemsMap).filter(
          (o) => {
            const c = this.prevState.trackItemsMap[o], u = e.trackItemsMap[o];
            return c && u && !B(c.display, u.display);
          }
        );
        r({
          trackItemsMap: e.trackItemsMap,
          changedTrimIds: n.length > 0 ? n : void 0,
          changedDisplayIds: i.length > 0 ? i : void 0
        });
      }
    });
  }
  subscribeToUpdateItemDetails(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      Object.keys(e.trackItemsMap).some((i) => {
        const o = this.prevState.trackItemsMap[i], c = e.trackItemsMap[i];
        return o && c && !B(o.details, c.details);
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
      const n = [...e.trackItemIds].sort(), i = [...this.prevState.trackItemIds].sort(), o = [...e.transitionIds].sort(), c = [...this.prevState.transitionIds].sort();
      (!B(n, i) || !B(o, c)) && r({ trackItemIds: e.trackItemIds });
    });
  }
  // Selectively subscribe to activeIds changes
  subscribeToActiveIds(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      B(e.activeIds, this.prevState.activeIds) || r({ activeIds: e.activeIds });
    });
  }
  subscribeToTracks(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      const n = e.tracks, o = this.prevState.tracks.map((u) => u.id), c = n.filter(
        (u) => !o.includes(u.id)
      );
      c.length && r({
        tracks: e.tracks,
        changedTracks: c.map((u) => u.id)
      });
    });
  }
  // Selectively subscribe to multiple track-related properties
  subscribeToState(r) {
    return this.stateSubject.asObservable().subscribe((e) => {
      (!B(e.tracks, this.prevState.tracks) || !B(e.trackItemIds, this.prevState.trackItemIds) || !B(e.trackItemsMap, this.prevState.trackItemsMap) || !B(e.transitionIds, this.prevState.transitionIds) || !B(e.transitionsMap, this.prevState.transitionsMap) || !B(e.structure, this.prevState.structure)) && r({
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
    ts();
    const {
      trackItemIds: i,
      tracks: o,
      transitionIds: c,
      transitionsMap: u,
      trackItemsMap: d,
      structure: h
    } = this.getState(), m = C({
      trackItemIds: i,
      tracks: o,
      transitionIds: c,
      transitionsMap: u,
      trackItemsMap: d,
      structure: h
    }), y = [], p = [], v = [], b = [], I = [], S = [];
    e.forEach((x) => {
      let F;
      const tt = x.path.slice(1);
      x.type === "CREATE" ? F = {
        path: tt,
        op: "remove",
        value: x.value
      } : x.type === "CHANGE" ? F = {
        path: tt,
        op: "replace",
        value: x.oldValue
      } : F = {
        path: tt,
        op: "add",
        value: x.oldValue
      }, x.path.includes("trackItemIds") ? v.push(F) : x.path.includes("transitionIds") ? p.push(F) : x.path.includes("trackItemsMap") ? I.push(F) : x.path.includes("transitionsMap") ? b.push(F) : x.path.includes("tracks") ? y.push(F) : x.path.includes("structure") && S.push(F);
    });
    const f = this.applyPatch(
      m.tracks,
      y
    ), k = this.applyPatch(
      m.transitionIds,
      p
    ), T = this.applyPatch(
      m.trackItemIds,
      v
    ), w = this.applyPatch(
      m.transitionsMap,
      b
    ), A = this.applyPatch(
      m.trackItemsMap,
      I
    ), _ = this.applyPatch(
      m.structure,
      S
    ), E = C({
      tracks: f,
      transitionIds: k,
      trackItemIds: T,
      transitionsMap: w,
      trackItemsMap: A,
      structure: _
    }), L = C(this.getState()), P = { ...L, ...E };
    this.prevState = L, this.redos.push({ redos: e, type: n });
    const Y = G(P.trackItemsMap);
    this.stateSubject.next({ ...P, duration: Y }), this.stateHistorySubject.next({ handleRedo: !1, handleUndo: !0 }), this.updateState(P, { updateHistory: !1 });
  }
  applyPatch(r, e) {
    return e.reverse().reduce((n, i) => Na(n, (o) => {
      La(o, [i]);
    }), r);
  }
  redo() {
    const r = this.redos.pop(), e = r == null ? void 0 : r.redos, n = r == null ? void 0 : r.type;
    if (!e || !n) return;
    ts();
    const {
      trackItemIds: i,
      tracks: o,
      transitionIds: c,
      transitionsMap: u,
      trackItemsMap: d,
      structure: h
    } = this.getState(), m = C({
      trackItemIds: i,
      tracks: o,
      transitionIds: c,
      transitionsMap: u,
      trackItemsMap: d,
      structure: h
    }), y = [], p = [], v = [], b = [], I = [], S = [];
    e.forEach((x) => {
      let F;
      const tt = x.path.slice(1);
      x.type === "CREATE" ? F = {
        path: tt,
        op: "add",
        value: x.value
      } : x.type === "CHANGE" ? F = {
        path: tt,
        op: "replace",
        value: x.value
      } : F = {
        path: tt,
        op: "remove",
        value: x.oldValue
      }, x.path.includes("trackItemIds") ? v.push(F) : x.path.includes("transitionIds") ? p.push(F) : x.path.includes("trackItemsMap") ? I.push(F) : x.path.includes("transitionsMap") ? b.push(F) : x.path.includes("structure") ? S.push(F) : y.push(F);
    });
    const f = this.applyPatch(
      m.tracks,
      y
    ), k = this.applyPatch(
      m.transitionIds,
      p
    ), T = this.applyPatch(
      m.trackItemIds,
      v
    ), w = this.applyPatch(
      m.transitionsMap,
      b
    ), A = this.applyPatch(
      m.trackItemsMap,
      I
    ), _ = this.applyPatch(
      m.structure,
      S
    ), E = C({
      tracks: f,
      transitionIds: k,
      trackItemIds: T,
      transitionsMap: w,
      trackItemsMap: A,
      structure: _
    }), L = C(this.getState()), P = { ...L, ...E };
    this.prevState = L, this.undos.push({ undos: e, type: n });
    const Y = G(P.trackItemsMap);
    this.stateSubject.next({ ...P, duration: Y }), this.stateHistorySubject.next({ handleRedo: !0, handleUndo: !1 }), this.updateState(P, { updateHistory: !1 });
  }
  toJSON() {
    const {
      fps: r,
      tracks: e,
      size: n,
      trackItemIds: i,
      transitionsMap: o,
      trackItemsMap: c,
      transitionIds: u
    } = this.getState();
    return {
      fps: r,
      tracks: e,
      size: n,
      trackItemIds: i,
      transitionsMap: o,
      trackItemsMap: c,
      transitionIds: u
    };
  }
}
export {
  zo as ACTIVE_CLONE,
  Do as ACTIVE_DELETE,
  xi as ACTIVE_PASTE,
  Le as ACTIVE_PREFIX,
  Ro as ACTIVE_SET,
  Oi as ACTIVE_SPLIT,
  pi as ADD_ANIMATION,
  ui as ADD_AUDIO,
  hi as ADD_CAPTIONS,
  yi as ADD_COMPOSITION,
  wi as ADD_HILL_AUDIO_BARS,
  di as ADD_ILLUSTRATION,
  li as ADD_IMAGE,
  gi as ADD_ITEMS,
  vi as ADD_LINEAL_AUDIO_BARS,
  Eo as ADD_MASK,
  To as ADD_PLACEHOLDER,
  H as ADD_PREFIX,
  Ii as ADD_PROGRESS_BAR,
  bi as ADD_PROGRESS_FRAME,
  _i as ADD_PROGRESS_SQUARE,
  ki as ADD_RADIAL_AUDIO_BARS,
  Ti as ADD_RECT,
  fi as ADD_SHAPE,
  vo as ADD_SUFFIX,
  mi as ADD_TEMPLATE,
  oi as ADD_TEXT,
  Ao as ADD_TRANSITION,
  ci as ADD_VIDEO,
  Si as ADD_WAVE_AUDIO_BARS,
  si as BULK_PREFIX,
  Co as DELETE_TEMPLATE_ITEM,
  ii as DESIGN_LOAD,
  Pn as DESIGN_PREFIX,
  ai as DESIGN_RESIZE,
  Mi as EDIT_BACKGROUND_EDITOR,
  Xn as EDIT_BULK,
  Ei as EDIT_OBJECT,
  Zt as EDIT_PREFIX,
  xo as EDIT_SHAPE,
  Oo as EDIT_TEMPLATE_ITEM,
  Mo as EDIT_TEXT,
  Po as ENTER_EDIT_MODE,
  Ar as HISTORY_PREFIX,
  Fi as HISTORY_REDO,
  Go as HISTORY_RESET,
  $i as HISTORY_UNDO,
  Ri as LAYER_CLONE,
  Pi as LAYER_COPY,
  Yo as LAYER_CUT,
  Di as LAYER_DELETE,
  Wo as LAYER_EDITING_NAME,
  Fo as LAYER_HIDDEN,
  $o as LAYER_LOCKED,
  No as LAYER_MOVE,
  Bo as LAYER_PASTE,
  Q as LAYER_PREFIX,
  Uo as LAYER_RENAME,
  zi as LAYER_REPLACE,
  Ci as LAYER_SELECT,
  Lo as LAYER_SELECTION,
  Ho as LAYER_SEND_TO,
  jo as LAYER_SPLIT,
  Ai as REPLACE_MEDIA,
  wo as STATE_CHANGED,
  ni as STATE_PREFIX,
  Ni as TIMELINE_SCALE_CHANGED,
  ds as TIMELINE_SCALE_PREFIX,
  _o as TRACKS_CHANGED,
  So as TRACK_ITEMS_CHANGED,
  ri as TRACK_ITEMS_PREFIX,
  ei as TRACK_PREFIX,
  Xo as default,
  Gi as getAcceptsMap
};
