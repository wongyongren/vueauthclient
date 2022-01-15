<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Edit User Page</h1>
    <v-spacer></v-spacer>
    <v-form v-if="role === 'admin'" v-on:submit="adminupdateuser">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="user_name"
            :rules="usernameRules"
            name="username"
            label="Employee User Name"
            autocomplete="off"
            required
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="userdisplay_name"
            :rules="usernameRules"
            name="name"
            label="Employee Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="roles"
            :items="selectOption"
            :menu-props="{ maxHeight: '400' }"
            name="role"
            label="Role"
            persistent-hint
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="password"
            :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="passwordshow ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            autocomplete="off"
            counter
            @click:append="passwordshow = !passwordshow"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="confirmpassword"
            :append-icon="confirmpasswordshow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
            :type="confirmpasswordshow ? 'text' : 'password'"
            name="confirmpassword"
            label="Confirm Password"
            hint="At least 6 characters"
            autocomplete="off"
            counter
            @click:append="confirmpasswordshow = !confirmpasswordshow"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn class="loginButton" type="submit" value="updateemploeyee"
          >Submit</v-btn
        >
      </v-row>
    </v-form>

    <v-form v-if="role !== 'admin'" v-on:submit="updateuser">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="user_name"
            :rules="usernameRules"
            name="username"
            label="Employee User Name"
            autocomplete="off"
            required
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="userdisplay_name"
            :rules="usernameRules"
            name="name"
            label="Employee Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="password"
            :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="passwordshow ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            autocomplete="off"
            counter
            @click:append="passwordshow = !passwordshow"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="confirmpassword"
            :append-icon="confirmpasswordshow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
            :type="confirmpasswordshow ? 'text' : 'password'"
            name="confirmpassword"
            label="Confirm Password"
            hint="At least 6 characters"
            autocomplete="off"
            counter
            @click:append="confirmpasswordshow = !confirmpasswordshow"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn class="loginButton" type="submit" value="updateemploeyee"
          >Submit</v-btn
        >
      </v-row>
    </v-form>
    <br /><br />
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    updateuser: function () {
      let name = this.userdisplay_name;
      let password = this.password;
      let userid = this.userid;

      let data = {
        name: name,
        password: password,
        userid: userid,
      };
      console.log(data);
      axios
        .post("/api/updateuser", data)
        .then((response) => {
          console.log("register");
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("Duplicate User Name");
        });
    },
    adminupdateuser: function () {
      let name = this.userdisplay_name;
      let password = this.password;
      let roles = this.roles;
      let userid = this.userid;
      let data = {
        name: name,
        password: password,
        role: roles,
        userid: userid,
      };
      console.log(data);
      axios
        .post("/api/adminupdateuser", data)
        .then((response) => {
          console.log("register");
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("Duplicate User Name");
        });
    },
    getWorkerData: function () {
      this.userid = this.$route.params.userid;
      let self = this;
      let data = {
        userid: this.$route.params.userid,
      };
      axios
        .post("/api/displayuser", data)
        .then((response) => {
          self.userdisplay_name = response.data.name;
          self.user_name = response.data.username;
          self.roles = response.data.role;
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("Duplicate User Name");
        });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmpassword || "Password must match";
    },
  },
  mounted() {
    this.getWorkerData();
  },
  data: () => ({
    selectOption: ["User", "Supervisor", "Admin"],
    role: "admin",
    roles:"",
    password: null,
    confirmpassword: null,
    passwordRules: [
      (v) => v.length >= 6 || "Password must at least 6 characters",
    ],
    confirmPasswordRules: [
      (v) => v.length >= 6 || "Password must at least 6 characters",
    ],
    confirmpasswordshow: false,
    passwordshow: false,
    user_name: [],
    userid: null,
    userdisplay_name: "",
    usernameRules: [
      (v) => !!v || "User Name is required",
      // (v) => v.length <= 10 || "Name must be less than 6 characters",
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
