import { connect } from 'react-redux'
import co from 'co'
import { initAppFix } from '../init.js'
import ShareComponent from './ShareComponent.js'


const mapDispatchToProps = () => {
	return{
		dataInit() {
			initAppFix()
		},
		handleShareClick() {
			co.CNT2('share','share_center')
			co.app.goShare()
		}
	}	
}

const mapStateToProps = (state) => {
    return {
        UserInfo: state.UserInfo
    }
}

const ShareContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShareComponent)

export default ShareContainer;