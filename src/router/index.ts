import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '../views/ChatView.vue';
import HomeView from '../views/HomeView.vue';

const ROUTES = [
  {
    component: HomeView,
    path: '/'
  },
  {
    component: ChatView,
    path: '/chat'
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES
})