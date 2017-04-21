<template>
  <div>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex-xsmall="95" md-flex-small="90" md-flex-medium="75" md-flex-large="50" md-flex-xlarge="40">
        <md-whiteframe md-elevation="3" class="city-select">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">City ZIP: {{ $route.params.zip }}</div>
                <div class="md-subhead">Subtitle here</div>
              </md-card-header-text>

              <md-menu md-size="4" md-direction="bottom left">
                <md-button class="md-icon-button" md-menu-trigger>
                  <md-icon>more_vert</md-icon>
                </md-button>

                <md-menu-content>
                  <md-menu-item>
                    <span>Foobar</span>
                    <md-icon>phone</md-icon>
                  </md-menu-item>

                  <md-menu-item>
                    <span>Send a message</span>
                    <md-icon>message</md-icon>
                  </md-menu-item>
                </md-menu-content>
              </md-menu>
            </md-card-header>

            <md-card-media>
              <img src="assets/card-image-1.jpg" alt="People">
            </md-card-media>

            <md-card-content>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </md-card-content>
          </md-card>

        </md-whiteframe>
        <md-spinner v-if="loading" md-indeterminate></md-spinner>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'weather',
  data: () => ({
    loading: false,
    error: null,
  }),
  created() {
  },
  watch: {
    // call again the method if the route changes
    '$route.params': 'fetchWeather',
  },
  methods: {
    fetchWeather() {
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
