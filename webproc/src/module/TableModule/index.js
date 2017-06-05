import React, {
  Component
  // PropTypes
} from 'react'


import {
  Table
} from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: 'Name',
  dataIndex: 'ProductName',
  sorter: true,
  render: data => `${data}`,
  width: '16%'
}, {
  title: 'Id',
  dataIndex: 'ProductId',
  filters: [{
    text: '=1',
    value: '1'
  }, {
    text: '=10',
    value: '10'

  }],
  render: data => `${data}`,
  width: '15%'
}, {
  title: 'Source',
  dataIndex: 'SourceId',
  filters: [{
    text: 'yh',
    value: '1'
  }, {
    text: 'drf',
    value: '2'
  }],
  render: data => `${data==1?"yh":"drf"}`,
  width: '20%'
}, {
  title: 'Price',
  dataIndex: 'RealPrice',
  sorter: true,
  render: data => `${data.toFixed(2)}`,
  width: '15%'
}, {
  title: 'Date',
  dataIndex: 'InsertDate',
  sorter: true,
  render: data => `${new Date(data).toLocaleDateString()+" "+new Date(data).toLocaleTimeString()}`,
  width: '35%'
}];



class TableModule extends Component {

  state = {
    data: [],
    pagination: {},
    loading: false
  };

  constructor(props) {
    super(props)
      // console.log(props)
  }
  handleTableChange = (pagination, filters, sorter) => {



    const pager = {...this.state.pagination
    };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field || "Id",
      sortOrder: sorter.order || 1,
      ...filters
    });
  }
  fetch = (params = {}) => {
    // console.log('params:', params);
    this.setState({
      loading: true
    });
    reqwest({
      // url: 'http://localhost:18080/products/getall',
      url: 'https://gougoustar.duapp.com/products/getall',
      method: 'get',
      data: {
        results: 8,
        ...params
      },
      type: 'json'
    }).then((data) => {
      // console.log(11111111, data)
      const pagination = {...this.state.pagination
      };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.count;
      this.setState({
        loading: false,
        data: data.datas,
        pagination
      });
    });
  }
  componentDidMount() {
    this.fetch({
      results: 10,
      page: 1,
      sortField: "Id",
      sortOrder: 1
    });
  }
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record._id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}/>
    );
  }
}


TableModule.propTypes = {
  // datas: PropTypes.array.isRequired
}

TableModule.defaultProps = {

}

export default TableModule