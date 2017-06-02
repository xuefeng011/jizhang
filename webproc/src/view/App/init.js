import co from 'co'
import store from '../../store'

export const initAppFix = () => {
	/*定义返回与分享按钮默认方法*/
	window.nativeBack = function() {
		location.href = "emfundapp:backpreviouspage";
	}
	window.nativeShare = function() {
		location.href='http://ttjj-huodong-weixin-share/'
	}

	/*修改顶栏及默认方法*/
	setTimeout(function(){
		co.app.fixHeadBar()
	}, 200)

	/*修改微信分享*/
	setTimeout(function(){
		const shareinfo = store.getState().ShareInfo
		co.app.fixShare(shareinfo.id, shareinfo.title, shareinfo.desc, shareinfo.pic)
	}, 500)
}