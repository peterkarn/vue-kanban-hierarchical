<template>
  <div>
    <span>column-component</span>
    <!-- <button @click="addTaskTo(properColumn)">Add Task</button> -->
    <button @click="showPopup">Add Task</button>
    <ul>
      <li v-for="(task, i) in properColumnTasks" :key="task.id">
        <task
          :taskIndex="i"
          :properColumn="this.properColumn"
          :properBoard="this.properBoard"
        ></task>
      </li>
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
      <pre>
        {{ taskData }}
      </pre>
    </popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Task from "./Task.vue";
import Popup from "./Popup.vue";

export default {
  props: {
    properColumn: Number,
    properBoard: Number,
  },
  data() {
    return {
      isPopupVisible: false,
      taskData: {
        title: "",
        descr: "",
        fullDescr: "",
      },
    };
  },
  components: {
    Task,
    Popup,
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
          properBoard: this.properBoard,
          properColumn: this.properColumn,
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
    ...mapActions(["addTask"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properColumnTasks() {
      const b = this.properBoard;
      const c = this.properColumn;
      return this.$store.state.boards[b].columns[c].tasks;
    },
  },
};
</script>
