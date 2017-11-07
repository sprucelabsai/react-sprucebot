'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Select = require('../Select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevControls = function (_Component) {
	_inherits(DevControls, _Component);

	function DevControls(props) {
		_classCallCheck(this, DevControls);

		var _this = _possibleConstructorReturn(this, (DevControls.__proto__ || Object.getPrototypeOf(DevControls)).call(this, props));

		_this.state = {
			loaded: false
		};
		return _this;
	}

	_createClass(DevControls, [{
		key: 'onChangeRole',
		value: function onChangeRole(role) {
			window.location.href = '/dev/' + role + '/redirect';
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				loaded: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			// don't render until loaded
			if (!this.state.loaded) {
				return null;
			}

			var props = Object.assign({}, this.props);
			var auth = props.auth;

			// cleanup props

			delete props.auth;

			//easy bail if not auth'ed
			if (!auth || auth.error || !auth.role) {
				return _react2.default.createElement(
					'div',
					props,
					_react2.default.createElement(
						'div',
						{ className: 'error' },
						'Your skill must be enabled and viewed through Sprucebot to get dev\'ing.'
					)
				);
			}

			return _react2.default.createElement(
				'div',
				props,
				_react2.default.createElement(
					_Select2.default,
					{ label: 'Jump to Role', onChange: this.onChangeRole.bind(this) },
					_react2.default.createElement(
						'option',
						{ value: '' },
						'Current: ',
						auth.role
					),
					_react2.default.createElement(
						'option',
						{ value: 'owner' },
						'Owner'
					),
					_react2.default.createElement(
						'option',
						{ value: 'teammate' },
						'Teammate'
					),
					_react2.default.createElement(
						'option',
						{ value: 'guest' },
						'Guest'
					)
				)
			);
		}
	}]);

	return DevControls;
}(_react.Component);

DevControls.propTypes = {
	auth: _propTypes2.default.object
};

exports.default = (0, _styledComponents2.default)(DevControls).withConfig({
	displayName: 'DevControls',
	componentId: 's18fkinm-0'
})(['-webkit-transition:all 0.5s ease-out;-moz-transition:all 0.5s ease-out;-ms-transition:all 0.5s ease-out;-o-transition:all 0.5s ease-out;transition:all 0.5s ease-out;&:hover{opacity:1;}position:absolute;background-color:#000;color:#fff;padding:20px;opacity:0.1;.input__wrapper{margin:0;padding-top:15px;white-space:nowrap;}select{margin:0;display:inline;padding:10px;height:auto;border-radius:5px;background:#fff;width:auto;}']);