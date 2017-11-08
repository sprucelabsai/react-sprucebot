'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.go = go;
var GO_AUTH_REQUEST = exports.GO_AUTH_REQUEST = 'auth/GO_AUTH_REQUEST';
var GO_AUTH_SUCCESS = exports.GO_AUTH_SUCCESS = 'auth/GO_AUTH_SUCCESS';
var GO_AUTH_ERROR = exports.GO_AUTH_ERROR = 'auth/GO_AUTH_ERROR';

function go(jwt) {
	return {
		types: [GO_AUTH_REQUEST, GO_AUTH_SUCCESS, GO_AUTH_ERROR],
		promise: function promise(client) {
			return client.get('/api/1.0/auth/' + jwt + '.json');
		}
	};
}