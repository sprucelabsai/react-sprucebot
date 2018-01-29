'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = _styledComponents2.default.div.attrs({
	className: function className(props) {
		var className = props.top ? 'top__avatar' : 'avatar__wrapper';
		if (props.online && props.showOnlineIndicator) {
			className += ' online';
		}
		return className;
	}
}).withConfig({
	displayName: 'Avatar',
	componentId: 'bp4k6m-0'
})(['', ';'], function (props) {
	return props.image && 'background-image: url(' + props.image + ');';
});

exports.default = Avatar;