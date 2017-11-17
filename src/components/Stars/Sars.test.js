import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Stars from './Stars'

test('it renders', () => {
	const tree = renderer.create(<Stars />).toJSON()
	expect(tree).toMatchSnapshot()
})
