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
	Flex,
	Toast
} from 'antd-mobile'

const Item = List.Item;

import ListModule from 'ListModule'


import co from 'co'


import service from '../../../services/index'


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
		Toast.loading('Loading...', 1, () => {
			this.fetch()
		}, true);
	}

	fetch() {
		this.setState({
			loading: true
		});

		service.getfollowgroup().then((datas) => {
			const _datas = this.state.datas;
			if (!!datas && datas.length > 0) {
				datas.map((item) => {
					_datas.push(item)
				})
				this.setState({
					loading: false,
					datas: _datas
				});
			} else {
				this.setState({
					loading: false,
					isOver: true
				});
			}
		}).catch(() => {
			console.log('error')
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
	DataInfo: PropTypes.object
}

export default Home