import reqwest from 'reqwest';

import co from 'co'



const service = {
	test(d) {
		console.log('testtesttest', d)
	},
	getfollowgroup() {
		return new window.Promise((resolve, reject) => {
			reqwest({
				url: co.ServerUrl + 'follows/getbygroup',
				method: 'get',
				data: {},
				type: 'json'
			}).then((data) => {
				if (data.errorCode === 1 && data.datas.length > 0) {
					resolve(data.datas)
				} else {
					reject()
				}
			}).catch(() => {
				reject()
			});
		})
	},
	getfollowgroupByFollowId(FollowId) {
		return new window.Promise((resolve, reject) => {
			reqwest({
				url: co.ServerUrl + 'follows/getbygroup',
				method: 'get',
				data: {
					conditions: {
						FollowId: FollowId
					}
				},
				type: 'json'
			}).then((data) => {
				if (data.errorCode === 1 && data.datas.length > 0) {
					resolve(data.datas)
				} else {
					reject()
				}
			}).catch(() => {
				reject()
			});
		})
	},
	setFollowdataById(data) {
		return new window.Promise((resolve, reject) => {
			reqwest({
				url: co.ServerUrl + 'follows/insertOrUpdate',
				method: 'get',
				data: data,
				type: 'json'
			}).then((data) => {

				if (data.errorCode===1) {
					resolve(data.datas)
				} else {
					reject(data.errorMessage)
				}
			}).catch((e) => {
				reject(e)
			});
		})
	}
}


export default service;