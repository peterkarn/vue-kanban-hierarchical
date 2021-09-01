<template>
  <div class="column">
    <div class="column__btns">
      <button class="btn btn_alert" @click="removeColumn">Remove column</button>
      <button class="btn btn_primary" @click="showPopup">Add Task</button>
    </div>
    <ul class="column__tasks tasks">
      <draggable v-model="draggables" group="tasks">
        <li v-for="task in tasks" :key="task.id">
          <task
            :parentBoard="this.parentBoard"
            :parentColumn="this.columnID"
            :taskId="task.id"
          ></task>
        </li>
      </draggable>
    </ul>
    <popup
      btnName="Add Task"
      v-if="isPopupVisible"
      @closePopup="closePopup"
      @confirmEdit="addTaskTo"
    >
      <label>
        Title
        <input type="text" v-model="taskData.title" />
      </label>
      <label>
        Description
        <input type="text" v-model="taskData.descr" />
      </label>
      <label>
        Details
        <input type="text" v-model="taskData.fullDescr" />
      </label>
    </popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Task from "./Task.vue";
import Popup from "./Popup.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  props: {
    parentBoard: String,
    columnID: String,
  },
  data() {
    return {
      isPopupVisible: false,
      taskData: {
        title: "",
        descr: "",
        fullDescr: "",
        parentBoard: this.parentBoard,
        parentColumn: this.columnID,
      },
    };
  },
  components: {
    Task,
    Popup,
    draggable: VueDraggableNext,
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    resetFields() {
      this.taskData.title = "";
      this.taskData.descr = "";
      this.taskData.fullDescr = "";
    },
    addTaskTo() {
      this.$store.dispatch({
        type: "addTask",
        properties: {
          parentBoard: this.parentBoard,
          parentColumn: this.columnID,
          taskData: this.taskData,
        },
      });
      this.resetFields();
      this.isPopupVisible = false;
    },
    closePopup() {
      this.resetFields();
      this.isPopupVisible = false;
    },
    removeColumn() {
      this.$store.commit("removeColumn", {
        column: this.columnID,
        board: this.parentBoard,
      });
    },
    ...mapActions(["addTask"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    tasks() {
      const board = this.parentBoard;
      const column = this.columnID;
      return this.$store.getters.getColumn(board, column).tasks;
    },
    draggables: {
      get() {
        return this.tasks;
      },
      set(tasks) {
        this.$store.commit("reorderTasks", {
          tasks,
          board: this.parentBoard,
          col: this.columnID,
        });
      },
    },
  },
};
</script>
<style lang="scss">
.column {
  &__btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-content: center;

    .btn {
      min-width: 50px;
    }
  }
}

div [group="tasks"] {
  min-height: 200px;
}
.tasks {
  padding: 0;
}
</style>
