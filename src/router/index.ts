import CityView from '@/views/CityView.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: CityView,
      meta: {
        title: 'Weather',
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const { city, state } = to.params;
  const locationTitle = `${city}, ${state}`;

  const shouldShowLocationTitle = city && state;
  const metaTitle = to.meta.title;

  const documentTitle = shouldShowLocationTitle ? locationTitle : metaTitle;
  document.title = `${documentTitle} | The Local Weather`;

  next();
});

export default router;
