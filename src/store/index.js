import { createStore } from "vuex";
import uniqid from "uniqid";

class Board {
  constructor({ columns = [], slug = "", title = "" } = {}) {
    this.columns = columns;
    this.slug = slug;
    this.title = title;
  }
}

class Column {
  constructor({ id = "", tasks = [], title = "", board = "" } = {}) {
    this.id = id;
    this.tasks = tasks;
    this.title = title;
    this.board = board;
  }
}

class Task {
  constructor({
    id = "",
    title = "",
    descr = "",
    fullDescr = "",
    parentBoard = "",
    parentColumn = "",
  } = {}) {
    this.id = id;
    this.title = title;
    this.descr = descr;
    this.fullDescr = fullDescr;
    this.parentBoard = parentBoard;
    this.parentColumn = parentColumn;
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
    addBoard(state, payload) {
      state.boards.push(
        new Board({
          slug: payload.boardSlug,
          title: payload.boardTitle,
        })
      );
    },
    addColumn(state, newCol) {
      this.getters.getBoardBySlug(newCol.board).columns.push(
        new Column({
          id: uniqid(),
          title: newCol.columnTitle,
          board: newCol.board,
        })
      );
    },
    addTask(state, payload) {
      const { parentBoard, parentColumn } = payload.properties;
      const { title, descr, fullDescr } = payload.properties.taskData;
      const column = this.getters.getColumn(parentBoard, parentColumn);
      column.tasks.push(
        new Task({
          id: uniqid(),
          title: title,
          descr: descr,
          fullDescr: fullDescr,
        })
      );
    },
    removeColumn(state, payload) {
      if (confirm("Are U sure")) {
        const { column, board } = payload;
        const brd = this.getters.getBoardBySlug(board);
        const i = brd.columns.findIndex((col) => col.id === column);
        brd.columns.splice(i, 1);
      }
    },
    removeTask(state, payload) {
      if (confirm("Are U sure")) {
        const { id, column, board } = payload.properties;
        const col = this.getters.getColumn(board, column);
        col.tasks.splice(id, 1);
      }
    },
    reorderTasks(state, { tasks, board, col }) {
      const brdIdx = state.boards.findIndex((item) => item.slug === board);
      const colIdx = state.boards[brdIdx].columns.findIndex(
        (item) => item.id === col
      );
      state.boards[brdIdx].columns[colIdx].tasks = tasks;
    },
    updateTask(state, updatedTask) {
      const { newTitle, newDescr, newFullDescr, task, column, board } =
        updatedTask;
      const tsk = this.getters.getTask(board, column, task);
      tsk.title = newTitle;
      tsk.descr = newDescr;
      tsk.fullDescr = newFullDescr;
    },
  },
  actions: {
    addNewBoard(context, payload) {
      context.commit("addBoard", payload);
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
  getters: {
    getBoardBySlug: (state) => (slug) => {
      return state.boards.find((board) => board.slug === slug);
    },
    getColumn: (state) => (slug, id) => {
      return state.boards
        .find((board) => board.slug === slug)
        .columns.find((column) => column.id === id);
    },
    getTask: (state) => (slug, colId, taskId) => {
      return state.boards
        .find((board) => board.slug === slug)
        .columns.find((column) => column.id === colId)
        .tasks.find((task) => task.id === taskId);
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
