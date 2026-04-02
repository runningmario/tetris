(function () {
    var k, aa = aa || {}, m = this, n = function (a) {
        return void 0 !== a
    }, p = function () {
    }, ca = function (a) {
        a.ma = function () {
            return a.bc ? a.bc : a.bc = new a
        }
    }, da = function (a) {
        var b = typeof a;
        if ("object" == b) if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null"; else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }, ea = function (a) {
        return "array" == da(a)
    }, fa = function (a) {
        var b = da(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, r = function (a) {
        return "string" == typeof a
    }, ga = function (a) {
        return "number" == typeof a
    }, t = function (a) {
        return "function" == da(a)
    }, ha = function (a, b, c) {
        return a.call.apply(a.bind,
            arguments)
    }, ia = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, u = function (a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
        return u.apply(null, arguments)
    }, ja = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b =
                c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }, ka = Date.now || function () {
        return +new Date
    }, la = function (a, b) {
        var c = a.split("."), d = m;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) !c.length && n(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
    }, v = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.wa = b.prototype;
        a.prototype = new c;
        a.Ec = function (a, c, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[c].apply(a, g)
        }
    };
    var w = function () {
        this.W = this.W;
        this.T = this.T
    };
    w.prototype.W = !1;
    w.prototype.Yb = function () {
        this.W || (this.W = !0, this.v())
    };
    var ma = function (a, b) {
        a.W ? n(void 0) ? b.call(void 0) : b() : (a.T || (a.T = []), a.T.push(n(void 0) ? u(b, void 0) : b))
    };
    w.prototype.v = function () {
        if (this.T) for (; this.T.length;) this.T.shift()()
    };
    var na = function (a) {
        a && "function" == typeof a.Yb && a.Yb()
    };
    var oa = function (a, b, c) {
            for (var d in a) b.call(c, a[d], d, a)
        }, pa = function (a) {
            var b = [], c = 0, d;
            for (d in a) b[c++] = a[d];
            return b
        }, qa = function (a) {
            var b = [], c = 0, d;
            for (d in a) b[c++] = d;
            return b
        }, ra = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        sa = function (a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < ra.length; f++) c = ra[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var x = function (a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, x); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    v(x, Error);
    x.prototype.name = "CustomError";
    var ta = String.prototype.trim ? function (a) {
        return a.trim()
    } : function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }, ua = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var va = function (a) {
        va[" "](a);
        return a
    };
    va[" "] = p;
    var wa = Array.prototype.indexOf ? function (a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (r(a)) return r(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, xa = Array.prototype.forEach ? function (a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    }, ya = Array.prototype.some ? function (a, b, c) {
        return Array.prototype.some.call(a,
            b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = r(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    }, Aa = function (a) {
        var b;
        a:{
            b = za;
            for (var c = a.length, d = r(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
                b = e;
                break a
            }
            b = -1
        }
        return 0 > b ? null : r(a) ? a.charAt(b) : a[b]
    }, Ba = function (a) {
        return Array.prototype.concat.apply(Array.prototype, arguments)
    }, Ca = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }, Ea = function (a) {
        for (var b = Da,
                 c = [], d = 0; d < a; d++) c[d] = b;
        return c
    };
    var Fa;
    a:{
        var Ga = m.navigator;
        if (Ga) {
            var Ha = Ga.userAgent;
            if (Ha) {
                Fa = Ha;
                break a
            }
        }
        Fa = ""
    }
    var z = function (a) {
        return -1 != Fa.indexOf(a)
    };
    var Ia = function () {
        return z("Trident") || z("MSIE")
    };
    var Ja = z("Opera"), A = Ia(), Ka = z("Edge"),
        La = z("Gecko") && !(-1 != Fa.toLowerCase().indexOf("webkit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"),
        Ma = -1 != Fa.toLowerCase().indexOf("webkit") && !z("Edge"), Na = z("Macintosh"), Oa = function () {
            var a = m.document;
            return a ? a.documentMode : void 0
        }, Pa;
    a:{
        var Qa = "", Ra = function () {
            var a = Fa;
            if (La) return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Ka) return /Edge\/([\d\.]+)/.exec(a);
            if (A) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Ma) return /WebKit\/(\S+)/.exec(a);
            if (Ja) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Ra && (Qa = Ra ? Ra[1] : "");
        if (A) {
            var Sa = Oa();
            if (null != Sa && Sa > parseFloat(Qa)) {
                Pa = String(Sa);
                break a
            }
        }
        Pa = Qa
    }
    var Ta = Pa, Ua = {}, C = function (a) {
            var b;
            if (!(b = Ua[a])) {
                b = 0;
                for (var c = ta(String(Ta)).split("."), d = ta(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || "", h = d[f] || "", l = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var B = l.exec(g) || ["", "", ""], y = q.exec(h) || ["", "", ""];
                        if (0 == B[0].length && 0 == y[0].length) break;
                        b = ua(0 == B[1].length ? 0 : parseInt(B[1], 10), 0 == y[1].length ? 0 : parseInt(y[1], 10)) || ua(0 == B[2].length, 0 == y[2].length) || ua(B[2], y[2])
                    } while (0 == b)
                }
                b = Ua[a] = 0 <= b
            }
            return b
        },
        Va = m.document, Wa = Va && A ? Oa() || ("CSS1Compat" == Va.compatMode ? parseInt(Ta, 10) : 5) : void 0;
    var Xa = !A || 9 <= Number(Wa), Ya = A && !C("9");
    !Ma || C("528");
    La && C("1.9b") || A && C("8") || Ja && C("9.5") || Ma && C("528");
    La && !C("8") || A && C("9");
    var Za = function (a, b) {
        this.type = a;
        this.v = this.target = b;
        this.w = !1;
        this.hc = !0
    };
    Za.prototype.stopPropagation = function () {
        this.w = !0
    };
    Za.prototype.preventDefault = function () {
        this.hc = !1
    };
    var D = function (a, b) {
        Za.call(this, a ? a.type : "");
        this.v = this.target = null;
        this.H = this.clientY = this.clientX = 0;
        this.s = this.state = null;
        if (a) {
            this.type = a.type;
            var c = a.changedTouches ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.v = b;
            var d = a.relatedTarget;
            if (d && La) try {
                va(d.nodeName)
            } catch (e) {
            }
            null === c ? (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY) : (this.clientX = void 0 !== c.clientX ? c.clientX : c.pageX, this.clientY = void 0 !== c.clientY ? c.clientY :
                c.pageY);
            this.H = a.keyCode || 0;
            this.state = a.state;
            this.s = a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    v(D, Za);
    D.prototype.stopPropagation = function () {
        D.wa.stopPropagation.call(this);
        this.s.stopPropagation ? this.s.stopPropagation() : this.s.cancelBubble = !0
    };
    D.prototype.preventDefault = function () {
        D.wa.preventDefault.call(this);
        var a = this.s;
        if (a.preventDefault) a.preventDefault(); else if (a.returnValue = !1, Ya) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {
        }
    };
    D.prototype.R = function () {
        return this.s
    };
    var $a = "closure_listenable_" + (1E6 * Math.random() | 0), ab = function (a) {
        return !(!a || !a[$a])
    }, bb = 0;
    var db = function (a, b, c, d, e) {
        this.listener = a;
        this.s = null;
        this.src = b;
        this.type = c;
        this.Qb = !!d;
        this.Rb = e;
        this.$b = ++bb;
        this.Sa = this.Pb = !1
    }, eb = function (a) {
        a.Sa = !0;
        a.listener = null;
        a.s = null;
        a.src = null;
        a.Rb = null
    };
    var fb = function (a) {
        this.src = a;
        this.s = {};
        this.v = 0
    }, hb = function (a, b, c, d, e, f) {
        var g = b.toString();
        b = a.s[g];
        b || (b = a.s[g] = [], a.v++);
        var h = gb(b, c, e, f);
        -1 < h ? (a = b[h], d || (a.Pb = !1)) : (a = new db(c, a.src, g, !!e, f), a.Pb = d, b.push(a));
        return a
    }, ib = function (a, b) {
        var c = b.type;
        if (c in a.s) {
            var d = a.s[c], e = wa(d, b), f;
            (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
            f && (eb(b), 0 == a.s[c].length && (delete a.s[c], a.v--))
        }
    }, jb = function (a, b, c, d, e) {
        a = a.s[b.toString()];
        b = -1;
        a && (b = gb(a, c, d, e));
        return -1 < b ? a[b] : null
    }, gb = function (a, b, c, d) {
        for (var e =
            0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Sa && f.listener == b && f.Qb == !!c && f.Rb == d) return e
        }
        return -1
    };
    var kb = "closure_lm_" + (1E6 * Math.random() | 0), lb = {}, mb = 0, nb = function (a, b, c, d, e) {
            if (ea(b)) {
                for (var f = 0; f < b.length; f++) nb(a, b[f], c, d, e);
                return null
            }
            c = ob(c);
            return ab(a) ? a.listen(b, c, d, e) : pb(a, b, c, !1, d, e)
        }, pb = function (a, b, c, d, e, f) {
            if (!b) throw Error("a");
            var g = !!e, h = qb(a);
            h || (a[kb] = h = new fb(a));
            c = hb(h, b, c, d, e, f);
            if (c.s) return c;
            d = rb();
            c.s = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) a.addEventListener(b.toString(), d, g); else if (a.attachEvent) a.attachEvent(sb(b.toString()), d); else throw Error("b");
            mb++;
            return c
        },
        rb = function () {
            var a = tb, b = Xa ? function (c) {
                return a.call(b.src, b.listener, c)
            } : function (c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
            return b
        }, ub = function (a, b, c, d, e) {
            if (ea(b)) for (var f = 0; f < b.length; f++) ub(a, b[f], c, d, e); else c = ob(c), ab(a) ? hb(a.w, String(b), c, !0, d, e) : pb(a, b, c, !0, d, e)
        }, vb = function (a, b, c, d, e) {
            if (ea(b)) for (var f = 0; f < b.length; f++) vb(a, b[f], c, d, e); else c = ob(c), ab(a) ? a.unlisten(b, c, d, e) : a && (a = qb(a)) && (b = jb(a, b, c, !!d, e)) && wb(b)
        }, wb = function (a) {
            if (ga(a) || !a || a.Sa) return;
            var b = a.src;
            if (ab(b)) {
                ib(b.w,
                    a);
                return
            }
            var c = a.type, d = a.s;
            b.removeEventListener ? b.removeEventListener(c, d, a.Qb) : b.detachEvent && b.detachEvent(sb(c), d);
            mb--;
            (c = qb(b)) ? (ib(c, a), 0 == c.v && (c.src = null, b[kb] = null)) : eb(a)
        }, sb = function (a) {
            return a in lb ? lb[a] : lb[a] = "on" + a
        }, yb = function (a, b, c, d) {
            var e = !0;
            if (a = qb(a)) if (b = a.s[b.toString()]) for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.Qb == c && !f.Sa && (f = xb(f, d), e = e && !1 !== f)
            }
            return e
        }, xb = function (a, b) {
            var c = a.listener, d = a.Rb || a.src;
            a.Pb && wb(a);
            return c.call(d, b)
        }, tb = function (a, b) {
            if (a.Sa) return !0;
            if (!Xa) {
                var c;
                if (!(c = b)) a:{
                    c = ["window", "event"];
                    for (var d = m, e; e = c.shift();) if (null != d[e]) d = d[e]; else {
                        c = null;
                        break a
                    }
                    c = d
                }
                e = c;
                c = new D(e, this);
                d = !0;
                if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                    a:{
                        var f = !1;
                        if (0 == e.keyCode) try {
                            e.keyCode = -1;
                            break a
                        } catch (l) {
                            f = !0
                        }
                        if (f || void 0 == e.returnValue) e.returnValue = !0
                    }
                    e = [];
                    for (f = c.v; f; f = f.parentNode) e.push(f);
                    for (var f = a.type, g = e.length - 1; !c.w && 0 <= g; g--) {
                        c.v = e[g];
                        var h = yb(e[g], f, !0, c), d = d && h
                    }
                    for (g = 0; !c.w && g < e.length; g++) c.v = e[g], h = yb(e[g], f, !1, c), d = d && h
                }
                return d
            }
            return xb(a,
                new D(b, this))
        }, qb = function (a) {
            a = a[kb];
            return a instanceof fb ? a : null
        }, zb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), ob = function (a) {
            if (t(a)) return a;
            a[zb] || (a[zb] = function (b) {
                return a.handleEvent(b)
            });
            return a[zb]
        };
    var E = function (a) {
        w.call(this);
        this.V = a;
        this.s = {}
    };
    v(E, w);
    var Ab = [];
    E.prototype.listen = function (a, b, c, d) {
        return Bb(this, a, b, c, d)
    };
    var Bb = function (a, b, c, d, e, f) {
        ea(c) || (c && (Ab[0] = c.toString()), c = Ab);
        for (var g = 0; g < c.length; g++) {
            var h = nb(b, c[g], d || a.handleEvent, e || !1, f || a.V || a);
            if (!h) break;
            a.s[h.$b] = h
        }
        return a
    };
    E.prototype.unlisten = function (a, b, c, d, e) {
        if (ea(b)) for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e); else c = c || this.handleEvent, e = e || this.V || this, c = ob(c), d = !!d, b = ab(a) ? jb(a.w, String(b), c, d, e) : a ? (a = qb(a)) ? jb(a, b, c, d, e) : null : null, b && (wb(b), delete this.s[b.$b]);
        return this
    };
    var Cb = function (a) {
        oa(a.s, function (a, c) {
            this.s.hasOwnProperty(c) && wb(a)
        }, a);
        a.s = {}
    };
    E.prototype.v = function () {
        E.wa.v.call(this);
        Cb(this)
    };
    E.prototype.handleEvent = function () {
        throw Error("c");
    };
    var Db = function () {
    };
    var Eb = RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),
        Fb = RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]"),
        Gb = /^http:\/\/.*/, Hb = /\s+/, Ib = /[\d\u06f0-\u06f9]/;
    var Jb = function (a) {
        return a
    };
    var F = function (a, b, c) {
        return a + c * (b - a)
    };
    var Kb = "StopIteration" in m ? m.StopIteration : {message: "StopIteration", stack: ""}, Lb = function () {
    };
    Lb.prototype.next = function () {
        throw Kb;
    };
    Lb.prototype.vc = function () {
        return this
    };
    var Mb = function (a, b) {
        this.v = {};
        this.s = [];
        this.H = this.w = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("d");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof Mb ? (c = a.Ha(), d = a.Ba()) : (c = qa(a), d = pa(a));
            for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
        }
    };
    Mb.prototype.Ba = function () {
        Nb(this);
        for (var a = [], b = 0; b < this.s.length; b++) a.push(this.v[this.s[b]]);
        return a
    };
    Mb.prototype.Ha = function () {
        Nb(this);
        return this.s.concat()
    };
    Mb.prototype.tb = function () {
        return 0 == this.w
    };
    var Nb = function (a) {
        if (a.w != a.s.length) {
            for (var b = 0, c = 0; b < a.s.length;) {
                var d = a.s[b];
                Ob(a.v, d) && (a.s[c++] = d);
                b++
            }
            a.s.length = c
        }
        if (a.w != a.s.length) {
            for (var e = {}, c = b = 0; b < a.s.length;) d = a.s[b], Ob(e, d) || (a.s[c++] = d, e[d] = 1), b++;
            a.s.length = c
        }
    };
    k = Mb.prototype;
    k.get = function (a, b) {
        return Ob(this.v, a) ? this.v[a] : b
    };
    k.set = function (a, b) {
        Ob(this.v, a) || (this.w++, this.s.push(a), this.H++);
        this.v[a] = b
    };
    k.forEach = function (a, b) {
        for (var c = this.Ha(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    k.clone = function () {
        return new Mb(this)
    };
    k.vc = function (a) {
        Nb(this);
        var b = 0, c = this.H, d = this, e = new Lb;
        e.next = function () {
            if (c != d.H) throw Error("e");
            if (b >= d.s.length) throw Kb;
            var e = d.s[b++];
            return a ? e : d.v[e]
        };
        return e
    };
    var Ob = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var Pb = function (a) {
        if (a.Ba && "function" == typeof a.Ba) return a.Ba();
        if (r(a)) return a.split("");
        if (fa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return pa(a)
    }, Qb = function (a, b) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0); else if (fa(a) || r(a)) xa(a, b, void 0); else {
            var c;
            if (a.Ha && "function" == typeof a.Ha) c = a.Ha(); else if (a.Ba && "function" == typeof a.Ba) c = void 0; else if (fa(a) || r(a)) {
                c = [];
                for (var d = a.length, e = 0; e < d; e++) c.push(e)
            } else c = qa(a);
            for (var d = Pb(a), e = d.length, f = 0; f <
            e; f++) b.call(void 0, d[f], c && c[f], a)
        }
    };
    var Rb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
        Sb = function (a, b) {
            if (a) for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("="), f, g = null;
                0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
                b(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
            }
        };
    var G = function (a, b) {
        this.H = this.W = this.w = "";
        this.S = null;
        this.T = this.R = "";
        this.s = !1;
        var c;
        a instanceof G ? (this.s = n(b) ? b : a.s, Tb(this, a.w), this.W = a.W, this.H = a.H, Ub(this, a.S), this.R = a.R, Vb(this, a.v.clone()), this.T = a.T) : a && (c = String(a).match(Rb)) ? (this.s = !!b, Tb(this, c[1] || "", !0), this.W = Wb(c[2] || ""), this.H = Wb(c[3] || "", !0), Ub(this, c[4]), this.R = Wb(c[5] || "", !0), Vb(this, c[6] || "", !0), this.T = Wb(c[7] || "")) : (this.s = !!b, this.v = new Xb(null, 0, this.s))
    };
    G.prototype.toString = function () {
        var a = [], b = this.w;
        b && a.push(Yb(b, Zb, !0), ":");
        var c = this.H;
        if (c || "file" == b) a.push("//"), (b = this.W) && a.push(Yb(b, Zb, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.S, null != c && a.push(":", String(c));
        if (c = this.R) this.H && "/" != c.charAt(0) && a.push("/"), a.push(Yb(c, "/" == c.charAt(0) ? $b : ac, !0));
        (c = this.v.toString()) && a.push("?", c);
        (c = this.T) && a.push("#", Yb(c, bc));
        return a.join("")
    };
    G.prototype.clone = function () {
        return new G(this)
    };
    var Tb = function (a, b, c) {
        a.w = c ? Wb(b, !0) : b;
        a.w && (a.w = a.w.replace(/:$/, ""))
    }, Ub = function (a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("f`" + b);
            a.S = b
        } else a.S = null
    }, Vb = function (a, b, c) {
        b instanceof Xb ? (a.v = b, cc(a.v, a.s)) : (c || (b = Yb(b, dc)), a.v = new Xb(b, 0, a.s))
    }, Wb = function (a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }, Yb = function (a, b, c) {
        return r(a) ? (a = encodeURI(a).replace(b, ec), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }, ec = function (a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, Zb = /[#\/\?@]/g, ac = /[\#\?:]/g, $b = /[\#\?]/g, dc = /[\#\?@]/g, bc = /#/g, Xb = function (a, b, c) {
        this.v = this.s = null;
        this.w = a || null;
        this.H = !!c
    }, gc = function (a) {
        a.s || (a.s = new Mb, a.v = 0, a.w && Sb(a.w, function (b, c) {
            fc(a, decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }, fc = function (a, b, c) {
        gc(a);
        a.w = null;
        b = hc(a, b);
        var d = a.s.get(b);
        d || a.s.set(b, d = []);
        d.push(c);
        a.v += 1
    }, ic = function (a, b) {
        gc(a);
        b = hc(a, b);
        if (Ob(a.s.v, b)) {
            a.w = null;
            a.v -= a.s.get(b).length;
            var c = a.s, d = b;
            Ob(c.v, d) &&
            (delete c.v[d], c.w--, c.H++, c.s.length > 2 * c.w && Nb(c))
        }
    };
    Xb.prototype.tb = function () {
        gc(this);
        return 0 == this.v
    };
    var jc = function (a, b) {
        gc(a);
        b = hc(a, b);
        return Ob(a.s.v, b)
    };
    k = Xb.prototype;
    k.Ha = function () {
        gc(this);
        for (var a = this.s.Ba(), b = this.s.Ha(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    k.Ba = function (a) {
        gc(this);
        var b = [];
        if (r(a)) jc(this, a) && (b = Ba(b, this.s.get(hc(this, a)))); else {
            a = this.s.Ba();
            for (var c = 0; c < a.length; c++) b = Ba(b, a[c])
        }
        return b
    };
    k.set = function (a, b) {
        gc(this);
        this.w = null;
        a = hc(this, a);
        jc(this, a) && (this.v -= this.s.get(a).length);
        this.s.set(a, [b]);
        this.v += 1;
        return this
    };
    k.get = function (a, b) {
        var c = a ? this.Ba(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    k.toString = function () {
        if (this.w) return this.w;
        if (!this.s) return "";
        for (var a = [], b = this.s.Ha(), c = 0; c < b.length; c++) for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Ba(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
            a.push(g)
        }
        return this.w = a.join("&")
    };
    k.clone = function () {
        var a = new Xb;
        a.w = this.w;
        this.s && (a.s = this.s.clone(), a.v = this.v);
        return a
    };
    var hc = function (a, b) {
        var c = String(b);
        a.H && (c = c.toLowerCase());
        return c
    }, cc = function (a, b) {
        b && !a.H && (gc(a), a.w = null, a.s.forEach(function (a, b) {
            var e = b.toLowerCase();
            b != e && (ic(this, b), ic(this, e), 0 < a.length && (this.w = null, this.s.set(hc(this, e), Ca(a)), this.v += a.length))
        }, a));
        a.H = b
    };
    var mc = function (a) {
        var b = new Image, c = kc, d = "";
        b.onerror = b.onload = b.onabort = function () {
            delete lc[c]
        };
        lc[c] = b;
        -1 != a.search("&ei=") || (d = "&ei=");
        a = "/gen_204?atyp=i&ct=doodle&cad=" + a + d + "&zx=" + ka();
        /^http:/i.test(a) && "https:" == window.location.protocol ? delete lc[c] : (b.src = a, kc = c + 1)
    }, lc = [], kc = 0;
    var nc, H = navigator.userAgent, oc = window.location.href,
        pc = -1 != H.indexOf("iPad") || -1 != H.indexOf("iPhone") || -1 != H.indexOf("iPod"),
        qc = -1 != H.toLowerCase().indexOf("gsa"), rc = pc && qc, sc = qc && !pc,
        tc = pc || -1 != H.indexOf("Android") || -1 != H.indexOf("Mobile") || -1 != H.indexOf("Silk"),
        uc = 0 <= H.indexOf("MSIE"), vc = -1 != oc.indexOf("/25780/") && -1 != oc.indexOf("25780"), wc = function () {
            return 0 <= oc.indexOf("fpdoodle=1") && !!document.getElementById("fpdoodle")
        }, xc = function (a, b) {
            for (var c = 1; c < arguments.length; c += 2) {
                var d = arguments[c],
                    e = arguments[c + 1], f = a.style;
                f && d in f ? f[d] = e : d in a ? a[d] = e : uc && f && "opacity" == d && (a.zoom = 1, d = (f.filter || "").replace(/alpha\([^)]*\)/, ""), isNaN(parseFloat(e)) || (d += "alpha(opacity=" + 100 * e + ")"), f.filter = d)
            }
        }, zc = function (a) {
            var b = yc;
            window.WebFontConfig || (la("WebFontConfig.google.families", b), null != a && t(a) && la("WebFontConfig.fontactive", a), a = document.createElement("script"), a.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", a.type = "text/javascript",
                a.async = "true", (document.getElementById("xjsc") || document.body).appendChild(a))
        }, Ac = function (a) {
            a = a.toLowerCase().replace(/ /g, "");
            var b;
            b = document.documentElement;
            b.classList ? b = b.classList : (b = b.className, b = r(b) && b.match(/\S+/g) || []);
            for (var c = 0; c < b.length; c++) if (b[c].search("wf-" + a + "-w+-active")) return !0;
            return !1
        }, Bc = ["Moz", "ms", "O", "webkit"], Cc = function (a, b, c) {
            for (var d = 0, e; e = Bc[d++];) a.style[e + b] = c;
            a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
        }, Dc = ["", "moz", "ms", "o", "webkit"], Ec = function (a,
                                                                 b) {
            if (!a) return null;
            for (var c = 0; c < Dc.length; c++) {
                var d = Dc[c], e = b;
                0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
                d += e;
                if ("undefined" != typeof a[d]) return d
            }
            return null
        }, Fc = function (a, b) {
            var c = window.google ? window.google.doodle : null;
            return c && void 0 != c[a] ? c[a] : b
        }, Gc = Fc("alt", ""), Hc = Fc("hl", "en"),
        Ic = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i.test(Hc),
        Jc = function (a) {
            a = I(a);
            for (var b, c = b = 0, d = !1, e = a.split(Hb), f = 0; f < e.length; f++) {
                var g =
                    e[f];
                Fb.test(g) ? (b++, c++) : Gb.test(g) ? d = !0 : Eb.test(g) ? c++ : Ib.test(g) && (d = !0)
            }
            b = 0 == c ? d ? 1 : 0 : .4 < b / c ? -1 : 1;
            return 1 == b ? "\u202a" + a + "\u202c" : -1 == b ? "\u202b" + a + "\u202c" : a
        }, I = function (a) {
            var b;
            if (!(b = Fc("msgs", {})[a])) {
                var c = Fc("alltranslations", {});
                if (c) if (b = c.messages, c = c.translations, b && c) {
                    for (var d = -1, e = 0; e < b.length; e++) if (b[e] == a) {
                        d = e;
                        break
                    }
                    b = -1 == d ? "" : (c[Hc] || c.en).ALL[d]
                } else b = ""; else b = ""
            }
            return b || a
        }, Kc = function () {
            for (var a = ["requestAnimationFrame", "mozRequestAnimationFrame", "msRequestAnimationFrame",
                "oRequestAnimationFrame", "webkitRequestAnimationFrame"], b = 0; b < a.length; b++) {
                var c = window[a[b]];
                if (c) return function (a, b, d) {
                    return c(function (b) {
                        return a.call(d, b)
                    }, b)
                }
            }
            var d = 0, e = 33, f = 50;
            return function (a, b, c) {
                b && 0 > --f && (1.25 < b / e ? (d = 0, e = Math.min(66, ++e)) : 10 < ++d && (d = 0, e = Math.max(17, --e)));
                window.setTimeout(function (b) {
                    a.call(c, b)
                }, e)
            }
        }, Lc = function (a, b, c) {
            Lc = Kc();
            return Lc(a, b, c)
        }, Mc = function (a) {
            if (window.google && window.google.log) {
                var b;
                nc || (b = document.getElementById("hplogoved")) && (nc = b.getAttribute("data-ved"));
                (b = nc) && (a += "&ved=" + b);
                window.google.log("doodle", a)
            } else mc(a)
        };
    var Pc = function (a, b, c) {
        w.call(this);
        this.ka = a;
        this.ta = b;
        this.Ka = c;
        this.H = this.w = this.U = !1;
        this.$ = ka();
        this.ya = Ec(document, "hidden");
        this.R = (this.V = Ec(document, "visibilityState")) ? this.V.replace(/state$/i, "change").toLowerCase() : null;
        Nc(this);
        Oc(this)
    };
    v(Pc, w);
    var Nc = function (a) {
        sc ? Qc(a, function () {
            Rc(a)
        }) : Rc(a)
    }, Rc = function (a) {
        a.s = function () {
            var b;
            window.agsa_ext && window.agsa_ext.getPageVisibility && "hidden" == window.agsa_ext.getPageVisibility() ? b = !0 : (b = document[a.V], b = document[a.ya] || "hidden" == b);
            a.U = b;
            a.U ? Sc(a) : Tc(a)
        };
        var b = window.agsa_ext;
        b && b.registerPageVisibilityListener ? (google.doodle || (google.doodle = {}), google.doodle.pvc = function () {
            a.s && a.s()
        }, b.registerPageVisibilityListener("google.doodle.pvc();")) : a.R && document.addEventListener(a.R, a.s, !1)
    }, Qc =
        function (a, b) {
            window.agsa_ext ? b() : a.qa = window.setTimeout(function () {
                Nc(a)
            }, 100)
        };
    Pc.prototype.v = function () {
        window.clearTimeout(this.S);
        window.clearTimeout(this.qa);
        this.s && (window.agsa_ext && window.agsa_ext.registerPageVisibilityListener ? this.s = null : this.R && document.removeEventListener && document.removeEventListener(this.R, this.s, !1));
        Pc.wa.v.call(this)
    };
    var Sc = function (a) {
        var b = a.U || a.w;
        a.H && !b ? (a.H = !1, a.Ka(), Oc(a)) : !a.H && b && (a.H = !0, a.ta())
    }, Oc = function (a) {
        a.S && window.clearTimeout(a.S);
        var b = Math.max(100, a.ka - Uc(a));
        a.S = window.setTimeout(function () {
            a.S = null;
            a.w = Uc(a) >= a.ka;
            a.w || Oc(a);
            Sc(a)
        }, b)
    }, Uc = function (a) {
        return ka() - a.$
    }, Tc = function (a) {
        a.$ = ka();
        a.w = !1;
        Sc(a)
    };
    var Vc = function (a, b, c) {
        this.H = a;
        this.ka = b;
        this.V = c || null;
        this.w = [];
        this.s = null;
        this.S = this.T = 0;
        this.ta = this.U = !1;
        this.$ = [];
        this.W = this.H.width / this.H.clientWidth;
        this.R = this.H.height / this.H.clientHeight;
        this.ya = [this.H];
        this.qa = !1
    }, Wc = function () {
        var a = new Db;
        a.contains = function () {
            return !0
        };
        return a
    }(), Zc = function (a, b) {
        for (var c = a.w.length - 1; 0 <= c; c--) a.w[c].s === b && a.w.splice(c, 1);
        a.s && b === a.s.s && (a.s = null, Xc(a));
        a.v && b === a.v.s && (a.v = null);
        Yc(a, "areamove", a.T, a.S)
    };
    Vc.prototype.handleEvent = function (a) {
        var b, c;
        c = (c = (c = a.s) || window.event) ? (b = c.targetTouches && c.targetTouches[0] || c.changedTouches && c.changedTouches[0]) && void 0 !== b.pageX ? [b.pageX, b.pageY] : void 0 !== c.clientX ? [c.clientX + ("rtl" == document.dir ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), c.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : void 0 !== c.pageX ? [c.pageX, c.pageY] : [0, 0] : [0, 0];
        b = this.H;
        var d = 0, e = 0;
        if (b) {
            do d += b.offsetLeft, e += b.offsetTop; while (b =
                b.offsetParent)
        }
        b = [d, e];
        b = [c[0] - b[0], c[1] - b[1]];
        d = b[0] * this.W;
        c = b[1] * this.R;
        this.qa && (d = b[1] * this.R, c = 0 - b[0] * this.W);
        b = d;
        this.V && Tc(this.V);
        this.T = b;
        this.S = c;
        c = a.type;
        this.ta && 0 == c.indexOf("mouse") || (b = {
            touchstart: "mousedown",
            touchend: "mouseup",
            touchmove: "mousemove"
        }, c in b && (this.ta = !0, c = b[c]), "mousedown" == c && (a.preventDefault(), this.ka && this.ka.focus()), Yc(this, c, this.T, this.S))
    };
    var Yc = function (a, b, c, d) {
        if (!a.U && "mousedown" == b) {
            a.U = !0;
            for (var e = 0; e < a.$.length; e++) a.$[e]()
        }
        if ("mousedown" == b) {
            if (!a.v) for (e = 0; e < a.w.length; e++) {
                var f = a.w[e];
                if (f.s.contains(c, d)) {
                    a.v = f;
                    f.v("mousedown", c, d);
                    break
                }
            }
        } else if ("mouseup" == b) a.v && (a.v.v("mouseup", c, d), a.v = null); else if ("mousemove" == b || "areamove" == b) {
            for (var g = null, e = 0; e < a.w.length; e++) if (f = a.w[e], f.s.contains(c, d)) {
                g = f;
                break
            }
            a.s != g && (a.s && a.s.v("mouseout", c, d), g && g.v("mouseover", c, d), a.s = g);
            if ("mousemove" == b) for (a.v && a.v.v("mousemove",
                c, d), e = 0; e < a.w.length; e++) f = a.w[e], f != a.v && f.s.contains(c, d) && f.v("mousemove", c, d)
        } else "mouseout" == b && (a.s && a.s.v("mouseout", c, d), a.v = null, a.s = null);
        Xc(a)
    }, Xc = function (a) {
        for (var b = a.s && a.s.s != Wc ? "pointer" : "default", c = 0, d; d = a.ya[c]; c++) xc(d, "cursor", b)
    }, $c = function (a, b) {
        this.s = a;
        this.v = b
    };
    var J, ad = {name: "desktopHomepage", Fa: !0, Ga: !0, Ia: !1, Ca: !1, Da: !1, Ea: !1},
        bd = {name: "tabletHomepage", Fa: !0, Ga: !0, Ia: !1, Ca: !1, Da: !1, Ea: !1},
        cd = {name: "igsa", Fa: !0, Ga: !1, Ia: !0, Ca: !0, Da: !0, Ea: !0},
        dd = {name: "agsa", Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !0, Ea: !0},
        gd = {name: "allo", Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !1, Ea: !1},
        hd = {name: "desktopChromeNTP", Fa: !1, Ga: !0, Ia: !1, Ca: !1, Da: !1, Ea: !1},
        id = {name: "fpdoodle", Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !0, Ea: !0},
        jd = {name: "slashdoodlesDesktop", Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !1, Ea: !1}, kd = {
            name: "slashdoodlesMobile",
            Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !0, Ea: !0
        }, ld = {name: "fallbackMobile", Fa: !0, Ga: !1, Ia: !1, Ca: !0, Da: !0, Ea: !0},
        md = {name: "fallbackDesktop", Fa: !0, Ga: !1, Ia: !1, Ca: !1, Da: !1, Ea: !1};
    var nd = function () {
        null == J && (rc ? J = cd : sc ? J = dd : -1 != H.indexOf("gbot") ? J = gd : document.getElementById("fkbx") && !tc ? J = hd : wc() ? J = id : document.querySelector("body.hp") ? J = tc ? bd : ad : vc ? J = tc ? kd : jd : (window.console && window.console.log("Error: can't determine environment"), J = tc ? ld : md), window.console && window.console.log("doodle.environment is " + J.name))
    };
    var od = function () {
        this.U = this.V = this.$ = this.s = this.H = null;
        this.ka = !1;
        this.T = null;
        this.S = this.v = !1;
        this.w = !0;
        this.W = this.R = !1
    };
    ca(od);
    od.prototype.reset = function () {
        this.U = this.V = this.$ = this.s = this.H = null;
        this.ka = !1;
        this.T = null;
        this.S = this.v = !1;
        this.w = !0;
        this.W = this.R = !1
    };
    nd();
    var pd = J.Da, qd = Ec(document, "fullscreenElement"), rd = document[Ec(document, "exitFullscreen")],
        ud = function (a, b, c, d) {
            var e = sd;
            e.s = a;
            e.H = b;
            e.$ = d;
            e.T = a[Ec(a, "requestFullscreen")];
            a = document[Ec(document, "fullscreenEnabled")] && n(e.T) && n(rd);
            nd();
            e.v = J.Ea && a;
            nd();
            e.S = J.Ca;
            e.w = !0;
            if (e.v || e.S) xc(document.body, "margin", "0"), xc(e.s, "overflow", "visible", "width", "100%", "height", "100%"), document.body.scrollLeft = 0, c.listen(window, "scroll", td)
        }, vd = function () {
            var a = sd;
            return function (b) {
                "mousedown" == b && (a.W = !0)
            }
        }, td =
            function (a) {
                a.preventDefault();
                a.stopPropagation();
                return !1
            };
    var wd = function (a) {
        this.v = a
    };
    v(wd, Db);
    var xd = function (a, b, c, d) {
        return new wd([a, b, a + c, b, a + c, b + d, a, b + d])
    };
    wd.prototype.contains = function (a, b) {
        var c = this.v;
        if (6 > c.length) return !1;
        for (var d = !1, e = 0, f = c.length - 2; e < c.length; f = e, e += 2) {
            var g = c[e], h = c[e + 1], l = c[f], f = c[f + 1];
            a < g != a < l && b > h + (a - g) * (f - h) / (l - g) && (d = !d)
        }
        return d
    };
    wd.prototype.s = function (a) {
        a.beginPath();
        for (var b = 0; b < this.v.length; b += 2) a.lineTo(this.v[b], this.v[b + 1]);
        a.lineTo(this.v[0], this.v[1]);
        a.fill();
        a.stroke()
    };
    var sd = od.ma(), yd = function (a, b) {
        this.w = a;
        this.R = b;
        this.s = 0;
        this.H = document.getElementsByTagName("input")
    };
    yd.prototype.handleEvent = function (a) {
        if (a && a.R && this.R(a)) {
            this.v && Tc(this.v);
            var b = a.s, c;
            if (c = b.keyCode) {
                a:{
                    c = 0;
                    for (var d; d = this.H[c++];) if ("q" == d.name && d.value.match(/[^ ]/)) {
                        c = !0;
                        break a
                    }
                    c = !1
                }
                c = !c
            }
            if (c) {
                if (c = "keydown" == a.type) this.s++, c = 1 >= this.s;
                c ? (this.w(a), b.preventDefault && b.preventDefault()) : "keyup" == a.type && (this.s = 0)
            }
        }
    };
    var Gd = function (a, b, c, d) {
        w.call(this);
        this.H = new E(this);
        ma(this, ja(na, this.H));
        this.w = {};
        var e = this;
        this.S = new Pc(d || 6E4, function () {
            var a = zd;
            a.S = !0;
            Ad(a);
            a = Bd;
            a.w && (a.w.gain.value = 0)
        }, function () {
            Cd();
            var a = Bd;
            a.w && (a.w.gain.value = 1)
        });
        ma(this, ja(na, this.S));
        this.s = new Vc(b, a, this.S);
        this.H.listen(a, "mousedown mouseup mousemove mouseout touchstart touchend touchmove".split(" "), function (a) {
            e.s.handleEvent(a)
        }, !0);
        ud(a, n(c) ? [b].concat(c) : [b], this.H, function (a) {
            var b = e.s;
            b.W = b.H.width / b.H.clientWidth;
            b.R = b.H.height / b.H.clientHeight;
            b.qa = a
        });
        this.H.listen(b, "touchstart", function () {
            var a = sd;
            a.v && (a.W ? (rd.call(document), a.W = !1) : a.T.call(a.s))
        });
        this.V = Dd;
        this.R = Ed;
        a = this.R[3];
        this.U = b.width - a;
        Fd(this, xd(this.U, 0, a, this.R[4]), vd())
    };
    v(Gd, w);
    Gd.prototype.v = function () {
        sd.reset();
        Gd.wa.v.call(this)
    };
    var Hd = function (a, b) {
        b.v = a.S;
        Bb(a.H, window, ["keydown", "keyup"], b.handleEvent, !0, b)
    }, Fd = function (a, b, c, d) {
        a.s.w.push(new $c(b, c));
        null != d && (a.w[d] || (a.w[d] = []), a.w[d].push(b))
    };
    var K = function () {
        this.S = !0;
        this.$ = !1;
        this.R = [];
        this.V = !1;
        this.w = this.U = this.s = 0;
        this.H = Id
    };
    v(K, w);
    ca(K);
    var Id = 1E3 / 60, Jd = function (a, b, c) {
        this.v = a;
        this.w = b;
        this.s = K.ma().s;
        this.R = 0;
        this.H = c || null
    }, Kd = function (a) {
        var b = a.w(a.R);
        a.R++;
        a.s = K.ma().s + a.v / K.ma().H;
        !b && a.H && a.H();
        return b
    };
    Jd.prototype.cancel = function () {
        this.w = function () {
            return !1
        }
    };
    var Nd = function (a) {
        var b = zd;
        a = new Jd(Ld, a, void 0);
        Md(b, a)
    }, Md = function (a, b) {
        a.R.push(b);
        a.V = !0
    }, Pd = function (a) {
        if (a.S) a.$ = !1; else {
            a.$ = !0;
            Od(a);
            a.V && (a.R.sort(function (a, b) {
                return a.s == b.s ? b.v - a.v : a.s - b.s
            }), a.V = !1);
            for (var b = 0, c = 0, d; d = a.R[c]; c++) if (d.s <= a.s) Kd(d) && Md(a, d), b++; else break;
            a.R.splice(0, b);
            a.s++;
            Lc(function () {
                Pd(a)
            })
        }
    }, Od = function (a) {
        var b = (new Date).getTime();
        30 < a.s && a.U && (b - a.U >= 1.05 * a.H ? a.w++ : a.w >>= 1, 20 < a.w && (a.H = Math.min(50, 1.2 * a.H), a.w = 0));
        a.U = b
    }, Cd = function () {
        var a = zd;
        a.S = !1;
        a.$ ||
        Pd(a)
    }, Ad = function (a) {
        a.w = 0;
        a.U = 0
    };
    K.prototype.v = function () {
        this.reset();
        K.wa.v.call(this)
    };
    K.prototype.reset = function () {
        this.S = !0;
        Ad(this);
        this.R = [];
        this.s = 0;
        this.V = !1;
        this.H = Id;
        Ad(this)
    };
    var Qd = function (a, b) {
        google && google.doodle && (b && (google.doodle.cpDestroy = b), google.doodle.cpInit = function () {
            b && b();
            a()
        })
    }, Rd = function (a, b, c) {
        if (google) {
            var d = function () {
                var a = google.msg && google.msg.unlisten;
                a && (a(106, d), c && a(94, c));
                b();
                return !0
            }, e = function () {
                var a = document.getElementById("hplogo");
                a && "hidden" != a.style.visibility && (a = google.msg && google.msg.listen, google.psy && google.psy.q && a && (a(106, d), c && a(94, c)))
            };
            e();
            google.doodle && google.doodle.jesr || (la("google.doodle.jesr", !0), google.raas && google.raas("doodle",
                {
                    init: function () {
                        e();
                        google.doodle.jesrd && (a(), google.doodle.jesrd = !1)
                    }, dispose: function () {
                        d();
                        google.doodle.jesrd = !0
                    }
                }))
        }
    };
    var L = function () {
        w.call(this);
        this.w = new fb(this);
        this.Mb = this;
        this.Ja = null
    };
    v(L, w);
    L.prototype[$a] = !0;
    L.prototype.removeEventListener = function (a, b, c, d) {
        vb(this, a, b, c, d)
    };
    var M = function (a, b) {
        var c, d = a.Ja;
        if (d) for (c = []; d; d = d.Ja) c.push(d);
        var d = a.Mb, e = b, f = e.type || e;
        if (r(e)) e = new Za(e, d); else if (e instanceof Za) e.target = e.target || d; else {
            var g = e, e = new Za(f, d);
            sa(e, g)
        }
        var g = !0, h;
        if (c) for (var l = c.length - 1; !e.w && 0 <= l; l--) h = e.v = c[l], g = Sd(h, f, !0, e) && g;
        e.w || (h = e.v = d, g = Sd(h, f, !0, e) && g, e.w || (g = Sd(h, f, !1, e) && g));
        if (c) for (l = 0; !e.w && l < c.length; l++) h = e.v = c[l], g = Sd(h, f, !1, e) && g;
        return g
    };
    L.prototype.v = function () {
        L.wa.v.call(this);
        if (this.w) {
            var a = this.w, b = 0, c;
            for (c in a.s) {
                for (var d = a.s[c], e = 0; e < d.length; e++) ++b, eb(d[e]);
                delete a.s[c];
                a.v--
            }
        }
        this.Ja = null
    };
    L.prototype.listen = function (a, b, c, d) {
        return hb(this.w, String(a), b, !1, c, d)
    };
    L.prototype.unlisten = function (a, b, c, d) {
        var e;
        e = this.w;
        a = String(a).toString();
        if (a in e.s) {
            var f = e.s[a];
            b = gb(f, b, c, d);
            -1 < b ? (eb(f[b]), Array.prototype.splice.call(f, b, 1), 0 == f.length && (delete e.s[a], e.v--), e = !0) : e = !1
        } else e = !1;
        return e
    };
    var Sd = function (a, b, c, d) {
        b = a.w.s[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Sa && g.Qb == c) {
                var h = g.listener, l = g.Rb || g.src;
                g.Pb && ib(a.w, g);
                e = !1 !== h.call(l, d) && e
            }
        }
        return e && 0 != d.hc
    };
    var Td = function (a, b, c) {
        this.H = c;
        this.w = a;
        this.R = b;
        this.v = 0;
        this.s = null
    };
    Td.prototype.get = function () {
        var a;
        0 < this.v ? (this.v--, a = this.s, this.s = a.next, a.next = null) : a = this.w();
        return a
    };
    var Ud = function (a, b) {
        a.R(b);
        a.v < a.H && (a.v++, b.next = a.s, a.s = b)
    };
    var Vd = function (a) {
        m.setTimeout(function () {
            throw a;
        }, 0)
    }, Wd, Xd = function () {
        var a = m.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !z("Presto") && (a = function () {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(),
                d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                a = u(function (a) {
                    if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
                }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !Ia()) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (n(c.next)) {
                    c = c.next;
                    var a = c.cb;
                    c.cb = null;
                    a()
                }
            };
            return function (a) {
                d.next = {cb: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
            var b = document.createElement("SCRIPT");
            b.onreadystatechange = function () {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function (a) {
            m.setTimeout(a, 0)
        }
    };
    var Zd = new Td(function () {
        return new Yd
    }, function (a) {
        a.reset()
    }, 100), ae = function () {
        var a = $d, b = null;
        a.s && (b = a.s, a.s = a.s.next, a.s || (a.v = null), b.next = null);
        return b
    }, Yd = function () {
        this.next = this.v = this.s = null
    };
    Yd.prototype.set = function (a, b) {
        this.s = a;
        this.v = b;
        this.next = null
    };
    Yd.prototype.reset = function () {
        this.next = this.v = this.s = null
    };
    var ee = function (a, b) {
        be || ce();
        de || (be(), de = !0);
        var c = $d, d = Zd.get();
        d.set(a, b);
        c.v ? c.v.next = d : c.s = d;
        c.v = d
    }, be, ce = function () {
        if (m.Promise && m.Promise.resolve) {
            var a = m.Promise.resolve(void 0);
            be = function () {
                a.then(fe)
            }
        } else be = function () {
            var a = fe;
            !t(m.setImmediate) || m.Window && m.Window.prototype && !z("Edge") && m.Window.prototype.setImmediate == m.setImmediate ? (Wd || (Wd = Xd()), Wd(a)) : m.setImmediate(a)
        }
    }, de = !1, $d = new function () {
        this.v = this.s = null
    }, fe = function () {
        for (var a; a = ae();) {
            try {
                a.s.call(a.v)
            } catch (b) {
                Vd(b)
            }
            Ud(Zd,
                a)
        }
        de = !1
    };
    var ge = function (a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }, he = function (a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var N = function (a, b) {
        this.s = 0;
        this.S = void 0;
        this.H = this.v = this.w = null;
        this.R = this.T = !1;
        if (a != p) try {
            var c = this;
            a.call(b, function (a) {
                ie(c, 2, a)
            }, function (a) {
                ie(c, 3, a)
            })
        } catch (d) {
            ie(this, 3, d)
        }
    }, je = function () {
        this.next = this.w = this.v = this.H = this.s = null;
        this.R = !1
    };
    je.prototype.reset = function () {
        this.w = this.v = this.H = this.s = null;
        this.R = !1
    };
    var ke = new Td(function () {
        return new je
    }, function (a) {
        a.reset()
    }, 100), le = function (a, b, c) {
        var d = ke.get();
        d.H = a;
        d.v = b;
        d.w = c;
        return d
    };
    N.prototype.then = function (a, b, c) {
        return me(this, t(a) ? a : null, t(b) ? b : null, c)
    };
    ge(N);
    N.prototype.cancel = function (a) {
        0 == this.s && ee(function () {
            var b = new ne(a);
            oe(this, b)
        }, this)
    };
    var oe = function (a, b) {
        if (0 == a.s) if (a.w) {
            var c = a.w;
            if (c.v) {
                for (var d = 0, e = null, f = null, g = c.v; g && (g.R || (d++, g.s == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.s && 1 == d ? oe(c, b) : (f ? (d = f, d.next == c.H && (c.H = d), d.next = d.next.next) : pe(c), qe(c, e, 3, b)))
            }
            a.w = null
        } else ie(a, 3, b)
    }, se = function (a, b) {
        a.v || 2 != a.s && 3 != a.s || re(a);
        a.H ? a.H.next = b : a.v = b;
        a.H = b
    }, me = function (a, b, c, d) {
        var e = le(null, null, null);
        e.s = new N(function (a, g) {
            e.H = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (q) {
                    g(q)
                }
            } : a;
            e.v = c ? function (b) {
                try {
                    var e = c.call(d,
                        b);
                    !n(e) && b instanceof ne ? g(b) : a(e)
                } catch (q) {
                    g(q)
                }
            } : g
        });
        e.s.w = a;
        se(a, e);
        return e.s
    };
    N.prototype.U = function (a) {
        this.s = 0;
        ie(this, 2, a)
    };
    N.prototype.V = function (a) {
        this.s = 0;
        ie(this, 3, a)
    };
    var ie = function (a, b, c) {
        if (0 == a.s) {
            a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.s = 1;
            var d;
            a:{
                var e = c, f = a.U, g = a.V;
                if (e instanceof N) se(e, le(f || p, g || null, a)), d = !0; else if (he(e)) e.then(f, g, a), d = !0; else {
                    var h = typeof e;
                    if ("object" == h && null != e || "function" == h) try {
                        var l = e.then;
                        if (t(l)) {
                            te(e, l, f, g, a);
                            d = !0;
                            break a
                        }
                    } catch (q) {
                        g.call(a, q);
                        d = !0;
                        break a
                    }
                    d = !1
                }
            }
            d || (a.S = c, a.s = b, a.w = null, re(a), 3 != b || c instanceof ne || ue(a, c))
        }
    }, te = function (a, b, c, d, e) {
        var f = !1, g = function (a) {
                f || (f = !0, c.call(e, a))
            },
            h = function (a) {
                f || (f = !0, d.call(e, a))
            };
        try {
            b.call(a, g, h)
        } catch (l) {
            h(l)
        }
    }, re = function (a) {
        a.T || (a.T = !0, ee(a.W, a))
    }, pe = function (a) {
        var b = null;
        a.v && (b = a.v, a.v = b.next, b.next = null);
        a.v || (a.H = null);
        return b
    };
    N.prototype.W = function () {
        for (var a; a = pe(this);) qe(this, a, this.s, this.S);
        this.T = !1
    };
    var qe = function (a, b, c, d) {
        if (3 == c && b.v && !b.R) for (; a && a.R; a = a.w) a.R = !1;
        if (b.s) b.s.w = null, ve(b, c, d); else try {
            b.R ? b.H.call(b.w) : ve(b, c, d)
        } catch (e) {
            we.call(null, e)
        }
        Ud(ke, b)
    }, ve = function (a, b, c) {
        2 == b ? a.H.call(a.w, c) : a.v && a.v.call(a.w, c)
    }, ue = function (a, b) {
        a.R = !0;
        ee(function () {
            a.R && we.call(null, b)
        })
    }, we = Vd, ne = function (a) {
        x.call(this, a)
    };
    v(ne, x);
    ne.prototype.name = "cancel";
    var xe = function (a, b, c) {
        if (t(a)) c && (a = u(a, c)); else if (a && "function" == typeof a.handleEvent) a = u(a.handleEvent, a); else throw Error("h");
        return 2147483647 < Number(b) ? -1 : m.setTimeout(a, b || 0)
    };
    var ye = function () {
    };
    ye.prototype.s = null;
    var Ae = function (a) {
        var b;
        (b = a.s) || (b = {}, ze(a) && (b[0] = !0, b[1] = !0), b = a.s = b);
        return b
    };
    var Be, Ce = function () {
    };
    v(Ce, ye);
    var De = function (a) {
        return (a = ze(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }, ze = function (a) {
        if (!a.v && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.v = d
                } catch (e) {
                }
            }
            throw Error("i");
        }
        return a.v
    };
    Be = new Ce;
    var Ee = function (a) {
        L.call(this);
        this.Vb = new Mb;
        this.qa = a || null;
        this.H = !1;
        this.ka = this.s = null;
        this.Ka = "";
        this.R = this.ya = this.U = this.ta = !1;
        this.La = 0;
        this.$ = null;
        this.V = "";
        this.Xa = this.Za = !1
    };
    v(Ee, L);
    var Fe = /^https?$/i, Ge = ["POST", "PUT"];
    Ee.prototype.send = function (a, b, c, d) {
        if (this.s) throw Error("j`" + this.Ka + "`" + a);
        b = b ? b.toUpperCase() : "GET";
        this.Ka = a;
        this.ta = !1;
        this.H = !0;
        this.s = this.qa ? De(this.qa) : De(Be);
        this.ka = this.qa ? Ae(this.qa) : Ae(Be);
        this.s.onreadystatechange = u(this.Ya, this);
        try {
            this.ya = !0, this.s.open(b, String(a), !0), this.ya = !1
        } catch (f) {
            He(this);
            return
        }
        a = c || "";
        var e = this.Vb.clone();
        d && Qb(d, function (a, b) {
            e.set(b, a)
        });
        d = Aa(e.Ha());
        c = m.FormData && a instanceof m.FormData;
        !(0 <= wa(Ge, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function (a, b) {
            this.s.setRequestHeader(b, a)
        }, this);
        this.V && (this.s.responseType = this.V);
        "withCredentials" in this.s && this.s.withCredentials !== this.Za && (this.s.withCredentials = this.Za);
        try {
            Ie(this), 0 < this.La && ((this.Xa = Je(this.s)) ? (this.s.timeout = this.La, this.s.ontimeout = u(this.S, this)) : this.$ = xe(this.S, this.La, this)), this.U = !0, this.s.send(a), this.U = !1
        } catch (f) {
            He(this)
        }
    };
    var Je = function (a) {
        return A && C(9) && ga(a.timeout) && n(a.ontimeout)
    }, za = function (a) {
        return "content-type" == a.toLowerCase()
    };
    Ee.prototype.S = function () {
        "undefined" != typeof aa && this.s && (M(this, "timeout"), this.s && this.H && (this.H = !1, this.R = !0, this.s.abort(), this.R = !1, M(this, "complete"), M(this, "abort"), Ke(this)))
    };
    var He = function (a) {
        a.H = !1;
        a.s && (a.R = !0, a.s.abort(), a.R = !1);
        Le(a);
        Ke(a)
    }, Le = function (a) {
        a.ta || (a.ta = !0, M(a, "complete"), M(a, "error"))
    };
    Ee.prototype.v = function () {
        this.s && (this.H && (this.H = !1, this.R = !0, this.s.abort(), this.R = !1), Ke(this, !0));
        Ee.wa.v.call(this)
    };
    Ee.prototype.Ya = function () {
        this.W || (this.ya || this.U || this.R ? Me(this) : this.uc())
    };
    Ee.prototype.uc = function () {
        Me(this)
    };
    var Me = function (a) {
        if (a.H && "undefined" != typeof aa && (!a.ka[1] || 4 != (a.s ? a.s.readyState : 0) || 2 != Ne(a))) if (a.U && 4 == (a.s ? a.s.readyState : 0)) xe(a.Ya, 0, a); else if (M(a, "readystatechange"), 4 == (a.s ? a.s.readyState : 0)) {
            a.H = !1;
            try {
                var b = Ne(a), c;
                a:switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        c = !0;
                        break a;
                    default:
                        c = !1
                }
                var d;
                if (!(d = c)) {
                    var e;
                    if (e = 0 === b) {
                        var f = String(a.Ka).match(Rb)[1] || null;
                        if (!f && m.self && m.self.location) var g = m.self.location.protocol,
                            f = g.substr(0, g.length - 1);
                        e = !Fe.test(f ?
                            f.toLowerCase() : "")
                    }
                    d = e
                }
                d ? (M(a, "complete"), M(a, "success")) : Le(a)
            } finally {
                Ke(a)
            }
        }
    }, Ke = function (a, b) {
        if (a.s) {
            Ie(a);
            var c = a.s, d = a.ka[0] ? p : null;
            a.s = null;
            a.ka = null;
            b || M(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
            }
        }
    }, Ie = function (a) {
        a.s && a.Xa && (a.s.ontimeout = null);
        ga(a.$) && (m.clearTimeout(a.$), a.$ = null)
    }, Ne = function (a) {
        try {
            return 2 < (a.s ? a.s.readyState : 0) ? a.s.status : -1
        } catch (b) {
            return -1
        }
    }, Oe = function (a) {
        try {
            if (!a.s) return null;
            if ("response" in a.s) return a.s.response;
            switch (a.V) {
                case "":
                case "text":
                    return a.s.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer" in a.s) return a.s.mozResponseArrayBuffer
            }
            return null
        } catch (b) {
            return null
        }
    };
    var Pe = function (a) {
        this.T = a;
        this.v = !1;
        this.w = []
    }, Qe = function (a) {
        if (!a.v) {
            a.v = !0;
            for (var b = 0, c; c = a.w[b]; b++) c()
        }
    }, Re = function (a, b) {
        a.v ? b() : a.w.push(b)
    }, Se = function (a) {
        Pe.call(this, a);
        this.s = new Image
    };
    v(Se, Pe);
    Se.prototype.Aa = function () {
        if (!this.s.src) {
            var a = this;
            this.s.onload = function () {
                Qe(a)
            };
            this.s.src = this.T;
            (this.s.complete || "complete" == this.s.readyState) && Qe(this)
        }
    };
    var Te = function (a, b) {
        this.R = a;
        this.H = b;
        this.v = this.w = this.s = null
    }, Ue = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode, Ze = function () {
        var a = Ve, b = We;
        if (Ue && !a.s) {
            a.s = new (window.AudioContext || window.webkitAudioContext);
            a.w = a.s.createGain();
            a.w.connect(a.s.destination);
            for (var c in a.R) a.R[c].H = a.s;
            for (c in a.H) Xe(a.H[c], a.s, a.w);
            pc && (Ye(a), ub(b, "touchend", function () {
                Ye(a)
            }))
        }
    }, $e = function (a) {
        a.v = a.s.createBufferSource();
        a.v.buffer = a.s.createBuffer(1, 1, 22050);
        a.v.connect(a.s.destination);
        a.v.start(0)
    }, Ye = function (a) {
        a.s && (null == a.v ? $e(a) : n(a.v.playbackState) ? a.v.playbackState !== a.v.PLAYING_STATE && a.v.playbackState !== a.v.FINISHED_STATE && $e(a) : $e(a))
    };
    Te.prototype.reset = function () {
        for (var a in this.R) this.R[a].w = [];
        for (var b in this.H) af(this.H[b])
    };
    var O = function (a, b) {
            this.Bb = bf.tc;
            this.T = a;
            this.R = b;
            this.w = {};
            this.H = this.s = this.v = null;
            this.S = 0
        }, Xe = function (a, b, c) {
            a.s = b;
            a.H = c;
            a.s.createGain && (a.v = a.s.createGain())
        }, cf = document.createElement("audio"),
        df = t(cf.canPlayType) && "" != cf.canPlayType("audio/ogg") ? ".ogg" : ".mp3", ef = function (a) {
            if (a.s) {
                var b = 1E3 * a.s.currentTime, c;
                for (c in a.w) {
                    var d = a.w[c];
                    !d.xc && d.yc + a.R < b && delete a.w[c]
                }
            }
        }, ff = function (a, b, c) {
            if (a.s && a.H) {
                ef(a);
                b = a.s.currentTime + (b || 0) / 1E3;
                var d = a.s.createBufferSource();
                a.v ? (d.connect(a.v),
                    a.v.connect(a.H)) : d.connect(a.H);
                d.loop = !!c;
                try {
                    d.buffer = a.Bb.R
                } catch (g) {
                    c = "UnknownError";
                    g instanceof TypeError && (c = "TypeError");
                    a = "bufferAssignment," + typeof a.Bb.R + "," + a.Bb.s;
                    Mc(["t:" + c, "d:((" + (n(a) ? a : "_") + "))"].join());
                    return
                }
                d.playbackRate.value = 1;
                var e = a.T / 1E3, f = a.R / 1E3;
                c ? (d.loopStart = e, d.loopEnd = e + f, d.start(b, e)) : d.start(b, e, f);
                e = a.S++;
                a.w[e] = {node: d, yc: 1E3 * b, xc: !!c}
            }
        }, gf = function (a, b, c) {
            a.v && (a.v.gain.setValueAtTime(a.v.gain.value, a.s.currentTime), a.v.gain.exponentialRampToValueAtTime(b, a.s.currentTime +
                c))
        }, af = function (a, b) {
            ef(a);
            if (n(b)) {
                if (a.w[b]) {
                    try {
                        a.w[b].node.stop(0)
                    } catch (d) {
                    }
                    delete a.w[b]
                }
            } else for (var c in a.w) af(a, c)
        }, hf = function (a, b) {
            Pe.call(this, a + b + df);
            this.H = this.R = null;
            this.s = 0
        };
    v(hf, Pe);
    hf.prototype.Aa = function (a) {
        if ((0 == this.s || a) && this.H) {
            a = new Ee;
            a.V = "arraybuffer";
            var b = this;
            a.listen("complete", function () {
                b.H.decodeAudioData(Oe(this), function (a) {
                    a && (b.R = a, b.s = 3, Qe(b))
                });
                b.s = 2
            });
            a.send(this.T);
            this.s = 1
        }
    };
    var jf = function () {
        Te.call(this, bf, P)
    };
    v(jf, Te);
    var bf = {tc: new hf("", "main")}, P = {
        W: new O(0, 74.717),
        U: new O(1074.717, 268.027),
        V: new O(2342.744, 306.939),
        kc: new O(3649.683, 513.333),
        $: new O(5163.016, 398.095),
        ka: new O(6561.111, 398.095),
        qa: new O(7959.206, 513.333),
        ta: new O(9472.54, 272.381),
        lc: new O(10744.921, 402.063),
        ab: new O(12146.984, 6857.143),
        mc: new O(20004.127, 6400),
        nc: new O(27404.127, 6400),
        qc: new O(34804.127, 6400),
        sc: new O(42204.127, 6400),
        jc: new O(49604.127, 4800),
        Wb: new O(55404.127, 54.694),
        Xb: new O(56458.821, 66.757),
        ya: new O(57525.578,
            41.723)
    };
    ca(jf);
    var kf = function (a, b) {
        this.v = [];
        this.w = [];
        for (var c = 0, d; d = b[c]; c++) {
            var e = new Se(a + d.filename);
            d = d.size;
            this.v.push(e);
            this.w.push(d)
        }
    };
    kf.prototype.Aa = function (a, b) {
        var c = lf(this, a);
        b && Re(c, b);
        c.Aa()
    };
    var lf = function (a, b) {
        return a.v[ga(b) ? b : b[0]]
    };
    kf.prototype.s = function (a, b, c, d, e, f) {
        var g = a[3], h = a[4], l = g, q = h;
        void 0 != e && (l *= e, q *= e);
        f && (c -= l / 2, d -= q / 2);
        e = a[1];
        f = a[2];
        void 0 != c && (e += 0, f += 0);
        a = lf(this, a);
        if (!a.v) throw Error("k");
        b.drawImage(a.s, e, f, g, h, c, d, l, q)
    };
    var Q = function () {
        kf.call(this, "", mf)
    };
    v(Q, kf);
    var mf = [{filename: "uploads/game/html5/25780/cta-sprite2.png", size: [672, 821]}, {
            filename: "uploads/game/html5/25780/opening-sprite-1.png",
            size: [1445, 1738]
        }, {filename: "uploads/game/html5/25780/opening-sprite-2.jpg", size: [1297, 360]}, {
            filename: "uploads/game/html5/25780/opening-sprite-3.jpg",
            size: [2098, 1351]
        }, {filename: "uploads/game/html5/25780/level1-jpg-sprite.jpg", size: [3387, 776]}, {
            filename: "uploads/game/html5/25780/level1-png-sprite.png",
            size: [2106, 1252]
        }, {filename: "uploads/game/html5/25780/level2-intro-sprite1.jpg", size: [1545, 1750]}, {
            filename: "uploads/game/html5/25780/level2-intro-sprite2.jpg",
            size: [1308, 1480]
        }, {filename: "uploads/game/html5/25780/level2-lose-sprite.jpg", size: [3245, 724]}, {
            filename: "uploads/game/html5/25780/level2-png-sprite.png",
            size: [1819, 758]
        }, {filename: "uploads/game/html5/25780/level3-intro-sprite1.jpg", size: [1546, 1716]}, {
            filename: "uploads/game/html5/25780/level3-intro-sprite2.jpg",
            size: [1308, 1480]
        }, {filename: "uploads/game/html5/25780/level3-lose-sprite.jpg", size: [3148, 724]}, {
            filename: "uploads/game/html5/25780/level3-png-sprite.png",
            size: [1717, 1291]
        }, {filename: "uploads/game/html5/25780/level4-intro-sprite1.jpg", size: [1545, 1750]}, {
            filename: "uploads/game/html5/25780/level4-intro-sprite2.jpg",
            size: [1308, 1480]
        }, {filename: "uploads/game/html5/25780/level4-lose-sprite.jpg", size: [3338, 759]}, {
            filename: "uploads/game/html5/25780/level4-png-sprite.png",
            size: [3408, 849]
        }, {filename: "uploads/game/html5/25780/level5-intro-sprite1.jpg", size: [1542, 1981]}, {
            filename: "uploads/game/html5/25780/level5-intro-sprite2.jpg",
            size: [1308, 1480]
        }, {filename: "uploads/game/html5/25780/level5-lose-sprite1.jpg", size: [1274, 1570]}, {
            filename: "uploads/game/html5/25780/level5-lose-sprite2.jpg",
            size: [2363, 724]
        }, {filename: "uploads/game/html5/25780/level5-win-sprite.jpg", size: [1486, 2017]}, {
            filename: "uploads/game/html5/25780/level5-png-sprite.png",
            size: [1199, 2581]
        }, {filename: "uploads/game/html5/25780/icecream-sprite.png", size: [1999, 968]}, {
            filename: "uploads/game/html5/25780/ending-sprite.png",
            size: [821, 100]
        }, {filename: "uploads/game/html5/25780/extraspicy-sprite.jpg", size: [1488, 2029]}], Ed = [0, 646, 0, 26, 26], nf = [0, 0, 0, 643, 821],
        of = [26, 0, 1669, 640, 360], pf = [1, 0, 0, 1445, 1738], qf = [2, 0, 0, 1297, 360],
        rf = [3, 1285, 0, 813, 994],
        sf = [3, 0, 0, 1282, 1351], tf = [5, 1550, 436, 362, 32], uf = [5, 1933, 404, 35, 35],
        vf = [5, 1971, 404, 35, 35];
    ca(Q);
    var wf = [{o: [25, 0, 0, 100, 100], x: 495, y: 34}, {
            o: [25, 0, 0, 100, 100],
            x: 495,
            y: 104
        }, {o: [25, 0, 0, 100, 100], x: 495, y: 174}, {o: [25, 0, 0, 100, 100], x: 495, y: 244}],
        xf = [{o: [25, 103, 0, 100, 100], x: 371, y: -80}, {
            o: [25, 103, 0, 100, 100],
            x: 371,
            y: -10
        }, {o: [25, 103, 0, 100, 100], x: 371, y: 60}, {o: [25, 103, 0, 100, 100], x: 371, y: 130}],
        yf = [{o: [25, 206, 0, 100, 100], x: 495, y: -80}, {
            o: [25, 206, 0, 100, 100],
            x: 495,
            y: -10
        }, {o: [25, 206, 0, 100, 100], x: 495, y: 60}, {o: [25, 206, 0, 100, 100], x: 495, y: 130}],
        zf = [{o: [25, 309, 0, 100, 100], x: 371, y: -133}, {o: [25, 309, 0, 100, 100], x: 371, y: -63},
            {o: [25, 309, 0, 100, 100], x: 371, y: 7}, {o: [25, 309, 0, 100, 100], x: 371, y: 77}],
        Af = [{o: [25, 618, 0, 100, 100], x: 495, y: -133}, {
            o: [25, 618, 0, 100, 100],
            x: 495,
            y: -63
        }, {o: [25, 618, 0, 100, 100], x: 495, y: 7}, {o: [25, 618, 0, 100, 100], x: 495, y: 77}],
        Bf = [{o: [25, 721, 0, 100, 100], x: 433, y: -15}, {
            o: [25, 721, 0, 100, 100],
            x: 433,
            y: 55
        }, {o: [25, 721, 0, 100, 100], x: 433, y: 125}, {o: [25, 721, 0, 100, 100], x: 433, y: 195}],
        Cf = [{o: [25, 309, 0, 100, 100], x: 371, y: -194}, {
            o: [25, 309, 0, 100, 100],
            x: 371,
            y: -124
        }, {o: [25, 309, 0, 100, 100], x: 371, y: -54}, {o: [25, 309, 0, 100, 100], x: 371, y: 16}],
        Df = [{o: [25, 412, 0, 100, 100], x: 495, y: -194}, {
            o: [25, 412, 0, 100, 100],
            x: 495,
            y: -124
        }, {o: [25, 412, 0, 100, 100], x: 495, y: -54}, {o: [25, 412, 0, 100, 100], x: 495, y: 16}],
        Ef = [{o: [25, 515, 0, 100, 100], x: 371, y: 34}, {
            o: [25, 515, 0, 100, 100],
            x: 371,
            y: 104
        }, {o: [25, 515, 0, 100, 100], x: 371, y: 174}, {o: [25, 515, 0, 100, 100], x: 371, y: 244}],
        Ff = [{o: [24, 1029, 781, 80, 83], x: 109, y: 221}, {
            o: [24, 573, 79, 96, 79],
            x: 101,
            y: 225
        }, {o: [24, 1711, 89, 96, 78], x: 101, y: 226}, {
            o: [24, 1656, 490, 91, 82],
            x: 102,
            y: 222
        }, {o: [24, 1656, 490, 91, 82], x: 102, y: 222}, {o: [24, 1258, 444, 92, 95], x: 102, y: 209},
            {o: [24, 291, 436, 92, 98], x: 119, y: 180}, {
                o: [24, 170, 38, 98, 95],
                x: 120,
                y: 168
            }, {o: [24, 1767, 0, 99, 86], x: 120, y: 164}, {
                o: [24, 1869, 0, 99, 86],
                x: 120,
                y: 172
            }, {o: [24, 194, 440, 92, 98], x: 117, y: 207}, {
                o: [24, 1079, 59, 83, 71],
                x: 113,
                y: 233
            }, {o: [24, 183, 792, 74, 79], x: 113, y: 225}, {
                o: [24, 1029, 781, 80, 83],
                x: 109,
                y: 221
            }, {o: [24, 1029, 781, 80, 83], x: 109, y: 221}, {
                o: [24, 1029, 781, 80, 83],
                x: 109,
                y: 221
            }, {o: [24, 1029, 781, 80, 83], x: 109, y: 221}], Gf = [{o: [24, 197, 201, 94, 77], x: 101, y: 154}, {
            o: [24, 391, 287, 94, 76],
            x: 101,
            y: 163
        }, {o: [24, 1275, 205, 94, 77], x: 101, y: 150}, {
            o: [24,
                1275, 205, 94, 77], x: 101, y: 150
        }, {o: [24, 1174, 294, 94, 76], x: 101, y: 139}, {
            o: [24, 473, 38, 97, 84],
            x: 132,
            y: 117
        }, {o: [24, 466, 207, 94, 77], x: 258, y: 125}, {
            o: [24, 1177, 134, 95, 77],
            x: 360,
            y: 132
        }, {o: [24, 1612, 743, 80, 134], x: 484, y: 126}, {
            o: [24, 1177, 794, 59, 155],
            x: 472,
            y: 121
        }, {o: [24, 1112, 792, 62, 175], x: 450, y: 112}], Hf = [{o: [24, 1566, 303, 94, 76], x: 101, y: 96}, {
            o: [24, 757, 306, 94, 76],
            x: 101,
            y: 100
        }, {o: [24, 854, 306, 94, 76], x: 101, y: 108}, {
            o: [24, 1468, 306, 94, 76],
            x: 101,
            y: 99
        }, {o: [24, 1468, 306, 94, 76], x: 101, y: 99}, {o: [24, 967, 220, 94, 77], x: 101, y: 77}, {
            o: [24,
                488, 311, 94, 76], x: 101, y: 65
        }, {o: [24, 0, 316, 94, 76], x: 101, y: 59}, {
            o: [24, 1372, 222, 94, 77],
            x: 101,
            y: 70
        }, {o: [24, 585, 324, 94, 76], x: 101, y: 79}, {
            o: [24, 1584, 223, 94, 77],
            x: 101,
            y: 100
        }, {o: [24, 1875, 331, 94, 76], x: 101, y: 134}, {
            o: [24, 1663, 332, 94, 76],
            x: 101,
            y: 161
        }, {o: [24, 197, 201, 94, 77], x: 101, y: 154}, {
            o: [24, 197, 201, 94, 77],
            x: 101,
            y: 154
        }, {o: [24, 197, 201, 94, 77], x: 101, y: 154}, {o: [24, 197, 201, 94, 77], x: 101, y: 154}],
        If = [{o: [24, 1760, 332, 94, 76], x: 101, y: 41}, {
            o: [24, 763, 226, 94, 77],
            x: 101,
            y: 45
        }, {o: [24, 292, 357, 94, 76], x: 101, y: 51}, {
            o: [24, 194, 361, 94,
                76], x: 101, y: 46
        }, {o: [24, 194, 361, 94, 76], x: 101, y: 46}, {
            o: [24, 860, 226, 94, 77],
            x: 101,
            y: 32
        }, {o: [24, 1271, 365, 94, 76], x: 101, y: 25}, {
            o: [24, 389, 366, 94, 76],
            x: 101,
            y: 20
        }, {o: [24, 1161, 373, 94, 76], x: 101, y: 24}, {
            o: [24, 1469, 226, 94, 77],
            x: 101,
            y: 29
        }, {o: [24, 1760, 332, 94, 76], x: 101, y: 41}, {
            o: [24, 1161, 373, 94, 76],
            x: 101,
            y: 69
        }, {o: [24, 563, 231, 94, 77], x: 101, y: 98}, {
            o: [24, 1566, 303, 94, 76],
            x: 101,
            y: 96
        }, {o: [24, 1566, 303, 94, 76], x: 101, y: 96}, {
            o: [24, 1566, 303, 94, 76],
            x: 101,
            y: 96
        }, {o: [24, 1566, 303, 94, 76], x: 101, y: 96}], Jf = [{o: [24, 0, 236, 94, 77], x: 101, y: 154},
            {o: [24, 1054, 374, 94, 76], x: 101, y: 163}, {
                o: [24, 660, 244, 94, 77],
                x: 101,
                y: 150
            }, {o: [24, 660, 244, 94, 77], x: 101, y: 150}, {
                o: [24, 97, 375, 94, 76],
                x: 101,
                y: 139
            }, {o: [24, 779, 59, 97, 84], x: 132, y: 117}, {
                o: [24, 1876, 251, 94, 77],
                x: 258,
                y: 125
            }, {o: [24, 979, 140, 95, 77], x: 360, y: 132}, {
                o: [24, 277, 781, 80, 134],
                x: 484,
                y: 126
            }, {o: [24, 1239, 794, 59, 155], x: 472, y: 121}, {o: [24, 91, 793, 62, 175], x: 450, y: 112}],
        Kf = [{o: [24, 1222, 713, 88, 78], x: 104, y: 103}, {
            o: [24, 460, 714, 88, 78],
            x: 104,
            y: 107
        }, {o: [24, 1432, 714, 88, 78], x: 104, y: 111}, {o: [24, 667, 635, 88, 79], x: 104, y: 103}, {
            o: [24,
                667, 635, 88, 79], x: 104, y: 103
        }, {o: [24, 758, 635, 88, 79], x: 104, y: 78}, {
            o: [24, 0, 715, 88, 78],
            x: 104,
            y: 65
        }, {o: [24, 568, 654, 88, 79], x: 104, y: 58}, {
            o: [24, 1821, 659, 88, 79],
            x: 104,
            y: 68
        }, {o: [24, 1728, 660, 88, 79], x: 104, y: 76}, {
            o: [24, 1608, 661, 88, 79],
            x: 104,
            y: 100
        }, {o: [24, 949, 697, 88, 79], x: 104, y: 134}, {
            o: [24, 779, 385, 94, 76],
            x: 101,
            y: 160
        }, {o: [24, 951, 379, 94, 76], x: 101, y: 154}, {
            o: [24, 951, 379, 94, 76],
            x: 101,
            y: 154
        }, {o: [24, 951, 379, 94, 76], x: 101, y: 154}, {o: [24, 951, 379, 94, 76], x: 101, y: 154}],
        Lf = [{o: [24, 659, 717, 88, 78], x: 104, y: 39}, {
            o: [24, 949, 697, 88,
                79], x: 104, y: 44
        }, {o: [24, 750, 717, 88, 78], x: 104, y: 50}, {
            o: [24, 551, 736, 88, 78],
            x: 104,
            y: 45
        }, {o: [24, 551, 736, 88, 78], x: 104, y: 45}, {
            o: [24, 758, 635, 88, 79],
            x: 104,
            y: 33
        }, {o: [24, 1040, 699, 88, 79], x: 104, y: 24}, {
            o: [24, 186, 710, 88, 79],
            x: 104,
            y: 18
        }, {o: [24, 1131, 710, 88, 79], x: 104, y: 23}, {
            o: [24, 1819, 741, 88, 78],
            x: 104,
            y: 27
        }, {o: [24, 92, 711, 88, 79], x: 104, y: 40}, {
            o: [24, 849, 711, 88, 79],
            x: 104,
            y: 72
        }, {o: [24, 1341, 712, 88, 79], x: 104, y: 106}, {
            o: [24, 1222, 713, 88, 78],
            x: 104,
            y: 103
        }, {o: [24, 1222, 713, 88, 78], x: 104, y: 103}, {o: [24, 1222, 713, 88, 78], x: 104, y: 103},
            {o: [24, 1222, 713, 88, 78], x: 104, y: 103}], Mf = [{o: [24, 1778, 252, 94, 77], x: 101, y: 154}, {
            o: [24, 1465, 385, 94, 76],
            x: 101,
            y: 163
        }, {o: [24, 294, 277, 94, 77], x: 101, y: 150}, {
            o: [24, 294, 277, 94, 77],
            x: 101,
            y: 150
        }, {o: [24, 486, 390, 94, 76], x: 101, y: 139}, {
            o: [24, 879, 59, 97, 84],
            x: 132,
            y: 117
        }, {o: [24, 195, 281, 94, 77], x: 258, y: 125}, {
            o: [24, 771, 146, 95, 77],
            x: 360,
            y: 132
        }, {o: [24, 360, 781, 80, 134], x: 484, y: 126}, {
            o: [24, 1301, 794, 59, 155],
            x: 472,
            y: 121
        }, {o: [24, 841, 793, 62, 175], x: 450, y: 112}],
        Nf = [{o: [24, 1048, 453, 91, 83], x: 102, y: 94}, {o: [24, 97, 454, 91, 83], x: 102, y: 99},
            {o: [24, 1750, 490, 91, 82], x: 102, y: 106}, {
                o: [24, 876, 458, 91, 83],
                x: 102,
                y: 100
            }, {o: [24, 876, 458, 91, 83], x: 102, y: 100}, {
                o: [24, 1353, 460, 91, 83],
                x: 102,
                y: 76
            }, {o: [24, 386, 531, 91, 82], x: 102, y: 65}, {
                o: [24, 1142, 531, 91, 82],
                x: 102,
                y: 59
            }, {o: [24, 1562, 461, 91, 83], x: 102, y: 68}, {
                o: [24, 680, 464, 91, 83],
                x: 102,
                y: 77
            }, {o: [24, 774, 464, 91, 83], x: 102, y: 98}, {
                o: [24, 289, 537, 91, 82],
                x: 102,
                y: 132
            }, {o: [24, 1759, 411, 94, 76], x: 101, y: 160}, {
                o: [24, 0, 395, 94, 76],
                x: 101,
                y: 154
            }, {o: [24, 0, 395, 94, 76], x: 101, y: 154}, {o: [24, 0, 395, 94, 76], x: 101, y: 154}, {
                o: [24, 0, 395, 94, 76],
                x: 101, y: 154
            }], Of = [{o: [24, 970, 539, 91, 82], x: 99, y: 40}, {
            o: [24, 94, 540, 91, 82],
            x: 99,
            y: 44
        }, {o: [24, 188, 541, 91, 82], x: 99, y: 49}, {
            o: [24, 1236, 542, 91, 82],
            x: 99,
            y: 43
        }, {o: [24, 1236, 542, 91, 82], x: 99, y: 43}, {
            o: [24, 868, 544, 91, 82],
            x: 99,
            y: 33
        }, {o: [24, 1447, 464, 91, 83], x: 99, y: 24}, {
            o: [24, 1330, 546, 91, 82],
            x: 99,
            y: 19
        }, {o: [24, 1541, 547, 91, 82], x: 99, y: 25}, {o: [24, 481, 469, 91, 83], x: 99, y: 27}, {
            o: [24, 0, 474, 91, 83],
            x: 99,
            y: 39
        }, {o: [24, 669, 550, 91, 82], x: 99, y: 69}, {
            o: [24, 575, 482, 91, 83],
            x: 102,
            y: 99
        }, {o: [24, 1048, 453, 91, 83], x: 102, y: 94}, {
            o: [24, 1048, 453,
                91, 83], x: 102, y: 94
        }, {o: [24, 1048, 453, 91, 83], x: 102, y: 94}, {o: [24, 1048, 453, 91, 83], x: 102, y: 94}],
        Pf = [{o: [5, 1072, 612, 254, 23], x: 386, y: 4}], Qf = [{o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
            o: [5, 442, 818, 169, 195],
            x: 463,
            y: 109
        }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
            o: [5, 442, 818, 169, 195],
            x: 463,
            y: 109
        }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
            o: [5, 442, 818, 169, 195],
            x: 463,
            y: 109
        }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
            o: [5, 442, 818, 169, 195],
            x: 463,
            y: 109
        }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {o: [5, 1241, 843, 166, 194], x: 474, y: 110}, {
            o: [5, 1579,
                906, 156, 192], x: 484, y: 111
        }, {o: [5, 764, 964, 143, 190], x: 497, y: 113}, {
            o: [5, 1055, 1039, 136, 186],
            x: 504,
            y: 117
        }, {o: [5, 169, 1049, 132, 182], x: 508, y: 121}, {
            o: [5, 1718, 713, 179, 190],
            x: 461,
            y: 114
        }, {o: [5, 1072, 638, 195, 195], x: 420, y: 114}, {
            o: [5, 1527, 673, 188, 201],
            x: 433,
            y: 110
        }, {o: [5, 1933, 202, 172, 199], x: 447, y: 108}, {
            o: [5, 1072, 836, 166, 200],
            x: 457,
            y: 106
        }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}], Rf = [{o: [9, 855, 535, 94, 178], x: 493, y: 117}, {
            o: [9, 855, 535, 94, 178],
            x: 493,
            y: 117
        }, {o: [9, 855, 535, 94, 178], x: 493, y: 117}, {o: [9, 855, 535, 94, 178], x: 493, y: 117},
            {o: [9, 855, 535, 94, 178], x: 493, y: 117}, {
                o: [9, 855, 535, 94, 178],
                x: 493,
                y: 117
            }, {o: [9, 855, 535, 94, 178], x: 493, y: 117}, {
                o: [9, 855, 535, 94, 178],
                x: 493,
                y: 117
            }, {o: [9, 855, 535, 94, 178], x: 493, y: 117}, {
                o: [9, 1224, 464, 103, 172],
                x: 498,
                y: 117
            }, {o: [9, 1499, 365, 109, 171], x: 502, y: 118}, {
                o: [9, 0, 265, 132, 131],
                x: 508,
                y: 132
            }, {o: [9, 135, 265, 125, 121], x: 515, y: 125}, {
                o: [9, 263, 265, 125, 121],
                x: 515,
                y: 131
            }, {o: [9, 517, 342, 119, 126], x: 521, y: 166}, {
                o: [9, 1261, 317, 120, 144],
                x: 520,
                y: 148
            }, {o: [9, 193, 568, 77, 167], x: 486, y: 130}, {o: [9, 1397, 185, 85, 168], x: 489, y: 127}, {
                o: [9,
                    855, 535, 94, 178], x: 493, y: 117
            }], Sf = [{o: [13, 724, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 724, 912, 124, 146],
            x: 490,
            y: 150
        }, {o: [13, 724, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 724, 912, 124, 146],
            x: 490,
            y: 150
        }, {o: [13, 724, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 724, 912, 124, 146],
            x: 490,
            y: 150
        }, {o: [13, 724, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 724, 912, 124, 146],
            x: 490,
            y: 150
        }, {o: [13, 724, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 1104, 912, 120, 146],
            x: 494,
            y: 150
        }, {o: [13, 1071, 1061, 108, 146], x: 506, y: 150}, {o: [13, 1182, 1115, 97, 140], x: 517, y: 156}, {
            o: [13, 1382, 1115, 96,
                133], x: 530, y: 163
        }, {o: [13, 596, 1112, 100, 129], x: 534, y: 167}, {
            o: [13, 1282, 1115, 97, 129],
            x: 540,
            y: 167
        }, {o: [13, 1582, 0, 105, 130], x: 517, y: 167}, {
            o: [13, 1536, 136, 161, 129],
            x: 459,
            y: 168
        }, {o: [13, 1583, 754, 134, 138], x: 486, y: 158}, {
            o: [13, 181, 862, 147, 146],
            x: 490,
            y: 150
        }, {o: [13, 851, 912, 124, 146], x: 490, y: 150}, {
            o: [13, 724, 912, 124, 146],
            x: 490,
            y: 150
        }, {o: [13, 724, 912, 124, 146], x: 490, y: 150}, {o: [13, 724, 912, 124, 146], x: 490, y: 150}],
        Tf = [{o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
            o: [17, 302, 501, 133, 250],
            x: 488,
            y: 68
        }, {o: [17, 302, 501, 133, 250], x: 488, y: 68},
            {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                o: [17, 302, 501, 133, 250],
                x: 488,
                y: 68
            }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                o: [17, 302, 501, 133, 250],
                x: 488,
                y: 68
            }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                o: [17, 302, 501, 133, 250],
                x: 488,
                y: 68
            }, {o: [17, 1885, 577, 124, 254], x: 502, y: 64}, {
                o: [17, 2138, 580, 118, 250],
                x: 512,
                y: 67
            }, {o: [17, 722, 581, 114, 246], x: 521, y: 71}, {
                o: [17, 3068, 593, 111, 231],
                x: 529,
                y: 86
            }, {o: [17, 3277, 0, 113, 221], x: 527, y: 96}, {
                o: [17, 1171, 581, 112, 242],
                x: 520,
                y: 72
            }, {o: [17, 839, 581, 113, 268], x: 517, y: 61}, {
                o: [17, 2012, 577, 123, 254], x: 501,
                y: 64
            }, {o: [17, 133, 520, 130, 254], x: 493, y: 64}, {o: [17, 302, 501, 133, 250], x: 488, y: 68}],
        Uf = [{o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
            o: [23, 0, 1752, 220, 277],
            x: 412,
            y: 22
        }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
            o: [23, 0, 1752, 220, 277],
            x: 412,
            y: 22
        }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
            o: [23, 0, 1752, 220, 277],
            x: 412,
            y: 22
        }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
            o: [23, 0, 1752, 220, 277],
            x: 412,
            y: 22
        }, {o: [23, 453, 1757, 215, 277], x: 423, y: 21}, {
            o: [23, 0, 2032, 209, 278],
            x: 431,
            y: 18
        }, {o: [23, 886, 2032, 207, 279], x: 433, y: 16}, {
            o: [23, 648, 2298, 202, 281], x: 438,
            y: 14
        }, {o: [23, 648, 2298, 202, 281], x: 438, y: 14}, {
            o: [23, 648, 2298, 202, 281],
            x: 438,
            y: 14
        }, {o: [23, 648, 2298, 202, 281], x: 438, y: 14}, {
            o: [23, 438, 2037, 207, 279],
            x: 433,
            y: 16
        }, {o: [23, 212, 2162, 207, 278], x: 431, y: 18}, {
            o: [23, 223, 1881, 212, 278],
            x: 423,
            y: 20
        }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}];
    var Vf = Q.ma(), R = function (a) {
        for (var b = [], c = [], d = [], e = 0, f; f = a[e]; e++) b.push(f ? f.o : null), c.push(f ? f.x : 0), d.push(f ? f.y : 0);
        return {frames: b, x: c, y: d}
    }, Wf = function (a, b) {
        return {frames: Ba(a.frames, b.frames), x: Ba(a.x, b.x), y: Ba(a.y, b.y)}
    }, Xf = function (a, b) {
        ff(a, 0, !0);
        gf(a, .25, b ? b : .01)
    }, Yf = function (a) {
        var b = 1.5, b = b ? b : .01;
        gf(a, .01, b);
        window.setTimeout(function () {
            af(a)
        }, 1E3 * b)
    };
    var We = null, S = null, Ld = 1E3 / 60, Zf = xd(0, 0, 640, 360), Da = {o: null, x: 0, y: 0}, T = R([Da]),
        U = function (a) {
            return {frames: a.frames.slice(0, 1), x: a.x.slice(0, 1), y: a.y.slice(0, 1)}
        }, $f = {
            Wa: R(If),
            Ub: U(R(If)),
            Ra: R(Hf),
            Sb: U(R(Hf)),
            Tb: R([{o: [24, 369, 196, 94, 78], x: 101, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 101,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 101, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 101,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 101, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 101,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 101, y: 92}, {o: [24, 369, 196, 94, 78], x: 101, y: 92}, {
                o: [24, 369, 196,
                    94, 78], x: 101, y: 95
            }, {o: [24, 369, 196, 94, 78], x: 96, y: 66}, {
                o: [24, 271, 119, 95, 79],
                x: 91,
                y: 39
            }, {o: [24, 979, 59, 97, 78], x: 89, y: 34}, {
                o: [24, 979, 59, 97, 78],
                x: 89,
                y: 34
            }, {o: [24, 1810, 89, 96, 78], x: 91, y: 39}, {
                o: [24, 1810, 89, 96, 78],
                x: 99,
                y: 83
            }, {o: [24, 369, 196, 94, 78], x: 101, y: 102}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196,
                    94, 78], x: 100, y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {
                o: [24, 369, 196, 94, 78],
                x: 100,
                y: 92
            }, {o: [24, 369, 196, 94, 78], x: 100, y: 92}, {o: [24, 369, 196, 94, 78], x: 100, y: 92}]),
            hb: R(Gf),
            kb: R([{o: [24, 1177, 214, 94, 77], x: 101, y: 154}, {
                o: [24, 1064, 295, 94, 76],
                x: 101,
                y: 158
            }, {o: [24, 97, 296, 94, 76], x: 101, y: 163}, {
                o: [24, 1077, 215, 94, 77],
                x: 101,
                y: 150
            }, {o: [24, 1077, 215, 94, 77], x: 101, y: 150}, {
                o: [24, 957, 300,
                    94, 76], x: 101, y: 139
            }, {o: [24, 1513, 61, 96, 83], x: 133, y: 117}, {
                o: [24, 99, 136, 95, 77],
                x: 259,
                y: 125
            }, {o: [24, 372, 114, 95, 79], x: 347, y: 170}, {
                o: [24, 1413, 0, 115, 58],
                x: 394,
                y: 250
            }, {o: [24, 779, 0, 126, 56], x: 387, y: 251}, {o: [24, 170, 0, 151, 35], x: 378, y: 273}]),
            Nb: U(R(Gf)),
            Ob: R([{o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24,
                    1177, 214, 94, 77], x: 101, y: 144
            }, {o: [24, 1371, 302, 94, 76], x: 101, y: 148}, {
                o: [24, 1682, 170, 94, 79],
                x: 97,
                y: 112
            }, {o: [24, 1876, 170, 94, 78], x: 97, y: 86}, {
                o: [24, 1779, 170, 94, 79],
                x: 96,
                y: 80
            }, {o: [24, 1779, 170, 94, 79], x: 96, y: 80}, {
                o: [24, 98, 216, 94, 77],
                x: 95,
                y: 90
            }, {o: [24, 1486, 147, 95, 76], x: 100, y: 140}, {
                o: [24, 372, 38, 98, 73],
                x: 100,
                y: 148
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94,
                    77], x: 101, y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {
                o: [24, 1177, 214, 94, 77],
                x: 101,
                y: 144
            }, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}, {o: [24, 1177, 214, 94, 77], x: 101, y: 144}])
        }, ag = {
            Wa: R(Lf),
            Ub: U(R(Lf)),
            Ra: R(Kf),
            Sb: U(R(Kf)),
            Tb: R([{o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {o: [24, 1222, 713, 88, 78], x: 104, y: 93},
                {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 278, 699, 88, 79], x: 104, y: 95}, {
                    o: [24, 476, 633, 89, 78],
                    x: 98,
                    y: 67
                }, {o: [24, 1249, 631, 89, 79], x: 94, y: 40}, {
                    o: [24, 0, 634, 89, 78],
                    x: 93,
                    y: 36
                }, {o: [24, 0, 634, 89, 78], x: 93, y: 36}, {
                    o: [24, 1516, 632, 89, 79],
                    x: 95,
                    y: 41
                }, {o: [24, 369, 699, 88, 79], x: 103, y: 84}, {o: [24, 1151, 452, 92, 76], x: 102, y: 102}, {
                    o: [24, 1222, 713, 88, 78], x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24, 1222, 713, 88, 78],
                    x: 104,
                    y: 93
                }, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {o: [24, 1222, 713, 88, 78], x: 104, y: 93}, {
                    o: [24,
                        1222, 713, 88, 78], x: 104, y: 93
                }]),
            hb: R(Jf),
            kb: R([{o: [24, 951, 379, 94, 76], x: 101, y: 154}, {
                o: [24, 1368, 381, 94, 76],
                x: 101,
                y: 158
            }, {o: [24, 1565, 382, 94, 76], x: 101, y: 163}, {
                o: [24, 1681, 252, 94, 77],
                x: 101,
                y: 150
            }, {o: [24, 1681, 252, 94, 77], x: 101, y: 150}, {
                o: [24, 682, 385, 94, 76],
                x: 101,
                y: 139
            }, {o: [24, 1612, 61, 96, 83], x: 133, y: 117}, {
                o: [24, 1388, 142, 95, 77],
                x: 259,
                y: 125
            }, {o: [24, 1290, 123, 95, 79], x: 347, y: 170}, {
                o: [24, 1531, 0, 115, 58],
                x: 394,
                y: 250
            }, {o: [24, 908, 0, 126, 56], x: 387, y: 251}, {o: [24, 324, 0, 151, 35], x: 378, y: 273}]),
            Nb: U(R(Jf)),
            Ob: R([{
                o: [24, 1222,
                    713, 88, 78], x: 104, y: 145
            }, {o: [24, 1222, 713, 88, 78], x: 104, y: 145}, {
                o: [24, 1222, 713, 88, 78],
                x: 104,
                y: 145
            }, {o: [24, 1222, 713, 88, 78], x: 104, y: 145}, {
                o: [24, 1222, 713, 88, 78],
                x: 104,
                y: 145
            }, {o: [24, 1222, 713, 88, 78], x: 104, y: 145}, {
                o: [24, 1222, 713, 88, 78],
                x: 104,
                y: 145
            }, {o: [24, 1222, 713, 88, 78], x: 104, y: 145}, {
                o: [24, 1222, 713, 88, 78],
                x: 104,
                y: 149
            }, {o: [24, 1424, 630, 89, 79], x: 100, y: 113}, {
                o: [24, 186, 626, 89, 81],
                x: 100,
                y: 85
            }, {o: [24, 186, 626, 89, 81], x: 99, y: 79}, {
                o: [24, 186, 626, 89, 81],
                x: 99,
                y: 79
            }, {o: [24, 383, 616, 90, 80], x: 97, y: 90}, {
                o: [24, 383, 616, 90, 80],
                x: 104, y: 138
            }, {o: [24, 271, 38, 98, 78], x: 100, y: 147}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                o: [24, 383, 616, 90, 80],
                x: 103,
                y: 144
            }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {o: [24, 383, 616, 90, 80], x: 103, y: 144},
                {o: [24, 383, 616, 90, 80], x: 103, y: 144}, {
                    o: [24, 383, 616, 90, 80],
                    x: 103,
                    y: 144
                }, {o: [24, 383, 616, 90, 80], x: 103, y: 144}])
        }, bg = {
            Wa: R(Of),
            Ub: U(R(Of)),
            Ra: R(Nf),
            Sb: U(R(Nf)),
            Tb: R([{o: [24, 94, 625, 89, 83], x: 104, y: 90}, {
                o: [24, 94, 625, 89, 83],
                x: 104,
                y: 90
            }, {o: [24, 94, 625, 89, 83], x: 104, y: 90}, {
                o: [24, 94, 625, 89, 83],
                x: 104,
                y: 90
            }, {o: [24, 94, 625, 89, 83], x: 104, y: 90}, {
                o: [24, 94, 625, 89, 83],
                x: 104,
                y: 90
            }, {o: [24, 94, 625, 89, 83], x: 104, y: 90}, {
                o: [24, 94, 625, 89, 83],
                x: 104,
                y: 90
            }, {o: [24, 94, 625, 89, 83], x: 104, y: 93}, {o: [24, 1635, 575, 90, 83], x: 97, y: 64}, {
                o: [24, 1635,
                    575, 90, 83], x: 94, y: 37
            }, {o: [24, 1635, 575, 90, 83], x: 93, y: 33}, {
                o: [24, 1635, 575, 90, 83],
                x: 93,
                y: 33
            }, {o: [24, 1635, 575, 90, 83], x: 94, y: 39}, {
                o: [24, 1635, 575, 90, 83],
                x: 102,
                y: 81
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 97}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83], x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}, {
                o: [24, 1635, 575, 90, 83],
                x: 103,
                y: 90
            }, {o: [24, 1635, 575, 90, 83], x: 103, y: 90}]),
            hb: R(Mf),
            kb: R([{o: [24, 0, 395, 94, 76], x: 101, y: 154}, {
                o: [24, 583, 403, 94, 76],
                x: 101,
                y: 158
            }, {o: [24, 1857, 410, 94, 76], x: 101, y: 163}, {
                o: [24, 1274, 285, 94, 77],
                x: 101,
                y: 150
            }, {o: [24, 1274, 285, 94, 77], x: 101, y: 150}, {o: [24, 1662, 411, 94, 76], x: 101, y: 139}, {
                o: [24, 0, 75, 96, 83], x: 133,
                y: 117
            }, {o: [24, 869, 146, 95, 77], x: 259, y: 125}, {
                o: [24, 470, 125, 95, 79],
                x: 347,
                y: 170
            }, {o: [24, 1649, 0, 115, 58], x: 394, y: 250}, {
                o: [24, 1037, 0, 126, 56],
                x: 387,
                y: 251
            }, {o: [24, 478, 0, 151, 35], x: 378, y: 273}]),
            Nb: U(R(Mf)),
            Ob: R([{o: [24, 1728, 575, 90, 82], x: 103, y: 143}, {
                o: [24, 1728, 575, 90, 82],
                x: 103,
                y: 143
            }, {o: [24, 1728, 575, 90, 82], x: 103, y: 143}, {
                o: [24, 1728, 575, 90, 82],
                x: 103,
                y: 143
            }, {o: [24, 1728, 575, 90, 82], x: 103, y: 143}, {
                o: [24, 1728, 575, 90, 82],
                x: 103,
                y: 143
            }, {o: [24, 1728, 575, 90, 82], x: 103, y: 143}, {o: [24, 1728, 575, 90, 82], x: 103, y: 143}, {
                o: [24, 1728,
                    575, 90, 82], x: 103, y: 146
            }, {o: [24, 1728, 575, 90, 82], x: 99, y: 111}, {
                o: [24, 386, 445, 92, 83],
                x: 97,
                y: 85
            }, {o: [24, 386, 445, 92, 83], x: 97, y: 79}, {
                o: [24, 386, 445, 92, 83],
                x: 97,
                y: 79
            }, {o: [24, 386, 445, 92, 83], x: 96, y: 87}, {
                o: [24, 574, 568, 90, 83],
                x: 105,
                y: 136
            }, {o: [24, 1413, 61, 97, 78], x: 100, y: 147}, {
                o: [24, 574, 568, 90, 83],
                x: 103,
                y: 142
            }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                o: [24, 574, 568, 90, 83],
                x: 103,
                y: 142
            }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                o: [24, 574, 568, 90, 83],
                x: 103,
                y: 142
            }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {o: [24, 574, 568, 90, 83], x: 103, y: 142},
                {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                    o: [24, 574, 568, 90, 83],
                    x: 103,
                    y: 142
                }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                    o: [24, 574, 568, 90, 83],
                    x: 103,
                    y: 142
                }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                    o: [24, 574, 568, 90, 83],
                    x: 103,
                    y: 142
                }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}, {
                    o: [24, 574, 568, 90, 83],
                    x: 103,
                    y: 142
                }, {o: [24, 574, 568, 90, 83], x: 103, y: 142}])
        }, cg = {Wa: T, Ub: T, Ra: T, Sb: T, Tb: T, hb: T, kb: T, Nb: T, Ob: T}, dg = R([Ff[0]]), eg = R(Ff),
        fg = R([{o: [24, 1029, 781, 80, 83], x: 109, y: 221}, {
            o: [24, 1029, 781, 80, 83],
            x: 109,
            y: 221
        }, {o: [24, 1029, 781, 80, 83], x: 109, y: 221},
            {o: [24, 1029, 781, 80, 83], x: 109, y: 221}, {
                o: [24, 1166, 0, 121, 131],
                x: 61,
                y: 172
            }, {o: [24, 1290, 0, 120, 120], x: 54, y: 183}, {
                o: [24, 632, 0, 144, 76],
                x: 61,
                y: 238
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72], x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}, {
                o: [24, 0, 0, 167, 72],
                x: 48,
                y: 243
            }, {o: [24, 0, 0, 167, 72], x: 48, y: 243}]), gg = R([{o: [24, 1029, 781, 80, 83], x: 109, y: 211}, {
            o: [24, 1029, 781, 80, 83],
            x: 109,
            y: 211
        }, {o: [24, 1029, 781, 80, 83], x: 109, y: 211}, {
            o: [24, 1029, 781, 80, 83],
            x: 109,
            y: 211
        }, {o: [24, 1029, 781, 80, 83], x: 109, y: 211}, {
            o: [24, 1029, 781, 80, 83],
            x: 109,
            y: 211
        }, {o: [24, 1029, 781, 80, 83], x: 109, y: 211}, {
            o: [24, 1029, 781, 80,
                83], x: 109, y: 211
        }, {o: [24, 1914, 575, 79, 78], x: 109, y: 216}, {
            o: [24, 857, 629, 89, 79],
            x: 103,
            y: 176
        }, {o: [24, 1699, 742, 86, 77], x: 102, y: 155}, {
            o: [24, 1523, 743, 86, 72],
            x: 102,
            y: 151
        }, {o: [24, 1523, 743, 86, 72], x: 102, y: 151}, {
            o: [24, 940, 779, 86, 65],
            x: 102,
            y: 166
        }, {o: [24, 1910, 745, 86, 70], x: 106, y: 224}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86,
                83], x: 106, y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {
            o: [24, 1912, 659, 86, 83],
            x: 106,
            y: 211
        }, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}, {o: [24, 1912, 659, 86, 83], x: 106, y: 211}]), hg = {
            index: 1,
            id: "level1",
            Ab: "Pepper Name 1",
            yb: "Pepper Fact 1",
            Cb: "Level Rank 1",
            Db: 5,
            background: [4, 2747, 0, 640, 360],
            Na: {
                lb: [4,
                    2747, 363, 586, 262],
                qb: R(Qf),
                Qa: R([Qf[0]]),
                rb: [],
                va: R([{o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 1410, 877, 166, 194],
                    x: 474,
                    y: 110
                }, {o: [5, 1738, 906, 155, 192], x: 485, y: 111}, {o: [5, 910, 964, 142, 188], x: 498, y: 115}, {
                    o: [5, 1194, 1040,
                        136, 183], x: 504, y: 120
                }, {o: [5, 304, 1049, 132, 181], x: 508, y: 122}, {
                    o: [5, 0, 821, 166, 236],
                    x: 474,
                    y: 86
                }, {o: [5, 1887, 471, 212, 239], x: 427, y: 90}, {
                    o: [5, 1329, 612, 195, 228],
                    x: 445,
                    y: 95
                }, {o: [5, 263, 818, 176, 228], x: 464, y: 96}, {
                    o: [5, 263, 818, 176, 228],
                    x: 464,
                    y: 96
                }, {o: [5, 263, 818, 176, 228], x: 464, y: 96}]),
                Lb: R([{o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442,
                        818, 169, 195], x: 463, y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 442, 818, 169, 195], x: 463, y: 109}, {
                    o: [5, 442, 818, 169, 195],
                    x: 463,
                    y: 109
                }, {o: [5, 1896, 913, 155, 191], x: 485, y: 112}, {
                    o: [5, 614, 964, 147, 190],
                    x: 493,
                    y: 112
                }, {o: [5, 442, 1016, 137, 189], x: 503, y: 115}, {
                    o: [5, 1900, 713, 177, 197],
                    x: 447,
                    y: 106
                }, {o: [5, 0, 612, 260, 206], x: 357, y: 99}, {
                    o: [5, 379, 609, 304, 206],
                    x: 313,
                    y: 99
                }, {o: [5, 1550, 471, 334, 199], x: 283, y: 106}, {
                    o: [5, 895,
                        0, 418, 199], x: 199, y: 106
                }, {o: [5, 0, 0, 452, 199], x: 165, y: 106}, {
                    o: [5, 455, 0, 437, 199],
                    x: 180,
                    y: 106
                }, {o: [5, 1316, 0, 402, 199], x: 215, y: 106}, {
                    o: [5, 1721, 0, 385, 199],
                    x: 232,
                    y: 106
                }, {o: [5, 758, 401, 373, 199], x: 244, y: 106}, {
                    o: [5, 784, 202, 384, 196],
                    x: 250,
                    y: 109
                }, {o: [5, 0, 202, 389, 186], x: 250, y: 120}, {
                    o: [5, 0, 391, 376, 218],
                    x: 250,
                    y: 74
                }, {o: [5, 1554, 202, 376, 231], x: 250, y: 61}, {
                    o: [5, 379, 391, 376, 215],
                    x: 250,
                    y: 77
                }, {o: [5, 0, 202, 389, 186], x: 250, y: 120}, {
                    o: [5, 0, 391, 376, 218],
                    x: 250,
                    y: 74
                }, {o: [5, 1554, 202, 376, 231], x: 250, y: 61}, {
                    o: [5, 1171, 400, 376, 209], x: 250,
                    y: 83
                }, {o: [5, 392, 202, 389, 186], x: 250, y: 120}, {
                    o: [5, 1171, 202, 380, 195],
                    x: 250,
                    y: 109
                }, {o: [5, 1171, 202, 380, 195], x: 250, y: 109}, {
                    o: [5, 1171, 202, 380, 195],
                    x: 250,
                    y: 109
                }, {o: [5, 1171, 202, 380, 195], x: 250, y: 109}, {
                    o: [5, 1171, 202, 380, 195],
                    x: 250,
                    y: 109
                }, {o: [5, 1171, 202, 380, 195], x: 250, y: 109}, {o: [5, 1171, 202, 380, 195], x: 250, y: 109}])
            },
            Va: !0,
            va: [{
                ra: [4, 0, 0, 2744, 776], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [[300, 45, 2518, 364, 13, 9], [302, 56, 2501, 364, 13, 10]], [[294, 42, 2714, 433, 23, 31], [401, 85, 2672, 587, 71, 187]], [[294, 42, 2685,
                        462, 22, 34], [411, 85, 2102, 526, 99, 187]], [[296, 42, 2715, 395, 25, 34], [411, 81, 2479, 393, 99, 191]], [[295, 42, 2685, 358, 26, 32], [364, 81, 2576, 0, 103, 193]], [[295, 42, 2685, 426, 25, 32], [362, 86, 2479, 588, 85, 188]], [[294, 42, 2715, 359, 26, 32], [365, 91, 2740, 181, 3, 3], [362, 110, 2740, 188, 3, 3], [374, 82, 2576, 197, 103, 192]], [[294, 42, 2685, 500, 21, 34], [411, 82, 2582, 393, 99, 190]], [[297, 41, 2685, 394, 26, 28], [298, 72, 2565, 364, 6, 4], [411, 81, 2479, 393, 99, 191]], [[295, 41, 2683, 321, 28, 33], [364, 81, 2576, 0, 103, 193]], [[295, 42, 2711, 468, 22, 32], [362, 86, 2479, 588,
                        85, 188]], [[294, 42, 2721, 278, 23, 32], [365, 91, 2740, 181, 3, 3], [362, 110, 2740, 188, 3, 3], [374, 82, 2576, 197, 103, 192]], [[294, 42, 2710, 504, 21, 34], [411, 82, 2582, 393, 99, 190]], [[296, 42, 2715, 321, 27, 34], [411, 81, 2479, 393, 99, 191]], [[265, 4, 1896, 364, 202, 270]], [[265, 4, 2293, 364, 182, 270]], [[265, 4, 1603, 364, 289, 281]], [[296, 46, 2479, 364, 18, 25], [367, 151, 2102, 364, 187, 158], [394, 331, 2683, 311, 34, 6]], [[296, 41, 2685, 538, 19, 30], [373, 149, 2683, 0, 60, 160]], [[303, 41, 2518, 377, 9, 7], [306, 52, 2501, 378, 9, 7]], [[294, 41, 2683, 278, 34, 29]], [], [], [], [], [[298,
                        48, 2535, 375, 9, 8], [298, 63, 2535, 364, 12, 7], [398, 155, 2740, 164, 3, 5], [355, 162, 2205, 526, 77, 147]], [[305, 337, 2740, 195, 3, 3], [333, 336, 2740, 173, 3, 4], [348, 339, 2740, 202, 3, 3], [369, 55, 2551, 364, 10, 18], [352, 161, 2582, 587, 86, 148], [360, 334, 2740, 209, 3, 3], [473, 0, 2740, 216, 3, 2]], [[358, 212, 2683, 164, 53, 53]], [[358, 212, 2683, 221, 53, 53]], [[358, 212, 2683, 164, 53, 53]], [[358, 212, 2683, 221, 53, 53]], [[358, 212, 2683, 164, 53, 53]], [[358, 212, 2683, 221, 53, 53]], [[358, 212, 2683, 164, 53, 53]], [[358, 212, 2683, 221, 53, 53]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 1288,
                        0, 640, 360]], [[0, 0, 1932, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[31, 2, 1288, 364, 311, 358]], [], [], []]
                }
            }, {ra: [5, 758, 603, 311, 358], ha: {width: 640, height: 360, frames: [[[31, 2, 0, 0, 311, 358]]]}}],
            Kb: !1,
            Gb: 0,
            mb: 3,
            Eb: 18,
            vb: 100,
            Jb: .9,
            Fb: [24, 5, 4],
            wb: P.mc
        }, ig = {
            index: 2,
            id: "level2",
            Ab: "Pepper Name 2",
            yb: "Pepper Fact 2",
            Cb: "Level Rank 2",
            Db: 3,
            background: [8, 2605, 0, 640, 360],
            Na: {
                lb: [9, 0, 0, 586, 262],
                qb: R(Rf),
                Qa: R([Rf[0]]),
                rb: [{
                    ra: [6, 0, 0, 1545, 1750], ha: {
                        width: 640, height: 360, frames: [[[0, 0, 0, 0, 640, 360]], [], [],
                            [[153, 61, 989, 904, 283, 248], [280, 332, 1536, 107, 3, 3]], [[153, 45, 702, 904, 283, 264], [268, 332, 1510, 180, 17, 9]], [], [[153, 43, 262, 1185, 246, 266], [203, 331, 262, 1114, 82, 10]], [[228, 35, 512, 1185, 178, 175]], [[228, 35, 958, 1470, 191, 174]], [[225, 34, 451, 1469, 198, 179]], [], [[404, 13, 1536, 114, 3, 3], [283, 34, 443, 364, 193, 184]], [[189, 19, 0, 668, 371, 238]], [[191, 20, 236, 1455, 211, 131], [246, 155, 1510, 0, 33, 8], [287, 166, 0, 910, 273, 143]], [[207, 71, 277, 910, 92, 83], [321, 177, 1305, 606, 220, 132], [388, 331, 375, 796, 40, 8]], [[314, 182, 1153, 1505, 94, 127], [314, 331,
                                262, 1084, 87, 11], [414, 332, 1536, 121, 3, 3], [418, 331, 1535, 129, 10, 6]], [[288, 183, 312, 1590, 69, 126], [314, 332, 375, 668, 51, 10]], [[290, 194, 1349, 1505, 77, 115], [358, 334, 1536, 93, 6, 3]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[290, 194, 1430, 1505, 77, 115], [358, 334, 1536, 100, 6, 3]], [[288, 183, 1349, 1624, 69, 126], [314, 332, 375, 682, 51, 10]], [[314, 182, 1251, 1505, 94, 127], [314, 331, 262, 1099, 87, 11], [414, 332, 1535, 149, 3, 3], [418, 331, 1535, 139, 10, 6]],
                            [[207, 71, 277, 997, 92, 83], [321, 177, 1305, 742, 220, 132], [388, 331, 375, 808, 40, 8]], [[0, 306, 1542, 26, 2, 6], [0, 333, 1542, 36, 2, 5], [0, 352, 1542, 53, 2, 3], [0, 356, 1542, 45, 2, 4], [404, 13, 1534, 156, 3, 3], [153, 17, 1118, 0, 388, 292], [163, 331, 512, 1364, 165, 11], [638, 306, 1542, 60, 2, 3], [638, 315, 1542, 67, 2, 3], [638, 321, 1542, 74, 2, 3], [638, 326, 1542, 81, 2, 3], [638, 347, 1543, 107, 2, 3]], [[330, 104, 653, 1473, 158, 198]], [[249, 83, 1510, 129, 21, 22], [278, 79, 1510, 155, 20, 21], [330, 98, 815, 1473, 104, 201]], [], [], [], [], [], [], [[167, 14, 1247, 1206, 239, 295], [185, 333, 512,
                                1419, 125, 8]], [[167, 13, 989, 1156, 254, 296], [185, 337, 1542, 12, 3, 3]], [[167, 11, 1276, 904, 258, 298], [174, 334, 512, 1393, 156, 9]], [[167, 11, 0, 1057, 258, 298], [174, 333, 512, 1406, 156, 9]], [[167, 12, 702, 1172, 252, 297], [295, 333, 1542, 19, 3, 3], [193, 337, 876, 595, 84, 3]], [[290, 99, 236, 1590, 72, 55]], [[167, 11, 0, 1359, 232, 298], [171, 334, 443, 581, 159, 8]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [], [[244,
                                118, 1510, 93, 22, 32]], [], [], [[239, 121, 1510, 54, 28, 35]], [], [], [], [], [], [], [], [], [], [], [[149, 15, 375, 887, 323, 294], [171, 332, 443, 566, 173, 11]], [[149, 15, 644, 297, 447, 294], [163, 332, 958, 1456, 202, 10]], [[170, 16, 644, 0, 470, 293], [187, 332, 1305, 878, 213, 10]], [[211, 21, 443, 595, 429, 288], [211, 332, 451, 1455, 206, 10]], [], [[215, 15, 876, 606, 425, 294], [233, 332, 443, 552, 184, 10]], [[201, 9, 0, 364, 439, 300], [233, 332, 702, 887, 168, 10]], [[201, 4, 1095, 297, 439, 305], [241, 332, 512, 1379, 160, 10]]]
                    }
                }, {
                    ra: [7, 0, 0, 1308, 1480], ha: {
                        width: 640, height: 360, frames: [[[0,
                            0, 0, 0, 640, 360]], [[201, 3, 644, 1156, 317, 306], [241, 332, 245, 1209, 160, 10], [638, 196, 1306, 0, 2, 27], [638, 229, 1294, 0, 2, 31]], [[222, 6, 0, 1209, 241, 271]], [[201, 9, 965, 1156, 252, 300], [241, 333, 409, 1209, 155, 9], [638, 196, 1300, 0, 2, 28], [638, 228, 1288, 0, 2, 32]], [], [], [], [], [], [], [], [], [], [], [], [[382, 119, 409, 1222, 109, 158]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 291]], [[0, 0, 644, 728, 640, 247]], [[0, 0, 644, 979, 640, 173]], [[0, 0, 0, 1023, 640, 110]], [[0, 0, 0, 1137, 640, 68]]]
                    }
                }],
                va: R([{
                    o: [9, 1109, 539,
                        94, 178], x: 493, y: 117
                }, {o: [9, 1109, 539, 94, 178], x: 493, y: 117}, {
                    o: [9, 1109, 539, 94, 178],
                    x: 493,
                    y: 117
                }, {o: [9, 1109, 539, 94, 178], x: 493, y: 117}, {
                    o: [9, 1109, 539, 94, 178],
                    x: 493,
                    y: 117
                }, {o: [9, 1109, 539, 94, 178], x: 493, y: 117}, {
                    o: [9, 1109, 539, 94, 178],
                    x: 493,
                    y: 117
                }, {o: [9, 1109, 539, 94, 178], x: 493, y: 117}, {
                    o: [9, 1109, 539, 94, 178],
                    x: 493,
                    y: 117
                }, {o: [9, 1224, 464, 103, 172], x: 498, y: 117}, {
                    o: [9, 135, 389, 109, 171],
                    x: 502,
                    y: 118
                }, {o: [9, 0, 265, 132, 131], x: 508, y: 132}, {
                    o: [9, 1261, 185, 133, 129],
                    x: 507,
                    y: 130
                }, {o: [9, 1261, 185, 133, 129], x: 507, y: 130}, {
                    o: [9, 1487,
                        174, 183, 188], x: 453, y: 103
                }, {o: [9, 1487, 174, 183, 188], x: 453, y: 103}, {
                    o: [9, 1487, 0, 185, 171],
                    x: 444,
                    y: 123
                }, {o: [9, 1675, 0, 144, 150], x: 495, y: 136}, {o: [9, 1675, 153, 141, 150], x: 490, y: 135}]),
                Lb: R([{o: [9, 1499, 539, 94, 178], x: 493, y: 117}, {
                    o: [9, 110, 563, 80, 180],
                    x: 497,
                    y: 114
                }, {o: [9, 757, 525, 95, 177], x: 492, y: 117}, {
                    o: [9, 639, 348, 115, 177],
                    x: 472,
                    y: 117
                }, {o: [9, 1109, 361, 112, 175], x: 478, y: 119}, {
                    o: [9, 1384, 365, 112, 173],
                    x: 485,
                    y: 121
                }, {o: [9, 875, 361, 115, 171], x: 487, y: 123}, {
                    o: [9, 875, 361, 115, 171],
                    x: 487,
                    y: 123
                }, {o: [9, 247, 389, 108, 176], x: 481, y: 118},
                    {o: [9, 0, 399, 107, 177], x: 480, y: 117}, {
                        o: [9, 0, 399, 107, 177],
                        x: 480,
                        y: 117
                    }, {o: [9, 0, 399, 107, 177], x: 480, y: 117}, {
                        o: [9, 0, 399, 107, 177],
                        x: 480,
                        y: 117
                    }, {o: [9, 358, 448, 106, 173], x: 490, y: 121}, {
                        o: [9, 732, 183, 133, 162],
                        x: 496,
                        y: 131
                    }, {o: [9, 589, 183, 140, 156], x: 499, y: 137}, {
                        o: [9, 589, 183, 140, 156],
                        x: 499,
                        y: 137
                    }, {o: [9, 993, 361, 113, 181], x: 467, y: 114}, {
                        o: [9, 1261, 0, 223, 182],
                        x: 346,
                        y: 111
                    }, {o: [9, 589, 0, 355, 180], x: 214, y: 113}, {
                        o: [9, 391, 265, 123, 180],
                        x: 446,
                        y: 113
                    }, {o: [9, 1711, 477, 96, 179], x: 480, y: 116}, {o: [9, 467, 471, 100, 173], x: 493, y: 122}, {
                        o: [9, 467,
                            471, 100, 173], x: 493, y: 122
                    }, {o: [9, 467, 471, 100, 173], x: 493, y: 122}, {
                        o: [9, 467, 471, 100, 173],
                        x: 493,
                        y: 122
                    }, {o: [9, 1330, 541, 88, 179], x: 496, y: 116}, {
                        o: [9, 667, 528, 84, 183],
                        x: 502,
                        y: 111
                    }, {o: [9, 570, 528, 94, 182], x: 501, y: 111}, {
                        o: [9, 1036, 545, 62, 191],
                        x: 511,
                        y: 102
                    }, {o: [9, 1611, 477, 97, 179], x: 487, y: 114}, {
                        o: [9, 273, 568, 62, 190],
                        x: 515,
                        y: 103
                    }, {o: [9, 757, 348, 115, 174], x: 502, y: 120}, {
                        o: [9, 1673, 306, 121, 168],
                        x: 504,
                        y: 125
                    }, {o: [9, 1421, 541, 72, 187], x: 498, y: 107}, {
                        o: [9, 1421, 541, 72, 187],
                        x: 498,
                        y: 107
                    }, {o: [9, 952, 545, 81, 186], x: 503, y: 108}, {
                        o: [9, 952,
                            545, 81, 186], x: 503, y: 108
                    }, {o: [9, 952, 545, 81, 186], x: 503, y: 108}])
            },
            Va: !1,
            va: [{
                ra: [8, 0, 0, 2602, 724], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [], [], [], [], [], [[377, 88, 2015, 364, 177, 197]], [[367, 151, 1824, 364, 187, 158], [394, 331, 1928, 526, 34, 6]], [[373, 149, 2536, 364, 60, 160]], [], [], [[270, 11, 2417, 516, 32, 40]], [[252, 7, 2310, 379, 50, 54]], [[248, 7, 2455, 515, 51, 59]], [[242, 7, 2196, 503, 51, 61]], [[242, 15, 2362, 516, 51, 53]], [[244, 5, 2252, 493, 51, 63], [299, 23, 2590, 0, 4, 5]], [[248, 5, 1877, 526, 47, 61], [299, 23, 2598, 0, 4, 5]],
                        [[242, 7, 2196, 503, 51, 61]], [[242, 15, 2362, 516, 51, 53]], [[244, 5, 2252, 493, 51, 63], [299, 23, 2590, 0, 4, 5], [398, 155, 2590, 9, 3, 5], [355, 162, 2455, 364, 77, 147]], [[244, 5, 2307, 493, 51, 63], [299, 23, 2598, 0, 4, 5], [305, 337, 2597, 17, 3, 3], [333, 336, 2597, 9, 3, 4], [348, 339, 2590, 18, 3, 3], [369, 55, 2576, 0, 10, 18], [352, 161, 2365, 364, 86, 148], [360, 334, 2576, 22, 3, 3], [473, 0, 2597, 24, 3, 2]], [[244, 5, 2252, 493, 51, 63], [299, 23, 2590, 0, 4, 5], [358, 212, 2253, 379, 53, 53]], [[242, 5, 2196, 379, 53, 63], [299, 23, 2598, 0, 4, 5], [358, 212, 2253, 436, 53, 53]], [[242, 15, 2196, 446,
                            52, 53], [358, 212, 2253, 379, 53, 53]], [[246, 16, 2310, 437, 49, 52], [358, 212, 2253, 436, 53, 53]], [[246, 5, 1824, 526, 49, 63], [299, 23, 2590, 0, 4, 5], [358, 212, 2253, 379, 53, 53]], [[242, 5, 2196, 379, 53, 63], [299, 23, 2598, 0, 4, 5], [358, 212, 2253, 436, 53, 53]], [[242, 15, 2196, 446, 52, 53], [358, 212, 2253, 379, 53, 53]], [[246, 16, 2310, 437, 49, 52], [358, 212, 2253, 436, 53, 53]], [[221, 3, 1603, 364, 217, 306], [263, 331, 2196, 364, 165, 11], [473, 0, 2583, 22, 3, 2]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 1288, 0, 640, 360]], [[0, 0, 1932, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364,
                            640, 360]], [[31, 2, 1288, 364, 311, 358]], []]
                }
            }, {ra: [9, 947, 0, 311, 358], ha: {width: 640, height: 360, frames: [[[31, 2, 0, 0, 311, 358]]]}}],
            Kb: !0,
            Gb: 1E4,
            mb: 4,
            Eb: 18,
            vb: 10,
            Jb: .9,
            Fb: [6, 7, 8, 9],
            wb: P.nc
        }, jg = {
            index: 3,
            id: "level3",
            Ab: "Pepper Name 3",
            yb: "Pepper Fact 3",
            Cb: "Level Rank 3",
            Db: 5,
            background: [12, 2508, 0, 640, 360],
            Na: {
                lb: [13, 0, 0, 586, 262],
                qb: R(Sf),
                Qa: R([Sf[0]]),
                rb: [{
                    ra: [10, 0, 0, 1546, 1716], ha: {
                        width: 640,
                        height: 360,
                        frames: [[[0, 0, 0, 0, 640, 360]], [], [], [[153, 61, 989, 904, 283, 248], [280, 332, 1542, 12, 3, 3]], [[153, 45, 702, 904, 283, 264],
                            [268, 332, 1510, 180, 17, 9]], [], [[153, 43, 262, 1185, 246, 266], [203, 331, 262, 1114, 82, 10]], [[228, 35, 512, 1185, 178, 175]], [[228, 35, 958, 1470, 191, 174]], [[225, 34, 451, 1469, 198, 179]], [], [[404, 13, 1542, 19, 3, 3], [283, 34, 443, 364, 193, 184]], [[189, 19, 0, 668, 371, 238]], [[191, 20, 236, 1455, 211, 131], [246, 155, 1510, 0, 33, 8], [287, 166, 0, 910, 273, 143]], [[207, 71, 277, 910, 92, 83], [321, 177, 1305, 606, 220, 132], [388, 331, 375, 796, 40, 8]], [[314, 182, 1153, 1505, 94, 127], [314, 331, 262, 1084, 87, 11], [414, 332, 1542, 26, 3, 3], [418, 331, 1536, 93, 10, 6]], [[288, 183, 236,
                            1590, 69, 126], [314, 332, 375, 668, 51, 10]], [[290, 194, 1432, 1505, 77, 115], [358, 334, 1536, 113, 6, 3]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[290, 194, 1349, 1576, 77, 115], [358, 334, 1536, 120, 6, 3]], [[288, 183, 309, 1590, 69, 126], [314, 332, 375, 682, 51, 10]], [[314, 182, 1251, 1505, 94, 127], [314, 331, 262, 1099, 87, 11], [414, 332, 1542, 33, 3, 3], [418, 331, 1536, 103, 10, 6]], [[207, 71, 277, 997, 92, 83], [321, 177, 1305, 742, 220, 132], [388, 331, 375, 808, 40, 8]], [[0,
                            306, 1542, 61, 2, 6], [0, 333, 1542, 71, 2, 5], [0, 352, 1536, 127, 2, 3], [0, 356, 1542, 80, 2, 4], [404, 13, 1542, 40, 3, 3], [153, 17, 1118, 0, 388, 292], [163, 331, 512, 1364, 165, 11], [638, 306, 1542, 127, 2, 3], [638, 315, 1535, 134, 2, 3], [638, 321, 1541, 134, 2, 3], [638, 326, 1535, 141, 2, 3], [638, 347, 1541, 141, 2, 3]], [[330, 97, 653, 1473, 169, 205]], [[249, 83, 1510, 129, 21, 22], [278, 79, 1510, 155, 20, 21], [330, 92, 826, 1473, 104, 207]], [], [], [], [], [], [], [[167, 14, 1247, 1206, 239, 295], [185, 333, 512, 1419, 125, 8]], [[167, 13, 989, 1156, 254, 296], [185, 337, 1542, 47, 3, 3]], [[167, 11, 1276,
                            904, 258, 298], [174, 334, 512, 1393, 156, 9]], [[167, 11, 0, 1057, 258, 298], [174, 333, 512, 1406, 156, 9]], [[167, 12, 702, 1172, 252, 297], [295, 333, 1542, 54, 3, 3], [193, 337, 876, 595, 84, 3]], [[281, 87, 1349, 1505, 79, 67]], [[167, 11, 0, 1359, 232, 298], [171, 334, 443, 581, 159, 8]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [], [[244, 118, 1510, 93, 22, 32]], [], [], [[239, 121, 1510, 54, 28, 35]], [], [], [], [], [], [], [], [],
                            [], [], [[149, 15, 375, 887, 323, 294], [171, 332, 443, 566, 173, 11]], [[149, 15, 644, 297, 447, 294], [163, 332, 958, 1456, 202, 10]], [[170, 16, 644, 0, 470, 293], [187, 332, 1305, 878, 213, 10]], [[211, 21, 443, 595, 429, 288], [211, 332, 451, 1455, 206, 10]], [], [[215, 15, 876, 606, 425, 294], [233, 332, 443, 552, 184, 10]], [[201, 9, 0, 364, 439, 300], [233, 332, 702, 887, 168, 10]], [[201, 4, 1095, 297, 439, 305], [241, 332, 512, 1379, 160, 10]]]
                    }
                }, {
                    ra: [11, 0, 0, 1308, 1480], ha: {
                        width: 640,
                        height: 360,
                        frames: [[[0, 0, 0, 0, 640, 360]], [[201, 3, 644, 1156, 317, 306], [241, 332, 245, 1209, 160, 10],
                            [638, 196, 1306, 0, 2, 27], [638, 229, 1294, 0, 2, 31]], [[222, 6, 0, 1209, 241, 271]], [[201, 9, 965, 1156, 252, 300], [241, 333, 409, 1209, 155, 9], [638, 196, 1300, 0, 2, 28], [638, 228, 1288, 0, 2, 32]], [], [], [], [], [], [], [], [], [], [], [], [[382, 119, 409, 1222, 109, 158]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 291]], [[0, 0, 644, 728, 640, 247]], [[0, 0, 644, 979, 640, 173]], [[0, 0, 0, 1023, 640, 110]], [[0, 0, 0, 1137, 640, 68]]]
                    }
                }],
                va: R([{o: [13, 978, 912, 123, 146], x: 490, y: 150}, {o: [13, 978, 912, 123, 146], x: 490, y: 150}, {
                    o: [13,
                        978, 912, 123, 146], x: 490, y: 150
                }, {o: [13, 978, 912, 123, 146], x: 490, y: 150}, {
                    o: [13, 978, 912, 123, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 978, 912, 123, 146], x: 490, y: 150}, {
                    o: [13, 978, 912, 123, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 978, 912, 123, 146], x: 490, y: 150}, {
                    o: [13, 978, 912, 123, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 181, 1011, 120, 146], x: 493, y: 150}, {
                    o: [13, 1583, 1096, 104, 146],
                    x: 509,
                    y: 150
                }, {o: [13, 1481, 1115, 95, 139], x: 518, y: 157}, {
                    o: [13, 123, 1160, 95, 131],
                    x: 531,
                    y: 164
                }, {o: [13, 304, 1098, 101, 128], x: 536, y: 167}, {o: [13, 408, 1114, 99, 128], x: 541, y: 167}, {
                    o: [13, 464, 896, 129, 215],
                    x: 510, y: 117
                }, {o: [13, 596, 896, 125, 213], x: 509, y: 115}, {
                    o: [13, 1583, 895, 132, 198],
                    x: 496,
                    y: 130
                }, {o: [13, 331, 896, 130, 199], x: 501, y: 130}, {
                    o: [13, 331, 896, 130, 199],
                    x: 501,
                    y: 130
                }, {o: [13, 331, 896, 130, 199], x: 501, y: 130}, {
                    o: [13, 331, 896, 130, 199],
                    x: 501,
                    y: 130
                }, {o: [13, 331, 896, 130, 199], x: 501, y: 130}]),
                Lb: R([{o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 0, 1013, 120, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 0, 1013, 120, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13,
                        0, 1013, 120, 146], x: 490, y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 0, 1013, 120, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 0, 1013, 120, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 0, 1013, 120, 146],
                    x: 490,
                    y: 150
                }, {o: [13, 0, 1013, 120, 146], x: 490, y: 150}, {
                    o: [13, 724, 1061, 115, 147],
                    x: 495,
                    y: 150
                }, {o: [13, 958, 1061, 110, 147], x: 500, y: 150}, {
                    o: [13, 842, 1061, 113, 146],
                    x: 500,
                    y: 151
                }, {o: [13, 0, 862, 178, 148], x: 437, y: 149}, {
                    o: [13, 981, 760, 202, 149],
                    x: 413,
                    y: 149
                }, {o: [13, 735, 760, 243, 149], x: 364, y: 149},
                    {o: [13, 423, 760, 309, 133], x: 296, y: 165}, {
                        o: [13, 0, 265, 438, 133],
                        x: 167,
                        y: 165
                    }, {o: [13, 1078, 136, 455, 133], x: 150, y: 165}, {
                        o: [13, 589, 136, 486, 133],
                        x: 119,
                        y: 165
                    }, {o: [13, 1086, 0, 493, 133], x: 112, y: 165}, {
                        o: [13, 589, 0, 494, 133],
                        x: 111,
                        y: 165
                    }, {o: [13, 0, 726, 420, 133], x: 185, y: 165}, {
                        o: [13, 0, 726, 420, 133],
                        x: 185,
                        y: 165
                    }, {o: [13, 1269, 611, 420, 140], x: 185, y: 158}, {
                        o: [13, 423, 617, 420, 140],
                        x: 185,
                        y: 158
                    }, {o: [13, 846, 617, 420, 140], x: 185, y: 158}, {
                        o: [13, 0, 401, 420, 172],
                        x: 185,
                        y: 125
                    }, {o: [13, 441, 272, 420, 182], x: 185, y: 115}, {
                        o: [13, 1287, 272, 420, 176], x: 185,
                        y: 115
                    }, {o: [13, 864, 272, 420, 182], x: 185, y: 115}, {
                        o: [13, 1287, 451, 420, 157],
                        x: 185,
                        y: 140
                    }, {o: [13, 423, 457, 420, 157], x: 185, y: 140}, {
                        o: [13, 846, 457, 420, 157],
                        x: 185,
                        y: 140
                    }, {o: [13, 0, 576, 420, 147], x: 185, y: 150}, {
                        o: [13, 0, 576, 420, 147],
                        x: 185,
                        y: 150
                    }, {o: [13, 0, 576, 420, 147], x: 185, y: 150}, {
                        o: [13, 0, 576, 420, 147],
                        x: 185,
                        y: 150
                    }, {o: [13, 0, 576, 420, 147], x: 185, y: 150}])
            },
            Va: !1,
            va: [{
                ra: [12, 0, 0, 2505, 724], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [[315, 143, 2462, 10, 32, 19]], [[304, 127, 2438, 63, 55, 22]], [[276, 103, 2344, 63, 90, 29]], [[263,
                        49, 2344, 0, 114, 59]], [[277, 20, 2344, 96, 86, 33], [313, 66, 2424, 328, 50, 25], [315, 92, 2479, 48, 3, 3]], [[303, 3, 2344, 133, 46, 24], [311, 66, 2053, 310, 52, 29]], [[311, 83, 2411, 133, 12, 12]], [[308, 85, 2462, 33, 13, 20]], [[308, 91, 2495, 89, 10, 24], [377, 88, 2153, 162, 177, 197]], [[308, 100, 2496, 33, 9, 15], [308, 116, 2495, 139, 9, 15], [367, 151, 2153, 0, 187, 158], [394, 331, 2462, 0, 34, 6]], [[308, 116, 2109, 310, 9, 15], [305, 132, 2479, 33, 13, 11], [373, 149, 1932, 310, 60, 160]], [[308, 123, 2500, 0, 3, 6], [305, 132, 2394, 133, 13, 11]], [], [], [], [], [], [], [], [], [], [], [[398, 155, 2498,
                        10, 3, 5], [355, 162, 2424, 177, 77, 147]], [[305, 337, 2486, 48, 3, 3], [333, 336, 2498, 19, 3, 4], [348, 339, 2493, 52, 3, 3], [369, 55, 2495, 117, 10, 18], [352, 161, 2334, 177, 86, 148], [360, 334, 2500, 52, 3, 3], [473, 0, 2479, 55, 3, 2]], [[358, 212, 2438, 89, 53, 53]], [[358, 212, 1996, 310, 53, 53]], [[358, 212, 2438, 89, 53, 53]], [[358, 212, 1996, 310, 53, 53]], [[358, 212, 2438, 89, 53, 53]], [[358, 212, 1996, 310, 53, 53]], [[358, 212, 2438, 89, 53, 53]], [[358, 212, 1996, 310, 53, 53]], [[221, 3, 1932, 0, 217, 306], [263, 331, 2334, 162, 165, 11], [473, 0, 2486, 55, 3, 2]], [[0, 3, 1288, 364, 640, 357]],
                        [[0, 0, 644, 0, 640, 360]], [[0, 0, 1288, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [], [], [], [], []]
                }
            }, {ra: [13, 1269, 754, 311, 358], ha: {width: 640, height: 360, frames: [[[31, 2, 0, 0, 311, 358]]]}}],
            Kb: !0,
            Gb: 4E4,
            mb: 5,
            Eb: 22,
            vb: 7,
            Jb: .65,
            Fb: [10, 11, 12, 13],
            wb: P.qc
        }, kg = {
            index: 4,
            id: "level4",
            Ab: "Pepper Name 4",
            yb: "Pepper Fact 4",
            Cb: "Level Rank 4",
            Db: 3,
            background: [16, 2698, 0, 640, 360],
            Na: {
                lb: [17, 0, 0, 586, 262],
                qb: R(Tf),
                Qa: R([Tf[0]]),
                rb: [{
                    ra: [14, 0, 0, 1545, 1750], ha: {
                        width: 640, height: 360, frames: [[[0, 0, 0, 0, 640, 360]], [],
                            [], [[153, 61, 989, 904, 283, 248], [280, 332, 1536, 107, 3, 3]], [[153, 45, 702, 904, 283, 264], [268, 332, 1510, 180, 17, 9]], [], [[153, 43, 262, 1185, 246, 266], [203, 331, 262, 1114, 82, 10]], [[228, 35, 512, 1185, 178, 175]], [[228, 35, 958, 1470, 191, 174]], [[225, 34, 451, 1469, 198, 179]], [], [[404, 13, 1536, 114, 3, 3], [283, 34, 443, 364, 193, 184]], [[189, 19, 0, 668, 371, 238]], [[191, 20, 236, 1455, 211, 131], [246, 155, 1510, 0, 33, 8], [287, 166, 0, 910, 273, 143]], [[207, 71, 277, 910, 92, 83], [321, 177, 1305, 606, 220, 132], [388, 331, 375, 796, 40, 8]], [[314, 182, 1153, 1505, 94, 127], [314,
                                331, 262, 1084, 87, 11], [414, 332, 1536, 121, 3, 3], [418, 331, 1535, 129, 10, 6]], [[288, 183, 313, 1590, 69, 126], [314, 332, 375, 668, 51, 10]], [[290, 194, 1349, 1505, 77, 115], [358, 334, 1536, 93, 6, 3]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[290, 194, 1430, 1505, 77, 115], [358, 334, 1536, 100, 6, 3]], [[288, 183, 1349, 1624, 69, 126], [314, 332, 375, 682, 51, 10]], [[314, 182, 1251, 1505, 94, 127], [314, 331, 262, 1099, 87, 11], [414, 332, 1535, 149, 3, 3], [418, 331, 1535, 139, 10,
                                6]], [[207, 71, 277, 997, 92, 83], [321, 177, 1305, 742, 220, 132], [388, 331, 375, 808, 40, 8]], [[0, 306, 1542, 26, 2, 6], [0, 333, 1542, 36, 2, 5], [0, 352, 1542, 53, 2, 3], [0, 356, 1542, 45, 2, 4], [404, 13, 1534, 156, 3, 3], [153, 17, 1118, 0, 388, 292], [163, 331, 512, 1364, 165, 11], [638, 306, 1542, 60, 2, 3], [638, 315, 1542, 67, 2, 3], [638, 321, 1542, 74, 2, 3], [638, 326, 1542, 81, 2, 3], [638, 347, 1543, 107, 2, 3]], [[330, 101, 653, 1473, 159, 201]], [[249, 83, 1510, 129, 21, 22], [278, 79, 1510, 155, 20, 21], [330, 95, 816, 1473, 104, 204]], [], [], [], [], [], [], [[167, 14, 1247, 1206, 239, 295], [185, 333,
                                512, 1419, 125, 8]], [[167, 13, 989, 1156, 254, 296], [185, 337, 1542, 12, 3, 3]], [[167, 11, 1276, 904, 258, 298], [174, 334, 512, 1393, 156, 9]], [[167, 11, 0, 1057, 258, 298], [174, 333, 512, 1406, 156, 9]], [[167, 12, 702, 1172, 252, 297], [295, 333, 1542, 19, 3, 3], [193, 337, 876, 595, 84, 3]], [[290, 95, 236, 1590, 73, 61]], [[167, 11, 0, 1359, 232, 298], [171, 334, 443, 581, 159, 8]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [[244, 118, 1510, 93, 22, 32]], [], [[239, 121, 1510, 54, 28, 35]], [], [[239, 118, 1510, 12, 28, 38]], [], [], [[244,
                                118, 1510, 93, 22, 32]], [], [], [[239, 121, 1510, 54, 28, 35]], [], [], [], [], [], [], [], [], [], [], [[149, 15, 375, 887, 323, 294], [171, 332, 443, 566, 173, 11]], [[149, 15, 644, 297, 447, 294], [163, 332, 958, 1456, 202, 10]], [[170, 16, 644, 0, 470, 293], [187, 332, 1305, 878, 213, 10]], [[211, 21, 443, 595, 429, 288], [211, 332, 451, 1455, 206, 10]], [], [[215, 15, 876, 606, 425, 294], [233, 332, 443, 552, 184, 10]], [[201, 9, 0, 364, 439, 300], [233, 332, 702, 887, 168, 10]], [[201, 4, 1095, 297, 439, 305], [241, 332, 512, 1379, 160, 10]]]
                    }
                }, {
                    ra: [15, 0, 0, 1308, 1480], ha: {
                        width: 640, height: 360, frames: [[[0,
                            0, 0, 0, 640, 360]], [[201, 3, 644, 1156, 317, 306], [241, 332, 245, 1209, 160, 10], [638, 196, 1306, 0, 2, 27], [638, 229, 1294, 0, 2, 31]], [[222, 6, 0, 1209, 241, 271]], [[201, 9, 965, 1156, 252, 300], [241, 333, 409, 1209, 155, 9], [638, 196, 1300, 0, 2, 28], [638, 228, 1288, 0, 2, 32]], [], [], [], [], [], [], [], [], [], [], [], [[382, 119, 409, 1222, 109, 158]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 291]], [[0, 0, 644, 728, 640, 247]], [[0, 0, 644, 979, 640, 173]], [[0, 0, 0, 1023, 640, 110]], [[0, 0, 0, 1137, 640, 68]]]
                    }
                }],
                va: R([{
                    o: [17, 302, 501,
                        133, 250], x: 488, y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 1432, 578, 120, 252], x: 505, y: 66}, {
                    o: [17, 2259, 580, 116, 249],
                    x: 514,
                    y: 66
                }, {o: [17, 3182, 593, 108, 247], x: 524, y: 62}, {
                    o: [17, 1286, 581, 112, 234],
                    x: 528,
                    y: 64
                }, {o: [17, 3293, 593, 106, 234], x: 534, y: 64}, {
                    o: [17,
                        822, 253, 210, 325], x: 429, y: 0
                }, {o: [17, 1999, 251, 238, 323], x: 402, y: 0}, {
                    o: [17, 1432, 253, 171, 322],
                    x: 469,
                    y: 0
                }, {o: [17, 2240, 251, 183, 326], x: 452, y: 2}, {o: [17, 1246, 253, 183, 325], x: 457, y: 3}]),
                Lb: R([{o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                    o: [17, 302, 501, 133, 250],
                    x: 488,
                    y: 68
                }, {o: [17, 302, 501, 133, 250], x: 488, y: 68},
                    {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                        o: [17, 302, 501, 133, 250],
                        x: 488,
                        y: 68
                    }, {o: [17, 302, 501, 133, 250], x: 488, y: 68}, {
                        o: [17, 302, 501, 133, 250],
                        x: 488,
                        y: 68
                    }, {o: [17, 438, 522, 128, 252], x: 491, y: 66}, {
                        o: [17, 153, 265, 146, 252],
                        x: 486,
                        y: 66
                    }, {o: [17, 0, 265, 150, 250], x: 482, y: 68}, {
                        o: [17, 0, 265, 150, 250],
                        x: 482,
                        y: 68
                    }, {o: [17, 2921, 464, 144, 252], x: 493, y: 66}, {
                        o: [17, 589, 253, 230, 248],
                        x: 403,
                        y: 70
                    }, {o: [17, 2429, 232, 341, 242], x: 280, y: 76}, {
                        o: [17, 1999, 0, 427, 248],
                        x: 201,
                        y: 70
                    }, {o: [17, 1071, 0, 469, 250], x: 162, y: 68}, {o: [17, 589, 0, 479, 250], x: 152, y: 68}, {
                        o: [17,
                            1543, 0, 453, 250], x: 167, y: 68
                    }, {o: [17, 1035, 253, 208, 234], x: 394, y: 84}, {
                        o: [17, 2773, 232, 321, 229],
                        x: 281,
                        y: 89
                    }, {o: [17, 2856, 0, 418, 229], x: 184, y: 89}, {
                        o: [17, 2429, 0, 424, 229],
                        x: 178,
                        y: 89
                    }, {o: [17, 1606, 253, 167, 229], x: 435, y: 89}, {
                        o: [17, 2773, 464, 145, 240],
                        x: 457,
                        y: 78
                    }, {o: [17, 1776, 253, 160, 250], x: 479, y: 68}, {
                        o: [17, 0, 518, 130, 257],
                        x: 510,
                        y: 60
                    }, {o: [17, 587, 504, 132, 257], x: 506, y: 60}, {
                        o: [17, 2426, 477, 144, 243],
                        x: 479,
                        y: 80
                    }, {o: [17, 2573, 477, 143, 233], x: 480, y: 90}, {
                        o: [17, 2573, 477, 143, 233],
                        x: 480,
                        y: 90
                    }, {o: [17, 1035, 490, 133, 253], x: 496, y: 50},
                    {o: [17, 451, 265, 133, 254], x: 496, y: 31}, {
                        o: [17, 451, 265, 133, 254],
                        x: 496,
                        y: 38
                    }, {o: [17, 302, 265, 146, 233], x: 477, y: 90}, {
                        o: [17, 1606, 485, 141, 241],
                        x: 482,
                        y: 82
                    }, {o: [17, 1750, 506, 132, 251], x: 488, y: 68}])
            },
            Va: !1,
            va: [{
                ra: [16, 0, 0, 2695, 759], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [], [], [], [], [[315, 148, 2624, 396, 32, 17]], [[303, 126, 2576, 350, 55, 29]], [[261, 79, 2576, 192, 109, 55]], [[258, 43, 2495, 623, 121, 48]], [[275, 16, 2576, 291, 87, 37], [313, 66, 2635, 350, 50, 26]], [[314, 5, 2657, 332, 36, 14], [310, 66, 2576, 383, 44, 26], [355,
                        67, 2674, 280, 8, 16], [395, 88, 2576, 0, 115, 188]], [[258, 5, 1866, 560, 121, 160], [387, 124, 2095, 511, 183, 185]], [[376, 151, 2297, 495, 194, 158], [414, 332, 2674, 251, 14, 5]], [[389, 151, 2658, 527, 34, 158], [414, 331, 2674, 260, 11, 6]], [], [], [], [[182, 5, 1625, 455, 237, 304], [241, 331, 2495, 512, 176, 11], [422, 333, 2689, 215, 5, 4], [466, 306, 2689, 192, 6, 3]], [[142, 6, 1362, 438, 259, 303], [242, 331, 2495, 527, 159, 10], [414, 332, 2692, 250, 3, 3], [418, 331, 2674, 270, 10, 6], [466, 306, 2689, 199, 6, 3]], [[62, 15, 1019, 438, 339, 294], [145, 331, 2495, 495, 190, 13]], [[16, 104, 644, 438,
                        371, 205], [102, 331, 1625, 438, 253, 13]], [[16, 242, 2495, 552, 135, 67], [102, 331, 2635, 380, 49, 12], [153, 259, 1866, 495, 225, 50], [157, 331, 2095, 495, 198, 12]], [[120, 90, 2689, 223, 5, 4], [117, 99, 2675, 300, 4, 4], [423, 222, 2686, 291, 4, 5], [577, 230, 2689, 239, 4, 7], [0, 293, 1932, 364, 640, 67]], [[120, 90, 2689, 231, 5, 4], [113, 98, 2689, 206, 5, 5], [422, 214, 2495, 541, 159, 7], [423, 222, 2683, 300, 4, 4], [577, 233, 2691, 300, 4, 4], [0, 290, 644, 364, 640, 70]], [[113, 98, 2686, 280, 8, 7], [422, 214, 1866, 549, 159, 7], [423, 226, 2683, 308, 4, 3], [577, 232, 2675, 308, 4, 4], [0, 290, 1288,
                        364, 640, 70]], [[117, 99, 2689, 260, 4, 6], [423, 224, 2667, 300, 4, 5], [577, 230, 2688, 270, 4, 6], [0, 304, 1932, 435, 640, 56]], [], [], [[137, 273, 2576, 251, 94, 36], [138, 331, 2576, 332, 77, 14]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 1288, 0, 640, 360]], [[0, 0, 1932, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], []]
                }
            }, {ra: [17, 3097, 232, 311, 358], ha: {width: 640, height: 360, frames: [[[31, 2, 0, 0, 311, 358]]]}}],
            Kb: !0,
            Gb: 1E6,
            mb: 6,
            Eb: 24,
            vb: 7,
            Jb: .55,
            Fb: [14, 15, 16, 17],
            wb: P.sc
        }, lg = {
            index: 5,
            id: "level5",
            Ab: "Pepper Name 5",
            yb: "Pepper Fact 5",
            Cb: "Level Rank 5",
            Db: 3,
            background: [22,
                0, 1657, 640, 360],
            Na: {
                lb: [18, 0, 1719, 586, 262],
                qb: R(Uf),
                Qa: R([Uf[0]]),
                rb: [{
                    ra: [18, 0, 0, 1542, 1716], ha: {
                        width: 640,
                        height: 360,
                        frames: [[[0, 0, 0, 0, 640, 360]], [], [], [[153, 61, 989, 904, 283, 248], [280, 332, 1536, 166, 3, 3]], [[153, 45, 702, 904, 283, 264], [268, 332, 1510, 239, 17, 9]], [], [[153, 43, 262, 1185, 246, 266], [203, 331, 262, 1114, 82, 10]], [[228, 35, 512, 1185, 178, 175]], [[228, 35, 958, 1470, 191, 174]], [[225, 34, 451, 1469, 198, 179]], [], [[404, 13, 1536, 173, 3, 3], [283, 34, 443, 364, 193, 184]], [[189, 19, 0, 668, 371, 238]], [[191, 20, 236, 1455, 211, 131], [246,
                            155, 606, 581, 33, 8], [287, 166, 0, 910, 273, 143]], [[207, 71, 277, 910, 92, 83], [321, 177, 1305, 606, 220, 132], [388, 331, 375, 796, 40, 8]], [[314, 182, 1153, 1505, 94, 127], [314, 331, 262, 1084, 87, 11], [414, 332, 1536, 180, 3, 3], [418, 331, 1525, 285, 10, 6]], [[288, 183, 236, 1590, 69, 126], [314, 332, 375, 668, 51, 10]], [[290, 194, 1349, 1505, 77, 115], [358, 334, 1536, 152, 6, 3]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[291, 236, 375, 746, 44, 46]], [[291, 236, 375, 696, 44, 46]], [[290, 194, 1430, 1505, 77, 115], [358, 334, 1536, 159, 6,
                            3]], [[288, 183, 309, 1590, 69, 126], [314, 332, 375, 682, 51, 10]], [[314, 182, 1251, 1505, 94, 127], [314, 331, 262, 1099, 87, 11], [414, 332, 1536, 187, 3, 3], [418, 331, 964, 595, 10, 6]], [[207, 71, 277, 997, 92, 83], [321, 177, 1305, 742, 220, 132], [388, 331, 375, 808, 40, 8]], [[0, 306, 1534, 215, 2, 6], [0, 333, 1540, 215, 2, 5], [0, 352, 1534, 225, 2, 3], [0, 356, 1540, 224, 2, 4], [404, 13, 1535, 194, 3, 3], [153, 17, 1118, 0, 388, 292], [163, 331, 512, 1364, 165, 11], [638, 306, 1539, 285, 2, 3], [638, 315, 1539, 292, 2, 3], [638, 321, 1538, 299, 2, 3], [638, 326, 1538, 306, 2, 3], [638, 347, 1538, 313, 2, 3]],
                            [[330, 119, 653, 1473, 158, 183]], [[249, 83, 1510, 188, 21, 22], [278, 79, 1510, 214, 20, 21], [330, 113, 815, 1473, 104, 186]], [], [], [], [], [], [], [[167, 14, 1247, 1206, 239, 295], [185, 333, 512, 1419, 125, 8]], [[167, 13, 989, 1156, 254, 296], [185, 337, 1535, 201, 3, 3]], [[167, 11, 1276, 904, 258, 298], [174, 334, 512, 1393, 156, 9]], [[167, 11, 0, 1057, 258, 298], [174, 333, 512, 1406, 156, 9]], [[167, 12, 702, 1172, 252, 297], [295, 333, 1535, 208, 3, 3], [193, 337, 876, 595, 84, 3]], [[296, 122, 1510, 36, 30, 31], [333, 110, 1510, 0, 31, 32]], [[167, 11, 0, 1359, 232, 298], [171, 334, 443, 581, 159,
                                8]], [], [[244, 118, 1510, 152, 22, 32]], [], [[239, 121, 1510, 113, 28, 35]], [], [[239, 118, 1510, 71, 28, 38]], [], [[244, 118, 1510, 152, 22, 32]], [], [[239, 121, 1510, 113, 28, 35]], [], [[239, 118, 1510, 71, 28, 38]], [], [], [[244, 118, 1510, 152, 22, 32]], [], [], [[239, 121, 1510, 113, 28, 35]], [], [], [[246, 90, 620, 566, 10, 10]], [[245, 90, 1526, 265, 11, 16]], [[244, 92, 1531, 239, 11, 22]], [[244, 100, 1529, 666, 10, 14], [241, 115, 1529, 606, 10, 16]], [[241, 115, 1529, 626, 10, 16], [241, 137, 1529, 646, 10, 16]], [[239, 137, 1510, 252, 12, 22]], [[239, 149, 1510, 278, 11, 10]], [], [[149, 15,
                                375, 887, 323, 294], [171, 332, 443, 566, 173, 11]], [[149, 15, 644, 297, 447, 294], [163, 332, 958, 1456, 202, 10]], [[170, 16, 644, 0, 470, 293], [187, 332, 1305, 878, 213, 10]], [[211, 21, 443, 595, 429, 288], [211, 332, 451, 1455, 206, 10]], [], [[215, 15, 876, 606, 425, 294], [233, 332, 443, 552, 184, 10]], [[201, 9, 0, 364, 439, 300], [233, 332, 702, 887, 168, 10]], [[201, 4, 1095, 297, 439, 305], [241, 332, 512, 1379, 160, 10]]]
                    }
                }, {
                    ra: [19, 0, 0, 1308, 1480], ha: {
                        width: 640,
                        height: 360,
                        frames: [[[0, 0, 0, 0, 640, 360]], [[201, 3, 644, 1156, 317, 306], [241, 332, 245, 1209, 160, 10], [638, 196, 1306,
                            0, 2, 27], [638, 229, 1294, 0, 2, 31]], [[222, 6, 0, 1209, 241, 271]], [[201, 9, 965, 1156, 252, 300], [241, 333, 409, 1209, 155, 9], [638, 196, 1300, 0, 2, 28], [638, 228, 1288, 0, 2, 32]], [], [], [], [], [], [], [], [], [], [], [], [[382, 119, 409, 1222, 109, 158]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 291]], [[0, 0, 644, 728, 640, 247]], [[0, 0, 644, 979, 640, 173]], [[0, 0, 0, 1023, 640, 110]], [[0, 0, 0, 1137, 640, 68]]]
                    }
                }],
                va: R([{o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277], x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277],
                    x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 228, 1604, 222, 274],
                    x: 412,
                    y: 16
                }, {o: [23, 228, 1604, 222, 274], x: 412, y: 16}, {
                    o: [23, 985, 1467, 214, 273],
                    x: 423,
                    y: 14
                }, {o: [23, 671, 2022, 212, 273], x: 428, y: 13}, {
                    o: [23, 0, 2313, 202, 268],
                    x: 438,
                    y: 10
                }, {o: [23, 692, 1752, 218, 267], x: 422, y: 6}, {
                    o: [23, 692, 1752, 218, 267],
                    x: 422,
                    y: 6
                }, {o: [23, 921, 1135, 254, 329], x: 386, y: 0}, {
                    o: [23, 270, 982, 256, 334],
                    x: 384,
                    y: 0
                }, {o: [23, 0, 1166, 236, 306], x: 404, y: 0}, {o: [23, 0, 1166, 236, 306], x: 404, y: 0},
                    {o: [23, 0, 1166, 236, 306], x: 404, y: 0}, {o: [23, 0, 1166, 236, 306], x: 404, y: 0}]),
                Lb: R([{o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277],
                    x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277],
                    x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277],
                    x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 0, 1752, 220, 277],
                    x: 412,
                    y: 22
                }, {o: [23, 0, 1752, 220, 277], x: 412, y: 22}, {
                    o: [23, 913, 1752, 216, 277],
                    x: 416,
                    y: 22
                }, {o: [23, 467, 1477, 222, 277], x: 410, y: 22}, {o: [23, 936, 855, 257, 277], x: 375, y: 22},
                    {o: [23, 936, 575, 261, 277], x: 371, y: 22}, {
                        o: [23, 926, 295, 267, 277],
                        x: 365,
                        y: 22
                    }, {o: [23, 926, 295, 267, 277], x: 365, y: 22}, {
                        o: [23, 926, 295, 267, 277],
                        x: 365,
                        y: 22
                    }, {o: [23, 926, 295, 267, 277], x: 365, y: 22}, {
                        o: [23, 0, 887, 267, 276],
                        x: 368,
                        y: 22
                    }, {o: [23, 654, 916, 264, 273], x: 374, y: 24}, {
                        o: [23, 0, 593, 337, 291],
                        x: 281,
                        y: 9
                    }, {o: [23, 0, 298, 418, 292], x: 195, y: 8}, {
                        o: [23, 482, 0, 470, 292],
                        x: 143,
                        y: 8
                    }, {o: [23, 0, 0, 479, 295], x: 134, y: 8}, {
                        o: [23, 482, 295, 441, 323],
                        x: 172,
                        y: 8
                    }, {o: [23, 654, 621, 279, 292], x: 334, y: 8}, {o: [23, 654, 621, 279, 292], x: 334, y: 8}, {
                        o: [23, 654, 621, 279,
                            292], x: 334, y: 8
                    }, {o: [23, 654, 621, 279, 292], x: 334, y: 8}, {
                        o: [23, 654, 621, 279, 292],
                        x: 334,
                        y: 8
                    }, {o: [23, 955, 0, 226, 291], x: 391, y: 9}, {
                        o: [23, 955, 0, 226, 291],
                        x: 391,
                        y: 9
                    }, {o: [23, 0, 1475, 225, 274], x: 409, y: 24}, {
                        o: [23, 0, 1475, 225, 274],
                        x: 409,
                        y: 24
                    }, {o: [23, 529, 1192, 225, 282], x: 411, y: 16}, {
                        o: [23, 529, 1192, 225, 282],
                        x: 411,
                        y: 16
                    }, {o: [23, 0, 1475, 225, 274], x: 409, y: 24}, {
                        o: [23, 0, 1475, 225, 274],
                        x: 409,
                        y: 24
                    }, {o: [23, 239, 1319, 225, 282], x: 411, y: 16}, {
                        o: [23, 239, 1319, 225, 282],
                        x: 411,
                        y: 16
                    }, {o: [23, 0, 1475, 225, 274], x: 409, y: 24}, {
                        o: [23, 0, 1475, 225, 274], x: 409,
                        y: 24
                    }, {o: [23, 757, 1467, 225, 282], x: 411, y: 16}, {o: [23, 757, 1467, 225, 282], x: 411, y: 16}])
            },
            Va: !1,
            va: [{
                ra: [20, 0, 0, 1274, 1570], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [], [], [], [], [], [[294, 44, 253, 698, 39, 43], [347, 67, 296, 698, 15, 17]], [[252, 1, 676, 1261, 139, 145], [401, 87, 1198, 646, 60, 187]], [[252, 0, 876, 948, 233, 153]], [[222, 0, 352, 677, 269, 309], [263, 332, 1113, 976, 134, 10]], [[222, 0, 1002, 322, 272, 309], [263, 332, 1113, 990, 134, 10]], [[220, 0, 919, 635, 275, 309], [263, 332, 1113, 1004, 133, 7]], [[220, 0, 636, 635, 279, 309],
                        [273, 333, 1032, 313, 5, 3]], [[308, 41, 1080, 1105, 191, 235]], [[240, 0, 0, 1010, 208, 255]], [[243, 0, 472, 990, 142, 152], [245, 176, 0, 1269, 118, 133], [387, 81, 1269, 635, 4, 8], [388, 91, 1050, 313, 3, 4]], [[220, 0, 876, 1105, 200, 309], [273, 333, 1041, 313, 5, 3]], [[220, 0, 472, 1261, 200, 309], [263, 332, 1113, 1015, 104, 6]], [[220, 0, 253, 990, 215, 309], [263, 332, 1113, 962, 137, 10]], [[235, 0, 1032, 0, 241, 309], [279, 332, 1113, 948, 143, 10]], [[275, 0, 625, 948, 247, 309], [347, 332, 253, 687, 81, 7]], [[288, 0, 352, 364, 280, 309], [361, 332, 1198, 635, 67, 7]], [[256, 0, 644, 322, 354, 309]],
                        [[256, 0, 644, 0, 384, 318], [638, 327, 636, 420, 2, 7]], [[292, 0, 0, 364, 348, 319], [638, 321, 1057, 313, 2, 3], [638, 326, 636, 364, 2, 24]], [[391, 0, 0, 687, 249, 319], [638, 321, 1063, 313, 2, 3], [638, 326, 636, 392, 2, 24]]]
                }
            }, {
                ra: [21, 0, 0, 2363, 724], ha: {
                    width: 640,
                    height: 360,
                    frames: [[[0, 0, 0, 0, 640, 360]], [[481, 0, 2103, 0, 61, 27], [553, 0, 1932, 0, 87, 50], [634, 91, 2347, 20, 6, 21], [617, 170, 2168, 28, 23, 131]], [[496, 0, 2282, 0, 29, 27], [528, 0, 2245, 0, 33, 28], [564, 0, 2023, 0, 76, 50]], [[509, 0, 2347, 0, 16, 16], [533, 0, 2315, 0, 28, 28], [582, 0, 2168, 0, 35, 24], [618, 0, 2195, 28, 22,
                        39]], [[583, 0, 2207, 0, 34, 24], [618, 2, 2103, 31, 22, 26]], [], [], [[0, 0, 644, 0, 640, 360]], [[0, 0, 1288, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 2, 1288, 364, 640, 358]], []]
                }
            }, {ra: [23, 340, 621, 311, 358], ha: {width: 640, height: 360, frames: [[[31, 2, 0, 0, 311, 358]]]}}],
            Kb: !0,
            Gb: 2E6,
            mb: 7,
            Eb: 24,
            vb: 5,
            Jb: .45,
            Fb: [18, 19, 20, 21, 22, 23],
            wb: P.jc
        },
        mg = [317, 274, 208, 141, 97, 64, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 29, -52, -193, -273],
        ng = {
            ra: [22,
                0, 0, 1486, 1654], ha: {
                width: 640,
                height: 360,
                frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [], [], [], [], [], [[222, 47, 644, 1334, 283, 262]], [[222, 31, 1019, 1092, 283, 278]], [], [[222, 29, 1208, 1374, 246, 280]], [[297, 21, 1288, 549, 178, 175]], [[297, 21, 1288, 371, 191, 174]], [[294, 20, 1288, 0, 198, 179]], [], [[473, 0, 1483, 371, 3, 2], [352, 20, 1288, 183, 193, 184]], [[258, 5, 644, 1092, 371, 238]], [[260, 6, 225, 1456, 211, 131], [315, 141, 1288, 1010, 33, 8], [356, 152, 931, 1374, 273, 157]], [[276, 57, 1288, 873, 92, 83], [390, 163, 0, 1456, 221, 146]], [[382, 168, 1288, 728, 112, 141], [388,
                    331, 1384, 1009, 40, 8]], [[351, 169, 1404, 728, 79, 140], [388, 331, 1428, 1009, 40, 8]], [[355, 177, 1384, 873, 84, 132]], [[360, 222, 1288, 960, 44, 46]], [[360, 222, 1336, 960, 44, 46]], [[360, 222, 1288, 960, 44, 46]], [[360, 222, 1336, 960, 44, 46]], [[360, 222, 1288, 960, 44, 46]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 360]], [[0, 0, 644, 728, 640, 360]], [[0, 0, 0, 1092, 640, 360]], [], [], []]
            }
        }, pg = {
            ra: [26, 0, 0, 1488, 1666], ha: {
                width: 640, height: 360, frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [[222, 47, 644, 1334, 283, 262]],
                    [[222, 31, 1019, 1092, 283, 278]], [], [[222, 29, 1208, 1374, 246, 280]], [[297, 21, 1288, 361, 178, 175]], [[297, 21, 1288, 183, 191, 174]], [[294, 20, 1288, 0, 198, 179]], [], [[473, 0, 1483, 183, 3, 2], [313, 20, 0, 1456, 232, 184]], [[258, 5, 644, 1092, 371, 238]], [[260, 6, 931, 1535, 211, 131], [315, 141, 1288, 822, 33, 8], [356, 152, 931, 1374, 273, 157]], [[276, 57, 1288, 685, 92, 83], [390, 163, 236, 1456, 221, 146]], [[382, 168, 1288, 540, 112, 141], [388, 331, 1384, 820, 40, 8]], [[351, 169, 1404, 676, 79, 140], [388, 331, 1428, 820, 40, 8]], [[355, 177, 1404, 540, 84, 132]], [[360, 222, 1288, 772,
                        44, 46]], [[360, 222, 1336, 772, 44, 46]], [[360, 222, 1288, 772, 44, 46]], [[360, 222, 1336, 772, 44, 46]], [[360, 222, 1288, 772, 44, 46]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 360]], [[0, 0, 644, 728, 640, 360]], [[0, 0, 0, 1092, 640, 360]], [], [], []]
            }
        }, qg = R(Ba(Ea(24), [{o: [5, 1897, 1107, 91, 144], x: 295, y: 171}, {
            o: [5, 1803, 1107, 91, 145],
            x: 295,
            y: 171
        }, {o: [5, 0, 1060, 92, 145], x: 295, y: 171}, {
            o: [5, 0, 1060, 92, 145],
            x: 295,
            y: 171
        }, {o: [5, 0, 1060, 92, 145], x: 295, y: 171}, {o: [5, 0, 1060, 92, 145], x: 295, y: 171}, {
            o: [5, 1615,
                1101, 91, 145], x: 295, y: 168
        }, {o: [5, 1427, 1074, 91, 145], x: 295, y: 145}, {
            o: [5, 1709, 1101, 91, 145],
            x: 295,
            y: 132
        }, {o: [5, 1333, 1074, 91, 145], x: 295, y: 131}, {
            o: [5, 1427, 1074, 91, 145],
            x: 295,
            y: 145
        }, {o: [5, 263, 612, 101, 149], x: 285, y: 168}, {
            o: [5, 1521, 1101, 91, 145],
            x: 295,
            y: 167
        }, {o: [5, 1521, 1101, 91, 145], x: 295, y: 167}, {
            o: [5, 1521, 1101, 91, 145],
            x: 295,
            y: 167
        }, {o: [5, 1615, 1101, 91, 145], x: 295, y: 168}, {
            o: [5, 1427, 1074, 91, 145],
            x: 295,
            y: 145
        }, {o: [5, 1709, 1101, 91, 145], x: 295, y: 132}, {
            o: [5, 1333, 1074, 91, 145],
            x: 295,
            y: 131
        }, {o: [5, 1427, 1074, 91, 145], x: 295, y: 145},
            {o: [5, 263, 612, 101, 149], x: 285, y: 168}, {
                o: [5, 1521, 1101, 91, 145],
                x: 295,
                y: 167
            }, {o: [5, 1521, 1101, 91, 145], x: 295, y: 167}, {
                o: [5, 1521, 1101, 91, 145],
                x: 295,
                y: 167
            }, {o: [5, 1615, 1101, 91, 145], x: 295, y: 168}, {
                o: [5, 1427, 1074, 91, 145],
                x: 295,
                y: 145
            }, {o: [5, 1709, 1101, 91, 145], x: 295, y: 132}, {
                o: [5, 1333, 1074, 91, 145],
                x: 295,
                y: 131
            }, {o: [5, 1427, 1074, 91, 145], x: 295, y: 145}, {
                o: [5, 263, 612, 101, 149],
                x: 285,
                y: 168
            }, {o: [5, 1521, 1101, 91, 145], x: 295, y: 167}, {
                o: [5, 1521, 1101, 91, 145],
                x: 295,
                y: 167
            }, {o: [5, 1521, 1101, 91, 145], x: 295, y: 167}, {
                o: [5, 1521, 1101, 91, 145],
                x: 295, y: 167
            }])), yc = ["Special Elite", "Geo", "Open Sans Condensed:300"], rg = {9: P.Wb}, sg = {9: P.Xb},
        tg = {9: P.Wb, 13: P.lc}, ug = {9: P.Xb, 22: P.kc};
    var wg = function (a) {
        var b;
        if (!(A || Ka || Ma && C("525"))) return !0;
        if (ga(b)) if (La) b = vg(b); else if (Na && Ma) a:switch (b) {
            case 93:
                b = 91;
                break a
        }
        if (17 == b || 18 == b || Na && 91 == b) return !1;
        switch (a) {
            case 13:
                return !0;
            case 27:
                return !(Ma || Ka)
        }
        a:if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (Ma || Ka) && 0 == a) a = !0; else switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                a = !0;
                break a;
            default:
                a =
                    !1
        }
        return a
    }, vg = function (a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };
    var xg = function (a, b) {
        this.width = a;
        this.height = b
    };
    k = xg.prototype;
    k.clone = function () {
        return new xg(this.width, this.height)
    };
    k.wc = function () {
        return this.width * this.height
    };
    k.tb = function () {
        return !this.wc()
    };
    k.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    !La && !A || A && 9 <= Number(Wa) || La && C("1.9.1");
    A && C("9");/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    var yg = function (a, b) {
        this.R = [];
        this.ka = a;
        this.$ = b || null;
        this.H = this.s = !1;
        this.v = void 0;
        this.U = this.qa = this.S = !1;
        this.T = 0;
        this.w = null;
        this.W = 0
    };
    yg.prototype.cancel = function (a) {
        if (this.s) this.v instanceof yg && this.v.cancel(); else {
            if (this.w) {
                var b = this.w;
                delete this.w;
                a ? b.cancel(a) : (b.W--, 0 >= b.W && b.cancel())
            }
            this.ka ? this.ka.call(this.$, this) : this.U = !0;
            if (!this.s) {
                a = new zg;
                if (this.s) {
                    if (!this.U) throw new Ag;
                    this.U = !1
                }
                this.s = !0;
                this.v = a;
                this.H = !0;
                Bg(this)
            }
        }
    };
    yg.prototype.V = function (a, b) {
        this.S = !1;
        this.s = !0;
        this.v = b;
        this.H = !a;
        Bg(this)
    };
    var Cg = function (a, b, c) {
        a.R.push([b, c, void 0]);
        a.s && Bg(a)
    };
    yg.prototype.then = function (a, b, c) {
        var d, e, f = new N(function (a, b) {
            d = a;
            e = b
        });
        Cg(this, d, function (a) {
            a instanceof zg ? f.cancel() : e(a)
        });
        return f.then(a, b, c)
    };
    ge(yg);
    var Dg = function (a) {
        return ya(a.R, function (a) {
            return t(a[1])
        })
    }, Bg = function (a) {
        if (a.T && a.s && Dg(a)) {
            var b = a.T, c = Eg[b];
            c && (m.clearTimeout(c.s), delete Eg[b]);
            a.T = 0
        }
        a.w && (a.w.W--, delete a.w);
        for (var b = a.v, d = c = !1; a.R.length && !a.S;) {
            var e = a.R.shift(), f = e[0], g = e[1], e = e[2];
            if (f = a.H ? g : f) try {
                var h = f.call(e || a.$, b);
                n(h) && (a.H = a.H && (h == b || h instanceof Error), a.v = b = h);
                if (he(b) || "function" === typeof m.Promise && b instanceof m.Promise) d = !0, a.S = !0
            } catch (l) {
                b = l, a.H = !0, Dg(a) || (c = !0)
            }
        }
        a.v = b;
        d && (h = u(a.V, a, !0), d = u(a.V, a,
            !1), b instanceof yg ? (Cg(b, h, d), b.qa = !0) : b.then(h, d));
        c && (b = new Fg(b), Eg[b.s] = b, a.T = b.s)
    }, Ag = function () {
        x.call(this)
    };
    v(Ag, x);
    Ag.prototype.message = "Deferred has already fired";
    Ag.prototype.name = "AlreadyCalledError";
    var zg = function () {
        x.call(this)
    };
    v(zg, x);
    zg.prototype.message = "Deferred was canceled";
    zg.prototype.name = "CanceledError";
    var Fg = function (a) {
        this.s = m.setTimeout(u(this.w, this), 0);
        this.v = a
    };
    Fg.prototype.w = function () {
        delete Eg[this.s];
        throw this.v;
    };
    var Eg = {};
    var Gg = function (a, b) {
        this.H = b ? 1E3 / b : 0;
        this.v = null;
        this.w = a;
        this.s = !1
    };
    Gg.prototype.reset = function () {
        this.v = null;
        this.s = !1
    };
    Gg.prototype.call = function (a, b) {
        if (0 == this.H) b++; else {
            var c = ka();
            null == this.v && (this.v = c);
            b = Math.floor((c - this.v) / this.H)
        }
        b >= a && (0 <= this.w ? b = b % (a - this.w) + this.w : (b = a - 1, this.s = !0));
        return b
    };
    var Hg = function (a, b, c, d, e, f) {
        this.R = a;
        this.w = b;
        this.S = c;
        this.T = d;
        this.W = !!f;
        this.s = -1;
        this.v = 0;
        this.H = e || new Gg(-1, void 0)
    }, Jg = function (a, b) {
        0 == b && Ig(a);
        for (var c = a.w.frames[b], d = 0; d < c.length; d++) {
            var e = c[d], f = e[0], g = e[1], h = e[2] + a.T.x, l = e[3] + a.T.y, q = e[4], e = e[5];
            a.W && a.R.clearRect(f, g, q, e);
            a.R.drawImage(a.S, h, l, q, e, f, g, q, e)
        }
    }, Kg = function (a) {
        a.s > a.v && (a.s = -1);
        for (a.s == a.v && Jg(a, a.v); a.s < a.v;) Jg(a, ++a.s);
        a.v = a.H.call(a.w.frames.length, a.s)
    }, Ig = function (a) {
        a.R.clearRect(0, 0, a.w.width, a.w.height)
    };
    Hg.prototype.reset = function () {
        Ig(this);
        this.v = 0;
        this.s = -1;
        this.H.reset()
    };
    var Lg = function () {
        var a = ng.ha, b = document.createElement("canvas");
        b.width = a.width;
        b.height = a.height;
        return b
    }, Ng = function (a, b, c) {
        this.R = a;
        this.T = b;
        this.s = c;
        this.H = 0;
        this.v = Mg(this, 0);
        for (a = this.w = 0; a < this.s.length; a++) this.w += this.s[a].ha.frames.length
    }, Mg = function (a, b) {
        var c = a.R, d = a.s[b].ha, e = lf(a.T, a.s[b].o).s, f = a.s[b].o;
        return new Hg(c, d, e, {x: f[1], y: f[2]}, new Gg(-1, 12))
    }, Pg = function (a) {
        Kg(a.v);
        a.v.H.s && !Og(a) && (a.H++, a.v = Mg(a, a.H))
    }, Og = function (a) {
        return a.v.H.s && a.H >= a.s.length - 1
    };
    var Qg = function (a, b, c, d, e) {
        this.w = a;
        this.H = b;
        this.v = c;
        this.R = d;
        this.T = e || !1;
        this.S = ka()
    };
    Qg.prototype.s = function (a) {
        a.save();
        if (this.T) {
            a.fillStyle = "black";
            var b = this.w - 10, c = this.H - 10, d = 2 * (this.v + 10), e = 2 * (this.v + 10);
            a.save();
            a.beginPath();
            a.moveTo(b + 5, c);
            a.lineTo(b + d - 5, c);
            a.quadraticCurveTo(b + d, c, b + d, c + 5);
            a.lineTo(b + d, c + e - 5);
            a.quadraticCurveTo(b + d, c + e, b + d - 5, c + e);
            a.lineTo(b + 5, c + e);
            a.quadraticCurveTo(b, c + e, b, c + e - 5);
            a.lineTo(b, c + 5);
            a.quadraticCurveTo(b, c, b + 5, c);
            a.closePath();
            a.fill();
            a.restore()
        } else a.clearRect(this.w, this.H, 2 * this.v, 2 * this.v);
        a.translate(this.w + this.v, this.H + this.v);
        b =
            (ka() - this.S) / 1E3;
        a.rotate(2 * Math.PI * b);
        for (b = 0; 100 > b; b++) a.beginPath(), a.rotate(1.9 * Math.PI / 100), a.moveTo(this.v - this.R, 0), a.lineTo(this.v, 0), a.lineWidth = this.v / this.R, a.strokeStyle = "rgba(255, 255, 255, " + b / 100 + ")", a.stroke();
        a.restore()
    };
    var Rg = {
        width: 640,
        height: 360,
        frames: [[[2, 1, 0, 0, 636, 359]], [], [[503, 205, 423, 666, 132, 155]], [], [[503, 192, 284, 517, 135, 168]], [], [[503, 183, 0, 517, 135, 177]], [], [[499, 183, 143, 363, 137, 177]], [], [[499, 210, 0, 363, 139, 150]], [], [[501, 210, 284, 363, 137, 150]], [], [[501, 213, 139, 544, 134, 147]], [], [[501, 213, 425, 363, 137, 147]], [], [[535, 197, 640, 0, 3, 3], [502, 212, 425, 514, 136, 148]]]
    };
    var Sg = function () {
        this.s = 1
    };
    ca(Sg);
    var Ug = function (a) {
        return 1 == Tg.s ? a : Math.min(.4, .55 * a)
    };
    var Vg = function () {
    };
    ca(Vg);
    Vg.prototype.reset = p;
    Vg.prototype.log = function (a, b) {
        var c = ka(), d = this.s ? c - this.s : 0;
        this.s = c;
        var c = window.document, c = "CSS1Compat" == c.compatMode ? c.documentElement : c.body,
            c = new xg(c.clientWidth, c.clientHeight), c = c.width > c.height,
            e = "orientation" in window ? parseInt(window.orientation, 10) : "_", f = Sg.ma();
        Mc(["scoville", "a:" + a, "l:" + (n(b) ? b : "_"), "m:" + f.s, "dt:" + d, "t:" + (n(tc) ? tc ? "1" : "0" : "_"), "w:" + (n(c) ? c ? "1" : "0" : "_"), "o:" + e].join())
    };
    var Wg = Q.ma(), V = function (a, b, c, d) {
        this.s = a;
        this.W = b;
        this.Ka = c;
        this.V = d;
        this.S = 0
    };
    V.prototype.Ib = function () {
        this.S++
    };
    V.prototype.nb = p;
    V.prototype.ac = p;
    var Xg = function (a) {
        for (var b = 0; b < a.V.length; b++) if (!lf(Wg, a.V[b]).v) return !1;
        return !0
    };
    V.prototype.Aa = function () {
        for (var a = 0; a < this.V.length; a++) Wg.Aa(this.V[a])
    };
    V.prototype.ub = p;
    V.prototype.R = function () {
        var a = this.W, b = this.Ka;
        if (a.w[b]) {
            for (var c = a.w[b], d = 0, e; e = c[d]; d++) Zc(a.s, e);
            a.w[b] = []
        }
    };
    var Yg = function (a, b, c) {
        Fd(a.W, b, c, a.Ka)
    };
    var Zg = Q.ma(), $g = function (a, b) {
        V.call(this, a, b, "cta", [0]);
        this.w = new Hg(a, Rg, lf(Zg, nf).s, {x: nf[1], y: nf[2]}, new Gg(0, 12), !0);
        this.H = new Qg(545, 278, 25, 5);
        this.v = !1;
        var c = this;
        Yg(this, Zf, function (a) {
            "mousedown" == a && (c.v = !0, Vg.ma().log(1), We.removeAttribute("title"), a = P.ab.Bb, Re(a, function () {
                Xf(P.ab)
            }), a.Aa())
        })
    };
    v($g, V);
    $g.prototype.Hb = function () {
        this.v || Kg(this.w)
    };
    $g.prototype.Ua = function () {
        return this.v
    };
    $g.prototype.nb = function () {
        this.s.clearRect(0, 0, 640, 360);
        this.H.s(this.s)
    };
    var W = function (a, b, c, d, e, f, g) {
            var h = a.font;
            a.font = ah("", d, c);
            for (var l = bh(a, b, f); l.length > g && d > e;) a.font = ah("", --d, c), l = bh(a, b, f);
            for (b = 0; b < l.length; b++) for (; a.measureText(l[b]).width > f && d > e;) a.font = ah("", --d, c);
            a.font = h;
            return {dc: l, fontFamily: c, fontSize: d, fontStyle: ""}
        }, ah = function (a, b, c) {
            return a + " " + b + "px " + c
        }, bh = function (a, b, c) {
            b = b.match(/[^\s-]+-?/g);
            for (var d = b[0], e = [], f = 1; f < b.length; f++) {
                var g = d + ("-" == d[d.length - 1] ? "" : " ") + b[f];
                a.measureText(g).width > c ? (e.push(d), d = b[f]) : d = g
            }
            e.push(d);
            return e
        },
        ch = function (a, b, c, d, e) {
            var f = a.font;
            a.font = ah(b.fontStyle, b.fontSize, b.fontFamily);
            for (var g = 0; g < b.dc.length; g++) a.fillText(b.dc[g], c, d + g * e);
            a.font = f
        };
    jf.ma();
    var dh = Sg.ma(), X = function (a, b, c) {
        this.T = a;
        this.H = b || {};
        for (var d = b = 0, e; e = a[d]; d++) b = Math.max(b, e.frames.length);
        this.S = b;
        this.v = 0;
        this.R = -1;
        this.w = n(c) ? new Gg(void 0 != c ? c : 0, 12) : new Gg(-1, 12)
    };
    X.prototype.s = function (a) {
        this.R != this.v && (this.H[this.v] && ff(this.H[this.v]), this.R = this.v);
        for (var b = 0, c; c = this.T[b]; b++) {
            var d = this.v, d = Math.min(d, c.frames.length - 1);
            null != c.frames[d] && Vf.s(c.frames[d], a, c.x[d], c.y[d])
        }
        this.v = this.w.call(this.S, this.v)
    };
    X.prototype.reset = function () {
        this.v = 0;
        this.w.reset()
    };
    var fh = function (a, b) {
        this.v = [];
        this.$a = a;
        this.T = this.w = !1;
        this.Pa = bg;
        this.Ma = $f;
        this.Oa = ag;
        this.R = eh(this);
        this.S = b ? new X([qg], void 0, 30) : null;
        this.H = !1
    }, eh = function (a) {
        return new X([dg, a.Pa.Nb, a.Ma.Sb, a.Oa.Ub, a.$a.Qa])
    }, gh = function (a, b) {
        a.w = !0;
        a.T = !0;
        a.v.push(b)
    };
    fh.prototype.s = function (a) {
        this.v.length && this.v[0].w.s && (this.H && 1 == this.v.length ? this.w = !1 : this.v.shift());
        0 == this.v.length && (this.w && (this.Pa = this.Ma, this.Ma = this.Oa, this.Oa = cg, this.R = eh(this)), this.w = !1, this.R.reset(), this.v.push(this.R));
        this.v[0].s(a);
        this.S && !this.T && 1 == dh.s && this.S.s(a)
    };
    var ih = function (a) {
        L.call(this);
        this.s = a;
        nb(a, hh, this.R, !1, this);
        nb(a, "click", this.H, !1, this)
    };
    v(ih, L);
    var hh = La ? "keypress" : "keydown";
    ih.prototype.R = function (a) {
        (13 == a.H || Ma && 3 == a.H) && jh(this, a)
    };
    ih.prototype.H = function (a) {
        jh(this, a)
    };
    var jh = function (a, b) {
        var c = new kh(b);
        if (M(a, c)) {
            c = new lh(b);
            try {
                M(a, c)
            } finally {
                b.stopPropagation()
            }
        }
    };
    ih.prototype.v = function () {
        ih.wa.v.call(this);
        vb(this.s, hh, this.R, !1, this);
        vb(this.s, "click", this.H, !1, this);
        delete this.s
    };
    var lh = function (a) {
        D.call(this, a.s);
        this.type = "action"
    };
    v(lh, D);
    var kh = function (a) {
        D.call(this, a.s);
        this.type = "beforeaction"
    };
    v(kh, D);
    var mh = function (a, b, c, d, e) {
        E.call(this);
        this.R = a;
        this.qa = b;
        this.ka = c;
        this.$ = d;
        e && (this.w && this.unlisten(this.w, "action", this.H), e && (this.w = new ih(e), ma(this, ja(na, this.w)), this.H = u(this.S, this), this.listen(this.w, "action", this.H)))
    };
    v(mh, E);
    mh.prototype.S = function () {
        nh() && !Ia() && window.gapi && window.gapi.load ? (window.gapi.load("share", u(this.U, this)), Mc("gplus,li")) : (window.open("https://plus.google.com/share?url=" + this.R), Mc("gplus,lo"))
    };
    var nh = function () {
        if (!window.gbar) return !1;
        var a = !!(window.gbar.sos && 0 < window.gbar.sos().length), b = !(!window.gbar.so || !window.gbar.so());
        return a || b
    };
    mh.prototype.U = function () {
        if (window.gapi && window.gapi.share) {
            var a = {
                    items: [{
                        type: "http://schema.org/WebPage",
                        id: location.protocol + "//" + location.host,
                        properties: {url: [this.R], name: [this.qa], image: [this.$]}
                    }]
                }, b = window.location.toString().match(/[?&]authuser=(\d+)/), b = b && b[1],
                c = nh() || !!window.google.doodle.sf;
            window.gapi.share.lightbox(a, {
                isLoggedInForGooglePlus: c, onLoginPopupBlocked: function () {
                    Mc("gplus,popupblocked")
                }, onLoginStateChanged: u(function () {
                    la("google.doodle.sf", !0);
                    this.U()
                }, this), editorText: this.ka,
                sessionIndex: b || "", sourceForLogging: "doodle"
            })
        }
    };
    var oh = function (a) {
        return 0 == a.indexOf("//") ? "https:" + a : a
    }, ph = function (a) {
        Mc(["share", a, "x"].join())
    };
    var qh = Vg.ma(), rh = function () {
            return Fc("shortlink", "http://www.google.com/?doodle=25319343")
        }, sh = function (a) {
            var b = [Fc("share", "")];
            0 == a.length || b.push(a);
            Ic && b.reverse();
            return b.join(" ")
        }, th = function (a) {
            window.location = "http://www.google.com/doodles/_SHARE?description=" + encodeURIComponent(String(sh(a))) + "&url=" + encodeURIComponent(String(rh()))
        }, uh = function () {
            qh.log(2);
            var a = rh(), a = oh(a), b = new G("http://www.facebook.com/sharer.php"), c = new Xb;
            fc(c, "u", a);
            Vb(b, c);
            window.open(b.toString());
            ph(2)
        },
        vh = function (a) {
            var b = rh();
            a = sh(a);
            b = oh(b);
            (new mh(b, window.google.doodle.alt || "", a, "https://www.google.comshare.png")).S()
        }, wh = function (a) {
            var b = rh();
            a = sh(a);
            b = oh(b);
            window.open("http://twitter.com/intent/tweet?status=" + encodeURIComponent(String(a + "\n" + b)));
            ph(3)
        }, xh = function (a) {
            ph(5);
            var b = window.location, c = rh();
            a = sh(a);
            c = oh(c);
            a = {subject: Gc, body: a + "\n" + c};
            var c = new Xb, d;
            for (d in a) fc(c, d, a[d]);
            d = new G("mailto:");
            Vb(d, c);
            b.href = d.toString()
        };
    var yh = Q.ma(), zh = Vg.ma(), Ah = Sg.ma(), Eh = function (a, b, c, d) {
        V.call(this, a, b, "ending", [25]);
        Bh(this, a);
        this.U = new X([R(Ea(ng.ha.frames.length - 4))]);
        this.ta = Lg();
        this.ka = this.ta.getContext("2d");
        this.w = 0;
        this.v = Ch(this, this.ka, 2 == Ah.s ? [pg] : [ng]);
        a = function () {
            zh.log(2);
            var a = google.doodle ? google.doodle.url : "";
            if (a) if (google.nav && google.nav.go) {
                var b = a;
                if (0 == a.indexOf("/search")) {
                    b = new G(window.location);
                    b.R = "/search";
                    for (var a = (a instanceof G ? a.clone() : new G(a, void 0)).v, c = a.Ha(), d = 0; d < c.length; d++) {
                        var l =
                            c[d], q = b, B = l, l = a.get(l);
                        q.v.set(B, l)
                    }
                    b = b.toString()
                }
                google.nav.go(b)
            } else window.parent ? window.parent.location.assign(a) : window.location.assign(a)
        };
        this.T = rc ? [new Y(zf, I("Replay"), c), new Y(Af, I("Search"), a), new Y(Bf, I("Share"), th)] : [new Y(wf, I("E-mail"), xh), new Y(xf, I("Facebook"), uh), new Y(yf, I("Google+"), vh), new Y(Cf, I("Replay"), c), new Y(Df, I("Search"), a), new Y(Ef, I("Twitter"), wh)];
        this.H = Dh(this, ng.ha.frames.length);
        this.$ = !1;
        this.qa = 1 == Ah.s;
        this.La = function (a) {
            "mouseup" == a && d()
        }
    };
    v(Eh, V);
    var Fh = tc ? 1 : .8, Bh = function (a, b) {
        a.Ja = W(b, I("Level Rank 6").toUpperCase(), Ac("Open Sans Condensed") ? "Open Sans Condensed" : "sans-serif", 42, 24, 150, 2)
    }, Dh = function (a, b) {
        for (var c = b - Df.length, d = [], e = 0; e < a.T.length; e++) d.push(R(Ba(Ea(c), a.T[e].v)));
        return new X(d)
    }, Ch = function (a, b, c) {
        a.qa = !1;
        switch (c) {
            case hg.va:
                a.w = 0;
                break;
            case ig.va:
                a.w = 1;
                break;
            case jg.va:
                a.w = 2;
                break;
            case kg.va:
                a.w = 3;
                break;
            case lg.va:
                a.w = 4;
                break;
            default:
                a.qa = 1 == Ah.s, a.w = 5
        }
        a = [];
        for (var d = 0; d < c.length; d++) a.push({ha: c[d].ha, o: c[d].ra});
        return new Ng(b, yh, a)
    };
    Eh.prototype.Hb = function () {
        for (var a = this.v, b = 0, c = 0; c < a.H; c++) b += a.s[c].ha.frames.length;
        b + a.v.v >= this.v.w - 1 && (this.s.fillStyle = "rgb(102,54,19)", this.s.fillRect(0, 0, 640, 360));
        Pg(this.v);
        this.s.drawImage(this.ta, 0, 0);
        this.U.s(this.s);
        this.U.w.s && (a = this.s, b = this.Ja, a.save(), a.fillStyle = "#333", a.textBaseline = "middle", a.textAlign = "center", ch(a, b, 178, 140, 52.5), a.restore());
        if (this.H.w.s) for (a = 0; b = this.T[a]; a++) this.s.globalAlpha = b.w, b = b.s, Vf.s(b.o, this.s, b.x, b.y), this.s.globalAlpha = 1; else this.s.globalAlpha =
            Fh, this.H.s(this.s), this.s.globalAlpha = 1
    };
    Eh.prototype.Ib = function () {
        if (this.H.w.s && !this.$) {
            for (var a = 0, b; b = this.T[a]; a++) {
                for (var c = 2 == Ah.s ? String.fromCharCode(55356) + String.fromCharCode(57142) : String.fromCharCode(55357) + String.fromCharCode(56613), d = "", e = 0; e < this.w; e++) d += c;
                Yg(this, xd(b.s.x, b.s.y, b.s.o[3], b.s.o[4]), Gh(b, d))
            }
            this.qa && Yg(this, xd(236, 257, 26, 32), this.La);
            this.$ = !0
        }
        Eh.wa.Ib.call(this)
    };
    Eh.prototype.R = function () {
        this.$ = !1;
        this.H = Dh(this, ng.ha.frames.length);
        this.U = new X([R(Ea(ng.ha.frames.length - 4))]);
        this.v = Ch(this, this.ka, 2 == Ah.s ? [pg] : [ng]);
        Eh.wa.R.call(this)
    };
    Eh.prototype.Ua = function () {
        return !1
    };
    var Hh = function (a, b) {
        a.v = Ch(a, a.ka, b.va);
        a.U = new X([R(Ea(a.v.w - b.Db))]);
        a.H = Dh(a, a.v.w)
    }, Y = function (a, b, c) {
        this.v = a;
        this.s = this.v[this.v.length - 1];
        this.R = c;
        this.H = b;
        this.w = Fh
    }, Gh = function (a, b) {
        return function (c) {
            "mouseout" == c ? (a.w = Fh, S.title = "") : "mouseover" == c && (a.w = 1, a.H && (S.title = a.H));
            "mouseup" == c && (S.title = "", a.R(b))
        }
    };
    Eh.prototype.ub = function (a) {
        "Open Sans Condensed" == a && Bh(this, this.s)
    };
    var Ih = function (a, b, c, d, e, f, g, h) {
        this.s = a;
        this.R = b;
        this.w = c;
        this.T = d;
        this.H = e;
        this.S = f;
        this.v = g;
        this.W = h
    };
    Ih.prototype.clone = function () {
        return new Ih(this.s, this.R, this.w, this.T, this.H, this.S, this.v, this.W)
    };
    var Jh = function (a, b) {
        if (0 == b) return a.s;
        if (1 == b) return a.v;
        var c = F(a.s, a.w, b), d = F(a.w, a.H, b), e = F(a.H, a.v, b), c = F(c, d, b), d = F(d, e, b);
        return F(c, d, b)
    }, Lh = function (a) {
        var b = Kh, c = (a - b.s) / (b.v - b.s);
        if (0 >= c) return 0;
        if (1 <= c) return 1;
        for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
            var f = Jh(b, c), h = (Jh(b, c + 1E-6) - f) / 1E-6;
            if (1E-6 > Math.abs(f - a)) return c;
            if (1E-6 > Math.abs(h)) break; else f < a ? d = c : e = c, c -= (f - a) / h
        }
        for (g = 0; 1E-6 < Math.abs(f - a) && 8 > g; g++) f < a ? (d = c, c = (c + e) / 2) : (e = c, c = (c + d) / 2), f = Jh(b, c);
        return c
    };
    var Kh = new Ih(0, 0, .25, .1, .25, 1, 1, 1);
    var Mh = Q.ma(), Oh = function (a, b) {
        V.call(this, a, b, "extraSpicyIntro", [26]);
        this.w = new Qg(295, 155, 25, 5, !0);
        this.v = Nh(this)
    };
    v(Oh, V);
    Oh.prototype.ub = function (a) {
        "Special Elite" == a && (this.v = Nh(this))
    };
    var Nh = function (a) {
        return W(a.s, I("Easter Egg Mode"), Ac("Special Elite") ? "Special Elite" : "sans-serif", 50, 24, 400, 2)
    }, Ph = function (a, b, c) {
        ch(a.s, a.v, b, c, 1.1 * a.v.fontSize)
    };
    Oh.prototype.Hb = function () {
        var a = this.S * Ld / 1E3;
        this.s.clearRect(0, 0, 640, 360);
        this.s.textBaseline = "middle";
        this.s.textAlign = "center";
        this.s.fillStyle = "rgb(254,227,23)";
        if (1 > a) {
            var a = Lh(a / 1), b = Kh;
            if (0 == a) a = b.R; else if (1 == a) a = b.W; else var c = F(b.R, b.T, a), d = F(b.T, b.S, a),
                b = F(b.S, b.W, a), c = F(c, d, a), d = F(d, b, a), a = F(c, d, a);
            a = 16 + -15 * Math.min(1, Math.max(0, a));
            this.s.save();
            this.s.translate(320, 180);
            this.s.scale(a, a);
            Mh.s(of, this.s, -320, -180);
            Ph(this, 0, 0);
            this.s.restore()
        } else 3 > a ? (Mh.s(of, this.s, 0, 0), Ph(this,
            320, 180)) : 4 > a && (a -= 3, this.s.save(), this.s.globalAlpha = 1 - a / 1, Mh.s(of, this.s, 0, 0), Ph(this, 320, 180), this.s.restore())
    };
    Oh.prototype.Ua = function () {
        return 4 < this.S * Ld / 1E3
    };
    Oh.prototype.nb = function () {
        this.s.fillStyle = "#222";
        this.s.fillRect(0, 0, 640, 360);
        this.w.s(this.s)
    };
    var Qh = function (a, b) {
        this.v = [];
        this.state = b;
        this.s = 0;
        this.w = a
    };
    Qh.prototype.H = function (a) {
        var b = this.v[this.state].apply(this.w, Ca(arguments));
        n(b) ? this.set(b) : this.s++
    };
    Qh.prototype.set = function (a) {
        this.state = a;
        this.s = 0
    };
    var Rh = function (a) {
        return 3 * a * a - 2 * a * a * a
    };
    var Sh = Q.ma(), Tg = Sg.ma(), Th = function (a) {
        this.s = this.v = 0;
        this.w = a
    };
    Th.prototype.reset = function () {
        this.v = this.s = 0
    };
    Th.prototype.done = function () {
        return this.s > 60 * Ug(this.w)
    };
    var Uh = function (a, b, c, d) {
        this.s = new Th(b);
        this.S = Jb;
        this.v = 0;
        this.T = a;
        this.U = c;
        this.V = d;
        this.R = !1;
        this.W = 0;
        this.H = !0;
        this.w = !1
    }, Vh = function (a) {
        var b = a.S(a.s.v);
        .5 <= b && (a.R = !0);
        1 == Tg.s && a.V && 1 == a.W && (2 < a.v || 1 < a.v && a.R) && (b = .5);
        return a.H ? b : 1 - b
    };
    Uh.prototype.done = function () {
        return this.w || this.v >= (1 == Tg.s ? this.T : 3) && this.s.done()
    };
    var Wh = function (a) {
        a = Math.exp(2 * a);
        return (a - 1) / (a + 1)
    };
    Q.ma();
    var Xh = function (a, b, c) {
        this.v = a;
        this.w = b;
        this.s = this.Ta = a;
        this.Zb = 0;
        this.H = c
    };
    Xh.prototype.tb = function () {
        return 0 >= this.Ta
    };
    var Yh = Q.ma(), Zh = Sg.ma(), Z = function (a, b, c) {
        V.call(this, a, b, c.id, c.Fb);
        this.w = c;
        b = new Qh(this, 1);
        b.v[1] = this.Bc;
        b.v[2] = this.Cc;
        b.v[3] = this.Ac;
        b.v[4] = this.zc;
        b.v[5] = this.Dc;
        b.v[6] = p;
        this.v = b;
        this.H = new Uh(c.vb, c.Jb, c.mb, !!c.Va);
        this.U = new Xh(c.Eb, c.Gb, !!c.Kb);
        this.La = 0;
        this.Ya = Jc(this.w.Ab);
        this.ta = W(a, this.Ya, Ac("Special Elite") ? "Special Elite" : "sans-serif", 40, 24, 250, 2);
        this.Xa = Jc(this.w.yb);
        this.qa = W(a, this.Xa, Ac("Special Elite") ? "Special Elite" : "sans-serif", 24, 10, 250, 3);
        this.Mb = Jc(this.w.Cb).toUpperCase();
        this.Za = W(a, this.Mb, Ac("Open Sans Condensed") ? "Open Sans Condensed" : "sans-serif", 42, 24, 150, 2);
        this.$ = $h(this);
        this.T = new fh(c.Na, c.Va);
        a = c.Na.rb;
        b = [];
        for (var d = 0; d < a.length; d++) b.push({ha: a[d].ha, o: a[d].ra});
        this.Ja = 0 == a.length ? null : new Ng(this.s, Yh, b);
        0 == a.length && (this.v.state = 2);
        this.ka = 1 == Zh.s ? c.wb : P.jc;
        this.Vb = new Qg(295, 155, 25, 5, !0)
    };
    v(Z, V);
    Z.prototype.Aa = function () {
        Z.wa.Aa.call(this);
        this.ka.Bb.Aa()
    };
    Z.prototype.R = function () {
        Z.wa.R.call(this);
        Yf(this.ka)
    };
    Z.prototype.ya = function () {
        return this.U.tb()
    };
    var ai = function (a) {
        Yg(a, Zf, function (b) {
            "mousedown" == b && (a.H.w = !0, Zc(a.W.s, Zf))
        })
    };
    k = Z.prototype;
    k.Bc = function () {
        if (0 == this.v.s) Xf(P.ab, 1.5); else if (Og(this.Ja)) return Yf(P.ab), 2
    };
    k.Cc = function () {
        if (5 < this.v.s * Ld / 1E3) return Xf(this.ka), 3
    };
    k.Ac = function () {
        if (0 == this.v.s) {
            var a = this.H;
            a.S = Rh || Jb;
            a.s.reset();
            a.H = !0;
            a.w = !1;
            a.v = 0;
            a.W++;
            ai(this)
        }
        if (this.H.done()) {
            var a = this.U, b;
            b = this.H;
            b = (1 == Tg.s ? 25 : 20) * (1 - Math.abs(Wh((1 == Tg.s ? b.U : 8) * (Vh(b) - .5))));
            a.Ta -= b;
            a.Zb = 50;
            this.La++;
            Zc(this.W.s, Zf);
            return 3 > this.La && !this.U.tb() ? 4 : 5
        }
        a = this.H;
        a.w || (b = a.s, b.done() || (b.v = b.s / (60 * Ug(b.w))), b.s++, a.s.done() && !a.done() && (a.s.reset(), a.v++, a.R = !1, a.H = !a.H))
    };
    k.zc = function () {
        if (0 == this.v.s) {
            var a = this.T, b;
            b = Vh(this.H);
            b = .2 <= b && .8 >= b;
            gh(a, new X([eg, b ? a.Pa.hb : a.Pa.kb, a.Ma.Ra, a.Oa.Wa, b ? a.$a.qb : a.$a.Qa], b ? rg : sg))
        }
        if (1 < this.v.s * Ld / 1E3 && !this.T.w) return 3
    };
    k.Dc = function () {
        if (0 == this.v.s) {
            if (this.ya()) {
                var a = this.T;
                gh(a, new X([Wf(eg, gg), Wf(a.Pa.hb, T), Wf(a.Ma.Ra, a.Ma.Ob), Wf(a.Oa.Wa, a.Oa.Tb), a.$a.va], tg))
            } else a = this.T, gh(a, new X([Wf(eg, fg), Wf(a.Pa.kb, T), Wf(a.Ma.Ra, T), Wf(a.Oa.Wa, T), a.$a.Lb], ug));
            a.H = !0
        }
        if (3 < this.v.s * Ld / 1E3 && !this.T.w) return 6
    };
    k.Ib = function () {
        this.v.H();
        Z.wa.Ib.call(this)
    };
    k.Hb = function () {
        if (1 == this.v.state) Pg(this.Ja); else {
            var a = this.s;
            a.clearRect(0, 0, 640, 360);
            if (2 == this.v.state) {
                a = mg[Math.floor(Math.min(mg.length - 1, this.v.s * Ld / 1E3 / 5 * mg.length))];
                Yh.s(this.w.Na.lb, this.s, 28, a);
                var b = this.s;
                b.save();
                b.fillStyle = "#000";
                b.textBaseline = "middle";
                b.textAlign = Ic ? "right" : "left";
                ch(b, this.ta, 52 + (Ic ? 250 : 0), a + 60, 1.1 * this.ta.fontSize);
                ch(b, this.qa, 52 + (Ic ? 250 : 0), a + 160, 1.4 * this.qa.fontSize);
                b.restore()
            } else {
                Yh.s(this.w.background, a, 0, 0);
                2 == Zh.s && (b = this.S % 80, this.s.fillStyle = "rgba(255,0,0," +
                    Math.min((40 > b ? b / 40 : 1 - (b - 40) / 40) + .2, 1) + ")", this.s.textBaseline = "top", this.s.textAlign = "left", ch(this.s, this.$, 12, 8, 1.1 * this.$.fontSize));
                this.T.s(a);
                var b = this.H, c = this.S * Ld / 1E3;
                Sh.s(tf, a, 320 - tf[3] / 2, 360 - tf[4] - 10);
                var d = uf;
                !b.done() && b.v >= (1 == Tg.s ? b.T : 3) - 2 && Math.floor(4 * c) % 2 && (d = vf);
                Sh.s(d, a, 146 + 314 * Vh(b), 315);
                b = this.U;
                c = null != document[qd];
                0 <= b.Zb-- || (d = b.Ta - b.s, b.s = 1 > Math.abs(d) ? b.Ta : b.s + .1 * d);
                var d = 1 - Math.min(Math.max((b.v - b.s) / b.v, 0), 1), e = Pf[0], f = e.x + 4, g = e.y, h = e.o[3],
                    l = e.o[4], q = h * d;
                a.save();
                a.beginPath();
                a.moveTo(f, g);
                a.lineTo(f + h, g);
                a.lineTo(f + h, g + l);
                a.lineTo(f + 4, g + l);
                a.lineTo(f, g);
                a.clip();
                a.fillStyle = "#3d3d3d";
                a.fillRect(f, g, h, l);
                a.fillStyle = "#669933";
                a.fillRect(f + h - q, g, q, l);
                b.H && (a.textAlign = "right", a.font = "25px Geo", a.fillStyle = "#fff", a.fillText("" + Math.round(d * b.w), f + h - 10 - (c ? Ed[3] : 0), g + 16));
                a.restore();
                Vf.s(e.o, a, e.x, e.y)
            }
        }
    };
    k.Ua = function () {
        return 6 == this.v.state
    };
    k.nb = function () {
        this.Vb.s(this.s)
    };
    k.ac = function () {
        3 == this.v.state && (this.H.w = !0)
    };
    k.ub = function (a) {
        "Special Elite" == a ? (this.ta = W(this.s, this.Ya, "Special Elite", 40, 24, 250, 2), this.qa = W(this.s, this.Xa, "Special Elite", 24, 10, 250, 3), this.$ = $h(this)) : "Open Sans Condensed" == a && (this.Za = W(this.s, this.Mb, "Open Sans Condensed", 42, 24, 150, 2))
    };
    var $h = function (a) {
        return W(a.s, I("Easter Egg Mode"), Ac("Special Elite") ? "Special Elite" : "sans-serif", 24, 20, 350, 1)
    };
    var bi = {
        width: 640,
        height: 360,
        frames: [[[2, 1, 0, 1092, 636, 359]], [[0, 0, 0, 0, 640, 360]], [[0, 0, 644, 0, 640, 360]], [[0, 0, 0, 364, 640, 360]], [[0, 0, 644, 364, 640, 360]], [[0, 0, 0, 728, 640, 360]], [[0, 17, 644, 728, 640, 343]], [[117, 99, 1417, 26, 4, 5], [421, 219, 1433, 26, 4, 4], [423, 224, 1441, 26, 4, 3], [577, 229, 1425, 26, 4, 5], [0, 301, 644, 1075, 640, 59]], [], [], [], [], [[167, 14, 640, 1440, 239, 295], [185, 333, 1288, 26, 125, 8]], [[167, 13, 1164, 1138, 254, 296], [185, 337, 1441, 33, 3, 3]], [[167, 11, 640, 1138, 258, 298], [174, 334, 1288, 0, 156, 9]], [[167, 11, 902, 1138, 258, 298],
            [174, 333, 1288, 13, 156, 9]], [[167, 12, 1164, 1438, 252, 297], [295, 333, 1440, 40, 3, 3], [193, 337, 1288, 38, 84, 3]], [[167, 11, 883, 1440, 232, 298], [171, 334, 0, 1455, 159, 8]], [], [[244, 118, 1288, 45, 22, 32]], [], [[239, 121, 1408, 38, 28, 35]], [], [[239, 118, 1376, 38, 28, 38]], [], [[244, 118, 1288, 45, 22, 32]], [], [[239, 121, 1408, 38, 28, 35]], []]
    };
    var ci = {
        width: 640,
        height: 360,
        frames: [[[0, 0, 0, 0, 640, 360]], [], [], [[244, 118, 1266, 93, 22, 32]], [], [], [[239, 121, 1269, 0, 28, 35]], [], [], [], [], [], [], [], [], [], [], [], [], [[239, 63, 1208, 0, 57, 40], [330, 113, 1208, 44, 54, 186]], [[205, 64, 1027, 0, 177, 235]], [[189, 16, 644, 0, 188, 288]], [[190, 16, 836, 0, 187, 291]], [[260, 60, 1266, 66, 24, 10], [256, 79, 1266, 44, 29, 7], [248, 90, 1208, 234, 49, 19], [209, 198, 1027, 239, 166, 110]], [[260, 61, 1266, 80, 24, 9], [256, 79, 1266, 55, 29, 7], [248, 90, 1197, 257, 49, 19]], [], [], [], [[621, 126, 1266, 129, 19, 98]], [[596, 124, 1250, 257,
            44, 101]]]
    };
    var di = {
        width: 640,
        height: 360,
        frames: [[[0, 0, 0, 0, 640, 360]], [[525, 124, 0, 664, 115, 109]], [[497, 124, 644, 322, 143, 109]], [[476, 124, 644, 0, 164, 109]], [[447, 124, 0, 551, 193, 109]], [[431, 124, 313, 514, 209, 109]], [], [], [], [], [], [[247, 88, 626, 486, 23, 23], [277, 87, 791, 393, 19, 19]], [[242, 64, 626, 435, 60, 47], [243, 129, 791, 362, 19, 27]], [[228, 40, 732, 435, 78, 118]], [], [[265, 132, 690, 482, 28, 21], [324, 243, 690, 435, 33, 43], [354, 291, 809, 113, 4, 4]], [], [], [], [[209, 149, 377, 639, 170, 159]], [[254, 166, 791, 416, 5, 6], [260, 127, 197, 627, 176, 180]], [[341, 127,
            0, 777, 111, 181], [453, 169, 791, 348, 20, 10]], [[331, 162, 313, 364, 309, 146]], [[321, 255, 626, 364, 8, 25], [331, 124, 0, 364, 309, 183]], [[438, 188, 526, 514, 202, 121]], [[549, 204, 115, 811, 91, 114], [638, 321, 809, 184, 2, 3], [638, 326, 809, 128, 2, 24]], [[321, 255, 626, 393, 8, 25], [334, 102, 644, 113, 161, 205], [615, 254, 197, 551, 25, 64], [638, 321, 809, 191, 2, 3], [638, 326, 809, 156, 2, 24]], [[253, 84, 791, 322, 22, 22], [283, 83, 653, 486, 15, 22], [326, 93, 685, 639, 128, 213], [458, 150, 809, 121, 3, 3]], [[251, 84, 226, 551, 24, 25], [282, 84, 551, 639, 130, 222]], [[274, 116, 377, 802, 104,
            192]]]
    };
    var ei = {
        width: 640,
        height: 360,
        frames: [[[0, 0, 0, 0, 640, 360]], [], [], [], [], [], [[190, 17, 776, 1148, 131, 151]], [[189, 16, 642, 1148, 132, 151]], [[185, 15, 1040, 1148, 128, 153]], [[184, 15, 258, 1199, 123, 152]], [[182, 14, 383, 1199, 123, 152]], [[243, 87, 1170, 1148, 19, 16], [271, 82, 1191, 1148, 15, 15]], [[182, 14, 130, 1199, 126, 147]], [[186, 15, 909, 1148, 129, 153]], [[190, 17, 0, 1199, 128, 149]], [], [], [], [], [], [], [], [], [], [], [[0, 0, 642, 0, 640, 360]], [[0, 0, 0, 362, 640, 360]], [[0, 0, 642, 362, 640, 360]], [[0, 0, 0, 724, 640, 291]], [[0, 0, 642, 724, 640, 247]], [[0, 0, 642,
            973, 640, 173]], [[0, 0, 0, 1017, 640, 110]], [[0, 0, 0, 1129, 640, 68]]]
    };
    var fi = Q.ma(), gi = function (a, b) {
        V.call(this, a, b, "opening", [1, 2, 3]);
        this.v = new Ng(a, fi, [{ha: bi, o: pf}, {ha: ci, o: qf}, {ha: di, o: rf}, {ha: ei, o: sf}]);
        this.w = new Qg(295, 155, 25, 5, !0)
    };
    v(gi, V);
    gi.prototype.Hb = function () {
        Pg(this.v)
    };
    gi.prototype.R = function () {
        gi.wa.R.call(this);
        Yf(P.ab)
    };
    gi.prototype.Ua = function () {
        return Og(this.v)
    };
    gi.prototype.nb = function () {
        this.s.clearRect(0, 0, 640, 360);
        this.w.s(this.s)
    };
    var Ve = jf.ma(), hi = Vg.ma(), ii = Sg.ma(), li = function (a, b, c) {
        w.call(this);
        this.S = a;
        var d = this;
        this.U = b;
        Hd(this.U, new yd(function (a) {
            d.s && d.s.ac(a)
        }, function (a) {
            return wg(a.H)
        }));
        this.R = new Eh(a, b, function () {
            hi.log(3);
            ji(d)
        }, function () {
            hi.log(6);
            ji(d, !0)
        });
        this.ka = new $g(a, b);
        c && (this.ka.v = !0);
        this.ya = new gi(a, b);
        this.qa = new Oh(a, b);
        this.H = ki(this);
        this.$ = 0;
        this.s = this.H[0];
        this.w = this.H[1];
        this.s.Aa();
        this.V = this.ta = !1;
        Ze()
    };
    v(li, w);
    li.prototype.v = function () {
        mi(this);
        Ve.reset();
        li.wa.v.call(this)
    };
    var ji = function (a, b) {
        b && (ii.s = 2);
        mi(a);
        a.H = ki(a);
        a.$ = 0;
        a.s = a.H[0];
        a.w = a.H[1];
        Bh(a.R, a.S)
    }, ki = function (a) {
        var b = [a.ka, a.ya];
        2 == ii.s && b.push(a.qa);
        b.push(new Z(a.S, a.U, hg));
        b.push(new Z(a.S, a.U, ig));
        b.push(new Z(a.S, a.U, jg));
        b.push(new Z(a.S, a.U, kg));
        b.push(new Z(a.S, a.U, lg));
        b.push(a.R);
        return b
    }, mi = function (a) {
        a.s && (a.s.R(), a.s = null)
    }, ni = function (a) {
        if (wc() || a.ka.v) a.w && !Xg(a.w) && a.w.Aa(), Xg(a.R) || a.R.Aa(), a.ta || (zc(function (b) {
            for (var d = 0; d < a.H.length; d++) a.H[d].ub(b);
            a.qa.ub(b)
        }), a.ta = !0);
        var b =
            !1;
        a.s && (a.s.Ua() && (a.w && Xg(a.w) ? (0 < a.$ && "white" != S.style.background && (S.style.background = "white"), mi(a), a.$++, a.s = a.w, a.w = a.H[a.$ + 1], a.V = !1) : b = !0), a.s.Ib(), a.s.Hb(), b && a.s.nb(), a.s.Ua() && a.s.ya && (b = a.s, b.ya() ? a.V || (hi.log(4, b.w.index), a.V = !0) : (a.V || (hi.log(5, b.w.index), a.V = !0), Hh(a.R, b.w), a.R.Ja = b.Za, a.w = a.R, a.$ = a.H.length - 1)))
    };
    var Dd = Q.ma(), zd = K.ma(), Bd = jf.ma(), oi = function (a, b) {
        Gd.call(this, b, a)
    };
    v(oi, Gd);
    var pi = function (a, b, c) {
        w.call(this);
        this.w = a.getContext("2d");
        Cd();
        var d = this;
        this.s = new oi(a, b);
        ma(this, ja(na, this.s));
        this.H = new li(this.w, this.s, c);
        ma(this, ja(na, this.H));
        Nd(function () {
            var a = sd;
            if (a.v || a.S) {
                var b = null != document[qd], c = window.innerWidth, h = window.innerHeight;
                0 == window.scrollX && 0 == window.scrollY || window.scrollTo(0, 0);
                if (c != a.V || h != a.U || b != a.ka || a.w) {
                    a.R = c < h;
                    for (var l = !1, q = 0; q < a.H.length; ++q) {
                        var B = a.H[q], y = B.width, ba = B.height;
                        pd && 0 == q && (l = y < ba != a.R);
                        var cb = l ? Math.min(c / ba, h / y) : Math.min(c /
                            y, h / ba), y = cb * y, ba = cb * ba, ed, fd;
                        l ? (cb = (c - ba) / 2 + ba, ed = (h - y) / 2, fd = "rotate(90deg)") : (cb = (c - y) / 2, ed = (h - ba) / 2, fd = "");
                        Cc(B, "TransformOrigin", "0 0");
                        Cc(B, "Transform", fd);
                        xc(B, "position", "absolute", "width", y + "px", "height", ba + "px", "left", cb + "px", "top", ed + "px")
                    }
                    document.body.clientWidth > c && 0 < c && xc(document.body, "width", c + "px");
                    xc(a.s, "height", "100%", "width", "100%");
                    a.$(a.R && l);
                    a.V = c;
                    a.U = h;
                    a.ka = b;
                    a.w = !1
                }
            }
            ni(d.H);
            a = d.s;
            null != document[qd] && a.V.s(a.R, d.w, a.U, 0);
            return !0
        })
    };
    v(pi, w);
    var qi = null, ri = function () {
        document.getElementById("fkbx") ? ub(We, "click", function () {
            xc(S, "cursor", "default");
            qi = new pi(S, We, !0)
        }) : qi = new pi(S, We, !1)
    };
    (function (a, b, c) {
        var d = function () {
            a();
            window.lol && window.lol()
        }, e = function () {
            Rd(d, b, c);
            Qd(d, b);
            d()
        };
        google && google.x ? google.x({id: "DOODLE"}, e) : e()
    })(function () {
        S = (We = document.getElementById("hplogo")) ? We.querySelector("canvas") : null;
        We && S && Dd.Aa(0, ri)
    }, function () {
        for (var a = Dd, b = 0, c; c = a.v[b]; b++) c.w = [];
        na(qi);
        a = zd;
        a.S = !0;
        Ad(a)
    });
})();
