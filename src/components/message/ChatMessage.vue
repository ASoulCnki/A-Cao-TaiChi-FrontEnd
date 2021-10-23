<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    message: string,
    avatar?: string,
    isMe?: boolean
  }>(), {
  isMe: false
})
</script>

<template>
  <div class="flex py-2" :style="{ direction: isMe ? 'rtl' : 'ltr' }">
    <div
      class="bg-white border rounded-full border-gray-200 h-30px mx-2 w-30px overflow-hidden"
    >
      <img src="/assets/images/cao.jpg" />
    </div>
    <div
      :class="{ 'is-me': isMe }"
      style="direction: ltr;"
      class="bg-white border rounded-xl rounded-tl-none border-gray-100 text-left max-w-5/7 p-1 px-3 whitespace-pre-line"
    >{{ props.message }}</div>
  </div>
</template>

<style scoped>
.is-me {
  @apply rounded-tl-xl rounded-tr-none bg-[#80B9F2]
  text-white;
}
</style>