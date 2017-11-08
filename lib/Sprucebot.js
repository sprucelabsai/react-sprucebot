'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Avatar = require('./components/Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _BotText = require('./components/BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Button = require('./components/Button/Button');

var _Button2 = _interopRequireDefault(_Button);

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

var _Form = require('./components/Form/Form');

var _Form2 = _interopRequireDefault(_Form);

var _LinkPile = require('./components/LinkPile/LinkPile');

var _LinkPile2 = _interopRequireDefault(_LinkPile);

var _Select = require('./components/Select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _SubmitWrapper = require('./components/SubmitWrapper/SubmitWrapper');

var _SubmitWrapper2 = _interopRequireDefault(_SubmitWrapper);

var _Pager = require('./components/Pager/Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _Stars = require('./components/Stars/Stars');

var _Stars2 = _interopRequireDefault(_Stars);

var _DevControls = require('./components/DevControls/DevControls');

var _DevControls2 = _interopRequireDefault(_DevControls);

var _ButtonGrid = require('./components/ButtonGrid/ButtonGrid');

var ButtonGrid = _interopRequireWildcard(_ButtonGrid);

var _StatsSlider = require('./components/StatsSlider/StatsSlider');

var _StatsSlider2 = _interopRequireDefault(_StatsSlider);

var _Typography = require('./components/Typography/Typography');

var Typography = _interopRequireWildcard(_Typography);

var _List = require('./components/List/List');

var List = _interopRequireWildcard(_List);

var _Tabs = require('./components/Tabs/Tabs');

var Tabs = _interopRequireWildcard(_Tabs);

var _skillskit = require('./skillskit');

var _skillskit2 = _interopRequireDefault(_skillskit);

var _document2 = require('./skillskit/next/_document');

var _document3 = _interopRequireDefault(_document2);

var _Page = require('./skillskit/next/Page');

var _Page2 = _interopRequireDefault(_Page);

var _withStore = require('./skillskit/store/withStore');

var _withStore2 = _interopRequireDefault(_withStore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sprucebot = _extends({
	skill: _skillskit2.default,
	_document: _document3.default,
	Page: _Page2.default,
	withStore: _withStore2.default,
	Avatar: _Avatar2.default,
	BotText: _BotText2.default,
	Button: _Button2.default,
	Container: _Container2.default,
	Input: _Input2.default,
	Pre: _Pre2.default,
	Switch: _Switch2.default,
	Loader: _Loader2.default,
	LinkPile: _LinkPile2.default,
	Form: _Form2.default,
	Select: _Select2.default,
	SubmitWrapper: _SubmitWrapper2.default,
	Pager: _Pager2.default,
	StatsSlider: _StatsSlider2.default,
	ButtonGrid: ButtonGrid,
	Stars: _Stars2.default,
	DevControls: _DevControls2.default
}, Typography, List, Tabs, ButtonGrid);
module.exports = Sprucebot;