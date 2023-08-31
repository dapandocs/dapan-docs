<script lang="ts" setup>
// 直接使用 defineProps，无需导入
const props = defineProps<{
  id: string;
  title: string;
}>();

const { id, title } = props;
</script>

<template>
  <iframe
    height="300"
    style="width: 100%"
    scrolling="no"
    :title="title"
    :src="`https://codepen.io/dapandocs/embed/${id}`"
    frameborder="no"
    allowtransparency="true"
    allowfullscreen="true"
  />
</template>
