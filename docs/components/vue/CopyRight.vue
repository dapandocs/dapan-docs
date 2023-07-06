<script setup lang="ts">
import { useData } from "vitepress";
import { ref } from "vue";

const defaultAuthor = "DapanDocs";
const { frontmatter } = useData();
const author = ref(defaultAuthor);

if (frontmatter.value?.author) author.value = frontmatter.value?.author;

const pageHref = location.href;

function getName(name: string) {
  return name === defaultAuthor ? "dapan" : name;
}

function getGithubLink(name: string) {
  return `https://github.com/${name}`;
}
</script>

<template>
  <div
    border="1 solid [var(--vp-c-border)] opacity-50 rounded-4"
    p="12"
    m="t-24"
  >
    <div>
      <span font="bold">文章作者：</span>
      <span>
        <a :href="getGithubLink(author)" rel="noreferrer" target="_blank">
          {{ getName(author) }}
        </a>
      </span>
    </div>
    <div m="t-8">
      <span font="bold">文章链接：</span>
      <span>
        <a :href="pageHref" rel="noreferrer" target="_blank">
          {{ pageHref }}
        </a>
      </span>
    </div>
  </div>
</template>
