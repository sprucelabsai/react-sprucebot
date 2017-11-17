import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { List, ListItem } from './List'

test('List renders', () => {
	const tree = renderer.create(<List />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('ListItem renders', () => {
	const tree = renderer.create(<ListItem />).toJSON()
	expect(tree).toMatchSnapshot()
})
