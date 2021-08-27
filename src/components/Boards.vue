<template>
  <div>
    <button class="btn btn_primary" @click="showModal">Add Board</button>
    <ul class="boards-list">
      <li class="boards-list__item" v-for="(board, i) in boards" :key="board">
        <h2 class="boards-list__title">
          <router-link
            :to="{
              name: 'board',
              params: { slug: board.slug, properBoard: i },
            }"
            >{{ board.slug }}
          </router-link>
        </h2>
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
<style lang="scss">
.boards-list {
  display: grid;
  gap: 10px;
  padding: 30px;
  background-color: #e8d0b3;
  list-style: none;

  &__item {
    background-color: #c36839;
    color: #fff;
    transition: transform 0.1s;
    &:hover {
      transform: scale(0.99);
    }
    &:active {
      background-color: #99512d;
    }
    a {
      padding: 20px;
      display: block;
    }
  }
}
</style>
