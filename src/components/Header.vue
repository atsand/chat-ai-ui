<template>
  <div :class="STATICS.styles.wrapper">
    <img :class="STATICS.styles.image" :src="RobotImage" />
    <h1>Chat AI</h1>
    <button :class="STATICS.styles.logoutButton" @click="METHODS.onClickLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { useUserStore } from '../pinia/user';
  import { useRouter } from 'vue-router';
  import RobotImage from '../assets/robot.png';

  // COMPOSABLES
  const ROUTER = useRouter();
  const USER_STORE = useUserStore();

  // PINIA
  const { logout } = USER_STORE;

  // STATICS
  const STATICS = {
    styles: {
      h1: 'text-lg font-semibold',
      image: 'w-8 h-8',
      logoutButton: 'text-gray-400 cursor-pointer hover:text-white',
      wrapper: 'py-4 px-6 bg-gray-800 shadow-md flex justify-between items-center'
    }
  };

  // METHODS
  const METHODS = {
    onClickLogout() {
      logout();

      ROUTER.push('/');
    }
  };
</script>
