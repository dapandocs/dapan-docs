import React, { useState } from "react";

function ClickButton() {
  const [count, setCount] = useState(0);

  return (
    <div
      display="flex"
      justify="between"
      font="bold"
      p="12"
      color="white"
      bg="blue-500"
      border="rounded-6"
      cursor="pointer"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      <span>React Click Button</span>
      <div color="amber">{count}</div>
    </div>
  );
}

export default ClickButton;
