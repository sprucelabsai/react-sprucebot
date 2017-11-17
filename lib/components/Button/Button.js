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

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO refactor into styled component
var Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var props = Object.assign({}, this.props);
			var tag = props.tag,
			    busy = props.busy,
			    disabled = props.disabled,
			    primary = props.primary,
			    secondary = props.secondary,
			    alt = props.alt,
			    link = props.link,
			    caution = props.caution,
			    className = props.className,
			    children = props.children,
			    submit = props.submit,
			    href = props.href,
			    remove = props.remove,
			    toggle = props.toggle;


			delete props.tag;
			delete props.primary;
			delete props.secondary;
			delete props.alt;
			delete props.children;
			delete props.busy;
			delete props.caution;
			delete props.link;
			delete props.submit;
			delete props.remove;
			delete props.toggle;
			delete props.className;

			if (primary && secondary) {
				return _react2.default.createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'secondary\' are mutually exclusive.'
				);
			} else if (primary && alt) {
				return _react2.default.createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'alt\' are mutually exclusive.'
				);
			}

			var btnClass = primary ? 'btn__primary' : '';
			btnClass += secondary ? 'btn__secondary' : '';
			btnClass += alt && btnClass.length > 0 ? '__alt' : '';
			btnClass += alt && btnClass.length === 0 ? 'btn__alt' : '';
			btnClass += disabled ? ' btn__disabled' : '';
			btnClass += caution ? ' btn__caution' : '';
			btnClass += link ? ' btn__link' : '';
			btnClass += toggle ? 'btn__toggle' : '';

			if (remove) {
				btnClass = 'btn__remove';
			} else if (!btnClass) {
				btnClass = 'btn';
			}

			// if this button has a href or is a "remove" button, make it an anchor
			var Tag = href || remove ? 'a' : tag;

			return _react2.default.createElement(
				Tag,
				_extends({ className: btnClass + ' ' + (className || '') }, props),
				busy ? _react2.default.createElement(_Loader2.default, { dark: false, fullWidth: false }) : children
			);
		}
	}]);

	return Button;
}(_react.Component);

exports.default = Button;


Button.propTypes = {
	tag: _propTypes2.default.string,
	primary: _propTypes2.default.bool,
	alt: _propTypes2.default.bool,
	secondary: _propTypes2.default.bool,
	busy: _propTypes2.default.bool,
	href: _propTypes2.default.string,
	remove: _propTypes2.default.bool,
	toggle: _propTypes2.default.bool
};

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false,
	remove: false,
	toggle: false
};