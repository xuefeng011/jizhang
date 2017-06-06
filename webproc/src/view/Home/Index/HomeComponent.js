import React, {
  // PropTypes,
  Component
} from 'react'


// import {
//   Tabs,
//   Switch
// } from 'antd';
// const TabPane = Tabs.TabPane;

// import style from './index.less'

import SearchModule from 'SearchModule'


class Home extends Component {
  constructor(props) {
    super(props)


  }

  componentDidMount() {
    // console.log("home/component/index.js")
  }

  render() {

    return (
      <div><SearchModule/></div>
    )
  }
}

Home.propTypes = {
  // UserInfo: PropTypes.object.isRequired
}

export default Home