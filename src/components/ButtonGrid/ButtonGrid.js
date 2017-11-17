import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const ButtonGrid = styled.div.attrs({
	className: 'btn_grid'
})``

export class GridButton extends Component {
	render() {
		const props = Object.assign({}, this.props)
		const { className, selected, children, subtitle, ...rest } = props

		return (
			<a
				className={`btn ${className || ''} ${selected ? 'selected' : ''}`}
				{...rest}
			>
				<span>
					{children}
					{subtitle && <br />}
					{subtitle && <small>{subtitle}</small>}
				</span>
			</a>
		)
	}
}

GridButton.propTypes = {
	selected: PropTypes.bool,
	subtitle: PropTypes.string
}

GridButton.defaultProps = {
	selected: false
}
