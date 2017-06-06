import React, {
  Component
  // PropTypes
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

var tempdatas = []

class SearchModule extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  state = {
    value: '',
    focused: false,
    showlist: false,
    datas: []
  };
  onChange = (value) => {


    if (value && value.trim().length > 0) {
      tempdatas.push(value)
    }
    // console.log('[' + value + ']', 'onChange', tempdatas);
    this.setState({
      value: value,
      showlist: !!value,
      datas: tempdatas
    });
  };
  clear = () => {
    tempdatas = []
    this.setState({
      value: '',
      showlist: false,
      datas: []
    });
  };

  render() {
    return (<div>
         {/* <WhiteSpace />
          <WingBlank><div className="sub-title"></div></WingBlank>*/}
          <SearchBar
            value={this.state.value}
            placeholder="搜索"
            onSubmit={value => console.log(value, 'onSubmit')}
            onClear={this.clear}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={this.clear}
            onChange={this.onChange}
            cancelText="X"
          />
          <WingBlank><div className="sub-title"></div></WingBlank>
          <WhiteSpace />
    <ListModule show={this.state.showlist} datas={this.state.datas}/>
        </div>);
  }
}

SearchModule.propTypes = {
  // datas: PropTypes.array.isRequired
}

SearchModule.defaultProps = {

}

export default SearchModule