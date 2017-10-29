import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Loader extends Component {
	render() {
		const { dark, fullWidth } = this.props
		const dotClassName = dark ? 'loader_dot_dark' : 'loader_dot'
		const fullWidthStyle = fullWidth
			? { display: 'block', margin: '20px', textAlign: 'center' }
			: {}

		return (
			<span className="loader_wrapper" style={fullWidthStyle}>
				<span className={dotClassName} />
				<span className={dotClassName} />
				<span className={dotClassName} />
			</span>
		)
	}
}

Loader.propTypes = {
	dark: PropTypes.bool,
	fullWidth: PropTypes.bool
}

Loader.defaultProps = {
	dark: true,
	fullWidth: true
}
