<template>
  <div>details</div>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
  methods: {
    // ...mapActions(["removeTask"]),
    removeHandle() {
      this.removeTask();
      this.properTask = null;
    },
  },
  computed: {
    // ...mapState({ tasks: (state) => state.todo }),
    // properTask() {},
  },
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
}
</style>
