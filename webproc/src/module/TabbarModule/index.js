import React, {
    Component,
    PropTypes
} from 'react'

import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'

import { TabBar, Icon } from 'antd-mobile';

import home from "./img/home.svg"; 
import home_o from "./img/home-o.svg"; 
import rate from "./img/rate.svg"; 
import rate_o from "./img/rate-o.svg"; 
import book from "./img/book.svg"; 
import book_o from "./img/book-o.svg"; 

class TabbarModule extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.state = {
            selectedTab: this.props.tabname,
            hidden: false
        };
    }
    renderContent(pageText) {
        return (
            <Link to="/s2">Tabs {pageText}</Link>
        );
    }

    onClickChange(target,tabname) {
        hashHistory.push(target)
        this.setState({
            selectedTab: tabname
        });
    }

    render() {


        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    icon={{ uri: home }}
                    selectedIcon={{ uri: home_o }}
                    title="生活"
                    key="home"
                    selected={this.state.selectedTab === "/home"}
                    onPress={() => this. onClickChange("/home","/home") }
                >
                    {/*<div>test</div>*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon type="koubei-o" size="md" />}
                    selectedIcon={<Icon type="koubei" size="md" />}
                    title="产品"
                    key="follows"
                    selected={this.state.selectedTab === '/follows'}
                    onPress={() => this. onClickChange("/follows",'/follows') }
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: rate }}
                    selectedIcon={{ uri: rate_o }}
                    title="报表"
                    key="reportlist"
                    selected={this.state.selectedTab === "/reportlist"}
                    onPress={() => this. onClickChange("/reportlist","/reportlist") }
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: book }}
                    selectedIcon={{ uri: book_o }}
                    title="我的"
                    key="msg"
                    selected={this.state.selectedTab === "/msg"}
                    onPress={() => this. onClickChange("/msg","/msg") }
                >
                </TabBar.Item>
            </TabBar>
        );
    }
}

TabbarModule.propTypes = {
    tabname: PropTypes.string
}

TabbarModule.defaultProps = {

}

export default TabbarModule