import { useRef, useState, useEffect } from "react";
import { Card, Button, Space } from "antd";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const count = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        count.current += 1;
        console.log(`Timer has run ${count.current} times.`);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  return (
    <Card title="案例 demo">
      <p>Check the console to see the timer count：{count.current}</p>
      <Space>
        <Button onClick={startTimer} type="primary" disabled={isRunning}>
          开始
        </Button>
        <Button onClick={stopTimer} disabled={!isRunning}>
          停止
        </Button>
      </Space>
    </Card>
  );
}

export default Timer;
