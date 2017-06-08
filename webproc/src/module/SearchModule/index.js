import React, {
  Component,
  PropTypes
} from 'react'


import {
  SearchBar,
  // Button,
  WhiteSpace,
  WingBlank
} from 'antd-mobile';


import ListModule from 'ListModule'

// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'

// var tempdatas = []

class SearchModule extends Component {
  constructor(props) {
    super(props)
    // console.log("searchmodule",props)
    this.state = {
      value: '',
      focused: false,
      datas: props.datas||[]
    };
  }
  
  onChange(value){
    var temp = this.state.datas;
    // console.log('[' + value + ']', 'onChange', temp);
    if (value && value.trim().length > 0) {
      temp.push(value)
    }
     
    this.setState({
      value: value,
      datas: temp
    });
  }
  clear = () => {
    // tempdatas = []
    this.setState({
      value: '',
      datas: []
    });
  }

  render() {
    return (<div>
         {/* <WhiteSpace />
          <WingBlank><div className="sub-title"></div></WingBlank>*/}
          <SearchBar
            value={this.state.value}
            placeholder="搜索"
            onSubmit={value => {}}
            onClear={this.clear.bind(this)}
            onFocus={() => {}}
            onBlur={() => {}}
            onCancel={this.clear.bind(this)}
            onChange={this.onChange.bind(this)}
            cancelText="X" />
            <ListModule datas={this.state.datas}/>
        </div>);
  }
}

SearchModule.propTypes = {
  datas: PropTypes.array.isRequired
}

SearchModule.defaultProps = {

}

export default SearchModule