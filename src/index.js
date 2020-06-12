import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.redirectedFrom === "/") {
    localStorage.setItem("direction", "down");
    localStorage.setItem("sec", 10);
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
