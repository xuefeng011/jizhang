import React, {
    Component,
    PropTypes
} from 'react'

// import style from './index.less'
import {
    List
} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


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
import co from 'co'

// import moment from 'moment';

import $ from 'jquery'


class ListModule extends Component {
    constructor(props) {
        super(props)
        // console.log(333333333333,props)
        this.state = {
                datas: props.datas || [],
                type: props.type || 'normal'
                // html: props.html || '<span>yyyyyyyyyyyy</span>'
            }
            // console.log(props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.datas != this.state.datas) {
            this.setState({
                datas: nextProps.datas
            })
        }

    }
    componentDidMount() {


        this.bindscroll();



    }

    bindscroll() {
        var obj = $('.my-list');

        obj.css({'overflow-y':'scroll','height':'10rem' })

         console.log(obj.scrollTop())
        obj.scroll(function() {
            //if (obj.scrollTop() <= 0) {

            //} 

            var viewH = obj.height(), //可见高度  
                contentH = obj.get(0).scrollHeight, //内容高度  
                scrollTop = obj.scrollTop(); //滚动高度 
            console.log(scrollTop)
            if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容  


            }

        });
    }

    render() {
        // console.log(this.props)
        var props = this.props
            // console.log("listmodule", props, this.state.datas)

        let listhtml = "";

        switch (this.state.type) {
            case "normal":
            default:
                listhtml = (<List renderHeader={() => '满足结果'+this.state.datas.length} className="my-list">
                    {this.state.datas.map((item,index)=>{
                        return <Item arrow="horizontal" key={Math.random()} onClick={() => {}}  extra={`index${index}`}>{item}</Item>
                    })}
                  </List>);
                break;
            case "productlist":
                listhtml = (<List renderHeader={() => '满足结果'+this.state.datas.length} className="my-list">
                    {this.state.datas.map((item,index)=>{
                        // console.log(moment().format(item.InsertDate,"YYYY"))
                        return <Item extra="10:30" arrow="horizontal" key={Math.random()}  align="middle" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                                {`${item.ProductName}`} <Brief>{co.getFullDate(item.InsertDate)["6"]}</Brief>
                                </Item>
                    })}
                  </List>);
                break;
        }



        return (<div>{listhtml}</div>);
    }
}

ListModule.propTypes = {
    datas: PropTypes.array,
    type: PropTypes.string,
    // html: PropTypes.string
}

ListModule.defaultProps = {

}

export default ListModule