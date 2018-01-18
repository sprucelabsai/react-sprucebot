'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

require('jest-styled-components');

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup file
(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });


test('it renders', function () {
	var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_Switch2.default, null)).toJSON();
	expect(tree).toMatchSnapshot();
});
test('it should respect props', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Switch2.default, { on: true }), { lifecycleExperimental: true });
	expect(wrapper.instance().props.on).toEqual(true);
	wrapper.setProps({ on: false });
	expect(wrapper.instance().props.on).toEqual(false);
});

test('it set state onChange', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Switch2.default, { on: true })).instance();
	var foo = wrapper.onChange(false);
	expect(wrapper.state.on).toEqual(false);
});