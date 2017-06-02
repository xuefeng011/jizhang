import React, { PropTypes,Component } from 'react';

import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'

import style from './dialog.less';


class Dialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false
        };
    }

    componentDidMount() {
        if (this.props.visible) {
            this.enter();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.enter();
        } else if (this.props.visible && !nextProps.visible) {
            this.leave();
        }
    }

    enter() {
        this.setState({
            isShow: true
        })
    }

    leave() {
        this.setState({
            isShow: false
        });
    }

    render() {
        const mask = this.state.isShow ? <div className={style.dyy} onClick={this.props.onClose}> </div> : null
        const InnerContent = this.state.isShow ? (
                <div className={style.default}>
                    <div className={style.close} onClick={this.props.onClose}>
                        <svg className={style.icon} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                            <path d="M902.741333 816.213333l-306.005333-307.2 297.984-303.957333c18.858667-18.858667 18.858667-49.322667 0-68.181333s-36.010667-18.858667-54.869333 0L532.394667 444.416l-306.346667-307.541333c-18.858667-18.858667-49.322667-18.858667-68.181333 0s-18.858667 49.322667 0 68.181333L464.810667 512 157.952 818.944c-18.858667 18.858667-18.858667 49.322667 0 68.181333s49.322667 18.858667 68.181333 0L529.92 577.194667l309.930667 309.930667c18.858667 18.858667 44.032 16.128 62.805333-2.645333S921.6 835.072 902.741333 816.213333z" fill="#f7df3d"></path>
                        </svg>
                    </div>
                    {this.props.children}
                </div>
            ) : 
            null

        
        
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {mask}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="slideTop" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {InnerContent}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Dialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    children:PropTypes.node
};

Dialog.defaultProps = {
    visible: false
};

export default Dialog;