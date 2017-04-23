<template>
  <div>
    <md-whiteframe class="weather" md-elevation="3">
      <md-card v-if="weatherReady">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ city.name }}, {{ city.state }}</div>
            <div class="md-subhead">{{ weather.item.title }}</div>
          </md-card-header-text>

          <md-button class="md-icon-button" md-menu-trigger href="/#/">
            <md-icon>close</md-icon>
          </md-button>
        </md-card-header>

        <md-card-media-cover md-text-scrim>
          <md-card-media md-ratio="16:9">
            <img :src="city.thumbnail" :alt="weather.description">
          </md-card-media>

          <md-card-area>
            <md-card-content>
              <div class="weather-block-contents">
                <img :src="'/static/conditions/' + weather.item.condition.code + '.svg'" :alt="weather.item.condition.text" align="left">
              </div>
              <div class="weather-block-contents">
                <div class="md-title">{{ weather.item.condition.temp }}&deg;{{ weather.units.temperature }}, {{ weather.item.condition.text }}</div>
                <div class="md-subheading"><img height="16" width="16" src="/static/humidity.svg"> {{ weather.atmosphere.humidity }}%&nbsp;&nbsp;&nbsp;
                  <img height="16" width="16" src="/static/pressure.svg" alt="Pressure" title="Pressure"> {{ weather.atmosphere.pressure }}{{ weather.units.pressure }}&nbsp;&nbsp;&nbsp;
                  <img height="16" width="16" src="/static/visibility.svg" alt="Visibility" title="Visibility"> {{ weather.atmosphere.visibility }}{{ weather.units.distance }}
                  <br><img height="16" width="16" src="/static/sunrise.svg" alt="Sunrise" title="Sunrise"> {{ weather.astronomy.sunrise }}&nbsp;&nbsp;&nbsp;
                  <img height="16" width="16" src="/static/sunset.svg"alt="Sunset" title="Sunset"> {{ weather.astronomy.sunset }}
                </div>
              </div>
            </md-card-content>
          </md-card-area>
        </md-card-media-cover>
        <md-card-content>
          <h3 class="md-subheading">Forecast</h3>
          <div class="forecast">
            <div class="forecast-item" v-for="forecast in weather.item.forecast.slice(0,5)">
              {{ forecast.day }}, {{ forecast.date | reformatYahooDate }}<br>
              <img height="30" width="30" :src="'/static/conditions/' + forecast.code + '.svg'" :alt="forecast.text" :title="forecast.text"><br>
              {{ forecast.high }}/{{ forecast.low }}&deg;{{ weather.units.temperature }}
            </div>
          </div>
          <div class="forecast">
            <div class="forecast-item" v-for="forecast in weather.item.forecast.slice(5,10)">
              {{ forecast.day }}, {{ forecast.date | reformatYahooDate }}<br>
              <img height="30" width="30" :src="'/static/conditions/' + forecast.code + '.svg'" :alt="forecast.text" :title="forecast.text"><br>
              {{ forecast.high }}/{{ forecast.low }}&deg;{{ weather.units.temperature }}
            </div>
          </div>
          <p class="md-caption">Last update: {{ weather.lastBuildDate }}</p>
        </md-card-content>

      </md-card>

    </md-whiteframe>
    <md-spinner v-if="loading" md-indeterminate></md-spinner>
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

        if (!weather || !weather.data) {
          throw new Error('Error retrieving weather');
        }
        this.weather = weather.data;
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
    },
  },
  filters: {
    reformatYahooDate(yahooDate) {
      const date = new Date(yahooDate);
      return `${date.getMonth()}/${date.getDate()}`;
    },
  },
};
</script>

<style scoped>

.weather {
  width: 100%;
  margin: 20px;
}
.weather-block-contents {
  display: inline-block;
  vertical-align: middle;
}

.forecast {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  align-items: center;
}

.forecast-item {
  text-align:center;
  margin: 5px;
}
</style>
