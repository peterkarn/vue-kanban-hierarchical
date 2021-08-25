<template>
  <div class="task">
    <h3>{{ properTask.title }}</h3>
    <p>{{ properTask.descr }}</p>
    <p>{{ properTask.fullDescr }}</p>
    <div class="task__btns">
      <button @click="removeTask">Remove Task</button>
      <button @click="showPopup">Edit</button>
    </div>
  </div>
  <popup
    btnName="Edit Task"
    v-if="isPopupVisible"
    @closePopup="closePopup"
    @confirmEdit="updateTask"
  >
    <label>
      <span>Edit task title</span>
      <input type="text" v-model="taskToUpdate.newTitle" />
    </label>
    <label>
      <span>Edit task description</span>
      <input type="text" v-model="taskToUpdate.newDescr" />
    </label>
    <label>
      <span>Edit task details</span>
      <input type="text" v-model="taskToUpdate.newFullDescr" />
    </label>
  </popup>
</template>

<script>
import { mapState } from "vuex";
import Popup from "./Popup.vue";
export default {
  props: {
    taskIndex: Number,
    properColumn: Number,
    properBoard: String,
  },
  components: {
    Popup,
  },
  data() {
    return {
      isPopupVisible: false,
      taskToUpdate: {
        newTitle: "",
        newDescr: "",
        newFullDescr: "",
        taskIndex: this.taskIndex,
        properColumn: this.properColumn,
        properBoard: this.properBoard,
      },
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    resetFields() {
      this.taskToUpdate.newTitle = "";
      this.taskToUpdate.newDescr = "";
      this.taskToUpdate.newFullDescr = "";
    },
    updateTask() {
      this.$store.dispatch("updateTask", this.taskToUpdate);
      this.closePopup();
      this.resetFields();
    },
    removeTask() {
      this.$store.commit({
        type: "removeTask",
        properties: {
          id: this.taskIndex,
          properColumn: this.properColumn,
          properBoard: this.properBoard,
        },
      });
    },
    // ...mapActions(["removeTask"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properTask() {
      const b = this.properBoard;
      const c = this.properColumn;
      const i = this.taskIndex;
      return this.$store.state.boards[b].columns[c].tasks[i];
    },
  },
};
</script>
<style lang="scss">
.task {
  cursor: grab;

  &__btns {
    display: grid;
    gap: 5px;

    button {
      cursor: pointer;
    }
  }
}
</style>
