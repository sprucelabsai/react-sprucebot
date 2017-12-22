'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function height(elm) {
	var elmHeight, elmMargin;

	if (document.all) {
		// IE
		elmHeight = elm.currentStyle.height;
		elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
	} else {
		// Mozilla
		elmHeight = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('height'), 10);
		elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top'), 10) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'), 10);
	}
	return elmHeight + elmMargin;
}

var TrainingGuide = function (_Component) {
	_inherits(TrainingGuide, _Component);

	function TrainingGuide(props) {
		_classCallCheck(this, TrainingGuide);

		// every steps' dom node so we can calc heights
		var _this = _possibleConstructorReturn(this, (TrainingGuide.__proto__ || Object.getPrototypeOf(TrainingGuide)).call(this, props));

		_this.stepDomNodes = [];

		_this.state = {
			currentStep: 0,
			stepHeights: props.steps.map(function () {
				return 0;
			}),
			stepWidths: props.steps.map(function () {
				return 0;
			}),
			scrollInterval: null,
			transitioning: false
		};
		return _this;
	}

	_createClass(TrainingGuide, [{
		key: 'next',
		value: function next() {
			this.setState(function (prevState, props) {
				if (prevState.currentStep < props.steps.length - 1) {
					return {
						currentStep: prevState.currentStep + 1
					};
				}
				return {};
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var _this2 = this;

			// Scroll to next/done buttons if the current step has changed
			if (this.state.currentStep !== prevState.currentStep) {
				if (this.state.scrollInterval) {
					clearInterval(this.state.scrollInterval);
					this.setState({ scrollInterval: false });
				}

				// wait a sec to allow css animations to finish
				var scrollInterval = setInterval(this.scrollToGuideBottom.bind(this), 5);
				this.setState({ scrollInterval: scrollInterval, transitioning: true });

				setTimeout(function () {
					clearInterval(_this2.state.scrollInterval);
					_this2.setState({ scrollInterval: false, transitioning: false });
				}, 1500);
			}
		}
	}, {
		key: 'scrollToGuideBottom',
		value: function scrollToGuideBottom() {
			// where do i scroll to?
			var node = _reactDom2.default.findDOMNode(this);
			var bounds = node.getBoundingClientRect();
			var bottom = window.document.body.scrollTop + bounds.y + bounds.height;
			var windowBottom = window.document.body.scrollTop + window.innerHeight;
			if (bottom > windowBottom) {
				window.document.body.scrollTop = bottom - window.innerHeight;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			// calculate height of first element in each step
			var stepHeights = this.stepDomNodes.map(function (node) {
				var first = node.children[0];
				return height(first);
			});

			// also set div widths so text doesn't wrap weird on animations
			var stepWidths = this.stepDomNodes.map(function (node) {
				var span = node.children[0].children[0];
				return span.offsetWidth;
			});

			this.setState(function () {
				return { stepHeights: stepHeights, stepWidths: stepWidths };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    steps = _props.steps,
			    nextButtonLabel = _props.nextButtonLabel,
			    doneButtonLabel = _props.doneButtonLabel,
			    onComplete = _props.onComplete;
			var _state = this.state,
			    currentStep = _state.currentStep,
			    stepHeights = _state.stepHeights,
			    stepWidths = _state.stepWidths,
			    transitioning = _state.transitioning;

			var last = currentStep === steps.length - 1;

			return _react2.default.createElement(
				'div',
				{ className: 'training_guide' },
				steps.map(function (step, idx) {
					var stepStyle = stepWidths[idx] ? { width: stepWidths[idx] } : {};
					return _react2.default.createElement(
						'div',
						{
							className: 'training_guide__step ' + (idx <= currentStep ? 'on' : 'off') + ' ' + (idx === 0 ? 'first' : ''),
							style: {
								height: idx <= currentStep ? stepHeights[idx] : 0
							},
							ref: function ref(node) {
								return _this3.stepDomNodes[idx] = node;
							},
							key: 'step-' + idx
						},
						_react2.default.createElement(
							_BotText2.default,
							null,
							_react2.default.createElement(
								'span',
								{ style: stepStyle },
								step
							)
						)
					);
				}),
				_react2.default.createElement(
					'div',
					null,
					!last && _react2.default.createElement(
						_Button2.default,
						{
							alt: true,
							busy: transitioning,
							onClick: function onClick() {
								if (!transitioning) _this3.next();
							}
						},
						nextButtonLabel
					),
					last && _react2.default.createElement(
						_Button2.default,
						{
							primary: true,
							busy: transitioning,
							onClick: function onClick() {
								if (!transitioning) onComplete();
							}
						},
						doneButtonLabel
					)
				)
			);
		}
	}], [{
		key: 'importSteps',
		value: function importSteps(steps) {
			return steps.map(function (step, idx) {
				return { key: 'step-' + idx, value: step };
			});
		}
	}]);

	return TrainingGuide;
}(_react.Component);

exports.default = TrainingGuide;


TrainingGuide.propTypes = {
	steps: _propTypes2.default.array.isRequired,
	nextButtonLabel: _propTypes2.default.string.isRequired,
	doneButtonLabel: _propTypes2.default.string.isRequired,
	onComplete: _propTypes2.default.func.isRequired
};

TrainingGuide.defaultProps = {
	nextButtonLabel: 'Next',
	doneButtonLabel: 'Done'
};