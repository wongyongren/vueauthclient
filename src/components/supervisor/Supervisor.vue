<template>
  <div data-app>
    <Header />
    <v-col>
      <h1>Supervisor Page</h1>
      <br />
      <v-container class="supervisor">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-card-title v-text="'Project Site Name'"></v-card-title>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="projectname"
              :items="selectOption"
              label="Select"
              hint="Select Project Site"
              persistent-hint
              name="projectsite"
              item-value="teamid"
              item-text="projectname"
              @input="filterteammember"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card-title v-text="'Select Worker'"></v-card-title>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="worker_name"
              :items="workernameOption"
              name="workername"
              item-value="employeeid"
              item-text="employeename"
              label="Display Worker Name"
              multiple
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-card-title v-text="'Select Date & Time'"></v-card-title>
          </v-col>

          <v-col cols="12" sm="3" md="3">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="datein"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datein"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="datein" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(datein)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-dialog
              ref="dialog1"
              v-model="modal1"
              :return-value.sync="timein"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timein"
                  label="Picker in dialog"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal1"
                v-model="timein"
                full-width
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal1 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog1.save(timein)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-title
              v-text="'Display Selected Date & Time'"
            ></v-card-title>
          </v-col>
          <v-col cols="12" sm="6"> {{ datein }} - {{ timein }} </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-card-title v-text="'Select Date & Time'"></v-card-title>
          </v-col>

          <v-col cols="12" sm="3" md="3">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="dateout"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateout"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker v-model="dateout" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(dateout)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-dialog
              ref="dialog2"
              v-model="modal2"
              :return-value.sync="timeout"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeout"
                  label="Picker in dialog"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal2"
                v-model="timeout"
                full-width
                format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog2.save(timeout)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-title
              v-text="'Display Selected Date & Time'"
            ></v-card-title>
          </v-col>
          <v-col cols="12" sm="6"> {{ dateout }} - {{ timeout }} </v-col>
        </v-row>
        <br />
        <v-btn 
          class="loginButton"
          type="submit"
          value="Register">Submit</v-btn>
      </v-container>
    </v-col>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header.vue";
import axios from "axios";
export default {
  name: "Supervisor",
  components: {
    Header,
  },

  data() {
    return {
      projectname: null,
      multiValue: null,
      select: null,
      worker_name: null,
      workernameOption: [],
      selectOption: [],
      datein: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateout: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      modal1: false,
      modal2: false,
      menu2: false,
      timein: null,
      timeout: null,
    };
  },
  methods: {
    update: function (e) {
      e.preventDefault();
      if (
        e.target.elements.teamname.value !== this.teamname ||
        e.target.elements.teamdescription.value !== this.teamdescription
      ) {
        console.log(e.target.elements.teamname.value);
        console.log(this.teamname);
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
        console.log("same team name and description");
      }
      this.updateteamsupervisorname(e);
      this.updateteammembername(e);
      window.location.reload();
    },
    getUserData: function () {
      let self = this;
      axios
        .get("/api/supervisor")
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            self.selectOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
            alert(
              "You are not authorized to view this resource because you are not an admin."
            );
          }
        });
    },
    filterteammember: function (e) {
      let self = this;
      let teamid = self.projectname;

      let filterteammember = () => {
        let data = {
          teamid: teamid,
        };
        axios
          .post("/api/filterteamworker", data)
          .then((response) => {
            self.workernameOption = [];
            self.worker_name = [];
            if (response.data.length != 0) {
              for (let i = 0; i < response.data.length; i++) {
                self.workernameOption.push(response.data[i]);
              }
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
  },
  mounted() {
    this.getUserData();// router at here
  },
};
</script>

<style>
.supervisor {
  border: 3px solid #ddd;
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
.button {
  background-color: grey; /* Green */
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.submitButton {
  border-radius: 4px;
}
</style>
