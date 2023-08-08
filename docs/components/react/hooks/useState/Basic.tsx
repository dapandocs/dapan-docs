import { useState } from "react";
import { Card, Button, Space } from "antd";

const Counter = () => {
  const [count, setCount] = useState(0);

  // 方法一
  function handleClick() {
    setCount(count + 1);
  }

  // 方法二
  function handleClickFn() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  return (
    <Card>
      <Space>
        <div>Count: {count}</div>
        <Button onClick={handleClick} type="primary">
          count+1[方法一]
        </Button>
        <Button onClick={handleClickFn} type="primary">
          count+1[方法二]
        </Button>
        <Button onClick={() => setCount(0)} type="primary">
          重置
        </Button>
      </Space>
    </Card>
  );
};

export default Counter;
