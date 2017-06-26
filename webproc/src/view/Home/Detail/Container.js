import {
	connect
} from 'react-redux'
// import store from '../../../store'
// import co from 'co'
// import { ErrorFetchAction, FixUserAction, loginFromAction } from '../../../action'
// import { fetchAppInitPost, fetchAppStartPost } from '../action'
import Home from './Component.js'

import _ from 'underscore'


const mapDispatchToProps = (props) => {
	return {
		// DataInfo: props.DataInfo
		transDataGroup(item) {


			let series = []
			let tempseriesitem = []
			let tempseriesitemName = ""


			const colors = ['#FFF', 'blue', 'green', '#F40', 'gray', 'pink']
			let index = 0;
			// console.log(2222222,datas)
			_.each(_.groupBy(item.Datas, 'SourceId'), function(groupitem) {
				index++;
				tempseriesitem = [];
				tempseriesitemName = ""

				_.each(_.sortBy(groupitem, 'InsertDate'), function(dataitem) {
					tempseriesitemName = dataitem.SourceName;
					tempseriesitem.push([new Date(dataitem.InsertDate).valueOf(), dataitem.Price, dataitem])
				})
				series.push({
					name: tempseriesitemName,
					data: tempseriesitem,
					color: colors[index]
				});

			});
			// console.log(1111111111,series)
			return series;
		}
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