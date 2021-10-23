<script lang="ts" setup>
const props = withDefaults(defineProps<{
  name: string
  description?: string
  avatar?: string
}>(), {
  description: '硅基生物'
})
</script>

<template>
  <label>
    <input type="radio" name="user" class="hidden" />
    <div class="user-panel">
      <span class="close-button">x</span>
      <img
        src="/assets/images/cao.jpg"
        class="rounded-full border-1 border-gray-300 h-45px w-45px user-avatar inline-block overflow-hidden"
      />
      <div class="text-dark-200 inline-block">
        <div class="font-350 pb-2px">{{ props.name }}</div>
        <div
          class="text-xs text-gray-500 w-145px overflow-ellipsis"
        >{{ props.description }}</div>
      </div>
    </div>
  </label>
</template>

<style>
.user-panel {
  @apply border-b space-x-3 border-gray-100 font-320 w-full 
  grid py-3 grid-cols-[10px,55px,max-content] hover:(bg-[#e5e5e5]);
}

.close-button {
  transform: translateX(-20px);
  @apply cursor-pointer font-mono h-full opacity-0 px-2 pt-3
    transition text-gray-500 -translate-x-5 items-baseline block;
}

.user-panel:hover .close-button {
  transform: translateX(0);
  @apply opacity-100;
}

input[type="radio"]:checked ~ .user-panel {
  @apply bg-[#e5e5e5];
}
</style>