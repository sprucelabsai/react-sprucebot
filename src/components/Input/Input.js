import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paragraph as P } from '../Typography/Typography'

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasValue: !!(props.value || props.defaultValue)
		}
	}
	onChange(e) {
		this.setState({
			hasValue: this.input.value.length > 0
		})
		if (this.props.onChange) {
			this.props.onChange(this.input.value, e)
		}
		if (this.props.multiline) {
			this.sizeTextarea()
		}
	}
	sizeTextarea() {
		if (typeof window !== 'undefined') {
			const style = window.getComputedStyle(this.input)
			let heightOffset =
				parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)

			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0
			}

			const height = style.height
			this.input.style.transition = 'none'
			this.input.style.height = '1px'

			const scrollHeight = this.input.scrollHeight
			this.input.style.height = height

			if (this._sizeTimeout) {
				clearTimeout(this._sizeTimeout)
			}

			this._sizeTimeout = setTimeout(() => {
				this.input.style.transition = this._textAreaTransition
				this.input.style.height = scrollHeight + heightOffset + 'px'
			}, 250)
		}
	}
	componentDidMount() {
		if (this.props.multiline) {
			this._textAreaTransition = this.input.style.transition
			this.sizeTextarea()
		}
	}
	render() {
		const props = Object.assign({}, this.props)
		const { error, label, finePrint, multiline } = props
		let { tag } = props
		let labelClass = label ? 'js-show-label' : ''

		delete props.error
		delete props.label
		delete props.onChange
		delete props.finePrint
		delete props.tag
		delete props.multiline

		// inputs cannot have children
		if (multiline) {
			tag = 'textarea'
		} else if (tag === 'input') {
			delete props.children
		}

		// if this is an empty input, has a label, but no placeholder
		// make the placeholder match the label and hide the label
		if (
			tag === 'input' &&
			label &&
			!props.placeholder &&
			!this.state.hasValue
		) {
			props.placeholder = label
			labelClass = ''
		}

		const Tag = tag

		return (
			<div className="input__wrapper">
				{label && (
					<span className={'input__mini__label ' + labelClass}>{label}</span>
				)}
				<Tag
					{...props}
					onChange={this.onChange.bind(this)}
					ref={ref => {
						this.input = ref
					}}
				/>
				{error && (
					<span className="input__error error-is-visible">{error}</span>
				)}
				{finePrint && <P fine>{finePrint}</P>}
			</div>
		)
	}
}

Input.propTypes = {
	finePrint: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	tag: PropTypes.string,
	multiline: PropTypes.bool
}

Input.defaultProps = {
	tag: 'input',
	multiline: false
}
