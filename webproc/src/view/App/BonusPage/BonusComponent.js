import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import co from 'co'
import Coupon from 'Coupon'
import Dialog from 'Dialog'
import style from './bonus.less'

class BonusComponent extends Component {
    constructor(props) {
        super(props)
        const d = new Date()
        const e = localStorage.getItem('pintujliclicktime')
        const s = true;// localStorage.getItem('pintustep')

        this.state={
			isShowJl: false,
			isShowCu: false,
			isShowMore: false,
			isShowStep: !s,
			isShowStep2: false,
			isShowDian: !e || e !== d.getDate().toString()
        }
    }

    componentDidMount() {
		this.props.dataInit()
    }

    handleMore() {
		co.CNT2('bonus','box_circle')
		this.setState({
			isShowMore: !this.state.isShowMore
		})
    }

    handleJlPop() {
		co.CNT2('bonus','200pop')
		const d = new Date()
		localStorage.setItem('pintujliclicktime', d.getDate())

		this.setState({
			isShowJl: !this.state.isShowJl,
			isShowMore: false,
			isShowDian: false
		})
	}
	handleCuPop() {
		co.CNT2('bonus','bonuspop')
		this.setState({
			isShowCu: !this.state.isShowCu,
			isShowMore: false
		})
	}

    render() {
		const { UserInfo, handleShareClick } = this.props
		const { isShowStep, isShowStep2 } = this.state
		const jl_box_inner1 = (
			!isShowStep2 ?
			<div className={style.step}>
				<div className={style.sttitle}>
					<p>点击下方宝箱</p>
					<p>搜寻200万奖励</p>
				</div>
				<div className={style.stbox} onClick={()=>this.setState({isShowStep2: true})}>
				</div>
			</div> :
			<div className={style.step2}>
				<div className={style.st2card}></div>
				<div className={style.st2tip}>
					<p>恭喜您开启了新的1/4</p>
					<p>赶紧分享领取高至<strong>200</strong>万赏金！</p>
					<div className={style.share_btn} onClick={()=>{this.setState({isShowStep: false});localStorage.setItem('pintustep',1)}}>我要领赏金</div>
				</div>
			</div>

		)
		const jl_box_inner2 = (
			<div>
				<div className={style.jltitle}></div>
				<div className={style.jlbox}>
					<section>
						<h3>邀请获得体验金</h3>
						<p><strong>{co.formatMoney((Number(UserInfo.cnt ) > 40 ? 40 : UserInfo.cnt) * 50000, 0)}元</strong></p>
						{/*<p><small>体验金期限3天</small></p>*/}
					</section>
					<section>
						<h3>邀请人数</h3>
						<p><strong>{(Number(UserInfo.cnt ) > 40 ? 40 : UserInfo.cnt)}人</strong></p>
					</section>
				</div>
				<div className={style.result}>
					到期可得总收益：<strong>{((Number(UserInfo.cnt ) > 40 ? 40 : UserInfo.cnt) * 5)}</strong>元
				</div>
				<div className={style.share_btn} onClick={() => handleShareClick('_after')}>我要200万</div>
				<div className={style.tip}>
					<p>活动奖励，将在活动结束后10日内，</p>
					<p>以货币基金的形式发放至您的天天基金账户</p>
				</div>
			</div>
		)

		const jl_box = (
			<Dialog
				visible={this.state.isShowJl}
				onClose={()=>this.handleJlPop()}
			>				
				{isShowStep ? jl_box_inner1 : jl_box_inner2}
			</Dialog>
		)

		const cudyy = this.state.isShowCu ? (
				<div className={style.cu_dyy} onClick={()=>this.handleCuPop()}></div>
		) : null

		const cu_box = this.state.isShowCu ? (
			<div className={style.cu_box}>				
				<div className={style.cu_title}></div>
				<div className={style.couponbox}>
					<Coupon 
						isjoined={UserInfo.isJoined}
						cnt={0}
						cntmax={20}
						isnew={UserInfo.isNew}
						isover={UserInfo.isOver}
						couponArr={UserInfo.coupons}
						hqbisactive={UserInfo.hqbisactive}
					/>
				</div>
				<div className={style.tip}>
					<p>活动奖励将在活动结束后10日内，</p>
					<p>以货币基金的形式发放至您的天天基金账户</p>
				</div>
			</div>
		) : null

		const signinner = this.state.isShowMore ? (
			<div className={style.signinner}>
				<a href="javascript:void(0);" className={style.bonusbtn} onClick={()=>this.handleJlPop()}>200万{this.state.isShowDian && <div className={style.dian}></div>}</a> 
				<a href="javascript:void(0);" className={style.bonusbtn} onClick={()=>this.handleCuPop()}>我的奖励</a>
			</div>
		) : null

		return (
			<div>
				<div className={style.signbox}>
					<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{signinner}
					</ReactCSSTransitionGroup>
					<div className={style.sign} onClick={()=>this.handleMore()}></div>
				</div>			
				{jl_box}
				<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{cudyy}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="slideup" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{cu_box}
				</ReactCSSTransitionGroup>
			</div>
		)
    }
}


BonusComponent.propTypes = {
	UserInfo:  PropTypes.object.isRequired,
	handleShareClick: PropTypes.func.isRequired,
	dataInit: PropTypes.func.isRequired
}

export default BonusComponent
