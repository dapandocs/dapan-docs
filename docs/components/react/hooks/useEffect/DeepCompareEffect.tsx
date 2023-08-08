import { useState, useEffect } from "react";
import { useDeepCompareEffect } from "ahooks";
import { message, Card, Button } from "antd";

function App() {
  const [useInfo, setUserInfo] = useState({ name: "John", age: 25 });

  useEffect(() => {
    message.info("useEffect has run due to userInfo object value change.");
  }, [useInfo]);

  useEffect(() => {
    message.info(
      "useEffect JSON.stringify has run due to userInfo object value change."
    );
  }, [JSON.stringify(useInfo)]);

  useDeepCompareEffect(() => {
    message.info(
      "useDeepCompareEffect has run due to userInfo object value change."
    );
  }, [useInfo]);

  const handleChangeUserInfo = () => {
    setUserInfo({ ...useInfo });
  };

  return (
    <Card>
      <pre>{JSON.stringify(useInfo, null, 2)}</pre>
      <Button onClick={handleChangeUserInfo} type="primary">
        change userInfo
      </Button>
    </Card>
  );
}

export default App;
