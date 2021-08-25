<template>
  <div>
    <router-link to="/">Back to boards list</router-link> <br />
    <button @click="addColumnTo">Add column</button>
    <ul class="boards-list">
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
  // data() {
  //   // return {
  //   //   properBoard: this.$route.params.properBoard,
  //   // };
  // },
  props: {
    properBoard: String,
    slug: Number,
  },
  components: {
    Column,
  },
  methods: {
    addColumnTo() {
      this.$store.dispatch("addColumn", this.properBoard);
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
<style lang="scss">
.boards-list {
  display: flex;
  gap: 20px;
  li {
    display: block;
  }
}
</style>
