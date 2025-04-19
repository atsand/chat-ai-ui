<template>
  <div :class="STATICS.styles.wrapper">
    <div :class="STATICS.styles.container">
      <img :src="RobotImage" :class="[STATICS.styles.image, { 'animate-bounce': DATA.isLoading }]" alt="robot image" />
      <h1 :class="STATICS.styles.h1">Welcome To Chat AI</h1>
      <input
        v-model="DATA.name"
        :class="STATICS.styles.input"
        placeholder="Name"
        type="text"
        @keyup.enter="METHODS.createUser"
      />
      <input
        v-model="DATA.email"
        :class="STATICS.styles.input"
        placeholder="Email"
        type="text"
        @keyup.enter="METHODS.createUser"
      />
      <button
        :class="STATICS.styles.submitButton"
        type="button"
        :disabled="DATA.isLoading"
        @click="METHODS.onClickSubmit"
      >
        {{ DATA.isLoading ? 'Logging In...' : 'Start Chat' }}
      </button>
      <p v-if="DATA.error" :class="STATICS.styles.error">{{ DATA.error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../pinia/user';
  import { reactive } from 'vue';
  import axios from 'axios';
  import RobotImage from '../assets/robot.png';

  // Composables
  const ROUTER = useRouter();
  const USER_STORE = useUserStore();

  // PINIA
  const { setUser } = USER_STORE;

  // DATA
  const DATA = reactive({
    isLoading: false,
    email: null,
    error: '',
    name: null
  });

  // STATICS
  const STATICS = {
    styles: {
      container: 'p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md',
      error: 'text-red-400 text-center mt-2',
      h1: 'text-2xl font-semibold mb-4 text-center',
      image: 'mx-auto w-24 h-24 mb-4',
      input: 'w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none',
      submitButton: 'w-full p-2 bg-blue-500 rounded-lg cursor-pointer',
      wrapper: 'h-screen flex items-center justify-center bg-gray-900 text-white'
    }
  };

  // METHODS
  const METHODS = {
    onClickSubmit: async () => {
      if (!DATA.name || !DATA.email) {
        DATA.error = 'Name and email are required';
      } else {
        DATA.error = '';
        DATA.isLoading = true;

        try {
          const REQUEST_PARAMS = {
            email: DATA.email,
            name: DATA.name
          };
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/register-user`, REQUEST_PARAMS);

          setUser(data);

          ROUTER.push('/chat');
        } catch (error) {
          DATA.error = 'Something went wrong, please try again';
        } finally {
          DATA.isLoading = false;
        }
      }
    }
  };
</script>
