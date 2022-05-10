import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';
import ActivityInfo from '../views/ActivityInfo.vue';
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import FavoritesView from "../views/FavoritesView.vue";

const routes = [
  { path: "/favorites", name: "favorites", component: FavoritesView },
  { path: "/logout", name: "logout", component: LogoutView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/signup", name: "signup", component: SignupView },
  {
    path: '/activity_info/:id',
    name: 'activity_info',
    component: ActivityInfo
  },
  {
    path: '/activities',
    name: 'activities',
    component: ActivitiesView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
