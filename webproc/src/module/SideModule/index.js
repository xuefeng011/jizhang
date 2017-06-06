import React, {
    Component
} from 'react'

// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'
import { List,Drawer } from 'antd-mobile';
class SideModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        };
    }
    componentDidMount() {
       
    }

    handlechange(){
         console.log("modulehandlechange")
        this.setState({ open: !this.state.open })

    }
    render() {
        const sidebar = (<List>
            {[...Array(2).keys()].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                    >Categor111y</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Categ222ory{index}</List.Item>);
            })}
        </List>);

        // const props = this.props

        return (
            <Drawer
                position="left"
                sidebar={sidebar}
                sidebarStyle={{ backgroundColor: '#fff' }}
                open={this.state.open}
                onOpenChange={this.handlechange}
            >  </Drawer>
        );
    }
}

SideModule.propTypes = {
    // datas: PropTypes.array.isRequired
}

SideModule.defaultProps = {

}

export default SideModule