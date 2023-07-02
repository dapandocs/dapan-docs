import React, { createElement, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { Ref, ref, onMounted } from "vue";

type ReactRenderResult = {
  el: Ref<Element | undefined>;
};

function renderReact(Component: React.ComponentType<any>): ReactRenderResult {
  const el: Ref<Element | undefined> = ref();
  onMounted(() => {
    const root = createRoot(el.value!);
    root.render(createElement(Component, {}, null) as ReactElement);
  });
  return { el };
}
export default renderReact;
