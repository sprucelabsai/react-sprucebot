'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionHeading = exports.A = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Paragraph = undefined;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = exports.Paragraph = _styledComponents2.default.p.attrs({
	className: function className(props) {
		return props.fine ? 'fine__print' : '';
	}
}).withConfig({
	displayName: 'Typography__Paragraph',
	componentId: 's1fueepp-0'
})(['']);

var H1 = exports.H1 = _styledComponents2.default.h1.attrs({
	className: function className(props) {
		return props.with_subheader ? 'with__subheader' : '';
	}
}).withConfig({
	displayName: 'Typography__H1',
	componentId: 's1fueepp-1'
})(['']);
var H2 = exports.H2 = _styledComponents2.default.h2.attrs({
	className: function className(props) {
		return props.subheader ? 'is__subheader' : '';
	}
}).withConfig({
	displayName: 'Typography__H2',
	componentId: 's1fueepp-2'
})(['']);
var H3 = exports.H3 = _styledComponents2.default.h3.withConfig({
	displayName: 'Typography__H3',
	componentId: 's1fueepp-3'
})(['']);
var H4 = exports.H4 = _styledComponents2.default.h4.withConfig({
	displayName: 'Typography__H4',
	componentId: 's1fueepp-4'
})(['']);
var H5 = exports.H5 = _styledComponents2.default.h5.withConfig({
	displayName: 'Typography__H5',
	componentId: 's1fueepp-5'
})(['']);
var H6 = exports.H6 = _styledComponents2.default.h6.withConfig({
	displayName: 'Typography__H6',
	componentId: 's1fueepp-6'
})(['']);

var A = exports.A = _styledComponents2.default.a.withConfig({
	displayName: 'Typography__A',
	componentId: 's1fueepp-7'
})(['']);
var SectionHeading = exports.SectionHeading = _styledComponents2.default.h2.attrs({
	className: 'profile__subtitle'
}).withConfig({
	displayName: 'Typography__SectionHeading',
	componentId: 's1fueepp-8'
})(['']);