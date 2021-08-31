import { createStore } from "vuex";
import uniqid from "uniqid";

class Board {
  constructor({ columns = [], slug = "", title = "" } = {}) {
    this.id = uniqid();
    this.columns = columns;
    this.slug = slug;
    this.title = title;
  }
}

class Column {
  constructor({ tasks = [], title = "", relatedToBoard = "" } = {}) {
    this.id = uniqid();
    this.tasks = tasks;
    this.title = title;
    this.relatedToBoard = relatedToBoard;
  }
}

class Task {
  constructor({
    title = "",
    descr = "",
    fullDescr = "",
    relatedToBoard = "",
  } = {}) {
    this.id = uniqid();
    this.title = title;
    this.descr = descr;
    this.fullDescr = fullDescr;
    this.relatedToBoard = relatedToBoard;
  }
}

const defaultState = {
  boards: [],
};

function getLocalStorageState() {
  return JSON.parse(localStorage.getItem("store")) ?? defaultState;
}

const store = createStore({
  state: getLocalStorageState(),
  mutations: {
    addBoard(state, newBoard) {
      state.boards.push(
        new Board({
          id: uniqid(),
          slug: newBoard.boardSlug,
          title: newBoard.boardTitle,
        })
      );
    },
    addColumn(state, newColumn) {
      const index = state.boards.findIndex(
        (item) => item.slug === newColumn.relatedToBoard
      );
      state.boards[index].columns.push(
        new Column({
          // id: uniqid(),
          id: newColumn.id,
          title: newColumn.columnTitle,
          relatedToBoard: newColumn.relatedToBoard,
        })
      );
    },
    addTask(state, payload) {
      const { board, column } = payload.properties;
      const { title, descr, fullDescr, relatedToBoard } =
        payload.properties.taskData;
      state.boards[board].columns[column].tasks.push(
        new Task({
          id: uniqid(),
          title: title,
          descr: descr,
          fullDescr: fullDescr,
          relatedToBoard: relatedToBoard,
        })
      );
    },
    removeTask(state, taskToRemove) {
      if (confirm("Are U sure")) {
        const { id, column, board } = taskToRemove.properties;
        state.boards[board].columns[column].tasks.splice(id, 1);
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
        const { column, board } = payload;
        delete state.boards[board].columns.splice(column, 1);
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
