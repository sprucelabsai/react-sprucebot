'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = {
	lang: {},
	overrides: {},
	configure: function configure(langDir) {
		this.lang = require(langDir + '/default.js');
		try {
			this.overrides = require(langDir + '/overrides.js');
		} catch (err) {
			console.info('No lang override specified.');
		}
	},
	mixin: function mixin(lang, overrides) {
		this.lang = lang;
		this.overrides = overrides;
	},
	getText: function getText(key) {
		var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var translations = _extends({}, this.lang, this.overrides, context);
		if (translations[key]) {
			return typeof translations[key] === 'function' ? translations[key](translations) : translations[key];
		}

		throw Error('Translation missing key ' + key);
	}
};