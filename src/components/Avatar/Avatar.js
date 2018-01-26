import styled from 'styled-components'

const Avatar = styled.div.attrs({
	className: props => {
		let className = props.top ? 'top__avatar' : 'avatar__wrapper'
		if (props.online && props.showOnlineIndicator) {
			className += ' online'
		}
		return className
	}
})`
	${props => props.image && `background-image: url(${props.image});`};
`

export default Avatar
