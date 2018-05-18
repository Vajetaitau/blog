<template>
    <div>
        <label v-uni-for="'input'">{{ label }}</label>
        <input v-uni-id="'input'" :value="value" v-on:input="updateValue($event.target.value)">
    </div>
</template>

<script>
export default {
  name: "labelAndInput",
  props: ["label", "value"],
  data() {
    return {
      updateValue(value) {
        this.$emit("update:value", value);
      }
    };
  }
};
</script>

<style lang="scss">

</style>