<template>
  <div v-if="user">
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
import Header from "./header.vue";

export default {
  name: "Login",
  components: {
    Header,
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
        .get("/api/user1")
        .then((response) => {
          //console.log(response);
          self.$set(this, "user", response.data.user);
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            //console.log("1231231232132132");
            alert("You are not authorized to view this resource because you are not an user.");
          }
          console.log(errors);
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
          this.$router.push("/").catch(() => {});
        })
        .catch((errors) => {
          router.push("/");
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
