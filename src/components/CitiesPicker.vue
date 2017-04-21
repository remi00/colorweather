<template>
  <div>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex-xsmall="95" md-flex-small="90" md-flex-medium="75" md-flex-large="50" md-flex-xlarge="40">
        <md-whiteframe md-elevation="3" class="city-select">
          <md-list v-if="citiesReady" class="md-double-line">
            <md-subheader>Choose the city:</md-subheader>

            <md-list-item v-for="city in cities" :href="'#/weather/' + city.zip" :key="city.zip">
              <md-avatar>
                <img :src="city.thumbnail" :alt="city.name">
              </md-avatar>

              <div class="md-list-text-container">
                <span>{{ city.name }}</span>
                <span>{{ city.state }}, {{ city.zip }}</span>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chevron_right</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </md-whiteframe>
        <md-spinner v-if="loading" md-indeterminate></md-spinner>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'cities-picker',
  data: () => ({
    cities: [],
    loading: false,
    error: null,
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchCities();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchCities',
  },
  computed: {
    citiesReady() {
      return !this.loading && !this.error && this.cities.length > 0;
    },
  },
  methods: {
    fetchCities() {
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

.city-select {
  width: 100%;
  margin: 20px;
}

</style>
