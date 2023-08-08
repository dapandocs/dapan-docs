import { useState, useEffect } from "react";
import { message, Card, Button } from "antd";

function App() {
  const [userInfo, setUserInfo] = useState({ name: "John", age: 25 });

  useEffect(() => {
    message.info("useEffect has run due to userInfo object reference change.");
  }, [userInfo]);

  const handleChangeUserInfo = () => {
    setUserInfo({ ...userInfo });
  };

  return (
    <Card>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <Button onClick={handleChangeUserInfo} type="primary">change userInfo</Button>
    </Card>
  );
}

export default App;
