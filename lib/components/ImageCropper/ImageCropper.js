'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BotText = require('../BotText/BotText');

var _BotText2 = _interopRequireDefault(_BotText);

var _Loader = require('../Loader/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _reactImageCrop = require('react-image-crop');

var _reactImageCrop2 = _interopRequireDefault(_reactImageCrop);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _SubmitWrapper = require('../SubmitWrapper/SubmitWrapper');

var _SubmitWrapper2 = _interopRequireDefault(_SubmitWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageCropper = function (_Component) {
	_inherits(ImageCropper, _Component);

	function ImageCropper(props) {
		_classCallCheck(this, ImageCropper);

		var _this = _possibleConstructorReturn(this, (ImageCropper.__proto__ || Object.getPrototypeOf(ImageCropper)).call(this, props));

		_this.state = {
			errorMessage: '',
			base64Image: props.base64Image,
			crop: props.crop,
			pixelCrop: props.prop,
			changed: false,
			loading: !!props.src, // if there is an image src being passed, we have to actually fetch it
			tapToCrop: props.tapToCrop,
			uploading: false,
			newFile: false,
			type: props.src ? 'image/' + props.src.split('.').pop() : false
		};
		return _this;
	}

	_createClass(ImageCropper, [{
		key: 'initiateFileUpload',
		value: function initiateFileUpload() {
			this.input.click();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			// is browser out-to-date, Mayura???
			if (typeof FileReader === 'undefined') {
				this.setState({
					errorMessage: this.props.outOfDateBrowserMessage
				});
			} else {
				// setup file reader
				this.reader = new FileReader();
				this.reader.onload = this.onFileReaderLoadImage.bind(this);
				this.reader.onerror = this.onFileReaderLoadImageFail.bind(this);
			}
		}
	}, {
		key: 'onChange',
		value: function onChange(e) {
			var file = e.target.files[0];
			if (!file.type.match('image.*')) {
				alert(this.props.badImageMessage);
				return;
			}

			this.setState({ changed: true, newFile: true });
			this.reader.readAsDataURL(file);
		}
	}, {
		key: 'onFileReaderLoadImage',
		value: function onFileReaderLoadImage(e) {
			var base64 = e.target.result;
			var type = base64.substr(5, base64.search(';') - 5);
			this.setState({
				loading: false,
				tapToCrop: false,
				errorMessage: false,
				base64Image: base64,
				type: type
			});
		}
	}, {
		key: 'onFileReaderLoadImageFail',
		value: function onFileReaderLoadImageFail(err) {
			console.error(err);
			this.setState({ errorMessage: this.props.uploadImageFailedMessage });
		}
	}, {
		key: 'onCropChange',
		value: function onCropChange(crop, pixelCrop) {
			this.setState({ crop: crop, pixelCrop: pixelCrop, changed: true });
		}
	}, {
		key: 'onImageLoadedFromCropper',
		value: function onImageLoadedFromCropper(image) {
			if (!this.cropper) {
				// this can happen when the cropper is hidden, then shown
				return;
			} else {
				var crop = this.state.crop;
				var pixelCrop = this.cropper.getPixelCrop(crop);

				this.setState({
					crop: crop,
					pixelCrop: pixelCrop,
					loading: false
				});
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.src !== this.props.src) {
				this.setState({
					type: 'image/' + nextProps.src.split('.').pop(),
					base64Image: false,
					newFile: true,
					src: nextProps.src
				});
			}
		}
	}, {
		key: 'hideBlock',
		value: function hideBlock() {
			this.setState({ tapToCrop: false, crop: this.state.crop, changed: true });
		}
	}, {
		key: 'onSave',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this2 = this;

				var _state, pixelCrop, type, image, canvas, ctx, cropped;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_state = this.state, pixelCrop = _state.pixelCrop, type = _state.type;

								if (type) {
									_context.next = 4;
									break;
								}

								this.setState({
									errorMessage: this.props.badImageMessage
								});
								return _context.abrupt('return');

							case 4:
								_context.prev = 4;

								this.setState({ uploading: true });

								_context.next = 8;
								return new Promise(function (resolve, reject) {
									var image = new Image();
									image.crossOrigin = 'Anonymous';
									image.onload = function () {
										resolve(image);
									};
									image.onerror = function (err) {
										reject(err);
									};
									image.src = _this2.cropper.imageRef.src;
								});

							case 8:
								image = _context.sent;
								canvas = document.createElement('canvas');

								canvas.width = pixelCrop.width;
								canvas.height = pixelCrop.height;
								ctx = canvas.getContext('2d');


								ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
								cropped = canvas.toDataURL(type);
								_context.next = 17;
								return this.props.onSave(cropped, type);

							case 17:

								// reset things how they were
								this.setState({
									tapToCrop: this.props.tapToCrop,
									changed: false,
									newFile: false,
									base64Image: cropped
								});
								_context.next = 24;
								break;

							case 20:
								_context.prev = 20;
								_context.t0 = _context['catch'](4);

								console.error(_context.t0);
								this.setState({ errorMessage: this.props.uploadImageFailedMessage });

							case 24:

								this.setState({ uploading: false });

							case 25:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[4, 20]]);
			}));

			function onSave() {
				return _ref.apply(this, arguments);
			}

			return onSave;
		}()
	}, {
		key: 'cancel',
		value: function cancel() {
			this.setState({
				tapToCrop: this.props.tapToCrop,
				crop: this.props.crop,
				changed: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    accept = _props.accept,
			    uploadButtonText = _props.uploadButtonText,
			    uploadNewButtonText = _props.uploadNewButtonText,
			    saveButtonText = _props.saveButtonText,
			    tapToCropButtonText = _props.tapToCropButtonText,
			    cancelButtonText = _props.cancelButtonText,
			    src = _props.src;
			var _state2 = this.state,
			    uploading = _state2.uploading,
			    base64Image = _state2.base64Image,
			    crop = _state2.crop,
			    loading = _state2.loading,
			    changed = _state2.changed,
			    tapToCrop = _state2.tapToCrop,
			    errorMessage = _state2.errorMessage,
			    newFile = _state2.newFile;


			var cropSrc = base64Image || src;

			return _react2.default.createElement(
				'div',
				{ className: 'image_cropper' },
				errorMessage && _react2.default.createElement(
					_BotText2.default,
					null,
					errorMessage
				),
				loading && _react2.default.createElement(_Loader2.default, null),
				!errorMessage && cropSrc && _react2.default.createElement(
					StyledReactCrop,
					{ loading: loading, tapToCrop: tapToCrop },
					_react2.default.createElement(_reactImageCrop2.default, {
						crossorigin: 'Anonymous',
						ref: function ref(cropper) {
							return _this3.cropper = cropper;
						},
						keepSelection: true,
						onImageLoaded: this.onImageLoadedFromCropper.bind(this),
						src: cropSrc,
						crop: crop,
						onChange: this.onCropChange.bind(this)
					}),
					tapToCrop && _react2.default.createElement(
						'div',
						{ className: 'block' },
						!loading && _react2.default.createElement(
							_Button2.default,
							{ onClick: this.hideBlock.bind(this) },
							tapToCropButtonText
						)
					)
				),
				_react2.default.createElement('input', {
					style: { display: 'none' },
					type: 'file',
					ref: function ref(input) {
						_this3.input = input;
					},
					accept: accept,
					onChange: this.onChange.bind(this)
				}),
				!loading && _react2.default.createElement(
					_SubmitWrapper2.default,
					null,
					changed && !errorMessage && _react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							onClick: this.onSave.bind(this),
							primary: true
						},
						saveButtonText
					),
					changed && !newFile && !errorMessage && _react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							onClick: this.cancel.bind(this),
							secondary: true
						},
						cancelButtonText
					),
					_react2.default.createElement(
						_Button2.default,
						{
							busy: uploading,
							alt: true,
							onClick: this.initiateFileUpload.bind(this)
						},
						src ? uploadNewButtonText : uploadButtonText
					)
				)
			);
		}
	}]);

	return ImageCropper;
}(_react.Component);

exports.default = ImageCropper;


ImageCropper.propTypes = {
	base64Image: _propTypes2.default.string,
	imageUrl: _propTypes2.default.string,
	onSave: _propTypes2.default.func.isRequired,
	badImageMessage: _propTypes2.default.any.isRequired,
	outOfDateBrowserMessage: _propTypes2.default.any.isRequired,
	uploadImageFailedMessage: _propTypes2.default.any.isRequired,
	loadingImageFailedMessage: _propTypes2.default.any.isRequired,
	uploadButtonText: _propTypes2.default.any.isRequired,
	uploadNewButtonText: _propTypes2.default.any.isRequired,
	tapToCropButtonText: _propTypes2.default.any.isRequired,
	saveButtonText: _propTypes2.default.any.isRequired,
	cancelButtonText: _propTypes2.default.any.isRequired,
	accept: _propTypes2.default.string.isRequired,
	crop: _propTypes2.default.object.isRequired,
	tapToCrop: _propTypes2.default.bool
};

ImageCropper.defaultProps = {
	accept: 'image/*',
	loadingImageFailedMessage: "Uh man, I couldn't load your image.",
	badImageMessage: 'Bad upload! You gotta select an image.',
	outOfDateBrowserMessage: 'You gotta update your browser to upload and crop images. ☹️',
	uploadImageFailedMessage: "So, this is embarrassing, but I could not upload that file and couldn't tell you why. 😞",
	uploadButtonText: 'Upload Image',
	uploadNewButtonText: 'Upload Different Image',
	saveButtonText: 'Save Changes',
	tapToCropButtonText: 'Tap to Re-Crop',
	cancelButtonText: 'Cancel Crop',
	tapToCrop: false,
	crop: {
		aspect: 1
	}
};

var StyledReactCrop = _styledComponents2.default.div.withConfig({
	displayName: 'ImageCropper__StyledReactCrop',
	componentId: 'p6nh2a-0'
})(['position:relative;opacity:', ';.block{position:absolute;left:0px;top:0px;right:0px;bottom:0px;background-color:rgba(0,0,0,0.6);line-height:100%;text-align:center;display:flex;justify-content:center;button{height:50px;width:150px;align-self:center;}}.ReactCrop{position:relative;display:inline-block;cursor:crosshair;overflow:hidden;width:100%;}.ReactCrop:focus{outline:none;}.ReactCrop--disabled{cursor:inherit;}.ReactCrop__image{display:block;width:100%;}.ReactCrop--crop-invisible .ReactCrop__image{opacity:0.5;}.ReactCrop__crop-selection{position:absolute;top:0;left:0;transform:translate3d(0,0,0);box-sizing:border-box;cursor:move;box-shadow:0 0 0 9999em rgba(0,0,0,0.5);border:1px solid;border-image-source:url(\'data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==\');border-image-slice:1;border-image-repeat:repeat;opacity:', ';}.ReactCrop--disabled .ReactCrop__crop-selection{cursor:inherit;}.ReactCrop__drag-handle{position:absolute;width:9px;height:9px;background-color:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.7);box-sizing:border-box;outline:1px solid transparent;}.ReactCrop .ord-nw{top:0;left:0;margin-top:-5px;margin-left:-5px;cursor:nw-resize;}.ReactCrop .ord-n{top:0;left:50%;margin-top:-5px;margin-left:-5px;cursor:n-resize;}.ReactCrop .ord-ne{top:0;right:0;margin-top:-5px;margin-right:-5px;cursor:ne-resize;}.ReactCrop .ord-e{top:50%;right:0;margin-top:-5px;margin-right:-5px;cursor:e-resize;}.ReactCrop .ord-se{bottom:0;right:0;margin-bottom:-5px;margin-right:-5px;cursor:se-resize;}.ReactCrop .ord-s{bottom:0;left:50%;margin-bottom:-5px;margin-left:-5px;cursor:s-resize;}.ReactCrop .ord-sw{bottom:0;left:0;margin-bottom:-5px;margin-left:-5px;cursor:sw-resize;}.ReactCrop .ord-w{top:50%;left:0;margin-top:-5px;margin-left:-5px;cursor:w-resize;}.ReactCrop__disabled .ReactCrop__drag-handle{cursor:inherit;}.ReactCrop__drag-bar{position:absolute;}.ReactCrop__drag-bar.ord-n{top:0;left:0;width:100%;height:6px;margin-top:-4px;}.ReactCrop__drag-bar.ord-e{right:0;top:0;width:6px;height:100%;margin-right:-4px;}.ReactCrop__drag-bar.ord-s{bottom:0;left:0;width:100%;height:6px;margin-bottom:-4px;}.ReactCrop__drag-bar.ord-w{top:0;left:0;width:6px;height:100%;margin-left:-4px;}.ReactCrop--new-crop .ReactCrop__drag-bar,.ReactCrop--new-crop .ReactCrop__drag-handle,.ReactCrop--fixed-aspect .ReactCrop__drag-bar{display:none;}.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w{display:none;}@media (max-width:768px){.ReactCrop__drag-handle{width:17px;height:17px;}.ReactCrop .ord-nw{margin-top:-9px;margin-left:-9px;}.ReactCrop .ord-n{margin-top:-9px;margin-left:-9px;}.ReactCrop .ord-ne{margin-top:-9px;margin-right:-9px;}.ReactCrop .ord-e{margin-top:-9px;margin-right:-9px;}.ReactCrop .ord-se{margin-bottom:-9px;margin-right:-9px;}.ReactCrop .ord-s{margin-bottom:-9px;margin-left:-9px;}.ReactCrop .ord-sw{margin-bottom:-9px;margin-left:-9px;}.ReactCrop .ord-w{margin-top:-9px;margin-left:-9px;}.ReactCrop__drag-bar.ord-n{height:14px;margin-top:-12px;}.ReactCrop__drag-bar.ord-e{width:14px;margin-right:-12px;}.ReactCrop__drag-bar.ord-s{height:14px;margin-bottom:-12px;}.ReactCrop__drag-bar.ord-w{width:14px;margin-left:-12px;}}'], function (props) {
	return props.loading ? 0 : 1;
}, function (props) {
	return props.tapToCrop ? 0 : 1;
});