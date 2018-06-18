<template>
  <div class="labyrinth">
    <div class="row" :key="rowIndex" v-for="(row, rowIndex) in labyrinthBlocks">
      <div class="column" :key="colIndex" v-for="(block, colIndex) in row">
        <labyrinth-block :topWall="block.top" :leftWall="block.left" />
      </div>
    </div>
  </div>
</template>

<script>
import LabyrinthService from "../../../services/labyrinth/labyrinth-service";
import LabyrinthBlock from "./labyrinth-block.vue";

export default {
  name: "labyrinth",
  props: [],
  data() {
    return {
      labyrinthBlocks: []
    };
  },
  created() {
    let self = this;
    self.getLabyrinth().then(function(response) {
      self.labyrinthBlocks = response;
    });
  },
  methods: {
    getLabyrinth: LabyrinthService.getLabyrinth
  },
  components: {
    "labyrinth-block": LabyrinthBlock
  }
};
</script>

<style lang="scss">
.labyrinth {
  display: flex;
  flex-direction: column;
  width: 400px;

  .row {
    flex: 1;
    display: flex;

    .column {
      flex: 1;
    }
  }
}
</style>