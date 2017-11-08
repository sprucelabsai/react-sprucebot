import Avatar from './components/Avatar/Avatar'
import BotText from './components/BotText/BotText'
import Button from './components/Button/Button'
import Container from './components/Container/Container'
import Input from './components/Input/Input'
import Pre from './components/Pre/Pre'
import Switch from './components/Switch/Switch'
import Loader from './components/Loader/Loader'
import Form from './components/Form/Form'
import LinkPile from './components/LinkPile/LinkPile'
import Select from './components/Select/Select'
import SubmitWrapper from './components/SubmitWrapper/SubmitWrapper'
import Pager from './components/Pager/Pager'
import Stars from './components/Stars/Stars'
import DevControls from './components/DevControls/DevControls'
import * as ButtonGrid from './components/ButtonGrid/ButtonGrid'
import StatsSlider from './components/StatsSlider/StatsSlider'
import * as Typography from './components/Typography/Typography'
import * as List from './components/List/List'
import * as Tabs from './components/Tabs/Tabs'
import skill from './skillskit'
import _document from './skillskit/next/_document'
import Page from './skillskit/next/Page'
import withStore from './skillskit/store/withStore'

const Sprucebot = {
	skill,
	_document,
	Page,
	withStore,
	Avatar,
	BotText,
	Button,
	Container,
	Input,
	Pre,
	Switch,
	Loader,
	LinkPile,
	Form,
	Select,
	SubmitWrapper,
	Pager,
	StatsSlider,
	ButtonGrid,
	Stars,
	DevControls,
	...Typography,
	...List,
	...Tabs,
	...ButtonGrid
}
module.exports = Sprucebot
