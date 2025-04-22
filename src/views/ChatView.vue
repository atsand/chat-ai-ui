<template>
  <div :class="STATICS.styles.wrapper">
    <Header />
    <div :class="STATICS.styles.messageContainer">
      <div v-for="message in gPiniaChatHistory" :class="METHODS.getMessageClass(message.role)" :key="message">
        <img :class="STATICS.styles.image" :src="METHODS.getImageSrc(message.role)" />
        <div v-html="METHODS.getFormattedMessage(message.content)" :class="STATICS.styles.messageContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { marked } from 'marked';
  import { useChatStore } from '../pinia/chat';
  import { useUserStore } from '../pinia/user';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { onMounted, reactive } from 'vue';
  import Header from '../components/Header.vue';
  import RobotImage from '../assets/robot.png';
  import UserImage from '../assets/user.png';

  // COMPOSABLES
  const CHAT_STORE = useChatStore();
  const ROUTER = useRouter();
  const USER_STORE = useUserStore();

  // PINIA
  const { aPiniaGetChatHistory } = CHAT_STORE;
  const { gPiniaChatHistory } = storeToRefs(CHAT_STORE);
  const { gPiniaUser } = storeToRefs(USER_STORE);

  // DATA
  const DATA = reactive({
    error: '',
    isLoading: false
  });

  //STATICS
  const STATICS = {
    styles: {
      image: 'h-6 w-6',
      messageBase: 'flex gap-2 rounded-lg p-4 max-w-full lg:max-w-[80%]',
      messageContainer: 'flex flex-col gap-4 overflow-y-auto w-full mx-auto py-4 px-8 lg:px-16',
      messageContent: 'flex flex-col gap-y-4 [&>code]:whitespace-pre-wrap',
      messageByRole: {
        ai: 'mr-auto bg-gray-700',
        user: 'ml-auto bg-blue-500 flex-row-reverse'
      },
      wrapper: 'flex flex-col h-screen bg-gray-900 text-white'
    }
  };

  // METHODS
  const METHODS = {
    getFormattedMessage(message) {
      return marked.parse(message);
    },

    getImageSrc(role) {
      return role === 'ai' ? RobotImage : UserImage;
    },

    getMessageClass(role) {
      return [STATICS.styles.messageBase, STATICS.styles.messageByRole[role]];
    }
  };

  // Lifecycle
  onMounted(() => {
    if (!gPiniaUser.value.userId) {
      ROUTER.push('/');
    } else {
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
</script>
