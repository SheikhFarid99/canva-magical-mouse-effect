"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./magic.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function Magic(_ref) {
  var options = _ref.options,
    children = _ref.children;
  var _ref2 = options || {},
    iconText = _ref2.iconText,
    iconFontSizes = _ref2.iconFontSizes,
    background = _ref2.background,
    boxShadow = _ref2.boxShadow,
    starColors = _ref2.starColors,
    removeStarTime = _ref2.removeStarTime;
  (0, _react.useEffect)(function () {
    var magic = document.getElementById('canva-magic-mousee-effec');
    var start = new Date().getTime();
    var originPosition = {
      x: 0,
      y: 0
    };
    var last = {
      starTimestamp: start,
      starPosition: originPosition,
      mousePosition: originPosition
    };
    var config = {
      starAnimationDuration: removeStarTime ? removeStarTime : 1500,
      minimumTimeBetweenStars: 100,
      minimumDistanceBetweenStars: 200,
      glowDuration: 105,
      maximumGlowPointSpacing: 10,
      colors: starColors && starColors.length > 0 ? starColors : ['orange', 'yellow', 'red'],
      sizes: iconFontSizes && iconFontSizes.length > 0 ? iconFontSizes : ['24px', '18px', '14px'],
      animations: ["fall-1", "fall-2", "fall-3"]
    };
    var count = 0;
    var rand = function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      selectRandom = function selectRandom(items) {
        return items[rand(0, items.length - 1)];
      };
    var withUnit = function withUnit(value, unit) {
        return "".concat(value).concat(unit);
      },
      px = function px(value) {
        return withUnit(value, "px");
      },
      ms = function ms(value) {
        return withUnit(value, "ms");
      };
    var calcDistance = function calcDistance(a, b) {
      var diffX = b.x - a.x,
        diffY = b.y - a.y;
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    };
    var calcElapsedTime = function calcElapsedTime(start, end) {
      return end - start;
    };
    var appendElement = function appendElement(element) {
        return magic.appendChild(element);
      },
      removeElement = function removeElement(element, delay) {
        return setTimeout(function () {
          return magic.removeChild(element);
        }, delay);
      };
    var createStar = function createStar(position) {
      var star = document.createElement("span");
      var color = selectRandom(config.colors);
      star.textContent = iconText ? iconText : '★';
      star.className = "star";
      star.style.left = px(position.x);
      star.style.top = px(position.y);
      star.style.fontSize = selectRandom(config.sizes);
      star.style.color = "".concat(color);
      star.style.textShadow = "0px 0px 1rem ".concat(color);
      star.style.animationName = config.animations[count++ % 3];
      star.style.starAnimationDuration = ms(config.starAnimationDuration);
      appendElement(star);
      removeElement(star, config.starAnimationDuration);
    };
    var createGlowPoint = function createGlowPoint(position) {
      var glow = document.createElement("div");
      glow.style.boxShadow = boxShadow ? boxShadow : boxShadow;
      glow.style.position = 'absolute';
      glow.style.pointerEvents = 'none';
      glow.style.left = px(position.x);
      glow.style.top = px(position.y);
      appendElement(glow);
      removeElement(glow, config.glowDuration);
    };
    var determinePointQuantity = function determinePointQuantity(distance) {
      return Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);
    };
    var createGlow = function createGlow(last, current) {
      var distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);
      var dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
      Array.from(Array(quantity)).forEach(function (_, index) {
        var x = last.x + dx * index,
          y = last.y + dy * index;
        createGlowPoint({
          x: x,
          y: y
        });
      });
    };
    var updateLastStar = function updateLastStar(position) {
      last.starTimestamp = new Date().getTime();
      last.starPosition = position;
    };
    var updateLastMousePosition = function updateLastMousePosition(position) {
      return last.mousePosition = position;
    };
    var adjustLastMousePosition = function adjustLastMousePosition(position) {
      if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
      }
    };
    var handleOnMove = function handleOnMove(e) {
      var mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      adjustLastMousePosition(mousePosition);
      var now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
      if (hasMovedFarEnough || hasBeenLongEnough) {
        createStar(mousePosition);
        updateLastStar(mousePosition);
      }
      createGlow(last.mousePosition, mousePosition);
      updateLastMousePosition(mousePosition);
    };
    magic.onmousemove = function (e) {
      return handleOnMove(e);
    };
    magic.ontouchmove = function (e) {
      return handleOnMove(e.touches[0]);
    };
    document.body.onmouseleave = function () {
      return updateLastMousePosition(originPosition);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: "100%",
      width: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      background: background ? background : "linear-gradient(145deg, #FF597B, rgb(58, 18, 153))",
      height: "100%",
      overflow: "hidden",
      width: '100%'
    },
    id: "canva-magic-mousee-effec"
  }, children ? children : ''));
}
var _default = exports["default"] = Magic;