import React, { useState, createContext, useContext } from "react";
import { Card, Button } from "antd";

// 1. 创建上下文
const UserPreferencesContext = createContext({
  theme: "light",
  fontSize: "medium",
});

function App() {
  const [preferences, setPreferences] = useState({
    theme: "light",
    fontSize: "medium",
  });

  // 2. 使用 Provider
  return (
    <Card title="案例 demo">
      <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
        <Navbar />
        <Content />
      </UserPreferencesContext.Provider>
    </Card>
  );
}

// 3. 使用 useContext
function Navbar() {
  const { preferences } = useContext(UserPreferencesContext);

  return (
    <nav
      style={{
        backgroundColor: preferences.theme === "dark" ? "#333" : "#FFF",
        color: preferences.theme === "dark" ? "#FFF" : "#333",
        padding: "10px",
      }}
    >
      App Navbar
    </nav>
  );
}

// 4. 使用 Consumer
class Content extends React.Component {
  render() {
    return (
      <UserPreferencesContext.Consumer>
        {({ preferences, setPreferences }) => (
          <div style={{ padding: "20px" }}>
            <p
              style={{
                fontSize: preferences.fontSize === "large" ? "20px" : "16px",
              }}
            >
              This is some content.
            </p>
            <Button
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  theme: prev.theme === "light" ? "dark" : "light",
                }))
              }
              type="primary"
            >
              Toggle Theme
            </Button>
            <Button
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  fontSize: prev.fontSize === "medium" ? "large" : "medium",
                }))
              }
              style={{ marginLeft: "10px" }}
              type="primary"
            >
              Toggle Font Size
            </Button>
          </div>
        )}
      </UserPreferencesContext.Consumer>
    );
  }
}

export default App;
