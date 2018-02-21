import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const switchContainerColorOff = '#d6d6d6'
const switchContainerColorOn = '#00C8EB'
const switchBtnColorOff = '#808080'
const switchBtnColorOn = '#0094AD'

const SwitchButton = styled.span.attrs({
	className: 'SwitchButton',
	type: 'button'
})`
	background: none;
	bottom: 0;
	height: 100%;
	left: 0;
	margin: 0;
	padding: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	&:before {
		background-color: ${switchBtnColorOff};
		border-radius: 50%;
		bottom: 0;
		content: '';
		height: 1.125em;
		left: 0.1875em;
		margin: auto;
		position: absolute;
		right: auto;
		top: 0;
		width: 1.125em;
		transition: transform 0.2s ease-out;
		${props =>
			props.on
				? `transform: translate(1.4375em, 0);
				background-color: ${switchBtnColorOn}`
				: `transition: transform 0.2s ease-out;`};
	}
`
const SwitchComp = styled.div.attrs({
	className: ({ className }) => `Switch switch ${className || ''}`
})`
	background-color: ${switchContainerColorOff};
	border-radius: 0.75em;
	height: 1.5em;
	position: relative;
	transition: background-color 0.3s ease-out;
	width: 3em;
	${props =>
		props.on
			? `background-color: ${switchContainerColorOn};`
			: `transition: transform 0.2s ease-out;`};
`

export default class Switch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			on: !!props.on
		}

		this.onChange = this.onChange.bind(this)
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

	componentWillReceiveProps(nextProps) {
		this.setState({ on: nextProps.on })
	}

	render() {
		const props = Object.assign({}, this.props)

		delete props.className
		delete props.on
		delete props.onChange
		delete props.children

		return (
			<SwitchComp on={this.props.on} {...props} onClick={this.onChange}>
				<SwitchButton on={this.props.on} />
			</SwitchComp>
		)
	}
}

Switch.propTypes = {
	on: PropTypes.bool,
	onChange: PropTypes.func
}

Switch.defaultProps = {
	on: false
}
