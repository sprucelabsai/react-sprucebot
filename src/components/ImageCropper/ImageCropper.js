import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BotText from '../BotText/BotText'
import Loader from '../Loader/Loader'
import Button from '../Button/Button'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import styled from 'styled-components'
import SubmitWrapper from '../SubmitWrapper/SubmitWrapper'

export default class ImageCropper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: '',
			base64Image: props.base64Image,
			crop: props.crop,
			pixelCrop: props.prop,
			changed: false,
			loading: !!props.src, // if there is an image src being passed, we have to actually fetch it
			tapToCrop: props.tapToCrop,
			uploading: false,
			newFile: false,
			type: props.src ? `image/${props.src.split('.').pop()}` : false
		}
	}

	initiateFileUpload() {
		this.input.click()
	}

	componentDidMount() {
		// is browser out-to-date, Mayura???
		if (typeof FileReader === 'undefined') {
			this.setState({
				errorMessage: this.props.outOfDateBrowserMessage
			})
		} else {
			// setup file reader
			this.reader = new FileReader()
			this.reader.onload = this.onFileReaderLoadImage.bind(this)
			this.reader.onerror = this.onFileReaderLoadImageFail.bind(this)
		}
	}

	onChange(e) {
		const file = e.target.files[0]
		if (!file.type.match('image.*')) {
			alert(this.props.badImageMessage)
			return
		}

		this.setState({ changed: true, newFile: true })
		this.reader.readAsDataURL(file)
	}

	onFileReaderLoadImage(e) {
		const base64 = e.target.result
		const type = base64.substr(5, base64.search(';') - 5)
		this.setState({
			loading: false,
			tapToCrop: false,
			errorMessage: false,
			base64Image: base64,
			type: type
		})
	}

	onFileReaderLoadImageFail(err) {
		console.error(err)
		this.setState({ errorMessage: this.props.uploadImageFailedMessage })
	}

	onCropChange(crop, pixelCrop) {
		this.setState({ crop, pixelCrop, changed: true })
	}

	onImageLoadedFromCropper(image) {
		if (!this.cropper) {
			// this can happen when the cropper is hidden, then shown
			return
		} else {
			const crop = this.state.crop
			const pixelCrop = this.cropper.getPixelCrop(crop)
			const widthHeight =
				image.height < image.width ? image.height / 2 : image.width / 2
			const width = widthHeight / image.width * 100
			const height = widthHeight / image.height * 100
			const x = width >= height ? width / 2 : width
			const y = width <= height ? height / 2 : height

			this.setState({
				crop: {
					x,
					y,
					aspect: 1,
					width,
					height
				},
				pixelCrop,
				loading: false
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({
				type: `image/${nextProps.src.split('.').pop()}`,
				base64Image: false,
				newFile: true,
				src: nextProps.src
			})
		}
	}

	hideBlock() {
		this.setState({ tapToCrop: false, crop: this.state.crop, changed: true })
	}

	async onSave() {
		const { pixelCrop, type } = this.state

		if (!type) {
			this.setState({
				errorMessage: this.props.badImageMessage
			})
			return
		}

		try {
			this.setState({ uploading: true })

			const image = await new Promise((resolve, reject) => {
				const image = new Image()
				image.crossOrigin = 'Anonymous'
				image.onload = () => {
					resolve(image)
				}
				image.onerror = function(err) {
					reject(err)
				}
				image.src = this.cropper.imageRef.src
			})

			const canvas = document.createElement('canvas')
			canvas.width = pixelCrop.width
			canvas.height = pixelCrop.height
			const ctx = canvas.getContext('2d')

			ctx.drawImage(
				image,
				pixelCrop.x,
				pixelCrop.y,
				pixelCrop.width,
				pixelCrop.height,
				0,
				0,
				pixelCrop.width,
				pixelCrop.height
			)
			const cropped = canvas.toDataURL(type)

			await this.props.onSave(cropped, type)

			// reset things how they were
			this.setState({
				tapToCrop: this.props.tapToCrop,
				changed: false,
				newFile: false,
				base64Image: cropped
			})
		} catch (err) {
			console.error(err)
			this.setState({ errorMessage: this.props.uploadImageFailedMessage })
		}

		this.setState({ uploading: false })
	}

	cancel() {
		this.setState({
			tapToCrop: this.props.tapToCrop,
			crop: this.props.crop,
			changed: false
		})
	}

	render() {
		const {
			accept,
			uploadButtonText,
			uploadNewButtonText,
			saveButtonText,
			tapToCropButtonText,
			cancelButtonText,
			src
		} = this.props

		const {
			uploading,
			base64Image,
			crop,
			loading,
			changed,
			tapToCrop,
			errorMessage,
			newFile
		} = this.state

		const cropSrc = base64Image || src

		console.log(crop)

		return (
			<div className="image_cropper">
				{errorMessage && <BotText>{errorMessage}</BotText>}
				{loading && <Loader />}
				{!errorMessage &&
					cropSrc && (
						<StyledReactCrop loading={loading} tapToCrop={tapToCrop}>
							<ReactCrop
								crossorigin="Anonymous"
								ref={cropper => (this.cropper = cropper)}
								keepSelection={true}
								onImageLoaded={this.onImageLoadedFromCropper.bind(this)}
								src={cropSrc}
								crop={crop}
								onChange={this.onCropChange.bind(this)}
							/>
							{tapToCrop && (
								<div className="block">
									{!loading && (
										<Button onClick={this.hideBlock.bind(this)}>
											{tapToCropButtonText}
										</Button>
									)}
								</div>
							)}
						</StyledReactCrop>
					)}
				<input
					style={{ display: 'none' }}
					type="file"
					ref={input => {
						this.input = input
					}}
					accept={accept}
					onChange={this.onChange.bind(this)}
				/>
				{!loading && (
					<SubmitWrapper>
						{changed &&
							!errorMessage && (
								<Button
									busy={uploading}
									onClick={this.onSave.bind(this)}
									primary
								>
									{saveButtonText}
								</Button>
							)}

						{changed &&
							!newFile &&
							!errorMessage && (
								<Button
									busy={uploading}
									onClick={this.cancel.bind(this)}
									secondary
								>
									{cancelButtonText}
								</Button>
							)}

						<Button
							busy={uploading}
							alt
							onClick={this.initiateFileUpload.bind(this)}
						>
							{src ? uploadNewButtonText : uploadButtonText}
						</Button>
					</SubmitWrapper>
				)}
			</div>
		)
	}
}

ImageCropper.propTypes = {
	base64Image: PropTypes.string,
	imageUrl: PropTypes.string,
	onSave: PropTypes.func.isRequired,
	badImageMessage: PropTypes.any.isRequired,
	outOfDateBrowserMessage: PropTypes.any.isRequired,
	uploadImageFailedMessage: PropTypes.any.isRequired,
	loadingImageFailedMessage: PropTypes.any.isRequired,
	uploadButtonText: PropTypes.any.isRequired,
	uploadNewButtonText: PropTypes.any.isRequired,
	tapToCropButtonText: PropTypes.any.isRequired,
	saveButtonText: PropTypes.any.isRequired,
	cancelButtonText: PropTypes.any.isRequired,
	accept: PropTypes.string.isRequired,
	crop: PropTypes.object.isRequired,
	tapToCrop: PropTypes.bool
}

ImageCropper.defaultProps = {
	accept: 'image/*',
	loadingImageFailedMessage: "Uh man, I couldn't load your image.",
	badImageMessage: 'Bad upload! You gotta select an image.',
	outOfDateBrowserMessage:
		'You gotta update your browser to upload and crop images. ☹️',
	uploadImageFailedMessage:
		"So, this is embarrassing, but I could not upload that file and couldn't tell you why. 😞",
	uploadButtonText: 'Upload Image',
	uploadNewButtonText: 'Upload Different Image',
	saveButtonText: 'Save Changes',
	tapToCropButtonText: 'Tap to Re-Crop',
	cancelButtonText: 'Cancel Crop',
	tapToCrop: false,
	crop: {
		aspect: 1
	}
}

const StyledReactCrop = styled.div`
	position: relative;
	opacity: ${props => (props.loading ? 0 : 1)};
	.block {
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		background-color: rgba(0, 0, 0, 0.6);
		line-height: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		button {
			height: 50px;
			width: 150px;
			align-self: center;
		}
	}

	.ReactCrop {
		position: relative;
		display: inline-block;
		cursor: crosshair;
		overflow: hidden;
		width: 100%;
	}
	.ReactCrop:focus {
		outline: none;
	}
	.ReactCrop--disabled {
		cursor: inherit;
	}
	.ReactCrop__image {
		display: block;
		width: 100%;
	}
	.ReactCrop--crop-invisible .ReactCrop__image {
		opacity: 0.5;
	}
	.ReactCrop__crop-selection {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate3d(0, 0, 0);
		box-sizing: border-box;
		cursor: move;
		box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
		border: 1px solid;
		border-image-source: url('data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==');
		border-image-slice: 1;
		border-image-repeat: repeat;
		opacity: ${props => (props.tapToCrop ? 0 : 1)};
	}
	.ReactCrop--disabled .ReactCrop__crop-selection {
		cursor: inherit;
	}
	.ReactCrop__drag-handle {
		position: absolute;
		width: 9px;
		height: 9px;
		background-color: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.7);
		box-sizing: border-box;
		outline: 1px solid transparent;
	}
	.ReactCrop .ord-nw {
		top: 0;
		left: 0;
		margin-top: -5px;
		margin-left: -5px;
		cursor: nw-resize;
	}
	.ReactCrop .ord-n {
		top: 0;
		left: 50%;
		margin-top: -5px;
		margin-left: -5px;
		cursor: n-resize;
	}
	.ReactCrop .ord-ne {
		top: 0;
		right: 0;
		margin-top: -5px;
		margin-right: -5px;
		cursor: ne-resize;
	}
	.ReactCrop .ord-e {
		top: 50%;
		right: 0;
		margin-top: -5px;
		margin-right: -5px;
		cursor: e-resize;
	}
	.ReactCrop .ord-se {
		bottom: 0;
		right: 0;
		margin-bottom: -5px;
		margin-right: -5px;
		cursor: se-resize;
	}
	.ReactCrop .ord-s {
		bottom: 0;
		left: 50%;
		margin-bottom: -5px;
		margin-left: -5px;
		cursor: s-resize;
	}
	.ReactCrop .ord-sw {
		bottom: 0;
		left: 0;
		margin-bottom: -5px;
		margin-left: -5px;
		cursor: sw-resize;
	}
	.ReactCrop .ord-w {
		top: 50%;
		left: 0;
		margin-top: -5px;
		margin-left: -5px;
		cursor: w-resize;
	}
	.ReactCrop__disabled .ReactCrop__drag-handle {
		cursor: inherit;
	}
	.ReactCrop__drag-bar {
		position: absolute;
	}
	.ReactCrop__drag-bar.ord-n {
		top: 0;
		left: 0;
		width: 100%;
		height: 6px;
		margin-top: -4px;
	}
	.ReactCrop__drag-bar.ord-e {
		right: 0;
		top: 0;
		width: 6px;
		height: 100%;
		margin-right: -4px;
	}
	.ReactCrop__drag-bar.ord-s {
		bottom: 0;
		left: 0;
		width: 100%;
		height: 6px;
		margin-bottom: -4px;
	}
	.ReactCrop__drag-bar.ord-w {
		top: 0;
		left: 0;
		width: 6px;
		height: 100%;
		margin-left: -4px;
	}
	.ReactCrop--new-crop .ReactCrop__drag-bar,
	.ReactCrop--new-crop .ReactCrop__drag-handle,
	.ReactCrop--fixed-aspect .ReactCrop__drag-bar {
		display: none;
	}
	.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,
	.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,
	.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,
	.ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w {
		display: none;
	}
	@media (max-width: 768px) {
		.ReactCrop__drag-handle {
			width: 17px;
			height: 17px;
		}
		.ReactCrop .ord-nw {
			margin-top: -9px;
			margin-left: -9px;
		}
		.ReactCrop .ord-n {
			margin-top: -9px;
			margin-left: -9px;
		}
		.ReactCrop .ord-ne {
			margin-top: -9px;
			margin-right: -9px;
		}
		.ReactCrop .ord-e {
			margin-top: -9px;
			margin-right: -9px;
		}
		.ReactCrop .ord-se {
			margin-bottom: -9px;
			margin-right: -9px;
		}
		.ReactCrop .ord-s {
			margin-bottom: -9px;
			margin-left: -9px;
		}
		.ReactCrop .ord-sw {
			margin-bottom: -9px;
			margin-left: -9px;
		}
		.ReactCrop .ord-w {
			margin-top: -9px;
			margin-left: -9px;
		}
		.ReactCrop__drag-bar.ord-n {
			height: 14px;
			margin-top: -12px;
		}
		.ReactCrop__drag-bar.ord-e {
			width: 14px;
			margin-right: -12px;
		}
		.ReactCrop__drag-bar.ord-s {
			height: 14px;
			margin-bottom: -12px;
		}
		.ReactCrop__drag-bar.ord-w {
			width: 14px;
			margin-left: -12px;
		}
	}
`
