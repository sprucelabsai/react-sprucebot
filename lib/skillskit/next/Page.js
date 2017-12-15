'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('../store/actions');

var actions = _interopRequireWildcard(_actions);

var _cookies = require('cookies');

var _cookies2 = _interopRequireDefault(_cookies);

var _jsCookies = require('js-cookies');

var _jsCookies2 = _interopRequireDefault(_jsCookies);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _DevControls = require('../../components/DevControls/DevControls');

var _DevControls2 = _interopRequireDefault(_DevControls);

var _Loader = require('../../components/Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _lang = require('../helpers/lang');

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var setCookie = function setCookie(named, value, req, res) {
	if (req && req.headers) {
		var cookies = new _cookies2.default(req, res, { secure: true });
		return cookies.set(named, value);
	} else {
		return _jsCookies2.default.setItem(named, value);
	}
};

var getCookie = function getCookie(named, req, res) {
	if (req && req.headers) {
		var cookies = new _cookies2.default(req, res, { secure: true });
		return cookies.get(named);
	} else {
		return _jsCookies2.default.getItem(named);
	}
};

var Page = function Page(Wrapped) {
	// const ConnectedWrapped = connect(mapStateToProps, mapDispatchToProps)(Wrapped)
	var ConnectedWrapped = Wrapped;

	return function (_Component) {
		_inherits(_class, _Component);

		function _class(props) {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

			_this.state = {
				attemptingReAuth: !!props.attemptingReAuth
			};

			_this.messageHandler = _this.messageHandler.bind(_this);
			return _this;
		}
		// Everything here is run server side


		_createClass(_class, [{
			key: 'messageHandler',
			value: function messageHandler(e) {
				if (e.data === 'Skill:NotReAuthing') {
					this.setState({
						attemptingReAuth: false
					});
				}
			}
		}, {
			key: 'componentDidMount',
			value: function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									window.addEventListener('message', this.messageHandler);

									if (window.self === window.top || window.__SBTEAMMATE__) {
										// make sure we are being loaded inside sb
										console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL');
										this.setState({
											attemptingReAuth: false
										});
									} else if (this.props.attemptingReAuth) {
										_index2.default.forceAuth();
									}

								case 2:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

				function componentDidMount() {
					return _ref.apply(this, arguments);
				}

				return componentDidMount;
			}()
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				window.removeEventListener('message', this.messageHandler);
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.state.attemptingReAuth) {
					return _react2.default.createElement(_Loader2.default, null);
				}
				if (this.props.devMode) {
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_DevControls2.default, { auth: this.props.auth }),
						_react2.default.createElement(ConnectedWrapped, _extends({}, this.props, { skill: _index2.default, lang: _lang2.default }))
					);
				}
				return _react2.default.createElement(ConnectedWrapped, _extends({}, this.props, { skill: _index2.default, lang: _lang2.default }));
			}
		}], [{
			key: 'getInitialProps',
			value: function () {
				var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
					var pathname = _ref3.pathname,
					    query = _ref3.query,
					    asPath = _ref3.asPath,
					    store = _ref3.store,
					    res = _ref3.res,
					    req = _ref3.req,
					    isServer = _ref3.isServer;

					var props,
					    jwt,
					    state,
					    args,
					    redirect,
					    role,
					    firstPart,
					    _jwt,
					    rest,
					    queryString,
					    _args2 = arguments;

					return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									props = { pathname: pathname, query: query, asPath: asPath, skill: _index2.default };
									jwt = query.jwt || getCookie('jwt', req, res);

									if (!jwt) {
										_context2.next = 13;
										break;
									}

									_context2.prev = 3;
									_context2.next = 6;
									return store.dispatch(actions.auth.go(jwt));

								case 6:

									// only save cookie if a new one has been passed
									if (query.jwt) {
										setCookie('jwt', query.jwt, req, res);
									}
									_context2.next = 13;
									break;

								case 9:
									_context2.prev = 9;
									_context2.t0 = _context2['catch'](3);

									console.error(_context2.t0);
									console.warn('Error fetching user from jwt');

								case 13:
									state = store.getState();

									props = _extends({
										devMode: state.config.DEV_MODE
									}, props, state);

									if (props.auth && !props.auth.error) {
										props.auth.role = props.config.DEV_MODE && getCookie('devRole', req, res) || props.auth.role;
									}

									if (!ConnectedWrapped.getInitialProps) {
										_context2.next = 26;
										break;
									}

									args = Array.from(_args2);

									args[0] = _extends({}, props, args[0]);
									_context2.t1 = _extends;
									_context2.t2 = {};
									_context2.t3 = props;
									_context2.next = 24;
									return ConnectedWrapped.getInitialProps.apply(this, args);

								case 24:
									_context2.t4 = _context2.sent;
									props = (0, _context2.t1)(_context2.t2, _context2.t3, _context2.t4);

								case 26:
									redirect = props.redirect || false;


									if (query.back && query.jwt && query.back.search('sprucebot.com') > 0) {
										// if there is a jwt, we are being authed
										redirect = query.back;
									} else if (!redirect && !props.public && (!props.auth || !props.auth.role || props.auth.error)) {
										// no redirect is set, we're not public, but auth failed
										redirect = '/unauthorized';
									} else if (!redirect && !props.public) {
										// all things look good, lets just make sure we're in the right area (owner, teammate, or guest)
										role = props.auth.role;
										firstPart = props.pathname.split('/')[1];
										_jwt = query.jwt, rest = _objectWithoutProperties(query, ['jwt']);
										queryString = _qs2.default.stringify(rest);

										// we are at '/' then redirect to the corresponding role's path

										if (props.pathname === '/') {
											redirect = '/' + role + '?' + queryString;
										} else if (role !== firstPart) {
											redirect = '/unauthorized';
										}
									}

									if (!(redirect && res)) {
										_context2.next = 35;
										break;
									}

									res.writeHead(302, {
										Location: redirect
									});
									res.end();
									res.finished = true;
									return _context2.abrupt('return');

								case 35:
									if (redirect) {
										window.location.href = redirect;
									}

								case 36:
									// if we are /unauthorized, don't have a cookie, but have NOT done cookie check
									if (props.pathname === '/unauthorized' && (!props.auth || !props.auth.role)) {
										props.attemptingReAuth = true;
									}

									// We can only return a plain object here because it is passed to the browser
									// No circular dependencies
									return _context2.abrupt('return', props);

								case 38:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, this, [[3, 9]]);
				}));

				function getInitialProps(_x) {
					return _ref2.apply(this, arguments);
				}

				return getInitialProps;
			}()
		}]);

		return _class;
	}(_react.Component);
};

exports.default = function (Wrapped) {
	return Page(Wrapped);
};