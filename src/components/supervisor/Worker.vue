<template>
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
        item-value="userid"
        item-text="name"
        label="Display Worker Name"
        persistent-hint
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      projectname: null,
      multiValue: null,
      select: null,
      worker_name: null,
      workernameOption: [],
      selectOption: [],
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/supervisor")
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            self.selectOption.push(response.data[i]);
          }
          //self.selectOption.push(response.data[i]);
          //self.$set(this, "user", response.data);
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
            alert(
              "You are not authorized to view this resource because you are not an admin."
            );
          }

          //this.$router.push("/").catch(() => {});
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
    this.getUserData();
  },
};
</script>
