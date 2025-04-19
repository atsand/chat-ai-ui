<template>
  <div :class="STATICS.styles.wrapper">
    <Header />
  </div>
</template>

<script setup lang="ts">
  // IMPORTS
  import { useUserStore } from '../pinia/user';
  import { storeToRefs } from 'pinia';
  import Header from '../components/Header.vue';

  // COMPOSABLES
  const USER_STORE = useUserStore();

  // PINIA
  const { getUser } = storeToRefs(USER_STORE);

  //STATICS
  const STATICS = {
    styles: {
      wrapper: 'flex flex-col h-screen bg-gray-900 text-white'
    }
  };
</script>
