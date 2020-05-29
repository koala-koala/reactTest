import React, { PureComponent } from "react";
import { connect } from "react-redux";
import html2Pdf from 'utils/html2Pdf';
import cStore from "containers/configureStore";
import styled from 'styled-components';
import { Table, Button } from "antd";
import moment from 'moment';
import CodeMirror from 'components/CodeMirror';
import { ReactHighcharts, baseDateConfig } from 'components/Highcharts';
import reducer, { getList } from "./reducer";
import series from './data';

const config = {
  ...baseDateConfig,
  legend: {
    enabled: true,
    align: 'left',
    verticalAlign: 'top',
    itemMarginBottom: 20,
    itemStyle: { fontSize: '14px', fontWeight: 'normal' },
  },
  xAxis: {
    type: 'datetime',
    showFirstLabel: true,
    allowDecimals: false,
    tickPixelInterval: 1,
    labels: {
      // rotation: -45,
      formatter() {
        return moment(this.value).format('YYYY-MM-DD');
      },
    },
  },
  tooltip: {
    shared: true,
    padding: 8,
    formatter() {
      const date = moment(this.x).format('YYYY-MM-DD');
      return this.points.reduce(
        (p, c) =>
          `${p}<br><span style="color:${c.color}">${
            c.series.name
          }:<span>${c.y}</span></span>`,
        date
      );
    },
  },
  yAxis: [
    {
      title: { text: '', align: 'high', rotation: 0, offset: 60, y: 0 },
      gridLineColor: '#ebebeb',
      opposite: false,
      showLastLabel: true,
      labels: {
        align: 'right',
        x: -10,
        y: 0,
      },
    },
  ],
  series,
};
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.nb = React.createRef();
  }
  state = {};
  columns = [
    {
      dataIndex: "external_id",
      title: "ID"
    },
    {
      dataIndex: "portfolio_name",
      title: "名称"
    }
  ];

  componentDidMount = () => {
    this.props.getList();
  };

  handleBack = () => {
    this.props.history.push("/");
  };

  handleClick = () => {
    document.getElementById('test').querySelector('.ant-table-scroll .ant-table-body').style = 'overflow: visible';
    html2Pdf(document.getElementById('test'), '测试');
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>导出PDF</button>
        <div id='test' style={{padding: '20px'}}>
          <LintTitle>标题啊</LintTitle>
          <div style={{fontSize: '20px'}}>20px</div>
          <div style={{fontSize: '18px'}}>18px</div>
          <div style={{fontSize: '16px'}}>16px</div>
          <div style={{fontSize: '14px'}}>14px</div>
    
          <Button onClick={this.handleBack}>返回首页</Button>
          <Table
            rowKey="portfolio_id"
            columns={this.columns}
            dataSource={this.props.data}
            pagination={false}
            scroll={{y: 300}}
          >
          </Table>
          <ReactHighcharts
            config={config}
            isPureConfig
            />
            <CodeMirror />
        </div>
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

export const LintTitle = styled.div`
  font-size: 16px;
  color: #333;
  position: relative;
  padding-left: 6px;
  margin: 15px 0;

  &::before {
    display: block;
    content: '';
    width: 3.5px;
    height: 16px;
    /* border-radius: 4px; */
    position: absolute;
    left: 0;
    top: 4px;
    background-color: ${(props) => props.itemColor || '#108CEE'};
  }
`;
