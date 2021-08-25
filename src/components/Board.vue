<template>
  <div>
    <router-link to="/">Back to boards list</router-link> <br />
    <button @click="showModal">Add column</button>
    <ul class="boards-list">
      <li v-for="(column, i) in properBoardColumns" :key="column.id">
        <div>
          <h2>
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
