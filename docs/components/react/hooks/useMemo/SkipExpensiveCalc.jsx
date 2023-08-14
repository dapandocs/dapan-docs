import { useState, useMemo } from "react";
import { Card, Button, Divider } from "antd";

function SumComponent() {
  const [maxNumber, setMaxNumber] = useState(10000000);
  const [maxKey, setMaxKey] = useState(10000000);
  const [count, setCount] = useState(0);

  const maxKeySum = () => {
    console.log("maxKey Calculating sum...");
    let sum = 0;
    for (let i = 1; i <= maxKey; i++) {
      sum += i;
    }
    return sum;
  };

  const maxNumberSum = useMemo(() => {
    console.log("maxNumber Calculating sum...");
    let sum = 0;
    for (let i = 1; i <= maxNumber; i++) {
      sum += i;
    }
    return sum;
  }, [maxNumber]);

  return (
    <Card title="案例 demo" extra={<span>在控制台查看打印结果</span>}>
      <p>最大数字 maxKey: {maxKey}</p>
      <p>
        从 1 到 {maxKey} 的数字之和是: {maxKeySum()}
      </p>
      <Button onClick={() => setMaxKey(maxKey - 100)} type="primary">
        maxKey - 100
      </Button>

      <Divider>使用 useMemo</Divider>
      <p>最大数字 maxNumber: {maxNumber}</p>
      <p>
        从 1 到 {maxNumber} 的数字之和是: {maxNumberSum}
      </p>
      <Button onClick={() => setMaxNumber(maxNumber - 100)} type="primary">
        maxNumber - 100
      </Button>

      <Divider>无关按钮</Divider>
      <p>Count 按钮点击次数：{count}</p>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        Count + 1
      </Button>
    </Card>
  );
}

export default SumComponent;
