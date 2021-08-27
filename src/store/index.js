import { createStore } from "vuex";
import uniqid from "uniqid";
// import createPersistedState from "vuex-persistedstate";

class Board {
  constructor({ columns = [], slug = "" } = {}) {
    this.id = uniqid();
    this.columns = columns;
    this.slug = slug;
  }
}

class Column {
  constructor({ tasks = [], title = "New column" } = {}) {
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
  // plugins: [createPersistedState()],
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
      const c = payload.properties.properColumn;
      const b = payload.properties.properBoard;
      const title = payload.properties.taskData.title;
      const descr = payload.properties.taskData.descr;
      const fullDescr = payload.properties.taskData.fullDescr;
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
      const c = taskToRemove.properties.properColumn;
      const b = taskToRemove.properties.properBoard;
      const i = taskToRemove.properties.id;
      state.boards[b].columns[c].tasks.splice(i, 1);
    },
    updateTask(state, updatedTask) {
      state.boards[updatedTask.properBoard].columns[
        updatedTask.properColumn
      ].tasks.splice(
        [updatedTask.taskIndex],
        1,
        new Task({
          id: (this.state.nextTaskId += 1),
          title: updatedTask.newTitle,
          descr: updatedTask.newDescr,
          fullDescr: updatedTask.newFullDescr,
        })
      );
    },
    reorderTasks(state, { properColumnTasks, board, col }) {
      state.boards[board].columns[col].tasks = properColumnTasks;
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

export default store;
