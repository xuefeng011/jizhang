import { connect } from 'react-redux'
// import store from '../../../store'
// import co from 'co'
// import { ErrorFetchAction, FixUserAction, loginFromAction } from '../../../action'
// import { fetchAppInitPost, fetchAppStartPost } from '../action'
import Home from './DetailComponent.js'

const mapDispatchToProps = (props) => {
	return{
		// DataInfo: props.DataInfo
	}	
}

const mapStateToProps = (state) => {
    return {
        DetailItem: state.DataInfo.detailItem
    }
}


const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default HomeContainer;