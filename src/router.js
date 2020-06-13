import Vue from "vue";
import VueRouter from "vue-router";
import TrafficLight from "./components/TrafficLight.vue";
import NotFound from "./components/NotFound.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: localStorage.getItem("color") || "/red" },
    { path: "/:id(green|red|orange)", component: TrafficLight },
    {
      path: "/404",
      name: "404",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
