<template>
    <div>
        <span>{{ label }}</span>
        <span>{{ value }}</span>
    </div>
</template>

<script>
export default {
  name: "labelAndInput",
  props: ["label", "value"]
};
</script>

<style lang="scss">
</style>