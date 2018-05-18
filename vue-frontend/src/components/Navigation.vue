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
#navigation {
  display: flex;
  background-color: black;

  a {
    color: white;
    padding: 12px 24px;
  }
}
</style>


