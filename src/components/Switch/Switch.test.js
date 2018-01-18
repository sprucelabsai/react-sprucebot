import React from 'react'
import renderer from 'react-test-renderer'
// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import { shallow } from 'enzyme'

import 'jest-styled-components'
import Switch from './Switch'

test('it renders', () => {
	const tree = renderer.create(<Switch />).toJSON()
	expect(tree).toMatchSnapshot()
})
test('it should respect props', () => {
	const wrapper = shallow(<Switch on={true} />, { lifecycleExperimental: true })
	expect(wrapper.instance().props.on).toEqual(true)
	wrapper.setProps({ on: false })
	expect(wrapper.instance().props.on).toEqual(false)
})

test('it set state onChange', () => {
	const wrapper = shallow(<Switch on={true} />).instance()
	let foo = wrapper.onChange(false)
	expect(wrapper.state.on).toEqual(false)
})
