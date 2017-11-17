'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pager = function (_Component) {
	_inherits(Pager, _Component);

	function Pager(props) {
		_classCallCheck(this, Pager);

		// Starting page
		var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));

		_this.state = {
			page: props.page
		};
		return _this;
	}

	_createClass(Pager, [{
		key: 'triggerOnChange',
		value: function triggerOnChange(page, e) {
			if (this.props.onChange) {
				this.props.onChange(page, e);
			}
			return page;
		}
	}, {
		key: 'first',
		value: function first(e) {
			var _this2 = this;

			this.setState(function (prevState) {
				if (prevState.page > 0) {
					return {
						page: _this2.triggerOnChange(0, e)
					};
				}
				return {};
			});
		}
	}, {
		key: 'back',
		value: function back(e) {
			var _this3 = this;

			this.setState(function (prevState) {
				if (prevState.page > 0) {
					return {
						page: _this3.triggerOnChange(prevState.page - 1, e)
					};
				}
				return {};
			});
		}
	}, {
		key: 'next',
		value: function next(e) {
			var _this4 = this;

			this.setState(function (prevState) {
				if (prevState.page < _this4.props.totalPages - 1) {
					return {
						page: _this4.triggerOnChange(prevState.page + 1, e)
					};
				}
				return {};
			});
		}
	}, {
		key: 'last',
		value: function last(e) {
			var _this5 = this;

			this.setState(function (prevState) {
				if (prevState.page < _this5.props.totalPages - 1) {
					return {
						page: _this5.triggerOnChange(_this5.props.totalPages - 1, e)
					};
				}
				return {};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var page = this.state.page;

			var first = page === 0;
			var last = page === this.props.totalPages - 1;
			var title = this.props.titles ? this.props.titles(page) : page + 1 + ' of ' + this.props.totalPages;

			return _react2.default.createElement(
				'ul',
				{ className: 'pager' },
				_react2.default.createElement(
					'li',
					{
						className: 'first ' + (first ? 'disabled' : ''),
						onClick: this.first.bind(this)
					},
					_react2.default.createElement(
						'a',
						null,
						'First'
					)
				),
				_react2.default.createElement(
					'li',
					{
						className: 'back ' + (first ? 'disabled' : ''),
						onClick: this.back.bind(this)
					},
					_react2.default.createElement(
						'a',
						null,
						'Back'
					)
				),
				_react2.default.createElement(
					'li',
					{ className: 'current' },
					_react2.default.createElement(
						'a',
						null,
						title
					)
				),
				_react2.default.createElement(
					'li',
					{
						className: 'next ' + (last ? 'disabled' : ''),
						onClick: this.next.bind(this)
					},
					_react2.default.createElement(
						'a',
						null,
						'Next'
					)
				),
				_react2.default.createElement(
					'li',
					{
						className: 'last ' + (last ? 'disabled' : ''),
						onClick: this.last.bind(this)
					},
					_react2.default.createElement(
						'a',
						null,
						'Last'
					)
				)
			);
		}
	}]);

	return Pager;
}(_react.Component);

exports.default = Pager;


Pager.propTypes = {
	page: _propTypes2.default.number,
	totalPages: _propTypes2.default.number.isRequired,
	onChange: _propTypes2.default.func,
	titles: _propTypes2.default.func
};

Pager.defaultProps = {
	page: 0
};