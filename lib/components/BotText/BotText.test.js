'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _BotText = require('./BotText');

var _BotText2 = _interopRequireDefault(_BotText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BotText Component', function () {
	test('it renders', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
			_BotText2.default,
			null,
			'Bottext children'
		)).toJSON();
		expect(tree).toMatchSnapshot();
	});
});