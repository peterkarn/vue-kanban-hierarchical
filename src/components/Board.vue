<template>
  <div>
    <span>board-component </span>
    <button @click="addColumnTo(properBoard)">Add column</button>
    <ul>
      <li v-for="(column, i) in properBoardColumns" :key="column.id">
        <column :properBoard="properBoard" :properColumn="i"></column>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Column from "./Column.vue";

export default {
  props: {
    properBoard: Number,
  },
  components: {
    Column,
  },
  methods: {
    addColumnTo(properBoard) {
      this.$store.dispatch("addColumn", properBoard);
    },
    ...mapActions(["addColumn"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properBoardColumns() {
      return this.$store.state.boards[this.properBoard].columns;
    },
  },
};
</script>
