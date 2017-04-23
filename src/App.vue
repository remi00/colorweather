<template>
  <div id="app">
    <md-toolbar class="toolbar">
      <h1 class="md-title">ColorWeather</h1>
    </md-toolbar>
    <md-layout md-gutter="16" md-align="center">
      <md-layout md-flex="25" md-flex-small="30" md-flex-xsmall="90">
        <cities-picker class="city-select"></cities-picker>
      </md-layout>
      <md-layout md-flex="50" md-flex-small="60" md-flex-xsmall="90" v-if="$route.params.zip">
        <router-view class="contents"></router-view>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import CitiesPicker from './components/CitiesPicker';

export default {
  name: 'app',
  components: {
    CitiesPicker,
  },
};
</script>

<style scoped>
.city-select {
  width: 100%;
}
.toolbar {
  margin-bottom: 16px;
}
.contents {
  width: 100%;
}
</style>

