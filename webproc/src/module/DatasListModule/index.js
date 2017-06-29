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

        Toast.loading('Loading...',1 , () => {
            const props = this.props;
            service.setFollowdataById(this.datas)
                .then((result) => {
                    // console.log('fetchalldatas', result)

                    Toast.success('Update success !!!', 1, () => {
                        this.onClose('cancel');
                        props.onfresh();
                    },true);


                })
                .catch((e) => {
                    Toast.fail('Update fail '+e, 3, () => {
                        this.onClose('cancel');
                        props.onfresh();
                    },true);
                });
        },true);

    }

    onClick = (itemData, data) => {
        var _this = this;

        Popup.show(<div>
        <List renderHeader={() => (
            <div style={{ position: 'relative',fontSize:"0.35rem" ,fontWeight:"bold",textAlign:"center" }}>编辑<span style={{position: 'absolute', right: 3, top: -5, }}
            onClick={() => this.onClose('cancel')}><Icon type="cross" /></span></div>)} className="popup-list">

            <EditModule collectData={(datas)=>{this.datas=datas}} itemData={itemData} data={data} />

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
            datas
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
                          return (<List.Item key={data[2]._id} onClick={()=>_this.onClick(itemData,data[2])}>
                            <span style={{float:"left"}}><img src={editpng} /> {co.getFullDate(data[0])[6]}</span>
                            <span style={{float:"right"}}>{data[1]} <b style={{color:"#888",fontSize: "30px"}}>¥</b></span>
                            </List.Item>)
                        })
                    }
                </List>
              </Accordion.Panel>)
        })



        return (
            <div style={{ marginTop: 10, marginBottom: 10 }}>
            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              {list}
            </Accordion>
          </div>
        );
    }
}

DatasListModule.propTypes = {
    itemData: PropTypes.object,
    series: PropTypes.array,
    datas: PropTypes.array,
    onfresh: PropTypes.func
}

DatasListModule.defaultProps = {

}

export default DatasListModule