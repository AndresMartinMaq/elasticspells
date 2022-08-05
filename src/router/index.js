import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SpellExplorer from "../views/SpellExplorer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/vue",
    name: "home",
    component: HomeView,
  },
  {
    path: "/spellbook",
    name: "spellbook",
    component: SpellExplorer,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
