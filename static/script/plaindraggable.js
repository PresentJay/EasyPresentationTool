/*! PlainDraggable v2.5.12 (c) anseki https://anseki.github.io/plain-draggable/ */
var PlainDraggable = function (t) {
    var e = {};

    function n(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n.m = t, n.c = e, n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(r, o, function (e) {
                return t[e]
            }.bind(null, o));
        return r
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
    "use strict";
    n.r(e);
    var r = 500,
        o = [],
        i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            return setTimeout(t, 1e3 / 60)
        },
        a = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function (t) {
            return clearTimeout(t)
        },
        l = Date.now(),
        u = void 0;

    function s() {
        var t = void 0,
            e = void 0;
        u && (a.call(window, u), u = null), o.forEach(function (e) {
            var n;
            (n = e.event) && (e.event = null, e.listener(n), t = !0)
        }), t ? (l = Date.now(), e = !0) : Date.now() - l < r && (e = !0), e && (u = i.call(window, s))
    }

    function d(t) {
        var e = -1;
        return o.some(function (n, r) {
            return n.listener === t && (e = r, !0)
        }), e
    }
    var c = {
            add: function (t) {
                var e = void 0;
                return -1 === d(t) ? (o.push(e = {
                    listener: t
                }), function (t) {
                    e.event = t, u || s()
                }) : null
            },
            remove: function (t) {
                var e;
                (e = d(t)) > -1 && (o.splice(e, 1), !o.length && u && (a.call(window, u), u = null))
            }
        },
        f = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function (e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }();
    var p = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function () {
                p = !0
            }
        }))
    } catch (t) {}

    function v(t, e, n, r) {
        t.addEventListener(e, n, p ? r : r.capture)
    }

    function h(t, e) {
        if (null != t && null != e)
            for (var n = 0; n < t.length; n++)
                if (t[n].identifier === e) return t[n];
        return null
    }

    function m(t) {
        return t && "number" == typeof t.clientX && "number" == typeof t.clientY
    }

    function g(t) {
        t.preventDefault()
    }
    var y = function () {
        function t(e) {
            var n = this;
            ! function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.startHandlers = {}, this.lastHandlerId = 0, this.curPointerClass = null, this.curTouchId = null, this.lastPointerXY = {
                clientX: 0,
                clientY: 0
            }, this.lastTouchTime = 0, this.options = {
                preventDefault: !0,
                stopPropagation: !0
            }, e && ["preventDefault", "stopPropagation"].forEach(function (t) {
                "boolean" == typeof e[t] && (n.options[t] = e[t])
            })
        }
        return f(t, [{
            key: "regStartHandler",
            value: function (t) {
                var e = this;
                return e.startHandlers[++e.lastHandlerId] = function (n) {
                    var r = "mousedown" === n.type ? "mouse" : "touch",
                        o = Date.now(),
                        i = void 0,
                        a = void 0;
                    if ("touch" === r) e.lastTouchTime = o, i = n.changedTouches[0], a = n.changedTouches[0].identifier;
                    else {
                        if (o - e.lastTouchTime < 400) return;
                        i = n
                    }
                    if (!m(i)) throw new Error("No clientX/clientY");
                    e.curPointerClass && e.cancel(), t.call(e, i) && (e.curPointerClass = r, e.curTouchId = "touch" === r ? a : null, e.lastPointerXY.clientX = i.clientX, e.lastPointerXY.clientY = i.clientY, e.options.preventDefault && n.preventDefault(), e.options.stopPropagation && n.stopPropagation())
                }, e.lastHandlerId
            }
        }, {
            key: "unregStartHandler",
            value: function (t) {
                delete this.startHandlers[t]
            }
        }, {
            key: "addStartHandler",
            value: function (t, e) {
                if (!this.startHandlers[e]) throw new Error("Invalid handlerId: " + e);
                return v(t, "mousedown", this.startHandlers[e], {
                    capture: !1,
                    passive: !1
                }), v(t, "touchstart", this.startHandlers[e], {
                    capture: !1,
                    passive: !1
                }), v(t, "dragstart", g, {
                    capture: !1,
                    passive: !1
                }), e
            }
        }, {
            key: "removeStartHandler",
            value: function (t, e) {
                if (!this.startHandlers[e]) throw new Error("Invalid handlerId: " + e);
                return t.removeEventListener("mousedown", this.startHandlers[e], !1), t.removeEventListener("touchstart", this.startHandlers[e], !1), t.removeEventListener("dragstart", g, !1), e
            }
        }, {
            key: "addMoveHandler",
            value: function (t, e) {
                var n = this,
                    r = c.add(function (t) {
                        var e = "mousemove" === t.type ? "mouse" : "touch";
                        if ("touch" === e && (n.lastTouchTime = Date.now()), e === n.curPointerClass) {
                            var r = "touch" === e ? h(t.changedTouches, n.curTouchId) : t;
                            m(r) && (r.clientX === n.lastPointerXY.clientX && r.clientY === n.lastPointerXY.clientY || n.move(r), n.options.preventDefault && t.preventDefault(), n.options.stopPropagation && t.stopPropagation())
                        }
                    });
                v(t, "mousemove", r, {
                    capture: !1,
                    passive: !1
                }), v(t, "touchmove", r, {
                    capture: !1,
                    passive: !1
                }), n.curMoveHandler = e
            }
        }, {
            key: "move",
            value: function (t) {
                m(t) && (this.lastPointerXY.clientX = t.clientX, this.lastPointerXY.clientY = t.clientY), this.curMoveHandler && this.curMoveHandler(this.lastPointerXY)
            }
        }, {
            key: "addEndHandler",
            value: function (t, e) {
                var n = this;

                function r(t) {
                    var e = "mouseup" === t.type ? "mouse" : "touch";
                    if ("touch" === e && (n.lastTouchTime = Date.now()), e === n.curPointerClass) {
                        var r = "touch" === e ? h(t.changedTouches, n.curTouchId) || (h(t.touches, n.curTouchId) ? null : {}) : t;
                        r && (n.end(r), n.options.preventDefault && t.preventDefault(), n.options.stopPropagation && t.stopPropagation())
                    }
                }
                v(t, "mouseup", r, {
                    capture: !1,
                    passive: !1
                }), v(t, "touchend", r, {
                    capture: !1,
                    passive: !1
                }), n.curEndHandler = e
            }
        }, {
            key: "end",
            value: function (t) {
                m(t) && (this.lastPointerXY.clientX = t.clientX, this.lastPointerXY.clientY = t.clientY), this.curEndHandler && this.curEndHandler(this.lastPointerXY), this.curPointerClass = this.curTouchId = null
            }
        }, {
            key: "addCancelHandler",
            value: function (t, e) {
                var n = this;
                v(t, "touchcancel", function (t) {
                    n.lastTouchTime = Date.now(), null != n.curPointerClass && (h(t.changedTouches, n.curTouchId) || !h(t.touches, n.curTouchId)) && n.cancel()
                }, {
                    capture: !1,
                    passive: !1
                }), n.curCancelHandler = e
            }
        }, {
            key: "cancel",
            value: function () {
                this.curCancelHandler && this.curCancelHandler(), this.curPointerClass = this.curTouchId = null
            }
        }], [{
            key: "addEventListenerWithOptions",
            get: function () {
                return v
            }
        }]), t
    }();

    function x(t) {
        return t.substr(0, 1).toUpperCase() + t.substr(1)
    }
    var w = ["webkit", "moz", "ms", "o"],
        b = w.reduce(function (t, e) {
            return t.push(e), t.push(x(e)), t
        }, []),
        S = w.map(function (t) {
            return "-" + t + "-"
        }),
        E = function () {
            var t = void 0;
            return function () {
                return t = t || document.createElement("div").style
            }
        }(),
        T = function () {
            var t = new RegExp("^(?:" + w.join("|") + ")(.)", "i"),
                e = /[A-Z]/;
            return function (n) {
                return "float" === (n = (n + "").replace(/\s/g, "").replace(/-([\da-z])/gi, function (t, e) {
                    return e.toUpperCase()
                }).replace(t, function (t, n) {
                    return e.test(n) ? n.toLowerCase() : t
                })).toLowerCase() ? "cssFloat" : n
            }
        }(),
        B = function () {
            var t = new RegExp("^(?:" + S.join("|") + ")", "i");
            return function (e) {
                return (null != e ? e + "" : "").replace(/\s/g, "").replace(t, "")
            }
        }(),
        C = function (t, e) {
            var n = E();
            return t = t.replace(/[A-Z]/g, function (t) {
                return "-" + t.toLowerCase()
            }), n.setProperty(t, e), null != n[t] && n.getPropertyValue(t) === e
        },
        O = {},
        H = {};

    function k(t) {
        if ((t = T(t)) && null == O[t]) {
            var e = E();
            if (null != e[t]) O[t] = t;
            else {
                var n = x(t);
                b.some(function (r) {
                    var o = r + n;
                    return null != e[o] && (O[t] = o, !0)
                }) || (O[t] = !1)
            }
        }
        return O[t] || void 0
    }
    var P = {
        getName: k,
        getValue: function (t, e) {
            var n = void 0;
            return (t = k(t)) ? (H[t] = H[t] || {}, (Array.isArray(e) ? e : [e]).some(function (e) {
                return e = B(e), null != H[t][e] ? !1 !== H[t][e] && (n = H[t][e], !0) : C(t, e) ? (n = H[t][e] = e, !0) : !!S.some(function (r) {
                    var o = r + e;
                    return !!C(t, o) && (n = H[t][e] = o, !0)
                }) || (H[t][e] = !1, !1)
            }), "string" == typeof n ? n : void 0) : n
        }
    };

    function I(t) {
        return (t + "").trim()
    }

    function _(t, e) {
        e.setAttribute("class", t.join(" "))
    }

    function D(t) {
        return !D.ignoreNative && t.classList || function () {
            var e = (t.getAttribute("class") || "").trim().split(/\s+/).filter(function (t) {
                    return !!t
                }),
                n = {
                    length: e.length,
                    item: function (t) {
                        return e[t]
                    },
                    contains: function (t) {
                        return -1 !== e.indexOf(I(t))
                    },
                    add: function () {
                        return function (t, e, n) {
                            n.filter(function (e) {
                                return !(!(e = I(e)) || -1 !== t.indexOf(e) || (t.push(e), 0))
                            }).length && _(t, e)
                        }(e, t, Array.prototype.slice.call(arguments)), D.methodChain ? n : void 0
                    },
                    remove: function () {
                        return function (t, e, n) {
                            n.filter(function (e) {
                                var n = void 0;
                                return !(!(e = I(e)) || -1 === (n = t.indexOf(e)) || (t.splice(n, 1), 0))
                            }).length && _(t, e)
                        }(e, t, Array.prototype.slice.call(arguments)), D.methodChain ? n : void 0
                    },
                    toggle: function (n, r) {
                        return function (t, e, n, r) {
                            var o = t.indexOf(n = I(n));
                            return -1 !== o ? !!r || (t.splice(o, 1), _(t, e), !1) : !1 !== r && (t.push(n), _(t, e), !0)
                        }(e, t, n, r)
                    },
                    replace: function (r, o) {
                        return function (t, e, n, r) {
                            var o = void 0;
                            (n = I(n)) && (r = I(r)) && n !== r && -1 !== (o = t.indexOf(n)) && (t.splice(o, 1), -1 === t.indexOf(r) && t.push(r), _(t, e))
                        }(e, t, r, o), D.methodChain ? n : void 0
                    }
                };
            return n
        }()
    }
    D.methodChain = !0;
    var X = D,
        Y = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function (e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }(),
        L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
    X.ignoreNative = !0;
    var A = 9e3,
        F = 20,
        W = "tl",
        j = "both",
        R = "both",
        M = "containment",
        z = ["tl", "tr", "bl", "br"],
        N = ["start", "end"],
        V = ["inside", "outside"],
        G = [40, 200, 1e3],
        q = [100, 40, 0],
        U = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style && !window.navigator.msPointerEnabled,
        Z = !U && !!document.uniqueID,
        $ = "MozAppearance" in document.documentElement.style,
        J = !(U || $ || !window.chrome || !window.CSS),
        K = !U && !Z && !$ && !J && !window.chrome && "WebkitAppearance" in document.documentElement.style,
        Q = function () {
            var t = {}.toString,
                e = {}.hasOwnProperty.toString,
                n = e.call(Object);
            return function (r) {
                var o = void 0,
                    i = void 0;
                return r && "[object Object]" === t.call(r) && (!(o = Object.getPrototypeOf(r)) || (i = o.hasOwnProperty("constructor") && o.constructor) && "function" == typeof i && e.call(i) === n)
            }
        }(),
        tt = Number.isFinite || function (t) {
            return "number" == typeof t && window.isFinite(t)
        },
        et = {},
        nt = {},
        rt = new y,
        ot = 0,
        it = void 0,
        at = void 0,
        lt = void 0,
        ut = void 0,
        st = void 0,
        dt = void 0,
        ct = void 0,
        ft = void 0,
        pt = void 0,
        vt = void 0,
        ht = K ? ["all-scroll", "move"] : ["grab", "all-scroll", "move"],
        mt = K ? "move" : ["grabbing", "move"],
        gt = "plain-draggable",
        yt = "plain-draggable-dragging",
        xt = "plain-draggable-moving",
        wt = {},
        bt = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            return setTimeout(t, 1e3 / 60)
        },
        St = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function (t) {
            return clearTimeout(t)
        },
        Et = function () {
            var t = Date.now();
            ["x", "y"].forEach(function (e) {
                var n = Bt[e];
                if (n) {
                    var r = t - n.lastFrameTime,
                        o = Ot(Ct, e),
                        i = null != n.lastValue && Math.abs(n.lastValue - o) < 10 ? n.lastValue : o;
                    if (-1 === n.dir ? i > n.min : i < n.max) {
                        var a = i + n.speed * r * n.dir;
                        a < n.min ? a = n.min : a > n.max && (a = n.max), Ot(Ct, e, a), n.lastValue = a
                    }
                    n.lastFrameTime = t
                }
            })
        },
        Tt = function t() {
            St.call(window, Ht), Et(), Ht = bt.call(window, t)
        },
        Bt = {},
        Ct = void 0,
        Ot = void 0,
        Ht = void 0;

    function kt(t, e, n) {
        return null != n && ("x" === e ? t.scrollTo(n, t.pageYOffset) : t.scrollTo(t.pageXOffset, n)), "x" === e ? t.pageXOffset : t.pageYOffset
    }

    function Pt(t, e, n) {
        var r = "x" === e ? "scrollLeft" : "scrollTop";
        return null != n && (t[r] = n), t[r]
    }

    function It(t) {
        return t ? Q(t) ? Object.keys(t).reduce(function (e, n) {
            return e[n] = It(t[n]), e
        }, {}) : Array.isArray(t) ? t.map(It) : t : t
    }

    function _t(t, e) {
        var n = void 0,
            r = void 0;
        return (void 0 === t ? "undefined" : L(t)) !== (void 0 === e ? "undefined" : L(e)) || (n = Q(t) ? "obj" : Array.isArray(t) ? "array" : "") != (Q(e) ? "obj" : Array.isArray(e) ? "array" : "") || ("obj" === n ? _t(r = Object.keys(t).sort(), Object.keys(e).sort()) || r.some(function (n) {
            return _t(t[n], e[n])
        }) : "array" === n ? t.length !== e.length || t.some(function (t, n) {
            return _t(t, e[n])
        }) : t !== e)
    }

    function Dt(t) {
        return !(!t || t.nodeType !== Node.ELEMENT_NODE || "function" != typeof t.getBoundingClientRect || t.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED)
    }

    function Xt(t) {
        if (!Q(t)) return null;
        var e = void 0;
        if (!tt(e = t.left) && !tt(e = t.x)) return null;
        if (t.left = t.x = e, !tt(e = t.top) && !tt(e = t.y)) return null;
        if (t.top = t.y = e, tt(t.width) && t.width >= 0) t.right = t.left + t.width;
        else {
            if (!(tt(t.right) && t.right >= t.left)) return null;
            t.width = t.right - t.left
        }
        if (tt(t.height) && t.height >= 0) t.bottom = t.top + t.height;
        else {
            if (!(tt(t.bottom) && t.bottom >= t.top)) return null;
            t.height = t.bottom - t.top
        }
        return t
    }

    function Yt(t) {
        return tt(t) ? {
            value: t,
            isRatio: !1
        } : "string" == typeof t ? function (t) {
            var e = /^(.+?)(%)?$/.exec(t),
                n = void 0,
                r = void 0;
            return e && tt(n = parseFloat(e[1])) ? {
                value: (r = !(!e[2] || !n)) ? n / 100 : n,
                isRatio: r
            } : null
        }(t.replace(/\s/g, "")) : null
    }

    function Lt(t) {
        return t.isRatio ? 100 * t.value + "%" : t.value
    }

    function At(t, e, n) {
        return "number" == typeof t ? t : e + t.value * (t.isRatio ? n : 1)
    }

    function Ft(t) {
        if (!Q(t)) return null;
        var e = void 0;
        if (!(e = Yt(t.left)) && !(e = Yt(t.x))) return null;
        if (t.left = t.x = e, !(e = Yt(t.top)) && !(e = Yt(t.y))) return null;
        if (t.top = t.y = e, (e = Yt(t.width)) && e.value >= 0) t.width = e, delete t.right;
        else {
            if (!(e = Yt(t.right))) return null;
            t.right = e, delete t.width
        }
        if ((e = Yt(t.height)) && e.value >= 0) t.height = e, delete t.bottom;
        else {
            if (!(e = Yt(t.bottom))) return null;
            t.bottom = e, delete t.height
        }
        return t
    }

    function Wt(t) {
        return Object.keys(t).reduce(function (e, n) {
            return e[n] = Lt(t[n]), e
        }, {})
    }

    function jt(t, e) {
        var n = {
                left: "x",
                right: "x",
                x: "x",
                width: "x",
                top: "y",
                bottom: "y",
                y: "y",
                height: "y"
            },
            r = {
                x: e.left,
                y: e.top
            },
            o = {
                x: e.width,
                y: e.height
            };
        return Xt(Object.keys(t).reduce(function (e, i) {
            return e[i] = At(t[i], "width" === i || "height" === i ? 0 : r[n[i]], o[n[i]]), e
        }, {}))
    }

    function Rt(t, e) {
        var n = t.getBoundingClientRect(),
            r = {
                left: n.left,
                top: n.top,
                width: n.width,
                height: n.height
            };
        if (r.left += window.pageXOffset, r.top += window.pageYOffset, e) {
            var o = window.getComputedStyle(t, ""),
                i = parseFloat(o.borderTopWidth) || 0,
                a = parseFloat(o.borderRightWidth) || 0,
                l = parseFloat(o.borderBottomWidth) || 0,
                u = parseFloat(o.borderLeftWidth) || 0;
            r.left += u, r.top += i, r.width -= u + a, r.height -= i + l
        }
        return Xt(r)
    }

    function Mt(t, e) {
        null == ut && (!1 !== ht && (ut = P.getValue("cursor", ht)), null == ut && (ut = !1)), t.style.cursor = !1 === ut ? e : ut
    }

    function zt(t) {
        null == st && (!1 !== mt && (st = P.getValue("cursor", mt)), null == st && (st = !1)), !1 !== st && (t.style.cursor = st)
    }

    function Nt(t, e, n) {
        var r = t.svgPoint;
        return r.x = e, r.y = n, r.matrixTransform(t.svgCtmElement.getScreenCTM().inverse())
    }

    function Vt(t, e) {
        var n = t.elementBBox;
        if (e.left !== n.left || e.top !== n.top) {
            var r = t.htmlOffset;
            return t.elementStyle[ft] = "translate(" + (e.left + r.left) + "px, " + (e.top + r.top) + "px)", !0
        }
        return !1
    }

    function Gt(t, e) {
        var n = t.elementBBox,
            r = t.elementStyle,
            o = t.htmlOffset,
            i = !1;
        return e.left !== n.left && (r.left = e.left + o.left + "px", i = !0), e.top !== n.top && (r.top = e.top + o.top + "px", i = !0), i
    }

    function qt(t, e) {
        var n = t.elementBBox;
        if (e.left !== n.left || e.top !== n.top) {
            var r = t.svgOffset,
                o = t.svgOriginBBox,
                i = Nt(t, e.left - window.pageXOffset, e.top - window.pageYOffset);
            return t.svgTransform.setTranslate(i.x + r.x - o.x, i.y + r.y - o.y), !0
        }
        return !1
    }

    function Ut(t, e, n) {
        var r = t.elementBBox;

        function o() {
            t.minLeft >= t.maxLeft ? e.left = r.left : e.left < t.minLeft ? e.left = t.minLeft : e.left > t.maxLeft && (e.left = t.maxLeft), t.minTop >= t.maxTop ? e.top = r.top : e.top < t.minTop ? e.top = t.minTop : e.top > t.maxTop && (e.top = t.maxTop)
        }
        if (o(), n) {
            if (!1 === n(e)) return !1;
            o()
        }
        var i = t.moveElm(t, e);
        return i && (t.elementBBox = Xt({
            left: e.left,
            top: e.top,
            width: r.width,
            height: r.height
        })), i
    }

    function Zt(t) {
        var e = t.element,
            n = t.elementStyle,
            r = Rt(e),
            o = ["display", "marginTop", "marginBottom", "width", "height"];
        o.unshift(ft);
        var i = n[ct];
        n[ct] = "none";
        var a = Rt(e);
        t.orgStyle ? o.forEach(function (e) {
            null != t.lastStyle[e] && n[e] !== t.lastStyle[e] || (n[e] = t.orgStyle[e])
        }) : (t.orgStyle = o.reduce(function (t, e) {
            return t[e] = n[e] || "", t
        }, {}), t.lastStyle = {});
        var l = Rt(e),
            u = window.getComputedStyle(e, "");
        "inline" === u.display && (n.display = "inline-block", ["Top", "Bottom"].forEach(function (t) {
            var e = parseFloat(u["padding" + t]);
            n["margin" + t] = e ? "-" + e + "px" : "0"
        })), n[ft] = "translate(0, 0)";
        var s = Rt(e),
            d = t.htmlOffset = {
                left: s.left ? -s.left : 0,
                top: s.top ? -s.top : 0
            };
        return n[ft] = "translate(" + (r.left + d.left) + "px, " + (r.top + d.top) + "px)", ["width", "height"].forEach(function (r) {
            s[r] !== l[r] && (n[r] = l[r] + "px", (s = Rt(e))[r] !== l[r] && (n[r] = l[r] - (s[r] - l[r]) + "px")), t.lastStyle[r] = n[r]
        }), e.offsetWidth, n[ct] = i, a.left === r.left && a.top === r.top || (n[ft] = "translate(" + (a.left + d.left) + "px, " + (a.top + d.top) + "px)"), a
    }

    function $t(t) {
        var e = t.element,
            n = t.elementStyle,
            r = Rt(e),
            o = ["position", "marginTop", "marginRight", "marginBottom", "marginLeft", "width", "height"],
            i = n[ct];
        n[ct] = "none";
        var a = Rt(e);
        t.orgStyle ? o.forEach(function (e) {
            null != t.lastStyle[e] && n[e] !== t.lastStyle[e] || (n[e] = t.orgStyle[e])
        }) : (t.orgStyle = o.reduce(function (t, e) {
            return t[e] = n[e] || "", t
        }, {}), t.lastStyle = {});
        var l = Rt(e);
        n.position = "absolute", n.left = n.top = n.margin = "0";
        var u = Rt(e),
            s = t.htmlOffset = {
                left: u.left ? -u.left : 0,
                top: u.top ? -u.top : 0
            };
        return n.left = r.left + s.left + "px", n.top = r.top + s.top + "px", ["width", "height"].forEach(function (r) {
            u[r] !== l[r] && (n[r] = l[r] + "px", (u = Rt(e))[r] !== l[r] && (n[r] = l[r] - (u[r] - l[r]) + "px")), t.lastStyle[r] = n[r]
        }), e.offsetWidth, n[ct] = i, a.left === r.left && a.top === r.top || (n.left = a.left + s.left + "px", n.top = a.top + s.top + "px"), a
    }

    function Jt(t) {
        var e = t.element,
            n = t.svgTransform,
            r = e.getBoundingClientRect(),
            o = Rt(e);
        n.setTranslate(0, 0);
        var i = t.svgOriginBBox = e.getBBox(),
            a = e.getBoundingClientRect(),
            l = Nt(t, a.left, a.top),
            u = t.svgOffset = {
                x: i.x - l.x,
                y: i.y - l.y
            },
            s = Nt(t, r.left, r.top);
        return n.setTranslate(s.x + u.x - i.x, s.y + u.y - i.y), o
    }

    function Kt(t, e) {
        var n = Rt(document.documentElement),
            r = t.elementBBox = t.initElm(t),
            o = t.containmentBBox = t.containmentIsBBox ? jt(t.options.containment, n) || n : Rt(t.options.containment, !0);
        if (t.minLeft = o.left, t.maxLeft = o.right - r.width, t.minTop = o.top, t.maxTop = o.bottom - r.height, Ut(t, {
                left: r.left,
                top: r.top
            }), t.parsedSnapTargets) {
            var i = {
                    x: r.width,
                    y: r.height
                },
                a = {
                    x: t.minLeft,
                    y: t.minTop
                },
                l = {
                    x: t.maxLeft,
                    y: t.maxTop
                },
                u = {
                    left: "x",
                    right: "x",
                    x: "x",
                    width: "x",
                    xStart: "x",
                    xEnd: "x",
                    xStep: "x",
                    top: "y",
                    bottom: "y",
                    y: "y",
                    height: "y",
                    yStart: "y",
                    yEnd: "y",
                    yStep: "y"
                },
                s = t.parsedSnapTargets.reduce(function (t, e) {
                    var s = "containment" === e.base ? o : n,
                        d = {
                            x: s.left,
                            y: s.top
                        },
                        c = {
                            x: s.width,
                            y: s.height
                        };

                    function f(n) {
                        if (null == n.center && (n.center = e.center), null == n.xGravity && (n.xGravity = e.gravity), null == n.yGravity && (n.yGravity = e.gravity), null != n.x && null != n.y) n.x = At(n.x, d.x, c.x), n.y = At(n.y, d.y, c.y), n.center && (n.x -= i.x / 2, n.y -= i.y / 2, n.corners = ["tl"]), (n.corners || e.corners).forEach(function (e) {
                            var r = n.x - ("tr" === e || "br" === e ? i.x : 0),
                                o = n.y - ("bl" === e || "br" === e ? i.y : 0);
                            if (r >= a.x && r <= l.x && o >= a.y && o <= l.y) {
                                var u = {
                                        x: r,
                                        y: o
                                    },
                                    s = r - n.xGravity,
                                    d = r + n.xGravity,
                                    c = o - n.yGravity,
                                    f = o + n.yGravity;
                                s > a.x && (u.gravityXStart = s), d < l.x && (u.gravityXEnd = d), c > a.y && (u.gravityYStart = c), f < l.y && (u.gravityYEnd = f), t.push(u)
                            }
                        });
                        else {
                            var r = null != n.x ? "x" : "y",
                                o = "x" === r ? "y" : "x",
                                u = o + "Start",
                                s = o + "End",
                                f = r + "Gravity",
                                p = r.toUpperCase(),
                                v = o.toUpperCase(),
                                h = "gravity" + p + "Start",
                                m = "gravity" + p + "End",
                                g = "gravity" + v + "Start",
                                y = "gravity" + v + "End";
                            if (n[r] = At(n[r], d[r], c[r]), n[u] = At(n[u], d[o], c[o]), n[s] = At(n[s], d[o], c[o]) - i[o], n[u] > n[s] || n[u] > l[o] || n[s] < a[o]) return;
                            n.center && (n[r] -= i[r] / 2, n.sides = ["start"]), (n.sides || e.sides).forEach(function (e) {
                                var d = n[r] - ("end" === e ? i[r] : 0);
                                if (d >= a[r] && d <= l[r]) {
                                    var c = {},
                                        p = d - n[f],
                                        v = d + n[f];
                                    c[r] = d, p > a[r] && (c[h] = p), v < l[r] && (c[m] = v), n[u] > a[o] && (c[g] = n[u]), n[s] < l[o] && (c[y] = n[s]), t.push(c)
                                }
                            })
                        }
                    }
                    var p = void 0;
                    if ((p = e.element ? Rt(e.element) : null) || e.ppBBox) e.ppBBox && (p = jt(e.ppBBox, s)), p && e.edges.forEach(function (t) {
                        var n = e.gravity,
                            o = e.gravity;
                        "outside" === t && (n += r.width, o += r.height);
                        var i = p.left - n,
                            a = p.right + n,
                            l = p.top - o,
                            u = p.bottom + o,
                            s = "inside" === t ? "start" : "end";
                        f({
                            xStart: i,
                            xEnd: a,
                            y: p.top,
                            sides: [s],
                            center: !1
                        }), f({
                            x: p.left,
                            yStart: l,
                            yEnd: u,
                            sides: [s],
                            center: !1
                        }), s = "inside" === t ? "end" : "start", f({
                            xStart: i,
                            xEnd: a,
                            y: p.bottom,
                            sides: [s],
                            center: !1
                        }), f({
                            x: p.right,
                            yStart: l,
                            yEnd: u,
                            sides: [s],
                            center: !1
                        })
                    });
                    else {
                        var v = [
                            ["x", "y", "xStart", "xEnd", "xStep", "yStart", "yEnd", "yStep"].reduce(function (t, n) {
                                return e[n] && (t[n] = At(e[n], "xStep" === n || "yStep" === n ? 0 : d[u[n]], c[u[n]])), t
                            }, {})
                        ];
                        ["x", "y"].forEach(function (t) {
                            var n = t + "Start",
                                r = t + "End",
                                o = t + "Step",
                                i = t + "Gravity";
                            v = v.reduce(function (a, l) {
                                var u = l[n],
                                    s = l[r],
                                    d = l[o];
                                if (null != u && null != s && u >= s) return a;
                                if (null != d) {
                                    if (d < 2) return a;
                                    var c = d / 2;
                                    c = e.gravity > c ? c : null;
                                    for (var f = u; f <= s; f += d) {
                                        var p = Object.keys(l).reduce(function (t, e) {
                                            return e !== n && e !== r && e !== o && (t[e] = l[e]), t
                                        }, {});
                                        p[t] = f, p[i] = c, a.push(p)
                                    }
                                } else a.push(l);
                                return a
                            }, [])
                        }), v.forEach(function (t) {
                            f(t)
                        })
                    }
                    return t
                }, []);
            t.snapTargets = s.length ? s : null
        }
        var d = {},
            c = t.options.autoScroll;
        if (c) {
            d.isWindow = c.target === window, d.target = c.target;
            var f = "scroll" === e,
                p = function (t, e, n) {
                    var r = {},
                        o = void 0,
                        i = void 0,
                        a = void 0;
                    ! function (t) {
                        r.clientWidth = t.clientWidth, r.clientHeight = t.clientHeight
                    }(e ? document.documentElement : t);
                    var l = 0,
                        u = 0;
                    if (!n) {
                        var s = void 0,
                            d = void 0;
                        e ? (s = kt(t, "x"), d = kt(t, "y"), o = getComputedStyle(document.documentElement, ""), i = getComputedStyle(document.body, ""), l = kt(t, "x", document.documentElement.scrollWidth + r.clientWidth + ["marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"].reduce(function (t, e) {
                            return t + (parseFloat(o[e]) || 0) + (parseFloat(i[e]) || 0)
                        }, 0)), u = kt(t, "y", document.documentElement.scrollHeight + r.clientHeight + ["marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"].reduce(function (t, e) {
                            return t + (parseFloat(o[e]) || 0) + (parseFloat(i[e]) || 0)
                        }, 0)), kt(t, "x", s), kt(t, "y", d)) : (s = Pt(t, "x"), d = Pt(t, "y"), a = getComputedStyle(t, ""), l = Pt(t, "x", t.scrollWidth + r.clientWidth + ["marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"].reduce(function (t, e) {
                            return t + (parseFloat(a[e]) || 0)
                        }, 0)), u = Pt(t, "y", t.scrollHeight + r.clientHeight + ["marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"].reduce(function (t, e) {
                            return t + (parseFloat(a[e]) || 0)
                        }, 0)), Pt(t, "x", s), Pt(t, "y", d))
                    }
                    r.scrollWidth = r.clientWidth + l, r.scrollHeight = r.clientHeight + u;
                    var c = void 0;
                    return e ? r.clientX = r.clientY = 0 : (c = t.getBoundingClientRect(), a || (a = getComputedStyle(t, "")), r.clientX = c.left + (parseFloat(a.borderLeftWidth) || 0), r.clientY = c.top + (parseFloat(a.borderTopWidth) || 0)), r
                }(c.target, d.isWindow, f),
                v = Xt({
                    left: p.clientX,
                    top: p.clientY,
                    width: p.clientWidth,
                    height: p.clientHeight
                });
            f ? t.autoScroll && (d.scrollWidth = t.autoScroll.scrollWidth, d.scrollHeight = t.autoScroll.scrollHeight) : (d.scrollWidth = p.scrollWidth, d.scrollHeight = p.scrollHeight), [
                ["X", "Width", "left", "right"],
                ["Y", "Height", "top", "bottom"]
            ].forEach(function (t) {
                var e = t[0],
                    n = t[1],
                    o = t[2],
                    i = t[3],
                    a = (d["scroll" + n] || 0) - p["client" + n],
                    l = c["min" + e] || 0,
                    u = tt(c["max" + e]) ? c["max" + e] : a;
                if (l < u && l < a) {
                    u > a && (u = a);
                    for (var s = [], f = r[n.toLowerCase()], h = c.sensitivity.length - 1; h >= 0; h--) {
                        var m = c.sensitivity[h],
                            g = c.speed[h];
                        s.push({
                            dir: -1,
                            speed: g,
                            position: v[o] + m
                        }), s.push({
                            dir: 1,
                            speed: g,
                            position: v[i] - m - f
                        })
                    }
                    d[e.toLowerCase()] = {
                        min: l,
                        max: u,
                        lines: s
                    }
                }
            })
        }
        t.autoScroll = d.x || d.y ? d : null
    }

    function Qt(t) {
        wt.stop(), Mt(t.options.handle, t.orgCursor), lt.style.cursor = dt, !1 !== t.options.zIndex && (t.elementStyle.zIndex = t.orgZIndex), pt && (lt.style[pt] = vt);
        var e = X(t.element);
        xt && e.remove(xt), yt && e.remove(yt), it = null, rt.cancel(), t.onDragEnd && t.onDragEnd({
            left: t.elementBBox.left,
            top: t.elementBBox.top
        })
    }

    function te(t, e) {
        var n = t.options,
            r = void 0;
        if (e.containment) {
            var o = void 0;
            Dt(e.containment) ? e.containment !== n.containment && (n.containment = e.containment, t.containmentIsBBox = !1, r = !0) : (o = Ft(It(e.containment))) && _t(o, n.containment) && (n.containment = o, t.containmentIsBBox = !0, r = !0)
        }

        function i(t, e) {
            function n(t) {
                return "string" == typeof t ? t.replace(/[, ]+/g, " ").trim().toLowerCase() : null
            }
            tt(e.gravity) && e.gravity > 0 && (t.gravity = e.gravity);
            var r = n(e.corner);
            if (r) {
                if ("all" !== r) {
                    var o = {},
                        i = r.split(/\s/).reduce(function (t, e) {
                            return (e = "tl" === (e = e.trim().replace(/^(.).*?-(.).*$/, "$1$2")) || "lt" === e ? "tl" : "tr" === e || "rt" === e ? "tr" : "bl" === e || "lb" === e ? "bl" : "br" === e || "rb" === e ? "br" : null) && !o[e] && (t.push(e), o[e] = !0), t
                        }, []),
                        a = i.length;
                    r = a ? 4 === a ? "all" : i.join(" ") : null
                }
                r && (t.corner = r)
            }
            var l = n(e.side);
            l && ("start" === l || "end" === l || "both" === l ? t.side = l : "start end" !== l && "end start" !== l || (t.side = "both")), "boolean" == typeof e.center && (t.center = e.center);
            var u = n(e.edge);
            u && ("inside" === u || "outside" === u || "both" === u ? t.edge = u : "inside outside" !== u && "outside inside" !== u || (t.edge = "both"));
            var s = "string" == typeof e.base ? e.base.trim().toLowerCase() : null;
            return !s || "containment" !== s && "document" !== s || (t.base = s), t
        }
        if (null != e.snap) {
            var a = Q(e.snap) && null != e.snap.targets ? e.snap : {
                    targets: e.snap
                },
                l = [],
                u = i({
                    targets: l
                }, a);
            u.gravity || (u.gravity = F), u.corner || (u.corner = W), u.side || (u.side = j), "boolean" != typeof u.center && (u.center = !1), u.edge || (u.edge = R), u.base || (u.base = M);
            var s = (Array.isArray(a.targets) ? a.targets : [a.targets]).reduce(function (t, e) {
                if (null == e) return t;
                var n = Dt(e),
                    r = Ft(It(e)),
                    o = n || r ? {
                        boundingBox: e
                    } : Q(e) && null == e.start && null == e.end && null == e.step ? e : {
                        x: e,
                        y: e
                    },
                    a = [],
                    s = {},
                    d = o.boundingBox,
                    c = void 0;
                if (n || Dt(d)) a.push({
                    element: d
                }), s.boundingBox = d;
                else if (c = r || Ft(It(d))) a.push({
                    ppBBox: c
                }), s.boundingBox = Wt(c);
                else {
                    var f = void 0,
                        p = ["x", "y"].reduce(function (t, e) {
                            var n, r = o[e];
                            if (n = Yt(r)) t[e] = n, s[e] = Lt(n);
                            else {
                                var i = void 0,
                                    a = void 0,
                                    l = void 0;
                                Q(r) && (i = Yt(r.start), a = Yt(r.end), l = Yt(r.step), i && a && i.isRatio === a.isRatio && i.value >= a.value && (f = !0)), i = t[e + "Start"] = i || {
                                    value: 0,
                                    isRatio: !1
                                }, a = t[e + "End"] = a || {
                                    value: 1,
                                    isRatio: !0
                                }, s[e] = {
                                    start: Lt(i),
                                    end: Lt(a)
                                }, l && ((l.isRatio ? l.value > 0 : l.value >= 2) ? (t[e + "Step"] = l, s[e].step = Lt(l)) : f = !0)
                            }
                            return t
                        }, {});
                    if (f) return t;
                    p.xStart && !p.xStep && p.yStart && !p.yStep ? a.push({
                        xStart: p.xStart,
                        xEnd: p.xEnd,
                        y: p.yStart
                    }, {
                        xStart: p.xStart,
                        xEnd: p.xEnd,
                        y: p.yEnd
                    }, {
                        x: p.xStart,
                        yStart: p.yStart,
                        yEnd: p.yEnd
                    }, {
                        x: p.xEnd,
                        yStart: p.yStart,
                        yEnd: p.yEnd
                    }) : a.push(p)
                }
                if (a.length) {
                    l.push(i(s, o));
                    var v = s.corner || u.corner,
                        h = s.side || u.side,
                        m = s.edge || u.edge,
                        g = {
                            gravity: s.gravity || u.gravity,
                            base: s.base || u.base,
                            center: "boolean" == typeof s.center ? s.center : u.center,
                            corners: "all" === v ? z : v.split(" "),
                            sides: "both" === h ? N : [h],
                            edges: "both" === m ? V : [m]
                        };
                    a.forEach(function (e) {
                        ["gravity", "corners", "sides", "center", "edges", "base"].forEach(function (t) {
                            e[t] = g[t]
                        }), t.push(e)
                    })
                }
                return t
            }, []);
            s.length && (n.snap = u, _t(s, t.parsedSnapTargets) && (t.parsedSnapTargets = s, r = !0))
        } else e.hasOwnProperty("snap") && t.parsedSnapTargets && (n.snap = t.parsedSnapTargets = t.snapTargets = void 0);
        if (e.autoScroll) {
            var d = Q(e.autoScroll) ? e.autoScroll : {
                    target: !0 === e.autoScroll ? window : e.autoScroll
                },
                c = {};
            c.target = Dt(d.target) ? d.target : window, c.speed = [], (Array.isArray(d.speed) ? d.speed : [d.speed]).every(function (t, e) {
                return !!(e <= 2 && tt(t)) && (c.speed[e] = t, !0)
            }), c.speed.length || (c.speed = G);
            var f = Array.isArray(d.sensitivity) ? d.sensitivity : [d.sensitivity];
            c.sensitivity = c.speed.map(function (t, e) {
                return tt(f[e]) ? f[e] : q[e]
            }), ["X", "Y"].forEach(function (t) {
                var e = "min" + t,
                    n = "max" + t;
                tt(d[e]) && d[e] >= 0 && (c[e] = d[e]), tt(d[n]) && d[n] >= 0 && (!c[e] || d[n] >= c[e]) && (c[n] = d[n])
            }), _t(c, n.autoScroll) && (n.autoScroll = c, r = !0)
        } else e.hasOwnProperty("autoScroll") && (n.autoScroll && (r = !0), n.autoScroll = void 0);
        if (r && Kt(t), Dt(e.handle) && e.handle !== n.handle) {
            n.handle && (n.handle.style.cursor = t.orgCursor, pt && (n.handle.style[pt] = t.orgUserSelect), rt.removeStartHandler(n.handle, t.pointerEventHandlerId));
            var p = n.handle = e.handle;
            t.orgCursor = p.style.cursor, Mt(p, t.orgCursor), pt && (t.orgUserSelect = p.style[pt], p.style[pt] = "none"), rt.addStartHandler(p, t.pointerEventHandlerId)
        }(tt(e.zIndex) || !1 === e.zIndex) && (n.zIndex = e.zIndex, t === it && (t.elementStyle.zIndex = !1 === n.zIndex ? t.orgZIndex : n.zIndex));
        var v = {
                left: t.elementBBox.left,
                top: t.elementBBox.top
            },
            h = void 0;
        tt(e.left) && e.left !== v.left && (v.left = e.left, h = !0), tt(e.top) && e.top !== v.top && (v.top = e.top, h = !0), h && Ut(t, v), ["onDrag", "onMove", "onDragStart", "onMoveStart", "onDragEnd"].forEach(function (r) {
            "function" == typeof e[r] ? (n[r] = e[r], t[r] = n[r].bind(t.ins)) : e.hasOwnProperty(r) && null == e[r] && (n[r] = t[r] = void 0)
        })
    }
    wt.move = function (t, e, n) {
        St.call(window, Ht), Et(), Ct === t && (e.x && Bt.x && (e.x.lastValue = Bt.x.lastValue), e.y && Bt.y && (e.y.lastValue = Bt.y.lastValue)), Ct = t, Bt = e, Ot = n;
        var r = Date.now();
        ["x", "y"].forEach(function (t) {
            var e = Bt[t];
            e && (e.lastFrameTime = r)
        }), Ht = bt.call(window, Tt)
    }, wt.stop = function () {
        St.call(window, Ht), Et(), Bt = {}, Ct = null
    };
    var ee = function () {
        function t(e, n) {
            ! function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var r = {
                ins: this,
                options: {
                    zIndex: A
                },
                disabled: !1
            };
            if (Object.defineProperty(this, "_id", {
                    value: ++ot
                }), r._id = this._id, et[this._id] = r, !Dt(e) || e === lt) throw new Error("This element is not accepted.");
            if (n) {
                if (!Q(n)) throw new Error("Invalid options.")
            } else n = {};
            var o = !0,
                i = void 0;
            if (e instanceof SVGElement && (i = e.ownerSVGElement)) {
                if (!e.getBBox) throw new Error("This element is not accepted. (SVGLocatable)");
                if (!e.transform) throw new Error("This element is not accepted. (SVGAnimatedTransformList)");
                r.svgTransform = e.transform.baseVal.appendItem(i.createSVGTransform()), r.svgPoint = i.createSVGPoint();
                var a = e.nearestViewportElement;
                r.svgCtmElement = $ ? a.appendChild(document.createElementNS(i.namespaceURI, "rect")) : a, o = !1, r.initElm = Jt, r.moveElm = qt
            } else {
                var l = P.getName("willChange");
                l && (o = !1), !n.leftTop && ft ? (l && (e.style[l] = "transform"), r.initElm = Zt, r.moveElm = Vt) : (l && (e.style[l] = "left, top"), r.initElm = $t, r.moveElm = Gt)
            }
            if (r.element = function (t, e) {
                    var n = t.style;
                    n.webkitTapHighlightColor = "transparent";
                    var r = P.getName("boxShadow"),
                        o = window.getComputedStyle(t, "")[r];
                    return o && "none" !== o || (n[r] = "0 0 1px transparent"), e && ft && (n[ft] = "translateZ(0)"), t
                }(e, o), r.elementStyle = e.style, r.orgZIndex = r.elementStyle.zIndex, gt && X(e).add(gt), r.pointerEventHandlerId = rt.regStartHandler(function (t) {
                    return function (t, e) {
                        return !(t.disabled || t.onDragStart && !1 === t.onDragStart(e) || (it && Qt(it), zt(t.options.handle), lt.style.cursor = st || window.getComputedStyle(t.options.handle, "").cursor, !1 !== t.options.zIndex && (t.elementStyle.zIndex = t.options.zIndex), pt && (lt.style[pt] = "none"), yt && X(t.element).add(yt), it = t, at = !1, nt.left = t.elementBBox.left - (e.clientX + window.pageXOffset), nt.top = t.elementBBox.top - (e.clientY + window.pageYOffset), 0))
                    }(r, t)
                }), !n.containment) {
                var u;
                n.containment = (u = e.parentNode) && Dt(u) ? u : lt
            }
            n.handle || (n.handle = e), te(r, n)
        }
        return Y(t, [{
            key: "remove",
            value: function () {
                var t = et[this._id];
                this.disabled = !0, rt.unregStartHandler(rt.removeStartHandler(t.options.handle, t.pointerEventHandlerId)), delete et[this._id]
            }
        }, {
            key: "setOptions",
            value: function (t) {
                return Q(t) && te(et[this._id], t), this
            }
        }, {
            key: "position",
            value: function () {
                return Kt(et[this._id]), this
            }
        }, {
            key: "disabled",
            get: function () {
                return et[this._id].disabled
            },
            set: function (t) {
                var e = et[this._id];
                (t = !!t) !== e.disabled && (e.disabled = t, e.disabled ? (e === it && Qt(e), e.options.handle.style.cursor = e.orgCursor, pt && (e.options.handle.style[pt] = e.orgUserSelect), gt && X(e.element).remove(gt)) : (Mt(e.options.handle, e.orgCursor), pt && (e.options.handle.style[pt] = "none"), gt && X(e.element).add(gt)))
            }
        }, {
            key: "element",
            get: function () {
                return et[this._id].element
            }
        }, {
            key: "rect",
            get: function () {
                return It(et[this._id].elementBBox)
            }
        }, {
            key: "left",
            get: function () {
                return et[this._id].elementBBox.left
            },
            set: function (t) {
                te(et[this._id], {
                    left: t
                })
            }
        }, {
            key: "top",
            get: function () {
                return et[this._id].elementBBox.top
            },
            set: function (t) {
                te(et[this._id], {
                    top: t
                })
            }
        }, {
            key: "containment",
            get: function () {
                var t = et[this._id];
                return t.containmentIsBBox ? Wt(t.options.containment) : t.options.containment
            },
            set: function (t) {
                te(et[this._id], {
                    containment: t
                })
            }
        }, {
            key: "snap",
            get: function () {
                return It(et[this._id].options.snap)
            },
            set: function (t) {
                te(et[this._id], {
                    snap: t
                })
            }
        }, {
            key: "autoScroll",
            get: function () {
                return It(et[this._id].options.autoScroll)
            },
            set: function (t) {
                te(et[this._id], {
                    autoScroll: t
                })
            }
        }, {
            key: "handle",
            get: function () {
                return et[this._id].options.handle
            },
            set: function (t) {
                te(et[this._id], {
                    handle: t
                })
            }
        }, {
            key: "zIndex",
            get: function () {
                return et[this._id].options.zIndex
            },
            set: function (t) {
                te(et[this._id], {
                    zIndex: t
                })
            }
        }, {
            key: "onDrag",
            get: function () {
                return et[this._id].options.onDrag
            },
            set: function (t) {
                te(et[this._id], {
                    onDrag: t
                })
            }
        }, {
            key: "onMove",
            get: function () {
                return et[this._id].options.onMove
            },
            set: function (t) {
                te(et[this._id], {
                    onMove: t
                })
            }
        }, {
            key: "onDragStart",
            get: function () {
                return et[this._id].options.onDragStart
            },
            set: function (t) {
                te(et[this._id], {
                    onDragStart: t
                })
            }
        }, {
            key: "onMoveStart",
            get: function () {
                return et[this._id].options.onMoveStart
            },
            set: function (t) {
                te(et[this._id], {
                    onMoveStart: t
                })
            }
        }, {
            key: "onDragEnd",
            get: function () {
                return et[this._id].options.onDragEnd
            },
            set: function (t) {
                te(et[this._id], {
                    onDragEnd: t
                })
            }
        }], [{
            key: "draggableCursor",
            get: function () {
                return ht
            },
            set: function (t) {
                ht !== t && (ht = t, ut = null, Object.keys(et).forEach(function (t) {
                    var e = et[t];
                    e.disabled || e === it && !1 !== st || (Mt(e.options.handle, e.orgCursor), e === it && (lt.style.cursor = dt, lt.style.cursor = window.getComputedStyle(e.options.handle, "").cursor))
                }))
            }
        }, {
            key: "draggingCursor",
            get: function () {
                return mt
            },
            set: function (t) {
                mt !== t && (mt = t, st = null, it && (zt(it.options.handle), !1 === st && (Mt(it.options.handle, it.orgCursor), lt.style.cursor = dt), lt.style.cursor = st || window.getComputedStyle(it.options.handle, "").cursor))
            }
        }, {
            key: "draggableClass",
            get: function () {
                return gt
            },
            set: function (t) {
                (t = t ? t + "" : void 0) !== gt && (Object.keys(et).forEach(function (e) {
                    var n = et[e];
                    if (!n.disabled) {
                        var r = X(n.element);
                        gt && r.remove(gt), t && r.add(t)
                    }
                }), gt = t)
            }
        }, {
            key: "draggingClass",
            get: function () {
                return yt
            },
            set: function (t) {
                if ((t = t ? t + "" : void 0) !== yt) {
                    if (it) {
                        var e = X(it.element);
                        yt && e.remove(yt), t && e.add(t)
                    }
                    yt = t
                }
            }
        }, {
            key: "movingClass",
            get: function () {
                return xt
            },
            set: function (t) {
                if ((t = t ? t + "" : void 0) !== xt) {
                    if (it && at) {
                        var e = X(it.element);
                        xt && e.remove(xt), t && e.add(t)
                    }
                    xt = t
                }
            }
        }]), t
    }();
    rt.addMoveHandler(document, function (t) {
        if (it) {
            var e = {
                left: t.clientX + window.pageXOffset + nt.left,
                top: t.clientY + window.pageYOffset + nt.top
            };
            if (Ut(it, e, it.snapTargets ? function (t) {
                    var e = it.snapTargets.length,
                        n = !1,
                        r = !1,
                        o = void 0;
                    for (o = 0; o < e && (!n || !r); o++) {
                        var i = it.snapTargets[o];
                        (null == i.gravityXStart || t.left >= i.gravityXStart) && (null == i.gravityXEnd || t.left <= i.gravityXEnd) && (null == i.gravityYStart || t.top >= i.gravityYStart) && (null == i.gravityYEnd || t.top <= i.gravityYEnd) && (n || null == i.x || (t.left = i.x, n = !0, o = -1), r || null == i.y || (t.top = i.y, r = !0, o = -1))
                    }
                    return t.snapped = n || r, !it.onDrag || it.onDrag(t)
                } : it.onDrag)) {
                var n = {},
                    r = it.autoScroll;
                if (r) {
                    var o = {
                        x: it.elementBBox.left - window.pageXOffset,
                        y: it.elementBBox.top - window.pageYOffset
                    };
                    ["x", "y"].forEach(function (t) {
                        if (r[t]) {
                            var e = r[t].min,
                                i = r[t].max;
                            r[t].lines.some(function (r) {
                                return (-1 === r.dir ? o[t] <= r.position : o[t] >= r.position) && (n[t] = {
                                    dir: r.dir,
                                    speed: r.speed / 1e3,
                                    min: e,
                                    max: i
                                }, !0)
                            })
                        }
                    })
                }
                n.x || n.y ? (wt.move(r.target, n, r.isWindow ? kt : Pt), e.autoScroll = !0) : wt.stop(), at || (at = !0, xt && X(it.element).add(xt), it.onMoveStart && it.onMoveStart(e)), it.onMove && it.onMove(e)
            }
        }
    });
    var ne = function () {
        it && Qt(it)
    };
    rt.addEndHandler(document, ne), rt.addCancelHandler(document, ne);
    var re = function () {
        ct = P.getName("transitionProperty"), ft = P.getName("transform"), dt = lt.style.cursor, (pt = P.getName("userSelect")) && (vt = lt.style[pt]);
        var t = {},
            e = void 0;

        function n(t, e) {
            t.initElm && Kt(t, e)
        }
        var r = !1,
            o = c.add(function (o) {
                r || (r = !0, it && (n(it, o.type), rt.move(), t[it._id] = !0), clearTimeout(e), e = setTimeout(function () {
                    ! function (r) {
                        clearTimeout(e), Object.keys(et).forEach(function (e) {
                            t[e] || n(et[e], r)
                        }), t = {}
                    }(o.type)
                }, 200), r = !1)
            });
        window.addEventListener("resize", o, !0), window.addEventListener("scroll", o, !0)
    };
    (lt = document.body) ? re(): document.addEventListener("DOMContentLoaded", function () {
        lt = document.body, re()
    }, !0);
    e.default = ee
}]).default;