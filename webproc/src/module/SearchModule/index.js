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

import service from '../../services/index'


class SearchModule extends Component {
  constructor(props) {
    super(props)
      // console.log("searchmodule",props)
    this.state = {
      value: '',
      focused: false,
      datas: props.datas || []
    };
  }

  onChange(value) {

    if (value && value.trim().length > 0) {

      this.setState({
        value: value
      });
    } else {
      this.setState({
        datas: [],
        value: ""
      });
    }
  }


  onSubmit(value) {
    // var temp = this.state.datas;
    // console.log('[' + value + ']', 'onChange', temp);
    if (value && value.trim().length > 0) {

      this.fetch(value);
    } else {
      this.setState({
        datas: []
      });
    }
  }

  clear = () => {
    // tempdatas = []
    this.setState({
      value: '',
      datas: []
    });
  }

  componentDidMount() {

  }

  fetch(key) {
    // const key = "酱油";
    service.getfollowgroup({
      "$or": [{
        "Name": {
          "$regex": ".*" + key + ".*",
          "$options": "i"
        }
      }]
    }).then((datas) => {
      // console.log("search",datas)
      this.setState({
        datas: datas
      })
    }).catch(() => {
      console.log('error')
    });
  }


  render() {
    return (<div>
         {/* <WhiteSpace />
          <WingBlank><div className="sub-title"></div></WingBlank>*/}
          <SearchBar
            value={this.state.value}
            placeholder="搜索"
            onSubmit={this.onSubmit.bind(this)}
            onClear={this.clear.bind(this)}
            onFocus={() => {}}
            onBlur={() => {}}
            onCancel={this.clear.bind(this)}
            onChange={this.onChange.bind(this)}
            cancelText="X" />
            <ListModule type="follows" datas={this.state.datas}/>
        </div>);
  }
}

SearchModule.propTypes = {
  datas: PropTypes.array.isRequired
}

SearchModule.defaultProps = {

}

export default SearchModule