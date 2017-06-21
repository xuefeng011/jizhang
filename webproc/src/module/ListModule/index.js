import React, {
    Component,
    PropTypes
} from 'react'

// import style from './index.less'
import {
    List,
    Icon
} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

import defaultpng from './default.svg'


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


import style from './index.less'

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

        obj.css({
            'overflow-y': 'scroll',
            'height': '10rem',
            "-webkit-overflow-scrolling": "touch"
        })

        // console.log(obj.scrollTop())
        obj.scroll(function() {
            //if (obj.scrollTop() <= 0) {

            //} 

            var viewH = obj.height(), //可见高度  
                contentH = obj.get(0).scrollHeight, //内容高度  
                scrollTop = obj.scrollTop(); //滚动高度 
            // console.log(scrollTop)
            if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容  


            }

        });
    }

    render() {
        // console.log(this.props)
        var props = this.props
        console.log("listmodule", props, this.state.datas)

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
                        //{co.getFullDate(item.InsertDate)["6"]}
                        return <Item extra={item.Price==0?'N/A':`¥${item.Price}(${item.Others.Unit})`} arrow="horizontal" key={Math.random()}  align="middle" thumb={`${item.PicUrl}`} multipleLine>
                                {`${item.ProductName}`} <Brief>{`${item.Source.SourceName} ${item.Source.Category1} ${item.Source.Category2}`}</Brief>
                                </Item>
                    })}
                  </List>);
                break;
            case "follows":
                listhtml = (<List renderHeader={() => '满足结果'+this.state.datas.length} className="my-list">
                    {this.state.datas.map((item,index)=>{
                        // // console.log(moment().format(item.InsertDate,"YYYY"))
                        // //{co.getFullDate(item.InsertDate)["6"]}
                        // return <Item extra={`¥${item.Price}(${item.Unit})`} arrow="horizontal" key={Math.random()}  align="middle" thumb={defaultpng} multipleLine>
                        //         {`${item.Name}`} <Brief>{co.getFullDate(item.InsertDate)["6"]}</Brief>
                        //         </Item>

                    var changehtml ="";

                    switch (item.ChangeType)
                    {
                        case 1:changehtml= (<span className={style.changered} >+{item.Change}</span>);break;
                        case -1:changehtml= (<span className={style.changegreen} >{item.Change}</span>);break;
                        case 0:changehtml= (<span className={style.change} >{item.Change}</span>);break;
                    }

                    return (<div  key={Math.random()} className="am-list-item am-list-item-middle">
                                <div className="am-list-thumb"><img src={defaultpng} /></div>
                                    <div className="am-list-line am-list-line-multiple">
                                    <div className="am-list-content">
                                        {item.Name}
                                        <div className="am-list-brief">{co.getFullDate(item.InsertDate)["6"]}</div>
                                    </div>
                                    <div className={style.flex}>
                                         <div className={style.flexitem}><b>¥</b><span className={style.price}>{item.Price}</span></div>
                                         <div className={style.flexitemcol}>{changehtml}<span className={style.unit}>({item.Unit})</span></div>
                                    </div>
                                    <div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true"></div>
                                </div>
                            </div>)
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