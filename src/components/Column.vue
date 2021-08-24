<template>
  <div>
    <span
      >column-component <strong>{{ properColumn }}</strong></span
    >
    <!-- <button @click="addTaskTo(properColumn)">Add Task</button> -->
    <button @click="showPopup">Add Task</button>
    <ul>
      <li v-for="task in properColumnTasks" :key="task.id">
        <task></task>
      </li>
    </ul>
    <popup v-if="isPopupVisible" @closePopup="closePopup">
      <label>
        Title
        <input type="text" v-bind="taskData.title" />
      </label>
      <label>
        Description
        <input type="text" v-bind="taskData.descr" />
      </label>
      <label>
        Details
        <input type="text" v-bind="taskData.fullDescr" />
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
    addTaskTo() {
      this.$store.dispatch({
        type: "addTask",
        properties: {
          properBoard: this.properBoard,
          properColumn: this.properColumn,
        },
      });
    },
    ...mapActions(["addTask"]),
  },
  computed: {
    ...mapState({ columns: (state) => state.boards.columns }),
    properColumnTasks() {
      const b = this.properBoard;
      const c = this.properColumn;
      console.log(this.$store.state.boards[b].columns[c].tasks);
      return this.$store.state.boards[b].columns[c].tasks;
    },
  },
};
</script>
