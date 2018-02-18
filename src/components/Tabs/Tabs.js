import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

export class Tabs extends Component {
	constructor(props) {
		super(props)

		const children = React.Children.toArray(props.children)

		// default to first selected item
		const idx = props.selected || 0
		let selected = children[idx] && children[idx].key

		if (children.length > 0) {
			children.some(tab => {
				if (tab.props.selected) {
					selected = tab.key
					return true
				}
			})
		}

		this.state = {
			selected: selected,
			children
		}
	}

	componentWillReceiveProps(nextProps) {
		const newState = {
			children: React.Children.toArray(nextProps.children)
		}

		if (
			typeof nextProps.selected === 'number' &&
			nextProps.selected !== this.state.selected
		) {
			newState.children.forEach((tab, idx) => {
				if (idx === nextProps.selected) {
					newState.selected = tab.key
				}
			})
		}

		this.setState(newState)
	}

	onTabClick(idx, key, e) {
		if (this.state.selected !== idx) {
			if (this.props.onChange) {
				this.props.onChange(idx, e)
			}
			this.setState({
				selected: key
			})
		}
	}

	render() {
		const { selected, children } = this.state
		const { selected: _, ...props } = this.props

		// build tab labels and selected
		let tabs = []
		let totalTabs = children.length
		const tabPanes = []

		children.forEach((tab, idx) => {
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
			if (selected === tab.key) {
				className += ' btn__toggle__active'
				tabPanes.push(tab)
			}

			tabs.push(
				<Button
					onClick={e => {
						this.onTabClick(idx, tab.key, e)
					}}
					toggle
					className={className}
					key={`tab-${tab.key}`}
				>
					{tab.props.title}
				</Button>
			)
		})

		return (
			<div className={`tabs__container `} {...props}>
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
