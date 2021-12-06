<template>
  <v-app-bar dark>
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="sidebar = !sidebar"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      class="hidden-md-and-up"
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
    <v-toolbar-title style="text-align: right">{{
      user.username
    }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <v-form v-on:submit="logout">
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
      sidebar: null,
      user: {
        username: "",
        displayName: "",
      },
      menuItems: [
        { path: "/supervisor", name: "supervisor", title: "Supervisor" },
        { path: "/report", name: "report", title: "Report" },
      ],
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/user")
        .then((response) => {
          console.log(response);
          self.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          console.log(errors);
          router.push("/");
        });
    },
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          console.log(response);
          self.$set(this, "user", response.data.user);
          router.push("/");
        })
        .catch((errors) => {
          console.log(errors);
          router.push("/");
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>

<style>
</style> 