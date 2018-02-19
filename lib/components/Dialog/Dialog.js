'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

		_this.showing = false;
		_this.wrapper = false;
		_this.state = {
			top: -1,
			left: -1,
			width: -1,
			height: 500,
			opacity: 0

			// for resize callbacks
		};_this.position = _this.position.bind(_this);
		return _this;
	}

	_createClass(Dialog, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (!this.showing && this.props.show) {
				this.position();
			}
			this.showing = this.props.show;
		}
	}, {
		key: 'position',
		value: function position() {
			if (!this.wrapper) return;
			// don't resize if we are not showing
			var positionedParent = void 0;
			var node = this.wrapper.parentNode;

			while (node && node !== document.body) {
				var pos = window.getComputedStyle(node).getPropertyValue('position').toLowerCase();

				if (pos === 'relative' || pos === 'absolute') {
					positionedParent = node;
					node = null;
				} else {
					node = node.parentNode;
				}
			}

			var screenWidth = void 0,
			    scrollTop = document.body.scrollTop;

			var w = window,
			    d = document,
			    e = d.documentElement,
			    g = d.getElementsByTagName('body')[0],
			    screenHeight = w.innerHeight || e.clientHeight || g.clientHeight;

			if (!positionedParent) {
				screenWidth = w.innerWidth || e.clientWidth || g.clientWidth;
			} else {
				screenWidth = positionedParent.offsetWidth;
				scrollTop = document.body.scrollTop - positionedParent.offsetTop;
			}

			// center horizontally
			var width = this.state.width > 0 ? this.state.width : Math.min(500, screenWidth * 0.9);
			var left = (screenWidth - width) / 2;
			var top = this.state.height >= screenHeight - 20 ? 20 : scrollTop + (screenHeight - this.state.height) / 2;

			this.setState({ left: left, top: top });
		}
	}, {
		key: 'setSize',
		value: function setSize(_ref) {
			var width = _ref.width,
			    height = _ref.height;

			this.setState({ width: width, height: height, opacity: 1 });
			this.position();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('resize', this.position);
			this.position();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.position);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    tag = _props.tag,
			    children = _props.children,
			    className = _props.className,
			    show = _props.show,
			    onTapClose = _props.onTapClose,
			    props = _objectWithoutProperties(_props, ['tag', 'children', 'className', 'show', 'onTapClose']);

			var _state = this.state,
			    top = _state.top,
			    left = _state.left,
			    opacity = _state.opacity;

			var Tag = tag;

			if (!show) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{
					ref: function ref(node) {
						_this2.wrapper = node;
					}
				},
				_react2.default.createElement('div', { className: 'dialog_underlay ' + (show ? 'on' : 'off') }),
				_react2.default.createElement(
					_reactMeasure2.default,
					{
						bounds: true,
						onResize: function onResize(contentRect) {
							_this2.setSize({
								width: contentRect.bounds.width,
								height: contentRect.bounds.height
							});
						}
					},
					function (_ref2) {
						var measureRef = _ref2.measureRef;
						return _react2.default.createElement(
							Tag,
							_extends({
								style: { top: top, left: left, opacity: opacity },
								ref: measureRef,
								className: 'dialog ' + (className || '') + ' ' + (show ? 'on' : 'off')
							}, props),
							onTapClose && _react2.default.createElement(_Button2.default, {
								className: 'btn__close_dialog',
								remove: true,
								onClick: onTapClose
							}),
							children
						);
					}
				)
			);
		}
	}]);

	return Dialog;
}(_react.Component);

exports.default = Dialog;


Dialog.propTypes = {
	tag: _propTypes2.default.string,
	show: _propTypes2.default.bool,
	onTapClose: _propTypes2.default.func
};

Dialog.defaultProps = {
	tag: 'div',
	show: false
};