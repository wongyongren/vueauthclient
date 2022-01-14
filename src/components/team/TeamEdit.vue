<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Edit Team Page</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="updateemploeyee">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="team_name"
            :rules="usernameRules"
            name="teamname"
            label="Team Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="team_description"
            :rules="usernameRules"
            name="description"
            label="Team Description"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="project_name"
            :items="projectnameOption"
            name="workername"
            item-value="projectid"
            item-text="projectname"
            label="Project Name"
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
      let teamname = this.team_name;
      let description = this.team_description;
      let projectid = this.project_name;
      let teamid = this.teamid;
      let data = {
        teamname: teamname,
        description: description,
        projectid: projectid,
        teamid: teamid,
      };
      console.log(data);
      axios
        .post("/api/updateteam", data)
        .then((response) => {
          console.log("register");
        })
        .catch((errors) => {
          alert("Duplicate Team Name");
        });
    },
    getProjectData: function () {
      let self = this;
      axios
        .get("/api/projectname")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.projectnameOption.push(
              JSON.parse(JSON.stringify(response.data[i]))
            );
            
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            //console.log("1231231232132132");
            alert(
              "You are not authorized to view this resource because you are not an admin."
            );
          }
          this.$router.push("/").catch(() => {});
        });
    },
    getTeamData: function () {
      this.teamid = this.$route.params.teamid;
      let self = this;
      let data = {
        teamid: this.$route.params.teamid,
      };
      axios
        .post("/api/displayteam", data)
        .then((response) => {
          self.team_name = response.data.teamname;
          self.team_description = response.data.description;
          self.project_name = response.data.projectid;
          
        })
        .catch((errors) => {
          alert("Duplicate Team Name");
        });
    },
  },
  mounted() {
    this.getProjectData();

    //this.getLoginUserData();
    this.getTeamData();
  },
  data: () => ({
    team_name: [],
    team_description: [],
    projectnameOption: [],
    project_name: [],
    projectid: null,
    teamid: null,
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
