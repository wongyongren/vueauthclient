<template>
  <div class="pt-16" v-if="user">
    <h2>Dashboard</h2>
    <p>User Name: {{ user.username }}</p>
    <p>Display Name: {{ user.displayName }}</p>
    <p>Role: {{ user.role }}</p>
    <v-form v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      user: {
        username: "",
        displayName: "",
        role: "",
      },
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/user")
        .then((response) => {
          self.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            // alert("You are not authorized to view this resource because you are not an admin.");
          }

          this.$router.push("/").catch(() => {});
        });
    },
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          console.log(response);
          self.$set(this, "user", response.data.user);
          console.log("logout")
          //this.$router.push("/").catch(() => {});
          router.push("/");
        })
        .catch((errors) => {
          //router.push("/");
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
