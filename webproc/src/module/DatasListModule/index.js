import React, {
    Component,
    PropTypes
} from 'react'


import {
    Accordion,
    List,
    Popup,
    Button,
    Icon,
    Toast
} from 'antd-mobile';

import co from 'co'

import EditModule from 'EditModule'

import editpng from './edit.png'
import addpng from './add.png'


import service from '../../services/index'


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    maskProps = {
        onTouchStart: e => e.preventDefault(),
    };
}



class DatasListModule extends Component {
    constructor(props) {
        super(props)
    }
    onChange = (key) => {
        // console.log(a, b, c, d);
    }

    datas = {}

    submit() {
        const _this = this;
        // console.log(this.datas);

        Toast.loading('Loading...', 1, () => {
            const props = this.props;
            service.setFollowdataById(this.datas)
                .then((result) => {
                    // console.log('fetchalldatas', result)

                    Toast.success(result||'成功', 1, () => {
                        _this.onClose('cancel');
                        props.onfresh();
                    },true);


                })
                .catch((e) => {
                    Toast.fail('Update fail ' + e, 3, () => {
                        _this.onClose('cancel');
                        props.onfresh();
                    }, true);
                });
        }, true);

    }

    onClick = (itemData, data, source) => {
        var _this = this;
        // console.log(data)
        Popup.show(<div>
        <List renderHeader={() => (
            <div style={{ position: 'relative',fontSize:"0.35rem" ,fontWeight:"bold",textAlign:"center" }}>编辑<span style={{position: 'absolute', right: 3, top: -5, }}
            onClick={() => _this.onClose('cancel')}><Icon type="cross" /></span></div>)} className="popup-list">

            <EditModule collectData={(datas)=>{this.datas=datas}} itemData={itemData} data={data} source={source}/>

      </List>
      <ul style={{ padding: '0.18rem 0.3rem', listStyle: 'none' }}>
        <li></li>
        <li style={{ marginTop: '0.18rem' }}>
          <Button type="primary" onClick={() => this.submit('cancel')}>更新</Button>
        </li>
      </ul></div>, {
            animationType: 'slide-up',
            maskProps,
            maskClosable: false
        });
    };

    onClose = (sel) => {
        this.setState({
            sel
        });
        Popup.hide();
    };


    render() {
        const _this = this;
        const {
            itemData,
            series,
            datas,
            source
        } = this.props;

        if (!series) {
            return null;
        }

        // console.log('datalistmodule', series, datas);

        const list = series.map(function(item, i) {
            return (<Accordion.Panel key={i} header={item.name}>
                <List className="my-list">
                    {
                        item.data.map(function(data,index){
                          return (<List.Item style={{background:data[2].IsFirst?"#f5f5f9":""}} key={data[2]._id} onClick={()=>_this.onClick(itemData,data[2],source)}>
                            <span style={{float:"left"}}><img src={editpng} /> {co.getFullDate(data[0])[6]}</span>
                            <span style={{float:"right"}}>{data[1]} <b style={{color:"#888",fontSize: "30px"}}>¥</b></span>
                            </List.Item>)
                        })
                    }
                </List>
              </Accordion.Panel>)
        })

        const defaultdata = {
            "_id": "",
            "FollowId": itemData.FollowId,
            "IsFirst": false,
            "Name": itemData.Name,
            "SourceId": 0,
            "SourceName": "",
            "Price": 0,
            "SourceProductNo": "-",
            "InsertUser": "",
            "Unit": itemData.Unit,
            "InsertDate": "",
            "UpdateDate": "",
        }

        // console.log('defaultdata',defaultdata)



        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              {list}
               
            </Accordion> 
            <List className="my-list">
             <List.Item key={"xxxxx"} onClick={()=>_this.onClick(itemData,defaultdata,source)}>
                <span style={{textAlign:"center"}}><img src={addpng} /> ADD </span>
              </List.Item>
             </List>
          </div>
        );
    }
}

DatasListModule.propTypes = {
    itemData: PropTypes.object,
    series: PropTypes.array,
    datas: PropTypes.array,
    source: PropTypes.array,
    onfresh: PropTypes.func
}

DatasListModule.defaultProps = {

}

export default DatasListModule