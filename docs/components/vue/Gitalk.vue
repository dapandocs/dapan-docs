<template>
  <div id="gitalk-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  let pathname = decodeURI(window.location.pathname);
  if (pathname.length > 48) {
    pathname = pathname.slice(-48);
  }
  const commentConfig: Record<string, any> = {
    // 是否开启
    enable: true,
    // clientID
    clientID: "570a9490e028ba1dc3c8",
    // clientSecret
    clientSecret: "f8bd88ce84a1cbc311a62ff13026c6e04b643874",
    // 评论项目名
    repo: "gitalk-comments",
    owner: "dapandocs",
    admin: ["dapandocs"],
    githubID: "dapandocs",
    id: pathname,
    language: "zh-CN",
    distractionFreeMode: true,
  };
  try {
    // @ts-ignore
    const gitalk = new Gitalk(commentConfig);
    gitalk.render("gitalk-container");
  } catch (error) {
    console.log("gitalk render fail.");
  }
});
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
.gt-container.gt-input-focused:after {
  content: "";
  position: fixed;
  bottom: 0%;
  left: 0;
  right: 0;
  top: 0;
  background: transparent !important;
  opacity: 0.6;
  -webkit-transition: opacity 0.3s, bottom 0s;
  transition: opacity 0.3s, bottom 0s;
  z-index: 9999;
}
.gt-container .gt-avatar-github {
  background: #fff;
  border-radius: 50%;
}

.dark .gt-container .gt-header-textarea {
    background: #f6f6f6;
}
</style>
