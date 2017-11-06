'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TabPane = exports.Tabs = undefined;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = exports.Tabs = function (_Component) {
	_inherits(Tabs, _Component);

	function Tabs(props) {
		_classCallCheck(this, Tabs);

		// normalize children for some checks
		var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

		var children = props.children || [];
		if (!Array.isArray(children)) {
			children = [children];
		}

		// default to first selected item
		var selected = 0;

		children.forEach(function (tab, idx) {
			// lets make sure they are all tab panes
			if (tab.type.name !== 'TabPane') {
				throw new Error("<Tabs> can only contain <TapPane>'s as children");
			}

			if (tab.props.selected) {
				selected = idx;
			}
		});

		_this.state = {
			selected: selected
		};
		return _this;
	}

	_createClass(Tabs, [{
		key: 'onTabClick',
		value: function onTabClick(idx, e) {
			if (this.state.selected !== idx) {
				if (this.props.onChange) {
					this.props.onChange(idx, e);
				}
				this.setState({
					selected: idx
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = Object.assign({}, this.props);
			var children = props.children,
			    className = props.className;
			var selected = this.state.selected;


			delete props.children;
			delete props.onChange;
			delete props.className;

			// normalize children (which should only be tabpanes)
			children = children || [];
			if (!Array.isArray(children)) {
				children = [children];
			}

			// build tab labels and selected
			var tabs = [];
			var totalTabs = children.length;
			var tabPanes = [];

			children.forEach(function (tabPane, idx) {
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
				if (selected === idx) {
					className += ' btn__toggle__active';
					tabPanes.push(tabPane);
				}

				tabs.push(_react2.default.createElement(
					_Button2.default,
					{
						onClick: function onClick(e) {
							_this2.onTabClick(idx, e);
						},
						toggle: true,
						className: className,
						key: 'tab-' + idx
					},
					tabPane.props.title
				));
			});

			return _react2.default.createElement(
				'div',
				{ className: 'tabs__container  ' + className },
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
	onChange: _propTypes2.default.func
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