<template>
  <div class="board-single">
    <router-link class="link board-single__link" to="/"
      >Back to boards list</router-link
    >
    <br />
    <button class="btn btn_primary" @click="showModal">Add column</button>
    <ul class="columns">
      <li class="columns__item item" v-for="column in columns" :key="column.id">
        <div>
          <h2 class="item__title">Title: {{ column.title }}</h2>
        </div>
        <column
          :parentBoard="this.$route.params.slug"
          :columnID="column.id"
        ></column>
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
import { mapActions } from "vuex";
import Column from "./Column.vue";
import Popup from "./Popup.vue";

export default {
  data() {
    return {
      isPopupVisible: false,
      newColumn: {
        columnTitle: "",
        board: this.slug,
      },
    };
  },
  props: {
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
      this.newColumn.columnTitle = "";
      this.isPopupVisible = false;
    },
    ...mapActions(["addColumn"]),
  },
  computed: {
    columns() {
      const slug = this.slug;
      return this.$store.getters.getBoardBySlug(slug).columns;
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
  display: flex;
  overflow: auto;
  align-items: start;
  gap: 30px;

  &__item {
    background-color: #e8d0b3;
    flex: 0 0 330px;
  }
}

.item {
  padding: 30px;
  min-height: 200px;
  &__title {
    margin-bottom: 0.5em;
  }
  &__body {
    min-height: 200px;
  }
}
</style>
