<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">ColorWeather</h1>
      <h1></h1>
    </md-toolbar>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex="30">
        <cities-picker class="city-select"></cities-picker>
      </md-layout>
      <transition name="fade">
        <md-layout md-flex="30" v-if="$route.params.zip">
          <router-view class="contents"></router-view>
        </md-layout>
      </transition>
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
  margin: 20px;
}
.contents {
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>

