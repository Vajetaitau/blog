<template>
  <nav id="navigation">
    <a :key="index" v-for="(menuItem, index) in menuItems" href="xasd">
      {{ menuItem.name }}
    </a>
  </nav>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      menuItems: [
        { name: "First link" },
        { name: "Secaaaa link" }
      ]
    };
  }
};
</script>

<style lang="scss">
h1,
h2 {
  font-weight: normal;
}
</style>


