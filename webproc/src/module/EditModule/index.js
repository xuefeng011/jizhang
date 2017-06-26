import React, {
    Component,
    PropTypes
} from 'react'

import style from './index.less'
import {
    Button,
      List,
  InputItem,
  WhiteSpace
} from 'antd-mobile'

import co from 'co'

class EditModule extends Component {
    constructor(props) {
        super(props)
    }

    render() {

         const {itemData,data} = this.props;

        if(!itemData)
        {
          return null;
        }
        const item = itemData


        return (
            <List renderHeader={() => `[${item.FollowId}] ${item.Name}`}>
          <InputItem editable={false} value={"¥ "+item.Price}>最新价格</InputItem>
          <InputItem editable={false} value={item.Unit} >单位</InputItem>
          <InputItem editable={false} value={"¥ "+item.MaxPrice} >最大金额</InputItem>
          <InputItem editable={false} value={"¥ "+item.MinPrice} >最小金额</InputItem>
          <InputItem editable={false} value={co.getFullDate(item.InsertDate)["6"]} >最近更新</InputItem>
          <InputItem editable={false} value={item.InsertUser} >数据来源</InputItem>
          <WhiteSpace size="lgg" />
         
        </List>
        );
    }
}

EditModule.propTypes = {
    data: PropTypes.object,
    itemData: PropTypes.object
}

EditModule.defaultProps = {

}

export default EditModule