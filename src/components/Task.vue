<template>
  <div class="task">
    <h3 class="task__title">{{ properTask.title }}</h3>
    <p class="task__descr">{{ properTask.descr }}</p>
    <p class="task__full">{{ properTask.fullDescr }}</p>
    <div class="task__btns">
      <button class="btn btn_alert" @click="removeTask">Remove Task</button>
      <button class="btn btn_primary" @click="showPopup">Edit</button>
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
      this.taskToUpdate.newTitle = this.properTask.title;
      this.taskToUpdate.newDescr = this.properTask.descr;
      this.taskToUpdate.newFullDescr = this.properTask.fullDescr;
    },
    closePopup() {
      this.isPopupVisible = false;
      this.taskToUpdate.newTitle = "";
      this.taskToUpdate.newDescr = "";
      this.taskToUpdate.newFullDescr = "";
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
  margin-top: 20px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding: 20px 0;
  cursor: grab;
  &__title {
    @include truncate(2, 24px);
    margin-bottom: 0.5em;
  }

  &__descr {
    @include truncate(3, 20px);
    margin-bottom: 0.5em;
  }

  &__full {
    @include truncate(3, 20px);
    margin-bottom: 0.2em;
  }

  &__btns {
    display: grid;
    gap: 5px;
    justify-content: center;

    button {
      cursor: pointer;
    }
  }
}
</style>
