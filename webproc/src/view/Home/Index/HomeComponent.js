import React, { PropTypes, Component } from 'react'
// import Rule from 'Rule'
// import PopUp from 'PopUp'
// import Jigsaw from 'Jigsaw'
// import Nutip from 'Nutip'
// import BonusContainer from '../BonusPage/BonusContainer'
// import style from './home.less'



// import WeUI from 'react-weui';

// import { Button } from 'react-weui';

import Sudoku from 'Sudoku'
import Search from 'Search'
import List from 'List'
import Selection from 'Selection'
// import Foot from 'Foot'

import { Tab, TabBar, TabBarItem, TabBody, TabBarIcon, TabBarLabel, div } from 'react-weui';


import icon1 from './1.png';
import icon2 from './2.png';
import icon3 from './3.png';
import icon4 from './4.png';

import style from './index.less'

// import 'antd/dist/antd.css';
// import { Button } from 'antd';

class Home extends Component {
    state = {
        tab: 0
    };

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // console.log("home/component/index.js")
    }

    handleclick(index) {
        this.setState({
            tab: index
        })
    }
    render() {

        const datas = [{
            name: "添加水果",
            date: "2016-1"
        }, {
            name: "添加类型",
            date: "2016-1"
        }, {
            name: "添加品种",
            date: "2016-1"
        }]

        return (
            <Tab>
                <TabBody>
                    <div style={{
                display: this.state.tab == 0 ? null : 'none'
            }}>
                        <section>
                            <Search/>
                            <Sudoku/>
                            <List datas={datas}/>
                        </section>
                    </div>
                    <div style={{
                display: this.state.tab == 1 ? null : 'none'
            }}>
                        <section>
                            <Selection/>
                        </section>
                    </div>
                    <div style={{
                display: this.state.tab == 2 ? null : 'none'
            }}>
                        <section>
                        test2
                            { /*page 3*/ }
                        </section>
                    </div>
                    <div style={{
                display: this.state.tab == 3 ? null : 'none'
            }}>
                        <section>
                        test3
                            { /*page 4*/ }
                        </section>
                    </div>
                </TabBody>
                <TabBar className={style.foot}>
                    <TabBarItem
            active={this.state.tab == 0}
            onClick={() => this.handleclick(0)}
            icon={<img src={icon1}/>}
            label="首页"/>
                    <TabBarItem
            active={this.state.tab == 1}
            onClick={() => this.handleclick(1)} >
                        <TabBarIcon>
                            <img src={icon2}/>
                        </TabBarIcon>
                        <TabBarLabel>详情</TabBarLabel>
                    </TabBarItem>
                    <TabBarItem
            active={this.state.tab == 2}
            onClick={() => this.handleclick(2)}
            icon={<img src={icon3}/>}
            label="报表" />
                    <TabBarItem
            active={this.state.tab == 3}
            onClick={() => this.handleclick(3)}
            icon={<img src={icon4}/>}
            label="设置" />
                </TabBar>
            </Tab>
        );
    }
}

Home.propTypes = {
    UserInfo: PropTypes.object.isRequired
}

export default Home