<template>
  <div v-if="user">
    <Header />
    <h2>Dashboard</h2>
    <p>User Name: {{ user.username }}</p>
    <p>Display Name: {{ user.displayName }}</p>
    <v-form v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import Header from "../components/header.vue";

export default {
  name: "Login",
  components: {
    Header,
  },
  data() {
    return {
      user: {
        username: "Jesse",
        displayName: "jesse",
      },
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
