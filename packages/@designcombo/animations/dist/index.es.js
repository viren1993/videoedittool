import { jsx as x } from "react/jsx-runtime";
import M, { useMemo as I } from "react";
import { interpolate as R } from "remotion";
const A = () => ({
  scale: (t) => ({ transform: `scale(${t})` }),
  opacity: (t) => ({ opacity: t }),
  translateX: (t) => ({ transform: `translateX(${t}px)` }),
  translateY: (t) => ({ transform: `translateY(${t}px)` }),
  rotate: (t) => ({ transform: `rotate(${t}deg)` }),
  default: () => ({}),
  rotateY: (t) => ({ transform: `rotateY(${t}deg)` }),
  shakeHorizontalIn: (t) => ({
    transform: `translateX(${t}px)`,
    overflow: "hidden"
  }),
  shakeVerticalIn: (t) => ({
    transform: `translateY(${t}px)`,
    overflow: "hidden"
  }),
  shakeHorizontalOut: (t) => ({
    transform: `translateX(${t}px)`,
    overflow: "hidden"
  }),
  shakeVerticalOut: (t) => ({
    transform: `translateY(${t}px)`,
    overflow: "hidden"
  })
}), j = (t, a = 0) => {
  const e = [], s = t / 5;
  for (let l = 0; l < 6; l += 1)
    e.push(l * s + a);
  return e;
}, C = (t, a, e, s = !1) => {
  const { from: l, to: o, ease: c } = a, r = a.durationInFrames || 30, f = Number(l), i = Number(o), n = Math.max(1, Number(r));
  if (isNaN(f) || isNaN(i))
    return console.error("Invalid animation values:", {
      from: l,
      to: o,
      animationDurationInFrames: r,
      property: a.property
    }), f;
  r === void 0 && console.warn(
    `durationInFrames is undefined for animation: ${a.property}. Using 1 frame as default.`
  );
  const d = s ? [e - r, e] : [0, n];
  if (a.property.includes("shake")) {
    const u = s ? j(
      n,
      e - r
    ) : j(n);
    return R(
      t,
      u,
      [0, f, i, f, i, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: c
      }
    );
  }
  return R(t, d, [f, i], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: c
  });
}, E = (t, a, e, s) => {
  const l = a - (t.delay || 0) * (s ? -1 : 1), { property: o, durationInFrames: c } = t;
  if (!s && l > c) return {};
  const r = C(
    l,
    t,
    e,
    s
  ), f = A();
  return (f[o] || f.default)(r);
}, F = (t, a, e, s = !1, l = !1) => M.useMemo(() => {
  if (t.length === 0) return {};
  const o = t.filter(
    (c) => c.from !== void 0 && c.to !== void 0
  );
  if (o.length !== t.length && console.error("Some animations are invalid and will be ignored"), l) {
    const c = [], r = {};
    o.reverse().forEach((n) => {
      const d = E(n, e, a, !1);
      if (n.persist === !0 && e - (n.delay || 0) >= n.durationInFrames) {
        const v = n.to, g = A(), p = (g[n.property] || g.default)(v);
        Object.keys(p).forEach(($) => {
          $ === "transform" ? r[$] = r[$] ? {
            [$]: `${r[$][$]} ${p[$]}`
          } : p : r[$] = p;
        });
      }
      c.push(d);
    });
    const i = { ...c.reduce(
      (n, d) => (Object.keys(d).forEach((u) => {
        u === "transform" ? n[u] = n[u] ? `${n[u]} ${d[u]}` : d[u] : n[u] = d[u];
      }), n),
      {}
    ) };
    return Object.keys(r).forEach((n) => {
      const d = r[n];
      n === "transform" && d.transform ? i.transform = i.transform ? `${i.transform} ${d.transform}` : d.transform : d[n] !== void 0 && (i[n] = d[n]);
    }), i;
  } else
    return o.map((r) => E(r, e, a, s)).reduce(
      (r, f) => (Object.keys(f).forEach((i) => {
        i === "transform" ? r[i] = r[i] ? `${r[i]} ${f[i]}` : f[i] : r[i] = f[i];
      }), r),
      {}
    );
}, [t, e, a, s]), X = (t) => t ? Array.isArray(t) ? t : [t] : [], _ = (...t) => {
  const a = [];
  return t.forEach((e) => {
    Array.isArray(e) ? a.push(...e) : e && a.push(e);
  }), a.filter((e) => e !== void 0).reduce((e, s) => e.find(
    (o) => o.property === s.property
  ) ? e.map(
    (o) => o.property === s.property ? {
      ...o,
      from: Math.min(o.from, s.from),
      to: Math.max(o.to, s.to),
      durationInFrames: Math.max(
        o.durationInFrames,
        s.durationInFrames
      ),
      delay: Math.min(o.delay || 0, s.delay || 0),
      ease: (c) => (o.ease(c) + s.ease(c)) / 2
      // Average the easing functions
    } : o
  ) : [...e, s], []);
}, z = ({
  animationIn: t,
  animationOut: a,
  durationInFrames: e,
  children: s,
  style: l = {},
  frame: o,
  isTransition: c = !1
}) => {
  var Y;
  const r = F(
    X(t),
    e,
    o,
    !1
  ), f = F(
    X(a),
    e,
    o,
    !0
  ), i = M.useMemo(() => {
    const h = Object.keys(r).length > 0, m = t == null ? void 0 : t.reduce(
      (w, S) => Math.min(w, S.delay || 0),
      1 / 0
    ), b = o - (m || 0);
    return h && b < 0 ? { visibility: c ? "visible" : "hidden" } : r;
  }, [r, o, t]), n = M.useMemo(() => {
    const h = (a == null ? void 0 : a.length) > 0, m = a == null ? void 0 : a.reduce(
      (b, w) => {
        const S = w.delay || 0;
        return Math.max(b, S);
      },
      0
    );
    return h && o > e - m ? { visibility: c ? "visible" : "hidden" } : f;
  }, [f, o, a]), u = ((l == null ? void 0 : l.transform) || "").match(/rotate\((-?[\d.]+)deg\)/), v = u ? parseFloat(u[1]) : 0, g = -v, p = M.useMemo(() => {
    const h = {
      ...i
      // , ...timedStyle
    };
    return Object.entries(n).forEach(([m, b]) => {
      m === "transform" ? h[m] = `${h[m] || ""} ${b || ""}`.trim() : m in h && typeof h[m] == "number" && typeof b == "number" ? h[m] = h[m] * b : h[m] = b;
    }), h;
  }, [i, n]);
  if ((Y = p.transform) != null && Y.includes("rotate")) {
    const h = p.transform;
    p.transform = h.replace(
      /rotate\(([^)]+)deg\)/,
      (m, b) => `rotate(${parseFloat(b) - g}deg)`
    );
  }
  const $ = I(() => {
    const h = p.transform || "", { translateX: m, translateY: b, scale: w, rotation: S, rotateY: V } = H(h);
    return `${m} ${b} ${w} ${S || `rotate(${v}deg)`} ${V}`.trim();
  }, [p, v]);
  let y = r;
  return v > 0 && y.transform && y.transform.includes("translateX") && (y = {
    ...y,
    transform: y.transform.replace(
      /translateX\(([^)]+)\)/g,
      (h, m) => `translateX(${parseFloat(m)}px)`
    )
  }), /* @__PURE__ */ x(
    "div",
    {
      style: {
        overflow: p.overflow || "visible",
        pointerEvents: "none",
        ...y,
        transform: (y.transform || "") + ` -rotate(${g}deg) scale(1)`,
        background: Object.keys(p).length === 0 ? "transparent" : p.backgroundColor,
        display: "flex",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ x(
        "div",
        {
          style: {
            ...l,
            ...p,
            rotate: `${g}deg`,
            overflow: "visible",
            transform: $,
            pointerEvents: "none",
            background: Object.keys(p).length === 0 ? "transparent" : p.backgroundColor
          },
          children: s
        }
      )
    }
  );
}, H = (t) => {
  let a = "", e = "", s = "scale(1)", l = "", o = "";
  const c = t.match(/translateX\([^)]+\)/);
  c && (a = c[0]);
  const r = t.match(/translateY\([^)]+\)/);
  r && (e = r[0]);
  const f = t.match(/scale\([^)]+\)/);
  f && (s = f[0]);
  const i = t.match(/rotate\([^)]+\)/);
  i && (l = i[0]);
  const n = t.match(/rotateY\([^)]+\)/);
  return n && (o = n[0]), { translateX: a, translateY: e, scale: s, rotation: l, rotateY: o };
}, L = ({
  animationTimed: t,
  durationInFrames: a,
  children: e,
  style: s = {},
  frame: l
}) => {
  var u;
  const o = F(
    X(t),
    a,
    l,
    !1,
    !0
  ), r = ((s == null ? void 0 : s.transform) || "").match(/rotate\((-?[\d.]+)deg\)/), f = r ? parseFloat(r[1]) : 0, i = -f, n = M.useMemo(() => ({
    ...o
  }), [o]);
  if ((u = n.transform) != null && u.includes("rotate")) {
    const v = n.transform;
    n.transform = v.replace(
      /rotate\(([^)]+)deg\)/,
      (g, p) => `rotate(${parseFloat(p) - i}deg)`
    );
  }
  let d = n;
  return f > 0 && d.transform && d.transform.includes("translateX") && (d = {
    ...d,
    transform: d.transform.replace(
      /translateX\(([^)]+)\)/g,
      (v, g) => `translateX(${parseFloat(g)}px)`
    )
  }), /* @__PURE__ */ x(
    "div",
    {
      style: {
        overflow: n.overflow || "visible",
        pointerEvents: "none",
        height: s.height,
        width: s.width,
        ...d
      },
      children: /* @__PURE__ */ x(
        "div",
        {
          style: {
            ...n,
            overflow: "visible",
            pointerEvents: "none",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: e
        }
      )
    }
  );
}, W = ({
  children: t,
  frame: a,
  item: e,
  keyframeAnimations: s
}) => {
  var u, v;
  const l = s == null ? void 0 : s.find(
    (g) => g.property.includes("maskReveal")
  ), o = ((u = e.details.crop) == null ? void 0 : u.width) || e.details.width, c = ((v = e.details.crop) == null ? void 0 : v.height) || e.details.height;
  let r = 1, f = c, i = 0, n = 0, d = o;
  if ((a || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealIn")
    r = Math.min((a || 0) / l.durationInFrames, 1), f = c - c * (1 - r);
  else if ((a || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealCenterIn") {
    r = Math.min((a || 0) / l.durationInFrames, 1);
    const g = o / 2, p = c / 2;
    d = o, f = c * r, i = g - d / 2, n = p - f / 2;
  } else (a || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealCornerIn" && (r = Math.min((a || 0) / l.durationInFrames, 1), d = o * r, f = c * r, i = o - d, n = 0);
  return /* @__PURE__ */ x(
    "div",
    {
      style: {
        width: o,
        height: c,
        position: "relative",
        overflow: "hidden"
      },
      children: /* @__PURE__ */ x(
        "div",
        {
          style: {
            position: "absolute",
            left: i,
            top: n,
            width: d,
            height: f,
            overflow: "hidden"
          },
          children: t
        }
      )
    }
  );
};
export {
  z as BoxAnim,
  L as ContentAnim,
  W as MaskAnim,
  _ as combine,
  X as combineAnimations,
  H as extractTransformations,
  F as useAnimation
};
