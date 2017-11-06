'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _Tabs = require('./Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Tabs renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Tabs.Tabs, null)).toJSON();
	expect(tree).toMatchSnapshot();
});

test('TabPane renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Tabs.TabPane, null)).toJSON();
	expect(tree).toMatchSnapshot();
});