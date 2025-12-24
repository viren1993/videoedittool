import { jsx as w } from "react/jsx-runtime";
import x, { useMemo as V } from "react";
import { interpolate as Y } from "remotion";
const j = () => ({
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
}), R = (t, n = 0) => {
  const e = [], s = t / 5;
  for (let l = 0; l < 6; l += 1)
    e.push(l * s + n);
  return e;
}, I = (t, n, e, s = !1) => {
  const { from: l, to: r, ease: i } = n, o = n.durationInFrames || 30, f = Number(l), c = Number(r), a = Math.max(1, Number(o));
  if (isNaN(f) || isNaN(c))
    return console.error("Invalid animation values:", {
      from: l,
      to: r,
      animationDurationInFrames: o,
      property: n.property
    }), f;
  o === void 0 && console.warn(
    `durationInFrames is undefined for animation: ${n.property}. Using 1 frame as default.`
  );
  const d = s ? [e - o, e] : [0, a];
  if (n.property.includes("shake")) {
    const p = s ? R(
      a,
      e - o
    ) : R(a);
    return Y(
      t,
      p,
      [0, f, c, f, c, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: i
      }
    );
  }
  return Y(t, d, [f, c], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: i
  });
}, E = (t, n, e, s) => {
  const l = n - (t.delay || 0) * (s ? -1 : 1), { property: r, durationInFrames: i } = t;
  if (!s && l > i) return {};
  const o = I(
    l,
    t,
    e,
    s
  ), f = j();
  return (f[r] || f.default)(o);
}, M = (t, n, e, s = !1, l = !1) => x.useMemo(() => {
  if (t.length === 0) return {};
  const r = t.filter(
    (i) => i.from !== void 0 && i.to !== void 0
  );
  if (r.length !== t.length && console.error("Some animations are invalid and will be ignored"), l) {
    const i = [], o = {};
    r.reverse().forEach((a) => {
      const d = E(a, e, n, !1);
      if (a.persist === !0 && e - (a.delay || 0) >= a.durationInFrames) {
        const $ = a.to, u = j(), b = (u[a.property] || u.default)($);
        Object.keys(b).forEach((h) => {
          h === "transform" ? o[h] = o[h] ? {
            [h]: `${o[h][h]} ${b[h]}`
          } : b : o[h] = b;
        });
      }
      i.push(d);
    });
    const c = { ...i.reduce(
      (a, d) => (Object.keys(d).forEach((p) => {
        p === "transform" ? a[p] = a[p] ? `${a[p]} ${d[p]}` : d[p] : a[p] = d[p];
      }), a),
      {}
    ) };
    return Object.keys(o).forEach((a) => {
      const d = o[a];
      a === "transform" && d.transform ? c.transform = c.transform ? `${c.transform} ${d.transform}` : d.transform : d[a] !== void 0 && (c[a] = d[a]);
    }), c;
  } else
    return r.map((o) => E(o, e, n, s)).reduce(
      (o, f) => (Object.keys(f).forEach((c) => {
        c === "transform" ? o[c] = o[c] ? `${o[c]} ${f[c]}` : f[c] : o[c] = f[c];
      }), o),
      {}
    );
}, [t, e, n, s]), F = (t) => t ? Array.isArray(t) ? t : [t] : [], D = (...t) => {
  const n = [];
  return t.forEach((e) => {
    Array.isArray(e) ? n.push(...e) : e && n.push(e);
  }), n.filter((e) => e !== void 0).reduce((e, s) => e.find(
    (r) => r.property === s.property
  ) ? e.map(
    (r) => r.property === s.property ? {
      ...r,
      from: Math.min(r.from, s.from),
      to: Math.max(r.to, s.to),
      durationInFrames: Math.max(
        r.durationInFrames,
        s.durationInFrames
      ),
      delay: Math.min(r.delay || 0, s.delay || 0),
      ease: (i) => (r.ease(i) + s.ease(i)) / 2
      // Average the easing functions
    } : r
  ) : [...e, s], []);
}, _ = ({
  animationIn: t,
  animationOut: n,
  durationInFrames: e,
  children: s,
  style: l = {},
  frame: r
}) => {
  var X;
  const i = M(
    F(t),
    e,
    r,
    !1
  ), o = M(
    F(n),
    e,
    r,
    !0
  ), f = x.useMemo(() => {
    const m = Object.keys(i).length > 0, v = t == null ? void 0 : t.reduce(
      (y, S) => Math.min(y, S.delay || 0),
      1 / 0
    ), g = r - (v || 0);
    return m && g < 0 ? { visibility: "hidden" } : i;
  }, [i, r, t]), c = x.useMemo(() => {
    const m = (n == null ? void 0 : n.length) > 0, v = n == null ? void 0 : n.reduce(
      (g, y) => {
        const S = y.delay || 0;
        return Math.max(g, S);
      },
      0
    );
    return m && r > e - v ? { visibility: "hidden" } : o;
  }, [o, r, n]), d = ((l == null ? void 0 : l.transform) || "").match(/rotate\((-?[\d.]+)deg\)/), p = d ? parseFloat(d[1]) : 0, $ = -p, u = x.useMemo(() => {
    const m = {
      ...f
      // , ...timedStyle
    };
    return Object.entries(c).forEach(([v, g]) => {
      v === "transform" ? m[v] = `${m[v] || ""} ${g || ""}`.trim() : v in m && typeof m[v] == "number" && typeof g == "number" ? m[v] = m[v] * g : m[v] = g;
    }), m;
  }, [f, c]);
  if ((X = u.transform) != null && X.includes("rotate")) {
    const m = u.transform;
    u.transform = m.replace(
      /rotate\(([^)]+)deg\)/,
      (v, g) => `rotate(${parseFloat(g) - $}deg)`
    );
  }
  const b = V(() => {
    const m = u.transform || "", { translateX: v, translateY: g, scale: y, rotation: S, rotateY: A } = H(m);
    return `${v} ${g} ${y} ${S || `rotate(${p}deg)`} ${A}`.trim();
  }, [u, p]);
  let h = i;
  return p > 0 && h.transform && h.transform.includes("translateX") && (h = {
    ...h,
    transform: h.transform.replace(
      /translateX\(([^)]+)\)/g,
      (m, v) => `translateX(${parseFloat(v)}px)`
    )
  }), /* @__PURE__ */ w(
    "div",
    {
      style: {
        overflow: u.overflow || "visible",
        pointerEvents: "none",
        ...h,
        transform: (h.transform || "") + ` -rotate(${$}deg) scale(1)`,
        background: Object.keys(u).length === 0 ? "transparent" : u.backgroundColor,
        display: "flex",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ w(
        "div",
        {
          style: {
            ...l,
            ...u,
            rotate: `${$}deg`,
            overflow: "visible",
            transform: b,
            pointerEvents: "none",
            background: Object.keys(u).length === 0 ? "transparent" : u.backgroundColor
          },
          children: s
        }
      )
    }
  );
}, H = (t) => {
  let n = "", e = "", s = "scale(1)", l = "", r = "";
  const i = t.match(/translateX\([^)]+\)/);
  i && (n = i[0]);
  const o = t.match(/translateY\([^)]+\)/);
  o && (e = o[0]);
  const f = t.match(/scale\([^)]+\)/);
  f && (s = f[0]);
  const c = t.match(/rotate\([^)]+\)/);
  c && (l = c[0]);
  const a = t.match(/rotateY\([^)]+\)/);
  return a && (r = a[0]), { translateX: n, translateY: e, scale: s, rotation: l, rotateY: r };
}, z = ({
  animationTimed: t,
  durationInFrames: n,
  children: e,
  style: s = {},
  frame: l
}) => {
  var p;
  const r = M(
    F(t),
    n,
    l,
    !1,
    !0
  ), o = ((s == null ? void 0 : s.transform) || "").match(/rotate\((-?[\d.]+)deg\)/), f = o ? parseFloat(o[1]) : 0, c = -f, a = x.useMemo(() => ({
    ...r
  }), [r]);
  if ((p = a.transform) != null && p.includes("rotate")) {
    const $ = a.transform;
    a.transform = $.replace(
      /rotate\(([^)]+)deg\)/,
      (u, b) => `rotate(${parseFloat(b) - c}deg)`
    );
  }
  let d = a;
  return f > 0 && d.transform && d.transform.includes("translateX") && (d = {
    ...d,
    transform: d.transform.replace(
      /translateX\(([^)]+)\)/g,
      ($, u) => `translateX(${parseFloat(u)}px)`
    )
  }), /* @__PURE__ */ w(
    "div",
    {
      style: {
        overflow: a.overflow || "visible",
        pointerEvents: "none",
        height: s.height,
        width: s.width,
        ...d
      },
      children: /* @__PURE__ */ w(
        "div",
        {
          style: {
            ...a,
            overflow: "visible",
            pointerEvents: "none",
            height: "100%",
            width: "100%"
          },
          children: e
        }
      )
    }
  );
}, L = ({
  children: t,
  frame: n,
  item: e,
  keyframeAnimations: s
}) => {
  var p, $;
  const l = s == null ? void 0 : s.find(
    (u) => u.property.includes("maskReveal")
  ), r = ((p = e.details.crop) == null ? void 0 : p.width) || e.details.width, i = (($ = e.details.crop) == null ? void 0 : $.height) || e.details.height;
  let o = 1, f = i, c = 0, a = 0, d = r;
  if ((n || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealIn")
    o = Math.min((n || 0) / l.durationInFrames, 1), f = i - i * (1 - o);
  else if ((n || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealCenterIn") {
    o = Math.min((n || 0) / l.durationInFrames, 1);
    const u = r / 2, b = i / 2;
    d = r, f = i * o, c = u - d / 2, a = b - f / 2;
  } else (n || 0) - e.display.from >= 0 && (l == null ? void 0 : l.property) === "maskRevealCornerIn" && (o = Math.min((n || 0) / l.durationInFrames, 1), d = r * o, f = i * o, c = r - d, a = 0);
  return /* @__PURE__ */ w(
    "div",
    {
      style: {
        width: r,
        height: i,
        position: "relative",
        overflow: "hidden"
      },
      children: /* @__PURE__ */ w(
        "div",
        {
          style: {
            position: "absolute",
            left: c,
            top: a,
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
  _ as BoxAnim,
  z as ContentAnim,
  L as MaskAnim,
  D as combine,
  F as combineAnimations,
  H as extractTransformations,
  M as useAnimation
};
