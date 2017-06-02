import React, {
    Component
} from 'react'


import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter
} from 'react-weui';
import {
    Radio,
    Checkbox,
    Cell,
    CellsTitle,
    CellHeader,
    Form,
    FormCell,
    CellFooter,
    CellBody
} from 'react-weui';


import {
    hashHistory
} from 'react-router'



// import style from './index.less'


// let datas = []

class Selection extends Component {
    constructor(props) {
        super(props)
        console.log(props)

    }
    handleChange(text) {
        console.log(text)

    }

    handleClick(index) {
        console.log(index)

        hashHistory.replace("/msg?type=1")


    }

    render() {
        return (
            <div>
                <Panel>
                    <PanelHeader>
                    </PanelHeader>
                    <PanelBody>
                    <Form radio>
                        <FormCell radio>
                            <CellBody>Option 1</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="1" defaultChecked onClick={()=>{this.handleClick(1)}}/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellBody>Option 2</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2"/>
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <CellsTitle>Checkbox</CellsTitle>
                    <Form checkbox>
                        <FormCell checkbox>
                            <CellHeader>
                                <Checkbox name="checkbox1" value="1"/>
                            </CellHeader>
                            <CellBody>Option 1</CellBody>
                        </FormCell>
                        <FormCell checkbox>
                            <CellHeader>
                                <Checkbox name="checkbox2" value="2" defaultChecked/>
                            </CellHeader>
                            <CellBody>Option 2</CellBody>
                        </FormCell>
                        <Cell link>
                            <CellBody>More</CellBody>
                        </Cell>
                    </Form>
                    </PanelBody>
                    <PanelFooter href="javascript:void(0);">
                    </PanelFooter>
                </Panel>
            </div>
        )
    }
}

Selection.propTypes = {

}

Selection.defaultProps = {

}

export default Selection