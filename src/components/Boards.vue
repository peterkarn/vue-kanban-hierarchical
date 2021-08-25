<template>
  <div>
    <button @click="showModal">Add Board</button>
    <ul>
      <li v-for="(board, i) in boards" :key="board">
        <router-link
          class="board-link"
          :to="{ name: 'board', params: { slug: board.slug, properBoard: i } }"
          >{{ board.slug }}
        </router-link>
      </li>
    </ul>
    <popup
      v-if="isPopupVisible"
      btnName="Add Board"
      modalTitle="Add your board"
      @closePopup="closePopup"
      @confirmEdit="addBoard"
    >
      <label>
        <span>Board slug</span>
        <input type="text" v-model="newBoard.boardSlug" />
      </label>
    </popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Popup from "../components/Popup.vue";

export default {
  props: {},
  components: { Popup },
  data() {
    return {
      isPopupVisible: false,
      newBoard: {
        boardSlug: "",
      },
    };
  },
  methods: {
    showModal() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.newBoard.boarSlug = "";
      this.isPopupVisible = false;
    },
    addBoard() {
      this.$store.dispatch("addNewBoard", this.newBoard);
      this.closePopup();
    },
    ...mapActions(["addNewBoard"]),
  },
  computed: {
    ...mapState({ boards: (state) => state.boards }),
  },
};
</script>
