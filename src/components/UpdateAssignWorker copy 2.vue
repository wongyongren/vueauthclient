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
            @input="filterteammember"
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
      <!-- <div>
        <v-data-table
          :headers="headers"
          :items="workernameOption"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </div> -->
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
      let workerid = JSON.stringify(this.input.worker_name.sort());

      if (workerid == JSON.stringify(this.compareworkername.sort())) {
        console.log("123");
      } else {
        console.log(workerid);
        console.log(JSON.stringify(this.compareworkername));
      }
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
          workerid: JSON.parse(workerid),
        };
        console.log(data);
        // axios
        //   .post("/api/updateteammember", data)
        //   .then((response) => {
        //     console.log("register");
        //     console.log(response);
        //   })
        //   .catch((errors) => {
        //     console.log("Cannot Register");
        //     console.log(errors);
        //     alert("Duplicate Team Name");
        //   });
      };
      update();
    },
    filterteammember: function (e) {
      let self = this;
      let teamid = self.input.team_name;
      let filterteammember = () => {
        let data = {
          teamid: teamid,
        };
        axios
          .post("/api/filterteamworker", data)
          .then((response) => {
            if (response.data.length != 0) {
              self.input.worker_name = [];
              self.input.supervisor_name = [];
              self.workernameOption = [];
              this.getSupervisorData();
              this.getWorkerData();
              self.projectid = response.data[0].projectid;
              self.input.teamname = response.data[0].teamname;
              self.input.project_name = response.data[0].projectname;
              self.input.teamdescription = response.data[0].description;
              self.teamdescription = response.data[0].description;
              for (let i = 0; i < response.data.length; i++) {
                self.input.worker_name.push(response.data[i].userid);
              }
              this.compareworkername = self.input.worker_name;
              // console.log(this.compareworkername)
            } else {
              axios.post("/api/teaminfo", data).then((response) => {
                self.input.worker_name = [];
                self.input.supervisor_name = [];
                self.workernameOption = [];
                //this.getSupervisorData();
                this.getWorkerData();
                self.projectid = response.data[0].projectid;
                self.input.teamname = response.data[0].teamname;
                self.input.project_name = response.data[0].projectname;
                self.input.teamdescription = response.data[0].description;
                self.teamdescription = response.data[0].description;
                console.log(response);
              });
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Current Worker Name List Error");
          });
      };
      filterteammember();
    },
    getSupervisorData: function () {
      let self = this;
      let filtersupervisor = () => {
        let data = {
          teamid: self.input.team_name,
        };
        axios
          .post("/api/teamsupervisor", data)
          .then((response) => {
            if (response.data.length == 0) {
              alert(
                "This Team does not have Supervisor. Will direct to assign Supervisor page to assign Supervisor"
              );
              this.$router.push("/assignsupervisor").catch(() => {});
            }
            for (let i = 0; i < response.data.length; i++) {
              self.input.supervisor_name.push(response.data[i]);
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("supervisor name list error");
          });
      };
      filtersupervisor();
    },
    getWorkerData: function () {
      let self = this;
      // console.log(self.input.team_name);
      // let filterworker = () => {
      //   let data = {
      //     teamid: self.input.team_name,
      //   };
      axios
        .get("/api/workername")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.supervisornameOption.push(response.data[i]);
            self.workernameOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("worker name list error");
        });
      //};
      //filterworker();
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
            alert(
              "You are not authorized to view this resource because you are not an admin."
            );
          }
          this.$router.push("/").catch(() => {});
        });
    },
    editItem(item) {
      this.editedIndex = this.workernameOption.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.workernameOption.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.workernameOption.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.workernameOption[this.editedIndex], this.editedItem);
      } else {
        this.workernameOption.push(this.editedItem);
      }
      this.close();
    },
  },
  mounted() {
    this.getTeamData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  data: () => ({
    compareworkername: [],
    valid: false,
    projectid: null,
    teamdescription: null,
    workernameOption: [],
    supervisornameOption: [],
    teamnameOption: [],
    supervisorname: null,
    // projectnameRules: [(v) => !!v || "Project is required to be select"],
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
    dialog: false,
    headers: [
      { text: "Worker ID", value: "userid" },
      {
        text: "Worker Name",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    workernameOption: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
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
