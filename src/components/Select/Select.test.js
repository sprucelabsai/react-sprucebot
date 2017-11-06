import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Select from './Select'

test('it renders', () => {
	const tree = renderer.create(<Select />).toJSON()
	expect(tree).toMatchSnapshot()
})
