'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('p tag', function () {
	var _require = require('./Typeography'),
	    Paragraph = _require.Paragraph;

	test('it renders', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(Paragraph, null)).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('it fine prints', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(Paragraph, { fine: true })).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('h1 tag', function () {
	var _require2 = require('./Typeography'),
	    H1 = _require2.H1,
	    H2 = _require2.H2;

	test('it renders', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(H1, null)).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('it renders header and subheader', function () {
		var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(H1, { header: true }),
			_react2.default.createElement(H2, { subheader: true })
		)).toJSON();
		expect(tree).toMatchSnapshot();
	});
});