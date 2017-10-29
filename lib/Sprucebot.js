'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsAvatarAvatar = require('./components/Avatar/Avatar');

var _componentsAvatarAvatar2 = _interopRequireDefault(_componentsAvatarAvatar);

var _componentsBotTextBotText = require('./components/BotText/BotText');

var _componentsBotTextBotText2 = _interopRequireDefault(_componentsBotTextBotText);

var _componentsButtonButton = require('./components/Button/Button');

var _componentsButtonButton2 = _interopRequireDefault(_componentsButtonButton);

var _componentsCardCard = require('./components/Card/Card');

var _componentsCardCard2 = _interopRequireDefault(_componentsCardCard);

var _componentsContainerContainer = require('./components/Container/Container');

var _componentsContainerContainer2 = _interopRequireDefault(_componentsContainerContainer);

var _componentsInputInput = require('./components/Input/Input');

var _componentsInputInput2 = _interopRequireDefault(_componentsInputInput);

var _componentsPrePre = require('./components/Pre/Pre');

var _componentsPrePre2 = _interopRequireDefault(_componentsPrePre);

var _componentsSwitchSwitch = require('./components/Switch/Switch');

var _componentsSwitchSwitch2 = _interopRequireDefault(_componentsSwitchSwitch);

var _componentsLoaderLoader = require('./components/Loader/Loader');

var _componentsLoaderLoader2 = _interopRequireDefault(_componentsLoaderLoader);

var _componentsTypeographyTypeography = require('./components/Typeography/Typeography');

var Typeography = _interopRequireWildcard(_componentsTypeographyTypeography);

var Sprucebot = {
    components: _extends({
        Avatar: _componentsAvatarAvatar2['default'],
        BotText: _componentsBotTextBotText2['default'],
        Button: _componentsButtonButton2['default'],
        Card: _componentsCardCard2['default'],
        Container: _componentsContainerContainer2['default'],
        Input: _componentsInputInput2['default'],
        Pre: _componentsPrePre2['default'],
        Switch: _componentsSwitchSwitch2['default'],
        Loader: _componentsLoaderLoader2['default']
    }, Typeography)
};
exports['default'] = Sprucebot;
var components = Sprucebot.components;
exports.components = components;