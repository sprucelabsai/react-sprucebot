'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactEmojione = require('react-emojione');

var _reactEmojione2 = _interopRequireDefault(_reactEmojione);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LoaderLoader = require('../Loader/Loader');

var _LoaderLoader2 = _interopRequireDefault(_LoaderLoader);

// TODO refactor into styled component

var Button = (function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		_get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var props = _extends({}, this.props);
			var tag = props.tag;
			var busy = props.busy;
			var disabled = props.disabled;
			var primary = props.primary;
			var secondary = props.secondary;
			var alt = props.alt;
			var link = props.link;
			var caution = props.caution;
			var className = props.className;
			var children = props.children;

			delete props.tag;
			delete props.primary;
			delete props.secondary;
			delete props.alt;
			delete props.children;
			delete props.busy;
			delete props.caution;
			delete props.link;

			if (primary && secondary) {
				return _react2['default'].createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'secondary\' are mutually exclusive.'
				);
			} else if (primary && alt) {
				return _react2['default'].createElement(
					'button',
					{ className: 'btn__primary' },
					'\'primary\' and \'alt\' are mutually exclusive.'
				);
			}

			var btnClass = primary ? 'primary' : '';
			btnClass += secondary ? 'secondary' : '';
			btnClass += alt && btnClass.length > 0 ? '__alt' : '';
			btnClass += alt && btnClass.length === 0 ? 'alt' : '';
			btnClass += disabled ? ' btn__disabled' : '';
			btnClass += caution ? ' btn__caution' : '';
			btnClass += link ? ' btn__link' : '';

			var Tag = tag;

			return _react2['default'].createElement(
				Tag,
				_extends({ className: 'btn__' + btnClass + ' ' + (className || '') }, props),
				busy ? _react2['default'].createElement(_LoaderLoader2['default'], { blue: false, fullWidth: false }) : _react2['default'].createElement(
					_reactEmojione2['default'],
					null,
					children
				)
			);
		}
	}]);

	return Button;
})(_react.Component);

exports['default'] = Button;

Button.propTypes = {
	tag: _propTypes2['default'].string,
	primary: _propTypes2['default'].bool,
	alt: _propTypes2['default'].bool,
	secondary: _propTypes2['default'].bool,
	busy: _propTypes2['default'].bool
};

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false
};
module.exports = exports['default'];