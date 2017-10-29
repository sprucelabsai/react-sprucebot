'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

describe('Container Component', function () {
	test('it renders', function () {
		var tree = _reactTestRenderer2['default'].create(_react2['default'].createElement(
			_Container2['default'],
			null,
			'Container children'
		)).toJSON();
		expect(tree).toMatchSnapshot();
	});
});