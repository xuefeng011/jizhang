import React, {
	PropTypes,
	Component
} from 'react'


import {
	ListView
} from 'antd-mobile';

import './index.css'


import {
	List,
	Tag,
	Flex
} from 'antd-mobile'

const Item = List.Item;

import ListModule from 'ListModule'


import co from 'co'

// import 'whatwg-fetch'

import reqwest from 'reqwest';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			datas: [],
			pagination: {
				pagesize: 15,
				pageindex: 1,
				conditions: {
					// SourceId: 6
				},
				options: {
					Id: -1
				}
			},
			isLoading: "",
			isOver: false
		}
	}
	componentDidMount() {
		// console.log("detail/component/index.js",this.props)
		this.fetch()
	}

	fetch() {
		// console.log(this.state)

		//if(this.state.isOver) return;
		this.setState({
			loading: true
		});

		// var data = {
		// 	pagesize: 15,
		// 	pageindex: 1,
		// 	conditions: {
		// 		// SourceId: 6,
		// 		//Id: [62788, 62772],
		// 		Id: {

		// 		}
		// 	},
		// 	options: {
		// 		Id: -1
		// 	}
		// }

		reqwest({
			url: co.ServerUrl+'follows/getbygroup',
			method: 'get',
			data: this.state.pagination,
			type: 'json'
		}).then((data) => {

			const _pagination = this.state.pagination
			const _datas = this.state.datas;

			if (!!data.datas && data.datas.length > 0) {
				data.datas.map((item) => {
					_datas.push(item)
				})

				_pagination.pageindex = _pagination.pageindex + 1

				this.setState({
					loading: false,
					pagination: _pagination,
					datas: _datas
				});
			} else {
				this.setState({
					loading: false,
					isOver: true
				});
			}



		});
	}

	render() {
		const props = this.props
		return (<div>
			<ListModule type="follows" datas={this.state.datas}/>
			</div>);

	}
}

Home.propTypes = {
	UserInfo: PropTypes.object.isRequired
}

export default Home