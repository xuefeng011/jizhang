import React, { Component } from 'react'


import { Grids } from 'react-weui';


// import iconSrc from './1.png';


class Sudoku extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {

        let icons = []
        const arrname = ['记账', '设置', '报表', '日历', '待定', '待定', '待定', '待定', '待定']
        Array.from({
            length: 9
        }).map((v, i) => {

            icons.push({
                icon: <img src={require(`./${i + 1}.png`)}/>,
                label: arrname[i],
                href: 'javascript:;'
            })
        })

        // const data = Array(9).fill({
        //     icon: <img src={icons}/>,
        //     label: 'Grid',
        //     href: 'javascript:;'
        // })

        return (
            <div>
            <Grids data={icons}/>
            </div>
        )
    }
}

Sudoku.propTypes = {

}

Sudoku.defaultProps = {

}

export default Sudoku