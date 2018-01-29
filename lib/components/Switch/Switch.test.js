'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

require('jest-styled-components');

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });
// setup file


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

test('it should trigger prop changes', function () {
	var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Switch2.default, { on: false }), {
		lifecycleExperimental: true
	});
	expect(wrapper.instance().props.on).toEqual(false);
	wrapper.setProps({ on: true });
	expect(wrapper.instance().props.on).toEqual(true);
});

test('it set state onChange', function () {
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Switch2.default, { on: true })).instance();
	var foo = wrapper.onChange(false);
	expect(wrapper.state.on).toEqual(false);
});

test('it set trigger onChange that is passed in', function () {
	var spy = _sinon2.default.spy();
	var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Switch2.default, { onChange: spy })).instance();
	var foo = wrapper.onChange(true);
	expect(wrapper.state.on).toEqual(true);
	expect(spy.calledOnce).toEqual(true);
});