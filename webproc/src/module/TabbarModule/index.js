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

import home from "./home.svg"; 
import home_o from "./home-o.svg"; 
import rate from "./rate.svg"; 
import rate_o from "./rate-o.svg"; 
import book from "./book.svg"; 
import book_o from "./book-o.svg"; 

class TabbarModule extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.state = {
            selectedTab: 'blueTab',
            hidden: false
        };
    }
    renderContent(pageText) {
        return (
            <Link to="/s2">Tabs {pageText}</Link>
        );
    }

    onClickChange(target,tabname) {
        hashHistory.replace(target)
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
                    key="生活"
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this. onClickChange("/home","blueTab") }
                >
                    {/*<div>test</div>*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon type="koubei-o" size="md" />}
                    selectedIcon={<Icon type="koubei" size="md" />}
                    title="口碑"
                    key="口碑"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this. onClickChange("/detail","redTab") }
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: rate }}
                    selectedIcon={{ uri: rate_o }}
                    title="朋友"
                    key="朋友"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this. onClickChange("/detail","greenTab") }
                >
                    {this.renderContent('朋友')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: book }}
                    selectedIcon={{ uri: book_o }}
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => this. onClickChange("/detail","yellowTab") }
                >
                </TabBar.Item>
            </TabBar>
        );
    }
}

TabbarModule.propTypes = {
    // datas: PropTypes.array.isRequired
}

TabbarModule.defaultProps = {

}

export default TabbarModule