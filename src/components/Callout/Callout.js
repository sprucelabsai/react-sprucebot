import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Callout extends Component {
	render() {
		const { tag, children, className, on, ...props } = this.props
		const Tag = tag

		return (
			<div>
				<div className={`callout_underlay ${on ? 'on' : 'off'}`} />
				<Tag
					className={`callout ${className || ''} ${on ? 'on' : 'off'}`}
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
	on: PropTypes.bool
}

Callout.defaultProps = {
	tag: 'div',
	on: true
}
