import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Stars extends Component {
	constructor(props) {
		super(props)
		this.state = {
			score: props.score,
			hover: 0
		}
	}
	onClickStar(score, e) {
		this.setState(prevState => {
			if (prevState.score !== score) {
				if (this.props.onChange) {
					this.props.onChange(score, e)
				}
				return {
					score
				}
			}

			return {}
		})
	}
	onMouseOverStar(score, e) {
		this.setState({
			hover: score
		})
	}
	onMouseLeave(e) {
		this.setState({
			hover: 0
		})
	}
	render() {
		const props = Object.assign({}, this.props)
		const { max, onChange } = props
		let { score, hover } = this.state

		// just round for score until halves are possible
		score = Math.round(score)

		if (hover > 0) {
			score = hover
		}

		delete props.score
		delete props.max
		delete props.onChange

		const stars = []
		for (let idx = 1; idx <= max; idx++) {
			stars.push(
				<div
					onMouseOver={e => {
						this.onMouseOverStar(idx, e)
					}}
					onClick={e => {
						this.onClickStar(idx, e)
					}}
					key={`star-${idx}`}
					className={`star ${score >= idx ? 'active' : ''}`}
				/>
			)
		}

		return (
			<div
				className="stars"
				{...props}
				onMouseLeave={e => {
					this.onMouseLeave(e)
				}}
			>
				{stars}
			</div>
		)
	}
}

Stars.propTypes = {
	score: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func
}

Stars.defaultProps = {
	max: 5,
	score: 0,
	onChange: (score, e) => {}
}
