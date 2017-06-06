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

// import TableModule from 'TableModule'


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'top'
    };
  }
  handleModeChange = (istop) => {
    this.setState({
      mode: istop ? 'left' : 'top'
    });
  }
  componentDidMount() {
    // console.log("home/component/index.js")
  }

  render() {

    return (
      <div></div>
    )
  }
}

Home.propTypes = {
  UserInfo: PropTypes.object.isRequired
}

export default Home