const React = require('react')
const { ButtonGrid, GridButton } = require('./ButtonGrid')
const renderer = require('react-test-renderer')

const itRendersTree = tree =>
	expect(renderer.create(tree).toJSON()).toMatchSnapshot()

test('ButtonGrid renders', () => {
	itRendersTree(<ButtonGrid />)
})

test('GridButton renders', () => {
	itRendersTree(<GridButton />)
})

test('ButtonGrid renders a GridButton', () => {
	itRendersTree(
		<ButtonGrid>
			<GridButton />
		</ButtonGrid>
	)
})
