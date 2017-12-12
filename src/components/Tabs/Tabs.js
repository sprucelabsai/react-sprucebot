import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

export class Tabs extends Component {
	constructor(props) {
		super(props)

		// normalize children for some checks
		let children = props.children || []
		if (!Array.isArray(children)) {
			children = [children]
		}

		// default to first selected item
		let selected = props.selected || 0

		children.forEach((tab, idx) => {
			// lets make sure they are all tab panes
			if (!tab || !tab.type || tab.type.name !== 'TabPane') {
				throw new Error(
					"<Tabs> can only contain <TapPane>'s as children (none optional)"
				)
			}

			if (tab.props.selected) {
				selected = idx
			}
		})

		this.state = {
			selected: selected
		}
	}

	componentWillReceiveProps(nextProps) {
		if (
			typeof nextProps.selected === 'number' &&
			nextProps.selected !== this.state.selected
		) {
			this.setState({ selected: nextProps.selected })
		}
	}

	onTabClick(idx, e) {
		if (this.state.selected !== idx) {
			if (this.props.onChange) {
				this.props.onChange(idx, e)
			}
			this.setState({
				selected: idx
			})
		}
	}

	render() {
		const props = Object.assign({}, this.props)
		let { children, className } = props
		const { selected } = this.state

		delete props.children
		delete props.onChange
		delete props.className

		// normalize children (which should only be tabpanes)
		children = children || []
		if (!Array.isArray(children)) {
			children = [children]
		}

		// build tab labels and selected
		let tabs = []
		let totalTabs = children.length
		const tabPanes = []

		children.forEach((tabPane, idx) => {
			let className = ''

			switch (idx) {
				case 0:
					className = 'toggle__left'
					break
				case totalTabs - 1:
					className = 'toggle__right'
					break
				default:
					className = 'toggle__middle'
					break
			}

			// select the proper tab
			if (selected === idx) {
				className += ' btn__toggle__active'
				tabPanes.push(tabPane)
			}

			tabs.push(
				<Button
					onClick={e => {
						this.onTabClick(idx, e)
					}}
					toggle
					className={className}
					key={`tab-${idx}`}
				>
					{tabPane.props.title}
				</Button>
			)
		})

		return (
			<div className={`tabs__container  ${className}`}>
				<div className="tabs">{tabs}</div>
				<div className="tab__panes">{tabPanes}</div>
			</div>
		)
	}
}

Tabs.propTypes = {
	onChange: PropTypes.func,
	selected: PropTypes.number
}

export class TabPane extends Component {
	render() {
		return <div className="tap__pane">{this.props.children}</div>
	}
}

TabPane.propTypes = {
	title: PropTypes.string,
	selected: PropTypes.bool
}
