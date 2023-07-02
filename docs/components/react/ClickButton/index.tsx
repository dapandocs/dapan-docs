import React, { useState } from "react";

function ClickButton() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <div
        style={{ color: "red" }}
        onClick={() => {
          setCount(count + 1);

        }}
      >
        ClickButton2
      </div>
      {count}
    </>
  );
}

export default ClickButton;
