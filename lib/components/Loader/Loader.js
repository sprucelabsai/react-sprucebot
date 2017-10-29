'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var Loader = (function (_Component) {
	_inherits(Loader, _Component);

	function Loader() {
		_classCallCheck(this, Loader);

		_get(Object.getPrototypeOf(Loader.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Loader, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var dark = _props.dark;
			var fullWidth = _props.fullWidth;

			var dotClassName = dark ? 'loader_dot_dark' : 'loader_dot';
			var fullWidthStyle = fullWidth ? { display: 'block', margin: '20px', textAlign: 'center' } : {};

			return _react2['default'].createElement(
				'span',
				{ className: 'loader_wrapper', style: fullWidthStyle },
				_react2['default'].createElement('span', { className: dotClassName }),
				_react2['default'].createElement('span', { className: dotClassName }),
				_react2['default'].createElement('span', { className: dotClassName })
			);
		}
	}]);

	return Loader;
})(_react.Component);

exports['default'] = Loader;

Loader.propTypes = {
	dark: _propTypes2['default'].bool,
	fullWidth: _propTypes2['default'].bool
};

Loader.defaultProps = {
	dark: true,
	fullWidth: true
};
module.exports = exports['default'];