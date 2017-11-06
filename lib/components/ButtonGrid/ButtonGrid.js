'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GridButton = exports.ButtonGrid = undefined;

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

var ButtonGrid = exports.ButtonGrid = _styledComponents2.default.div.attrs({
	className: 'btn_grid'
}).withConfig({
	displayName: 'ButtonGrid',
	componentId: 's1hbbt9j-0'
})(['']);

var GridButton = exports.GridButton = function (_Component) {
	_inherits(GridButton, _Component);

	function GridButton() {
		_classCallCheck(this, GridButton);

		return _possibleConstructorReturn(this, (GridButton.__proto__ || Object.getPrototypeOf(GridButton)).apply(this, arguments));
	}

	_createClass(GridButton, [{
		key: 'render',
		value: function render() {
			var props = Object.assign({}, this.props);
			var className = props.className,
			    selected = props.selected,
			    children = props.children,
			    subtitle = props.subtitle;


			delete props.className;
			delete props.selected;
			delete props.children;
			delete props.subtitle;

			return _react2.default.createElement(
				'a',
				_extends({
					className: 'btn ' + (className || '') + ' ' + (selected ? 'selected' : '')
				}, props),
				_react2.default.createElement(
					'span',
					null,
					children,
					subtitle && _react2.default.createElement('br', null),
					subtitle && _react2.default.createElement(
						'small',
						null,
						subtitle
					)
				)
			);
		}
	}]);

	return GridButton;
}(_react.Component);

GridButton.propTypes = {
	selected: _propTypes2.default.bool,
	subtitle: _propTypes2.default.string
};

GridButton.defaultProps = {
	selected: false
};