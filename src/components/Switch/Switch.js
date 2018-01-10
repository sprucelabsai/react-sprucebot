import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Switch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			on: !!props.on
		}
	}
	onChange(e) {
		// toggle on state of button
		this.setState((prevState, props) => {
			// new 'on' state
			let on = !prevState.on

			// let any callbacks know of state change
			if (this.props.onChange) {
				this.props.onChange(on, e)
			}

			return {
				on: on
			}
		})
	}
	render() {
		const props = Object.assign({}, this.props)

		let className = (props.className || '') + ' switch'

		delete props.className
		delete props.on
		delete props.onChange
		delete props.children

		// are we on?
		if (this.state.on) {
			className += ' on'
		}

		return (
			<div
				className={className}
				{...props}
				onMouseUp={this.onChange.bind(this)}
			>
				<button type="button" />
			</div>
		)
	}
}

Switch.propTypes = {
	on: PropTypes.bool,
	onChange: PropTypes.func
}

Switch.defaultProps = {
	on: false,
	onChange: e => {}
}
