import React, {
  PropTypes,
  Component
} from 'react'


import {
  List,
  InputItem,
  WhiteSpace,
  Toast
} from 'antd-mobile';


import store from '../../../store/index'

import DatasChartModule from 'DatasChartModule'
import DatasListModule from 'DatasListModule'

import {
  hashHistory
} from 'react-router'



import co from 'co'

import defaultpng from './404.png'

import style from './index.less'


import _ from 'underscore'


import service from '../../../services/index'


class Detail extends React.Component {
  state = {
    moneyfocused: false,
  }
  constructor(props) {
    super(props)
      // this.props=store.getState()
    this.state = props.DetailItem
  }

  componentWillMount() {
    this.checkinit()
  }

  componentDidMount() {

    const props = this.props

  }


  checkinit() {
    if (!this.state) {
      this.getData();
    }
  }

  getData() {

    Toast.loading('Loading...', 1, () => {
      const props = this.props
      var FollowId = co.getArgs(props.location.search).FollowId || 0;
      if (FollowId <= 0) {
        hashHistory.push('/follows')
        return;
      }
      service.getfollowgroupByFollowId(FollowId).then((datas) => {
        this.setState(datas[0])
      }).catch(() => {
        console.log('error')
        hashHistory.push('/follows')
        return;
      });
    }, true);
  }

  onflesh() {
    this.getData();
    //console.log('onfless')

  }
  render() {

    const {
      transDataGroup
    } = this.props;

    // console.log(this.state)

    if (!this.state) {
      return null;
    }

    const item = this.state

    const props = this.props

    const series = transDataGroup(item);

    return (
      <div>
        <List renderHeader={() => `[${item.FollowId}] ${item.Name}`}>
          <InputItem editable={false} value={item.Price} extra="¥" > 最新价格</InputItem>
          <InputItem editable={false} value={item.Unit} >单位</InputItem>
          <InputItem editable={false} value={item.MaxPrice}  extra="¥" >最大金额</InputItem>
          <InputItem editable={false} value={item.MinPrice}  extra="¥" >最小金额</InputItem>
          <InputItem editable={false} value={co.getFullDate(item.InsertDate)["6"]} >最近更新</InputItem>
          <InputItem editable={false} value={item.InsertUser} >数据来源</InputItem>
          <WhiteSpace size="lgg" />
          <List.Item className={style.charts} >
              <DatasChartModule series={series} />
          </List.Item>
          <WhiteSpace size="lgg" />
          <List.Item className={style.lists} >
              <DatasListModule onfresh={()=>this.onflesh()} series={series} datas={item.Datas} itemData={item} />
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
  DetailItem: PropTypes.object
}

export default Detail;