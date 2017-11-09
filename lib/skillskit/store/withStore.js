'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withStore;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _apiClient = require('./apiClient');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _clientApiMiddleware = require('./middleware/clientApiMiddleware');

var _clientApiMiddleware2 = _interopRequireDefault(_clientApiMiddleware);

var _loggerMiddleware = require('./middleware/loggerMiddleware');

var _loggerMiddleware2 = _interopRequireDefault(_loggerMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var required = function required(name) {
	throw new Error(name + ' is required to createStore');
};

function createStore(_ref) {
	var _ref$reducers = _ref.reducers,
	    reducers = _ref$reducers === undefined ? {} : _ref$reducers,
	    config = _ref.config;

	return function (initialState) {
		// Allow for redux debugger
		// https://github.com/zalmoxisus/redux-devtools-extension#usage
		var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

		var client = (0, _apiClient2.default)(config.SERVER_HOST, {
			allowSelfSignedCerts: config.INTERFACE_SSL_ALLOW_SELF_SIGNED
		});
		var enhancer = composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _clientApiMiddleware2.default)(client), (0, _loggerMiddleware2.default)()));

		var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), _extends({}, initialState, {
			config: config
		}), enhancer);

		if (module.hot) {
			// Enable hot module replacement for reducers
			module.hot.accept(function () {
				var nextRootReducer = require('./reducers/index').default;
				store.replaceReducer(nextRootReducer);
			});
		}

		return store;
	};
}

var mapStateToProps = function mapStateToProps(state) {
	var map = {};

	for (var k in state) {
		map[k] = state[k] || {};
	}

	return map;
};

/**
 * Higher order component
 * Decorates Component with props
 *  {store, client}
 *
 * @export
 * @param {any} Component
 * @returns
 */

function withStore(Component, _ref2) {
	var actions = _ref2.actions,
	    reducers = _ref2.reducers,
	    config = _ref2.config;

	var unboundActions = _extends({}, _actions2.default, actions);
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
		var map = {};
		for (var k in unboundActions) {
			map[k] = (0, _redux.bindActionCreators)(unboundActions[k], dispatch);
		}

		return {
			actions: map
		};
	};

	var allReducers = _extends({}, _reducers2.default, reducers);

	return (0, _nextReduxWrapper2.default)({
		createStore: createStore({
			reducers: allReducers,
			config: config
		}),
		storeKey: '__SPRUCEBOT_SKILL_STORE__',
		debug: false,
		mapStateToProps: mapStateToProps,
		mapDispatchToProps: mapDispatchToProps
	})(Component);
}