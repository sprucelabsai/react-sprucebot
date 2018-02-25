function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

export default {
	height: 0,
	forceAuth: function() {
		postMessage('Skill:ForceAuth')
	},
	resized: function() {
		var height = 0

		function getBottom(elem) {
			var box = elem.getBoundingClientRect()

			var body = document.body
			var docEl = document.documentElement

			var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
			var clientTop = docEl.clientTop || body.clientTop || 0
			var top = box.top + scrollTop - clientTop
			var bottom = top + elem.scrollHeight

			return bottom
		}

		window.document
			.querySelectorAll('.container, .dialog')
			.forEach(container => {
				let bottom = getBottom(container) + 20
				if (bottom > height) {
					height = bottom
				}
			})

		if (height != this.height) {
			this.height = height
			postMessage({
				name: 'Skill:Resized',
				height
			})
		}
	},
	back: function() {
		postMessage('Skill:Back')
	},
	ready: function() {
		this.resized()
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href
		})
		this.resizedInterval = setInterval(this.resized.bind(this), 50)
	}
}
