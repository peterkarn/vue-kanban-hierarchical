import { createStore } from "vuex";

class Board {
  constructor({ id = null, columns = [] } = {}) {
    this.id = id;
    this.columns = columns;
  }
}

class Column {
  constructor({ id = null, tasks = [] } = {}) {
    this.id = id;
    this.tasks = tasks;
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

export default createStore({
  state: {
    nextBoadrId: 0,
    nextColId: 0,
    nextTaskId: 0,
    boards: [],
  },
  mutations: {
    addBoard(state) {
      state.boards.push(
        new Board({
          id: (this.state.nextBoadrId += 1),
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
  },
  actions: {
    addBoard(context) {
      context.commit("addBoard");
    },
    addColumn(context, properBoard) {
      context.commit("addColumn", properBoard);
    },
    addTask(context, payload) {
      context.commit("addTask", payload);
    },
  },
  modules: {},
});
