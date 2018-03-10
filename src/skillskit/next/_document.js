import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
const debug = require('debug')('react-sprucebot')

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, query, store }) {
		// Build stylesheets from styled-components
		const sheet = new ServerStyleSheet()
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()
		// Store is undefined when hmr is the first
		// request the server sees after boot
		// Ideally store is always defined.
		// Revisit when using `next>5.0.0`
		if (!store) {
			debug('No store in _document')
			return { ...page, styleTags }
		}
		const { auth, config } = store.getState()
		let whitelabel = config.WHITELABEL

		let orgWhitelabel

		//we have any whitelabelling happening?
		if (
			auth &&
			auth.Location &&
			auth.Location.Organization &&
			auth.Location.Organization.allowWhiteLabelling &&
			auth.Location.Organization.whiteLabellingStylesheetUrl
		) {
			orgWhitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl
		}

		return { ...page, styleTags, whitelabel, auth, config, orgWhitelabel }
	}

	render() {
		let whitelabelClassName =
			this.props.config && this.props.config.SLUG
				? ` skill-${this.props.config.SLUG}`
				: ''
		return (
			<html className={`skill${whitelabelClassName}`}>
				<Head>
					<title>{this.props.name}</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link
						href={
							(this.props.config && this.props.config.SKILL_STYLESHEET) ||
							'https://hello.sprucebot.com/skills.css'
						}
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
					/>
					{this.props.styleTags}
					{this.props.whitelabel && (
						<link
							href={this.props.whitelabel}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
					{this.props.orgWhitelabel && (
						<link
							href={this.props.orgWhitelabel}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
