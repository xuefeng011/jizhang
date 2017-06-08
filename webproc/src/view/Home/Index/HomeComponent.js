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

import {Flex,WhiteSpace,Grid,Icon} from 'antd-mobile'

import ListModule from 'ListModule'
import CardModule from 'CardModule'

import './index.css'

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
  text: `name${i}`
}));

// import eyepng from './eye.svg'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log("home/component/index.js")
    this.props.changeTitle('首页');
    // console.log("this.props",this.props)
  }

  render() {

    return (
      <div>
         <div className="home-top">
          <div className="bg-blue white">
            <Flex>
              <Flex.Item className="tc gray">总金额(元)</Flex.Item>       
            </Flex>
            <WhiteSpace size="xs" />
            <Flex>
              <Flex.Item className="tc fm-arial" style={{fontSize:"0.9rem"}}>60,347.79</Flex.Item>       
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item className="tc gray">昨日收益(元) +60.09</Flex.Item>       
            </Flex>
            <WhiteSpace size="lg" />
          </div>
          <WhiteSpace size="lg" />
         </div>
         <div className="home-body">
            <Grid data={data} columnNum={2} isCarousel onClick={(_el, index) => console.log(index)} />
            <CardModule />
            <WhiteSpace size="md" />
            <CardModule />
            <WhiteSpace size="md" />
            <CardModule />
            <WhiteSpace size="md" />
            <WhiteSpace size="md" />
         </div>
       </div>
    )
  }
}

Home.propTypes = {
  changeTitle: PropTypes.func.isRequired
}

export default Home