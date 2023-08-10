import { useRef } from "react";
import { Card, Input, Button, Space } from "antd";

function TextInputWithFocus() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <Card title="案例 demo">
      <Space>
        <Input ref={inputEl} placeholder="click button" />
        <Button onClick={onButtonClick} type="primary">
          Focus the input
        </Button>
      </Space>
    </Card>
  );
}

export default TextInputWithFocus;
