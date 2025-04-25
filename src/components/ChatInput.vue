<template>
  <div :class="[STATICS.styles.chatInputWrapper, { 'mx-auto mb-auto max-w-2xl': !gPiniaChatHistory.length }]">
    <div :class="STATICS.styles.chatInputInner">
      <div class="flex gap-4 w-full">
        <input
          v-model="DATA.chatInput"
          :class="STATICS.styles.chatInput"
          :placeholder="gPiniaChatHistory.length ? 'Reply to Chat AI...' : 'How can Chat AI help you?'"
          type="text"
          @keyup.enter="METHODS.onClickSubmit"
        />
        <button
          :class="STATICS.styles.submitButton"
          :disabled="PROPS.isLoading || !DATA.chatInput"
          type="button"
          @click="METHODS.onClickSubmit"
        >
          Submit
        </button>
      </div>
      <div v-if="PROPS.error" :class="STATICS.styles.error">{{ PROPS.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { storeToRefs } from 'pinia';
  import { useChatStore } from '../pinia/chat';
  import { reactive } from 'vue';

  // COMPOSABLES
  const CHAT_STORE = useChatStore();

  // PINIA
  const { gPiniaChatHistory } = storeToRefs(CHAT_STORE);

  // PROPS
  const PROPS = defineProps({
    error: {
      default: '',
      type: String
    },
    isLoading: {
      default: false,
      type: Boolean
    }
  });

  // EMITS
  const EMIT = defineEmits(['submit']);

  const DATA = reactive({
    chatInput: ''
  });

  // STATICS
  const STATICS = {
    styles: {
      chatInput: 'w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none',
      chatInputInner: 'flex flex-col gap-2 p-4 my-4 mx-auto w-full rounded-lg bg-gray-800 max-w-4xl',
      chatInputWrapper: 'w-full px-4 mt-auto',
      error: 'text-red-400 text-sm text-center',
      submitButton: 'rounded-lg p-2 bg-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500'
    }
  };

  // METHODS
  const METHODS = {
    onClickSubmit() {
      if (!PROPS.isLoading && DATA.chatInput) {
        EMIT('submit', DATA.chatInput);

        DATA.chatInput = '';
      }
    }
  };
</script>
