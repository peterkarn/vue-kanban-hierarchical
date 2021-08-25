<template>
  <div id="app">
    <div class="page-header">
      <h1>Kanban Board</h1>
      <p>vuejs based</p>
      <hr />
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Boards from "./components/Boards.vue";

export default {
  props: {},
  components: {
    // Boards,
  },
  computed: {
    ...mapState({ boards: (state) => state.boards }),
  },
  // beforeCreate() {
  //   this.$store.commit("initialiseStore");
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
