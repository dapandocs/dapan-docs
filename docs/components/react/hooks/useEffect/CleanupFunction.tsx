import { useState, useEffect } from "react";
import { message, Card, Button } from "antd";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    message.info(`Effect for count: ${count}`);

    return () => {
      message.info(`Cleanup for count: ${count}`);
    };
  }, [count]);

  return (
    <Card title="案例 demo">
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)} type="primary">
        change count
      </Button>
    </Card>
  );
}

export default App;
