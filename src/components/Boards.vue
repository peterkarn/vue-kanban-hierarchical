<template>
  <div>
    <span>Boards </span>
    <button @click="addBoard">Add Board</button>
    <ul>
      <li v-for="(board, i) in boards" :key="board">
        <board :properBoard="i"></board>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Board from "../components/Board.vue";

export default {
  props: {},
  components: { Board },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard");
    },
    ...mapActions(["addBoard"]),
  },
  computed: {
    ...mapState({ boards: (state) => state.boards }),
  },
};
</script>
