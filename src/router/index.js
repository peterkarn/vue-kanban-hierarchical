import { createRouter, createWebHistory } from "vue-router";
import Board from "@/components/Board.vue";
import Boards from "@/components/Boards.vue";
import Details from "@/components/Details.vue";

const routes = [
  {
    path: "/",
    component: Boards,
  },
  {
    path: "/board/:slug-:properBoard",
    component: Board,
    name: "board",
    props: true,
  },
  {
    path: "/board/:slug-:properBoard/task-:col-:idx-:id",
    name: "details",
    component: Details,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
