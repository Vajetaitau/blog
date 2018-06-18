<template>
    <div>
        <span>{{ name }}</span>
        <span>{{ role }}</span>
        <span>{{ url }}</span>
        <span>{{ timePeriod }}</span>
        <span>{{ description }}</span>
    </div>
</template>

<script>
export default {
  name: "labelAndInput",
  props: ["name", "role", "url", "timePeriod", "description"]
};
</script>

<style lang="scss">
</style>