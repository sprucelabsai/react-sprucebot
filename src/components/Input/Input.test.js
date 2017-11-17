import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Input from './Input'

test('it renders', () => {
	const tree = renderer.create(<Input />).toJSON()
	expect(tree).toMatchSnapshot()
})
