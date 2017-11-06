import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import LinkPile from './LinkPile'

test('it renders', () => {
	const tree = renderer.create(<LinkPile />).toJSON()
	expect(tree).toMatchSnapshot()
})
