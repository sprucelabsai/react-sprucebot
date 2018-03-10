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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('react-sprucebot');

var MyDocument = function (_Document) {
	_inherits(MyDocument, _Document);

	function MyDocument() {
		_classCallCheck(this, MyDocument);

		return _possibleConstructorReturn(this, (MyDocument.__proto__ || Object.getPrototypeOf(MyDocument)).apply(this, arguments));
	}

	_createClass(MyDocument, [{
		key: 'render',
		value: function render() {
			var whitelabelClassName = this.props.config && this.props.config.SLUG ? ' skill-' + this.props.config.SLUG : '';
			return _react2.default.createElement(
				'html',
				{ className: 'skill' + whitelabelClassName },
				_react2.default.createElement(
					_document.Head,
					null,
					_react2.default.createElement(
						'title',
						null,
						this.props.name
					),
					_react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
					_react2.default.createElement('link', {
						href: this.props.config && this.props.config.SKILL_STYLESHEET || 'https://hello.sprucebot.com/skills.css',
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
					}),
					this.props.orgWhitelabel && _react2.default.createElement('link', {
						href: this.props.orgWhitelabel,
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
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
				var renderPage = _ref2.renderPage,
				    query = _ref2.query,
				    store = _ref2.store;

				var sheet, page, styleTags, _store$getState, auth, config, whitelabel, orgWhitelabel;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								// Build stylesheets from styled-components
								sheet = new _styledComponents.ServerStyleSheet();
								page = renderPage(function (App) {
									return function (props) {
										return sheet.collectStyles(_react2.default.createElement(App, props));
									};
								});
								styleTags = sheet.getStyleElement();
								// Store is undefined when hmr is the first
								// request the server sees after boot
								// Ideally store is always defined.
								// Revisit when using `next>5.0.0`

								if (store) {
									_context.next = 6;
									break;
								}

								debug('No store in _document');
								return _context.abrupt('return', _extends({}, page, { styleTags: styleTags }));

							case 6:
								_store$getState = store.getState(), auth = _store$getState.auth, config = _store$getState.config;
								whitelabel = config.WHITELABEL;
								orgWhitelabel = void 0;

								//we have any whitelabelling happening?

								if (auth && auth.Location && auth.Location.Organization && auth.Location.Organization.allowWhiteLabelling && auth.Location.Organization.whiteLabellingStylesheetUrl) {
									orgWhitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl;
								}

								return _context.abrupt('return', _extends({}, page, { styleTags: styleTags, whitelabel: whitelabel, auth: auth, config: config, orgWhitelabel: orgWhitelabel }));

							case 11:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getInitialProps(_x) {
				return _ref.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return MyDocument;
}(_document2.default);

exports.default = MyDocument;