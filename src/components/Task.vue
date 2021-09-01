<template>
  <div class="task">
    <h3 class="task__title">{{ task.title }}</h3>
    <p class="task__descr">{{ task.descr }}</p>
    <p class="task__full">{{ task.fullDescr }}</p>
    <div class="task__btns">
      <button class="btn btn_alert" @click="removeTask">Remove Task</button>
      <button class="btn btn_primary" @click="showPopup">Edit</button>
      <router-link
        class="btn btn_primary"
        :to="{
          name: 'details',
          params: {
            taskId: task.id,
            parentBoard: this.parentBoard,
            parentColumn: this.parentColumn,
          },
        }"
        >View
      </router-link>
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
  props: ["taskId", "parentColumn", "parentBoard"],
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
        task: this.taskId,
        column: this.parentColumn,
        board: this.parentBoard,
      },
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
      this.taskToUpdate.newTitle = this.task.title;
      this.taskToUpdate.newDescr = this.task.descr;
      this.taskToUpdate.newFullDescr = this.task.fullDescr;
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
          id: this.taskId,
          column: this.parentColumn,
          board: this.parentBoard,
        },
      });
    },
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    task() {
      const board = this.parentBoard;
      const column = this.parentColumn;
      const id = this.taskId;
      return this.$store.getters.getTask(board, column, id);
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
    margin-bottom: 0.5em;
  }

  &__descr {
    margin-bottom: 0.5em;
  }

  &__full {
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
