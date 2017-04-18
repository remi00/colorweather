import Vue from 'vue';
import Router from 'vue-router';
import CitiesPicker from '@/components/CitiesPicker';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: CitiesPicker,
    },
  ],
});
