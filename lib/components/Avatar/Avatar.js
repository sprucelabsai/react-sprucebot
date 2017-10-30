'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = _styledComponents2.default.div.attrs({
	className: 'top__avatar'
}).withConfig({
	displayName: 'Avatar',
	componentId: 's5t7a0i-0'
})(['background-image:', ';'], function (props) {
	return 'url(' + props.image + ')';
});

exports.default = Avatar;