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

// function getGithubLink(name: string) {
//   return `https://github.com/${name}`;
// }
</script>

<template>
  <div
    border="1 solid [var(--vp-c-border)] opacity-50 rounded-4"
    p="y-24 x-12"
    m="t-24"
    relative
    break="words"
  >
    <div i="fa6-solid-copyright" absolute top="12" right="16" />
    <div>
      <span font="bold">作 者：</span>
      <!-- <span>
        <a :href="getGithubLink(author)" rel="noreferrer" target="_blank">
          {{ getName(author) }}
        </a>
      </span> -->
      <span>{{ getName(author) }}</span>
    </div>
    <div m="t-8">
      <span font="bold">链 接：</span>
      <span>
        <a :href="pageHref" rel="noreferrer" target="_blank">
          {{ pageHref }}
        </a>
      </span>
    </div>
    <!-- <div m="t-8">
      <span font="bold">合 作：</span>
      <span>
        <span
          p="x-6 y-4"
          text="12px"
          bg="blue-4"
          border="rounded-4"
          cursor="pointer"
        >
          发文章
        </span>
      </span>
    </div> -->
  </div>
</template>
