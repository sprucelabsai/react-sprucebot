import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import BotText from './BotText'

test('it renders', () => {
	const tree = renderer.create(<BotText>Bottext children</BotText>).toJSON()
	expect(tree).toMatchSnapshot()
})
