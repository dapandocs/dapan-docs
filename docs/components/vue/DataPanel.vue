<template>
  <div p="0 24" mt="24">
    <div
      mx="auto"
      max-w="1152"
      min-h="32"
      width="full"
      bg="[var(--vp-c-bg-soft)]"
      w="full"
      rounded="8"
    >
      <section
        display="grid"
        grid-cols="3"
        justify-items="center"
        py="12"
        px="24"
        items="center"
      >
        <h2 leading="24" text="16">
          总访问量 <span id="busuanzi_value_site_pv" class="font-bold" /> 次
        </h2>
        <div i="material-symbols-ecg-heart-sharp" class="heart-beat" />
        <h2 leading="24" text="16">
          访客数 <span id="busuanzi_value_site_uv" class="font-bold" /> 人次
        </h2>
      </section>
    </div>
  </div>
</template>

<style scoped>
.heart-beat {
  color: red;
  animation: heartBeat 1.33s ease-in-out infinite;
}

@keyframes heartBeat {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
</style>
