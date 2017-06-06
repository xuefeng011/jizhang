import React, {
    Component
    // PropTypes
} from 'react'

// import style from './index.less'
import {
    List
} from 'antd-mobile'

const Item = List.Item;
// const Brief = Item.Brief;


// <Item>标题文字</Item>
// <Item arrow="horizontal" onClick={() => {}}>标题文字</Item>
// <Item extra="内容内容" arrow="horizontal" onClick={() => {}}>标题文字</Item>
// <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
// 标题文字 <Brief>副标题</Brief>
// </Item>
// <Item extra="10:30" arrow="horizontal"  align="middle" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
// 标题文字 <Brief>副标题</Brief>
// </Item>

// var datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class ListModule extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        // console.log(this.props)
        var props = this.props
        var isshow = props.show || false;
        var datas = props.datas || [];

        const listhtml = (<List renderHeader={() => '满足结果'+datas.length} className="my-list">
                    {datas.map((item,index)=>{return <Item arrow="horizontal" key={Math.random()} onClick={() => {}}  extra={`index${index}`}>{item}</Item>})}
                  </List>)


        return (<div>{isshow?listhtml:''}</div>);
    }
}

ListModule.propTypes = {
    // datas: PropTypes.array.isRequired
}

ListModule.defaultProps = {

}

export default ListModule