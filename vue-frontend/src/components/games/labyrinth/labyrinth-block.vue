<template>
    <div :class="{
        block: true,
        topWall: this.topWall,
        leftWall: this.leftWall,
        grey: true
      }">
        X
    </div>
</template>

<script>
export default {
  name: "labyrinth-block",
  props: ["topWall", "leftWall"]
};
</script>

<style lang="scss">
.block {
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 10px;
  text-align: center;
  vertical-align: baseline;
  background-color: red;
}

.topWall {
  border-top: 3px solid black;
}

.leftWall {
  border-left: 3px solid black;
}

.grey {
  background-color: grey;
}
</style>