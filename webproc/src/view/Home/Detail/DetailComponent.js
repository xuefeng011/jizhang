import React, {
	PropTypes,
	Component
} from 'react'


import store from '../../../store/index'

import {hashHistory} from 'react-router'

class Home extends Component {
	constructor(props) {
		super(props)
		// this.props=store.getState()
	}

	componentWillMount() {
		const props = this.props;
		// console.log(6666,this.props)

		if(!props.DetailItem)
		{
			hashHistory.push('/')
		}
	}

	componentDidMount() {

		const props = this.props

	}
	render() {
		const props = this.props;
		const item = props.DetailItem

		console.log("DetailItem",item)

		return (
			<div>{item.Name}</div>
		)
	}
}

Home.propTypes = {
	data: PropTypes.object
}

export default Home