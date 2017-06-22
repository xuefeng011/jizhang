import { combineReducers } from 'redux'

import co from 'co'


/*-----------------------------------------------------------------*/
/*UserInfo*/
/*-----------------------------------------------------------------*/
const initData = {
    data1: "yyy",
    data2: "xxx"
}

const DataInfo = (state = initData, action) => {
    // console.log(111111111111111111,state,action)
    switch (action.type) {
         case 'DETAIL_ITEM':
            {
                return Object.assign({}, state,{isDetail: true,...action.item})
            }
        default:
            return state
    }
}
const initData2 = {

}


const DataInfo2 = (state = initData2, action) => {
    switch (action.type) {
        case 'CHANGE_SHARE_INFO':
            {
                return Object.assign({}, state, action.item)
            }
        default:
            return state
    }
}



export default combineReducers({
    DataInfo,
    DataInfo2
})