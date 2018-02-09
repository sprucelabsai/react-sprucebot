'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ListItem = exports.List = undefined;

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = exports.List = _styledComponents2.default.div.attrs({
	className: 'List item__list'
}).withConfig({
	displayName: 'List',
	componentId: 'kycgqt-0'
})(['', ';word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;'], function (props) {
	return props.pile ? 'padding-bottom: 1.25em' : void 0;
});

var ListItemWrapper = _styledComponents2.default.div.attrs({
	className: function className(_ref) {
		var _className = _ref.className,
		    online = _ref.online;
		return (_className || '') + ' ListItemWrapper item__list__item ' + (online ? '' : 'offline');
	}
}).withConfig({
	displayName: 'List__ListItemWrapper',
	componentId: 'kycgqt-1'
})(['display:flex;', ';', ';'], function (props) {
	return props.alignItems ? 'align-items: ' + props.alignItems : 'align-items: center;';
}, function (props) {
	return props.online ? '' : 'opacity: .4;';
});

var ItemAvatar = _styledComponents2.default.div.attrs({
	className: 'ItemAvatar avatar__outer__wrapper'
}).withConfig({
	displayName: 'List__ItemAvatar',
	componentId: 'kycgqt-2'
})(['position:relative;margin:0 10px 0 0;border-radius:50%;', ';'], function (props) {
	return props.alignItems ? 'align-items: ' + props.alignItems : 'align-items: center;';
});

var ItemDetail = _styledComponents2.default.div.attrs({
	className: 'ItemDetail item__details'
}).withConfig({
	displayName: 'List__ItemDetail',
	componentId: 'kycgqt-3'
})(['flex-grow:1;']);

var ItemRightContent = _styledComponents2.default.div.attrs({
	className: 'ItemRightContent content__right'
}).withConfig({
	displayName: 'List__ItemRightContent',
	componentId: 'kycgqt-4'
})(['text-align:right;min-width:90px;display:flex;align-items:flex-end;']);

var ItemTitle = _styledComponents2.default.div.attrs({
	className: 'ItemTitle title'
}).withConfig({
	displayName: 'List__ItemTitle',
	componentId: 'kycgqt-5'
})(['', ';'], function (props) {
	return props.weight ? 'font-weight: ' + props.weight : 'font-weight: 500;';
});

var ItemSubTitle = _styledComponents2.default.div.attrs({
	className: 'ItemSubTitle sub__title'
}).withConfig({
	displayName: 'List__ItemSubTitle',
	componentId: 'kycgqt-6'
})(['font-size:0.75em;']);

var ListItem = exports.ListItem = function (_Component) {
	_inherits(ListItem, _Component);

	function ListItem() {
		_classCallCheck(this, ListItem);

		return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
	}

	_createClass(ListItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    children = _props.children,
			    title = _props.title,
			    subtitle = _props.subtitle,
			    rightInput = _props.rightInput,
			    rightTitle = _props.rightTitle,
			    rightSubtitle = _props.rightSubtitle,
			    online = _props.online,
			    avatar = _props.avatar,
			    showOnlineIndicator = _props.showOnlineIndicator,
			    alignItems = _props.alignItems,
			    props = _objectWithoutProperties(_props, ['className', 'children', 'title', 'subtitle', 'rightInput', 'rightTitle', 'rightSubtitle', 'online', 'avatar', 'showOnlineIndicator', 'alignItems']);

			// build children


			children = children || [];
			if (!Array.isArray(children)) {
				children = [children];
			}

			// setup title/subtitle
			if (subtitle) {
				children.unshift(_react2.default.createElement(
					ItemSubTitle,
					{ key: 'subtitle' },
					subtitle
				));
			}

			if (title) {
				children.unshift(_react2.default.createElement(
					ItemTitle,
					{ key: 'title' },
					title
				));
			}

			return _react2.default.createElement(
				ListItemWrapper,
				this.props,
				avatar && _react2.default.createElement(
					ItemAvatar,
					{ alignItems: alignItems },
					avatar === true ? _react2.default.createElement(_Avatar2.default, {
						online: online,
						showOnlineIndicator: showOnlineIndicator
					}) : _react2.default.createElement(_Avatar2.default, {
						online: online,
						image: avatar,
						showOnlineIndicator: showOnlineIndicator
					})
				),
				children && _react2.default.createElement(
					ItemDetail,
					null,
					children
				),
				(rightTitle || rightSubtitle || rightInput) && _react2.default.createElement(
					ItemRightContent,
					{ alignItems: alignItems },
					rightInput && rightInput,
					rightTitle && _react2.default.createElement(
						ItemTitle,
						{ weight: 400 },
						rightTitle
					),
					rightSubtitle && _react2.default.createElement(
						ItemSubTitle,
						null,
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
	avatar: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
	showOnlineIndicator: _propTypes2.default.bool,
	alignItems: _propTypes2.default.string
};

ListItem.defaultProps = {
	online: true,
	showOnlineIndicator: true
};