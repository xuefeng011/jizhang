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
			url: 'https://gougoustar.duapp.com/products/getall',
			method: 'get',
			data: this.state.pagination,
			type: 'json'
		}).then((data) => {

			const _pagination = this.state.pagination
			const _datas = this.state.datas;

			if (!!data.Datas && data.Datas.length > 0) {
				data.Datas.map((item) => {
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

		const nomore = (<Flex>
          <Flex.Item className="tc"><Tag disabled>到底了...</Tag></Flex.Item>       
        </Flex>)

		const more = (<Flex>
          <Flex.Item className="tc"><Tag  onChange={()=>this.fetch()} className="tc" selected>点击加载更多...</Tag></Flex.Item>       
        </Flex>)

		return (<div>
			<ListModule type="productlist" datas={this.state.datas}/>
			{this.state.isOver?nomore:more}
			</div>);

	}
}

Home.propTypes = {
	UserInfo: PropTypes.object.isRequired
}

export default Home