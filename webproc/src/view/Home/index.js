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
        // console.log(1111111111, this.props.children)
        // if (!this.props.children) {
        //     hashHistory.replace("/home")
        //     return;
        // }
        return ( < main style = {
                {
                    height: "100%"
                }
            } > {
                this.props.children
            } < /main>)
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