import styled from 'styled-components'

const Avatar = styled.div.attrs({
	className: props => {
		let className = props.top ? 'top__avatar' : 'avatar__wrapper'
		if (props.online) {
			className += ' online'
		}
		return className
	}
})`
	background-image: ${props => `url(${props.image})`};
`

export default Avatar
