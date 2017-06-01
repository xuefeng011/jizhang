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


import co from 'co'

import {
    Msg,
    SuccessFooter
} from 'react-weui';

class Home extends Component {

    state = {
        type: 1
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {}

    handleClick(target) {
        hashHistory.replace(target)
    }

    render() {
        const props = this.props
        const _issucc = (co.getArgs(props.location.search).type || 1) == 1;



        return ( < Msg type = {
                _issucc ? "success" : "warn"
            }
            title = {
                _issucc ? "Action success" : "Action fail"
            }
            description = {
                _issucc ? "Save success" : "Save fail"
            }
            buttons = {
                [{
                    type: 'primary',
                    label: 'Ok',
                    onClick: () => {
                        this.handleClick("/home")
                    }
                }, {
                    type: 'default',
                    label: 'Cancel',
                    onClick: () => {
                        this.handleClick("/home")
                    }
                }]
            }
            footer = {
                SuccessFooter
            }
            />
        )
    }
}

Home.propTypes = {
    UserInfo: PropTypes.object.isRequired
}

export default Home