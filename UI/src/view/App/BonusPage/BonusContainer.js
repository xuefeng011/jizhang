import { connect } from 'react-redux'
import co from 'co'
import BonusComponent from './BonusComponent.js'


const mapDispatchToProps = () => {
	return{
		dataInit() {
		},
		handleShareClick() {
			co.app.goShare()
			co.CNT2('bonus','share_200pop_inner')
		}
	}	
}

const mapStateToProps = (state) => {
    return {
		UserInfo: state.UserInfo
    }
}

const BonusContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BonusComponent)

export default BonusContainer;