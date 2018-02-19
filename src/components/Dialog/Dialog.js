import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Measure from 'react-measure'
import Button from '../Button/Button'

export default class Dialog extends Component {
	constructor(props) {
		super(props)
		this.showing = false
		this.wrapper = false
		this.state = {
			top: -1,
			left: -1,
			width: -1,
			height: 500,
			opacity: 0
		}

		// for resize callbacks
		this.position = this.position.bind(this)
	}
	componentDidUpdate(prevProps, prevState) {
		if (!this.showing && this.props.show) {
			this.position()
		}
		this.showing = this.props.show
	}
	position() {
		if (!this.wrapper) return
		// don't resize if we are not showing
		let positionedParent
		let node = this.wrapper.parentNode

		while (node && node !== document.body) {
			const pos = window
				.getComputedStyle(node)
				.getPropertyValue('position')
				.toLowerCase()

			if (pos === 'relative' || pos === 'absolute') {
				positionedParent = node
				node = null
			} else {
				node = node.parentNode
			}
		}

		let screenWidth,
			scrollTop = document.body.scrollTop

		const w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			screenHeight = w.innerHeight || e.clientHeight || g.clientHeight

		if (!positionedParent) {
			screenWidth = w.innerWidth || e.clientWidth || g.clientWidth
		} else {
			screenWidth = positionedParent.offsetWidth
			scrollTop = document.body.scrollTop - positionedParent.offsetTop
		}

		// center horizontally
		const width =
			this.state.width > 0 ? this.state.width : Math.min(500, screenWidth * 0.9)
		const left = (screenWidth - width) / 2
		const top =
			this.state.height >= screenHeight - 20
				? 20
				: scrollTop + (screenHeight - this.state.height) / 2

		this.setState({ left, top })
	}
	setSize({ width, height }) {
		this.setState({ width, height, opacity: 1 })
		this.position()
	}
	componentDidMount() {
		window.addEventListener('resize', this.position)
		this.position()
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.position)
	}
	render() {
		const { tag, children, className, show, onTapClose, ...props } = this.props
		const { top, left, opacity } = this.state
		const Tag = tag

		if (!show) {
			return null
		}

		return (
			<div
				ref={node => {
					this.wrapper = node
				}}
			>
				<div className={`dialog_underlay ${show ? 'on' : 'off'}`} />
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
						<Tag
							style={{ top, left, opacity }}
							ref={measureRef}
							className={`dialog ${className || ''} ${show ? 'on' : 'off'}`}
							{...props}
						>
							{onTapClose && (
								<Button
									className="btn__close_dialog"
									remove
									onClick={onTapClose}
								/>
							)}
							{children}
						</Tag>
					)}
				</Measure>
			</div>
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
