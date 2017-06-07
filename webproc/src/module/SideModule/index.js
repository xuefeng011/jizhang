import React, {
    Component,
    PropTypes
} from 'react'

// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'
import {
    List,
    Drawer
} from 'antd-mobile';

// let isinit = true;

class SideModule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: props.open,
            isinit: true
        };
        // console.log("constructor", this.state)
    }

    componentDidMount() {
        // isinit = false;
        // console.log(isinit)
    }

    // handlechange() {
    //     console.log("modulehandlechange")
    //     this.setState({
    //         open: !this.state.open
    //     })

    // }

    componentWillReceiveProps(nextProps) {
        // if (isinit) isinit = false;
        // console.log("componentWillReceiveProps", nextProps, this.state.open, this.state)
        if (!nextProps.open && !this.state.open) {
            this.setState({
                open: this.state.isinit ? false : true,
                isinit: false
            })
        } else {
            this.setState({
                open: nextProps.open,
                isinit: false
            })
        }
    }

    onopenclose() {
        // console.log("onopenclose", this.props.open, this.state.open)
        this.setState({
            open: false
        })
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

        // console.log('sidemodule', props, this.state)

        return ( < Drawer position = "top"
            sidebar = {
                sidebar
            }
            sidebarStyle = {
                {
                    backgroundColor: '#fff'
                }
            }
            open = {
                this.state.open
            }
            onOpenChange = {
                () =>
                this.onopenclose()
            } > < /Drawer>
        );
    }
}

SideModule.propTypes = {
    // handlechange: PropTypes.func.isRequired
    open: PropTypes.bool.isRequired
}

SideModule.defaultProps = {

}

export default SideModule