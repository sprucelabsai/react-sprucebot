'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _List = require('./List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('List renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.List, null)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('ListItem should render non-arrays', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
		_List.ListItem,
		null,
		'YOLO'
	)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('List render send padding-bottom if its piled', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.List, { alignItems: 'flex-end', pile: true })).toJSON();
	expect(tree).toMatchSnapshot();
});

test('ListItem renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.ListItem, null)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('ListItem should align items', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.ListItem, { alignItems: 'flex-end' })).toJSON();
	expect(tree).toMatchSnapshot();
});

test('ListItemAvatar should align where we specify', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.ListItem, { alignItems: 'flex-start', avatar: true })).toJSON();
	expect(tree).toMatchSnapshot();
});

test('ItemRightContent should align where we specify', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_List.ListItem, { alignItems: 'flex-start', avatar: true })).toJSON();
	expect(tree).toMatchSnapshot();
});

test('List should render title', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
		_List.List,
		null,
		_react2.default.createElement(_List.ListItem, { title: 'foo' })
	)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('List should render subTitle', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
		_List.List,
		null,
		_react2.default.createElement(_List.ListItem, { title: 'foo', subtitle: 'bar' })
	)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('List should render listitems and divs', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
		_List.List,
		null,
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_List.ListItem, { title: 'foo', subtitle: 'bar' }),
			_react2.default.createElement(
				'a',
				null,
				'Im also a list item'
			)
		)
	)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('List should render ItemRightContent with a title', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
		_List.List,
		null,
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_List.ListItem, { rightTitle: 'foo', subtitle: 'bar' }),
			_react2.default.createElement(
				'a',
				null,
				'Im also a list item'
			)
		)
	)).toJSON();
	expect(tree).toMatchSnapshot();
});