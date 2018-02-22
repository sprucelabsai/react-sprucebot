'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var DialogUnderlay = _styledComponents2.default.div.attrs({
	className: function className(_ref) {
		var show = _ref.show;
		return (0, _classnames2.default)('dialog_underlay', show ? 'on' : 'off', 'container');
	}
}).withConfig({
	displayName: 'Dialog__DialogUnderlay',
	componentId: 'ta61od-0'
})(['position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:rgba(0,0,0,0.6);display:flex;justify-content:center;align-items:center;min-height:', 'px;padding:20px;'], function (_ref2) {
	var height = _ref2.height;
	return height + 40;
});

var DialogContainer = _styledComponents2.default.div.attrs({
	className: function className(_ref3) {
		var show = _ref3.show,
		    _className = _ref3.className;
		return (0, _classnames2.default)('dialog', _className, show ? 'on' : 'off');
	}
}).withConfig({
	displayName: 'Dialog__DialogContainer',
	componentId: 'ta61od-1'
})(['transition:opacity 1s ease-in-out;opacity:', ';background-color:#fff;border-radius:4px;z-index:2;padding:20px;margin:auto -20px;width:90%;max-width:500px;'], function (_ref4) {
	var opacity = _ref4.opacity;
	return opacity || 0;
});
var DialogCloseButton = (0, _styledComponents2.default)(_Button2.default).attrs({
	className: 'btn__close_dialog',
	remove: true
}).withConfig({
	displayName: 'Dialog__DialogCloseButton',
	componentId: 'ta61od-2'
})(['display:block;position:absolute;top:15px;right:20px;']);

var Dialog = function (_Component) {
	_inherits(Dialog, _Component);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

		_this.state = {
			width: -1,
			height: 500
		};
		return _this;
	}

	_createClass(Dialog, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			if (this.props.show !== nextProps.show) {
				setTimeout(function () {
					return _this2.setState({ opacity: nextProps.show ? 1 : 0 });
				}, 100);
			}
		}
	}, {
		key: 'setSize',
		value: function setSize(_ref5) {
			var width = _ref5.width,
			    height = _ref5.height;

			this.setState({ width: width, height: height });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    tag = _props.tag,
			    children = _props.children,
			    className = _props.className,
			    show = _props.show,
			    onTapClose = _props.onTapClose,
			    props = _objectWithoutProperties(_props, ['tag', 'children', 'className', 'show', 'onTapClose']);

			var _state = this.state,
			    opacity = _state.opacity,
			    height = _state.height;

			var Tag = tag;

			if (!show) {
				return null;
			}

			return _react2.default.createElement(
				DialogUnderlay,
				{ show: show, height: height },
				_react2.default.createElement(
					_reactMeasure2.default,
					{
						bounds: true,
						onResize: function onResize(contentRect) {
							_this3.setSize({
								width: contentRect.bounds.width,
								height: contentRect.bounds.height
							});
						}
					},
					function (_ref6) {
						var measureRef = _ref6.measureRef;
						return _react2.default.createElement(
							DialogContainer,
							_extends({
								innerRef: measureRef,
								className: className,
								show: show,
								opacity: opacity
							}, props),
							onTapClose && _react2.default.createElement(DialogCloseButton, { onClick: onTapClose }),
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