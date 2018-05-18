<template>
  <div id="app">
    <Navigation />

    <LabelAndInput label="Username" :value.sync="msg"/>
    <LabelAndInput label="Password" />

    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import LabelAndInput from "./components/LabelAndInput.vue";

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
