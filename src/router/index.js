/*
 * @Author: PlanC
 * @Date: 2023-02-26 15:14:56
 * @LastEditTime: 2023-02-26 15:32:57
 * @FilePath: \pipe-calc\src\router\index.js
 */

import { createRouter, createWebHistory } from "vue-router";
import landscape from "@/views/landscape.vue";
import portrait from "@/views/portrait.vue";

const routes = [
  {
    path: "/",
    name: "landscape",
    component: landscape,
  },
  {
    path: "/m",
    name: "portrait",
    component: portrait,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
