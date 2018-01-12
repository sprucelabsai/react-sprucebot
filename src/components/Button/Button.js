import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'

// TODO refactor into styled component
export default class Button extends Component {
	render() {
		const {
			tag,
			busy,
			disabled,
			primary,
			secondary,
			alt,
			link,
			caution,
			className,
			children,
			submit,
			href,
			remove,
			toggle,
			...props
		} = this.props

		if (primary && secondary) {
			return (
				<button className="btn__primary">
					'primary' and 'secondary' are mutually exclusive.
				</button>
			)
		} else if (primary && alt) {
			return (
				<button className="btn__primary">
					'primary' and 'alt' are mutually exclusive.
				</button>
			)
		}

		let btnClass = primary ? 'btn__primary' : ''
		btnClass += secondary ? 'btn__secondary' : ''
		btnClass += alt && btnClass.length > 0 ? '__alt' : ''
		btnClass += alt && btnClass.length === 0 ? 'btn__alt' : ''
		btnClass += disabled ? ' btn__disabled' : ''
		btnClass += caution ? ' btn__caution' : ''
		btnClass += link ? ' btn__link' : ''
		btnClass += toggle ? 'btn__toggle' : ''

		if (remove) {
			btnClass = 'btn__remove'
		} else if (!btnClass) {
			btnClass = 'btn'
		}

		// if this button has a href or is a "remove" button, make it an anchor
		const Tag = href || remove ? 'a' : tag

		return (
			<Tag className={`${btnClass} ${className || ''}`} {...props}>
				{busy ? <Loader dark={false} fullWidth={false} /> : children}
			</Tag>
		)
	}
}

Button.propTypes = {
	tag: PropTypes.string,
	primary: PropTypes.bool,
	alt: PropTypes.bool,
	secondary: PropTypes.bool,
	busy: PropTypes.bool,
	href: PropTypes.string,
	remove: PropTypes.bool,
	toggle: PropTypes.bool
}

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false,
	remove: false,
	toggle: false
}
