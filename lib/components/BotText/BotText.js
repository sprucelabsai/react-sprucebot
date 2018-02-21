'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BotText = _styledComponents2.default.p.attrs({
	className: 'bot__text'
}).withConfig({
	displayName: 'BotText',
	componentId: 's2akchz-0'
})(['word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;']);

exports.default = BotText;