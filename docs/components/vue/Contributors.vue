<script setup lang="ts">
import { ref } from "vue";
import { useData } from "vitepress";

const defaultAuthor = "DapanDocs";
const { frontmatter } = useData();

const contributorsArr = [
  frontmatter.value?.author,
  ...(frontmatter.value.contributors || []),
].filter((i) => i);
const contributors = ref(contributorsArr);

function getName(name: string) {
  return name === defaultAuthor ? "dapan" : name;
}

function getAvatarUrl(name: string) {
  return `https://proxy.skillgroup.cn/proxy/github.com/${name}.png`;
}

function getGithubLink(name: string) {
  return `https://github.com/${name}`;
}

function isNotEmpty(arr: string | string[]) {
  return Array.isArray(arr) && arr.length;
}
</script>

<template>
  <div v-if="isNotEmpty(contributors)" display="flex" gap="24">
    <div
      v-for="contributor of contributors"
      :key="contributor"
      display="flex"
      gap="12"
      items="center"
    >
      <a :href="getGithubLink(contributor)" rel="noreferrer" target="_blank">
        <img
          w="42"
          h="42"
          border="rounded-full"
          :src="getAvatarUrl(contributor)"
        />
      </a>
      <span>{{ getName(contributor) }}</span>
    </div>
  </div>
  <div v-else display="flex" gap="12" items="center">
    <a :href="getGithubLink(defaultAuthor)" rel="noreferrer" target="_blank">
      <img
        w="42"
        h="42"
        border="rounded-full"
        :src="getAvatarUrl(defaultAuthor)"
      />
    </a>
    <span>dapan</span>
  </div>
</template>
