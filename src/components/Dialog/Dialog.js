import React, { Component } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Measure from 'react-measure'
import Button from '../Button/Button'

const DialogUnderlay = styled.div.attrs({
	className: ({ show }) =>
		classnames('dialog_underlay', show ? 'on' : 'off', 'container')
})`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: ${({ height }) => height + 40}px;
	padding: 20px;
`

const DialogContainer = styled.div.attrs({
	className: ({ show, className }) =>
		classnames('dialog', className, show ? 'on' : 'off')
})`
	transition: opacity 1s ease-in-out;
	opacity: ${({ opacity }) => opacity || 0};
	background-color: #fff;
	border-radius: 4px;
	z-index: 2;
	padding: 20px;
	margin: auto -20px;
	width: 90%;
	max-width: 500px;
`
const DialogCloseButton = styled(Button).attrs({
	className: 'btn__close_dialog',
	remove: true
})`
	display: block;
	position: absolute;
	top: 15px;
	right: 20px;
`

export default class Dialog extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: -1,
			height: 500
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.show !== nextProps.show) {
			setTimeout(() => this.setState({ opacity: nextProps.show ? 1 : 0 }), 100)
		}
	}
	setSize({ width, height }) {
		this.setState({ width, height })
	}
	render() {
		const { tag, children, className, show, onTapClose, ...props } = this.props
		const { opacity, height } = this.state
		const Tag = tag

		if (!show) {
			return null
		}

		return (
			<DialogUnderlay show={show} height={height}>
				<Measure
					bounds
					onResize={contentRect => {
						this.setSize({
							width: contentRect.bounds.width,
							height: contentRect.bounds.height
						})
					}}
				>
					{({ measureRef }) => (
						<DialogContainer
							innerRef={measureRef}
							className={className}
							show={show}
							opacity={opacity}
							{...props}
						>
							{onTapClose && <DialogCloseButton onClick={onTapClose} />}
							{children}
						</DialogContainer>
					)}
				</Measure>
			</DialogUnderlay>
		)
	}
}

Dialog.propTypes = {
	tag: PropTypes.string,
	show: PropTypes.bool,
	onTapClose: PropTypes.func
}

Dialog.defaultProps = {
	tag: 'div',
	show: false
}
