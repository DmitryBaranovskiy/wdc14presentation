// Самого главного глазами не увидишь.
// -- Антуан де Сент-Экзюпери
function bgSetup(s, callback) {
    callback && callback();
}
var vbfix = {sw: 1};
function pathifist(el, g) {
    var x = 0,
        y = 0,
        a = g,
        two = 4 * vbfix.sw,
        four = 8 * vbfix.sw,
        s,
        path = Snap.parsePathString(Snap.path.get[el.type](el));
    g = g.g();
    g.path(path).attr({
        fill: "none"
    });
    g.attr();
    for (var i = 0, ii = path.length; i < ii; i++) {
        var seg = path[i];
        switch (seg[0]) {
            case "M":
            case "L":
                s = g.g();
                x = +seg[1];
                y = +seg[2];
                s.circle(x, y, two);
                break;
            case "m":
            case "l":
                x += +seg[1];
                y += +seg[2];
                s.circle(x, y, two);
                break;
            case "H":
                x = +seg[1];
                s.circle(x, y, two);
                break;
            case "h":
                x += +seg[1];
                s.circle(x, y, two);
                break;
            case "V":
                y = +seg[1];
                s.circle(x, y, two);
                break;
            case "v":
                y += +seg[1];
                s.circle(x, y, two);
                break;
            case "C":
                s = g.g();
                s.rect(seg[1] - two, seg[2] - two, four, four);
                s.rect(seg[3] - two, seg[4] - two, four, four);
                s.circle(seg[5], seg[6], two);
                s.path("M" + [x, y, seg[1], seg[2]] + "M" + [seg[3], seg[4], seg[5], seg[6]]);
                x = +seg[5];
                y = +seg[6];
                break;
            case "c":
                s = g.g();
                s.rect(seg[1] - two + x, seg[2] - two + y, four, four);
                s.rect(seg[3] - two + x, seg[4] - two + y, four, four);
                s.path("M" + [x, y, +seg[1] + x, +seg[2] + y] + "M" + [+seg[3] + x, +seg[4] + y, +seg[5] + x, +seg[6] + y]);
                x += +seg[5];
                y += +seg[6];
                s.circle(x, y, two);
                break;
            case "s":
                s = g.g();
                s.rect(x + seg[1] - two, y + seg[2] - two, four, four);
                s.path("M" + [+seg[1] + x, +seg[2] + y, +seg[3] + x, +seg[4] + y]);
                x += +seg[3];
                y += +seg[4];
                s.circle(x, y, two);
                break;
        }
    }
    g.toDefs();
    a.add(g.use().attr({
        stroke: "#fff",
        strokeWidth: 3 * vbfix.sw,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }));
    a.add(g.use().attr({
        stroke: "#333",
        fill: "#333",
        strokeWidth: vbfix.sw
    }));
}
function spreadClasses(text, classes) {
    text.selectAll("tspan").forEach(function (el, i) {
        classes[i] && el.addClass(classes[i]);
    });
}

var colors = {
    aqua: "#7fdbff",
    blue: "#0074d9",
    lime: "#01ff70",
    navy: "#001f3f",
    teal: "#39cccc",
    olive: "#3d9970",
    green: "#2ecc40",
    red: "#ff4136",
    maroon: "#85144b",
    orange: "#ff851b",
    purple: "#b10dc9",
    yellow: "#ffdc00",
    fuchsia: "#f012be",
    gray: "#aaa",
    white: "#fff",
    black: "#111",
    silver: "#ddd"
};
var color = "#fff",
    color2 = "#2989ee",
    R = "#ee5e22",
    G = "#69ee21",
    B = "#23a2ee",
    bgb = "#2c4e6b",
    bgr = "#6b312c",
    red = "#a22",
    pur = "#6f518f",
    grey = "#384042",
    attrShape = {
        stroke: "none",
        fill: color
    },
slides = [
    function () {
        var g = this;
        g.text(400, 580, "Web Directions Code · 2014").attr({
            "class": "title",
            fill: color,
            fontWeight: 400,
            fontSize: "20px"
        });
        var t = g.text(400, 250, ["Y","o","u don","’t know SV","G"]).addClass("title").attr({
                font: '800 60px "Brandon Text", "Source Sans Pro", "Helvetica Neue"'
            }),
            bb = t.getBBox(),
            p = g.path("M" + [bb.x, 250] + "h" + bb.width).attr({fill: "none"}),
            pt = g.g(g.rect(0, 0, 10, 10).attr({fill: "#FF4136"}),
                g.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
                    fill: "none",
                    stroke: color,
                    strokeWidth: 10
                })),
            ptrn = pt.toPattern(0, 0, 10, 10);
        t.attr({
            textpath: p,
            fill: ptrn,
            x: 0
        });
        t.textPath.attr({startOffset: bb.width / 2});
        eve.once("click.2", function () {
            t.select("tspan:nth-child(2)").animate({
                dx: -8
            }, 1000);
            t.select("tspan:nth-child(4)").animate({
                dx: -4
            }, 1000);
            t.select("tspan:nth-child(5)").animate({
                dx: -3
            }, 1000);
        });
        eve.once("click.1", function () {
            Snap.animate(0, 1, function (val) {
                p.attr({d: "M" + [bb.x, 250] + "c" + [0, 160 * val, bb.width, -160 * val, bb.width, 0]});
                t.textPath.attr({startOffset: p.getTotalLength() / 2});
                pt[1].attr({strokeWidth: 10 - 7 * val});
            }, 500, function () {
                setTimeout(function () {
                    Snap.animate(1, 0, function (val) {
                        p.attr({d: "M" + [bb.x, 250] + "c" + [0, 160 * val, bb.width, -160 * val, bb.width, 0]});
                        t.textPath.attr({startOffset: p.getTotalLength() / 2});
                        pt[1].attr({strokeWidth: 10 - 7 * val});
                    }, 500);
                }, 300);
            });
        });
        return grey;
    },
    function () {
       var g = this; g.path("M27.777,18.941c0.584-0.881,0.896-1.914,0.896-2.998c0-1.457-0.567-2.826-1.598-3.854l-6.91-6.911l-0.003,0.002c-0.985-0.988-2.35-1.6-3.851-1.6c-1.502,0-2.864,0.612-3.85,1.6H12.46l-6.911,6.911c-1.031,1.029-1.598,2.398-1.598,3.854c0,1.457,0.567,2.826,1.598,3.854l6.231,6.229c0.25,0.281,0.512,0.544,0.789,0.785c1.016,0.961,2.338,1.49,3.743,1.49c1.456,0,2.825-0.565,3.854-1.598l6.723-6.725c0.021-0.019,0.034-0.032,0.051-0.051l0.14-0.138c0.26-0.26,0.487-0.54,0.688-0.838c0.004-0.008,0.01-0.015,0.014-0.021L27.777,18.941zM26.658,15.946c0,0.678-0.197,1.326-0.561,1.879c-0.222,0.298-0.447,0.559-0.684,0.784L25.4,18.625c-1.105,1.052-2.354,1.35-3.414,1.35c-0.584,0-1.109-0.09-1.523-0.195c-2.422-0.608-5.056-2.692-6.261-5.732c0.649,0.274,1.362,0.426,2.11,0.426c2.811,0,5.129-2.141,5.415-4.877l3.924,3.925C26.301,14.167,26.658,15.029,26.658,15.946zM16.312,5.6c1.89,0,3.426,1.538,3.426,3.427c0,1.89-1.536,3.427-3.426,3.427c-1.889,0-3.426-1.537-3.426-3.427C12.886,7.138,14.423,5.6,16.312,5.6zM6.974,18.375c-0.649-0.648-1.007-1.512-1.007-2.429c0-0.917,0.357-1.78,1.007-2.428l2.655-2.656c-0.693,2.359-0.991,4.842-0.831,7.221c0.057,0.854,0.175,1.677,0.345,2.46L6.974,18.375zM11.514,11.592c0.583,4.562,4.195,9.066,8.455,10.143c0.693,0.179,1.375,0.265,2.033,0.265c0.01,0,0.02,0,0.027,0l-3.289,3.289c-0.648,0.646-1.512,1.006-2.428,1.006c-0.638,0-1.248-0.177-1.779-0.5l0.001-0.002c-0.209-0.142-0.408-0.295-0.603-0.461c-0.015-0.019-0.031-0.026-0.046-0.043l-0.665-0.664c-1.367-1.567-2.227-3.903-2.412-6.671C10.669,15.856,10.921,13.673,11.514,11.592").attr({
            fill: "#fff",
            transform: "t384,284s8"
        });
        g.text(400, 500, "Raphaël: 2008").attr({
            "class": "text"
        });
    },
    function () {
        var g = this;
        g.text(400, 500, "Snap.svg").attr({
            "class": "title",
            fill: color
        });
        Snap.load("snap.logo.svg", function (f) {
            var logo = f.select("g"),
                parts = [
                    ["top", [0, 20]], 
                    ["left", [20, 0]], 
                    ["bottom", [0, -20]],
                    ["right", [-20, 0]]
                ],
                i = 0,
                showTimer = null,
                hideTimer = null;

            
            for (i = 0; i < parts.length; i++) {
                var el = parts[i],
                element = logo.select("#" + el[0]);
                element.attr({
                    opacity: 0,
                    transform: "t" + el[1]
                });
                parts[i].push(element);
            }
            g.add(logo);
            logo.transform("t275,175")
            i = 0;

            function showEach() {
                parts[i++][2].animate({ 
                    transform: "t0,0",
                    opacity: 1
                }, 200, mina.easeout);
                if (parts[i]) {
                    setTimeout(showEach, 200);
                }
            }

            setTimeout(showEach, 500);
            
        });
    },
    function () {
        var g = this,
            t = g.g().attr({
                font: "16px Brandon Text",
                fill: "#fff"
            });
        g.path("M" + [400 + Math.cos(Snap.rad(-60)) * 200, 300 + Math.sin(Snap.rad(-60)) * 200] + "A200,200,0,0,1" + [400 + Math.cos(Snap.rad(-30)) * 200, 300 + Math.sin(Snap.rad(-30)) * 200]).attr({
            fill: "none",
            stroke: colors.maroon,
            strokeWidth: 20
        });
        var path = "";
        for (var i = -60; i < 61; i++) {
            var a = Snap.rad(i - 90),
                d = 190 + ((i % 10) ? (i % 5) ? 5 : 10 : 20);
            path += "M" + [400 + Math.cos(a) * 190, 300 + Math.sin(a) * 190, 400 + Math.cos(a) * d, 300 + Math.sin(a) * d];
            !(i % 10) && t.text(400 + Math.cos(a) * 225, 300 + Math.sin(a) * 225, i + 60 + "");
        }
        g.path(path).attr({fill: "none", stroke: "#fff"});
        var arr = g.g().attr({
            mask: g.g(
                g.rect(0, 0, "100%", "100%").attr({fill: "#fff"}),
                g.circle(400, 300, 25)
            )
        });
        g.circle(400, 300, 25).attr({fill: "none", stroke: colors.gray, strokeWidth: 2});
        arr.path("M400,300h10l-10-200z").attr({fill: colors.red});
        arr.path("M400,300h-10l10-200z").attr({fill: colors.orange});
        var angle = 10;
        i = setInterval(function () {
            angle += Math.round(Math.random() * 10 - 5);
            arr.animate({transform: "r" + angle + ",400,300"}, 2000);
        }, 2200);
        setTimeout(function () {
            clearInterval(i);
        }, 600000);
    },
    function () {
        var g = this,
            group,
            p;
        Snap.load("path.svg", function (f) {
            group = f.select("g");
            g.add(group);
            group.attr({
                transform: "t350,200",
                fill: color
            });
            eve.once("click.1", function () {
                p = g.select("#p");
                group.animate({opacity: 0}, 1300);
                p.animate({transform: "s10,10"}, 1000, function () {
                    var P = g.path(Snap.path.map(p.attr("d"), p.transform().totalMatrix)).attr({
                        fill: "none"
                    });
                    pathifist(P, g);
                });
            });
        });
        return bgb;
    },
    function () {
        var g = this,
            gg = g.g(),
            commands = ["M50,50","L100,100","C300,20 500,200 700,500","h100","z"],
            x = 0,
            C = g.circle(-100, 300, 20),
            c = C.use().attr({
                fill: "#FF4136"
            });
            o = C.use().attr({
                stroke: "#FF4136",
                strokeDasharray: "2 2",
                fill: "none"
            });
        for (var i = 0, ii = commands.length; i < ii; i++) {
            gg.text(x, 300, commands[i]).addClass("text-left");
            x = gg.getBBox().w;
        }
        C.toDefs();
        c.attr({
            mask: gg.use().attr({stroke: "#fff"})
        });
        function focus(id) {
            var tt = gg.select("text:nth-child(" + id + ")"),
                bb = tt.getBBox();
            C.animate({
                cx: bb.cx,
                cy: bb.cy,
                r: bb.r0
            }, 1000, mina.easein);
        }
        eve.once("click.1", function () {
            focus(1);
        });
        eve.once("click.2", function () {
            focus(2);
        });
        eve.once("click.3", function () {
            focus(3);
        });
        eve.once("click.4", function () {
            focus(4);
        });
        eve.once("click.5", function () {
            focus(5);
        });
        return grey;
    },
    function () {
        var g = this,
            t = g.text(400, 250, "The Magic of <use>").attr({
                "class": "title"
            }),
            bb = t.getBBox(),
            last;
        for (var i = 1; i < 11; i++) {
            last = t.use().attr({
                fill: "hsb(" + (i / 10) + ",.5,1)"
            });
            (function (last, i) {
                eve.once("click.1", function () {
                    last.animate({
                        transform: "s" + [i / 10 * 2, i / 10 * 2, bb.cx, bb.cy - 150]
                    }, 4000, mina.elastic);
                });
            })(last, i);
        }
        last = t.use().attr({
            fill: color,
            stroke: color
        });
        t.toDefs();
        eve.once("click.1", function () {
            last.remove();
        });
        return grey;
    },
    function () {
        var g = this.g();
        var t1 = g.text(20, 300, ['<', 'circle ', 'id', '=', '"c1"', ' cx', '=', '"10"', ' cy', '=', '"10"', ' r', '=', '"5"', ' fill', '=', '"white"', '/>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value", "attr", "", "value", "attr", "", "value", "attr", "", "value", "attr", "", "value"]);
        var t2 = g.text(20, 330, ['<', 'use ', 'xlink:href', '=', '"#c1"', ' fill', '=', '"red"', ' stroke', '=', '"blue"', ' x', '=', '"50"', '/>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t2, ["", "name", "attr", "", "value", "attr", "", "value", "attr", "", "value", "attr", "", "value"]);
        g.use().attr({
            stroke: "#333",
            strokeWidth: 5,
            y: 2,
            filter: g.filter(Snap.filter.blur(2))
        }).insertBefore(g);
    },
    function () {
        var g = this,
            t = g.text(400, 300, "Groups").attr({
                "class": "title",
                fill: "#fff"
            }),
            gg = g.g(),
            g2 = g.g();
        gg.circle(-20, 0, 50).attr({
            fill: colors.red
        });
        gg.circle(20, 0, 50).attr({
            fill: colors.blue
        });
        g2.circle(-20, 0, 50).attr({
            fill: colors.red
        });
        g2.circle(20, 0, 50).attr({
            fill: colors.blue
        });
        gg.transform("t300,400");
        g2.transform("t500,400");
        eve.once("click.1", function () {
            gg.animate({
                opacity: .5,
                transform: "t300,285"
            }, 2000);
            g2.animate({
                transform: "t500,285"
            }, 2000);
            g2.selectAll("circle").forEach(function (el) {
                el.animate({opacity: .5}, 2000);
            });
        });
    },
    function () {
        var g = this.g();
        var t1 = g.text(20, 300, ['<', 'g ', 'fill', '=', '"blue"', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value"]);
        var t2 = g.text(20, 330, ['    <', 'circle ', 'r', '=', '"10"', ' fill', '=', '"red"', '/>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t2, ["", "name", "attr", "", "value", "attr", "", "value"]);
        var t3 = g.text(20, 360, ['    <', 'circle ', 'r', '=', '"5"', '/>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t3, ["", "name", "attr", "", "value"]);
        var t4 = g.text(20, 390, ['</', 'g', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t4, ["", "name"]);
        g.use().attr({
            stroke: "#333",
            strokeWidth: 5,
            y: 2,
            filter: g.filter(Snap.filter.blur(2))
        }).insertBefore(g);
    },
    function () {
        var g = this,
            t = g.text(400, 300, "Patterns").addClass("title").attr({
                fill: color
            }),
            pt1 = g.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
                fill: "none",
                stroke: "#FF4136",
                strokeWidth: 4
            }).pattern(0, 0, 10, 10),
            pt2 = g.g(g.circle(0, 0, 3), g.circle(0, 10, 3), g.circle(10, 0, 3), g.circle(10, 10, 3), g.circle(5, 5, 3)).attr({fill: "#2ECC40"}).pattern(0, 0, 10, 10),
            pt3 = g.g(g.circle(0, 0, 5), g.circle(10, 10, 5)).attr({fill: "none", stroke: "#7FDBFF", strokeWidth: 2}).pattern(0, 0, 10, 10),
            c1 = g.circle(-200, 280, 200).attr({
                mask: g.g(g.rect(0, 0, 1e4, 1e4).attr({fill: "#fff"}), t.use().attr({stroke: "#000", strokeWidth: 10})),
                fill: pt1
            }),
            c2 = g.circle(-200, 280, 200).attr({
                mask: g.g(g.rect(0, 0, 1e4, 1e4).attr({fill: "#fff"}), t.use().attr({stroke: "#000", strokeWidth: 10})),
                fill: pt2
            });
            c3 = g.circle(-200, 280, 200).attr({
                mask: g.g(g.rect(0, 0, 1e4, 1e4).attr({fill: "#fff"}), t.use().attr({stroke: "#000", strokeWidth: 10})),
                fill: pt3
            });
            eve.once("click.1", function () {
                c1.animate({cx: 500}, 3000, mina.elastic);
                setTimeout(function () {
                    c2.animate({cx: 400}, 3000, mina.elastic);
                }, 500);
                setTimeout(function () {
                    c3.animate({cx: 300}, 3000, mina.elastic);
                }, 1000);
            });
            eve.once("click.2", function () {
                pt1.select("path").animate({
                    strokeWidth: 1
                }, 1000);
            });
            eve.once("click.3", function () {
                pt2.select("g").animate({
                    transform: "s1.5,1.5,5,5"
                }, 1000);
            });
            eve.once("click.4", function () {
                pt3.select("g").animate({
                    transform: "r90,5,5"
                }, 1000);
            });
        return pur;
    },
    function () {
        var g = this.g();
        var t1 = g.text(20, 300, ['<', 'pattern ', 'x', '=', '"0"', ' y', '=', '"0"', ' width', '=', '"10"', ' height', '=', '"10"', ' patternUnits', '=', '"userSpaceOnUse"']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value", "attr", "", "value", "attr", "", "value", "attr", "", "value", "attr", "", "value"]);
        t1 = g.text(20, 330, ['    id', '=', '"dash-ptrn"', ' viewBox', '=', '"0 0 10 10"', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["attr", "", "value", "attr", "", "value"]);
        t1 = g.text(20, 360, ['    <', 'path ', 'd', '=', '"M10-5-10,15M15,0,0,15M0-5-20,15"', ' fill', '=', '"none" ', 'stroke', '=', '"#fcc"', '/>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value", "attr", "", "value", "attr", "", "value"]);
        t1 = g.text(20, 390, ['</', 'pattern', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name"]);
        g.use().attr({
            stroke: "#333",
            strokeWidth: 5,
            y: 2,
            filter: g.filter(Snap.filter.blur(2))
        }).insertBefore(g);
    },
    function () {
        var g = this;
        var r = g.rect(-70, 210, 800, 140, 30, 70);
        var p2 = g.path("M30,210c16.566,0,30,31.346,30,70 0,38.654,-13.434,70,-30,70").attr({
            fill: "none",
            stroke: "#FF4136",
            strokeWidth: 5,
            transform: "t-70,0"
        });
        g.text(400, 300, "Masking & Clipping").addClass("title").attr({
            fill: color,
            opacity: .5,
            filter: g.filter(Snap.filter.blur(4)),
            mask: g.g(g.rect(0, 0, "100%", "100%").attr({fill: "#fff"}), r.use())
        });
        g.text(400, 300, "Masking & Clipping").addClass("title").attr({
            fill: color,
            mask: r.use().attr({fill: "#fff"})
        });
        var p1 = g.path("M30,210c-16.566,0-30,31.346-30,70 0,38.654,13.434,70,30,70").attr({
            fill: "none",
            stroke: "#FF4136",
            strokeWidth: 5,
            transform: "t-70,0"
        });
        p1.animate({transform: "t1000,0"}, 10000);
        p2.animate({transform: "t1000,0"}, 10000);
        r.toDefs().animate({x: 1000}, 10000);
        return pur;
    },
    function () {
        var g = this,
            t = g.text(400, 300, "Combining Pattern & Mask").attr({
                "class": "title"
            }),
            bb = t.getBBox(),
            p = g.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
                fill: "none",
                stroke: "#fff",
                strokeWidth: 8
            }),
            r = g.rect(0, 0, "100%", "100%").attr({
                fill: p.pattern(0, 0, 10, 10)
            }),
            p2 = g.path("M-5,0,10,15M0-5,15,10").attr({
                fill: "none",
                stroke: colors.red,
                strokeWidth: 3
            }),
            mask = g.mask();
            mask.add(g.rect(0, 0, "100%", "100%").attr({fill: "#fff"}));
            mask.add(t.use().attr({
                    stroke: "#000",
                    strokeWidth: 11
                }));
            var r2 = g.rect(bb.x - 20, bb.y - 20, bb.w + 40, bb.h + 40, 10).attr({
                fill: p2.pattern(0, 0, 10, 10),
                filter: g.filter(Snap.filter.blur(2)),
                mask: mask
            });
        t.use().attr({
            fill: color,
            mask: r
        });
        t.toDefs();
        eve.once("click.1", function () {
            p.animate({
                strokeWidth: 0
            }, 3000, function () {
                mask.select("use").animate({
                    strokeWidth: 0
                }, 1000);
                p2.animate({stroke: "#fff"}, 1000);
            });
        });
    },
    function () {
        var g = this;
        var p = g.path("M186.6,300h106.65h106.65h106.65h106.65").attr({
            fill: "none",
            stroke: "#FF851B",
            strokeDasharray: "426.6 1200",
            strokeLinecap: "round",
            strokeWidth: 10
        });
        var t = g.text(0, 300, ["T","ext on the Path"]).attr({
            "class": "title",
            fill: "#fff",
            textAnchor: "start",
            textpath: p
        });
        t.select("tspan:nth-child(2)").attr({dx: -5});
        eve.once("click.1", function () {
            p.animate({d: "M186.6,300c0-55 45-100 100-100 55,0 100,45 100,100 0,55 45,100 100,100 55,0 100-45 100-100c0-55 45-100 100-100 55,0 100,45 100,100 0,55 45,100 100,100 55,0 100-45 100-100c0-55 45-100 100-100 55,0 100,45 100,100 0,55 45,100 100,100 55,0 100-45 100-100"}, 1000, mina.elastic);
        });
        eve.once("click.2", function () {
            t.textPath.animate({startOffset: 1200}, 5000);
            p.animate({strokeDashoffset: -1200}, 5000);
        });
        return grey;
    },
    function () {
        var g = this.g();
        var t1 = g.text(20, 300, ['<', 'text ', 'fill', '=', '"#fff"', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value", ""]);
        t1 = g.text(20, 330, ['    <', 'textPath', ' xlink:href', '=', '"#path-id"', '>Text on the Path</', 'textPath', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name", "attr", "", "value", "", "name"]);
        t1 = g.text(20, 360, ['</', 'text', '>']).addClass("code").attr({textAnchor: "start"});
        spreadClasses(t1, ["", "name"]);
        g.use().attr({
            stroke: "#333",
            strokeWidth: 5,
            y: 2,
            filter: g.filter(Snap.filter.blur(2))
        }).insertBefore(g);
    },
    function () {
        var g = this,
            c = g.rect(300, 200, 200, 200).attr({
                fill: "none",
                stroke: "#fff",
                strokeWidth: 5
            }),
            pt2 = g.g(g.rect(0,0,10,10).attr({fill: "#fff"}),g.circle(0, 0, 0), g.circle(0, 10, 0), g.circle(10, 0, 0), g.circle(10, 10, 0), g.circle(5, 5, 0)).attr({fill: "#FF4136"}).pattern(0, 0, 10, 10),
            t = g.g().attr({
                font: "57.5px Helvetica",
                fill: pt2,
                textAnchor: "start"
            });
        t.text(310, 255, "CSS");
        t.text(310, 320, "IS");
        t.text(310, 385, "AWESOME");
        eve.once("click.1", function () {
            pt2.selectAll("circle").forEach(function (el) {
                el.animate({
                    r: 5
                }, 3000);
            });
            setTimeout(function () {
                pt2.select("rect").attr({
                    fill: "#FF4136"
                });
                pt2.selectAll("circle").attr({
                    r: 0,
                    fill: "#fff"
                });
                pt2.selectAll("circle").forEach(function (el) {
                    el.animate({
                        r: 5
                    }, 3000);
                });
            }, 3000);
        });
        return pur;
    },
    function () {
        var g = this,
            t = g.text(400, 300, "Nested SVG").attr({
                "class": "title",
                fill: "#fff"
            });
    },
    function () {
        var g = this;
        Snap.load("weather.svg", function (f) {
            var svg = f.select("svg"),
                gr = svg.select("g");
            g.add(svg);
            g.add(gr.use().attr({
                x: 380,
                y: 400
            }));
            g.rect(380, 400, 40, 40).attr({
                fill: "none",
                stroke: "#fff",
                strokeDasharray: "2 2"
            });
            gr.attr({
                fill: "#fff"
            });
            svg.attr({
                x: 380,
                y: 280
            });
            eve.once("click.1", function () {
                svg.animate({
                    x: 300,
                    y: 200,
                    width: 200,
                    height: 200
                }, 1000, mina.elastic);
            });
            eve.once("click.2", function () {
                gr.animate({
                    transform: "t-37,0"
                }, 1000);
            });
            eve.once("click.3", function () {
                gr.animate({
                    transform: "t-74,0"
                }, 1000);
            });
        });
        return pur;
    },
    function () {
        var g = this,
            t1 = g.text(188, 300, "Transfor").attr({
                "class": "title",
                fill: color,
                textAnchor: "start",
                transform: "r-30,400,300s.5"
            }),
            t2 = g.text(403.6, 300, "mations").attr({
                "class": "title",
                fill: color,
                textAnchor: "start",
                transform: "r30,400,300s-2,2"
            });
        eve.once("click.1", function () {
            t1.animate({
                transform: ""
            }, 700, mina.easeout);
            t2.animate({
                transform: ""
            }, 700, mina.easeout);
        });
    },
    function () {
        var g = this,
            l = g.g(),
            l1 = l.g();
        l1.circle(0, 0, 20);
        l1.rect(-10, 0, 20, 100);
        var l2 = l1.g();
        l2.circle(0, 100, 20);
        l2.rect(-10, 100, 20, 100);
        l2.path("M-20,199l20,30 20-30z");
        l.attr({
            transform: "t400,300"
        });
        l.use().attr({
            stroke: colors.white,
            strokeWidth: 10,
            mask: g.g(
                g.rect(0, 0, "100%", "100%").attr({fill: "#fff"}),
                l.use()
            )
        });
        l.toDefs();
        var s1 = g.g();
        s1.rect(-100, -2, 200, 4, 2);
        var c1 = s1.circle(0, 0, 10).attr({fill: colors.gray}),
            deg1 = 0,
            scale = c1.transform().globalMatrix.x(600, 200),
            deg1x;
        s1.rect(-110, -10, 220, 20).attr({
            opacity: 0
        }).drag(function (dx, dy, x) {
            deg1x = x - scale;
            c1.attr({
                cx: deg1x
            });
            deg1 = -deg1x * 1.8;
            l1.transform("r" + deg1 + ",0,0");
        });
        s1.attr({
            transform: "t600,100"
        });

        var s2 = g.g();
        s2.rect(-100, -2, 200, 4, 2);
        var c2 = s2.circle(0, 0, 10).attr({fill: colors.gray}),
            deg2 = 0,
            scale2 = c2.transform().globalMatrix.x(600, 200),
            deg2x;
        s2.rect(-110, -10, 220, 20).attr({
            opacity: 0
        }).drag(function (dx, dy, x) {
            deg2x = x - scale2;
            c2.attr({
                cx: deg2x
            });
            deg2 = -deg2x * 180 / 100;
            l2.transform("r" + deg2 + ",0,100");
        });
        s2.attr({
            transform: "t600,150"
        });
    },
    function () {
        var g = this,
            lee = g.image("lee.jpg", 40, 90, 720, 419).toDefs(),
            c = g.circle(400, 300, 200);
        eve.once("click.1", function () {
            c.attr({
                mask: lee
            });
        });
        eve.once("click.2", function () {
            c.attr({
                filter: g.filter(Snap.filter.invert(1))
            });
        });
    },
    function () {
        this.text(400, 200, "Thank You").attr({
            "class": "title",
            fill: color
        });
        return red;
    },
    function () {
        this.text(400, 200, "baranovs@adobe.com").attr({
            "class": "title",
            fontWeight: 100,
            fill: color
        });
        this.text(400, 280, "@dmitrybaranovsk").attr({
            "class": "title",
            fontWeight: 100,
            fill: color
        });
        return grey;
    }

];
// open -a Google\ Chrome --args --disable-web-security
// python -m SimpleHTTPServer 8080
