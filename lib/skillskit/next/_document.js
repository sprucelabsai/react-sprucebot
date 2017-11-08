'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _document = require('next/document');

var _document2 = _interopRequireDefault(_document);

var _styledComponents = require('styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyDocument = function (_Document) {
	_inherits(MyDocument, _Document);

	function MyDocument() {
		_classCallCheck(this, MyDocument);

		return _possibleConstructorReturn(this, (MyDocument.__proto__ || Object.getPrototypeOf(MyDocument)).apply(this, arguments));
	}

	_createClass(MyDocument, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'html',
				{ className: 'skill' },
				_react2.default.createElement(
					_document.Head,
					null,
					_react2.default.createElement(
						'title',
						null,
						this.props.name
					),
					_react2.default.createElement('link', {
						href: 'https://hello.sprucebot.com/skills.css',
						rel: 'stylesheet',
						type: 'text/css',
						charSet: 'UTF-8'
					}),
					this.props.styleTags,
					this.props.whitelabel && _react2.default.createElement('link', {
						href: this.props.whitelabel,
						rel: 'stylesheet',
						type: 'text/css',
						charSet: 'UTF-8'
					})
				),
				_react2.default.createElement(
					'body',
					null,
					_react2.default.createElement(_document.Main, null),
					_react2.default.createElement(_document.NextScript, null)
				)
			);
		}
	}], [{
		key: 'getInitialProps',
		value: async function getInitialProps(_ref) {
			var renderPage = _ref.renderPage,
			    query = _ref.query,
			    store = _ref.store;

			// Build stylesheets from styled-components
			var sheet = new _styledComponents.ServerStyleSheet();
			var auth = store && store.getState().auth;
			var whitelabel = false;

			//we have any whitelabelling happening?
			if (auth && auth.Location && auth.Location.Organization && auth.Location.Organization.allowWhiteLabelling && auth.Location.Organization.whiteLabellingStylesheetUrl) {
				whitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl;
			}

			var page = renderPage(function (App) {
				return function (props) {
					return sheet.collectStyles(_react2.default.createElement(App, props));
				};
			});
			var styleTags = sheet.getStyleElement();

			return _extends({}, page, { styleTags: styleTags, whitelabel: whitelabel, auth: auth });
		}
	}]);

	return MyDocument;
}(_document2.default);

exports.default = MyDocument;