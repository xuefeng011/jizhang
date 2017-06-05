import React, {
  PropTypes,
  Component
} from 'react'


import {
  Tabs,
  Switch
} from 'antd';
const TabPane = Tabs.TabPane;

import style from './index.less'

import TableModule from 'TableModule'


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

    const {
      mode
    } = this.state;
    return (
      <div>
            <Switch className={style.topswitch}  onChange={this.handleModeChange}  />
            <Tabs
              defaultActiveKey="1"
              tabPosition={mode}
              style={{ height: 'auto' }}
            >
              <TabPane tab="Home" key="1"><TableModule/></TabPane>
              <TabPane tab="Detail" key="2">Content of tab 2</TabPane>
              <TabPane tab="Other" key="3">Content of tab 3</TabPane>
            </Tabs>
            </div>
    )
  }
}

Home.propTypes = {
  UserInfo: PropTypes.object.isRequired
}

export default Home