import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Alert extends Component {
	render() {
		const { tag, children, className, show, ...props } = this.props
		const Tag = tag

		if (!show) {
			return
		}

		return (
			<div>
				<div className={`alert_underlay ${on ? 'on' : 'off'}`} />
				<Tag
					className={`alert ${className || ''} ${on ? 'on' : 'off'}`}
					{...props}
				>
					{children}
				</Tag>
			</div>
		)
	}
}

Callout.propTypes = {
	tag: PropTypes.string,
	show: PropTypes.bool
}

Callout.defaultProps = {
	tag: 'div',
	show: false
}
