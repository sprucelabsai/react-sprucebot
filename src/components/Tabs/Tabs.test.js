import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { Tabs, TabPane } from './Tabs'

test('Tabs renders', () => {
	const tree = renderer.create(<Tabs />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('TabPane renders', () => {
	const tree = renderer.create(<TabPane />).toJSON()
	expect(tree).toMatchSnapshot()
})
