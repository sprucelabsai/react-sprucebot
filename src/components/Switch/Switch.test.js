import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Switch from './Switch'

test('it renders', () => {
	const tree = renderer.create(<Switch />).toJSON()
	expect(tree).toMatchSnapshot()
})
