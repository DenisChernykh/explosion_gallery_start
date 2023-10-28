"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  linkClass: '.card'
};
var explosionClassName = 'explosion';
var explosionOpenedClassName = 'explosion_Opened';
var explosionOpeningClassName = 'explosion_Opening';
var explosionSummaryClassName = 'explosionSummary';
var explosionControlsClassName = 'explosionControls';
var explosionImagesClassName = 'explosionImages';
var explosionSummaryContentClassName = 'explosionSummaryContent';
var explosionTitleClassName = 'explosionTitle';
var explosionDescriptionClassName = 'explosionDescription';
var explosionImageClassName = 'explosionImage';
var explosionCloseClassName = 'explosionClose';
var explosionNavsClassName = 'explosionNavs';
var explosionNavClassName = 'explosionNav';
var explosionNavPrevClassName = 'explosionNavPrev';
var explosionNavNextClassName = 'explosionNavNext';
var explosionCouterClassName = 'explosionCounter';
var explosionNavDisabledClassName = 'explosionNavDisabled';
var explosionPrevHiddenImageClassName = 'explosionImage_PrevHidden';
var explosionPrevShowingImageClassName = 'explosionImage_PrevShowing';
var explosionActiveImageClassName = 'explosionImage_Active';
var explosionNextShowingImageClassName = 'explosionImage_NextShowing';
var explosionNextHiddenImageClassName = 'explosionImage_NextHidden';

var ExplositionGallery =
/*#__PURE__*/
function () {
  function ExplositionGallery(elementNode, options) {
    _classCallCheck(this, ExplositionGallery);

    this.options = _objectSpread({}, defaultOptions, {}, options);
    this.containerNode = elementNode;
    this.linkNodes = elementNode.querySelectorAll(this.options.linkClass);
    this.minWidth = 1023;
    this.minHeight = 600;
    this.padding = 2 * 16;
    this.showingCount = 4;
    this.currentIndex = 0;
    this.size = this.linkNodes.length;
    this.initModal();
    this.events();
  }

  _createClass(ExplositionGallery, [{
    key: "initModal",
    value: function initModal() {
      this.modalContainerNode = document.createElement('div');
      this.modalContainerNode.className = explosionClassName;
      this.modalContainerNode.innerHTML = "\n\t\t\t<div class=\"".concat(explosionSummaryClassName, "\">\n\t\t\t\t<div class=\"").concat(explosionSummaryContentClassName, "\">\n\t\t\t\t\t<h2 class=\"").concat(explosionTitleClassName, "\"></h2>\n\t\t\t\t\t<p class=\"").concat(explosionDescriptionClassName, "\"></p>\n\t\t\t\t</div>\n\t\t\t</div>\n            <div class=\"").concat(explosionControlsClassName, "\">\n                <button class=\"").concat(explosionCloseClassName, "\"></button>\n                <div class=\"").concat(explosionNavsClassName, "\">\n                    <button class=\"").concat(explosionNavClassName, " ").concat(explosionNavPrevClassName, "\"></button>\n                    <div class=\"").concat(explosionCouterClassName, "\">\n                        1/").concat(this.size, "\n                    </div>\n                    <button class=\"").concat(explosionNavClassName, " ").concat(explosionNavNextClassName, "\"></button>\n                </div>\n            </div>\n            <div class=\"").concat(explosionImagesClassName, "\">\n                ").concat(Array.from(this.linkNodes).map(function (linkNode) {
        return "\n                    <img src=\"".concat(linkNode.getAttribute('href'), "\" alt=\"").concat(linkNode.dataset.title, "\" class=\"").concat(explosionImageClassName, "\" data-title=\"").concat(linkNode.dataset.title, "\" data-description=\"").concat(linkNode.dataset.description, "\" />\n                ");
      }).join(''), "\n\n            </div>\n\n\t\t");
      document.body.appendChild(this.modalContainerNode);
    }
  }, {
    key: "events",
    value: function events() {
      this.containerNode.addEventListener('click', this.activateGallery);
    }
  }, {
    key: "activateGallery",
    value: function activateGallery(event) {
      event.preventDefault();
      var linkNode = event.target.closest('a');

      if (!linkNode) {
        return;
      }

      this.currentIndex = Array.from(this.linkNodes).findIndex(function (itemNode) {
        return linkNode === itemNode;
      });
    }
  }]);

  return ExplositionGallery;
}();
/**
 * Helpers
 */


function fadeIn(element, callback) {
  animation();

  function animation() {
    var opacity = Number(element.style.opacity);

    if (opacity < 1) {
      opacity = opacity + 0.1;
      element.style.opacity = opacity;
      window.requestAnimationFrame(animation);
      return;
    }

    if (callback) {
      callback();
    }
  }
}

function fadeOut(element, callback) {
  animation();

  function animation() {
    var opacity = Number(element.style.opacity);

    if (opacity > 0) {
      opacity = opacity - 0.04;
      element.style.opacity = opacity;
      window.requestAnimationFrame(animation);
      return;
    }

    if (callback) {
      callback();
    }
  }
}

function throttle(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var isWaiting = false;
  var savedArgs = null;
  var savedThis = null;
  return function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isWaiting) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    callback.apply(this, args);
    isWaiting = true;
    setTimeout(function () {
      isWaiting = false;

      if (savedThis) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null;
      }
    }, delay);
  };
}