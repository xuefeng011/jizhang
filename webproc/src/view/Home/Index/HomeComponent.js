import React, {
  PropTypes,
  Component
} from 'react'


// import {
//   Tabs,
//   Switch
// } from 'antd';
// const TabPane = Tabs.TabPane;

// import style from './index.less'

// import SearchModule from 'SearchModule'
import ListModule from 'ListModule'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      focused: false,
      showlist: true,
      datas: [1,2,3,4]
    }

  }

  componentDidMount() {
    // console.log("home/component/index.js")
    this.props.changeTitle('首页');
    // console.log("this.props",this.props)
  }

  render() {

    return (
      <ListModule show={this.state.showlist} datas={this.state.datas} />
    )
  }
}

Home.propTypes = {
  changeTitle: PropTypes.func.isRequired
}

export default Home