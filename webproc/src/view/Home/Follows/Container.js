import { connect } from 'react-redux'
// import store from '../../../store'
// import co from 'co'
// import { ErrorFetchAction, FixUserAction, loginFromAction } from '../../../action'
// import { fetchAppInitPost, fetchAppStartPost } from '../action'
import Home from './Component.js'

const mapDispatchToProps = () => {
	return{
		
	}	
}

const mapStateToProps = (state) => {
    return {
        DataInfo: state.DataInfo
    }
}


const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

export default HomeContainer;