<template>
  <div id="app">
    <Navigation />

    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import LabelAndInput from "./components/LabelAndInput.vue";
import LabelAndValue from "./components/LabelAndValue.vue";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js Appxxxxxxxx"
    };
  },
  components: {
    Navigation,
    LabelAndInput
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
