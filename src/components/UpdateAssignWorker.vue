<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Update Current Team Information
    </h1>

    <v-spacer></v-spacer>

    <v-form v-model="valid" v-on:submit.prevent="update">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.team_name"
            :items="teamnameOption"
            :rules="teamnameRules"
            name="team_name"
            item-value="teamid"
            item-text="teamname"
            label="Select Team Name"
            persistent-hint
            @input="filtersupervisor"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.teamname"
            :rules="teamnameRules"
            name="teamname"
            item-text="teamname"
            label="Edit Team Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.teamdescription"
            :rules="teamnameRules"
            name="teamdescription"
            item-text="description"
            label="Edit Team Description"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.project_name"
            name="projectname"
            label="Display Project Name"
            autocomplete="off"
            :readonly="true"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.supervisor_name"
            :items="supervisornameOption"
            :rules="workernameRules"
            name="supervisorname"
            item-value="userid"
            item-text="name"
            label="Display Supervisor Name"
            multiple
            chips
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.worker_name"
            :items="workernameOption"
            :rules="workernameRules"
            name="workername"
            item-value="userid"
            item-text="name"
            label="Display Worker Name"
            multiple
            chips
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
import axios from "axios";
export default {
  name: "Register",
  methods: {
    update: function (e) {
      e.preventDefault();
      if (
        e.target.elements.teamname.value !== this.teamnameOption[0].teamname ||
        e.target.elements.teamdescription.value !== this.teamdescription
      ) {
        console.log(e.target.elements.teamname.value);
        console.log(this.teamnameOption[0].teamname);
        let updateteamname = () => {
          let data = {
            teamname: e.target.elements.teamname.value,
            teamid: e.target.elements.team_name.value,
            teamdescription: e.target.elements.teamdescription.value,
          };
          console.log(data);
          axios
            .post("/api/updateteamname", data)
            .then((response) => {
              console.log("Update Success");
              console.log(response);
            })
            .catch((errors) => {
              console.log("Cannot Update");
              console.log(errors);
              alert("Duplicate Team Name");
            });
        };
        updateteamname();
      } else {
        console.log("same");
      }

      let team = e.target.elements.teamname.value;
      let projectid = this.projectid;
      let workerid = this.input.worker_name;
      //   console.log(JSON.parse(JSON.stringify(e.target.elements.workername.value)))
      //     console.log(JSON.parse(JSON.stringify(this.input.worker_name)))
      //   workerid = workerid.split(",");
      //   console.log(workerid);
      //   console.log(projectid);
      let update = () => {
        let data = {
          projectid: projectid,
          teamid: e.target.elements.team_name.value,
          team: team,
          workerid: workerid,
        };
        console.log(data);
        axios
          .post("/api/updateteammember", data)
          .then((response) => {
            console.log("register");
            console.log(response);
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Team Name");
          });
      };
      update();
    },
    filtersupervisor: function (e) {
      e.reload;
      let self = this;
      let teamid = self.input.team_name;
      let filtersupervisor = () => {
        let data = {
          teamid: teamid,
        };
        axios
          .post("/api/filterteamworker", data)
          .then((response) => {
            self.input.worker_name = [];
            self.input.supervisor_name = [];
            this.getSupervisorData();
            this.getWorkerData();
            self.projectid = response.data[0].projectid;
            self.input.teamname = response.data[0].teamname;
            self.input.project_name = response.data[0].projectname;
            self.input.teamdescription = response.data[0].description;
            self.teamdescription = response.data[0].description;
            for (let i = 0; i < response.data.length; i++) {
              console.log(response.data[i]);

              self.input.worker_name.push(response.data[i]);
              //self.workernameOption.push(response.data[i]);
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("worker error");
          });
      };
      filtersupervisor();
    },
    getSupervisorData: function () {
      let self = this;
      console.log(self.input.team_name);
      let filtersupervisor = () => {
        let data = {
          teamid: self.input.team_name,
        };
        axios
          .post("/api/teamsupervisor", data)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              console.log(response.data[i]);
              //self.input.worker_name.push(response.data[i]);

              self.input.supervisor_name.push(response.data[i]);
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("worker error");
          });
      };
      filtersupervisor();
    },
    getWorkerData: function () {
      let self = this;
      console.log(self.input.team_name);
      let filterworker = () => {
        let data = {
          teamid: self.input.team_name,
        };
        axios
          .get("/api/workername")
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              console.log(response.data[i]);
              //self.input.worker_name.push(response.data[i]);

              self.supervisornameOption.push(response.data[i]);
              self.workernameOption.push(response.data[i]);
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("worker error");
          });
      };
      filterworker();
    },
    getTeamData: function () {
      let self = this;
      axios
        .get("/api/teamname")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.teamnameOption.push(
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
  },
  mounted() {
    //this.getWorkerData();
    this.getTeamData();
  },
  data: () => ({
    isEditing: false,
    valid: false,
    projectid: null,
    teamdescription: null,
    projectnameOption: [],
    workernameOption: [],
    supervisornameOption: [],
    projectlist: [],
    multiValue: null,
    teamnameOption: [],
    supervisorname: null,
    projectnameRules: [(v) => !!v || "Project is required to be select"],
    teamnameRules: [(v) => !!v || "Team Name & Description is required"],
    workernameRules: [
      (v) => !!v || "At Least 1 Worker is required to be select",
    ],
    input: {
      project_name: null,
      supervisor_name: [],
      worker_name: [],
      team_name: null,
      teamname: null,
      teamdescription: null,
    },
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
