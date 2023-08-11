import { useState, memo } from "react";
import { Card, Button } from "antd";

function ChildComponent(props) {
  const { userInfo } = props;
  console.log("ChildComponent render");
  return <p>{userInfo.motto}</p>;
}

const MemoizedChildComponent = memo(ChildComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);

  const userInfo = {
    name: "张三",
    age: 18,
    motto: "我是子组件，请在控制台查看打印结果！",
  };

  return (
    <Card title="案例 demo">
      <p>Current count: {count}</p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        Increment
      </Button>
      <MemoizedChildComponent userInfo={userInfo} />
    </Card>
  );
}

export default ParentComponent;
