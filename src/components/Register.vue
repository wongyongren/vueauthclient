<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Register Page</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="login">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="username"
            :rules="nameRules"
            name="username"
            label="User name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="name"
            name="name"
            label="Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="role"
            name="role"
            label="User Role"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="confirmpassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show2 ? 'text' : 'password'"
            name="confirmpassword"
            label="Confirm Password"
            hint="At least 6 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          class="loginButton"
          type="submit"
          value="Login"
          >Login</v-btn
        >
      </v-row>
    </v-form>
    <br /><br />

  </v-container>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Login",
  methods: {
    login: (e) => {
      e.preventDefault();
      let username = e.target.elements.username.value;
      let name = e.target.elements.name.value;
      let role = e.target.elements.role.value;
      let password = e.target.elements.password.value;
      let confirmpassword = e.target.elements.confirmpassword.value;
      let login = () => {
        let data = {
          username: username,
          name: name,
          role: role,
          confirm_password: confirmpassword,
          password: password,
        };
        axios
          .post("/api/register", data)
          .then((response) => {
            console.log("register");
            router.push("/");
          })
          .catch((errors) => {
            console.log("Cannot log in");
            console.log(errors);
            // alert(errors);
          });
      };
      login();
    },
  },
  data: () => ({
    alert: false,
    show1: false,
    show2: false,
    valid: false,
    username: "",
    name: "",
    role: "",
    nameRules: [
      (v) => !!v || "User Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    password: "",
    confirmpassword: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      // (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  justify-content: space-between;
  flex-direction: column;
  align-content: space-around;
}

/* .loginButton:hover {background-color: white;} */
</style>
