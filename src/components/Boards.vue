<template>
  <div class="boards">
    <button class="btn btn_primary" @click="showModal">add board</button>
    <ul class="boards-list">
      <li class="boards-list__item" v-for="board in boards" :key="board">
        <h2 class="boards-list__title">
          <router-link
            :to="{
              name: 'board',
              params: { slug: board.slug },
            }"
            >{{ board.title }}
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
        <span>Enter board name</span>
        <input type="text" @input="trimmed" />
      </label>
    </popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Popup from "../components/Popup.vue";

export default {
  data() {
    return {
      isPopupVisible: false,
      newBoard: {
        boardTitle: "",
        boardSlug: "",
      },
    };
  },
  components: { Popup },
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
    trimmed(e) {
      this.newBoard.boardTitle = e.target.value;
      this.newBoard.boardSlug = e.target.value
        .replace(/\s+/g, "-")
        .toLowerCase();
    },
  },
  computed: {
    ...mapState({ boards: (state) => state.boards }),
  },
};
</script>
<style lang="scss">
.boards {
  max-width: 1440px;
  margin: 0 auto;
}
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
