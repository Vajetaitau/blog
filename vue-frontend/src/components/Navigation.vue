<template>
  <nav id="navigation">
    <router-link :to="menuItem.to" :key="index" v-for="(menuItem, index) in menuItems">{{ menuItem.name }}</router-link>
  </nav>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      menuItems: [
        { name: "Resume", to: "/foo" },
        { name: "Games", to: "/bar" }
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


