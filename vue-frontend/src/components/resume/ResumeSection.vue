<template>
    <section class="resumeSection">
        <h1>{{ header }}</h1>
        <slot>This will be displayed if no content is inserted!</slot>
    </section>
</template>

<script>
export default {
  name: "resumeSection",
  props: ["header"]
};
</script>

<style lang="scss">

.resumeSection {
    display: flex;
    flex-wrap: wrap;

    h1 {
        width: 100%;
        text-transform: uppercase;
    }
}

</style>