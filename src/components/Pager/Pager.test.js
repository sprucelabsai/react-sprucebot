import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Pager from './Pager'

test('it renders', () => {
	const tree = renderer.create(<Pager totalPages={1} />).toJSON()
	expect(tree).toMatchSnapshot()
})
