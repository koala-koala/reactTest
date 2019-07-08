import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Test extends PureComponent {
  state = {};
  render() {
    return (
      <div>
        测试
        <Link to="/">返回首页</Link>
      </div>
    );
  }
}
