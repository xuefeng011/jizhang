import React, {
    PropTypes,
    Component
} from 'react'
// import Rule from 'Rule'
// import PopUp from 'PopUp'
// import Jigsaw from 'Jigsaw'
// import Nutip from 'Nutip'
// import BonusContainer from '../BonusPage/BonusContainer'
// import style from './home.less'


import {
    hashHistory
} from 'react-router'


// import co from 'co'

// import {
//     Msg,
//     SuccessFooter
// } from 'react-weui';

class Home extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {}

    handleClick(target) {
        hashHistory.replace(target)
    }

    render() {

        return (
            <div>test</div>
        )
    }
}

Home.propTypes = {
    UserInfo: PropTypes.object.isRequired
}

export default Home