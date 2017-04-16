<template>
  <div class="hello">
    <h1>ColorWeather</h1>
    <h2>Choose your city</h2>
    <div class="card">
      <div class="section double-padded"><p>New York</p></div>
      <div class="section dark"><p>Chicago</p></div>
      <div class="section darker"><p>Atlanta</p></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weather',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style scoped>
</style>
