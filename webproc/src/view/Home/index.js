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
    NavBar,
    Popup,
    Icon
} from 'antd-mobile';

import SideModule from 'SideModule'
import SearchModule from 'SearchModule'

import style from './index.less'

require('./am.css')

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
        this.setState({open: !this.state.open})
    }
    searchClick() {
        this.setState({ open: false})

        Popup.show(<SearchModule datas={[]}/>,{animationType:"slide-down"})
    }

    onClose = () => {
        Popup.hide();
      };

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

        const rightcontent = <p><Icon className={style.search} type="search" size="md" onClick={() => this.searchClick()}/><Icon className={style.more} type="ellipsis"  size="md"  onClick={() => this.rightClick()} /></p>

        return (
            <div className="container" style={{ position: 'relative' }}>
                <NavBar mode="dark"
                    onLeftClick={() => hashHistory.goBack()}
                    rightContent={rightcontent}
                >
                    {this.state.title}
                </NavBar>
                <div style={{ position: 'relative', height: '100%' }}>
                        <SideModule open={this.state.open} onCloseClick={()=>{ this.setState({open: false})}}/>
                        {this.props && this.props.children && React.cloneElement(this.props.children, {
                            changeTitle: title => this.setState({ title })
                        }) || 'no content'}
                  
                </div>
                <div className="fixed-bottom tc gray" style={{fontSize:"0.25rem"}}>2017 copyright</div>
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