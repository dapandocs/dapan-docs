<template>
  <div
    display="flex"
    justify="between"
    font="bold"
    p="12"
    color="white"
    bg="blue-500"
    border="rounded-6"
    cursor="pointer"
    @click="count++"
  >
    <span>Vue Click Button</span>
    <span>{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>
