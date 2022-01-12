<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Edit Employee Page
    </h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="updateemploeyee">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="employee_name"
            :rules="usernameRules"
            name="employeename"
            label="Employee Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="worker_name"
            :items="workernameOption"
            name="workername"
            item-value="userid"
            item-text="name"
            label="Login User Name"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-btn
          :disabled="!valid"
          class="loginButton"
          type="submit"
          value="updateemploeyee"
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
    updateemploeyee: function () {
      let employeename = this.employee_name;
      let userid = this.worker_name;
      let employeeid = this.workerid;
      let data = {
        employeename: employeename,
        userid: userid,
        employeeid: employeeid,
      };
      console.log(data);
      axios
        .post("/api/updateemployee", data)
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
      this.workerid = this.$route.params.userid;
      let self = this;
      let data = {
        employeeid: this.$route.params.userid,
      };
      axios
        .post("/api/displayemployee", data)
        .then((response) => {
          self.employee_name = response.data.employeename;
          self.worker_name = response.data.userid;
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("Duplicate User Name");
        });
    },
    getLoginUserData: function () {
      let self = this;
      axios
        .get("/api/workername")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.workernameOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("worker name list error");
        });
    },
  },
  mounted() {
    this.getLoginUserData();
    this.getWorkerData();
  },
  data: () => ({
    worker_name: [],
    workernameOption: [],
    workerid: null,
    valid: false,
    employee_name: "",
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
