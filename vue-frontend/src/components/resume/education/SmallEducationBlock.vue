<template>
    <div v-uni-id="'smallEducationBlock'" class="smallEducationBlock">
        <h2>{{ title }}</h2>
        <div class="description">{{ description }}</div>
        <div class="timePeriod">{{ timePeriod }}</div>
        <div class="location">{{ location }}</div>
    </div>
</template>

<script>
export default {
  name: "smallEducationBlock",
  props: ["title", "description", "timePeriod", "location"]
};
</script>

<style lang="scss">

.smallEducationBlock {
    flex-grow: 1;
    width: 33%;

    .description {
        text-transform: uppercase;
    }

    .timePeriod {
        text-transform: uppercase;
    }

    .location {
        text-transform: uppercase;
    }
}

</style>