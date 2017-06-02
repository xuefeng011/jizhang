import React, {PropTypes, Component} from 'react'
import Rule from 'Rule'
import PopUp from 'PopUp'
import Jigsaw from 'Jigsaw'
import Nutip from 'Nutip'
import BonusContainer from '../BonusPage/BonusContainer'
import style from './home.less'

class Home extends Component {
	constructor(props) {
        super(props)
    }
    componentDidMount() {
		this.props.dataInit()
    }
	render() {
		const { UserInfo, handleFinishPin, handleStartClick, handleStartPopBtn, handleShare } = this.props

		const StartPop = UserInfo.PopName == 'StartPop' ? (
			<PopUp>
				<div className={style.pop}>
					{
						<div>
							<p>四月维夏</p>
							<p className={style.pTop2}>赠您<strong><b>100,000</b></strong>元体验金</p>
							<p>为新的一季续航</p>
						</div>
					}
					
					<span className={style.popbtn} onClick={() => handleStartPopBtn()}>我要领更多</span>
				</div>
			</PopUp>
		) : null

		const hasLoginPop = UserInfo.PopName == 'hasLoginPop' ? (
			<PopUp>
				<div className={style.pop}>
					<p>分分钟完成拼图</p>
					<p>高至<strong>200</strong>万的奖金</p>
					<p>在向您招手哦</p>
					<div className={style.pop_btn} onClick={() => handleStartClick(2)}>难不倒我 走起~</div>
				</div>
			</PopUp>
		) : null

		return (
			<div>
				<div className={style.content}>
					<Rule/>
					{!UserInfo.Uid ? <div className={style.toptip}>请在登录后分享</div> : null}
					{!UserInfo.Uid ? <Nutip onNuClick={() => handleShare()} /> : null}
					<div className={style.top}></div>
					<div className={style.jig}><Jigsaw onFinishPin={()=>handleFinishPin()}/></div>
					{
						UserInfo.isFinishPin ?
						<div onClick={() => handleStartClick(1)} className={style.btn2}>开启体验金 领跑下一季</div> :
						<div className={style.btn1}>选择上方正确拼图 领大奖</div>
					}
					<p className={style.tip}>每天完成拼图都可领取呦</p>
					{UserInfo.Uid && UserInfo.coupons.length > 0 && <BonusContainer />}
				</div>
				{hasLoginPop}
				{StartPop}
			</div>
		)
	}
}

Home.propTypes = {
	UserInfo: PropTypes.object.isRequired,
	dataInit: PropTypes.func.isRequired,
	handleFinishPin: PropTypes.func.isRequired,
	handleStartClick: PropTypes.func.isRequired,
	handleStartPopBtn: PropTypes.func.isRequired,
	handleShare: PropTypes.func.isRequired
}

export default Home