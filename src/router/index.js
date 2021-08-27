import { createRouter, createWebHistory } from "vue-router";
import Board from "@/components/Board.vue";
import Boards from "@/components/Boards.vue";

const routes = [
  {
    path: "/",
    component: Boards,
  },
  {
    path: "/board/:slug",
    component: Board,
    name: "board",
    props: (route) => ({
      properBoard: route.params.properBoard, // -----
      slug: route.params.slug,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
