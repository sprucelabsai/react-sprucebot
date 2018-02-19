'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*');
}

exports.default = {
	height: 0,
	forceAuth: function forceAuth() {
		postMessage('Skill:ForceAuth');
	},
	resized: function resized() {
		var height = 0;

		function getBottom(elem) {
			var box = elem.getBoundingClientRect();

			var body = document.body;
			var docEl = document.documentElement;
			var computedStyle = window.getComputedStyle(elem);

			var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
			var clientTop = docEl.clientTop || body.clientTop || 0;
			var top = box.top + scrollTop - clientTop;
			var bottom = top + elem.clientHeight + parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

			return bottom;
		}

		window.document.querySelectorAll('.container,.dialog').forEach(function (container) {
			var bottom = getBottom(container);
			if (bottom > height) {
				height = bottom;
			}
		});

		if (height != this.height) {
			this.height = height;
			postMessage({
				name: 'Skill:Resized',
				height: height
			});
		}
	},
	back: function back() {
		postMessage('Skill:Back');
	},
	ready: function ready() {
		this.resized();
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href
		});
		this.resizedInterval = setInterval(this.resized.bind(this), 50);
	}
};