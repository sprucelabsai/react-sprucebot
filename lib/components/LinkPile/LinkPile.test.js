'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _LinkPile = require('./LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_LinkPile2.default, null)).toJSON();
	expect(tree).toMatchSnapshot();
});