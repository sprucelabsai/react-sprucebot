import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import StatsSlider from './StatsSlider'

test('it renders', () => {
	const tree = renderer.create(<StatsSlider stats={[]} />).toJSON()
	expect(tree).toMatchSnapshot()
})
