import { combineReducers } from 'redux'

import co from 'co'


/*-----------------------------------------------------------------*/
/*UserInfo*/
/*-----------------------------------------------------------------*/
const initalUserInfo = {
    Server: co.setServer(),
    ido: {
        a: 6993,
        b: '123bb2a188f099b070b159'
    },
    Env: null,
    Uid: null,
    isFinishPin: false,
    isJoined: false,
    isWin: false,
    isOver: false,
    isNew: true,
    hqbisactive: 0,
    coupons:[],
    isFetch: false,
    isShowDialog: false,
    PopName: null,
    MassagePopContent: null,
    wxid: null,
    verifyTip: null,
    idShowShareTip: false,
    isShowWxDtip: false
}

const UserInfo = (state = initalUserInfo, action) => {
    switch (action.type) {
        case 'FETCH_USER_POST':
            {
                switch (action.status) {
                    case 'error':
                        {return Object.assign({}, state, {isFetch: false, isShowDialog: true, ...action.item})}
                    case 'success':
                        {return Object.assign({}, state, {isFetch: false, ...action.item})}
                    default:
                        {return Object.assign({}, state, {isFetch: true, ...action.item})}
                }
            }
        case 'FIX_USER_INFO':
            {
                return Object.assign({}, state, {...action.item})
            }
        case 'SHOW_DIALOG':
            {
                return Object.assign({}, state, {isShowDialog: true, PopName: action.PopName})
            }
        case 'HIDE_DIALOG':
            {
                return Object.assign({}, state, {isShowDialog: false, MassagePopContent: null})
            }
        default:
            return state
    }
}


/*-----------------------------------------------------------------*/
/*Sharefo*/
/*-----------------------------------------------------------------*/

const sharew = [{
        title:'假如致富是随机的，那你还努力么？',
        desc:'玄不改命，唯有拼命。高达200万体验金，“拼”出来！'
    }, {
        title:'一谈理财就说坑，每月月末别喊穷',
        desc:'你的钱再不运动起来，不会膨胀的，要被泡沫吃掉的。'
    }, {
        title:'你身上有她的香水味，一闻就没我的贵。',
        desc:'要啥一人心，不如体验金。'
    }, {
        title:'80、90后“有房率”达到70%，楼市需求是否饱和？',
        desc:'先凑齐首付再说好么。最高200万体验金，收益可提现，只能帮你到这儿了。'
    }, {
        title:'以人民币的名义，命令你点开我。',
        desc:'高达200万的体验金，不点你后悔~'
    }
]

const n = Math.floor(Math.random() * sharew.length + 1) - 1

const initShareInfo = {
    id: initalUserInfo.ido.a,
    title: sharew[n].title,
    desc: sharew[n].desc,
    pic: 'http://j5.dfcfw.com/image/201703/20170328104609.png'
}

const ShareInfo = (state = initShareInfo, action) => {
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
    UserInfo,
    ShareInfo
})