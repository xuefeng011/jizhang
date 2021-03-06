import React, {
  Component,
  PropTypes
} from 'react'

import style from './index.less'
import {
  Button,
  List,
  InputItem,
  WhiteSpace,
  Picker
} from 'antd-mobile'


import co from 'co'


class EditModule extends Component {

  constructor(props) {
    super(props)
    this.state = props.data;

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //         if (nextProps != this.state) {
  //             this.setState(nextProps)
  //         }

  //     }

  componentDidMount() {
    // this.state = this.props.data
  }

  render() {

    const props = this.props;
    const item = props.data;

    const _this = this;


    if (!item) {
      return null;
    }

    const fn = this.props.collectData;
    // this.setState(props.data) 
    if (this.state.Ischanged) {
      fn(this.state)
    }

    const source = props.source||[];

    // const selects = [{
    //   label: '食行生鲜',
    //   value: '食行生鲜',
    // }, {
    //   label: '永辉超市',
    //   value: '永辉超市',
    // }];

    let selects=[];

    for(let i=0;i<source.length;i++)
    {
      if(source[i].Type===1111) selects.push({
        label: source[i].Value,
        value: source[i].Key+":"+source[i].Value
      })
    }
    
    return (

      <List renderHeader={() => `[${item.FollowId}] ${item.Name}`}>
          <InputItem disabled={!this.state.IsFirst} value={this.state.Name} onChange={(value)=>{this.setState({Name:value,Ischanged:true});}} clear>名称</InputItem>
          <InputItem value={this.state.Price} onChange={(value)=>{this.setState({Price:value,Ischanged:true});}} type="money" extra="¥"  clear>价格</InputItem>
          <InputItem value={this.state.Unit} onChange={(value)=>{this.setState({Unit:value,Ischanged:true});}} clear>单位</InputItem>
          <Picker data={selects} cols={1} value={[this.state.SourceId+":"+this.state.SourceName]} onChange={(value)=>{const tempvalue=value[0].split(':');  this.setState({SourceId:Number(tempvalue[0]),SourceName:tempvalue[1],Ischanged:true});}} className="forss">
            <List.Item arrow="horizontal">來源</List.Item>
          </Picker>
          {/*
          <InputItem value={this.state.SourceId} onChange={(value)=>{this.setState({SourceId:value,Ischanged:true});}} type="number" clear>SId</InputItem>
          <InputItem value={this.state.SourceName} onChange={(value)=>{this.setState({SourceName:value,Ischanged:true});}} clear>SName</InputItem>
        */}
          <InputItem value={this.state.SourceProductNo} onChange={(value)=>{this.setState({SourceProductNo:value,Ischanged:true});}} type="number" clear>SPNo</InputItem>
          
          <WhiteSpace size="lgg" />
          <InputItem  disabled={true} value={this.state.InsertUser} >人员</InputItem>
          <InputItem  disabled={true} value={co.getFullDate(this.state.InsertDate)["6"]} >插入时间</InputItem>
          <InputItem  disabled={true} value={co.getFullDate(this.state.UpdateDate)["6"]} >更新时间</InputItem>
          <WhiteSpace size="lgg" />
         
        </List>
    );
  }
}

EditModule.propTypes = {

  data: PropTypes.object,
  itemData: PropTypes.object,
  source: PropTypes.array,
  collectData: PropTypes.func
}

EditModule.defaultProps = {

}

export default EditModule;