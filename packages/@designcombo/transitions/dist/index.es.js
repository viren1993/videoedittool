import { interpolate as ae, spring as be, measureSpring as je, AbsoluteFill as p, Internals as pe, Sequence as H, useVideoConfig as $e, useCurrentFrame as Se, Freeze as ie, random as D } from "remotion";
import q, { useMemo as w, Children as Ee, useState as Z } from "react";
import { getBoundingBox as ye, translatePath as ge } from "@remotion/paths";
import { makeStar as Re, makePie as Ie } from "@remotion/shapes";
const A = (e) => ({
  getDurationInFrames: () => e.durationInFrames,
  getProgress: ({ frame: t }) => ae(t, [0, e.durationInFrames], [0, 1], {
    easing: e.easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })
}), ct = (e = {}) => ({
  getDurationInFrames: ({ fps: t }) => e.durationInFrames ? e.durationInFrames : je({
    config: e.config,
    threshold: e.durationRestThreshold,
    fps: t
  }),
  getProgress: ({ fps: t, frame: r }) => {
    const o = e.reverse ? 0 : 1, a = e.reverse ? 1 : 0;
    return be({
      fps: t,
      frame: r,
      to: o,
      from: a,
      config: e.config,
      durationInFrames: e.durationInFrames,
      durationRestThreshold: e.durationRestThreshold,
      reverse: e.reverse
    });
  }
});
var se = { exports: {} }, J = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ue;
function Pe() {
  if (ue) return J;
  ue = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(o, a, l) {
    var f = null;
    if (l !== void 0 && (f = "" + l), a.key !== void 0 && (f = "" + a.key), "key" in a) {
      l = {};
      for (var u in a)
        u !== "key" && (l[u] = a[u]);
    } else l = a;
    return a = l.ref, {
      $$typeof: e,
      type: o,
      key: f,
      ref: a !== void 0 ? a : null,
      props: l
    };
  }
  return J.Fragment = t, J.jsx = r, J.jsxs = r, J;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe;
function Fe() {
  return fe || (fe = 1, process.env.NODE_ENV !== "production" && function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === C ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case R:
          return "Fragment";
        case S:
          return "Profiler";
        case N:
          return "StrictMode";
        case O:
          return "Suspense";
        case te:
          return "SuspenseList";
        case X:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case K:
            return "Portal";
          case le:
            return (n.displayName || "Context") + ".Provider";
          case I:
            return (n._context.displayName || "Context") + ".Consumer";
          case F:
            var c = n.render;
            return n = n.displayName, n || (n = c.displayName || c.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case U:
            return c = n.displayName || null, c !== null ? c : e(n.type) || "Memo";
          case d:
            c = n._payload, n = n._init;
            try {
              return e(n(c));
            } catch {
            }
        }
      return null;
    }
    function t(n) {
      return "" + n;
    }
    function r(n) {
      try {
        t(n);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var m = c.error, v = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return m.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          v
        ), t(n);
      }
    }
    function o(n) {
      if (n === R) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === d)
        return "<...>";
      try {
        var c = e(n);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var n = z.A;
      return n === null ? null : n.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function f(n) {
      if (P.call(n, "key")) {
        var c = Object.getOwnPropertyDescriptor(n, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function u(n, c) {
      function m() {
        y || (y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      m.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: m,
        configurable: !0
      });
    }
    function s() {
      var n = e(this.type);
      return k[n] || (k[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function g(n, c, m, v, L, M, re, ne) {
      return m = M.ref, n = {
        $$typeof: T,
        type: n,
        key: c,
        props: M,
        _owner: L
      }, (m !== void 0 ? m : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: s
      }) : Object.defineProperty(n, "ref", { enumerable: !1, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(n, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: re
      }), Object.defineProperty(n, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function x(n, c, m, v, L, M, re, ne) {
      var b = c.children;
      if (b !== void 0)
        if (v)
          if (_(b)) {
            for (v = 0; v < b.length; v++)
              j(b[v]);
            Object.freeze && Object.freeze(b);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else j(b);
      if (P.call(c, "key")) {
        b = e(n);
        var W = Object.keys(c).filter(function(ve) {
          return ve !== "key";
        });
        v = 0 < W.length ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}", V[b + v] || (W = 0 < W.length ? "{" + W.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          v,
          b,
          W,
          b
        ), V[b + v] = !0);
      }
      if (b = null, m !== void 0 && (r(m), b = "" + m), f(c) && (r(c.key), b = "" + c.key), "key" in c) {
        m = {};
        for (var oe in c)
          oe !== "key" && (m[oe] = c[oe]);
      } else m = c;
      return b && u(
        m,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), g(
        n,
        b,
        M,
        L,
        a(),
        m,
        re,
        ne
      );
    }
    function j(n) {
      typeof n == "object" && n !== null && n.$$typeof === T && n._store && (n._store.validated = 1);
    }
    var h = q, T = Symbol.for("react.transitional.element"), K = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), I = Symbol.for("react.consumer"), le = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), C = Symbol.for("react.client.reference"), z = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = Object.prototype.hasOwnProperty, _ = Array.isArray, E = console.createTask ? console.createTask : function() {
      return null;
    };
    h = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var y, k = {}, Y = h.react_stack_bottom_frame.bind(
      h,
      l
    )(), B = E(o(l)), V = {};
    G.Fragment = R, G.jsx = function(n, c, m, v, L) {
      var M = 1e4 > z.recentlyCreatedOwnerStacks++;
      return x(
        n,
        c,
        m,
        !1,
        v,
        L,
        M ? Error("react-stack-top-frame") : Y,
        M ? E(o(n)) : B
      );
    }, G.jsxs = function(n, c, m, v, L) {
      var M = 1e4 > z.recentlyCreatedOwnerStacks++;
      return x(
        n,
        c,
        m,
        !0,
        v,
        L,
        M ? Error("react-stack-top-frame") : Y,
        M ? E(o(n)) : B
      );
    };
  }()), G;
}
process.env.NODE_ENV === "production" ? se.exports = Pe() : se.exports = Fe();
var i = se.exports;
typeof window < "u" && (window.remotion_renderReady = !1);
typeof window < "u" && (window.remotion_delayRenderTimeouts = {});
function _e(e, t) {
  const { allowFloats: r, component: o } = t;
  if (typeof e > "u")
    throw new Error(`The "durationInFrames" prop ${o} is missing.`);
  if (typeof e != "number")
    throw new Error(`The "durationInFrames" prop ${o} must be a number, but you passed a value of type ${typeof e}`);
  if (e <= 0)
    throw new TypeError(`The "durationInFrames" prop ${o} must be positive, but got ${e}.`);
  if (!r && e % 1 !== 0)
    throw new TypeError(`The "durationInFrames" prop ${o} must be an integer, but got ${e}.`);
  if (!Number.isFinite(e))
    throw new TypeError(`The "durationInFrames" prop ${o} must be finite, but got ${e}.`);
}
var ke = {
  validateDurationInFrames: _e
};
const xe = q.createContext(null), Te = q.createContext(null), me = ({ presentationProgress: e, children: t }) => {
  const r = w(() => ({
    enteringProgress: e
  }), [e]);
  return /* @__PURE__ */ i.jsx(xe.Provider, { value: r, children: t });
}, he = ({ presentationProgress: e, children: t }) => {
  const r = w(() => ({
    exitingProgress: e
  }), [e]);
  return /* @__PURE__ */ i.jsx(Te.Provider, { value: r, children: t });
}, we = (e) => q.Children.toArray(e).reduce((r, o) => o.type === q.Fragment ? r.concat(
  we(
    o.props.children
  )
) : (r.push(o), r), []), Le = 0.01, Me = ({
  children: e,
  presentationProgress: t,
  presentationDirection: r,
  passedProps: { direction: o = "from-left", enterStyle: a, exitStyle: l }
}) => {
  const f = w(() => {
    const s = t === 1 ? t * 100 : t * 100 - Le;
    if (r === "exiting")
      switch (o) {
        case "from-left":
          return {
            transform: `translateX(${s}%)`
          };
        case "from-right":
          return {
            transform: `translateX(${-t * 100}%)`
          };
        case "from-top":
          return {
            transform: `translateY(${s}%)`
          };
        case "from-bottom":
          return {
            transform: `translateY(${-t * 100}%)`
          };
        default:
          throw new Error(`Invalid direction: ${o}`);
      }
    switch (o) {
      case "from-left":
        return {
          transform: `translateX(${-100 + t * 100}%)`
        };
      case "from-right":
        return {
          transform: `translateX(${100 - s}%)`
        };
      case "from-top":
        return {
          transform: `translateY(${-100 + t * 100}%)`
        };
      case "from-bottom":
        return {
          transform: `translateY(${100 - s}%)`
        };
      default:
        throw new Error(`Invalid direction: ${o}`);
    }
  }, [r, t, o]), u = w(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...f,
    ...r === "entering" ? a : l
  }), [f, a, l, r]);
  return /* @__PURE__ */ i.jsx(p, { style: u, children: e });
}, ee = (e) => ({
  component: Me,
  props: {}
}), Ae = ke.validateDurationInFrames, Q = function(e) {
  return null;
}, ce = ({ children: e }) => /* @__PURE__ */ i.jsx(i.Fragment, { children: e }), Oe = ({
  children: e
}) => {
  const { fps: t } = $e(), r = Se(), o = w(() => {
    let a = 0, l = 0;
    const f = we(e);
    return Ee.map(f, (u, s) => {
      const g = u;
      if (typeof g == "string") {
        if (g.trim() === "")
          return null;
        throw new TypeError(
          `The <TransitionSeries /> component only accepts a list of <TransitionSeries.Sequence /> components as its children, but you passed a string "${g}"`
        );
      }
      const x = f[s - 1], j = f[s + 1], h = typeof x == "string" || typeof x > "u" ? null : x.type === Q ? x : null, T = typeof j == "string" || typeof j > "u" ? null : j.type === Q ? j : null, K = typeof x == "string" || typeof x > "u" ? !1 : x.type === Q;
      if (g.type === Q) {
        if (K)
          throw new TypeError(
            `A <TransitionSeries.Transition /> component must not be followed by another <TransitionSeries.Transition /> component (nth children = ${s - 1} and ${s})`
          );
        return null;
      }
      if (g.type !== ce)
        throw new TypeError(
          `The <TransitionSeries /> component only accepts a list of <TransitionSeries.Sequence /> and <TransitionSeries.Transition /> components as its children, but got ${g} instead`
        );
      const R = g, N = `index = ${s}, duration = ${R.props.durationInFrames}`;
      if (!(R != null && R.props.children))
        throw new TypeError(
          `A <TransitionSeries.Sequence /> component (${N}) was detected to not have any children. Delete it to fix this error.`
        );
      const S = R.props.durationInFrames, {
        durationInFrames: I,
        children: le,
        ...F
      } = R.props;
      Ae(S, {
        component: "of a <TransitionSeries.Sequence /> component",
        allowFloats: !0
      });
      const O = R.props.offset ?? 0;
      if (Number.isNaN(O))
        throw new TypeError(
          `The "offset" property of a <TransitionSeries.Sequence /> must not be NaN, but got NaN (${N}).`
        );
      if (!Number.isFinite(O))
        throw new TypeError(
          `The "offset" property of a <TransitionSeries.Sequence /> must be finite, but got ${O} (${N}).`
        );
      if (O % 1 !== 0)
        throw new TypeError(
          `The "offset" property of a <TransitionSeries.Sequence /> must be finite, but got ${O} (${N}).`
        );
      const te = l + O;
      let U = 0;
      h && (U = h.props.timing.getDurationInFrames({
        fps: t
      }), a -= U / 2);
      let d = te - U / 2;
      l += S + O, d < 0 && (d = 0);
      const X = T ? T.props.timing.getProgress({
        frame: r - d - I + T.props.timing.getDurationInFrames({ fps: t }) / 2 + a,
        fps: t
      }) : null, C = h ? h.props.timing.getProgress({
        frame: r - d,
        fps: t
      }) : null, z = h ? h.props.timing.getProgress({
        frame: r - (d + I),
        fps: t
      }) : null;
      if (T && S < T.props.timing.getDurationInFrames({ fps: t }) / 2)
        throw new Error(
          `The duration of a <TransitionSeries.Sequence /> must not be shorter than the duration of the next <TransitionSeries.Transition />. The transition is ${T.props.timing.getDurationInFrames(
            { fps: t }
          )} frames long, but the sequence is only ${S} frames long (${N})`
        );
      if (h && S < h.props.timing.getDurationInFrames({ fps: t }) / 2)
        throw new Error(
          `The duration of a <TransitionSeries.Sequence /> must not be shorter than the duration of the previous <TransitionSeries.Transition />. The transition is ${h.props.timing.getDurationInFrames(
            { fps: t }
          )} frames long, but the sequence is only ${S} frames long (${N})`
        );
      if (T && h && z !== null && C !== null) {
        const P = T.props.presentation ?? ee(), _ = h.props.presentation ?? ee(), E = h.props.timing.getDurationInFrames({
          fps: t
        }), y = T.props.timing.getDurationInFrames({
          fps: t
        }), k = P.component, Y = _.component, B = r < +Math.floor(d) + E / 2, V = r > Math.floor(d) + Math.floor(I) + E / 2, n = V ? Math.floor(d) + Math.floor(I) + Math.floor(y / 2) : Math.floor(d), c = B ? Math.floor(d) : Math.floor(d) + E / 2, m = T.props.timing.getProgress({
          frame: r - (c + I - y / 2),
          fps: t
        }), v = r > d, L = r < d + I + y / 2 + E / 2;
        return /* @__PURE__ */ i.jsx(
          ie,
          {
            active: L && v && (B || V),
            frame: n,
            children: /* @__PURE__ */ i.jsx(
              H,
              {
                from: c,
                durationInFrames: S + y / 2,
                ...F,
                name: F.name || "<TS.Sequence>",
                children: /* @__PURE__ */ i.jsx(
                  k,
                  {
                    passedProps: P.props ?? {},
                    presentationDirection: "exiting",
                    presentationProgress: m,
                    presentationDurationInFrames: T.props.timing.getDurationInFrames(
                      { fps: t }
                    ),
                    children: /* @__PURE__ */ i.jsx(
                      he,
                      {
                        presentationProgress: m,
                        children: /* @__PURE__ */ i.jsx(
                          Y,
                          {
                            passedProps: _.props ?? {},
                            presentationDirection: "entering",
                            presentationProgress: C,
                            presentationDurationInFrames: h.props.timing.getDurationInFrames(
                              { fps: t }
                            ),
                            children: /* @__PURE__ */ i.jsx(
                              me,
                              {
                                presentationProgress: C,
                                children: u
                              }
                            )
                          }
                        )
                      }
                    )
                  }
                )
              },
              s
            )
          },
          s
        );
      }
      if (C !== null && h) {
        const P = h.props.timing.getDurationInFrames({ fps: t }) / 2, _ = h.props.presentation ?? ee(), E = _.component, y = r < d + P, k = y ? Math.floor(d) : Math.floor(d) + P, Y = r > k;
        return /* @__PURE__ */ i.jsx(
          ie,
          {
            active: Y && y,
            frame: k,
            children: /* @__PURE__ */ i.jsx(
              H,
              {
                from: k,
                durationInFrames: S,
                ...F,
                name: F.name || "<TS.Sequence>",
                children: /* @__PURE__ */ i.jsx(
                  E,
                  {
                    passedProps: _.props ?? {},
                    presentationDirection: "entering",
                    presentationProgress: C,
                    presentationDurationInFrames: h.props.timing.getDurationInFrames(
                      { fps: t }
                    ),
                    children: /* @__PURE__ */ i.jsx(
                      me,
                      {
                        presentationProgress: C,
                        children: u
                      }
                    )
                  }
                )
              },
              s
            )
          },
          s
        );
      }
      if (X !== null && T) {
        const P = T.props.timing.getDurationInFrames({ fps: t }) / 2, _ = T.props.presentation ?? ee(), E = _.component, y = r > Math.floor(I) + Math.floor(d), k = r < Math.floor(I) + Math.floor(d) + P;
        return /* @__PURE__ */ i.jsx(
          ie,
          {
            active: k && y,
            frame: Math.floor(I),
            children: /* @__PURE__ */ i.jsx(
              H,
              {
                from: Math.floor(d),
                durationInFrames: S + P,
                ...F,
                name: F.name || "<TS.Sequence>",
                children: /* @__PURE__ */ i.jsx(
                  E,
                  {
                    passedProps: _.props ?? {},
                    presentationDirection: "exiting",
                    presentationProgress: X,
                    presentationDurationInFrames: T.props.timing.getDurationInFrames(
                      { fps: t }
                    ),
                    children: /* @__PURE__ */ i.jsx(
                      he,
                      {
                        presentationProgress: X,
                        children: u
                      }
                    )
                  }
                )
              },
              s
            )
          },
          s
        );
      }
      return /* @__PURE__ */ i.jsx(
        H,
        {
          from: Math.floor(d),
          durationInFrames: S,
          ...F,
          name: F.name || "<TS.Sequence>",
          children: u
        },
        s
      );
    });
  }, [e, t, r]);
  return /* @__PURE__ */ i.jsx(i.Fragment, { children: o });
}, $ = ({ children: e, name: t, layout: r, ...o }) => {
  const a = t ?? "<TransitionSeries>", l = r ?? "absolute-fill";
  return /* @__PURE__ */ i.jsx(H, { name: a, layout: l, ...o, children: /* @__PURE__ */ i.jsx(Oe, { children: e }) });
};
$.Sequence = ce;
$.Transition = Q;
pe.addSequenceStackTraces($);
pe.addSequenceStackTraces(ce);
const lt = () => {
  const e = q.useContext(xe), t = q.useContext(Te);
  return !e && !t ? {
    isInTransitionSeries: !1,
    entering: 1,
    exiting: 0
  } : {
    isInTransitionSeries: !0,
    entering: (e == null ? void 0 : e.enteringProgress) ?? 1,
    exiting: (t == null ? void 0 : t.exitingProgress) ?? 0
  };
}, Ne = ({
  children: e,
  presentationDirection: t,
  presentationProgress: r,
  passedProps: o
}) => {
  const l = Math.sqrt(o.width ** 2 + o.height ** 2) / 2 * r, f = qe(
    o.width / 2,
    o.height / 2,
    l
  ), [u] = Z(() => String(D(null))), s = w(() => ({
    width: "100%",
    height: "100%",
    clipPath: t === "exiting" ? void 0 : `url(#${u})`
  }), [u, t]);
  return /* @__PURE__ */ i.jsxs(p, { children: [
    /* @__PURE__ */ i.jsx(p, { style: s, children: e }),
    t === "exiting" ? null : /* @__PURE__ */ i.jsx(p, { children: /* @__PURE__ */ i.jsx("svg", { width: o.width, height: o.height, children: /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("clipPath", { id: u, children: /* @__PURE__ */ i.jsx("path", { d: f, fill: "black" }) }) }) }) })
  ] });
}, Ce = (e) => ({ component: Ne, props: e }), qe = (e, t, r) => `M ${e}, ${t}
            m -${r}, 0
            a ${r},${r} 0 1,0 ${r * 2},0
            a ${r},${r} 0 1,0 -${r * 2},0`, Ye = ({
  children: e,
  presentationDirection: t,
  presentationProgress: r,
  passedProps: o
}) => {
  const { width: a, height: l } = o, f = a * r, u = l * r, s = a / 2 - f / 2, g = l / 2 - u / 2, [x] = Z(() => String(D(null))), j = w(() => ({
    width: "100%",
    height: "100%",
    clipPath: t === "exiting" ? void 0 : `url(#${x})`
  }), [x, t]);
  return /* @__PURE__ */ i.jsxs(p, { children: [
    /* @__PURE__ */ i.jsx(p, { style: j, children: e }),
    t === "exiting" ? null : /* @__PURE__ */ i.jsx(p, { children: /* @__PURE__ */ i.jsx("svg", { children: /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("clipPath", { id: x, children: /* @__PURE__ */ i.jsx(
      "rect",
      {
        x: s,
        y: g,
        width: f,
        height: u,
        fill: "black"
      }
    ) }) }) }) })
  ] });
}, We = (e) => ({ component: Ye, props: e }), De = ({
  children: e,
  presentationDirection: t,
  presentationProgress: r,
  passedProps: o
}) => {
  const a = Math.sqrt(o.width ** 2 + o.height ** 2) / 2, l = a * r, f = a * 2 * r, { path: u } = Re({
    innerRadius: l,
    outerRadius: f,
    points: 5
  }), s = ye(u), g = ge(
    u,
    o.width / 2 - s.width / 2,
    o.height / 2 - s.height / 2
  ), [x] = Z(() => String(D(null))), j = w(() => ({
    width: "100%",
    height: "100%",
    clipPath: t === "exiting" ? void 0 : `url(#${x})`
  }), [x, t]);
  return /* @__PURE__ */ i.jsxs(p, { children: [
    /* @__PURE__ */ i.jsx(p, { style: j, children: e }),
    t === "exiting" ? null : /* @__PURE__ */ i.jsx(p, { children: /* @__PURE__ */ i.jsx("svg", { children: /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("clipPath", { id: x, children: /* @__PURE__ */ i.jsx("path", { d: g, fill: "black" }) }) }) }) })
  ] });
}, Ze = (e) => ({ component: De, props: e }), Ue = ({
  children: e,
  presentationDirection: t,
  presentationProgress: r,
  passedProps: o
}) => {
  const { width: a, height: l } = o, f = a * r, u = a / 2 - f / 2, [s] = Z(() => String(D(null))), g = w(() => ({
    width: "100%",
    height: "100%",
    clipPath: t === "exiting" ? void 0 : `url(#${s})`
  }), [s, t]);
  return /* @__PURE__ */ i.jsxs(p, { children: [
    /* @__PURE__ */ i.jsx(p, { style: g, children: e }),
    t === "exiting" ? null : /* @__PURE__ */ i.jsx(p, { children: /* @__PURE__ */ i.jsx("svg", { children: /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("clipPath", { id: s, children: /* @__PURE__ */ i.jsx(
      "rect",
      {
        x: u,
        y: 0,
        width: f,
        height: l,
        fill: "black"
      }
    ) }) }) }) })
  ] });
}, Xe = (e) => ({ component: Ue, props: e });
var ze = ({ children: e, presentationDirection: t, presentationProgress: r, passedProps: o }) => {
  const a = t === "entering", l = w(() => ({
    opacity: a ? r : o.shouldFadeOutExitingScene ? 1 - r : 1,
    ...t === "entering" ? o.enterStyle : o.exitStyle
  }), [
    a,
    o.enterStyle,
    o.exitStyle,
    o.shouldFadeOutExitingScene,
    t,
    r
  ]);
  return /* @__PURE__ */ i.jsx(p, {
    style: l,
    children: e
  });
}, de = (e) => ({
  component: ze,
  props: e ?? {}
}), Be = 0.01, Ve = ({
  children: e,
  presentationProgress: t,
  presentationDirection: r,
  passedProps: { direction: o = "from-left", enterStyle: a, exitStyle: l }
}) => {
  const f = w(() => {
    const s = t === 1 ? t * 100 : t * 100 - Be;
    if (r === "exiting")
      switch (o) {
        case "from-left":
          return {
            transform: `translateX(${s}%)`
          };
        case "from-right":
          return {
            transform: `translateX(${-t * 100}%)`
          };
        case "from-top":
          return {
            transform: `translateY(${s}%)`
          };
        case "from-bottom":
          return {
            transform: `translateY(${-t * 100}%)`
          };
        default:
          throw new Error(`Invalid direction: ${o}`);
      }
    switch (o) {
      case "from-left":
        return {
          transform: `translateX(${-100 + t * 100}%)`
        };
      case "from-right":
        return {
          transform: `translateX(${100 - s}%)`
        };
      case "from-top":
        return {
          transform: `translateY(${-100 + t * 100}%)`
        };
      case "from-bottom":
        return {
          transform: `translateY(${100 - s}%)`
        };
      default:
        throw new Error(`Invalid direction: ${o}`);
    }
  }, [r, t, o]), u = w(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...f,
    ...r === "entering" ? a : l
  }), [f, a, l, r]);
  return /* @__PURE__ */ i.jsx(p, {
    style: u,
    children: e
  });
}, Je = (e) => ({
  component: Ve,
  props: e ?? {}
}), Ge = (e, t) => {
  switch (t) {
    case "from-left":
      return `
M 0 0
L ${e} 0
L ${e} 1
L 0 1
Z`;
    case "from-top-left":
      return `
M 0 0
L ${e * 2} 0
L 0 ${e * 2}
Z`;
    case "from-top":
      return `
M 0 0
L 1 0
L 1 ${e}
L 0 ${e}
Z`;
    case "from-top-right":
      return `
M 1 0
L ${1 - e * 2} 0
L 1 ${e * 2}
Z`;
    case "from-right":
      return `
M 1 0
L 1 1
L ${1 - e} 1
L ${1 - e} 0
Z`;
    case "from-bottom-right":
      return `
M 1 1
L ${1 - e * 2} 1
L 1 ${1 - e * 2}
Z`;
    case "from-bottom":
      return `
M 0 1
L 1 1
L 1 ${1 - e}
L 0 ${1 - e}
Z`;
    case "from-bottom-left":
      return `
M 0 1
L 0 ${1 - e * 2}
L ${e * 2} 1
Z`;
    default:
      throw new Error(`Unknown direction ${JSON.stringify(t)}`);
  }
}, He = (e, t) => {
  switch (t) {
    case "from-left":
      return `
M 1 1
L ${1 - e} 1
L ${1 - e} 0
L 1 0
Z`;
    case "from-top-left":
      return `
M 1 1
L ${1 - 2 * e} 1
L 1 ${1 - 2 * e}
Z`;
    case "from-top":
      return `
M 1 1
L 0 1
L 0 ${1 - e}
L 1 ${1 - e}
Z`;
    case "from-top-right":
      return `
M 0 1
L ${e * 2} 1
L 0 ${1 - e * 2}
Z`;
    case "from-right":
      return `
M 0 0
L ${e} 0
L ${e} 1
L 0 1
Z`;
    case "from-bottom-right":
      return `
M 0 0
L ${e * 2} 0
L 0 ${e * 2}
Z`;
    case "from-bottom":
      return `
M 1 0
L 0 0
L 0 ${e}
L 1 ${e}
Z`;
    case "from-bottom-left":
      return `
M 1 0
L ${1 - e * 2} 0
L 1 ${e * 2}
Z`;
    default:
      throw new Error(`Unknown direction ${JSON.stringify(t)}`);
  }
}, Qe = ({
  children: e,
  presentationProgress: t,
  presentationDirection: r,
  passedProps: {
    direction: o = "from-left",
    innerEnterStyle: a,
    innerExitStyle: l,
    outerEnterStyle: f,
    outerExitStyle: u
  }
}) => {
  const [s] = Z(() => String(D(null))), g = r === "entering" ? t : 1 - t, x = r === "entering" ? Ge(g, o) : He(g, o), j = w(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    clipPath: `url(#${s})`,
    ...r === "entering" ? a : l
  }), [s, a, l, r]), h = w(() => r === "entering" ? f : u, [f, u, r]), T = w(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none"
  }), []);
  return /* @__PURE__ */ i.jsxs(p, {
    style: h,
    children: [
      /* @__PURE__ */ i.jsx(p, {
        style: j,
        children: e
      }),
      /* @__PURE__ */ i.jsx(p, {
        children: /* @__PURE__ */ i.jsx("svg", {
          viewBox: "0 0 1 1",
          style: T,
          children: /* @__PURE__ */ i.jsx("defs", {
            children: /* @__PURE__ */ i.jsx("clipPath", {
              id: s,
              clipPathUnits: "objectBoundingBox",
              children: /* @__PURE__ */ i.jsx("path", {
                d: x,
                fill: "black"
              })
            })
          })
        })
      })
    ]
  });
}, Ke = (e) => ({
  component: Qe,
  props: e ?? {}
}), et = ({
  children: e,
  presentationDirection: t,
  presentationProgress: r,
  passedProps: {
    direction: o = "from-left",
    perspective: a = 1e3,
    innerEnterStyle: l,
    innerExitStyle: f,
    outerEnterStyle: u,
    outerExitStyle: s
  }
}) => {
  const g = w(() => {
    const T = t === "entering" ? ae(r, [0, 1], [o === "from-right" || o === "from-top" ? 180 : -180, 0]) : ae(r, [0, 1], [0, o === "from-right" || o === "from-top" ? -180 : 180]);
    return {
      width: "100%",
      height: "100%",
      transform: `${o === "from-top" || o === "from-bottom" ? "rotateX" : "rotateY"}(${T}deg)`,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      ...t === "entering" ? l : f
    };
  }, [
    o,
    l,
    f,
    t,
    r
  ]), x = w(() => ({
    perspective: a,
    transformStyle: "preserve-3d",
    ...t === "entering" ? u : s
  }), [u, s, a, t]);
  return /* @__PURE__ */ i.jsx(p, {
    style: x,
    children: /* @__PURE__ */ i.jsx(p, {
      style: g,
      children: e
    })
  });
}, tt = (e) => ({ component: et, props: e ?? {} }), rt = ({ children: e, presentationDirection: t, presentationProgress: r, passedProps: o }) => {
  const a = Math.sqrt(o.width ** 2 + o.height ** 2) / 2, { path: l } = Ie({
    radius: a,
    progress: r
  }), f = ge(l, -(a * 2 - o.width) / 2, -(a * 2 - o.height) / 2), [u] = Z(() => String(D(null))), s = w(() => ({
    width: "100%",
    height: "100%",
    clipPath: t === "exiting" ? void 0 : `url(#${u})`,
    ...t === "entering" ? o.innerEnterStyle : o.innerExitStyle
  }), [
    u,
    o.innerEnterStyle,
    o.innerExitStyle,
    t
  ]), g = w(() => t === "entering" ? o.outerEnterStyle : o.outerExitStyle, [
    o.outerEnterStyle,
    o.outerExitStyle,
    t
  ]);
  return /* @__PURE__ */ i.jsxs(p, {
    style: g,
    children: [
      /* @__PURE__ */ i.jsx(p, {
        style: s,
        children: e
      }),
      t === "exiting" ? null : /* @__PURE__ */ i.jsx(p, {
        children: /* @__PURE__ */ i.jsx("svg", {
          children: /* @__PURE__ */ i.jsx("defs", {
            children: /* @__PURE__ */ i.jsx("clipPath", {
              id: u,
              children: /* @__PURE__ */ i.jsx("path", {
                d: f,
                fill: "black"
              })
            })
          })
        })
      })
    ]
  });
}, nt = (e) => ({ component: rt, props: e ?? {} });
const ut = {
  none: ({ id: e }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: de(),
      timing: A({ durationInFrames: 1 })
    },
    e
  ),
  fade: ({ durationInFrames: e, id: t }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: de(),
      timing: A({ durationInFrames: e })
    },
    t
  ),
  slide: ({ durationInFrames: e, id: t, direction: r }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: Je({ direction: r }),
      timing: A({ durationInFrames: e })
    },
    t
  ),
  wipe: ({ durationInFrames: e, id: t, direction: r }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: Ke({ direction: r }),
      timing: A({ durationInFrames: e })
    },
    t
  ),
  flip: ({ durationInFrames: e, id: t }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: tt(),
      timing: A({ durationInFrames: e })
    },
    t
  ),
  clockWipe: ({ width: e, height: t, durationInFrames: r, id: o }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: nt({ width: e, height: t }),
      timing: A({ durationInFrames: r })
    },
    o
  ),
  star: ({ width: e, height: t, durationInFrames: r, id: o }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: Ze({ width: e, height: t }),
      timing: A({ durationInFrames: r })
    },
    o
  ),
  circle: ({ width: e, height: t, durationInFrames: r, id: o }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: Ce({ width: e, height: t }),
      timing: A({ durationInFrames: r })
    },
    o
  ),
  rectangle: ({ width: e, height: t, durationInFrames: r, id: o }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: We({ width: e, height: t }),
      timing: A({ durationInFrames: r })
    },
    o
  ),
  slidingDoors: ({
    width: e,
    height: t,
    durationInFrames: r,
    id: o
  }) => /* @__PURE__ */ i.jsx(
    $.Transition,
    {
      presentation: Xe({ width: e, height: t }),
      timing: A({ durationInFrames: r })
    },
    o
  )
};
export {
  $ as TransitionSeries,
  ut as Transitions,
  Ce as circle,
  nt as clockWipe,
  de as fade,
  tt as flip,
  A as linearTiming,
  We as rectangle,
  Je as slide,
  Xe as slidingDoors,
  ct as springTiming,
  Ze as star,
  lt as useTransitionProgress,
  Ke as wipe
};
//# sourceMappingURL=index.es.js.map
