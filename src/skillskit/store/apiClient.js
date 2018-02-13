import fetch from 'isomorphic-fetch'
import https from 'https'
import http from 'http'
import qs from 'qs'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

class ApiClient {
	constructor(endpoint, { allowSelfSignedCerts = false }) {
		this.jwt = undefined
		this.ssl = endpoint.search('https') === 0
		this.endpoint = endpoint
		this.allowSelfSignedCerts = allowSelfSignedCerts

		methods.forEach(method => {
			this[method.toLowerCase()] = (path, options = {}) =>
				new Promise(async (resolve, reject) => {
					const { body, query } = options
					try {
						let headers = {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						}

						let fetchOptions = {
							method,
							headers,
							body: JSON.stringify(body)
						}

						// Allows Node to accept our self signed cert
						if (this.ssl && this.allowSelfSignedCerts) {
							const agent = new https.Agent({
								rejectUnauthorized: false
							})
							fetchOptions.agent = agent
						}

						if (this.jwt) {
							fetchOptions.headers['x-skill-jwt'] = this.jwt
						}

						let fetchUrl = `${endpoint}${path}`

						if (query) {
							fetchUrl =
								// determine if we're appending or creating a query string
								fetchUrl.indexOf('?') > -1
									? `${fetchUrl}${qs.stringify(query)}`
									: `${fetchUrl}?${qs.stringify(query)}`
						}

						// Start network request
						const response = await fetch(fetchUrl, fetchOptions)
						const json = await response.json()
						if (!response.ok) {
							console.log('Request not okay', response.status, json)
							return reject(json)
						}

						resolve(json)
					} catch (error) {
						console.error('Response failure', error)
						reject(error)
					}
				})
		})
	}

	setJwt(jwt) {
		this.jwt = jwt
	}
}

/**
 * Creates a new api client to manage network requests
 * @param {string} host
 * @example createClient('https://www.example.com')
 * @returns {ApiClient}
 */
export default (host, options) => new ApiClient(host, options)
