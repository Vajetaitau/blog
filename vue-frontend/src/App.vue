<template>
  <div id="app">
    <Navigation />

    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js Appxxxxxxxx"
    };
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
