import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import SubmitWrapper from './SubmitWrapper'

test('it renders', () => {
	const tree = renderer.create(<SubmitWrapper />).toJSON()
	expect(tree).toMatchSnapshot()
})
