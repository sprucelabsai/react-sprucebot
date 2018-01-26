import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { List, ListItem } from './List'

test('List renders', () => {
	const tree = renderer.create(<List />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('ListItem should render non-arrays', () => {
	const tree = renderer.create(<ListItem>YOLO</ListItem>).toJSON()
	expect(tree).toMatchSnapshot()
})

test('List render send padding-bottom if its piled', () => {
	const tree = renderer.create(<List alignItems="flex-end" pile />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('ListItem renders', () => {
	const tree = renderer.create(<ListItem />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('ListItem should align items', () => {
	const tree = renderer.create(<ListItem alignItems="flex-end" />).toJSON()
	expect(tree).toMatchSnapshot()
})

test('ListItemAvatar should align where we specify', () => {
	const tree = renderer
		.create(<ListItem alignItems="flex-start" avatar />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

test('ItemRightContent should align where we specify', () => {
	const tree = renderer
		.create(<ListItem alignItems="flex-start" avatar />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

test('List should render title', () => {
	const tree = renderer
		.create(
			<List>
				<ListItem title={'foo'} />
			</List>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

test('List should render subTitle', () => {
	const tree = renderer
		.create(
			<List>
				<ListItem title={'foo'} subtitle={'bar'} />
			</List>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

test('List should render listitems and divs', () => {
	const tree = renderer
		.create(
			<List>
				<div>
					<ListItem title={'foo'} subtitle={'bar'} />
					<a>Im also a list item</a>
				</div>
			</List>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})

test('List should render ItemRightContent with a title', () => {
	const tree = renderer
		.create(
			<List>
				<div>
					<ListItem rightTitle={'foo'} subtitle={'bar'} />
					<a>Im also a list item</a>
				</div>
			</List>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
