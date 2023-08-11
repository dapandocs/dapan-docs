import React, { Component } from "react";
import { Card, Button } from "antd";

class ChildComponent extends Component {
  render() {
    const { getText } = this.props;
    console.log("ChildComponent render");
    return <p>{getText()}</p>;
  }
}

const MemoizedChildComponent = React.memo(ChildComponent);

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  getText = () => {
    return "我是子组件，请在控制台查看打印结果！";
  };

  render() {
    const { count } = this.state;
    return (
      <Card title="案例 demo">
        <p>Current count: {count}</p>
        <Button
          onClick={() => this.setState({ count: this.state.count + 1 })}
          type="primary"
        >
          Increment
        </Button>
        <MemoizedChildComponent getText={this.getText} />
      </Card>
    );
  }
}

export default ParentComponent;
