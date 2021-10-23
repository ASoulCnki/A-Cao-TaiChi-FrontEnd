<script lang="ts" setup>
import ChatMessage from './message/ChatMessage.vue'
import ChatUser from './user/ChatUser.vue'

import { shallowRef, ref, watch, onMounted, computed, unref } from 'vue'
import { onKeyUp, useEventListener } from '@vueuse/core'
import { getReply } from '../api/local/index'

type ChatMessageType = {
  message: string
  time: string | number
  isMe: boolean
}

const message = shallowRef<string>('')
const chatHistory = shallowRef<ChatMessageType[]>([])
const chatNow = ref<ChatMessageType[]>([])

const textLength = computed(() => message.value.length)
const chat = ref<HTMLElement>()
const time = ref<string>()

const sendMessage = () => {
  const content = unref(message)

  if (content.trim().length == 0) {
    return
  }

  chatNow.value.push({
    message: content,
    time: Date.parse(new Date().toString()),
    isMe: true
  })

  setTimeout(() => {
    chatNow.value.push({
      message: getReply(content),
      time: Date.parse(new Date().toString()),
      isMe: false
    })
  }, 1000)

  message.value = ''
}

watch(chatNow.value, () => {
  setTimeout(() => chat.value!.scrollTop = chat.value!.scrollHeight, 0)
})

onKeyUp('Enter', () => sendMessage())

onMounted(() => {
  const t = new Date()
  time.value = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`
})

// useEventListener('beforeunload', () => {
//   const data = [...chatHistory.value, ...chatNow.value]
//   localStorage.setItem('history', JSON.stringify(data))
// })

// onMounted(() => {
//   const data = JSON.parse(localStorage.getItem('history') || '[]')
//   chatHistory.value = data
//   setTimeout(() => chat.value!.scrollTop = chat.value!.scrollHeight, 0)
// })
</script>

<template>
  <div class="mx-auto space-y-2 pt-20px w-880px">
    <div
      class="bg-white rounded-md flex h-42px w-full p-2 px-4 text-gray-500 justify-between"
    >
      <span>我的消息</span>
      <span class="cursor-pointer">应援团助手</span>
    </div>
    <div
      class="bg-white border rounded-md flex border-gray-100 shadow-md my-4 chat-box overflow-hidden"
    >
      <div class="bg-white border-r border-gray-300 min-h-[600px] w-240px">
        <div
          class="border-b border-gray-300 h-33px text-sm py-5px px-3 text-gray-600"
        >近期消息</div>
        <ChatUser :name="'阿草 Bot'" :description="'非官方 仅供娱乐'" />
      </div>
      <div class="h-auto bg-[#f5f5f5] right w-640px">
        <div
          class="bg-white border-b border-gray-300 text-center w-full py-1"
        >阿草 Bot</div>
        <div
          class="bg-[#f5f5f5] h-400px w-full pt-5 overflow-y-scroll message-list"
          ref="chat"
        >
          <ChatMessage
            v-for="i in chatHistory"
            :key="i.time"
            :is-me="i.isMe"
            :message="i.message"
          />
          <div
            class="font-400 text-center text-xs py-3 text-gray-400"
          >{{ time }}</div>
          <ChatMessage
            v-for="i in chatNow"
            :key="i.time"
            :is-me="i.isMe"
            :message="i.message"
          />
        </div>

        <div class="flex flex-col border-gray-300 border-t-1 flex-1 w-full">
          <div class="flex space-x-3 h-32px w-full p-2 px-4">
            <img
              v-for="i in ['img', 'emoji']"
              class="cursor-pointer h-22px mt-2px text-gray-300 w-22px"
              :src="`../assets/images/${i}.svg`"
            />
          </div>
          <textarea v-model="message" maxlength="500" class="text-area"></textarea>
          <div class="space-x-2 p-2 pt-0 bottom-2" style="direction: rtl;">
            <span @click="sendMessage" class="send-botton">发送</span>
            <span class="text-xs px-2 text-gray-400">{{ textLength }}/500</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  @apply w-full pb-100px;
}
.message-list::after {
  content: "仅供娱乐，请勿当真";
  transform: translateX(-50%);
  @apply font-bold text-black opacity-30 pb-16 top-1/6
    left-1/2 text-2xl relative inline-block;
}

.text-area {
  @apply outline-none bg-[#f5f5f5] h-140px text-sm leading-relaxed 
    tracking-wider w-full p-1 px-2 text-gray-600 resize-none;
}

.send-botton {
  @apply rounded-md cursor-pointer outline-none bg-[#1389bf]
     h-28px text-white text-sm text-center
    pt-1 w-86px inline-block
    hover:(bg-[#2FAEE3]);
}

.send-button::disabled {
  @apply bg-white;
}
</style>
