import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ categories }) => ({
  categories,
}))
class QueryView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>我是商品查询 {JSON.stringify(this.props.categories)} </div>);
  }
}


export default QueryView;
