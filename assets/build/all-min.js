
function _classCallCheck(e, a) {
    if (!(e instanceof a))
        throw new TypeError("Cannot call a class as a function")
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}),
let exports.default = void 0;
var Config = function e() {
    _classCallCheck(this, e),
    this.gameDimension,
    this.reelsymbols = ["finn", "symbol_9", "symbol_10", "symbol_j", "symbol_q", "symbol_k", "symbol_a", "jake"]
};

function _defineProperties(e, a) {
    for (var o = 0; o < a.length; o++) {
        var t = a[o];
        t.enumerable = t.enumerable || !1,
        t.configurable = !0,
        "value"in t && (t.writable = !0),
        Object.defineProperty(e, t.key, t)
    }
}
function _createClass(e, a, o) {
    return a && _defineProperties(e.prototype, a),
    o && _defineProperties(e, o),
    e
}
exports.default = Config,
Object.defineProperty(exports, "__esModule", {
    value: !0
}),
exports.default = void 0;
var Game = function() {
    function e(a, o) {
        _classCallCheck(this, e),
        this.pixi = a,
        this.assets = o,
        this.slotMachine = null
    }
    return _createClass(e, [{
        key: "onCompletePreload",
        value: function() {
            console.log("Assets Loading Complete 100%")
        }
    }, {
        key: "create",
        value: function() {
            var e = new PIXI.Container;
            this.pixi.stage.addChild(e);
            var a = new PIXI.Sprite(this.assets.loadImg("background"));
            e.addChild(a),
            a.position.set(0, -80);
            var o = new PIXI.Sprite(this.assets.loadImg("wood_bg"));
            e.addChild(o),
            o.position.set(0, 180);
            var t = new PIXI.Sprite(this.assets.loadImg("spin_button"));
            e.addChild(t),
            t.position.set(360, 900),
            t.anchor.set(.5);
            var i = new PIXI.Graphics;
            i.beginFill(328965),
            i.drawRect(0, 1020, 720, 80),
            i.endFill(),
            e.addChild(i);
            var s = new PIXI.Text("BALANCE");
            s.position.set(10, 1030),
            s.style = {
                _fill: "white",
                _align: "center",
                _fontSize: 22,
                _fontWeight: "bold"
            },
            e.addChild(s);
            var n = new PIXI.Text("1,000.000.00");
            n.position.set(10, 1060),
            n.style = {
                _fill: "white",
                _align: "center",
                _fontSize: 26
            },
            e.addChild(n);
            var l = new PIXI.Container;
            e.addChild(l);
            var r = new PIXI.Graphics;
            r.beginFill(328965, .25),
            r.drawRect(10, 210, 700, 540),
            r.endFill(),
            e.addChild(r),
            l.mask = r,
            this.slotMachine = new SlotComponent(this.pixi,l,this.assets),
            this.slotMachine.init();
            var d = new PIXI.Sprite(this.assets.loadImg("logo"));
            e.addChild(d),
            d.anchor.set(.5),
            d.position.set(360, 150),
            t.interactive = !0,
            t.buttonMode = !0,
            t.on("pointerdown", function(e) {
                this.slotMachine.doSpin()
            }, this),
            d.interactive = !0,
            d.buttonMode = !0,
            d.on("pointerdown", function(e) {
                this.slotMachine.doStopSpin()
            }, this)
        }
    }]),
    e
}();
exports.default = Game;
var mygamecanvas = document.getElementById("canvas-app")
  , app = new PIXI.Application({
    width: 720,
    height: 1100,
    backgroundColor: 1087931,
    resolution: .5 * window.devicePixelRatio || 1
});
console.log("test", mygamecanvas),
mygamecanvas.appendChild(app.view);
var AssetsPreload = new InitAssetsPreload(app)
  , PxGame = new InitGame(app,AssetsPreload)
  , a = new InitGame;



AssetsPreload.loader.on("loadComplete", function() {
    PxGame.create()
}),
Object.defineProperty(exports, "__esModule", {
    value: !0
}),
exports.default = void 0;
var Preload = function() {
    function e(a) {
        _classCallCheck(this, e),
        this.img = [],
        this.pixi = a,
        this.loadImg = this.loadImage,
        this.loadSuccess = this.loadComplete,
        this.loader = new PIXI.Container,
        this.createPrelodScene(),
        this.init()
    }
    return _createClass(e, [{
        key: "init",
        value: function() {
            this.pixi.loader.baseUrl = "assets/img",
            this.pixi.loader.add("background", "background.png").add("logo", "logo.png").add("wood_bg", "wood_bg.png").add("finn", "symbols/finn.png").add("jake", "symbols/jake.png").add("symbol_9", "symbols/symbol_9.png").add("symbol_10", "symbols/symbol_10.png").add("symbol_j", "symbols/symbol_j.png").add("symbol_q", "symbols/symbol_q.png").add("symbol_k", "symbols/symbol_k.png").add("symbol_a", "symbols/symbol_a.png").add("icon_gear", "default/icon_gear.png").add("icon_burger", "default/icon_burger.png").add("spin_button", "slot/spin_button.png"),
            this.pixi.loader.onProgress.add(this.showProgress, this),
            this.pixi.loader.onComplete.add(this.loadComplete, this),
            this.pixi.loader.onError.add(this.onError, this),
            this.pixi.loader.load()
        }
    }, {
        key: "createPrelodScene",
        value: function() {
            this.preloadScene = new PIXI.Container,
            this.pixi.stage.addChild(this.preloadScene),
            this.preloadbarbg = new PIXI.Graphics,
            this.preloadbarbg.beginFill(3158064),
            this.preloadbarbg.drawRect(0, 0, 620, 80),
            this.preloadbarbg.endFill(),
            this.preloadbarbg.x = 50,
            this.preloadbarbg.y = 300,
            this.preloadScene.addChild(this.preloadbarbg),
            this.preloadbar = new PIXI.Graphics,
            this.preloadbar.beginFill(16763904),
            this.preloadbar.drawRect(0, 0, 620, 80),
            this.preloadbar.endFill(),
            this.preloadbar.scale.set(0, .5),
            this.preloadbar.x = 50,
            this.preloadbar.y = 300,
            this.preloadScene.addChild(this.preloadbar)
        }
    }, {
        key: "loadImage",
        value: function(e) {
            return this.pixi.loader.resources[e].texture
        }
    }, {
        key: "onError",
        value: function(e) {
            console.log("error", e)
        }
    }, {
        key: "showProgress",
        value: function(e) {
            this.preloadbar.scale.set(.01 * e.progress, 1)
        }
    }, {
        key: "loadComplete",
        value: function() {
            this.preloadScene.destroy(),
            new Event("loadComplete",{
                success: !0
            }),
            this.loader.emit("loadComplete")
        }
    }]),
    e
}();
exports.default = Preload;
