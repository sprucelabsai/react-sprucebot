import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'
import BotText from '../BotText/BotText'
import Avatar from '../Avatar/Avatar'
import moment from 'moment'
import { SectionHeading } from '../Typography/Typography'

export default class Feed extends Component {
	render() {
		const { loading, data, ...props } = this.props
		let lastDay = 0
		return (
			<div {...props} className="feed__wrapper">
				{loading && <Loader />}
				{data &&
					data.map(item => {
						const day = moment(item.createdAt).dayOfYear()
						let header = undefined
						if (day !== lastDay) {
							lastDay = day
							header = moment(item.createdAt).isSame(new Date(), 'day')
								? 'Today'
								: moment(item.createdAt).format('MMM Do')
						}
						return <FeedItem key={item.id} {...item} header={header} />
					})}
			</div>
		)
	}
}

Feed.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool
}

Feed.defaultProps = {
	loading: false
}

export class FeedItem extends Component {
	render() {
		return (
			<div className={`feed__item ${this.props.bigAvatar ? 'big_avatar' : ''}`}>
				{this.props.header && (
					<SectionHeading>{this.props.header}</SectionHeading>
				)}
				{this.props.user && (
					<div className="feed__avatar">
						<Avatar
							top={this.props.bigAvatar}
							image={
								this.props.user.User.profileImages
									? this.props.user.User.profileImages.profile60
									: this.props.user.User.defaultProfileImages.profile60
							}
						/>
					</div>
				)}
				<BotText>
					{this.props.message}
					<span className="date">
						{moment(this.props.createdAt).calendar()}
					</span>
				</BotText>
				{this.props.attachments && (
					<div className="feed__attachments">
						{this.props.attachments.map((attachment, idx) => (
							<FeedAttachment
								key={`attachment-${idx}`}
								title={attachment.title}
								value={attachment.value}
							/>
						))}
					</div>
				)}
			</div>
		)
	}
}

FeedItem.propTypes = {
	header: PropTypes.string,
	createdAt: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
	user: PropTypes.object,
	attachments: PropTypes.array,
	bigAvatar: PropTypes.bool
}

export class FeedAttachment extends Component {
	render() {
		return (
			<div className="feed__attachment">
				<div className="title">{this.props.title}</div>
				<div className="value">{this.props.value}</div>
			</div>
		)
	}
}

FeedAttachment.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired
}
