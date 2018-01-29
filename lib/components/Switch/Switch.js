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

var switchContainerColorOff = '#d6d6d6';
var switchContainerColorOn = '#00C8EB';
var switchBtnColorOff = '#808080';
var switchBtnColorOn = '#0094AD';

var SwitchButton = _styledComponents2.default.span.attrs({
	className: 'SwitchButton',
	type: 'button'
}).withConfig({
	displayName: 'Switch__SwitchButton',
	componentId: 'ntuyi9-0'
})(['background:none;bottom:0;height:100%;left:0;margin:0;padding:0;position:absolute;right:0;top:0;width:100%;&:before{background-color:', ';border-radius:50%;bottom:0;content:\'\';height:1.125em;left:0.1875em;margin:auto;position:absolute;right:auto;top:0;width:1.125em;transition:transform 0.2s ease-out;', ';}'], switchBtnColorOff, function (props) {
	return props.on ? 'transform: translate(1.4375em, 0);\n\t\t\t\tbackground-color: ' + switchBtnColorOn : 'transition: transform 0.2s ease-out;';
});
var SwitchComp = _styledComponents2.default.div.attrs({
	className: function className(_ref) {
		var _className = _ref.className;
		return 'Switch switch ' + (_className || '');
	}
}).withConfig({
	displayName: 'Switch__SwitchComp',
	componentId: 'ntuyi9-1'
})(['background-color:', ';border-radius:0.75em;height:1.5em;position:relative;transition:background-color 0.3s ease-out;width:3em;', ';'], switchContainerColorOff, function (props) {
	return props.on ? 'background-color: ' + switchContainerColorOn + ';' : 'transition: transform 0.2s ease-out;';
});

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
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ on: nextProps.on });
		}
	}, {
		key: 'render',
		value: function render() {
			var props = Object.assign({}, this.props);

			delete props.className;
			delete props.on;
			delete props.onChange;
			delete props.children;

			return _react2.default.createElement(
				SwitchComp,
				_extends({
					on: this.props.on
				}, props, {
					onMouseUp: this.onChange.bind(this)
				}),
				_react2.default.createElement(SwitchButton, { on: this.props.on })
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
	on: false
};