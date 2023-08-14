import React, { useContext } from "react";
import { Card } from "antd";

const ThemeContext = React.createContext("default");

function Footer() {
  const theme = useContext(ThemeContext);
  return <div>The theme in Footer is: {theme}</div>;
}

function NestedTheme() {
  return (
    <Card title="案例 demo">
      <ThemeContext.Provider value="dark">
        <div>The theme outside Footer is: dark</div>
        <ThemeContext.Provider value="light">
          <Footer />
        </ThemeContext.Provider>
      </ThemeContext.Provider>
    </Card>
  );
}

export default NestedTheme;
