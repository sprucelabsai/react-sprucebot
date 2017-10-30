'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

require('jest-styled-components');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button Component', function () {
	var itRendersTree = function itRendersTree(tree) {
		return expect(_reactTestRenderer2.default.create(tree)).toMatchSnapshot();
	};

	test('it renders', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, null));
	});

	test('it renders children', function () {
		itRendersTree(_react2.default.createElement(
			_Button2.default,
			null,
			'Button Children'
		));
	});

	test('it renders html tagName', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { tag: 'span' }));
	});

	test('it renders busy', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { busy: true }));
	});

	test('it renders disabled', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { disabled: true }));
	});

	test('it renders primary', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { primary: true }));
	});

	test('it renders secondary', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { secondary: true }));
	});

	test('it renders alt', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { alt: true }));
	});

	test('it renders link', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { link: true }));
	});

	test('it renders caution', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { caution: true }));
	});

	test('it renders className', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { className: 'test classnames' }));
	});

	test('it renders pimary && secondary', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { primary: true, secondary: true }));
	});

	test('it renders primary && alt', function () {
		itRendersTree(_react2.default.createElement(_Button2.default, { primary: true, alt: true }));
	});
});