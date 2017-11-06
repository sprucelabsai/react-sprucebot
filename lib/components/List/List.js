'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ListItem = exports.List = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = exports.List = _styledComponents2.default.div.attrs({
	className: 'item__list'
}).withConfig({
	displayName: 'List',
	componentId: 'g8e11t-0'
})(['']);

var ListItem = exports.ListItem = function (_Component) {
	_inherits(ListItem, _Component);

	function ListItem() {
		_classCallCheck(this, ListItem);

		return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
	}

	_createClass(ListItem, [{
		key: 'render',
		value: function render() {
			var props = Object.assign({}, this.props);
			var className = props.className,
			    children = props.children,
			    title = props.title,
			    subtitle = props.subtitle,
			    rightInput = props.rightInput,
			    rightTitle = props.rightTitle,
			    rightSubtitle = props.rightSubtitle,
			    online = props.online,
			    avatar = props.avatar;

			// cleanup props for pass through

			delete props.className;
			delete props.children;
			delete props.title;
			delete props.subtitle;
			delete props.rightInput;
			delete props.rightTitle;
			delete props.rightSubtitle;
			delete props.online;
			delete props.avatar;

			// setup class name
			className = (className || '') + ' item__list__item ' + (online ? '' : 'offline');

			// build children
			children = children || [];
			if (!Array.isArray(children)) {
				children = [children];
			}

			// setup title/subtitle
			if (subtitle) {
				children.unshift(_react2.default.createElement(
					'div',
					{ key: 'subtitle', className: 'sub__title' },
					subtitle
				));
			}

			if (title) {
				children.unshift(_react2.default.createElement(
					'div',
					{ key: 'title', className: 'title' },
					title
				));
			}

			return _react2.default.createElement(
				'div',
				_extends({ className: className }, props),
				avatar && _react2.default.createElement(
					'div',
					{ className: 'avatar__outer__wrapper' },
					_react2.default.createElement(_Avatar2.default, { online: online, image: avatar })
				),
				children && _react2.default.createElement(
					'div',
					{ className: 'item__details' },
					children
				),
				rightInput && rightInput,
				(rightTitle || rightSubtitle) && _react2.default.createElement(
					'div',
					{ className: 'content__right' },
					rightTitle && _react2.default.createElement(
						'div',
						{ className: 'title' },
						rightTitle
					),
					rightSubtitle && _react2.default.createElement(
						'div',
						{ className: 'sub__title' },
						rightSubtitle
					)
				)
			);
		}
	}]);

	return ListItem;
}(_react.Component);

ListItem.propTypes = {
	friend: _propTypes2.default.object,
	title: _propTypes2.default.string,
	subtitle: _propTypes2.default.string,
	rightInput: _propTypes2.default.any,
	rightTitle: _propTypes2.default.any,
	rightSubtitle: _propTypes2.default.any,
	online: _propTypes2.default.bool,
	avatar: _propTypes2.default.string
};

ListItem.defaultProps = {
	online: true
};