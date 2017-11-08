'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = ['GET', 'POST', 'PUT', 'PATCH', 'DEL'];

var ApiClient = function () {
	function ApiClient(endpoint, _ref) {
		var _this = this;

		var _ref$allowSelfSignedC = _ref.allowSelfSignedCerts,
		    allowSelfSignedCerts = _ref$allowSelfSignedC === undefined ? false : _ref$allowSelfSignedC;

		_classCallCheck(this, ApiClient);

		this.jwt = undefined;
		this.ssl = endpoint.search('https') === 0;
		this.endpoint = endpoint;
		this.allowSelfSignedCerts = allowSelfSignedCerts;

		methods.forEach(function (method) {
			_this[method.toLowerCase()] = function (path) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
				return new Promise(async function (resolve, reject) {
					var body = options.body;

					try {
						var headers = {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						};

						var fetchOptions = {
							method: method,
							headers: headers,
							body: JSON.stringify(body),
							credentials: 'same-origin'

							// Allows Node to accept our self signed cert
						};if (_this.ssl && _this.allowSelfSignedCerts) {
							var agent = new _https2.default.Agent({
								rejectUnauthorized: false
							});
							fetchOptions.agent = agent;
						}

						if (_this.jwt) {
							fetchOptions.headers['x-skill-jwt'] = _this.jwt;
						}

						// Start network request
						var response = await (0, _isomorphicFetch2.default)('' + endpoint + path, fetchOptions);
						var json = await response.json();
						if (!response.ok) {
							console.log('Request not okay', response.status, json);
							return reject(json);
						}

						resolve(json);
					} catch (error) {
						console.error('Response failure', error);
						reject(error);
					}
				});
			};
		});
	}

	_createClass(ApiClient, [{
		key: 'setJwt',
		value: function setJwt(jwt) {
			this.jwt = jwt;
		}
	}]);

	return ApiClient;
}();

/**
 * Creates a new api client to manage network requests
 * @param {string} host
 * @example createClient('https://www.example.com')
 * @returns {ApiClient}
 */


exports.default = function (host, options) {
	return new ApiClient(host, options);
};