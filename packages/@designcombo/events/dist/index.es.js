var E = function(e, t) {
  return E = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, E(e, t);
};
function b(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  E(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function g(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function O(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), o, i = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; ) i.push(o.value);
  } catch (u) {
    s = { error: u };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (s) throw s.error;
    }
  }
  return i;
}
function x(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, i; n < o; n++)
    (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function l(e) {
  return typeof e == "function";
}
function D(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var m = D(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function P(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var S = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var u = g(s), c = u.next(); !c.done; c = u.next()) {
              var f = c.value;
              f.remove(this);
            }
          } catch (a) {
            t = { error: a };
          } finally {
            try {
              c && !c.done && (r = u.return) && r.call(u);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          s.remove(this);
      var p = this.initialTeardown;
      if (l(p))
        try {
          p();
        } catch (a) {
          i = a instanceof m ? a.errors : [a];
        }
      var T = this._finalizers;
      if (T) {
        this._finalizers = null;
        try {
          for (var d = g(T), h = d.next(); !h.done; h = d.next()) {
            var z = h.value;
            try {
              U(z);
            } catch (a) {
              i = i ?? [], a instanceof m ? i = x(x([], O(i)), O(a.errors)) : i.push(a);
            }
          }
        } catch (a) {
          n = { error: a };
        } finally {
          try {
            h && !h.done && (o = d.return) && o.call(d);
          } finally {
            if (n) throw n.error;
          }
        }
      }
      if (i)
        throw new m(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        U(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var r = this._parentage;
    return r === t || Array.isArray(r) && r.includes(t);
  }, e.prototype._addParent = function(t) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }, e.prototype._removeParent = function(t) {
    var r = this._parentage;
    r === t ? this._parentage = null : Array.isArray(r) && P(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && P(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), M = S.EMPTY;
function R(e) {
  return e instanceof S || e && "closed" in e && l(e.remove) && l(e.add) && l(e.unsubscribe);
}
function U(e) {
  l(e) ? e() : e.unsubscribe();
}
var Y = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, B = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, x([e, t], O(r)));
  },
  clearTimeout: function(e) {
    var t = B.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function L(e) {
  B.setTimeout(function() {
    throw e;
  });
}
function I() {
}
function y(e) {
  e();
}
var A = function(e) {
  b(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, R(r) && r.add(n)) : n.destination = J, n;
  }
  return t.create = function(r, n, o) {
    return new j(r, n, o);
  }, t.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, t.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(r) {
    this.destination.next(r);
  }, t.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(S), V = Function.prototype.bind;
function _(e, t) {
  return V.call(e, t);
}
var q = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        v(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        v(n);
      }
    else
      v(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        v(r);
      }
  }, e;
}(), j = function(e) {
  b(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, s;
    if (l(r) || !r)
      s = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var u;
      i && Y.useDeprecatedNextContext ? (u = Object.create(r), u.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: r.next && _(r.next, u),
        error: r.error && _(r.error, u),
        complete: r.complete && _(r.complete, u)
      }) : s = r;
    }
    return i.destination = new q(s), i;
  }
  return t;
}(A);
function v(e) {
  L(e);
}
function G(e) {
  throw e;
}
var J = {
  closed: !0,
  next: I,
  error: G,
  complete: I
}, K = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Q(e) {
  return e;
}
function W(e) {
  return e.length === 0 ? Q : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}
var C = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = Z(t) ? t : new j(t, r, n);
    return y(function() {
      var s = o, u = s.operator, c = s.source;
      i.add(u ? u.call(i, c) : c ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = F(r), new r(function(o, i) {
      var s = new j({
        next: function(u) {
          try {
            t(u);
          } catch (c) {
            i(c), s.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[K] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return W(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = F(t), new t(function(n, o) {
      var i;
      r.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return o(s);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function F(e) {
  var t;
  return (t = e ?? Y.Promise) !== null && t !== void 0 ? t : Promise;
}
function X(e) {
  return e && l(e.next) && l(e.error) && l(e.complete);
}
function Z(e) {
  return e && e instanceof A || X(e) && R(e);
}
function $(e) {
  return l(e == null ? void 0 : e.lift);
}
function N(e) {
  return function(t) {
    if ($(t))
      return t.lift(function(r) {
        try {
          return e(r, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function rr(e, t, r, n, o) {
  return new tr(e, t, r, n, o);
}
var tr = function(e) {
  b(t, e);
  function t(r, n, o, i, s, u) {
    var c = e.call(this, r) || this;
    return c.onFinalize = s, c.shouldUnsubscribe = u, c._next = n ? function(f) {
      try {
        n(f);
      } catch (p) {
        r.error(p);
      }
    } : e.prototype._next, c._error = i ? function(f) {
      try {
        i(f);
      } catch (p) {
        r.error(p);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, c._complete = o ? function() {
      try {
        o();
      } catch (f) {
        r.error(f);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, c;
  }
  return t.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var n = this.closed;
      e.prototype.unsubscribe.call(this), !n && ((r = this.onFinalize) === null || r === void 0 || r.call(this));
    }
  }, t;
}(A), er = D(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), H = function(e) {
  b(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new k(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new er();
  }, t.prototype.next = function(r) {
    var n = this;
    y(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = g(n.currentObservers), u = s.next(); !u.done; u = s.next()) {
            var c = u.value;
            c.next(r);
          }
        } catch (f) {
          o = { error: f };
        } finally {
          try {
            u && !u.done && (i = s.return) && i.call(s);
          } finally {
            if (o) throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    y(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    y(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, r);
  }, t.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, t.prototype._innerSubscribe = function(r) {
    var n = this, o = this, i = o.hasError, s = o.isStopped, u = o.observers;
    return i || s ? M : (this.currentObservers = null, u.push(r), new S(function() {
      n.currentObservers = null, P(u, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? r.error(i) : s && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new C();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new k(r, n);
  }, t;
}(C), k = function(e) {
  b(t, e);
  function t(r, n) {
    var o = e.call(this) || this;
    return o.destination = r, o.source = n, o;
  }
  return t.prototype.next = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, r);
  }, t.prototype.error = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, r);
  }, t.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, t.prototype._subscribe = function(r) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : M;
  }, t;
}(H);
function or(e, t) {
  return N(function(r, n) {
    var o = 0;
    r.subscribe(rr(n, function(i) {
      return e.call(t, i, o++) && n.next(i);
    }));
  });
}
let w = null;
function nr() {
  if (!w) {
    const e = new H();
    w = { subject: e, dispatch: (r, n) => e.next({ key: r, value: n }) };
  }
  return w;
}
const { subject: ir, dispatch: sr } = nr();
export {
  sr as dispatch,
  or as filter,
  ir as subject
};
