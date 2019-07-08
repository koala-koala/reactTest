import React, { PureComponent } from "react";
import { connect } from "react-redux";
import cStore from "containers/configureStore";
import { Table, Button } from "antd";
import reducer, { getList } from "./reducer";

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.nb = React.createRef();
  }
  state = {};
  columns = [
    {
      dataIndex: "portfolio_id",
      title: "ID"
    },
    {
      dataIndex: "portfolio_name",
      title: "名称"
    }
  ];

  componentDidMount = () => {
    this.props.getList();
    console.log(this.pb, this.nb);
  };

  handleBack = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <button ref={node => (this.pb = node)}>按钮</button>
        <button ref={this.nb}>按钮</button>
        <Button onClick={this.handleBack}>返回首页</Button>
        <Table
          rowKey="portfolio_id"
          columns={this.columns}
          dataSource={this.props.data}
        >
          列表
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.list
  };
};

const mapDispatchToProps = {
  getList
};

cStore.injectReducer({ key: "list", reducer });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
