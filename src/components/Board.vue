<template>
  <div class="board-single">
    <router-link class="link board-single__link" to="/"
      >Back to boards list</router-link
    >
    <br />
    <button class="btn btn_primary" @click="showModal">Add column</button>
    <ul class="columns">
      <li
        class="columns__item item"
        v-for="(column, i) in properBoardColumns"
        :key="column.id"
      >
        <div>
          <h2 class="item__title">
            {{ properBoardColumns[i].title }}
          </h2>
        </div>
        <column :properBoard="properBoard" :properColumn="i"></column>
      </li>
    </ul>
    <popup
      v-if="isPopupVisible"
      btnName="Add Column"
      modalTitle="Add new column"
      @closePopup="closePopup"
      @confirmEdit="addColumnTo"
    >
      <span>Column title</span>
      <input type="text" v-model="newColumn.columnTitle" />
    </popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Column from "./Column.vue";
import Popup from "./Popup.vue";

export default {
  data() {
    return {
      isPopupVisible: false,
      newColumn: {
        columnTitle: "",
        columnBoard: this.properBoard,
      },
    };
  },
  props: {
    properBoard: String,
    slug: String,
  },
  components: {
    Column,
    Popup,
  },
  methods: {
    showModal() {
      this.isPopupVisible = true;
    },
    addColumnTo() {
      this.$store.dispatch("addColumn", this.newColumn);
      this.closePopup();
    },
    closePopup() {
      this.newColumn.columnSlug = "";
      this.isPopupVisible = false;
    },
    ...mapActions(["addColumn"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properBoardColumns() {
      return this.$store.state.boards.find(
        (b) => b.slug === this.$route.params.slug
      ).columns; // достаю по slug но все равно error
    },
  },
};
</script>
<style lang="scss">
.board-single {
  padding: 30px;

  &__link {
    display: inline-block;
    margin-bottom: 20px;
  }
}

.columns {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: start;
  gap: 30px;

  &__item {
    background-color: #e8d0b3;
  }
}

.item {
  padding: 30px;
  min-height: 200px;
  &__title {
    margin-bottom: 0.5em;
    @include truncate(2, 20px);
  }
  &__body {
    min-height: 200px;
  }
}
</style>
