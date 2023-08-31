<template>
  <div id="gitalk-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
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
    id: decodeURI(window.location.pathname),
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
