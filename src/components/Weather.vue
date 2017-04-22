<template>
  <div>
    <md-layout md-flex="30">
      <md-whiteframe class="weather" md-elevation="3">
        <md-card v-if="weatherReady">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ city.name }}, {{ city.state }}</div>
              <div class="md-subhead">{{ weather.item.title }}</div>
            </md-card-header-text>

            <md-menu md-size="4" md-direction="bottom left">
              <md-button class="md-icon-button" md-menu-trigger href="/#/">
                <md-icon>close</md-icon>
              </md-button>
            </md-menu>
          </md-card-header>

          <md-card-content>
            <img :src="'/static/conditions/' + weather.item.condition.code + '.svg'" :alt="weather.item.condition.text">
            <div class="md-title">{{ weather.item.condition.temp }} &deg;{{ weather.units.temperature }}</div>
            <div class="md-subhead">{{ weather.item.condition.text }}</div>
            <ul>
              <li>Sunrise: <strong>{{ weather.astronomy.sunrise }}</strong>  Sunset: <strong>{{ weather.astronomy.sunset }}</strong></li>
              <li>Last update: {{ weather.lastBuildDate }}</li>
              <li>Humidity: {{ weather.atmosphere.humidity }}%</li>
              <li>Pressure: {{ weather.atmosphere.pressure }} {{ weather.units.pressure }}</li>
              <li>Visibility: {{ weather.atmosphere.visibility }} {{ weather.units.distance }}</li>
            </ul>
          </md-card-content>

          <md-card-media>
            <img :src="city.thumbnail" :alt="weather.description">
          </md-card-media>

          <md-card-content>
            <h3 class="md-subheading">Forecast</h3>
            <div class="forecast">
              <li v-for="forecast in weather.item.forecast">
                {{ forecast.day }}, {{ forecast.date }}:
                <img height="30" width="30" :src="'/static/conditions/' + forecast.code + '.svg'" :alt="forecast.text">
                <strong>{{ forecast.text }}</strong> {{ forecast.high }} / {{ forecast.low }} &deg;{{ weather.units.temperature }}
              </li>
            </div>
          </md-card-content>

        </md-card>

      </md-whiteframe>
      <md-spinner v-if="loading" md-indeterminate></md-spinner>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'weather',
  data: () => ({
    loading: true,
    error: null,
    weather: null,
    city: null,
  }),
  created() {
    if (this.$route.params && this.$route.params.zip) {
      this.fetchWeather();
    }
  },
  computed: {
    weatherReady() {
      return !this.loading && !this.error && this.weather && this.city;
    },
  },
  watch: {
    '$route.params': 'fetchWeather',
  },
  methods: {
    async fetchWeather() {
      this.error = null;
      this.loading = true;
      try {
        const [city, weather] = await Promise.all([
          axios.get(`//localhost:3000/cities/${this.$route.params.zip}`),
          axios.get(`//localhost:3000/weather/${this.$route.params.zip}`)]);
        this.loading = false;

        if (!city || !city.data) {
          throw new Error('Error retrieving city information');
        }
        this.city = city.data;
        console.info(this.city);

        if (!weather || !weather.data) {
          throw new Error('Error retrieving weather');
        }
        this.weather = weather.data;
        console.info(this.weather);
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
    },
  },
};
</script>

<style scoped>

.weather {
  width: 100%;
  margin: 20px;
}

</style>
