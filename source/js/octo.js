function instanceOf(A, B) {
    return
}
/**
 * @param {*} name 
 * @param {id or callback} arg 
 */
function addEle(name, arg) {
    const oDiv = document.createElement(name || 'div')
    typeof arg === "string" && (oDiv.id = arg);
    typeof arguments[arguments.length - 1] === "function" && arguments[arguments.length - 1](oDiv);
    document.body.appendChild(oDiv)
    return oDiv
}

function getNav() {
    var mainNav = $('ul.main-navigation, ul[role=main-navigation]').before('<fieldset class="mobile-nav">')
    var mobileNav = $('fieldset.mobile-nav').append('<select>');
    mobileNav.find('select').append('<option value="">Navigate&hellip;</option>');
    var addOption = function (i, option) {
        mobileNav.find('select').append('<option value="' + this.href + '">&raquo; ' + $(this).text() + '</option>');
    }
    mainNav.find('a').each(addOption);
    $('ul.subscription a').each(addOption);
    mobileNav.find('select').bind('change', function (event) {
        if (event.target.value) { window.location.href = event.target.value; }
    });
}

function addSidebarToggler() {
    if (!$('body').hasClass('sidebar-footer')) {
        $('#content').append('<span class="toggle-sidebar"></span>');
        $('.toggle-sidebar').bind('click', function (e) {
            e.preventDefault();
            if ($('body').hasClass('collapse-sidebar')) {
                $('body').removeClass('collapse-sidebar');
            } else {
                $('body').addClass('collapse-sidebar');
            }
        });
    }
    var sections = $('aside.sidebar > section');
    if (sections.length > 1) {
        sections.each(function (index, section) {
            if ((sections.length >= 3) && index % 3 === 0) {
                $(section).addClass("first");
            }
            var count = ((index + 1) % 2) ? "odd" : "even";
            $(section).addClass(count);
        });
    }
    if (sections.length >= 3) { $('aside.sidebar').addClass('thirds'); }
}

function testFeatures() {
    var features = ['maskImage'];
    $(features).map(function (i, feature) {
        if (Modernizr.testAllProps(feature)) {
            $('html').addClass(feature);
        } else {
            $('html').addClass('no-' + feature);
        }
    });
    if ("placeholder" in document.createElement("input")) {
        $('html').addClass('placeholder');
    } else {
        $('html').addClass('no-placeholder');
    }
}

function addCodeLineNumbers() {
    if (navigator.appName === 'Microsoft Internet Explorer') { return; }
    $('div.gist-highlight').each(function (code) {
        var tableStart = '<table><tbody><tr><td class="gutter">',
            lineNumbers = '<pre class="line-numbers">',
            tableMiddle = '</pre></td><td class="code">',
            tableEnd = '</td></tr></tbody></table>',
            count = $('.line', code).length;
        for (var i = 1; i <= count; i++) {
            lineNumbers += '<span class="line-number">' + i + '</span>\n';
        }
        var table = tableStart + lineNumbers + tableMiddle + '<pre>' + $('pre', code).html() + '</pre>' + tableEnd;
        $(code).html(table);
    });
}

function flashVideoFallback() {
    var flashplayerlocation = "/assets/jwplayer/player.swf",
        flashplayerskin = "/assets/jwplayer/glow/glow.xml";
    $('video').each(function (i, video) {
        video = $(video);
        if (!Modernizr.video.h264 && swfobject.getFlashPlayerVersion() || window.location.hash.indexOf("flash-test") !== -1) {
            video.children('source[src$=mp4]').first().map(i, function (source) {
                var src = $(source).attr('src'),
                    id = 'video_' + Math.round(1 + Math.random() * (100000)),
                    width = video.attr('width'),
                    height = parseInt(video.attr('height'), 10) + 30;
                video.after('<div class="flash-video"><div><div id=' + id + '>');
                swfobject.embedSWF(flashplayerlocation, id, width, height + 30, "9.0.0",
                    { file: src, image: video.attr('poster'), skin: flashplayerskin },
                    { movie: src, wmode: "opaque", allowfullscreen: "true" }
                );
            });
            video.remove();
        }
    });
}

function wrapFlashVideos() {
    $('object').each(function (i, object) {
        if ($(object).find('param[name=movie]').length) {
            $(object).wrap('<div class="flash-video">')
        }
    });
    $('iframe[src*=vimeo],iframe[src*=youtube]').wrap('<div class="flash-video">')
}

function renderDeliciousLinks(items) {
    var output = "<ul>";
    for (var i = 0, l = items.length; i < l; i++) {
        output += '<li><a href="' + items[i].u + '" title="Tags: ' + (items[i].t == "" ? "" : items[i].t.join(', ')) + '">' + items[i].d + '</a></li>';
    }
    output += "</ul>";
    $('#delicious').html(output);
}

function typedInit() {
    var typed = new Typed('header[role="banner"] h2', {
        // strings: ["&nbsp;Eternity is not adistance but adecision.&nbsp;", "&nbsp;Eternity is not adistance but adecision.&nbsp;"],//输入内容, 支持html标签
        // strings: ["&nbsp;Change the world at your fingertips.&nbsp;", "&nbsp;指尖跳动改变世界.&nbsp;"],//输入内容, 支持html标签
        strings: ["&nbsp;Fingertips beat and leave footprints.&nbsp;", "&nbsp;指尖跳动留下足迹.&nbsp;"],//输入内容, 支持html标签
        typeSpeed: 100, //打字速度
        backSpeed: 50, //回退速度
        loop: true, //是否循环
        loopCount: Infinity,
        showCursor: false //是否开启光标
    });
    return typed;
}

function L2DwidgetInit(conf) {
    let { name: modelPath } = Object.assign({}, conf)
    let { name: modelName } = Object.assign({}, conf)
    L2Dwidget.init({
        name: {
            div: conf.nameDiv || 'cxvh',
            canvas: conf.nameCanvas || 'cxvhCanvas'
        },
        model: {
            scale: conf.modelScale || 1,
            jsonPath: `/live2dw/packages/live2d-widget-model-${modelPath.replace('01', '/01/').replace('02', '/02/')}/assets/${modelName}.model.json`
        },
        display: {
            superSample: conf.displaySuperSample || 2,
            width: conf.displayWidth || 300,
            height: conf.displayHeight || 600,
            position: conf.displayPosition || "right",
            hOffset: conf.displayHOffset || -30,
            vOffset: conf.displayVOffset || -50
        },
        mobile: {
            show: conf.mobileShow || false,
            scale: conf.mobileScale || .1
        },
        react: {
            opacityDefault: conf.reactOpacityDefault || .7,
            opacityOnHover: conf.reactOpacityOnHover || .2
        },
        dialog: {
            enable: conf.dialogEnable || true
        },
        log: conf.log || true,
        tagMode: conf.tagMode || true
    })
}
function aPlayerInit() {
    const qqmusicInit = (list, picArr) => {
        $('#musicPlayer').fadeIn();
        const players = new QMplayer({ target: "web" });
        let flag = false;
        let nextFlag = false;
        let playerIndex = 0;
        $('[music-play]').on('click', function () {
            if (flag) return;
            flag = true;
            if (playerIndex === 0) {
                players.play(list);
            } else {
                players.toggle();
            }
            setTimeout(() => flag = false, 300);
        });
        $('[music-next]').on('click', function () {
            if (nextFlag) return;
            nextFlag = true;
            if (playerIndex === 0) {
                $('[music-play]').click();
            }
            playerIndex++;
            players.playNext();
            setTimeout(() => nextFlag = false, 300);
        })
        const rotateTimer = (timerIndex) => {
            if (playerIndex !== timerIndex) return;
            let rotate = +($('#circleImg').attr('rotate') || 0)
            rotate += 1;
            if (rotate === 360) { rotate = 0 }
            $('#circleImg').attr('rotate', rotate);
            $('#circleImg').css('transform', 'rotate(' + rotate + 'deg)')
            setTimeout(function () {
                rotateTimer(timerIndex);
            }, 10)
        };
        players.on("play", function (e) {
            // console.log('play：', e)
            // console.log('e', e.index)
            document.getElementById('circleImg').style.backgroundImage = `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${picArr[e.index]}.jpg?max_age=2592000)`
            playerIndex > 1000 && (playerIndex = 1), rotateTimer(playerIndex);
            $('#musicPlayer').addClass('music-player-on');
        })
        players.on("pause", function (e) {
            // console.log('pause', e)
            playerIndex++;
            $('#musicPlayer').removeClass('music-player-on');
        })
        players.on("ended", function (e) {
            // console.log('ended', e)
            playerIndex++;
            $('#musicPlayer').removeClass('music-player-on');
        })
        players.on("timeupdate", function (e) {
            // playerIndex++;
            // console.log('timeupdate', e)
        })
        players.on("waiting", function (e) {
            playerIndex++;
            $('#musicPlayer').removeClass('music-player-on');
            // console.log('waiting', e)
        })
        players.on("error", function (e) {
            // console.log('error', e.message)
            playerIndex++;
            $('[music-next]').click();
            $('#musicPlayer').removeClass('music-player-on');
        })
    }
    $.ajax({
        url: '/getMusiclist',
        dataType: "json",
        success: function (data) {
            const list = data.songlist;
            const albummid = [], musicList = list.reduce((o, i) => {
                // const item = {
                //     name: i.data.songname,
                //     artist: i.data.singer[0].name,
                //     songid: i.data.songid
                // };
                albummid.push(i.data.albummid);
                return [...o, i.data.songid]
            }, []);
            qqmusicInit(musicList, albummid)
        }, error: function (err) {
            console.log('err', '请求歌曲列表失败，3秒后将重试！');
            setTimeout(function () {
                aPlayerInit();
            }, 3000)
        }
    });
    // players.play();
    // var ap = new APlayer({
    //     container: document.getElementById('aplayer'),
    //     fixed: !0,
    //     order: 'random',
    //     listFolded: false,
    //     listMaxHeight: '197px',
    //     lrcType: 3,
    //     mutex: true,
    //     audio: (function () {
    //         return [
    //         {
    //             name: '夜空中最亮的星',
    //             artist: '逃跑计划',
    //             url: 'https://cdn.cxvh.com/media/audio/%E5%A4%9C%E7%A9%BA%E4%B8%AD%E6%9C%80%E4%BA%AE%E7%9A%84%E6%98%9F/music.mp3',
    //             cover: 'https://cdn.cxvh.com/media/audio/%E5%A4%9C%E7%A9%BA%E4%B8%AD%E6%9C%80%E4%BA%AE%E7%9A%84%E6%98%9F/cover.jpg',
    //             lrc: 'https://cdn.cxvh.com/media/audio/%E5%A4%9C%E7%A9%BA%E4%B8%AD%E6%9C%80%E4%BA%AE%E7%9A%84%E6%98%9F/music.lrc',
    //         }
    //         ].sort(function () {
    //             return parseInt(Math.random() * 10) % 2 ? 1 : -1
    //         }).sort(function () {
    //             return parseInt(Math.random() * 10) >= 5 ? 1 : -1
    //         }).sort(function () {
    //             return parseInt(Math.random() * 10) < 5 ? 1 : -1
    //         })
    //     })()
    // });
}
function viewerInit() {
    if (document.getElementById('hbePass') === null) {
        $('[role="article"]').viewer();
    } else {
        setTimeout(function () {
            viewerInit()
        }, 50)
    }
}
function getUserIp() {
    $.get('https://api.ipify.org/?format=json', function (res) {
        document.getElementById('userIp').innerText = res.ip
    })
}
function runtime() {
    document.getElementById('runtime').innerText = parseInt((Date.now() - new Date('2020/12/04 06:00:00')) / 24 / 60 / 60 / 1000) + "天"
}
function bgAnimate() {
    let index = 0;
    // const maxTop = parseInt(window.getComputedStyle(document.querySelector('#main'), ':after').paddingTop) << 1
    const maxLeft = parseInt(window.getComputedStyle(document.querySelector('#main'), ':after').paddingLeft) << 1
    // 创建标签
    const bgAnimate = addEle('style', function (o) {
        // o.innerHTML = `div#main::after{left:-${maxLeft >> 1}px}`
    });
    document.onmousemove = function (e) {
        const winw = window.innerWidth //, winh = window.innerHeight;
        let //top = document.documentElement.scrollTop - e.pageY,
            left = document.documentElement.scrollLeft - e.pageX;
        // top = (top / winh).toFixed(2) * maxTop
        left = (left / winw).toFixed(2) * maxLeft
        // top > 0 && (top = 0)
        // top < -maxTop && (top = -maxTop)
        left > 0 && (left = 0)
        left < -maxLeft && (left = -maxLeft)
        bgAnimate.innerHTML = `div#main::after{left:${left.toFixed(2)}px;}`
    }
    document.documentElement.onmouseleave = function () {
        // bgAnimate.innerHTML = `div#main::after{height:${window.innerHeight}px;top:-${maxTop >> 1}px;left:-${maxLeft >> 1}px}`
        bgAnimate.innerHTML = `div#main::after{left:-${maxLeft >> 1}px}`
    }
    $(window).on("resize",function () {
        if (!index) {
            index++
            return
        }
        bgAnimate.innerHTML = `div#main::after{height:${window.innerHeight}px;left:-${maxLeft >> 1}px}`
    });
}
$('document').ready(function () {
    // bgAnimate();
    aPlayerInit();
    testFeatures();
    wrapFlashVideos();
    flashVideoFallback();
    addCodeLineNumbers();
    getNav();
    addSidebarToggler();
    typedInit();
    L2DwidgetInit({ name: "tororo" });
    viewerInit();
    getUserIp();
    runtime();
});

// iOS scaling bug fix
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function (doc) {
    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }
    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [0.25, 1.6];
        doc[addEvent](type, fix, true);
    }
}(document));

// Periodically wipe comment ads
window.setInterval(() => {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    iframes.forEach(iframe => {
        if (iframe.src.match(/(ads-iframe)|(disqusads)/g)) {
            iframe.classList.add('ad-unit');
        }
    });

}, 500);

/*!	SWFObject v2.2 modified by Brandon Mathis to contain only what is necessary to dynamically embed flash objects
 * Uncompressed source in javascripts/libs/swfobject-dynamic.js
 * <http://code.google.com/p/swfobject/>
 released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject = function () {
    function s(a, b, d) {
        var q, k = n(d); if (g.wk && g.wk < 312) return q; if (k) {
            if (typeof a.id == l) a.id = d; if (g.ie && g.win) {
                var e = "", c; for (c in a) if (a[c] != Object.prototype[c]) c.toLowerCase() == "data" ? b.movie = a[c] : c.toLowerCase() == "styleclass" ? e += ' class="' + a[c] + '"' : c.toLowerCase() != "classid" && (e += " " + c + '="' + a[c] + '"'); c = ""; for (var f in b) b[f] != Object.prototype[f] && (c += '<param name="' + f + '" value="' + b[f] + '" />'); k.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + e + ">" + c +
                    "</object>"; q = n(a.id)
            } else { f = i.createElement(o); f.setAttribute("type", m); for (var h in a) a[h] != Object.prototype[h] && (h.toLowerCase() == "styleclass" ? f.setAttribute("class", a[h]) : h.toLowerCase() != "classid" && f.setAttribute(h, a[h])); for (e in b) b[e] != Object.prototype[e] && e.toLowerCase() != "movie" && (a = f, c = e, h = b[e], d = i.createElement("param"), d.setAttribute("name", c), d.setAttribute("value", h), a.appendChild(d)); k.parentNode.replaceChild(f, k); q = f }
        } return q
    } function n(a) { var b = null; try { b = i.getElementById(a) } catch (d) { } return b }
    function t(a) { var b = g.pv, a = a.split("."); a[0] = parseInt(a[0], 10); a[1] = parseInt(a[1], 10) || 0; a[2] = parseInt(a[2], 10) || 0; return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1 } function u(a) { return /[\\\"<>\.;]/.exec(a) != null && typeof encodeURIComponent != l ? encodeURIComponent(a) : a } var l = "undefined", o = "object", m = "application/x-shockwave-flash", v = window, i = document, j = navigator, g = function () {
        var a = typeof i.getElementById != l && typeof i.getElementsByTagName != l && typeof i.createElement != l,
            b = j.userAgent.toLowerCase(), d = j.platform.toLowerCase(), g = d ? /win/.test(d) : /win/.test(b), d = d ? /mac/.test(d) : /mac/.test(b), b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, k = !+"\u000b1", e = [0, 0, 0], c = null; if (typeof j.plugins != l && typeof j.plugins["Shockwave Flash"] == o) {
                if ((c = j.plugins["Shockwave Flash"].description) && !(typeof j.mimeTypes != l && j.mimeTypes[m] && !j.mimeTypes[m].enabledPlugin)) k = !1, c = c.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), e[0] = parseInt(c.replace(/^(.*)\..*$/, "$1"),
                    10), e[1] = parseInt(c.replace(/^.*\.(.*)\s.*$/, "$1"), 10), e[2] = /[a-zA-Z]/.test(c) ? parseInt(c.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            } else if (typeof v.ActiveXObject != l) try { var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); if (f && (c = f.GetVariable("$version"))) k = !0, c = c.split(" ")[1].split(","), e = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)] } catch (h) { } return { w3: a, pv: e, wk: b, ie: k, win: g, mac: d }
    }(); return {
        embedSWF: function (a, b, d, i, k, e, c, f, h) {
            var j = { success: !1, id: b }; if (g.w3 && !(g.wk && g.wk < 312) &&
                a && b && d && i && k) { d += ""; i += ""; var p = {}; if (f && typeof f === o) for (var m in f) p[m] = f[m]; p.data = a; p.width = d; p.height = i; a = {}; if (c && typeof c === o) for (var n in c) a[n] = c[n]; if (e && typeof e === o) for (var r in e) typeof a.flashvars != l ? a.flashvars += "&" + r + "=" + e[r] : a.flashvars = r + "=" + e[r]; if (t(k)) b = s(p, a, b), j.success = !0, j.ref = b } h && h(j)
        }, ua: g, getFlashPlayerVersion: function () { return { major: g.pv[0], minor: g.pv[1], release: g.pv[2] } }, hasFlashPlayerVersion: t, createSWF: function (a, b, d) { if (g.w3) return s(a, b, d) }, getQueryParamValue: function (a) {
            var b =
                i.location.search || i.location.hash; if (b) { /\?/.test(b) && (b = b.split("?")[1]); if (a == null) return u(b); for (var b = b.split("&"), d = 0; d < b.length; d++)if (b[d].substring(0, b[d].indexOf("=")) == a) return u(b[d].substring(b[d].indexOf("=") + 1)) } return ""
        }
    }
}();

