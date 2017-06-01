import React, {Component, PropTypes} from 'react'
import Rule from 'Rule'
import Imblock from 'Imblock'
import BonusContainer from '../BonusPage/BonusContainer'
import style from './share.less'


class ShareComponent extends Component {
	constructor(props) {
        super(props)
    }
    componentDidMount() {
		this.props.dataInit()
	}
	
	render(){
		const {handleShareClick} = this.props;

		return (
			<div className={style.page2}>
				<div className={style.content}>
					<Rule top={".2rem"} env="ttjj"/>
					<div className={style.top}>
						<Imblock point={4} />
					</div>
					<div className={style.tip}>
						<p><strong>邀请好友首次登录</strong></p>
						<p>奖励最高<span style={{fontSize:"1.5em"}}><strong>200</strong>万体验金</span>！</p>
					</div>
					<a href="javascript:void(0)" className={style.sharebtn} onClick={() => handleShareClick()}>你若分享 奖金自来</a>
					<BonusContainer />
				</div>
				
			</div>
		)
	}
}


ShareComponent.propTypes = {
	UserInfo: PropTypes.object.isRequired,
	dataInit: PropTypes.func.isRequired,
	handleShareClick: PropTypes.func.isRequired
}

export default ShareComponent
