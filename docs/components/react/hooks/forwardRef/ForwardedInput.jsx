import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Card, Button, Input } from "antd";

const ForwardedInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <Input ref={inputRef} {...props} />;
});

function App() {
  const inputRef = useRef();

  return (
    <Card title="案例 demo">
      <ForwardedInput ref={inputRef} placeholder="点击按钮试试！" />
      <Button
        onClick={() => inputRef.current.focus()}
        type="primary"
        style={{ marginTop: 16 }}
      >
        Focus Input
      </Button>
    </Card>
  );
}

export default App;
