import styled, { css } from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'

export const List = styled.div.attrs({
	className: 'List item__list'
})`
	${props => (props.pile ? 'padding-bottom: 1.25em' : void 0)};
`

const ListItemWrapper = styled.div.attrs({
	className: ({ className, online }) =>
		`${className || ''} ListItemWrapper item__list__item ${
			online ? '' : 'offline'
		}`
})`
	display: flex;
	${props =>
		props.alignItems
			? `align-items: ${props.alignItems}`
			: 'align-items: center;'};
	${props => (props.online ? `` : 'opacity: .4;')};
`

const ItemAvatar = styled.div.attrs({
	className: 'ItemAvatar avatar__outer__wrapper'
})`
	position: relative;
	margin: 0 10px 0 0;
	border-radius: 50%;
	${props =>
		props.alignItems
			? `align-items: ${props.alignItems}`
			: 'align-items: center;'};
`

const ItemDetail = styled.div.attrs({
	className: 'ItemDetail item__details'
})`
	flex-grow: 1;
`

const ItemRightContent = styled.div.attrs({
	className: 'ItemRightContent content__right'
})`
	text-align: right;
	display: flex;
	align-items: flex-end;
`

const ItemTitle = styled.div.attrs({
	className: 'ItemTitle title'
})`
	${props =>
		props.weight ? `font-weight: ${props.weight}` : `font-weight: 500;`};
`

const ItemSubTitle = styled.div.attrs({
	className: 'ItemSubTitle sub__title'
})`
	font-size: 0.75em;
`

export class ListItem extends Component {
	render() {
		let {
			className,
			children,
			title,
			subtitle,
			rightInput,
			rightTitle,
			rightSubtitle,
			online,
			avatar,
			showOnlineIndicator,
			alignItems,
			...props
		} = this.props

		// build children
		children = children || []
		if (!Array.isArray(children)) {
			children = [children]
		}

		// setup title/subtitle
		if (subtitle) {
			children.unshift(<ItemSubTitle key="subtitle">{subtitle}</ItemSubTitle>)
		}

		if (title) {
			children.unshift(<ItemTitle key="title">{title}</ItemTitle>)
		}

		return (
			<ListItemWrapper {...this.props}>
				{avatar && (
					<ItemAvatar alignItems={alignItems}>
						{avatar === true ? (
							<Avatar
								online={online}
								showOnlineIndicator={showOnlineIndicator}
							/>
						) : (
							<Avatar
								online={online}
								image={avatar}
								showOnlineIndicator={showOnlineIndicator}
							/>
						)}
					</ItemAvatar>
				)}
				{children && <ItemDetail>{children}</ItemDetail>}
				{(rightTitle || rightSubtitle || rightInput) && (
					<ItemRightContent alignItems={alignItems}>
						{rightInput && rightInput}
						{rightTitle && <ItemTitle weight={400}>{rightTitle}</ItemTitle>}
						{rightSubtitle && <ItemSubTitle>{rightSubtitle}</ItemSubTitle>}
					</ItemRightContent>
				)}
			</ListItemWrapper>
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
	avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	showOnlineIndicator: PropTypes.bool,
	alignItems: PropTypes.string
}

ListItem.defaultProps = {
	online: true,
	showOnlineIndicator: true
}
