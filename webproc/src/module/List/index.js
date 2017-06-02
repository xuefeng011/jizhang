import React, { Component, PropTypes } from 'react'


import { Cells, Cell, CellsTitle, CellBody, CellFooter } from 'react-weui';


class List extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {

        const {datas} = this.props || [];

        return (
            <div>
                <CellsTitle>edit history</CellsTitle>
                <Cells>
                    {datas.length > 0 ? datas.map((item, i) => {
                return (<Cell key={i} style={{
                        fontSize: "11px"
                    }}>
                        <CellBody>
                            {item.name}
                        </CellBody>
                        <CellFooter>
                            {item.date}
                        </CellFooter>
                    </Cell>)
            }) : null}
                </Cells>
            </div>
        );
    }
}

List.propTypes = {
    datas: PropTypes.array.isRequired
}

List.defaultProps = {

}

export default List