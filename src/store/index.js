import { createStore } from "vuex";

class Board {
  constructor({ id = null, columns = [], slug = "" } = {}) {
    this.id = id;
    this.columns = columns;
    this.slug = slug;
  }
}

class Column {
  constructor({ id = null, tasks = [], title = "New column" } = {}) {
    this.id = id;
    this.tasks = tasks;
    this.title = title;
  }
}

class Task {
  constructor({ id = null, title = "", descr = "", fullDescr = "" } = {}) {
    this.id = id;
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
    addColumn(state, properBoard) {
      state.boards[properBoard].columns.push(
        new Column({
          id: (this.state.nextColId += 1),
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
    addColumn(context, properBoard) {
      context.commit("addColumn", properBoard);
    },
    addTask(context, payload) {
      context.commit("addTask", payload);
    },
    updateTask(context, updatedTask) {
      context.commit("updateTask", updatedTask);
    },
    // removeTask(context, taskToRemove) {
    //   // context.commit("removeTask", taskToRemove);
    //   console.log(taskToRemove);
    //   console.log(context);
    // },
  },
  modules: {},
});

// store.subscribe((mutation, state) => {
//   localStorage.setItem("store", JSON.stringify(state));
// });

// store.subscribe((mutation, state) => {
//   if (mutation === "removeTask") {
//     localStorage.setItem("store", JSON.stringify(state));
//   }
// });

export default store;
