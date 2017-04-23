<template>
  <div>
    <md-whiteframe v-if="citiesReady" md-elevation="3" class="city-picker-container">
      <md-list class="md-double-line" >
        <md-subheader>Choose the city:</md-subheader>

        <md-list-item v-for="city in cities" @click.native="cityClicked(city.zip)" :key="city.zip" :class="[city.zip === picked ? 'city-picked' : '', 'city-item']">
          <md-avatar >
            <img :src="city.thumbnail" :alt="city.name">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ city.name }}</span>
            <span>{{ city.state }}, {{ city.zip }}</span>
          </div>
          <md-button v-if="isCitySelected(city.zip)" class="md-icon-button md-list-action">
            <md-icon class="md-primary">done</md-icon>
          </md-button>

        </md-list-item>
      </md-list>
      <md-button :href="'#/weather/' + picked" :disabled="!picked" class="md-raised md-primary">Show Weather</md-button>
    </md-whiteframe>
    <md-spinner v-if="loading" md-indeterminate></md-spinner>
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
    picked: null,
    selected: null,
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchCities();
  },
  computed: {
    citiesReady() {
      return !this.loading && !this.error && this.cities.length > 0;
    },
  },
  methods: {
    cityClicked(zip) {
      this.picked = zip;
    },
    isCitySelected(zip) {
      return (this.$route.params && this.$route.params.zip &&
        Number(this.$route.params.zip) === zip);
    },
    fetchCities() {
      this.error = null;
      this.loading = true;
      axios.get('//localhost:3000/cities')
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

.city-item {
  cursor: pointer;
}
.city-picked {
  background: rgba(0,0,0,0.15);
}
.city-item:hover {
  background: rgba(0,0,0,0.05);
}
.city-picker-container {
  min-height: 100px;
}
</style>
