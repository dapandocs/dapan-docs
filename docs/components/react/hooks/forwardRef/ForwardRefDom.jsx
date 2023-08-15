import React, { forwardRef, useRef } from "react";
import { Card, Button } from "antd";

const FancyButton = forwardRef((props, ref) => (
  <Button {...props} ref={ref}>
    {props.children}
  </Button>
));

function App() {
  const ref = useRef();
  return (
    <Card title="案例 demo">
      <FancyButton
        ref={ref}
        onClick={() => {
          // 更改按钮字体的随机颜色
          ref.current.style.color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          // 更改按钮背景的随机颜色
          ref.current.style.background = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
        }}
      >
        Click me!
      </FancyButton>
    </Card>
  );
}

export default App;
