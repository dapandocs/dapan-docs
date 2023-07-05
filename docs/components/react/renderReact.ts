import React, { createElement, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { Ref, onMounted } from "vue";

function renderReact(
  Component: React.ComponentType<any>,
  el: Ref<Element | undefined>,
) {
  onMounted(() => {
    const root = createRoot(el.value!);
    root.render(createElement(Component, null, null) as ReactElement);
  });
}
export default renderReact;
