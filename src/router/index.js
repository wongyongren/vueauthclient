import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Register from "@/components/Register"
import RegisterProject from "@/components/RegisterProject"
import Home from "@/components/HelloWorld"
import UserDashboard from "@/components/UserDashboard"
import AssignWorker from "@/components/AssignWorker"

AssignWorker
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/userdashboard",
      name: "UserDashboard",
      component: UserDashboard
    },
    {
      path: "/registerproject",
      name: "RegisterProject",
      component: RegisterProject
    }
    ,
    {
      path: "/assignworker",
      name: "AssignWorker",
      component: AssignWorker
    }
  ]
})
