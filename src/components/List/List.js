import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'

export const List = styled.div.attrs({
	className: 'item__list'
})``

export class ListItem extends Component {
	render() {
		const props = Object.assign({}, this.props)
		let {
			className,
			children,
			title,
			subtitle,
			rightInput,
			rightTitle,
			rightSubtitle,
			online,
			avatar
		} = props

		// cleanup props for pass through
		delete props.className
		delete props.children
		delete props.title
		delete props.subtitle
		delete props.rightInput
		delete props.rightTitle
		delete props.rightSubtitle
		delete props.online
		delete props.avatar

		// setup class name
		className = `${className || ''} item__list__item ${online ? '' : 'offline'}`

		// build children
		children = children || []
		if (!Array.isArray(children)) {
			children = [children]
		}

		// setup title/subtitle
		if (subtitle) {
			children.unshift(
				<div key="subtitle" className="sub__title">
					{subtitle}
				</div>
			)
		}

		if (title) {
			children.unshift(
				<div key="title" className="title">
					{title}
				</div>
			)
		}

		return (
			<div className={className} {...props}>
				{avatar && (
					<div className="avatar__outer__wrapper">
						<Avatar online={online} image={avatar} />
					</div>
				)}
				{children && <div className="item__details">{children}</div>}
				{(rightTitle || rightSubtitle || rightInput) && (
					<div className="content__right">
						{rightInput && rightInput}
						{rightTitle && <div className="title">{rightTitle}</div>}
						{rightSubtitle && <div className="sub__title">{rightSubtitle}</div>}
					</div>
				)}
			</div>
		)
	}
}

ListItem.propTypes = {
	friend: PropTypes.object,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	rightInput: PropTypes.any,
	rightTitle: PropTypes.any,
	rightSubtitle: PropTypes.any,
	online: PropTypes.bool,
	avatar: PropTypes.string
}

ListItem.defaultProps = {
	online: true
}
