import React, { useState } from "react";
import { Button } from "antd";

function ClickButton() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        计数器
      </Button>
      <p color="amber">{count}</p>
    </>
  );
}

export default ClickButton;
