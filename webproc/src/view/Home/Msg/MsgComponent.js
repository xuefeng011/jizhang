import React, {
    PropTypes,
    Component
    // ReactIScroll
} from 'react'
// import Rule from 'Rule'
// import PopUp from 'PopUp'
// import Jigsaw from 'Jigsaw'
// import Nutip from 'Nutip'
// import BonusContainer from '../BonusPage/BonusContainer'
// import style from './home.less'


import {
    hashHistory
} from 'react-router'


import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

import './index.css'
// import iScroll from 'iScroll'


// import co from 'co'

// import {
//     Msg,
//     SuccessFooter
// } from 'react-weui';

class Home extends Component {

    constructor(props) {
        super(props)
         this.simpleList = [{
                  id: 1,
                  name: '苹果'
                }, {
                  id: 2,
                  name: '苹果'
                }, {
                  id: 3,
                  name: '苹果'
                }, {
                  id: 4,
                  name: '苹果'
                }, {
                  id: 5,
                  name: '苹果'
                }, {
                  id: 6,
                  name: '苹果'
                }, {
                  id: 7,
                  name: '苹果'
                }, {
                  id: 8,
                  name: '苹果'
                }, {
                  id: 9,
                  name: '苹果'
                }, {
                  id: 10,
                  name: '苹果'
                }, {
                  id: 11,
                  name: '苹果'
                }, {
                  id: 12,
                  name: '苹果'
                }, {
                  id: 13,
                  name: '苹果'
                }, {
                  id: 14,
                  name: '苹果'
                }];
              
    }

 


    componentDidMount() {}

    onScrollStart(target) {
        //hashHistory.replace(target)
    }

    render() {
        // var i = 0,
        //     len = 1000,
        //     listOfLi = [];

        // for (i; i < len; i++) {
        //     listOfLi.push(<li key={i}>Row {i+1}</li>)
        // }
        return (
           <div >
        <ReactIScroll iScroll={iScroll} className="example">
           <ul>
            {this.simpleList.map((item) =>
              <li key={item.id}>{item.name}</li>
            )}
          </ul>
        </ReactIScroll>
      </div>
        )
    }
}

Home.propTypes = {
    UserInfo: PropTypes.object.isRequired
}

export default Home