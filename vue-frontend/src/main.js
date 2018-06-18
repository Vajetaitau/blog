import Vue from "vue";
import VueUniqIds from "vue-uniq-ids";
import VueRouter from "vue-router";

// Components
import App from "./App.vue";
import Resume from "./components/resume/Resume.vue";
import Labyrinth from "./components/games/labyrinth/labyrinth.vue";

// Services
import LabyrinthService from "./services/labyrinth/labyrinth-service";


// LabyrinthService.getLabyrinth().then(function(response) {
//   console.log(response);
// });

Vue.use(VueUniqIds);
Vue.use(VueRouter);

const routes = [
  { path: "/resume", component: Resume },
  { path: "/bar", component: Labyrinth }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

const app = new Vue({
  
})

new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount('#app');
