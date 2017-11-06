import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StatsSlider extends Component {
	render() {
		let props = Object.assign({}, this.props)
		let statCards = []

		const { stats, className } = props

		delete props.stats
		delete props.className

		stats.forEach((stat, idx) => {
			statCards.push(
				<div key={`stat-${idx}`} className="stat__card">
					{stat.dir !== 0 && (
						<div className={`icon ${stat.dir > 0 ? 'up' : ''}`} />
					)}
					<div className="value">{stat.value}</div>
					<div className="title">{stat.title}</div>
				</div>
			)
		})

		return (
			<div className={`stat__card__slider ${className || ''}`}>
				<div className="stat__card__slider__scroll">{statCards}</div>
			</div>
		)
	}
}

StatsSlider.propTypes = {
	stats: PropTypes.array.isRequired
}

StatsSlider.defaultProps = {}
