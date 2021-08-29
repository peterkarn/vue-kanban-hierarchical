import { createStore } from "vuex";
import uniqid from "uniqid";

class Board {
  constructor({ columns = [], slug = "" } = {}) {
    this.id = uniqid();
    this.columns = columns;
    this.slug = slug;
  }
}

class Column {
  constructor({ tasks = [], title = "" } = {}) {
    this.id = uniqid();
    this.tasks = tasks;
    this.title = title;
  }
}

class Task {
  constructor({ title = "", descr = "", fullDescr = "" } = {}) {
    this.id = uniqid();
    this.title = title;
    this.descr = descr;
    this.fullDescr = fullDescr;
  }
}

const store = createStore({
  state: {
    nextBoadrId: 0,
    nextColId: 0,
    nextTaskId: 0,
    boards: [],
  },
  mutations: {
    addBoard(state, newBoard) {
      state.boards.push(
        new Board({
          id: (this.state.nextBoadrId += 1),
          slug: newBoard.boardSlug,
        })
      );
    },
    addColumn(state, newColumn) {
      state.boards[newColumn.columnBoard].columns.push(
        new Column({
          id: (this.state.nextColId += 1),
          title: newColumn.columnTitle,
        })
      );
    },
    addTask(state, payload) {
      const { b, c } = payload.properties;
      const { title, descr, fullDescr } = payload.properties.taskData;
      state.boards[b].columns[c].tasks.push(
        new Task({
          id: (this.state.nextTaskId += 1),
          title: title,
          descr: descr,
          fullDescr: fullDescr,
        })
      );
    },
    removeTask(state, taskToRemove) {
      if (confirm("Are U sure")) {
        const { id, c, b } = taskToRemove.properties;
        state.boards[b].columns[c].tasks.splice(id, 1);
      }
    },
    updateTask(state, updatedTask) {
      const {
        newTitle,
        newDescr,
        newFullDescr,
        taskIndex,
        properColumn,
        properBoard,
      } = updatedTask;
      state.boards[properBoard].columns[properColumn].tasks.splice(
        [taskIndex],
        1,
        new Task({
          id: (this.state.nextTaskId += 1),
          title: newTitle,
          descr: newDescr,
          fullDescr: newFullDescr,
        })
      );
    },
    reorderTasks(state, { properColumnTasks, board, col }) {
      state.boards[board].columns[col].tasks = properColumnTasks;
    },
    removeColumn(state, payload) {
      if (confirm("Are U sure")) {
        const { c, b } = payload;
        delete state.boards[b].columns.splice(c, 1);
      }
    },
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
  },
  actions: {
    addNewBoard(context, newBoard) {
      context.commit("addBoard", newBoard);
    },
    addColumn(context, newColumn) {
      context.commit("addColumn", newColumn);
    },
    addTask(context, payload) {
      context.commit("addTask", payload);
    },
    updateTask(context, updatedTask) {
      context.commit("updateTask", updatedTask);
    },
  },
  modules: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
