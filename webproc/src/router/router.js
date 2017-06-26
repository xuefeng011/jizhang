import React from 'react';
import {
	Router,
	Route,
	hashHistory
} from 'react-router'

import {
	Provider
} from 'react-redux'
import store from '../store'

// import {
// 	APP,
// 	APP_HOME,
// 	APP_SHARE,
// 	WX,
// 	WX_HOME,
// 	WX_BONUS
// } from './routerPath'

/*引入全局样式*/
import '../styles/animation.less'
import '../styles/reset.less'

/*测试工具*/
// import eruda from 'eruda'
// eruda.init()

require("babel-polyfill")

const App = (
	<Provider store={ store }>
		<Router history={ hashHistory }>
			<Route path="/" 
				getComponent={(location, callback) =>{
					require.ensure([], function (require) {
						callback(null, require('../view/Home/index.js').default);
					}, 'Homepage');
				}}>
				
				<Route 
					path="/home"
					getComponent={(location, callback) => {
						require.ensure([], function (require) {
							callback(null, require('../view/Home/Index/HomeContainer.js').default);
						}, 'HomeContainer');
					}}/>
				<Route 
					path="/follows"
					getComponent={(location, callback) => {
						require.ensure([], function (require) {
							callback(null, require('../view/Home/follows/Container.js').default);
						}, 'follows');
					}}/>
				<Route 
					path="/reportlist"
					getComponent={(location, callback) => {
						require.ensure([], function (require) {
							callback(null, require('../view/Home/ReportList/Container.js').default);
						}, 'ReportList');
					}}/>
				<Route 
					path="detail"
					getComponent={(location, callback) => {
						require.ensure([], function (require) {
							callback(null, require('../view/Home/Detail/Container.js').default);
						}, 'DetailContainer');
					}}/>
				<Route 
					path="msg"
					getComponent={(location, callback) => {
						require.ensure([], function (require) {
							callback(null, require('../view/Home/Msg/MsgContainer.js').default);
						}, 'MsgContainer');
					}}/>
			</Route>
		</Router>
	</Provider>
)

export default App