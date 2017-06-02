import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import store from '../../store'
import { FixUserAction } from '../../action'
import {fetchAppInitPost} from './action'
import { APP_HOME } from '../../router/routerPath'
import { initAppFix } from './init'
import PopUp from 'PopUp'
import Spin from 'Spin'
import Tinfo from 'Tinfo'


class APP_Page extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		initAppFix()
		
		const props = this.props
		const dispatch = props.dispatch
		window.isAreadyrun = false

		//检查登录回调
		window.checkLoginCallback = function (json) {
			const UID = json.uid || ''
			if (UID) {
				if (!window.isAreadyrun) {
					dispatch(FixUserAction({Env: 'ttjj', Uid: UID}))
					dispatch(fetchAppInitPost())
					window.isAreadyrun = true
				}
			} else {
				dispatch(FixUserAction({Env: 'ttjj'}))
				hashHistory.replace(APP_HOME.getPath())
			}
		}

		//去登录回调
		window.nativeloginCallback = function(json) {
			const UID = json.uid
			if (UID) {
				if (!window.isAreadyrun) {
					dispatch(FixUserAction({Uid: UID}))
					store.dispatch(fetchAppInitPost())
					window.isAreadyrun = true
				}
			}
		}

		//4.0 以下版本登录回调(弃用)
		window.setCustomerNo = function(customerno) {console.log(customerno)};

		/*检测登录并请求接口*/
		setTimeout(function(){
			location.href = 'emfundapp:nativeLogin({"callbackMethodName": "window.checkLoginCallback"})';
		}, 10)			
	}
	render() {
		const { UserInfo, children, location } = this.props
		const spin = UserInfo.isFetch ? (<Spin />) : null

		const MassagePop = UserInfo.PopName == 'MassagePop' ? (
			<PopUp>
				<div style={{textAlign: 'center'}}>
					{ UserInfo.MassagePopContent }
				</div>
			</PopUp>
		) : null
		const ss = this.props.children ?
					(<ReactCSSTransitionGroup
						component="div"
						transitionName="fade"
						transitionEnterTimeout={500} transitionLeaveTimeout={500}
					>
						{React.cloneElement(children, {
							key: location.pathname
						})}
					</ReactCSSTransitionGroup>) : null
		return (
			<main>
				{ ss }
				{ this.props.children ? <Tinfo /> : null }
				{ MassagePop }
				{ spin }
			</main>
		)
	}
}

APP_Page.propTypes = {
	UserInfo: PropTypes.object.isRequired,
	children: PropTypes.node,
	location: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    UserInfo: state.UserInfo
  };
}

export default connect(mapStateToProps)(APP_Page)