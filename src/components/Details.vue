<template>
  <div class="details">
    <h2 class="details__title">Task details</h2>
    <div class="details__btns">
      <router-link class="btn btn_primary" to="/">Back</router-link>
    </div>
    <div class="details__body" v-if="task">
      <h3 class="details__title">{{ task.title }}</h3>
      <p class="details__paragraph">{{ task.descr }}</p>
      <p class="details__paragraph">{{ task.fullDescr }}</p>
      <button class="btn btn_primary" @click="removeTask">Remove Task</button>
    </div>
    <div v-else>
      <p>No tasks here...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    removeTask() {
      this.$store.commit({
        type: "removeTask",
        properties: {
          id: this.$route.params.taskId,
          column: this.$route.params.parentColumn,
          board: this.$route.params.parentBoard,
        },
      });
    },
  },
  computed: {
    ...mapState({ boards: (state) => state.boards }),
    task() {
      const task = this.boards
        .flatMap((b) => b.columns)
        .flatMap((c) => c.tasks)
        .filter((t) => t.id === this.$route.params.taskId);
      return task[0];
    },
  },
};
</script>
<style lang="scss">
.details {
  max-width: 1440px;
  margin: 0 auto;
  gi &__title {
    font-size: 40px;
    margin-bottom: 20px;
  }

  &__paragraph {
    font-size: 20px;
    margin-bottom: 10px;
  }

  &__btns {
    display: flex;
    margin: 0 -10px 50px;
    .btn {
      margin: 0 10px;
    }
  }
}
</style>
