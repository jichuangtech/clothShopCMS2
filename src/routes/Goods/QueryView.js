import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable/goods';
import styles from '../List/TableList.less';

@connect(({ goods }) => ({
  goods,
}))
class QueryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/queryGoods',
    });
  }
  handleSelectRows() {

  }
  handleStandardTableChange() {

  }
  render() {
    const { goods: { list, loading } } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderLayout title="查询商品">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={list}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}


export default QueryView;
