'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\tbackground-image: ', ';\n'], ['\n\tbackground-image: ', ';\n']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var Avatar = _styledComponents2['default'].div.attrs({
	className: 'top__avatar'
})(_templateObject, function (props) {
	return 'url(' + props.image + ')';
});

exports['default'] = Avatar;
module.exports = exports['default'];