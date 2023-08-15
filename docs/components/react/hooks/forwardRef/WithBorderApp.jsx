import React, { forwardRef } from "react";
import { Card, Button } from "antd";

// 高阶组件，为组件添加一个边框
function withBorder(WrappedComponent) {
  const WithBorder = forwardRef((props, ref) => {
    // TODO：先执行
    return (
      <div style={{ border: "2px solid blue" }}>
        <WrappedComponent ref={ref} {...props} />
      </div>
    );
  });

  return WithBorder;
}

// 原始组件
const SimpleButton = forwardRef((props, ref) => {
  // TODO：后执行
  return <button ref={ref} style={{ width: "100%" }} {...props} />;
});

// 使用高阶组件包裹原始组件
const ButtonWithBorder = withBorder(SimpleButton);

function App() {
  const ref = React.useRef();

  return (
    <Card title="案例 demo">
      <ButtonWithBorder ref={ref} />
      <Button
        onClick={() => {
          // 随机文本
          ref.current.innerText = Math.random().toString(36).slice(-8);
        }}
        style={{ marginTop: 16 }}
      >
        Change Text
      </Button>
    </Card>
  );
}

export default App;
