import React, {
	PropTypes,
	Component
} from 'react'
// import Rule from 'Rule'
// import PopUp from 'PopUp'
// import Jigsaw from 'Jigsaw'
// import Nutip from 'Nutip'
// import BonusContainer from '../BonusPage/BonusContainer'
// import style from './home.less'

// import Listam from 'Listam'


class Home extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		console.log("detail/component/index.js")
	}
	render() {
		return (
			<div></div>
		)
	}
}

Home.propTypes = {
	UserInfo: PropTypes.object.isRequired
}

export default Home