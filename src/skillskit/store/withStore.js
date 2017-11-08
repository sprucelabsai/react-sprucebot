import React from 'react'
import {
	createStore as createRedux,
	applyMiddleware,
	compose,
	bindActionCreators,
	combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import withRedux from 'next-redux-wrapper'
import coreActions from './actions'
import coreReducers from './reducers'
import apiClient from './apiClient'
import clientApiMiddleware from './middleware/clientApiMiddleware'
import loggerMiddleware from './middleware/loggerMiddleware'

const required = name => {
	throw new Error(`${name} is required to createStore`)
}

function createStore({ reducers = {}, config }) {
	return initialState => {
		// Allow for redux debugger
		// https://github.com/zalmoxisus/redux-devtools-extension#usage
		const composeEnhancers =
			(typeof window !== 'undefined' &&
				window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
			compose

		const client = apiClient(config.SERVER_HOST, {
			allowSelfSignedCerts: config.INTERFACE_SSL_ALLOW_SELF_SIGNED
		})
		const enhancer = composeEnhancers(
			applyMiddleware(thunk, clientApiMiddleware(client), loggerMiddleware())
		)

		const store = createRedux(
			combineReducers(reducers),
			{ ...initialState, config },
			enhancer
		)

		if (module.hot) {
			// Enable hot module replacement for reducers
			module.hot.accept(() => {
				const nextRootReducer = require('./reducers/index').default
				store.replaceReducer(nextRootReducer)
			})
		}

		return store
	}
}

const mapStateToProps = state => {
	let map = {}

	for (let k in state) {
		map[k] = state[k] || {}
	}

	return map
}

/**
 * Higher order component
 * Decorates Component with props
 *  {store, client}
 *
 * @export
 * @param {any} Component
 * @returns
 */

export default function withStore(Component, { actions, reducers, config }) {
	const unboundActions = { ...coreActions, ...actions }
	const mapDispatchToProps = dispatch => {
		let map = {}
		for (let k in unboundActions) {
			map[k] = bindActionCreators(unboundActions[k], dispatch)
		}

		return {
			actions: map
		}
	}

	const allReducers = { ...coreReducers, ...reducers }

	return withRedux({
		createStore: createStore({
			reducers: allReducers,
			config
		}),
		storeKey: '__SPRUCEBOT_SKILL_STORE__',
		debug: false,
		mapStateToProps,
		mapDispatchToProps
	})(Component)
}
