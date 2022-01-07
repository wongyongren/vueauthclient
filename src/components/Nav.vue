<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="sidebar = !sidebar"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      class="hidden-lg-and-up"
      v-model="sidebar"
      absolute
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems"
          exact
          :key="i"
          :to="item.path"
          >{{ item.title }}</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-toolbar-title class="pt-3" style="text-align: right">
      <router-link to="/dashboard">
        <img height="68" src="../assets/alricLogo.svg" />
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-md-and-down">
      <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <div class="pr-4">
      {{ user.username }}
    </div>

    <v-form v-if="user.username" v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  data: function () {
    return {
      role: null,
      sidebar: null,
      user: {
        username: "",
        displayName: "",
      },
      menuItems: [],
      adminMenuItems: [
        { path: "/register", title: "New User" },
        { path: "/registerproject", title: "New Project" },
        { path: "/createteam", title: "New Team" },
        { path: "/assignsupervisor", title: "Set Team Supervisor" },
        { path: "/updateteam", title: "Edit Team" },
        { path: "/report", title: "Report" },
        { path: "/supervisor/reportlist", title: "Report list" },
        { path: "/supervisor", title: "Supervisor" },
      ],
      supervisorMenuItems: [{ path: "/supervisor", title: "Supervisor" }],
    };
  },
  computed: {},
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/login")
        .then((response) => {
          self.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            // alert("You are not authorized to view this resource because you are not an admin.");
          }
          console.log("in error");
          this.$router.push("/").catch(() => {});
        });
      // axios
      //   .get("/api/user")
      //   .then((response) => {
      //     console.log("this is user ", response.data);
      //     this.user = { ...response.data.user };
      //     this.role = response.data.user.role;
      //     console.log("am i being called", this.role);
      //     this.show = true;
      //   })
      //   .catch((errors) => {
      //     console.log("error api call", errors);
      //     // this.$router.push("/").catch(() => {});
      //   });
      this.role = this.user.role;
      if (this.role == "admin") {
        this.menuItems = [...this.adminMenuItems];
      }
      if (this.role == "supervisor") {
        this.menuItems = [...this.supervisorMenuItems];
      }
      console.log("am i being called", this.user);
      console.log("am i being called", this.role);
    },
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          self.$set(this, "user", response.data.user);
          router.push("/");
        })
        .catch((errors) => {
          router.push("/");
        });
    },
  },
  mounted() {
    this.getUserData();
    this.menuItems = this.adminMenuItems;
  },
};
</script>

<style>
</style> 