import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Register from "@/components/Register"
import RegisterProject from "@/components/RegisterProject"
import RegisterWorker from "@/components/RegisterWorker"
import Home from "@/components/HelloWorld"
import UserDashboard from "@/components/UserDashboard"
import AssignWorker from "@/components/AssignWorker"
import AssignProject from "@/components/AssignProject"
import AssignSupervisor from "@/components/AssignSupervisor"
import UpdateAssignWorker from "@/components/UpdateAssignWorker"
import test from "@/components/test"
import Supervisor from "@/components/supervisor/Supervisor"


Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: "/registerworker",
      name: "RegisterWorker",
      component: RegisterWorker
    },
    {
      path: "/assignworker",
      name: "AssignWorker",
      component: AssignWorker
    },
    {
      path: "/assignproject",
      name: "AssignProject",
      component: AssignProject
    },
    {
      path: "/assignsupervisor",
      name: "AssignSupervisor",
      component: AssignSupervisor
    },
    {
      path: "/updateassignworker",
      name: "UpdateAssignWorker",
      component: UpdateAssignWorker
    },
    {
      path: "/test",
      name: "test",
      component: test
    },
    {
      path: "/supervisor",
      name: "Supervisor",
      component: Supervisor
    }
  ]
})
