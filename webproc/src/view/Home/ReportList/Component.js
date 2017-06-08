import React, {
	PropTypes,
	Component
} from 'react'

class Home extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		// console.log("detail/component/index.js")
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