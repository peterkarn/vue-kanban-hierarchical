<template>
  <div>
    <h3>{{ properTask.title }}</h3>
    <p>{{ properTask.descr }}</p>
    <p>{{ properTask.fullDescr }}</p>
    <button @click="showPopup">Show modal</button>
  </div>
  <popup btnName="Edit Task" v-if="isPopupVisible" @closePopup="closePopup">
    <p>Task Title</p>
    <p>Task id</p>
    <p>Task Descr</p>
    <p>Task Details</p>
  </popup>
</template>

<script>
import { mapState } from "vuex";
import Popup from "./Popup.vue";
export default {
  props: {
    taskIndex: Number,
    properColumn: Number,
    properBoard: Number,
  },
  components: {
    Popup,
  },
  data() {
    return {
      isPopupVisible: false,
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properTask() {
      const b = this.properBoard;
      const c = this.properColumn;
      const i = this.taskIndex;
      console.log(this.$store.state.boards[b].columns[c].tasks[i]);
      return this.$store.state.boards[b].columns[c].tasks[i];
    },
  },
};
</script>
