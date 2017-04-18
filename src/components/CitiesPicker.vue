<template>
  <div>
    <md-list v-if="citiesReady">
      <md-list-item v-for="city in cities" :href="'#/city/' + city.zip">
        <md-avatar>
          <img src="https://placeimg.com/40/40/tech/8" alt="People">
        </md-avatar>

        <span>{{ city.name }}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">chevron_right</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
    <md-spinner v-if="loading" md-indeterminate></md-spinner>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'weather',
  data: () => ({
    cities: [],
    loading: false,
    error: null,
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  computed: {
    citiesReady() {
      console.log(`citiesReady: ${this.loading} ${this.error} ${this.cities.length}`);
      return !this.loading && !this.error && this.cities.length > 0;
    },
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      axios.get('/static/cities.json')
        .then((res) => {
          this.loading = false;
          if (res && res.data && res.data.length) {
            this.cities = res.data;
          } else {
            throw new Error('Error retrieving cities list');
          }
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<style scoped>

</style>
