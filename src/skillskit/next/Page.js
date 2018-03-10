import React, { Component } from 'react'

import * as actions from '../store/actions'
import ServerCookies from 'cookies'
import ClientCookies from 'js-cookies'
import skill from '../index'
import DevControls from '../../components/DevControls/DevControls'
import Loader from '../../components/Loader/Loader'
import qs from 'qs'
import lang from '../helpers/lang'
const debug = require('debug')('react-sprucebot')

const setCookie = (named, value, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, { secure: true })
		return cookies.set(named, value)
	} else {
		return ClientCookies.setItem(named, value)
	}
}

const getCookie = (named, req, res) => {
	if (req && req.headers) {
		const cookies = new ServerCookies(req, res, { secure: true })
		return cookies.get(named)
	} else {
		return ClientCookies.getItem(named)
	}
}

const Page = Wrapped => {
	// const ConnectedWrapped = connect(mapStateToProps, mapDispatchToProps)(Wrapped)
	const ConnectedWrapped = Wrapped

	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				attemptingReAuth: !!props.attemptingReAuth
			}

			this.messageHandler = this.messageHandler.bind(this)
		}
		// Everything here is run server side
		static async getInitialProps({
			pathname,
			query,
			asPath,
			store,
			res,
			req,
			isServer
		}) {
			let props = { pathname, query, asPath, skill }

			const jwt = query.jwt || getCookie('jwt', req, res)
			if (jwt) {
				try {
					await store.dispatch(actions.auth.go(jwt))

					// only save cookie if a new one has been passed
					if (query.jwt) {
						setCookie('jwt', query.jwt, req, res)
					}
				} catch (err) {
					debug(err)
					debug('Error fetching user from jwt')
				}
			} else {
				debug(
					'This looks pretty bad. You are missing a jwt and will probably be unauthorized'
				)
			}

			const state = store.getState()

			if (state.auth && !state.auth.error) {
				state.auth.role =
					(state.config.DEV_MODE && getCookie('devRole', req, res)) ||
					state.auth.role
			}

			if (ConnectedWrapped.getInitialProps) {
				const args = Array.from(arguments)
				args[0] = { ...args[0], ...state }
				props = {
					...props,
					...(await ConnectedWrapped.getInitialProps.apply(this, args))
				}
			}

			let redirect = props.redirect || false

			if (query.back && query.jwt && query.back.search('sprucebot.com') > 0) {
				// if there is a jwt, we are being authed
				redirect = query.back
			} else if (
				!redirect &&
				!props.public &&
				(!state.auth || !state.auth.role || state.auth.error)
			) {
				// no redirect is set, we're not public, but auth failed
				redirect = '/unauthorized'
			} else if (!redirect && !props.public) {
				// all things look good, lets just make sure we're in the right area (owner, teammate, or guest)
				const role = state.auth.role
				const firstPart = props.pathname.split('/')[1]

				const { jwt, ...rest } = query
				const queryString = qs.stringify(rest)

				// we are at '/' then redirect to the corresponding role's path
				if (props.pathname === '/') {
					redirect = `/${role}?${queryString}`
				} else if (role !== firstPart) {
					redirect = `/unauthorized`
				}
			}

			if (redirect && res) {
				res.writeHead(302, {
					Location: redirect
				})
				res.end()
				res.finished = true
				return
			} else if (redirect) {
				window.location.href = redirect
			}

			// if we are /unauthorized, don't have a cookie, but have NOT done cookie check
			if (
				props.pathname === '/unauthorized' &&
				(!state.auth || !state.auth.role)
			) {
				props.attemptingReAuth = true
			}

			// We can only return a plain object here because it is passed to the browser
			// No circular dependencies
			return props
		}

		messageHandler(e) {
			if (e.data === 'Skill:NotReAuthing') {
				this.setState({
					attemptingReAuth: false
				})
			}
		}
		async componentDidMount() {
			window.addEventListener('message', this.messageHandler)

			if (window.self === window.top || window.__SBTEAMMATE__) {
				// make sure we are being loaded inside sb
				console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL')
				this.setState({
					attemptingReAuth: false
				})
			} else if (this.props.attemptingReAuth) {
				skill.forceAuth()
			}
		}

		componentWillUnmount() {
			window.removeEventListener('message', this.messageHandler)
		}

		render() {
			if (this.state.attemptingReAuth) {
				return <Loader />
			}
			if (this.props.config.DEV_MODE) {
				return (
					<div>
						<DevControls auth={this.props.auth} />
						<ConnectedWrapped {...this.props} skill={skill} lang={lang} />
					</div>
				)
			}
			return <ConnectedWrapped {...this.props} skill={skill} lang={lang} />
		}
	}
}

export default Wrapped => Page(Wrapped)
