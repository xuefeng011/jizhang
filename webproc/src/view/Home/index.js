import React, {
    PropTypes,
    Component
} from 'react';
// import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import {
    connect
} from 'react-redux'

// import {
//     hashHistory
// } from 'react-router'
import {
    hashHistory
} from 'react-router';
import {
    NavBar
} from 'antd-mobile';

import SideModule from 'SideModule'

import style from './index.less'

class HOME_Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '默认',
            open: false
        };
    }
    componentDidMount() {
        // console.log("home/index.js")
        // initAppFix()

        // const props = this.props
        // console.log(hashHistory,store,props)         
    }
    rightClick() {
        // console.log("rightClick", this.state.open)
        this.setState({
            open: !this.state.open
        })
    }
    searchClick() {
        console.log("searchClick")
    }
    render() {
        // console.log(1111111111, this.props.children)
        // if (!this.props.children) {
        //     hashHistory.replace("/home")
        //     return;
        // }
        /*return (
                           <main style = { {position: 'relative',height: '100%' }} > {
                this.props.children
            } </main>)
        }*/

        const rightcontent = <p><b className={style.search} onClick={() => this.searchClick()}></b><b onClick={() => this.rightClick()}>...</b></p>

        return (
            <div className="container" style={{ position: 'relative', height: '100%' }}>
                <NavBar mode="light"
                    onLeftClick={() => hashHistory.goBack()}
                    rightContent={rightcontent}
                >
                    {this.state.title}
                </NavBar>
                <div style={{ position: 'relative', height: '100%' }}>
                        <SideModule open={this.state.open} />
                        {this.props && this.props.children && React.cloneElement(this.props.children, {
                            changeTitle: title => this.setState({ title })
                        }) || 'no content'}
                  
                </div>
                <div className="fixed-bottom">底部固定条</div>
            </div>
        )
    }
}

HOME_Page.propTypes = {
    // UserInfo: PropTypes.object.isRequired,
    children: PropTypes.node
        // location: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        UserInfo: state.UserInfo
    };
}

export default connect(mapStateToProps)(HOME_Page)