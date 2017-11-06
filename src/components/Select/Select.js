import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'

export default props => {
	const p = Object.assign({}, props)

	// set the proper tag
	p.tag = 'select'

	// build the class
	p.className = `custom_dropdown ${p.className || ''} `
	if (p.label) {
		p.className += ' with_label'
	}
	return <Input {...p} />
}
