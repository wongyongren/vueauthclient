<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Assign Worker to Project Site
    </h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="role"
            :items="selectOption"
            :rules="roleRules"
            :menu-props="{ maxHeight: '400' }"
            name="projectname"
            label="Project Name"
            persistent-hint
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="role"
            :items="selectOption"
            :rules="roleRules"
            :menu-props="{ maxHeight: '400' }"
            name="supervisorname"
            label="Supervisor Name"
            persistent-hint
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="multiValue"
            :items="items"
            label="Select"
            multiple
            chips
            hint="Select Atleast 1 Worker"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          :disabled="!valid"
          class="loginButton"
          type="submit"
          value="Register"
          >Assign</v-btn
        >
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Register",
  methods: {
    register: (e) => {
      e.preventDefault();
      let projectname = e.target.elements.projectname.value;
      let projectadddress = e.target.elements.projectadddress.value;
      let register = () => {
        let data = {
          projectname: projectname,
          projectadddress: projectadddress,
        };
        axios
          .post("/api/registerproject", data)
          .then((response) => {
            console.log("register");
            console.log(response);
            alert("Success");
            window.location.reload();
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Project Name");
          });
      };
      register();
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmpassword || "Password must match";
    },
  },
  data: () => ({
    valid: false,
    selectOption: ["8 Tier", "Suzhou", "Panda"],
    projectname: "",
    projectadddress: "",
    projectnameRules: [(v) => !!v || "Project Name is required"],
    projectadddressRules: [(v) => !!v || "Project Address is required"],
    items: [
      "wong",
      "phone",
      "Zion",
      "Luca",
      "Ezra",
      "Alex",
      "Remi",
      "Jude",
      "River",
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
