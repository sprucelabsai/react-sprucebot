'use strict';

var React = require('react');

var _require = require('./ButtonGrid'),
    ButtonGrid = _require.ButtonGrid,
    GridButton = _require.GridButton;

var renderer = require('react-test-renderer');

var itRendersTree = function itRendersTree(tree) {
	return expect(renderer.create(tree).toJSON()).toMatchSnapshot();
};

test('ButtonGrid renders', function () {
	itRendersTree(React.createElement(ButtonGrid, null));
});

test('GridButton renders', function () {
	itRendersTree(React.createElement(GridButton, null));
});

test('ButtonGrid renders a GridButton', function () {
	itRendersTree(React.createElement(
		ButtonGrid,
		null,
		React.createElement(GridButton, null)
	));
});