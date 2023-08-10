import { useState, memo } from "react";
import { Card, Button } from "antd";

function ChildComponent(props) {
  console.log("ChildComponent 渲染");
  return <p>{props.text}</p>;
}

const MemoizedChildComponent = memo(ChildComponent);

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <Card title="案例 demo">
      <p>Current count: {count}</p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        Increment
      </Button>
      <MemoizedChildComponent text="我是 memoized 子组件，请在控制台查看打印结果！" />
    </Card>
  );
}

export default ParentComponent;
