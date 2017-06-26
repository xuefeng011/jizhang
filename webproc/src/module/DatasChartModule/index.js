import React, {
    Component,
    PropTypes
} from 'react'

import co from 'co'


// import _ from 'underscore'

// import ReactHighstock from 'react-highcharts/ReactHighstock.src'
// import Highlight from 'react-highlight'

// const data = [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]];

// const data = [
//     ['06-23', 3.1, 19],
//     ['06-24', 3.2, 20],
//     ['06-25', 3.3, 21],
//     ['06-26', 3.4, 22],
//     ['06-27', 3.5, 23],
//     ['06-28', 3.6, 24],
//     ['06-29', 3.7, 25]
// ]

// const config = {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: '价格曲线'
//     },
//     xAxis: {
//         visible: false,
//         categories: []
//     },
//     yAxis: {
//         title: {
//             text: '元'
//         },
//         plotLines: [{
//             value: 0,
//             width: 1,
//             color: '#808080'
//         }]
//     },
//     tooltip: {
//         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//             '<td style="padding:0"><b style="color:#f40">{point.y:.2f} 元</b></td></tr>',
//         footerFormat: '</table>',
//         shared: true,
//         useHTML: true
//     },
//     legend: {
//         layout: 'horizontal',
//         align: 'center',
//         verticalAlign: 'top',
//         y: 20,
//         borderWidth: 0
//     },
//     series: [{
//         name: '东京',
//         data: [7.45, 6.9, 9.50, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//     }, {
//         name: '纽约',
//         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
//     }, {
//         name: '柏林',
//         data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
//     }, {
//         name: '伦敦',
//         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//     }]
// }



// const config =  {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: '价格曲线'
//     },
//     xAxis: {
//         visible: false,
//         categories: []
//     },
//     yAxis: {
//         title: {
//             text: '元'
//         },
//         plotLines: [{
//             value: 0,
//             width: 1,
//             color: '#808080'
//         }]
//     },
//     tooltip: {

//     },
//     series: [{
//         name: "shixing",
//         data: [
//             ['2017-03-06', 29.9],
//             ['2017-03-07', -71.5],
//             ['2017-03-08', 106.4]
//         ]
//     }, {
//         name: "永辉",
//         data: [
//             ['2017-03-06', 1],
//             ['2017-03-09', 3.3],
//             ['2017-03-10', 3]
//         ]
//     }]
//  }



const config =  {
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: '元'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    title: {
        text: '价格曲线'
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b style="color:#f40">{point.y:.2f} 元</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    series: [{
        name:"永辉",
        data: [
            [new Date('2017-06-10T00:00:00.000Z').valueOf(), 29.9],
            [new Date('2017-06-20T00:00:00.000Z').valueOf(), -71.5],
            [new Date('2017-06-30T00:00:00.000Z').valueOf(), 106.4]
        ]
    },
    {
        name:"食行生鲜",
        data: [
            [new Date('2017-06-10T00:00:00.000Z').valueOf(), 9.9],
            [new Date('2017-06-14T00:00:00.000Z').valueOf(), -1.5],
            [new Date('2017-06-15T00:00:00.000Z').valueOf(), 16.4]
        ]
    }]
}

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

// const config = {
//    HighchartsConfig 
// };



// import style from './index.less'
// import {
//     Button
// } from 'antd-mobile'

class DatasChartModule extends Component {
    constructor(props) {
        super(props)
            // console.log(props)
    }

    render() {
        const series = this.props.series;
        // console.log('chart',item)
        if (!series) {
            return null;
        }

       
        config.series = series

        return (
            <div>
              <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );
    }
}

DatasChartModule.propTypes = {
    series: PropTypes.array
}

DatasChartModule.defaultProps = {

}

export default DatasChartModule