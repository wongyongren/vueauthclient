import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Register from "@/components/Register"
import RegisterProject from "@/components/RegisterProject"
import RegisterWorker from "@/components/RegisterWorker"
import UserDashboard from "@/components/UserDashboard"
import CreateTeam from "@/components/CreateTeam"
import AssignSupervisor from "@/components/AssignSupervisor"
import UpdateTeam from "@/components/UpdateTeam"
import test from "@/components/test"
import Supervisor from "@/components/supervisor/Supervisor"
import Report from "@/components/report/Report"
import SupervisorReport from "@/components/supervisor/ReportList"
import UserReport from "@/components/user/UserList"
import ProjectList from "@/components/project/ProjectList"
import TeamList from "@/components/team/TeamList"
import EmployeeList from "@/components/employee/EmployeeList"
import EmployeeEdit from "@/components/employee/EmployeeEdit"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Main",
      component: Login
    },
    {
      path: "/login",
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
      path: "/createteam",
      name: "CreateTeam",
      component: CreateTeam
    },
    {
      path: "/assignsupervisor",
      name: "AssignSupervisor",
      component: AssignSupervisor
    },
    {
      path: "/updateteam",
      name: "UpdateTeam",
      component: UpdateTeam
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
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    },
    {
      path: "/supervisor/reportlist",
      name: "SupervisorReport",
      component: SupervisorReport
    }, {
      path: "/user/reportlist",
      name: "UserReport",
      component: UserReport
    }, {
      path: "/project/projectlist",
      name: "ProjectList",
      component: ProjectList
    }, {
      path: "/team/teamlist",
      name: "TeamList",
      component: TeamList
    }, {
      path: "/employee/employeelist",
      name: "EmployeeList",
      component: EmployeeList
    }, {
      path: "/employee/employeeedit/:userid",
      name: "EmployeeEdit",
      component: EmployeeEdit
    },
  ]
})
