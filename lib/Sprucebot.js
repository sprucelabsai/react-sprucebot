'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Avatar = require('./components/Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _BotText = require('./components/BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Button = require('./components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Card = require('./components/Card/Card');

var _Card2 = _interopRequireDefault(_Card);

var _Container = require('./components/Container/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Input = require('./components/Input/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Pre = require('./components/Pre/Pre');

var _Pre2 = _interopRequireDefault(_Pre);

var _Switch = require('./components/Switch/Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Loader = require('./components/Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Typeography = require('./components/Typeography/Typeography');

var Typeography = _interopRequireWildcard(_Typeography);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sprucebot = _extends({
	Avatar: _Avatar2.default,
	BotText: _BotText2.default,
	Button: _Button2.default,
	Card: _Card2.default,
	Container: _Container2.default,
	Input: _Input2.default,
	Pre: _Pre2.default,
	Switch: _Switch2.default,
	Loader: _Loader2.default
}, Typeography);
module.exports = Sprucebot;