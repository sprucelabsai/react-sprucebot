import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Form from './Form'

test('it renders', () => {
	const tree = renderer.create(<Form>Form children</Form>).toJSON()
	expect(tree).toMatchSnapshot()
})
