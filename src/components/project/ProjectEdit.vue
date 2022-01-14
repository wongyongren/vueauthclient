<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Edit Project Page</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="updateproject">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="project_name"
            name="projectname"
            label="Project Site Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="project_address"
            name="projectaddress"
            label="Project Site Address"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn
          :disabled="!valid"
          class="loginButton"
          type="submit"
          value="updateproject"
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
    updateproject: function () {
      let projectname = this.project_name;
      let projectaddress = this.project_address;
      let projectid = this.projectid;
      let data = {
        projectname: projectname,
        projectaddress: projectaddress,
        projectid: projectid,
      };
      console.log(data);
      axios
        .post("/api/updateproject", data)
        .then((response) => {
          console.log("register");
        })
        .catch((errors) => {
          alert("Duplicate Project Name");
        });
    },
    getprojectData: function () {
      this.projectid = this.$route.params.projectid;
      let self = this;
      let data = {
        projectid: this.$route.params.projectid,
      };
      axios
        .post("/api/displayproject", data)
        .then((response) => {
          self.project_name = response.data.projectname;
          self.project_address = response.data.projectaddress;
        })
        .catch((errors) => {
          alert("Duplicate Project Name");
        });
    },
  },
  mounted() {
    this.getprojectData();
  },
  data: () => ({
    project_address: [],
    project_name: "",
    projectid: null,
    valid: false,
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
