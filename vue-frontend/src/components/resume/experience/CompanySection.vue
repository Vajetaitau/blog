<template>
    <div class="companySection">
        <h2 class="name">{{ name }}</h2>
        <div class="timePeriod">{{ timePeriod }}</div>
        <div class="location">{{ location }}</div>
        <div class="projects">
            Projects: 
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
  name: "companySection",
  props: ["name", "timePeriod", "location"]
};
</script>

<style lang="scss">
.companySection {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    .name {
        text-transform: uppercase;
    }

    .projects {
        width: 100%;
    }
}
</style>