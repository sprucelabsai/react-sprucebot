import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Pager extends Component {
	constructor(props) {
		super(props)

		// Starting page
		this.state = {
			page: props.page
		}
	}
	triggerOnChange(page, e) {
		if (this.props.onChange) {
			this.props.onChange(page, e)
		}
		return page
	}
	first(e) {
		this.setState(prevState => {
			if (prevState.page > 0) {
				return {
					page: this.triggerOnChange(0, e)
				}
			}
			return {}
		})
	}
	back(e) {
		this.setState(prevState => {
			if (prevState.page > 0) {
				return {
					page: this.triggerOnChange(prevState.page - 1, e)
				}
			}
			return {}
		})
	}
	next(e) {
		this.setState(prevState => {
			if (prevState.page < this.props.totalPages - 1) {
				return {
					page: this.triggerOnChange(prevState.page + 1, e)
				}
			}
			return {}
		})
	}
	last(e) {
		this.setState(prevState => {
			if (prevState.page < this.props.totalPages - 1) {
				return {
					page: this.triggerOnChange(this.props.totalPages - 1, e)
				}
			}
			return {}
		})
	}
	render() {
		const { page } = this.state
		const first = page === 0
		const last = page === this.props.totalPages - 1
		const title = this.props.titles
			? this.props.titles(page)
			: `${page + 1} of ${this.props.totalPages}`

		return (
			<ul className="pager">
				<li
					className={`first ${first ? 'disabled' : ''}`}
					onClick={this.first.bind(this)}
				>
					<a>First</a>
				</li>
				<li
					className={`back ${first ? 'disabled' : ''}`}
					onClick={this.back.bind(this)}
				>
					<a>Back</a>
				</li>
				<li className="current">
					<a>{title}</a>
				</li>
				<li
					className={`next ${last ? 'disabled' : ''}`}
					onClick={this.next.bind(this)}
				>
					<a>Next</a>
				</li>
				<li
					className={`last ${last ? 'disabled' : ''}`}
					onClick={this.last.bind(this)}
				>
					<a>Last</a>
				</li>
			</ul>
		)
	}
}

Pager.propTypes = {
	page: PropTypes.number,
	totalPages: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	titles: PropTypes.func
}

Pager.defaultProps = {
	page: 0
}
