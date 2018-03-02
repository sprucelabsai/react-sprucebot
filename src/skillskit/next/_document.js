import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, query, store }) {
		// Build stylesheets from styled-components
		const sheet = new ServerStyleSheet()
		const { auth, config } = store && store.getState()

		let whitelabel = config.WHITELABEL

		//we have any whitelabelling happening?
		let orgWhitelabel
		if (
			auth &&
			auth.Location &&
			auth.Location.Organization &&
			auth.Location.Organization.allowWhiteLabelling &&
			auth.Location.Organization.whiteLabellingStylesheetUrl
		) {
			orgWhitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl
		}

		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()

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
