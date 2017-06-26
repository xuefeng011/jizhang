import React, {
  PropTypes,
  Component
} from 'react'


import {
  List,
  InputItem,
  WhiteSpace
} from 'antd-mobile';


import store from '../../../store/index'

import DatasChartModule from 'DatasChartModule'
import DatasListModule from 'DatasListModule'

import {
  hashHistory
} from 'react-router'


import {
  createForm
} from 'rc-form';

import co from 'co'

import defaultpng from './404.png'

import style from './index.less'


import _ from 'underscore'



class Detail extends React.Component {
  state = {
    moneyfocused: false,
  }
  constructor(props) {
    super(props)
      // this.props=store.getState()
  }

  componentWillMount() {
    this.checkinit()
  }

  componentDidMount() {

    const props = this.props

  }

  checkinit(){
     const props = this.props;
    // console.log(6666,this.props)

    if (!props.DetailItem) {
      hashHistory.push('/follows')
    }
  }

 

  testNum() {
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

    // console.log(3333333333333333,this.props)
    // this.checkinit()
    

    const {DetailItem,transDataGroup} = this.props;

    if(!DetailItem)
    {
      return null;
    }

    const item = DetailItem

    // console.log("DetailItem",item)
    const props = this.props

    let errors;

    const {
      getFieldProps,
      getFieldError
    } = props.form;

    const series = transDataGroup(item);
    //<InputItem {...getFieldProps('money2', this.testNum())}  editable={false}  type="money" value="xx" clear maxLength={10} >数字键盘</InputItem>
    return (
      <div>
        <List renderHeader={() => `[${item.FollowId}] ${item.Name}`}>
          <InputItem editable={false} value={"¥ "+item.Price}>最新价格</InputItem>
          <InputItem editable={false} value={item.Unit} >单位</InputItem>
          <InputItem editable={false} value={"¥ "+item.MaxPrice} >最大金额</InputItem>
          <InputItem editable={false} value={"¥ "+item.MinPrice} >最小金额</InputItem>
          <InputItem editable={false} value={co.getFullDate(item.InsertDate)["6"]} >最近更新</InputItem>
          <InputItem editable={false} value={item.InsertUser} >数据来源</InputItem>
          <WhiteSpace size="lgg" />
          <List.Item className={style.charts} >
              <DatasChartModule series={series} />
          </List.Item>
          <WhiteSpace size="lgg" />
          <List.Item className={style.lists} >
              <DatasListModule series={series} datas={item.Datas} itemData={item} />
          </List.Item>
          <WhiteSpace size="lgg" />
          <List.Item >
          <div style={{"textAlign":'center'}}>
              <img src={defaultpng} style={{width:'60%',height:window.innerWidth*0.6,border:'0px dashed gray'}} />
          </div>
          </List.Item>
          <WhiteSpace size="lgg" />
        </List>
      </div>
    );
  }
}

Detail.propTypes = {
  data: PropTypes.object,
  form: PropTypes.object,
  transDataGroup: PropTypes.func,
  DetailItem:PropTypes.object
}

export default createForm()(Detail);