'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_Component) {
	_inherits(Switch, _Component);

	function Switch(props) {
		_classCallCheck(this, Switch);

		var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

		_this.state = {
			on: !!props.on
		};
		return _this;
	}

	_createClass(Switch, [{
		key: 'onChange',
		value: function onChange(e) {
			var _this2 = this;

			// toggle on state of button
			this.setState(function (prevState, props) {
				// new 'on' state
				var on = !prevState.on;

				// let any callbacks know of state change
				if (_this2.props.onChange) {
					_this2.props.onChange(on, e);
				}

				return {
					on: on
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var props = Object.assign({}, this.props);

			var className = (props.className || '') + ' switch';

			delete props.className;
			delete props.on;
			delete props.onChange;
			delete props.children;

			// are we on?
			if (this.state.on) {
				className += ' on';
			}

			return _react2.default.createElement(
				'div',
				_extends({
					className: className
				}, props, {
					onMouseUp: this.onChange.bind(this)
				}),
				_react2.default.createElement('button', { type: 'button' })
			);
		}
	}]);

	return Switch;
}(_react.Component);

exports.default = Switch;


Switch.propTypes = {
	on: _propTypes2.default.bool,
	onChange: _propTypes2.default.func
};

Switch.defaultProps = {
	on: false,
	onChange: function onChange(e) {}
};