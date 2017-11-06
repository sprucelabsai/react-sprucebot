import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Pre from './Pre'

test('it renders', () => {
	const tree = renderer.create(<Pre />).toJSON()
	expect(tree).toMatchSnapshot()
})
