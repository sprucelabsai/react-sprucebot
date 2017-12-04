'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FeedAttachment = exports.FeedItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Typography = require('../Typography/Typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feed = function (_Component) {
	_inherits(Feed, _Component);

	function Feed() {
		_classCallCheck(this, Feed);

		return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));
	}

	_createClass(Feed, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    loading = _props.loading,
			    data = _props.data,
			    props = _objectWithoutProperties(_props, ['loading', 'data']);

			var lastDay = 0;
			return _react2.default.createElement(
				'div',
				_extends({}, props, { className: 'feed__wrapper' }),
				loading && _react2.default.createElement(_Loader2.default, null),
				data && data.map(function (item) {
					var day = (0, _moment2.default)(item.createdAt).dayOfYear();
					var header = undefined;
					if (day !== lastDay) {
						lastDay = day;
						header = (0, _moment2.default)(item.createdAt).isSame(new Date(), 'day') ? 'Today' : (0, _moment2.default)(item.createdAt).format('MMM Do');
					}
					return _react2.default.createElement(FeedItem, _extends({ key: item.id }, item, { header: header }));
				})
			);
		}
	}]);

	return Feed;
}(_react.Component);

exports.default = Feed;


Feed.propTypes = {
	data: _propTypes2.default.array,
	loading: _propTypes2.default.bool
};

Feed.defaultProps = {
	loading: false
};

var FeedItem = exports.FeedItem = function (_Component2) {
	_inherits(FeedItem, _Component2);

	function FeedItem() {
		_classCallCheck(this, FeedItem);

		return _possibleConstructorReturn(this, (FeedItem.__proto__ || Object.getPrototypeOf(FeedItem)).apply(this, arguments));
	}

	_createClass(FeedItem, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'feed__item ' + (this.props.bigAvatar ? 'big_avatar' : '') },
				this.props.header && _react2.default.createElement(
					_Typography.SectionHeading,
					null,
					this.props.header
				),
				this.props.user && _react2.default.createElement(
					'div',
					{ className: 'feed__avatar' },
					_react2.default.createElement(_Avatar2.default, {
						top: this.props.bigAvatar,
						image: this.props.user.User.profileImages ? this.props.user.User.profileImages.profile60 : this.props.user.User.defaultProfileImages.profile60
					})
				),
				_react2.default.createElement(
					_BotText2.default,
					null,
					this.props.message,
					_react2.default.createElement(
						'span',
						{ className: 'date' },
						(0, _moment2.default)(this.props.createdAt).calendar()
					)
				),
				this.props.attachments && _react2.default.createElement(
					'div',
					{ className: 'feed__attachments' },
					this.props.attachments.map(function (attachment, idx) {
						return _react2.default.createElement(FeedAttachment, {
							key: 'attachment-' + idx,
							title: attachment.title,
							value: attachment.value
						});
					})
				)
			);
		}
	}]);

	return FeedItem;
}(_react.Component);

FeedItem.propTypes = {
	header: _propTypes2.default.string,
	createdAt: _propTypes2.default.object.isRequired,
	message: _propTypes2.default.string.isRequired,
	user: _propTypes2.default.object,
	attachments: _propTypes2.default.array,
	bigAvatar: _propTypes2.default.bool
};

var FeedAttachment = exports.FeedAttachment = function (_Component3) {
	_inherits(FeedAttachment, _Component3);

	function FeedAttachment() {
		_classCallCheck(this, FeedAttachment);

		return _possibleConstructorReturn(this, (FeedAttachment.__proto__ || Object.getPrototypeOf(FeedAttachment)).apply(this, arguments));
	}

	_createClass(FeedAttachment, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'feed__attachment' },
				_react2.default.createElement(
					'div',
					{ className: 'title' },
					this.props.title
				),
				_react2.default.createElement(
					'div',
					{ className: 'value' },
					this.props.value
				)
			);
		}
	}]);

	return FeedAttachment;
}(_react.Component);

FeedAttachment.propTypes = {
	title: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.any.isRequired
};