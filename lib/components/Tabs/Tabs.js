'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TabPane = exports.Tabs = undefined;

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

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = exports.Tabs = function (_Component) {
	_inherits(Tabs, _Component);

	function Tabs(props) {
		_classCallCheck(this, Tabs);

		var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

		var children = _react2.default.Children.toArray(props.children);

		// default to first selected item
		var selected = children[0] && children[0].key;

		if (children.length > 0) {
			children.some(function (tab) {
				if (tab.props.selected) {
					selected = tab.key;
					return true;
				}
			});
		}

		_this.state = {
			selected: selected,
			children: children
		};
		return _this;
	}

	_createClass(Tabs, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var newState = {
				children: _react2.default.Children.toArray(nextProps.children)
			};

			if (typeof nextProps.selected === 'number' && nextProps.selected !== this.state.selected) {
				children.forEach(function (tab, idx) {
					if (idx === nextProps.selected) {
						newState.selected = tab.key;
					}
				});
			}

			this.setState(newState);
		}
	}, {
		key: 'onTabClick',
		value: function onTabClick(idx, key, e) {
			if (this.state.selected !== idx) {
				if (this.props.onChange) {
					this.props.onChange(idx, e);
				}
				this.setState({
					selected: key
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    selected = _state.selected,
			    children = _state.children;

			var _props = this.props,
			    _ = _props.selected,
			    props = _objectWithoutProperties(_props, ['selected']);

			// build tab labels and selected


			var tabs = [];
			var totalTabs = children.length;
			var tabPanes = [];

			children.forEach(function (tab, idx) {
				var className = '';

				switch (idx) {
					case 0:
						className = 'toggle__left';
						break;
					case totalTabs - 1:
						className = 'toggle__right';
						break;
					default:
						className = 'toggle__middle';
						break;
				}

				// select the proper tab
				if (selected === tab.key) {
					className += ' btn__toggle__active';
					tabPanes.push(tab);
				}

				tabs.push(_react2.default.createElement(
					_Button2.default,
					{
						onClick: function onClick(e) {
							_this2.onTabClick(idx, tab.key, e);
						},
						toggle: true,
						className: className,
						key: 'tab-' + tab.key
					},
					tab.props.title
				));
			});

			return _react2.default.createElement(
				'div',
				_extends({ className: 'tabs__container ' }, props),
				_react2.default.createElement(
					'div',
					{ className: 'tabs' },
					tabs
				),
				_react2.default.createElement(
					'div',
					{ className: 'tab__panes' },
					tabPanes
				)
			);
		}
	}]);

	return Tabs;
}(_react.Component);

Tabs.propTypes = {
	onChange: _propTypes2.default.func,
	selected: _propTypes2.default.number
};

var TabPane = exports.TabPane = function (_Component2) {
	_inherits(TabPane, _Component2);

	function TabPane() {
		_classCallCheck(this, TabPane);

		return _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).apply(this, arguments));
	}

	_createClass(TabPane, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'tap__pane' },
				this.props.children
			);
		}
	}]);

	return TabPane;
}(_react.Component);

TabPane.propTypes = {
	title: _propTypes2.default.string,
	selected: _propTypes2.default.bool
};