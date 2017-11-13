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
			value: async function componentDidMount() {
				window.addEventListener('message', this.messageHandler);

				if (window.self === window.top) {
					// make sure we are being loaded inside sb
					console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL');
					this.setState({
						attemptingReAuth: false
					});
				} else if (this.props.attemptingReAuth) {
					_index2.default.forceAuth();
				}
			}
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
						_react2.default.createElement(ConnectedWrapped, _extends({}, this.props, {
							skill: _index2.default,
							getText: _lang2.default.get.bind(_lang2.default)
						}))
					);
				}
				return _react2.default.createElement(ConnectedWrapped, _extends({}, this.props, {
					skill: _index2.default,
					getText: _lang2.default.get.bind(_lang2.default)
				}));
			}
		}], [{
			key: 'getInitialProps',
			value: async function getInitialProps(_ref) {
				var pathname = _ref.pathname,
				    query = _ref.query,
				    asPath = _ref.asPath,
				    store = _ref.store,
				    res = _ref.res,
				    req = _ref.req,
				    isServer = _ref.isServer;

				var props = { pathname: pathname, query: query, asPath: asPath, skill: _index2.default };

				var jwt = query.jwt || getCookie('jwt', req, res);
				if (jwt) {
					try {
						await store.dispatch(actions.auth.go(jwt));

						// only save cookie if a new one has been passed
						if (query.jwt) {
							setCookie('jwt', query.jwt, req, res);
						}
					} catch (err) {
						console.error(err);
						console.warn('Error fetching user from jwt');
					}
				}

				var state = store.getState();
				props = _extends({
					devMode: state.config.DEV_MODE
				}, props, state);

				if (props.auth && !props.auth.error) {
					props.auth.role = props.config.DEV_MODE && getCookie('devRole', req, res) || props.auth.role;
				}

				if (ConnectedWrapped.getInitialProps) {
					var args = Array.from(arguments);
					args[0] = _extends({}, props, args[0]);
					props = _extends({}, props, (await ConnectedWrapped.getInitialProps.apply(this, args)));
				}

				var redirect = props.redirect || false;

				// make sure we have a user AND a location if we are not flagged as public
				if (!redirect && !props.public && (!props.auth || !props.auth.role || props.auth.error)) {
					redirect = '/unauthorized';
				} else if (!redirect && !props.public) {
					// check role against first part of path
					var role = props.auth.role;
					var firstPart = props.pathname.split('/')[1];

					var _jwt = query.jwt,
					    rest = _objectWithoutProperties(query, ['jwt']);

					var queryString = _qs2.default.stringify(rest);

					// we are at '/' then redirect to the corresponding role's path
					if (query.back) {
						redirect = query.back;
					} else if (props.pathname === '/') {
						redirect = '/' + role + '?' + queryString;
					} else if (role !== firstPart) {
						redirect = '/unauthorized';
					}
				}

				if (redirect && res) {
					res.redirect = redirect;
					res.end();
					return;
				} else if (redirect) {
					window.location.href = redirect;
				}

				// if we are /unauthorized, don't have a cookie, but have NOT done cookie check
				if (props.pathname === '/unauthorized' && (!props.auth || !props.auth.role)) {
					props.attemptingReAuth = true;
				}

				// We can only return a plain object here because it is passed to the browser
				// No circular dependencies
				return props;
			}
		}]);

		return _class;
	}(_react.Component);
};

exports.default = function (Wrapped) {
	return Page(Wrapped);
};