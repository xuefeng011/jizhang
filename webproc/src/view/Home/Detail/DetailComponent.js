import React, {
	PropTypes,
	Component
} from 'react'


import {
	List,
	InputItem
} from 'antd-mobile';


import store from '../../../store/index'

import DatasChartModule from 'DatasChartModule'

import {
	hashHistory
} from 'react-router'


import {
	createForm
} from 'rc-form';

import co from 'co'

import defaultpng from './404.png'

class Detail extends React.Component {
	state = {
		moneyfocused: false,
	}
	constructor(props) {
		super(props)
			// this.props=store.getState()
	}

	componentWillMount() {
		const props = this.props;
		// console.log(6666,this.props)

		if (!props.DetailItem) {
			hashHistory.push('/')
		}
	}

	componentDidMount() {

		const props = this.props

	}


	testNum(){
		return {
              normalize: (v, prev) => {
              return v;
                // if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                //   if (v === '.') {
                //     return '0.';
                //   }
                //   return prev;
                // }
                // return v;
              },
            }
	}
	render() {
		const props = this.props;
		const item = props.DetailItem

		// console.log("DetailItem",item)

		let errors;

		const {
			getFieldProps,
			getFieldError
		} = props.form;


		//<InputItem {...getFieldProps('money2', this.testNum())}  editable={false}  type="money" value="xx" clear maxLength={10} >数字键盘</InputItem>
		return (
      <div>
        <List renderHeader={() => `[${item.FollowId}] ${item.Name}`}>
          <InputItem editable={false} value={item.Price}>最新价格</InputItem>
          <InputItem editable={false} value={item.Unit} >单位</InputItem>
          <InputItem editable={false} value={item.MaxPrice} >最大金额</InputItem>
          <InputItem editable={false} value={item.MinPrice} >最小金额</InputItem>
          <InputItem editable={false} value={co.getFullDate(item.InsertDate)["6"]} >最近更新</InputItem>
          <InputItem editable={false} value={item.Unit} >数据来源</InputItem>
          <List.Item >
          <div style={{"textAlign":'center'}}>
              <img src={defaultpng} style={{width:'60%',height:window.innerWidth*0.6,border:'0px dashed gray'}} />
          </div>
          </List.Item>
          <List.Item >
              <DatasChartModule DetailItem={item}/>
          </List.Item>
        </List>
      </div>
    );
	}
}

Detail.propTypes = {
	data: PropTypes.object,
	form: PropTypes.object
}

export default createForm()(Detail);