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
				page: 1,
				sortField: "Id",
				sortOrder: -1,
				results: 10,
				ProductId: [1]
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

		reqwest({
			url: 'https://gougoustar.duapp.com/products/getall',
			method: 'get',
			data: {
				...this.state.pagination
			},
			type: 'json'
		}).then((data) => {

			const pagination = this.state.pagination
			const datas = this.state.datas;

			if (!!data.datas && data.datas.length > 0) {
				data.datas.map((item) => {
					datas.push(item)
				})

				pagination.page = pagination.page + 1

				this.setState({
					loading: false,
					pagination: pagination,
					datas: datas
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