import Vue from 'vue';
import Router from 'vue-router';
import CitiesPicker from '@/components/CitiesPicker';
import Weather from '@/components/Weather';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cities',
      component: CitiesPicker,
    },
    {
      path: '/weather/:zip',
      name: 'weather',
      component: Weather,
    },
  ],
});
