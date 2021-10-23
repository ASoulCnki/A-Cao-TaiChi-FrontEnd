<script lang="ts" setup>
import Chat from '../components/Chat.vue';
</script>

<template>
  <div
    class="bg-white flex h-full mx-auto bg-opacity-55 pb-5 w-1000px justify-center"
  >
    <Chat />
  </div>
</template>

<style>
body {
  background: url("/assets/images/bg.jpg") top/cover fixed no-repeat;
  @apply h-full;
}
</style>