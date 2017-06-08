import React, {
    Component,
    PropTypes
} from 'react'


import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'

class CardModule extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
    }

    render() {
        return (
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="This is title"
                thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                extra={<span>this is extra</span>}
              />
              <Card.Body>
                <div>This is content of `Card`</div>
              </Card.Body>
              <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>
        );
    }
}

CardModule.propTypes = {
    // datas: PropTypes.array.isRequired
}

CardModule.defaultProps = {

}

export default CardModule