import Avatar from './components/Avatar/Avatar'
import BotText from './components/BotText/BotText'
import Button from './components/Button/Button'
import Card from './components/Card/Card'
import Container from './components/Container/Container'
import Input from './components/Input/Input'
import Pre from './components/Pre/Pre'
import Switch from './components/Switch/Switch'
import Typeography from './components/Typeography/Typeography'
const Sprucebot = {
    components: {
        Avatar,
        BotText,
        Button,
        Card,
        Container,
        Input,
        Pre,
        Switch,
        ...Typeography
    }
}
export default Sprucebot
export const components = Sprucebot.components