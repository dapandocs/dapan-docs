import { useState, useEffect } from "react";
import { message, Card, Button } from "antd";

const userInfo = { name: "John", age: 25 };

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    message.info("useEffect has run due to userInfo object reference change.");
  }, [userInfo]);

  const handleChangeUserInfo = () => {
    setCount(count + 1);
    userInfo.age = userInfo.age + 1;
  };

  return (
    <Card title="案例 demo">
      <p>count: {count}</p>
      <Button onClick={handleChangeUserInfo} type="primary">
        change userInfo
      </Button>
    </Card>
  );
}

export default App;
