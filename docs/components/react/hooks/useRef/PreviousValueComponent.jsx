import { useRef, useState, useEffect } from "react";
import { Card, Button } from "antd";

function PreviousValueComponent() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <Card title="案例 demo">
      <p>Current count: {count}</p>
      <p>Previous count: {prevCountRef.current}</p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        Increment
      </Button>
    </Card>
  );
}

export default PreviousValueComponent;
