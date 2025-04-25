<template>
  <div :class="STATICS.styles.wrapper">
    <Header />
    <div :class="STATICS.styles.inner">
      <div ref="messages" :class="STATICS.styles.messageContainer">
        <div v-for="(message, index) in gPiniaChatHistory" :class="METHODS.getMessageClass(message.role)" :key="index">
          <img :class="STATICS.styles.image" :src="METHODS.getImageSrc(message.role)" />
          <div v-html="METHODS.getFormattedMessage(message.content)" :class="STATICS.styles.messageContent" />
        </div>
        <div v-if="DATA.isGettingReply" :class="[METHODS.getMessageClass('ai'), 'w-[80%] max-w-md']">
          <img :class="STATICS.styles.image" :src="METHODS.getImageSrc('ai')" />
          <div :class="[STATICS.styles.messageContent, 'w-full animate-pulse']">
            <div class="w-full h-2 rounded bg-gray-500" />
            <div class="w-full h-2 rounded bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
    <ChatInput :error="DATA.error" :is-loading="DATA.isLoading" @submit="METHODS.onClickSubmit" />
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { marked } from 'marked';
  import { storeToRefs } from 'pinia';
  import { useChatStore } from '../pinia/chat';
  import { useUserStore } from '../pinia/user';
  import { useRouter } from 'vue-router';
  import { nextTick, onMounted, reactive, useTemplateRef, watch } from 'vue';
  import Header from '../components/Header.vue';
  import ChatInput from '../components/ChatInput.vue';
  import RobotImage from '../assets/robot.png';
  import UserImage from '../assets/user.png';

  // COMPOSABLES
  const CHAT_STORE = useChatStore();
  const ROUTER = useRouter();
  const USER_STORE = useUserStore();

  // PINIA
  const { aPiniaGetChatHistory, aPiniaSendMessage } = CHAT_STORE;
  const { gPiniaChatHistory } = storeToRefs(CHAT_STORE);
  const { gPiniaUser } = storeToRefs(USER_STORE);

  // REFS
  const REF_MESSAGES = useTemplateRef('messages');

  // DATA
  const DATA = reactive({
    chatInput: '',
    error: '',
    isGettingReply: false,
    isLoading: false
  });

  //STATICS
  const STATICS = {
    styles: {
      image: 'h-6 w-6',
      inner: [
        'overflow-y-auto ',
        '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100',
        '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300',
        'dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
      ],
      messageBase: 'flex gap-2 rounded-lg p-4 max-w-xl',
      messageContainer: ['flex flex-col gap-4 max-w-4xl mx-auto p-4'],
      messageContent: 'flex flex-col gap-y-4 [&>pre]:!whitespace-pre-wrap',
      messageByRole: {
        ai: 'mr-auto bg-gray-700',
        user: 'ml-auto bg-blue-500 flex-row-reverse'
      },
      wrapper: 'flex flex-col h-screen bg-gray-900 text-white'
    }
  };

  // LOCAL TYPES
  type Role = keyof typeof STATICS.styles.messageByRole;

  // METHODS
  const METHODS = {
    // Format message content that may have markdown
    getFormattedMessage(message: string) {
      return marked.parse(message);
    },

    getImageSrc(role: Role) {
      return role === 'ai' ? RobotImage : UserImage;
    },

    getMessageClass(role: Role) {
      return [STATICS.styles.messageBase, STATICS.styles.messageByRole[role]];
    },

    onClickSubmit(inputMessage: string) {
      // Make a local copy of input message to allow for clearing of input
      const MESSAGE_COPY = String(inputMessage.trim());

      DATA.error = '';

      if (!MESSAGE_COPY || !gPiniaUser.value?.userId) {
        return;
      } else {
        DATA.isGettingReply = true;
        DATA.isLoading = true;

        aPiniaSendMessage(MESSAGE_COPY)
          .then(() => {})
          .catch((error) => {
            DATA.error = error;
          })
          .finally(() => {
            DATA.isGettingReply = false;
            DATA.isLoading = false;
          });
      }
    }
  };

  // Lifecycle
  onMounted(() => {
    // If no userId, return to home page
    if (!gPiniaUser.value.userId) {
      ROUTER.push('/');
    }
    // Else, get chat history
    else {
      const REQUEST_PARAMS = {
        userId: gPiniaUser.value?.userId
      };
      DATA.isLoading = true;

      aPiniaGetChatHistory(REQUEST_PARAMS)
        .catch((error) => {
          DATA.error = error;
        })
        .finally(() => {
          DATA.isLoading = false;
        });
    }
  });

  watch(gPiniaChatHistory, () => {
    nextTick(() => {
      REF_MESSAGES?.value?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  });
</script>
