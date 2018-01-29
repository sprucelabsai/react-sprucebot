import React from 'react'
import renderer from 'react-test-renderer'
// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({ adapter: new Adapter() })
import { mount, shallow } from 'enzyme'

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

test('it should trigger prop changes', () => {
	const wrapper = mount(<Switch on={false} />, {
		lifecycleExperimental: true
	})
	expect(wrapper.instance().props.on).toEqual(false)
	wrapper.setProps({ on: true })
	expect(wrapper.instance().props.on).toEqual(true)
})

test('it set state onChange', () => {
	const wrapper = shallow(<Switch on={true} />).instance()
	let foo = wrapper.onChange(false)
	expect(wrapper.state.on).toEqual(false)
})

test('it set trigger onChange that is passed in', () => {
	var spy = sinon.spy()
	const wrapper = shallow(<Switch onChange={spy} />).instance()
	let foo = wrapper.onChange(true)
	expect(wrapper.state.on).toEqual(true)
	expect(spy.calledOnce).toEqual(true)
})
