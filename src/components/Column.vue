<template>
  <div class="column">
    <div class="column__btns">
      <button class="btn btn_alert" @click="removeColumn">Remove column</button>
      <button class="btn btn_primary" @click="showPopup">Add Task</button>
    </div>
    <ul class="column__tasks tasks">
      <draggable v-model="draggables" group="tasks">
        <li v-for="(task, i) in properColumnTasks" :key="task.id">
          <task
            :taskIndex="i"
            :properColumn="this.properColumn"
            :properBoard="this.properBoard"
            :relatedToBoard="this.relatedToBoard"
            :key="task.id"
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
    properColumn: Number,
    properBoard: String,
    relatedToBoard: String,
  },
  data() {
    return {
      isPopupVisible: false,
      taskData: {
        title: "",
        descr: "",
        fullDescr: "",
        relatedToBoard: this.relatedToBoard,
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
          board: this.properBoard,
          column: this.properColumn,
          relatedToBoard: this.relatedToBoard,
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
        c: this.properColumn,
        b: this.properBoard,
      });
    },
    ...mapActions(["addTask"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properColumnTasks() {
      const b = this.properBoard;
      const c = this.properColumn;
      return this.$store.state.boards[b].columns[c].tasks;
    },
    draggables: {
      get() {
        return this.properColumnTasks;
      },
      set(properColumnTasks) {
        this.$store.commit("reorderTasks", {
          properColumnTasks,
          board: this.properBoard,
          col: this.properColumn,
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
