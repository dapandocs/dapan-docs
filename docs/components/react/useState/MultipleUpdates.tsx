import { useState } from "react";
import { Card, Button, Space } from "antd";

const Counter = () => {
  const [count, setCount] = useState(0);

  // 方法一
  function handleMultipleUpdates() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  // 方法二
  function handleMultipleUpdatesFn() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <Card>
      <Space>
        <div>Count: {count}</div>
        <Button onClick={handleMultipleUpdates} type="primary">
          批量更新[方法一]
        </Button>
        <Button onClick={handleMultipleUpdatesFn} type="primary">
          批量更新[方法二]
        </Button>
        <Button onClick={() => setCount(0)} type="primary">
          重置
        </Button>
      </Space>
    </Card>
  );
};

export default Counter;
