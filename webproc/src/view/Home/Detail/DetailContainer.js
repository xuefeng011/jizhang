import { connect } from 'react-redux'
// import store from '../../../store'
// import co from 'co'
// import { ErrorFetchAction, FixUserAction, loginFromAction } from '../../../action'
// import { fetchAppInitPost, fetchAppStartPost } from '../action'
import Home from './DetailComponent.js'

const mapDispatchToProps = () => {
	return{
		// dataInit: () => {

		// },
		// handleShare: () => {
		// 	co.CNT2('home','right_share')
		// 	co.app.goShare()
		// },
		// handleFinishPin: () => {
		// 	co.CNT2('home','finish_pin')
		// 	dispatch(FixUserAction({isFinishPin: true}))
		// },
		// handleStartPopBtn: () => {
		// 	co.CNT2('home','see_more')
		// 	dispatch(fetchAppInitPost())
		// },
		// handleStartClick: (n) => {
		// 	n !== 1 ? co.CNT2('home','pop_start') : co.CNT2('home','start')
		// 	const USER = {...store.getState().UserInfo}

		// 	if(USER.isOver){
		// 		dispatch(ErrorFetchAction('活动已结束'))
		// 		return;
		// 	}

		// 	if(!USER.Uid) {
		// 		dispatch(loginFromAction('StartBtn'))
		// 		co.app.goLogin()
		// 	} else {
		// 		dispatch(fetchAppStartPost())
		// 	}
		// }
	}	
}

const mapStateToProps = (state) => {
    return {
        UserInfo: state.UserInfo
    }
}


const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default HomeContainer;