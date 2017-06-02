import { hashHistory } from 'react-router'
import store from '../../store'
import co from 'co'
import { ErrorFetchAction, successFetchAction, showPopAction } from '../../action'
import { APP_HOME, APP_SHARE } from '../../router/routerPath'


/*共用action*/
const commonAppFetchPart = (para) => {
	const USER = {...store.getState().UserInfo}
	const obj = { uid: USER.Uid, ...USER.ido,...para.reqdata || ''}
	const data = co.setObjToQue(obj)
	const result = fetch(USER.Server + para.url + '?' +  data, {
		method: para.method || 'GET', 
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	return dispatch => {
		dispatch({type: 'FETCH_USER_POST', item: {Uid: USER.Uid}})
		return result.then(res => {
			if (res.ok) {
				res.json().then(res => {
					dispatch(para.success(res, USER))
				})
			} else {
				dispatch(ErrorFetchAction())
			}
		}).catch(e => {
			dispatch(ErrorFetchAction())
			console.warn("Oops, error", e)
		});
	}
}


/*app接口逻辑*/

//用户数据初始化
export const fetchAppInitPost = () => {
	return dispatch => {
		dispatch(commonAppFetchPart({
			url: 'pt/GetRecordByUid',
			success: function (res, USER) {
				return dispatch => {
					dispatch(successFetchAction({
						cnt: res.cnt || 0,
						coupons: res.coupons || [],
						isNew: res.isnew || false, 
						// isWin: res.iswin || false, 
						isJoined: res.errorCode === 1,
						hqbisactive: res.hqbisactive || 0,
						isHasChance: res.num == 1
					}))
					
					switch(USER.loginFrom) {
						case 'StartBtn': //未参与以及已参与但仍有机会时参与，否则跳去分享页
							res.num == 1 ? dispatch(fetchAppStartPost(USER)) : hashHistory.replace(APP_SHARE.getPath())
							break;
						case 'BonusBtn': //未参时参与，否则正常打开奖励弹框
							res.errorCode != 1 ? dispatch(showPopAction('hasLoginPop')) : hashHistory.replace(APP_SHARE.getPath())
							break;
						default: //未参与以及已参与但仍有机会时跳到首页，否则跳去分享页
							res.num == 1 ? hashHistory.replace(APP_HOME.getPath()) : hashHistory.replace(APP_SHARE.getPath())
							break;
					}
				}
			}
		}))
	}
}

//参加领奖
export const fetchAppStartPost = () => {
	return dispatch => {
		dispatch(commonAppFetchPart({
			url: 'pt/SaveRecordByUid',
			method: 'POST',
			success: function (res, USER) {
				return dispatch => {
					switch (res.errorCode) {
						case 1:
						case -1:
							dispatch(successFetchAction({
								cnt: res.cnt || USER.cnt,
								coupons: res.coupons || USER.coupons,
								hqbisactive: res.hqbisactive || USER.hqbisactive,
								isHasChance: 0,
								isShowDialog: true,
								PopName:'StartPop'
							}))
							break;
						default:
							ErrorFetchAction(res.errorMessage)
							break;
					}
				}
			}
		}))
	}
}



