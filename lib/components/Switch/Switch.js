'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switch = _styledComponents2.default.div.attrs({
	className: function className(props) {
		return props.on ? 'switch on' : 'switch';
	}
}).withConfig({
	displayName: 'Switch',
	componentId: 's1h1f1m-0'
})(['']);

exports.default = Switch;