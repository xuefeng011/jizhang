import React, {
    PropTypes,
    Component
} from 'react';
// import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import {
    connect
} from 'react-redux'
// import { hashHistory } from 'react-router'
// import store from '../../store'
// import { FixUserAction } from '../../action'
// import {fetchAppInitPost} from './action'
// import { APP_HOME } from '../../router/routerPath'
// import { initAppFix } from './init'
// import PopUp from 'PopUp'
// import Spin from 'Spin'
// import Tinfo from 'Tinfo'
// import 'react-weui/lib/react-weui.min.css';

import {
    Footer,
    FooterText
} from 'react-weui';

class HOME_Page extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // console.log("home/index.js")
        // initAppFix()

        // const props = this.props
        // console.log(hashHistory,store,props)         
    }
    render() {
        return ( < main style = {
                {
                    height: "100%"
                }
            } > {
                this.props.children
            }
            <Footer>
                    <FooterText>Copyright © 2017 xue by react-weui</FooterText>
                </Footer> < /main>
        )
    }
}

HOME_Page.propTypes = {
    UserInfo: PropTypes.object.isRequired,
    children: PropTypes.node
        // location: React.PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        UserInfo: state.UserInfo
    };
}

export default connect(mapStateToProps)(HOME_Page)