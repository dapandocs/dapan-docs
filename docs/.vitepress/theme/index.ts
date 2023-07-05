import type { EnhanceAppContext, Theme } from "vitepress";
import defaultTheme from "vitepress/theme";

import "uno.css";

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ router }: EnhanceAppContext) {},
};

export default theme;
