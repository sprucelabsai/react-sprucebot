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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
				return new Promise(function () {
					var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
						var body, headers, fetchOptions, agent, response, json;
						return regeneratorRuntime.wrap(function _callee$(_context) {
							while (1) {
								switch (_context.prev = _context.next) {
									case 0:
										body = options.body;
										_context.prev = 1;
										headers = {
											Accept: 'application/json',
											'Content-Type': 'application/json'
										};
										fetchOptions = {
											method: method,
											headers: headers,
											body: JSON.stringify(body)

											// Allows Node to accept our self signed cert
										};
										if (_this.ssl && _this.allowSelfSignedCerts) {
											agent = new _https2.default.Agent({
												rejectUnauthorized: false
											});

											fetchOptions.agent = agent;
										}

										if (_this.jwt) {
											fetchOptions.headers['x-skill-jwt'] = _this.jwt;
										}

										// Start network request
										_context.next = 8;
										return (0, _isomorphicFetch2.default)('' + endpoint + path, fetchOptions);

									case 8:
										response = _context.sent;
										_context.next = 11;
										return response.json();

									case 11:
										json = _context.sent;

										if (response.ok) {
											_context.next = 15;
											break;
										}

										console.log('Request not okay', response.status, json);
										return _context.abrupt('return', reject(json));

									case 15:

										resolve(json);
										_context.next = 22;
										break;

									case 18:
										_context.prev = 18;
										_context.t0 = _context['catch'](1);

										console.error('Response failure', _context.t0);
										reject(_context.t0);

									case 22:
									case 'end':
										return _context.stop();
								}
							}
						}, _callee, _this, [[1, 18]]);
					}));

					return function (_x2, _x3) {
						return _ref2.apply(this, arguments);
					};
				}());
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